import type { SectionSearch } from "@/lib/router";
import { beneficiariesRoute } from "@/lib/router";
import { useSearch } from "@tanstack/react-router";

const SECTION_META: Record<
  SectionSearch["section"],
  { eyebrow: string; title: string; description: string }
> = {
  beneficiaries: {
    eyebrow: "Beneficiaries",
    title: "Beneficiaries",
    description:
      "The people and causes your legacy is sealed for. Allocation, order, and conditions live here.",
  },
  "legacy-assets": {
    eyebrow: "Legacy & Assets",
    title: "Legacy & Assets",
    description:
      "Everything held in the vault — balances, holdings, and the instructions that govern them.",
  },
  "the-switch": {
    eyebrow: "The Switch",
    title: "The Switch",
    description:
      "The single control that hands the vault over. Armed, verified, and deliberate.",
  },
  "audit-logs": {
    eyebrow: "Audit Logs",
    title: "Audit Logs",
    description:
      "A permanent, tamper-evident record of every action taken against the vault.",
  },
  settings: {
    eyebrow: "Settings",
    title: "Settings",
    description:
      "Identity, notification, and vault preferences. Sealed until you change them.",
  },
};

/**
 * Shared section shell for the protected routes. Renders the section's
 * eyebrow, title, and description on a floating surface card, driven by the
 * route's `section` search param.
 */
export function SectionPage() {
  const { section } = useSearch({ from: beneficiariesRoute.id });
  const meta = SECTION_META[section];

  return (
    <div
      data-ocid={`section.${section}`}
      className="mx-auto max-w-7xl px-6 py-10 lg:px-8"
    >
      <header className="mb-8 animate-fade-rise">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {meta.eyebrow}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
          {meta.title}
        </h1>
      </header>

      <section className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow [animation-delay:60ms]">
        <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
          {meta.description}
        </p>
        <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Sealed until it isn&apos;t
        </p>
      </section>
    </div>
  );
}
