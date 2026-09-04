/**
 * Dead file — the Beneficiaries and Legacy & Assets views were merged into the
 * single Beneficiary tab. This module is no longer routed; it re-exports the
 * BeneficiaryPage so the file still typechecks and any stale import resolves.
 */
export { BeneficiaryPage as AssetsPage } from "@/pages/BeneficiaryPage";
