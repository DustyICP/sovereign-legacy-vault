import { LandingPage } from "@/pages/LandingPage";
import { authState } from "@/test/state";
import { renderPage } from "@/test/utils";
import { screen, within } from "@testing-library/react";
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

  it("renders the Introduction section below the hero with verbatim copy", () => {
    renderPage(<LandingPage />);

    const introduction = screen.getByTestId("landing.introduction");
    expect(introduction).toBeInTheDocument();

    // The Introduction eyebrow and heading are verbatim.
    expect(within(introduction).getByText("Introduction")).toBeInTheDocument();
    expect(
      within(introduction).getByRole("heading", {
        name: "The Dead Man's Switch — Born in the Age of Steam",
      }),
    ).toBeInTheDocument();

    // Verbatim body copy from the provided marketing text.
    expect(
      within(introduction).getByText(
        /It was the American engineer Frank J\. Sprague who, in 1888,/,
      ),
    ).toBeInTheDocument();
    expect(
      within(introduction).getByText(
        /They called it the dead man's switch\. Hold the handle to keep/,
      ),
    ).toBeInTheDocument();
    expect(
      within(introduction).getByRole("heading", {
        name: "So How Does a Dead Man's Switch Work in These Times?",
      }),
    ).toBeInTheDocument();
    expect(
      within(introduction).getByRole("heading", {
        name: "Want to Personalize Your Wishes?",
      }),
    ).toBeInTheDocument();

    // The Introduction sits below the hero text block in document order.
    const heroTextBlock = screen
      .getByText("Self-sovereign inheritance")
      .closest("div.mx-auto");
    expect(heroTextBlock).not.toBeNull();
    expect(
      heroTextBlock!.compareDocumentPosition(introduction) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders the Advantages section with all five verbatim cards", () => {
    renderPage(<LandingPage />);

    const advantages = screen.getByTestId("landing.advantages");
    expect(advantages).toBeInTheDocument();

    // The Advantages eyebrow and heading are verbatim.
    expect(within(advantages).getByText("Why it works")).toBeInTheDocument();
    expect(
      within(advantages).getByRole("heading", {
        name: "The Advantages Are Built Into Every Step",
      }),
    ).toBeInTheDocument();

    // All five advantage cards render with their verbatim headings.
    const cardHeadings = [
      "No lawyers. No probate. No delays.",
      "You stay in control.",
      "Works while you sleep.",
      "Global reach.",
      "Your data stays yours.",
    ];
    for (const heading of cardHeadings) {
      expect(
        within(advantages).getByRole("heading", { name: heading }),
      ).toBeInTheDocument();
    }

    // Each card keeps its data-ocid seam.
    for (let i = 1; i <= 5; i += 1) {
      expect(
        within(advantages).getByTestId(`landing.advantages.card.${i}`),
      ).toBeInTheDocument();
    }

    // The Advantages section follows the Introduction in document order.
    const introduction = screen.getByTestId("landing.introduction");
    expect(
      introduction.compareDocumentPosition(advantages) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("keeps the Advantages cards on the surface-card treatment the new sections must match", () => {
    renderPage(<LandingPage />);

    // The Advantages cards define the surface-card pattern (rounded border,
    // surface fill, subtle shadow, smooth hover transition) that the new
    // Terms & Conditions cards must match. Pin the treatment so a styling
    // change to the shared pattern is caught here.
    const card = screen.getByTestId("landing.advantages.card.1");
    expect(card.className).toContain("rounded");
    expect(card.className).toContain("border-border");
    expect(card.className).toContain("bg-surface");
    expect(card.className).toContain("shadow-subtle");
    expect(card.className).toContain("transition-smooth");
    expect(card.className).toContain("hover:border-primary/40");
    expect(card.className).toContain("hover:shadow-gold-glow");

    // The card heading uses the plain non-italic gold Fraunces treatment, not
    // the wordmark's gradient/emboss.
    const cardHeading = within(card).getByRole("heading", {
      name: "No lawyers. No probate. No delays.",
    });
    expect(cardHeading.className).toContain("font-display");
    expect(cardHeading.className).toContain("text-foreground");
    expect(cardHeading.className).not.toContain("text-extruded-gold");
    expect(cardHeading.className).not.toContain("italic");
  });

  it("keeps the new sections' headings below the wordmark size", () => {
    renderPage(<LandingPage />);

    // The new section headings use text-3xl/text-4xl, which must stay below the
    // wordmark's largest size step so the wordmark remains the largest text.
    const introductionHeading = screen.getByRole("heading", {
      name: "The Dead Man's Switch — Born in the Age of Steam",
    });
    const advantagesHeading = screen.getByRole("heading", {
      name: "The Advantages Are Built Into Every Step",
    });

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

    // Both new headings are text-3xl/text-4xl (steps 6/7), well below the
    // wordmark's text-5xl (step 8). Assert they do not exceed text-4xl.
    expect(sizeStep(introductionHeading)).toBeLessThanOrEqual(7);
    expect(sizeStep(advantagesHeading)).toBeLessThanOrEqual(7);
  });

  it("renders the FAQ section after Advantages with the mono label and heading", () => {
    renderPage(<LandingPage />);

    const faq = screen.getByTestId("landing.faq");
    expect(faq).toBeInTheDocument();

    // The FAQ eyebrow and heading are verbatim.
    expect(within(faq).getByText("Questions")).toBeInTheDocument();
    expect(
      within(faq).getByRole("heading", {
        name: "Frequently Asked Questions",
      }),
    ).toBeInTheDocument();

    // The FAQ section follows the Advantages section in document order.
    const advantages = screen.getByTestId("landing.advantages");
    expect(
      advantages.compareDocumentPosition(faq) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders all eight FAQ questions as accordion triggers", () => {
    renderPage(<LandingPage />);

    const faq = screen.getByTestId("landing.faq");
    const questions = [
      "What languages does Sovereign Legacy support?",
      "How secure is my vault?",
      "Could I ever lose my vault?",
      "How are assets divided among beneficiaries?",
      "How do I reset the network inactivity timer?",
      "How do I add a beneficiary?",
      "Can I change my beneficiaries after setup?",
      "Who can see my beneficiaries?",
    ];

    for (const question of questions) {
      expect(
        within(faq).getByRole("button", { name: question }),
      ).toBeInTheDocument();
    }

    // Each FAQ item keeps its data-ocid seam.
    for (let i = 1; i <= 8; i += 1) {
      expect(
        within(faq).getByTestId(`landing.faq.item.${i}`),
      ).toBeInTheDocument();
    }
  });

  it("expands an FAQ answer on click and collapses the previously open item", async () => {
    const user = userEvent.setup();
    renderPage(<LandingPage />);

    const faq = screen.getByTestId("landing.faq");

    // Answers are hidden until their trigger is clicked.
    const firstAnswer =
      "The app supports 22 languages, including right-to-left languages such as Arabic, Persian, and Urdu, so beneficiaries anywhere in the world can understand a release notice in their own language.";
    const secondAnswer =
      "Your vault is a canister on the Internet Computer, secured by your Internet Identity. Only your authenticated principal can view or manage its contents.";

    expect(within(faq).queryByText(firstAnswer)).not.toBeInTheDocument();

    // Clicking the first question reveals its exact answer.
    await user.click(
      within(faq).getByRole("button", {
        name: "What languages does Sovereign Legacy support?",
      }),
    );
    expect(within(faq).getByText(firstAnswer)).toBeInTheDocument();

    // Clicking a second question collapses the first and reveals the second
    // (single-open accordion behavior).
    await user.click(
      within(faq).getByRole("button", {
        name: "How secure is my vault?",
      }),
    );
    expect(within(faq).queryByText(firstAnswer)).not.toBeInTheDocument();
    expect(within(faq).getByText(secondAnswer)).toBeInTheDocument();
  });

  it("expands each FAQ question to its exact provided answer", async () => {
    const user = userEvent.setup();
    renderPage(<LandingPage />);

    const faq = screen.getByTestId("landing.faq");
    const answers: Array<[string, string]> = [
      [
        "What languages does Sovereign Legacy support?",
        "The app supports 22 languages, including right-to-left languages such as Arabic, Persian, and Urdu, so beneficiaries anywhere in the world can understand a release notice in their own language.",
      ],
      [
        "How secure is my vault?",
        "Your vault is a canister on the Internet Computer, secured by your Internet Identity. Only your authenticated principal can view or manage its contents.",
      ],
      [
        "Could I ever lose my vault?",
        "As long as you retain access to your Internet Identity, your vault remains under your control. The main risk is losing your Internet Identity credentials, which is why keeping a secure backup of your recovery method matters.",
      ],
      [
        "How are assets divided among beneficiaries?",
        "You assign each beneficiary a percentage share. Shares can be adjusted at any time before release, and the total allocated across all beneficiaries must never exceed 100%.",
      ],
      [
        "How do I reset the network inactivity timer?",
        "Simply log in with your Internet Identity. Any authenticated check-in resets the inactivity clock and keeps the dead man's switch armed.",
      ],
      [
        "How do I add a beneficiary?",
        "From your dashboard, open the Beneficiaries panel and add a name, contact information, and allocation percentage.",
      ],
      [
        "Can I change my beneficiaries after setup?",
        "Yes. Beneficiaries, allocations, and personal messages can all be updated at any time — changes take effect immediately, on-chain.",
      ],
      [
        "Who can see my beneficiaries?",
        "Only you, while authenticated as the vault's owner.",
      ],
    ];

    for (const [question, answer] of answers) {
      await user.click(within(faq).getByRole("button", { name: question }));
      expect(within(faq).getByText(answer)).toBeInTheDocument();
    }
  });

  it("renders the Terms & Conditions section after FAQ with all ten numbered cards", () => {
    renderPage(<LandingPage />);

    const terms = screen.getByTestId("landing.terms");
    expect(terms).toBeInTheDocument();

    // The Terms eyebrow and heading are verbatim.
    expect(within(terms).getByText("Terms")).toBeInTheDocument();
    expect(
      within(terms).getByRole("heading", {
        name: "Terms & Conditions",
      }),
    ).toBeInTheDocument();

    // All ten numbered term cards render with their verbatim headings.
    const cardHeadings = [
      "1. Overview",
      "2. No Liability",
      "3. Autonomous Execution",
      "4. Privacy",
      "5. Fees",
      "6. Eligibility",
      "7. No Warranty",
      "8. Assumption of Risk",
      "9. Termination",
      "10. Modifications to These Terms",
    ];
    for (const heading of cardHeadings) {
      expect(
        within(terms).getByRole("heading", { name: heading }),
      ).toBeInTheDocument();
    }

    // Each term card keeps its data-ocid seam.
    for (let i = 1; i <= 10; i += 1) {
      expect(
        within(terms).getByTestId(`landing.terms.card.${i}`),
      ).toBeInTheDocument();
    }

    // The Terms section follows the FAQ section in document order.
    const faq = screen.getByTestId("landing.faq");
    expect(
      faq.compareDocumentPosition(terms) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("renders the exact provided copy for each term card", () => {
    renderPage(<LandingPage />);

    const terms = screen.getByTestId("landing.terms");
    const bodies = [
      /ICP Sovereign Legacy is a decentralized, fully on-chain inheritance and dead-man's-switch platform built on the Internet Computer Protocol \(ICP\)\. By using this service, you agree to these terms\./,
      /The developers are not liable for any loss of assets resulting from incorrect configuration, lost Internet Identity credentials, blockchain network conditions, or any other cause\. Use this service at your own risk\./,
      /Asset distribution is executed automatically by on-chain smart contract logic when your dead-man's-switch triggers\. No human intervention is required or possible once triggered\./,
      /Your beneficiary list is stored on-chain and accessible only to your authenticated Internet Identity principal\. No third party can view your data\./,
      /This service is provided as described within the app\. Any fees that apply to a specific action are shown clearly in the app before you confirm that action — no hidden or recurring charges\./,
      /You must be at least 18 years old \(or the age of majority in your jurisdiction\) and have the legal capacity to enter into these terms to use this service\./,
      /This service is provided "as is" and "as available," without warranties of any kind, whether express or implied, including any warranty of uninterrupted or error-free operation\./,
      /Cryptocurrency and blockchain technology carry inherent risks, including price volatility, network congestion, smart contract vulnerabilities, and changes to underlying protocols\. By using this service, you accept these risks\./,
      /Access to this service may be suspended or terminated for violation of these terms or for conduct that Sovereign Legacy determines, in its discretion, to be harmful to other users or to the service itself\./,
      /These terms may be updated from time to time\. Material changes will be presented within the app, and continued use of the service after such changes constitutes acceptance of the updated terms\./,
    ];

    for (const body of bodies) {
      expect(within(terms).getByText(body)).toBeInTheDocument();
    }
  });

  it("keeps the FAQ and Terms headings on the plain gold Fraunces treatment", () => {
    renderPage(<LandingPage />);

    const faqHeading = screen.getByRole("heading", {
      name: "Frequently Asked Questions",
    });
    const termsHeading = screen.getByRole("heading", {
      name: "Terms & Conditions",
    });

    for (const heading of [faqHeading, termsHeading]) {
      expect(heading.className).toContain("font-display");
      expect(heading.className).toContain("text-foreground");
      // Plain non-italic Fraunces in gold — no wordmark gradient/emboss.
      expect(heading.className).not.toContain("text-extruded-gold");
      expect(heading.className).not.toContain("italic");
    }
  });

  it("keeps the Terms cards on the surface-card treatment matching Advantages", () => {
    renderPage(<LandingPage />);

    const terms = screen.getByTestId("landing.terms");
    const card = within(terms).getByTestId("landing.terms.card.1");
    expect(card.className).toContain("rounded");
    expect(card.className).toContain("border-border");
    expect(card.className).toContain("bg-surface");
    expect(card.className).toContain("shadow-subtle");
    expect(card.className).toContain("transition-smooth");
    expect(card.className).toContain("hover:border-primary/40");
    expect(card.className).toContain("hover:shadow-gold-glow");

    const cardHeading = within(card).getByRole("heading", {
      name: "1. Overview",
    });
    expect(cardHeading.className).toContain("font-display");
    expect(cardHeading.className).toContain("text-foreground");
    expect(cardHeading.className).not.toContain("text-extruded-gold");
    expect(cardHeading.className).not.toContain("italic");
  });

  it("keeps the new term cards (6-10) on the same surface-card treatment", () => {
    renderPage(<LandingPage />);

    const terms = screen.getByTestId("landing.terms");
    const newCardHeadings = [
      "6. Eligibility",
      "7. No Warranty",
      "8. Assumption of Risk",
      "9. Termination",
      "10. Modifications to These Terms",
    ];

    for (let i = 6; i <= 10; i += 1) {
      const card = within(terms).getByTestId(`landing.terms.card.${i}`);
      // The new cards match the existing surface-card treatment exactly.
      expect(card.className).toContain("rounded");
      expect(card.className).toContain("border-border");
      expect(card.className).toContain("bg-surface");
      expect(card.className).toContain("shadow-subtle");
      expect(card.className).toContain("transition-smooth");
      expect(card.className).toContain("hover:border-primary/40");
      expect(card.className).toContain("hover:shadow-gold-glow");

      // The new card headings use the plain non-italic gold Fraunces
      // treatment, not the wordmark's gradient/emboss.
      const cardHeading = within(card).getByRole("heading", {
        name: newCardHeadings[i - 6],
      });
      expect(cardHeading.className).toContain("font-display");
      expect(cardHeading.className).toContain("text-foreground");
      expect(cardHeading.className).not.toContain("text-extruded-gold");
      expect(cardHeading.className).not.toContain("italic");
    }
  });

  it("does not add a terms-acceptance checkbox or gating to the login flow", () => {
    renderPage(<LandingPage />);

    // The login CTA remains a plain button that starts Internet Identity login;
    // no checkbox or terms-acceptance control is added to the hero.
    const login = screen.getByRole("button", {
      name: "Login with Internet Identity",
    });
    expect(login).toHaveAttribute("data-ocid", "landing.login");
    expect(screen.queryByRole("checkbox")).toBeNull();
  });
});
