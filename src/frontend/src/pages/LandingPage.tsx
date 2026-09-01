import { useInternetIdentity } from "@caffeineai/core-infrastructure";

/**
 * Landing hero. A full-bleed photographic bank vault door carries only the
 * infinity emblem at its center; the eyebrow and headline sit below the image
 * on the plain dark background, above the gold 'Login with Internet Identity'
 * CTA and the supporting subhead. Sign-in gates the dashboard and all
 * protected sections.
 */
export function LandingPage() {
  const { login } = useInternetIdentity();

  return (
    <section data-ocid="landing" className="bg-background">
      {/* Full-bleed vault door hero — image carries only the infinity emblem */}
      <div className="relative h-[62vh] min-h-[26rem] w-full max-h-[32rem] overflow-hidden md:h-[70vh]">
        <img
          src="/assets/generated/vault-door-photo.dim_1200x900.jpg"
          alt="A photograph of a massive circular steel bank vault door with heavy locking bolts and hinges, a glowing pink-to-blue Internet Computer infinity emblem at its center"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Directional rim-light: a warm gold glow from the single top-center
            light source (the same one lighting the door's gold edges) with a
            smooth gradient falloff across the dark steel, so the whole door
            reads as one consistently-lit photograph instead of a lit center
            fading to flat black. mix-blend-screen only lifts the dark areas. */}
        <div
          aria-hidden="true"
          className="bg-rim-light absolute inset-0 mix-blend-screen"
        />
        {/* Light gradient scrims so the re-lit door shows through while still
            blending into the page background */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/70"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent"
        />
      </div>

      {/* Eyebrow + headline + CTA on the plain dark background */}
      <div className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-8 text-center">
        <p
          data-ocid="landing.eyebrow"
          className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-muted-foreground md:text-xs"
        >
          Self-sovereign inheritance
        </p>
        <h1 className="text-extruded-gold mb-8 font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
          Your vault.
          <br />
          Sealed until it isn&apos;t.
        </h1>

        <button
          type="button"
          data-ocid="landing.login"
          onClick={() => login()}
          className="inline-flex items-center gap-2 rounded border border-primary/40 bg-gradient-gold px-8 py-4 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-gold-glow transition-smooth hover:shadow-elevated hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Login with Internet Identity
        </button>

        <p
          data-ocid="landing.subhead"
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          A digital dead man&apos;s switch for crypto, built natively on the
          Internet Computer — no probate, no delays, no one watching but the
          chain itself.
        </p>
      </div>
    </section>
  );
}
