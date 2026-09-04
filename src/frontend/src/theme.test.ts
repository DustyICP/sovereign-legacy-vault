import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const css = readFileSync(resolve(process.cwd(), "src/index.css"), "utf8");

describe("dark-only OKLCH theme", () => {
  it("defines colors exclusively in OKLCH with no hex or named colors", () => {
    expect(css).toContain("oklch");
    // Every color in the stylesheet stays on the OKLCH palette.
    expect(css).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    // Strip comments first: prose like "near-black steel" is not a color value.
    const cssWithoutComments = css.replace(/\/\*[\s\S]*?\*\//g, "");
    // The `white-space` CSS property legitimately contains the word "white";
    // exclude it so only actual named color values are flagged.
    expect(cssWithoutComments).not.toMatch(
      /\b(red|blue|green|black|gray|grey|orange|purple)\b|\bwhite(?!-space)\b/i,
    );
  });

  it("has no light, parchment, cream, or paper-grain variant", () => {
    expect(css).not.toMatch(/parchment|cream|paper|light\s+theme/i);
  });

  it("keeps the near-black steel background in both :root and .dark", () => {
    expect(css).toContain("--background: 0.135 0.012 255");
    expect(css).toContain("--surface: 0.17 0.014 255");
    // The .dark block mirrors the dark tokens rather than flipping to light.
    const darkBlock = css.slice(css.indexOf(".dark"));
    expect(darkBlock).toContain("--background: 0.135 0.012 255");
  });

  it("limits the font stack to Fraunces, Inter, and IBM Plex Mono", () => {
    expect(css).toContain('--font-display: "Fraunces"');
    expect(css).toContain('--font-body: "Inter"');
    expect(css).toContain('--font-mono: "IBM Plex Mono"');
  });
});

describe("overlay primitives stay on OKLCH tokens", () => {
  const overlaySources = [
    "src/components/ui/dialog.tsx",
    "src/components/ui/sheet.tsx",
  ].map((file) => readFileSync(resolve(process.cwd(), file), "utf8"));

  it("uses the OKLCH background token for dialog and sheet overlays", () => {
    for (const source of overlaySources) {
      expect(source).toContain("bg-[oklch(var(--background)/0.5)]");
      expect(source).not.toMatch(/bg-black/);
      expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    }
  });
});

describe("vault-door rim-light utility", () => {
  it("defines a directional radial glow from the single top-center light source", () => {
    // Slice only the rim-light block: the following `.text-extruded-gold`
    // utility carries the accepted gold gradient, which is not part of the
    // rim-light's OKLCH palette.
    const rimLight = css.slice(
      css.indexOf(".bg-rim-light"),
      css.indexOf(".text-extruded-gold"),
    );
    expect(rimLight).toContain("radial-gradient");
    // The glow emanates from the top-center light source (the same one that
    // lights the door's gold edges) and falls off smoothly toward the edges,
    // so the whole door reads as one consistently-lit photograph.
    expect(rimLight).toMatch(/at 50% -10%/);
    // Stays on the dark-only OKLCH palette with a transparent falloff.
    expect(rimLight).toContain("oklch");
    expect(rimLight).toContain("transparent");
    expect(rimLight).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});

describe("infinity emblem removal", () => {
  it("deletes the .text-infinity utility from the stylesheet", () => {
    // The infinity emblem and its gradient text-fill utility have been
    // intentionally removed from the landing hero.
    expect(css).not.toContain(".text-infinity");
    expect(css).not.toContain("text-infinity");
  });
});

describe("gold-gradient emboss treatment for the wordmark and hero headline", () => {
  it("keeps the .text-extruded-gold utility defined with a gold gradient fill", () => {
    // The wordmark and hero headline keep their gold-gradient emboss/script
    // treatment. The .text-extruded-gold utility must survive the change that
    // moves section/card headings to plain gold Fraunces.
    const extruded = css.slice(css.indexOf(".text-extruded-gold"));
    expect(extruded).toContain("background-image");
    expect(extruded).toContain("background-clip: text");
    expect(extruded).toContain("color: transparent");
    // The face is a warm gold gradient, not a flat color.
    expect(extruded).toContain("oklch");
    expect(extruded).toContain("linear-gradient");
  });

  it("keeps the --gradient-gold token defined for gold fills", () => {
    // The gold gradient token backs the gold button fills and the wordmark's
    // emboss. It must remain defined in both :root and .dark.
    const rootBlock = css.slice(css.indexOf(":root"), css.indexOf(".dark"));
    expect(rootBlock).toContain("--gradient-gold");
    expect(rootBlock).toContain("linear-gradient");
    const darkBlock = css.slice(css.indexOf(".dark"));
    expect(darkBlock).toContain("--gradient-gold");
  });
});

describe("warm gold primary text color", () => {
  it("sets the foreground tokens to the warm gold value in both :root and .dark", () => {
    // The primary text color is the warm gold (#D4A96A ≈ oklch 0.72 0.16 85),
    // replacing the previous cream foreground everywhere it was used.
    const gold = "0.72 0.16 85";
    const rootBlock = css.slice(css.indexOf(":root"), css.indexOf(".dark"));
    const darkBlock = css.slice(css.indexOf(".dark"));
    for (const block of [rootBlock, darkBlock]) {
      expect(block).toContain(`--foreground: ${gold}`);
      expect(block).toContain(`--card-foreground: ${gold}`);
      expect(block).toContain(`--popover-foreground: ${gold}`);
      expect(block).toContain(`--secondary-foreground: ${gold}`);
      expect(block).toContain(`--muted-foreground: ${gold}`);
      expect(block).toContain(`--sidebar-foreground: ${gold}`);
      expect(block).toContain(`--sidebar-accent-foreground: ${gold}`);
    }
  });

  it("reserves white (primary-foreground) for text on gold fills, not general text", () => {
    // White text is reserved for text on solid gold button fills and urgent/
    // armed status states. The primary-foreground token stays the near-black
    // steel (0.14 0.02 85) rather than a general-purpose white.
    const rootBlock = css.slice(css.indexOf(":root"), css.indexOf(".dark"));
    expect(rootBlock).toContain("--primary-foreground: 0.14 0.02 85");
    // No general text token is set to a near-white value.
    expect(rootBlock).not.toMatch(/--foreground: 0\.9/);
    expect(rootBlock).not.toMatch(/--foreground: 0\.93/);
  });
});
