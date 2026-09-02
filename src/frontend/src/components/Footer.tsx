import { useTranslation } from "@/lib/translations";

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();
  return (
    <footer data-ocid="footer" className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 font-mono text-xs text-muted-foreground md:flex-row lg:px-8">
        <p data-ocid="footer.copyright">{t("footer.copyright", { year })}</p>
        <p className="text-[0.6875rem] uppercase tracking-[0.18em]">
          {t("footer.tagline")}
        </p>
      </div>
    </footer>
  );
}
