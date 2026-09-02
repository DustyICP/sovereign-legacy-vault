import { BeneficiariesPage } from "@/pages/BeneficiariesPage";
import { actorState } from "@/test/state";
import {
  createMockActor,
  renderPage,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { fireEvent, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

/** CRC-32 (IEEE 802.3) over a byte array, returned as an unsigned int. */
function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Build a 64-hex ICP account identifier whose CRC-32 checksum is valid, the
 * same shape the page's `validateWalletAddress` accepts.
 */
function makeValidAccountId(): string {
  const hash = new Uint8Array(28);
  for (let i = 0; i < 28; i++) hash[i] = i;
  const checksum = crc32(hash);
  const bytes = new Uint8Array(32);
  bytes[0] = (checksum >>> 24) & 0xff;
  bytes[1] = (checksum >>> 16) & 0xff;
  bytes[2] = (checksum >>> 8) & 0xff;
  bytes[3] = checksum & 0xff;
  bytes.set(hash, 4);
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}

describe("BeneficiariesPage", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
  });

  it("adds a beneficiary with an allocation share through the dialog", async () => {
    const actor = createMockActor();
    actor.listBeneficiaries.mockResolvedValue([]);
    actor.addBeneficiary.mockResolvedValue({
      id: 0n,
      name: "Elena Marchetti",
      allocationShare: 40n,
      walletAddress: "rrkah-fqaaa-aaaaa-aaaaq-cai",
      createdAt: 1n,
    });
    setActor(actor);

    const user = userEvent.setup();
    renderPage(<BeneficiariesPage />);

    expect(await screen.findByText("No beneficiaries yet")).toBeInTheDocument();
    await user.click(
      screen.getAllByRole("button", { name: "Add beneficiary" })[0],
    );

    const modal = screen.getByTestId("beneficiaries.modal");
    await user.type(within(modal).getByLabelText("Name"), "Elena Marchetti");
    await user.type(within(modal).getByLabelText("Allocation share (%)"), "40");
    await user.type(
      within(modal).getByLabelText("Wallet address"),
      "rrkah-fqaaa-aaaaa-aaaaq-cai",
    );
    await user.click(
      within(modal).getByRole("button", { name: "Add beneficiary" }),
    );

    expect(actor.addBeneficiary).toHaveBeenCalledWith(
      "Elena Marchetti",
      40n,
      "rrkah-fqaaa-aaaaa-aaaaq-cai",
    );
    expect(
      within(modal).queryByRole("button", { name: "Add beneficiary" }),
    ).not.toBeInTheDocument();
  });

  it("validates the beneficiary form", async () => {
    const actor = createMockActor();
    actor.listBeneficiaries.mockResolvedValue([]);
    setActor(actor);

    const user = userEvent.setup();
    renderPage(<BeneficiariesPage />);

    await user.click(
      await screen.findByRole("button", { name: "Add beneficiary" }),
    );
    const modal = screen.getByTestId("beneficiaries.modal");
    const form = modal.querySelector("form") as HTMLFormElement;

    // Empty form: the name is required.
    fireEvent.submit(form);
    expect(
      screen.getByText("Enter a name for this beneficiary."),
    ).toBeInTheDocument();

    // Name filled, share 0: the share must be greater than zero. fireEvent.submit
    // bypasses the share input's min={1} HTML constraint validation (which blocks
    // a button-click submit in jsdom) so React's own validation runs.
    await user.type(within(modal).getByLabelText("Name"), "Elena");
    await user.type(within(modal).getByLabelText("Allocation share (%)"), "0");
    fireEvent.submit(form);
    expect(
      screen.getByText("Allocation share must be greater than zero."),
    ).toBeInTheDocument();
    expect(actor.addBeneficiary).not.toHaveBeenCalled();
  });

  it("rejects a malformed wallet address as a hard block with an inline error", async () => {
    const actor = createMockActor();
    actor.listBeneficiaries.mockResolvedValue([]);
    setActor(actor);

    const user = userEvent.setup();
    renderPage(<BeneficiariesPage />);

    await user.click(
      await screen.findByRole("button", { name: "Add beneficiary" }),
    );
    const modal = screen.getByTestId("beneficiaries.modal");

    await user.type(within(modal).getByLabelText("Name"), "Elena");
    await user.type(within(modal).getByLabelText("Allocation share (%)"), "40");
    await user.type(within(modal).getByLabelText("Wallet address"), "addr-1");
    await user.click(
      within(modal).getByRole("button", { name: "Add beneficiary" }),
    );

    expect(
      screen.getByText(
        "Enter a valid ICP wallet address — a 64-character account identifier or an ICP principal.",
      ),
    ).toBeInTheDocument();
    expect(actor.addBeneficiary).not.toHaveBeenCalled();
    expect(screen.getByTestId("beneficiaries.modal")).toBeInTheDocument();
  });

  it("accepts a 64-hex account identifier with a valid CRC-32 checksum", async () => {
    const actor = createMockActor();
    actor.listBeneficiaries.mockResolvedValue([]);
    actor.addBeneficiary.mockResolvedValue({
      id: 0n,
      name: "Elena",
      allocationShare: 40n,
      walletAddress: makeValidAccountId(),
      createdAt: 1n,
    });
    setActor(actor);

    const user = userEvent.setup();
    renderPage(<BeneficiariesPage />);

    await user.click(
      await screen.findByRole("button", { name: "Add beneficiary" }),
    );
    const modal = screen.getByTestId("beneficiaries.modal");

    await user.type(within(modal).getByLabelText("Name"), "Elena");
    await user.type(within(modal).getByLabelText("Allocation share (%)"), "40");
    await user.type(
      within(modal).getByLabelText("Wallet address"),
      makeValidAccountId(),
    );
    await user.click(
      within(modal).getByRole("button", { name: "Add beneficiary" }),
    );

    expect(actor.addBeneficiary).toHaveBeenCalledWith(
      "Elena",
      40n,
      makeValidAccountId(),
    );
    expect(
      screen.queryByText(
        "Enter a valid ICP wallet address — a 64-character account identifier or an ICP principal.",
      ),
    ).not.toBeInTheDocument();
  });

  it("rejects a 64-hex account identifier with an invalid CRC-32 checksum", async () => {
    const actor = createMockActor();
    actor.listBeneficiaries.mockResolvedValue([]);
    setActor(actor);

    const user = userEvent.setup();
    renderPage(<BeneficiariesPage />);

    await user.click(
      await screen.findByRole("button", { name: "Add beneficiary" }),
    );
    const modal = screen.getByTestId("beneficiaries.modal");

    const badAccountId =
      "0000000000000000000000000000000000000000000000000000000000000000";
    await user.type(within(modal).getByLabelText("Name"), "Elena");
    await user.type(within(modal).getByLabelText("Allocation share (%)"), "40");
    await user.type(
      within(modal).getByLabelText("Wallet address"),
      badAccountId,
    );
    await user.click(
      within(modal).getByRole("button", { name: "Add beneficiary" }),
    );

    expect(
      screen.getByText(
        "This ICP account identifier has an invalid checksum. Double-check the address.",
      ),
    ).toBeInTheDocument();
    expect(actor.addBeneficiary).not.toHaveBeenCalled();
  });

  it("rejects an allocation sum that would exceed 100% with an inline error", async () => {
    const actor = createMockActor();
    actor.listBeneficiaries.mockResolvedValue([
      {
        id: 0n,
        name: "Ada",
        allocationShare: 70n,
        walletAddress: "rrkah-fqaaa-aaaaa-aaaaq-cai",
        createdAt: 1n,
      },
    ]);
    setActor(actor);

    const user = userEvent.setup();
    renderPage(<BeneficiariesPage />);

    await user.click(
      await screen.findByRole("button", { name: "Add beneficiary" }),
    );
    const modal = screen.getByTestId("beneficiaries.modal");

    await user.type(within(modal).getByLabelText("Name"), "Bob");
    await user.type(within(modal).getByLabelText("Allocation share (%)"), "40");
    await user.type(
      within(modal).getByLabelText("Wallet address"),
      "2vxsx-fae",
    );
    await user.click(
      within(modal).getByRole("button", { name: "Add beneficiary" }),
    );

    expect(
      screen.getByText(
        "Total allocation would be 110%, exceeding the 100% limit.",
      ),
    ).toBeInTheDocument();
    expect(actor.addBeneficiary).not.toHaveBeenCalled();
  });

  it("lists beneficiaries with their allocation shares and the allocation bar", async () => {
    const actor = createMockActor();
    actor.listBeneficiaries.mockResolvedValue([
      {
        id: 0n,
        name: "Ada",
        allocationShare: 60n,
        walletAddress: "rrkah-fqaaa-aaaaa-aaaaq-cai",
        createdAt: 1n,
      },
      {
        id: 1n,
        name: "Bob",
        allocationShare: 40n,
        walletAddress: "2vxsx-fae",
        createdAt: 2n,
      },
    ]);
    setActor(actor);

    renderPage(<BeneficiariesPage />);

    expect(await screen.findByText("Ada")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Ada · 60%")).toBeInTheDocument();
    expect(screen.getByText("Bob · 40%")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Beneficiary allocation shares" }),
    ).toBeInTheDocument();
  });

  it("shows each beneficiary's wallet address with a fallback when absent", async () => {
    const actor = createMockActor();
    actor.listBeneficiaries.mockResolvedValue([
      {
        id: 0n,
        name: "Ada",
        allocationShare: 60n,
        walletAddress: "rrkah-fqaaa-aaaaa-aaaaq-cai",
        createdAt: 1n,
      },
      {
        id: 1n,
        name: "Bob",
        allocationShare: 40n,
        walletAddress: "",
        createdAt: 2n,
      },
    ]);
    setActor(actor);

    renderPage(<BeneficiariesPage />);

    expect(await screen.findByText("Ada")).toBeInTheDocument();
    expect(screen.getByText("rrkah-fqaaa-aaaaa-aaaaq-cai")).toBeInTheDocument();
    expect(screen.getByText("No wallet address")).toBeInTheDocument();
  });

  it("shows the error state when the vault is unreachable", async () => {
    const actor = createMockActor();
    actor.listBeneficiaries.mockRejectedValue(new Error("boom"));
    setActor(actor);

    renderPage(<BeneficiariesPage />);

    expect(
      await screen.findByText(
        "Could not load beneficiaries. Please try again.",
      ),
    ).toBeInTheDocument();
  });

  it("edits and removes a beneficiary", async () => {
    const actor = createMockActor();
    actor.listBeneficiaries.mockResolvedValue([
      {
        id: 0n,
        name: "Ada",
        allocationShare: 60n,
        walletAddress: "rrkah-fqaaa-aaaaa-aaaaq-cai",
        createdAt: 1n,
      },
    ]);
    actor.updateBeneficiary.mockResolvedValue({
      id: 0n,
      name: "Ada",
      allocationShare: 50n,
      walletAddress: "rrkah-fqaaa-aaaaa-aaaaq-cai",
      createdAt: 1n,
    });
    actor.removeBeneficiary.mockResolvedValue(true);
    setActor(actor);

    const user = userEvent.setup();
    renderPage(<BeneficiariesPage />);

    await user.click(await screen.findByRole("button", { name: "Edit Ada" }));
    const modal = screen.getByTestId("beneficiaries.modal");
    const shareInput = within(modal).getByLabelText("Allocation share (%)");
    await user.clear(shareInput);
    await user.type(shareInput, "50");
    await user.click(
      within(modal).getByRole("button", { name: "Save changes" }),
    );

    expect(actor.updateBeneficiary).toHaveBeenCalledWith(
      0n,
      "Ada",
      50n,
      "rrkah-fqaaa-aaaaa-aaaaq-cai",
    );

    await user.click(screen.getByRole("button", { name: "Remove Ada" }));
    expect(actor.removeBeneficiary).toHaveBeenCalledWith(0n);
  });
});
