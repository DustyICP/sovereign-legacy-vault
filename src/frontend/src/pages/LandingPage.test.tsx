import { LandingPage } from "@/pages/LandingPage";
import { authState } from "@/test/state";
import { renderPage } from "@/test/utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

/**
 * Baseline for the landing page content. The hero background, wordmark
 * block-emboss treatment, and the gradient's exact color stops are visual
 * specifics that are intentionally not asserted in full; these tests pin the
 * copy, the login behavior, the reading order, the placement of the text block
 * below the vault-door image, and the rim-light overlay that must survive
 * styling changes.
 *
 * The infinity emblem (the role=img container with aria-label 'Internet
 * Computer infinity emblem' and its inner ∞ span) has been intentionally
 * removed from the hero. These tests protect the adjacent behavior that must
 * survive: the vault-door photo asset and its full-bleed fill, the eyebrow,
 * headline, subhead, and login CTA, and the hero structure.
 */
describe("LandingPage", () => {
  beforeEach(() => {
    authState.login.mockClear();
  });

  it("renders the hero eyebrow, headline, login CTA, and subhead", () => {
    renderPage(<LandingPage />);

    expect(screen.getByText("Self-sovereign inheritance")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Your vault\. Sealed until it isn't\./,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Login with Internet Identity" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A digital dead man's switch for crypto/i),
    ).toBeInTheDocument();
  });

  it("starts the Internet Identity login from the hero CTA", async () => {
    const user = userEvent.setup();
    renderPage(<LandingPage />);

    await user.click(
      screen.getByRole("button", { name: "Login with Internet Identity" }),
    );

    expect(authState.login).toHaveBeenCalledTimes(1);
  });

  it("no longer renders the infinity emblem in the hero", () => {
    renderPage(<LandingPage />);

    // The infinity emblem (role=img with aria-label 'Internet Computer
    // infinity emblem') has been intentionally removed from the landing hero.
    expect(
      screen.queryByRole("img", { name: "Internet Computer infinity emblem" }),
    ).toBeNull();
  });

  it("keeps the eyebrow, headline, and CTA off the vault-door image in a following block", () => {
    renderPage(<LandingPage />);

    const image = screen.getByAltText(/bank vault door/i);
    const imageContainer = image.closest("div.relative");
    expect(imageContainer).not.toBeNull();

    const eyebrow = screen.getByText("Self-sovereign inheritance");
    const headline = screen.getByRole("heading", {
      name: /Your vault\. Sealed until it isn't\./,
    });
    const login = screen.getByRole("button", {
      name: "Login with Internet Identity",
    });

    // The eyebrow, headline, and CTA share one text block that is a sibling of
    // the image container, not overlaid on the image itself.
    const textBlock = eyebrow.closest("div.mx-auto");
    expect(textBlock).not.toBeNull();
    expect(textBlock).toContainElement(headline);
    expect(textBlock).toContainElement(login);
    expect(textBlock).not.toBe(imageContainer);

    // The text block sits below the image in document order.
    expect(
      imageContainer!.compareDocumentPosition(textBlock!) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("keeps the eyebrow, headline, and login CTA in reading order", () => {
    renderPage(<LandingPage />);

    const eyebrow = screen.getByText("Self-sovereign inheritance");
    const headline = screen.getByRole("heading", {
      name: /Your vault\. Sealed until it isn't\./,
    });
    const login = screen.getByRole("button", {
      name: "Login with Internet Identity",
    });

    // The eyebrow precedes the headline, which precedes the login CTA in
    // document order, regardless of how the block is positioned or sized.
    expect(
      eyebrow.compareDocumentPosition(headline) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      headline.compareDocumentPosition(login) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("lays a directional rim-light overlay over the vault-door image", () => {
    renderPage(<LandingPage />);

    const image = screen.getByAltText(/bank vault door/i);
    const imageContainer = image.closest("div.relative");
    expect(imageContainer).not.toBeNull();

    // The rim-light is a decorative overlay pinned to the image container. It
    // must be hidden from assistive tech and use mix-blend-screen so it only
    // lifts the dark steel instead of washing out the door's gold edges.
    const rimLight = Array.from(imageContainer!.querySelectorAll("div")).find(
      (el) => el.classList.contains("bg-rim-light"),
    );
    expect(rimLight).toBeDefined();
    expect(rimLight).toHaveAttribute("aria-hidden", "true");
    expect(rimLight!.className).toContain("mix-blend-screen");
    expect(rimLight!.className).toContain("absolute");
    expect(rimLight!.className).toContain("inset-0");
  });

  it("keeps the vault-door photo asset filling the hero container", () => {
    renderPage(<LandingPage />);

    const image = screen.getByAltText(/bank vault door/i);
    expect(image).toHaveAttribute(
      "src",
      "/assets/generated/vault-door-photo.dim_1200x900.jpg",
    );
    // The image is pinned to fill its container; a max-height cap changes the
    // container's height, not the full-bleed fill behavior.
    expect(image.className).toContain("object-cover");
    expect(image.className).toContain("absolute");
    expect(image.className).toContain("inset-0");

    const imageContainer = image.closest("div.relative");
    expect(imageContainer).not.toBeNull();
    expect(imageContainer!.className).toContain("overflow-hidden");
  });

  it("keeps the vault-door image container's sizing unchanged", () => {
    renderPage(<LandingPage />);

    const image = screen.getByAltText(/bank vault door/i);
    const imageContainer = image.closest("div.relative");
    expect(imageContainer).not.toBeNull();

    // The hero's vault-door image keeps its full-bleed sizing: a tall viewport
    // band capped at 32rem with a minimum height so the door never collapses on
    // short screens. The emblem removal must not resize the vault image.
    expect(imageContainer!.className).toContain("h-[62vh]");
    expect(imageContainer!.className).toContain("min-h-[26rem]");
    expect(imageContainer!.className).toContain("max-h-[32rem]");
    expect(imageContainer!.className).toContain("w-full");
    expect(imageContainer!.className).toContain("md:h-[70vh]");
  });

  it("keeps the login CTA's data-ocid seam and button semantics", () => {
    renderPage(<LandingPage />);

    // The spacing fix between the headline block and the CTA must not turn the
    // login control into a link or drop its data-ocid seam.
    const login = screen.getByRole("button", {
      name: "Login with Internet Identity",
    });
    expect(login).toHaveAttribute("data-ocid", "landing.login");
    expect(login).toHaveAttribute("type", "button");
  });

  it("keeps the eyebrow and subhead data-ocid seams", () => {
    renderPage(<LandingPage />);

    // The eyebrow and subhead carry queryable seams that the emblem removal and
    // the headline/CTA spacing fix must not disturb.
    expect(screen.getByText("Self-sovereign inheritance")).toHaveAttribute(
      "data-ocid",
      "landing.eyebrow",
    );
    expect(
      screen.getByText(/A digital dead man's switch for crypto/i),
    ).toHaveAttribute("data-ocid", "landing.subhead");
  });

  it("keeps the headline a single level-1 heading holding both lines", () => {
    renderPage(<LandingPage />);

    // The spacing fix between the headline block and the CTA must not split the
    // headline or change its level: one h1 carrying both lines.
    const headline = screen.getByRole("heading", {
      level: 1,
      name: /Your vault\. Sealed until it isn't\./,
    });
    expect(headline).toHaveTextContent("Your vault.");
    expect(headline).toHaveTextContent("Sealed until it isn't.");
  });

  it("separates the headline block from the login CTA with clear margin", () => {
    renderPage(<LandingPage />);

    const headline = screen.getByRole("heading", {
      name: /Your vault\. Sealed until it isn't\./,
    });
    const login = screen.getByRole("button", {
      name: "Login with Internet Identity",
    });

    // The headline block carries a bottom margin so its embossed drop-shadow
    // clears the CTA's rounded corner instead of cutting into it.
    expect(headline.className).toContain("mb-8");
    // The CTA follows the headline in document order as a sibling, so the
    // margin between them is the only thing separating the two.
    expect(
      headline.compareDocumentPosition(login) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
