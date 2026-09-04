import { WalletPage } from "@/pages/WalletPage";
import {
  createMockActor,
  renderPage,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { fireEvent, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Characterization of the Wallet tab's sealed transaction history, the
 * distinct receive view, and the portfolio breakdown. The OISY integration
 * adds a Connect Wallet action and a send form to this tab; these tests
 * protect the existing transaction ledger rendering, the receive view's
 * standalone presentation, and the asset breakdown filtering, which must
 * survive that change.
 *
 * The Radix `Select` primitive is replaced with a native `<select>` so the
 * asset breakdown dropdown can be driven reliably in jsdom; the filtering
 * logic under test is unaffected.
 */
vi.mock("@/components/ui/select", () => {
  const React = require("react");
  const Select = ({ value, onValueChange, children }: any) => {
    const options = React.Children.toArray(children)
      .flatMap((child: any) =>
        child?.props?.children
          ? React.Children.toArray(child.props.children)
          : [],
      )
      .filter((child: any) => child?.type?.displayName === "SelectItem")
      .map((child: any) => child.props);
    return (
      <select
        data-ocid="mock-select"
        value={value ?? ""}
        onChange={(e) => onValueChange?.(e.target.value)}
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.children}
          </option>
        ))}
      </select>
    );
  };
  const SelectTrigger = ({ children, ...props }: any) => (
    <div data-testid="mock-select-trigger" {...props}>
      {children}
    </div>
  );
  const SelectValue = ({ placeholder }: any) => <span>{placeholder}</span>;
  const SelectContent = ({ children }: any) => <>{children}</>;
  const SelectItem = ({ value, children }: any) => (
    <option value={value}>{children}</option>
  );
  SelectItem.displayName = "SelectItem";
  return {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  };
});

describe("WalletPage characterization (transaction history + receive view)", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
    // The Wallet page pulls live USD prices from the CoinGecko feed. Stub the
    // network call so the suite never touches an external API.
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({}),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the sealed transaction history from audit events", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({
      assets: [],
      depositAddress: "",
    });
    actor.getDepositAddress.mockResolvedValue("");
    actor.listAuditEvents.mockResolvedValue([
      {
        id: 0n,
        prevHash: new Uint8Array([1]),
        hash: new Uint8Array([2]),
        description: "Beneficiary Ada added",
        timestamp: 1_700_000_000_000_000_000n,
        eventType: "beneficiary_added",
      },
      {
        id: 1n,
        prevHash: new Uint8Array([2]),
        hash: new Uint8Array([3]),
        description: "Vault armed",
        timestamp: 1_700_000_000_000_000_000n,
        eventType: "switch_armed",
      },
    ]);
    setActor(actor);

    renderPage(<WalletPage />);

    const ledger = await screen.findByTestId("wallet.transactions");
    expect(within(ledger).getByText("Transaction History")).toBeInTheDocument();
    expect(
      within(ledger).getByText("Beneficiary Ada added"),
    ).toBeInTheDocument();
    expect(within(ledger).getByText("Vault armed")).toBeInTheDocument();
    // Event types are surfaced as uppercase mono labels.
    expect(within(ledger).getByText("beneficiary_added")).toBeInTheDocument();
    expect(within(ledger).getByText("switch_armed")).toBeInTheDocument();
  });

  it("shows the empty transaction state when no audit events exist", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({
      assets: [],
      depositAddress: "",
    });
    actor.getDepositAddress.mockResolvedValue("");
    actor.listAuditEvents.mockResolvedValue([]);
    setActor(actor);

    renderPage(<WalletPage />);

    expect(await screen.findByText("No transactions yet")).toBeInTheDocument();
  });

  it("presents the receive view as a distinct section with its own header", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({
      assets: [],
      depositAddress: "rrkah-fqaaa-aaaaa-aaaaq-cai",
    });
    actor.getDepositAddress.mockResolvedValue("rrkah-fqaaa-aaaaa-aaaaq-cai");
    actor.listAuditEvents.mockResolvedValue([]);
    setActor(actor);

    renderPage(<WalletPage />);

    const receive = await screen.findByTestId("wallet.receive");
    expect(within(receive).getByText("Receive")).toBeInTheDocument();
    expect(
      within(receive).getByText(
        "Send assets to this address to deposit them into the vault.",
      ),
    ).toBeInTheDocument();
    // The receive view carries its own deposit address and copy action.
    expect(
      within(receive).getByText("rrkah-fqaaa-aaaaa-aaaaq-cai"),
    ).toBeInTheDocument();
    expect(
      within(receive).getByRole("button", { name: "Copy address" }),
    ).toBeInTheDocument();
  });

  it("filters the portfolio breakdown to a single asset via the dropdown", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({
      assets: [
        {
          id: 0n,
          symbol: "ICP",
          name: "Internet Computer",
          balance: 100000000n,
          decimals: 8n,
          allocations: [],
        },
        {
          id: 1n,
          symbol: "BTC",
          name: "Bitcoin",
          balance: 50000000n,
          decimals: 8n,
          allocations: [],
        },
      ],
      depositAddress: "",
    });
    actor.getDepositAddress.mockResolvedValue("");
    actor.listAuditEvents.mockResolvedValue([]);
    setActor(actor);

    renderPage(<WalletPage />);

    // Both assets render in the breakdown by default.
    expect(await screen.findByText("Internet Computer")).toBeInTheDocument();
    expect(screen.getByText("Bitcoin")).toBeInTheDocument();

    // Selecting a single asset dims the other row (opacity-40) while keeping
    // the selected one fully visible. This filtering is independent of the
    // OISY connection state and must survive the connect-flow change.
    const dropdown = screen.getByTestId("mock-select");
    fireEvent.change(dropdown, { target: { value: "0" } });

    const icpRow = screen.getByTestId("wallet.asset.item.1");
    const btcRow = screen.getByTestId("wallet.asset.item.2");
    expect(icpRow.className).not.toContain("opacity-40");
    expect(btcRow.className).toContain("opacity-40");
  });
});
