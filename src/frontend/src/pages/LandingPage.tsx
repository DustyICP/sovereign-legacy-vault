import { useInternetIdentity } from "@caffeineai/core-infrastructure";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useTranslation } from "@/lib/translations";

/**
 * Landing hero. A full-bleed photographic bank vault door carries only the
 * infinity emblem at its center; the eyebrow and headline sit below the image
 * on the plain dark background, above the gold 'Login with Internet Identity'
 * CTA and the supporting subhead. Sign-in gates the dashboard and all
 * protected sections.
 */
export function LandingPage() {
  const { login } = useInternetIdentity();
  const { t } = useTranslation();

  return (
    <section data-ocid="landing" className="bg-background">
      {/* Full-bleed vault door hero — image carries only the infinity emblem */}
      <div className="relative h-[62vh] min-h-[26rem] w-full max-h-[32rem] overflow-hidden md:h-[70vh]">
        <img
          src="/assets/generated/vault-door-photo.dim_1200x900.jpg"
          alt={t("landing.vaultDoorAlt")}
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
          {t("landing.eyebrow")}
        </p>
        <h1 className="text-extruded-gold mb-8 font-display text-xl font-semibold leading-snug tracking-tight md:text-2xl">
          {t("landing.headline1")}
          <br />
          {t("landing.headline2")}
        </h1>

        <button
          type="button"
          data-ocid="landing.login"
          onClick={() => login()}
          className="inline-flex items-center gap-2 rounded border border-primary/40 bg-gradient-gold px-8 py-4 font-mono text-sm font-semibold uppercase tracking-[0.16em] text-primary-foreground shadow-gold-glow transition-smooth hover:shadow-elevated hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("landing.login")}
        </button>

        <p
          data-ocid="landing.subhead"
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {t("landing.subhead")}
        </p>
      </div>

      {/* Introduction — the dead man's switch, born in the age of steam */}
      <div
        data-ocid="landing.introduction"
        className="mx-auto max-w-3xl px-6 pb-24"
      >
        <p
          data-ocid="landing.introduction.eyebrow"
          className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-muted-foreground md:text-xs"
        >
          {t("landing.introduction.eyebrow")}
        </p>
        <h2 className="mb-8 font-display text-3xl font-semibold leading-snug tracking-tight text-foreground md:text-4xl">
          {t("landing.introduction.heading")}
        </h2>

        <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>{t("landing.introduction.p1")}</p>
          <p>{t("landing.introduction.p2")}</p>
          <p>{t("landing.introduction.p3")}</p>
          <p>{t("landing.introduction.p4")}</p>
          <p>{t("landing.introduction.p5")}</p>
        </div>

        <h3 className="mt-12 mb-4 font-display text-2xl font-semibold leading-snug tracking-tight text-foreground">
          {t("landing.introduction.h3a")}
        </h3>
        <div className="space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>{t("landing.introduction.p6")}</p>
          <p>{t("landing.introduction.p7")}</p>
        </div>

        <h3 className="mt-12 mb-4 font-display text-2xl font-semibold leading-snug tracking-tight text-foreground">
          {t("landing.introduction.h3b")}
        </h3>
        <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
          {t("landing.introduction.p8")}
        </p>
      </div>

      {/* Advantages — why it works */}
      <div
        data-ocid="landing.advantages"
        className="mx-auto max-w-6xl px-6 pb-24"
      >
        <p
          data-ocid="landing.advantages.eyebrow"
          className="mb-4 text-center font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-muted-foreground md:text-xs"
        >
          {t("landing.advantages.eyebrow")}
        </p>
        <h2 className="mb-12 text-center font-display text-3xl font-semibold leading-snug tracking-tight text-foreground md:text-4xl">
          {t("landing.advantages.heading")}
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            data-ocid="landing.advantages.card.1"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.advantages.card1.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.advantages.card1.body")}
            </p>
          </article>
          <article
            data-ocid="landing.advantages.card.2"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.advantages.card2.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.advantages.card2.body")}
            </p>
          </article>
          <article
            data-ocid="landing.advantages.card.3"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.advantages.card3.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.advantages.card3.body")}
            </p>
          </article>
          <article
            data-ocid="landing.advantages.card.4"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.advantages.card4.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.advantages.card4.body")}
            </p>
          </article>
          <article
            data-ocid="landing.advantages.card.5"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.advantages.card5.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.advantages.card5.body")}
            </p>
          </article>
        </div>
      </div>

      {/* FAQ — frequently asked questions */}
      <div data-ocid="landing.faq" className="mx-auto max-w-3xl px-6 pb-24">
        <p
          data-ocid="landing.faq.eyebrow"
          className="mb-4 font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-muted-foreground md:text-xs"
        >
          {t("landing.faq.eyebrow")}
        </p>
        <h2
          data-ocid="landing.faq.heading"
          className="mb-8 font-display text-3xl font-semibold leading-snug tracking-tight text-foreground md:text-4xl"
        >
          {t("landing.faq.heading")}
        </h2>

        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem
            value="q1"
            data-ocid="landing.faq.item.1"
            className="rounded border border-border bg-surface shadow-subtle transition-smooth"
          >
            <AccordionTrigger
              data-ocid="landing.faq.item.1.trigger"
              className="px-6 py-5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground hover:no-underline"
            >
              {t("landing.faq.q1.q")}
            </AccordionTrigger>
            <AccordionContent
              data-ocid="landing.faq.item.1.content"
              className="px-6 text-base leading-relaxed text-muted-foreground"
            >
              {t("landing.faq.q1.a")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q2"
            data-ocid="landing.faq.item.2"
            className="rounded border border-border bg-surface shadow-subtle transition-smooth"
          >
            <AccordionTrigger
              data-ocid="landing.faq.item.2.trigger"
              className="px-6 py-5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground hover:no-underline"
            >
              {t("landing.faq.q2.q")}
            </AccordionTrigger>
            <AccordionContent
              data-ocid="landing.faq.item.2.content"
              className="px-6 text-base leading-relaxed text-muted-foreground"
            >
              {t("landing.faq.q2.a")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q3"
            data-ocid="landing.faq.item.3"
            className="rounded border border-border bg-surface shadow-subtle transition-smooth"
          >
            <AccordionTrigger
              data-ocid="landing.faq.item.3.trigger"
              className="px-6 py-5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground hover:no-underline"
            >
              {t("landing.faq.q3.q")}
            </AccordionTrigger>
            <AccordionContent
              data-ocid="landing.faq.item.3.content"
              className="px-6 text-base leading-relaxed text-muted-foreground"
            >
              {t("landing.faq.q3.a")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q4"
            data-ocid="landing.faq.item.4"
            className="rounded border border-border bg-surface shadow-subtle transition-smooth"
          >
            <AccordionTrigger
              data-ocid="landing.faq.item.4.trigger"
              className="px-6 py-5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground hover:no-underline"
            >
              {t("landing.faq.q4.q")}
            </AccordionTrigger>
            <AccordionContent
              data-ocid="landing.faq.item.4.content"
              className="px-6 text-base leading-relaxed text-muted-foreground"
            >
              {t("landing.faq.q4.a")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q5"
            data-ocid="landing.faq.item.5"
            className="rounded border border-border bg-surface shadow-subtle transition-smooth"
          >
            <AccordionTrigger
              data-ocid="landing.faq.item.5.trigger"
              className="px-6 py-5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground hover:no-underline"
            >
              {t("landing.faq.q5.q")}
            </AccordionTrigger>
            <AccordionContent
              data-ocid="landing.faq.item.5.content"
              className="px-6 text-base leading-relaxed text-muted-foreground"
            >
              {t("landing.faq.q5.a")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q6"
            data-ocid="landing.faq.item.6"
            className="rounded border border-border bg-surface shadow-subtle transition-smooth"
          >
            <AccordionTrigger
              data-ocid="landing.faq.item.6.trigger"
              className="px-6 py-5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground hover:no-underline"
            >
              {t("landing.faq.q6.q")}
            </AccordionTrigger>
            <AccordionContent
              data-ocid="landing.faq.item.6.content"
              className="px-6 text-base leading-relaxed text-muted-foreground"
            >
              {t("landing.faq.q6.a")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q7"
            data-ocid="landing.faq.item.7"
            className="rounded border border-border bg-surface shadow-subtle transition-smooth"
          >
            <AccordionTrigger
              data-ocid="landing.faq.item.7.trigger"
              className="px-6 py-5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground hover:no-underline"
            >
              {t("landing.faq.q7.q")}
            </AccordionTrigger>
            <AccordionContent
              data-ocid="landing.faq.item.7.content"
              className="px-6 text-base leading-relaxed text-muted-foreground"
            >
              {t("landing.faq.q7.a")}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="q8"
            data-ocid="landing.faq.item.8"
            className="rounded border border-border bg-surface shadow-subtle transition-smooth"
          >
            <AccordionTrigger
              data-ocid="landing.faq.item.8.trigger"
              className="px-6 py-5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground hover:no-underline"
            >
              {t("landing.faq.q8.q")}
            </AccordionTrigger>
            <AccordionContent
              data-ocid="landing.faq.item.8.content"
              className="px-6 text-base leading-relaxed text-muted-foreground"
            >
              {t("landing.faq.q8.a")}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Terms & Conditions */}
      <div data-ocid="landing.terms" className="mx-auto max-w-6xl px-6 pb-24">
        <p
          data-ocid="landing.terms.eyebrow"
          className="mb-4 text-center font-mono text-[0.6875rem] uppercase tracking-[0.28em] text-muted-foreground md:text-xs"
        >
          {t("landing.terms.eyebrow")}
        </p>
        <h2
          data-ocid="landing.terms.heading"
          className="mb-12 text-center font-display text-3xl font-semibold leading-snug tracking-tight text-foreground md:text-4xl"
        >
          {t("landing.terms.heading")}
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            data-ocid="landing.terms.card.1"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.terms.card1.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.terms.card1.body")}
            </p>
          </article>
          <article
            data-ocid="landing.terms.card.2"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.terms.card2.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.terms.card2.body")}
            </p>
          </article>
          <article
            data-ocid="landing.terms.card.3"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.terms.card3.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.terms.card3.body")}
            </p>
          </article>
          <article
            data-ocid="landing.terms.card.4"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.terms.card4.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.terms.card4.body")}
            </p>
          </article>
          <article
            data-ocid="landing.terms.card.5"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.terms.card5.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.terms.card5.body")}
            </p>
          </article>
          <article
            data-ocid="landing.terms.card.6"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.terms.card6.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.terms.card6.body")}
            </p>
          </article>
          <article
            data-ocid="landing.terms.card.7"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.terms.card7.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.terms.card7.body")}
            </p>
          </article>
          <article
            data-ocid="landing.terms.card.8"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.terms.card8.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.terms.card8.body")}
            </p>
          </article>
          <article
            data-ocid="landing.terms.card.9"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.terms.card9.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.terms.card9.body")}
            </p>
          </article>
          <article
            data-ocid="landing.terms.card.10"
            className="animate-fade-rise rounded border border-border bg-surface p-8 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <h3 className="mb-3 font-display text-xl font-semibold leading-snug tracking-tight text-foreground">
              {t("landing.terms.card10.title")}
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground">
              {t("landing.terms.card10.body")}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
