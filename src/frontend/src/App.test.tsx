import { router } from "@/lib/router";
import { actorState, authState } from "@/test/state";
import {
  createMockActor,
  renderApp,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("App shell, landing, and auth gating", () => {
  beforeEach(() => {
    setAuthenticated(false);
    setActor(null);
  });

  afterEach(async () => {
    await router.navigate({ to: "/" });
    router.invalidate();
  });

  it("loads the landing hero on the default route without a blank screen", async () => {
    renderApp();

    expect(
      await screen.findByText("Self-sovereign inheritance"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Your vault\. Sealed until it isn't\./,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Login with Internet Identity" }),
    ).toBeInTheDocument();
    expect(screen.getByAltText(/bank vault door/i)).toBeInTheDocument();
    expect(
      screen.getByText(/A digital dead man's switch for crypto/i),
    ).toBeInTheDocument();
    expect(screen.getByText("Sovereign Legacy")).toBeInTheDocument();
  });

  it("calls login from the landing CTA and reaches the dashboard once authenticated", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(
      screen.getByRole("button", { name: "Login with Internet Identity" }),
    );
    expect(authState.login).toHaveBeenCalledTimes(1);

    // Simulate a completed Internet Identity sign-in, then reach the dashboard.
    setAuthenticated(true);
    setActor(createMockActor());
    await router.navigate({ to: "/dashboard" });

    expect(await screen.findByText("The Vault")).toBeInTheDocument();
    expect(screen.getByText("Vault Balance")).toBeInTheDocument();
  });

  it("gates protected routes behind login by redirecting to the landing page", async () => {
    renderApp();
    await router.navigate({ to: "/dashboard" });

    expect(
      await screen.findByText("Self-sovereign inheritance"),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "The Vault" }),
    ).not.toBeInTheDocument();
  });

  it("navigates between protected sections via the sidebar", async () => {
    setAuthenticated(true);
    renderApp();
    await router.navigate({ to: "/dashboard" });

    expect(await screen.findByText("The Vault")).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("link", { name: "Beneficiaries" }));
    expect(
      await screen.findByRole("heading", { name: "Beneficiaries" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Audit Logs" }));
    expect(
      await screen.findByRole("heading", { name: "Audit Logs" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Settings" }));
    expect(
      await screen.findByRole("heading", { name: "Vault Configuration" }),
    ).toBeInTheDocument();
  });

  it("keeps the header wordmark a link home with the network badge", async () => {
    renderApp();

    const wordmark = await screen.findByRole("link", {
      name: "Sovereign Legacy home",
    });
    expect(within(wordmark).getByText("Sovereign Legacy")).toBeInTheDocument();
    expect(wordmark).toHaveAttribute("href", "/");
    expect(screen.getByText("Network · Identity")).toBeInTheDocument();
  });

  it("keeps the Sovereign Legacy wordmark the largest text on the landing page", async () => {
    renderApp();

    const wordmark = await screen.findByRole("link", {
      name: "Sovereign Legacy home",
    });
    const wordmarkText = within(wordmark).getByText("Sovereign Legacy");
    const headline = screen.getByRole("heading", {
      name: /Your vault\. Sealed until it isn't\./,
    });

    // jsdom loads no CSS (vitest `css: false`), so the typography hierarchy is
    // observed through the Tailwind text-size tokens: the wordmark's largest
    // size step must rank strictly above the headline's.
    const sizeStep = (element: HTMLElement): number => {
      const steps = [
        "xs",
        "sm",
        "base",
        "lg",
        "xl",
        "2xl",
        "3xl",
        "4xl",
        "5xl",
      ];
      const tokens = Array.from(element.classList).filter((token) =>
        /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl)$/.test(token),
      );
      expect(tokens.length).toBeGreaterThan(0);
      return Math.max(...tokens.map((token) => steps.indexOf(token.slice(5))));
    };

    expect(sizeStep(wordmarkText)).toBeGreaterThan(sizeStep(headline));
  });

  it("shows the loading state while the identity is initializing", async () => {
    authState.isInitializing = true;
    renderApp();

    expect(await screen.findByText("Opening vault…")).toBeInTheDocument();
  });
});
