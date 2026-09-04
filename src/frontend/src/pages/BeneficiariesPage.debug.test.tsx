import { BeneficiaryPage } from "@/pages/BeneficiaryPage";
import {
  createMockActor,
  renderPage,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

describe("BeneficiaryPage share constraint", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
  });

  it("blocks a button-click submit when the share is below the minimum", async () => {
    const actor = createMockActor();
    actor.listBeneficiaries.mockResolvedValue([]);
    setActor(actor);

    const user = userEvent.setup();
    renderPage(<BeneficiaryPage />);

    await user.click(
      await screen.findByRole("button", { name: "Add beneficiary" }),
    );
    const modal = screen.getByTestId("beneficiary.modal");

    await user.type(within(modal).getByLabelText("Name"), "Elena");
    await user.type(within(modal).getByLabelText("Allocation share (%)"), "0");
    await user.click(
      within(modal).getByRole("button", { name: "Add beneficiary" }),
    );

    // The share input's min={1} HTML constraint blocks the submit before React's
    // own validation runs, so no beneficiary is added and the dialog stays open.
    expect(actor.addBeneficiary).not.toHaveBeenCalled();
    expect(screen.getByTestId("beneficiary.modal")).toBeInTheDocument();
  });
});
