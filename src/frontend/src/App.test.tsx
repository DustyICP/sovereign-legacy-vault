import { SwitchStatus } from "@/backend";
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

  it("calls login from the landing CTA and reaches the overview once authenticated", async () => {
    const user = userEvent.setup();
    renderApp();

    await user.click(
      screen.getByRole("button", { name: "Login with Internet Identity" }),
    );
    expect(authState.login).toHaveBeenCalledTimes(1);

    // Simulate a completed Internet Identity sign-in, then reach the overview.
    const actor = createMockActor();
    actor.getOverview.mockResolvedValue({
      switchStatus: SwitchStatus.disarmed,
      totalAllocationShare: 0n,
      recentActivity: [],
      beneficiaryCount: 0n,
      vaultBalance: { assets: [], depositAddress: "" },
      timeline: {
        status: SwitchStatus.disarmed,
        warningOnsetDays: 30n,
        warningRepeatDays: 7n,
        triggerDays: 180n,
      },
    });
    setAuthenticated(true);
    setActor(actor);
    await router.navigate({ to: "/overview" });

    expect(
      await screen.findByRole("heading", { name: "Overview" }),
    ).toBeInTheDocument();
    // The vault balance snapshot card resolves asynchronously from the
    // `getOverview` query, so wait for its label rather than reading it
    // synchronously right after the (always-rendered) page heading appears.
    expect(await screen.findByText("Vault Balance")).toBeInTheDocument();
  });

  it("gates protected routes behind login by redirecting to the landing page", async () => {
    renderApp();
    await router.navigate({ to: "/overview" });

    expect(
      await screen.findByText("Self-sovereign inheritance"),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { name: "Overview" }),
    ).not.toBeInTheDocument();
  });

  it("navigates between protected sections via the horizontal tab bar", async () => {
    setAuthenticated(true);
    setActor(createMockActor());
    renderApp();
    await router.navigate({ to: "/overview" });

    expect(
      await screen.findByRole("heading", { name: "Overview" }),
    ).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("link", { name: "Wallet" }));
    expect(
      await screen.findByRole("heading", { name: "Wallet" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Beneficiary" }));
    expect(
      await screen.findByRole("heading", { name: "Beneficiaries" }),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("link", { name: "Timelines" }));
    expect(
      await screen.findByRole("heading", { name: "Inactivity Timelines" }),
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

  it("keeps the header sticky on authenticated interior pages", async () => {
    // The landing header is intentionally made non-sticky, but the header on
    // authenticated interior pages must keep its pinned-at-top behavior so the
    // wordmark, language dropdown, and Network · Identity badge stay reachable
    // while scrolling through a protected section.
    setAuthenticated(true);
    setActor(createMockActor());
    renderApp();
    await router.navigate({ to: "/overview" });

    expect(
      await screen.findByRole("heading", { name: "Overview" }),
    ).toBeInTheDocument();

    const header = screen.getByTestId("header");
    expect(header.className).toContain("sticky");
    expect(header.className).toContain("top-0");
    expect(header.className).toContain("z-40");
  });

  it("lets the landing header scroll away by dropping the sticky classes", async () => {
    // The public landing header (wordmark, language dropdown, Network ·
    // Identity badge) must scroll out of view with the page content instead of
    // staying pinned at the top, so it must NOT carry the sticky top-0 z-40
    // classes that the authenticated interior header keeps.
    renderApp();

    await screen.findByText("Self-sovereign inheritance");

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();
    expect(header.className).not.toContain("sticky");
    expect(header.className).not.toContain("top-0");
    expect(header.className).not.toContain("z-40");

    // The landing header content still renders even though it is not pinned.
    expect(
      screen.getByRole("link", { name: "Sovereign Legacy home" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Network · Identity")).toBeInTheDocument();
  });

  it("keeps the landing footer with its copyright and tagline", async () => {
    renderApp();

    // The footer is part of the landing shell and must survive the addition of
    // new sections below the hero. Pin its data-ocid seam and verbatim copy.
    const footer = await screen.findByTestId("footer");
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveTextContent(
      `© ${new Date().getFullYear()}. Sovereign Legacy — The Vault. All rights reserved.`,
    );
    expect(footer).toHaveTextContent("Sealed until it isn't");
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

  it("keeps the gold-gradient emboss treatment on the wordmark and hero headline", async () => {
    renderApp();

    // The wordmark and hero headline keep their gold-gradient emboss/script
    // treatment (the .text-extruded-gold utility), even as section/card
    // headings move to plain gold Fraunces.
    const wordmark = await screen.findByRole("link", {
      name: "Sovereign Legacy home",
    });
    const wordmarkText = within(wordmark).getByText("Sovereign Legacy");
    expect(wordmarkText.className).toContain("text-extruded-gold");

    const headline = screen.getByRole("heading", {
      name: /Your vault\. Sealed until it isn't\./,
    });
    expect(headline.className).toContain("text-extruded-gold");
  });

  it("keeps white text on the gold login CTA fill", async () => {
    renderApp();

    // White text is reserved for text on solid gold button fills. The login
    // CTA is a gold gradient fill with the primary-foreground (white) text.
    const login = await screen.findByRole("button", {
      name: "Login with Internet Identity",
    });
    expect(login.className).toContain("bg-gradient-gold");
    expect(login.className).toContain("text-primary-foreground");
  });

  it("renders section headings as plain non-italic gold Fraunces", async () => {
    renderApp();

    // Section/card headings use the plain gold foreground (text-foreground,
    // now warm gold) in the Fraunces display face, with no gradient, emboss,
    // or script styling — unlike the wordmark/hero which keep .text-extruded-gold.
    const sectionHeading = screen.getByRole("heading", {
      name: "The Dead Man's Switch — Born in the Age of Steam",
    });
    expect(sectionHeading.className).toContain("font-display");
    expect(sectionHeading.className).toContain("text-foreground");
    expect(sectionHeading.className).not.toContain("text-extruded-gold");
    expect(sectionHeading.className).not.toContain("italic");

    // A card heading inside the advantages grid follows the same treatment.
    const cardHeading = screen.getByRole("heading", {
      name: "No lawyers. No probate. No delays.",
    });
    expect(cardHeading.className).toContain("font-display");
    expect(cardHeading.className).toContain("text-foreground");
    expect(cardHeading.className).not.toContain("text-extruded-gold");
    expect(cardHeading.className).not.toContain("italic");
  });
});
