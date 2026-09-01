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
    expect(cssWithoutComments).not.toMatch(
      /\b(red|blue|green|white|black|gray|grey|orange|purple)\b/i,
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
