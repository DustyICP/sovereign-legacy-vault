import { PocketIc } from "@dfinity/pic";
// `@icp-sdk/core` is a dependency of the frontend package, not of the app root,
// so a bare `@icp-sdk/core/principal` import is invisible to lane files under
// `app/test/` (Vite resolves bare specifiers from the importer upward). Import
// the frontend's installed copy directly, the same way this file already
// imports the frontend's generated declarations.
import { Principal } from "../../src/frontend/node_modules/@icp-sdk/core/lib/esm/principal/index.js";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

/** The installing principal, which becomes the first (admin) user. */
const OWNER = Principal.fromText("aaaaa-aa");
/** A second principal used for role assignment / caller isolation. */
const OTHER = Principal.fromText("rrkah-fqaaa-aaaaa-aaaaq-cai");

/**
 * A valid 64-hex-character ICP account identifier. The backend's
 * `validateWalletAddress` accepts any 64-hex string (it does not verify the
 * CRC-32 checksum the frontend checks), so this is a stable valid fixture.
 */
const ACCOUNT_ID = "0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a";
/** A second valid 64-hex account identifier. */
const ACCOUNT_ID_2 = "1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b";

let pic: PocketIc | undefined;
let actor: _SERVICE;

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  const installed = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
    sender: OWNER,
  });
  actor = installed.actor;
  actor.setPrincipal(OWNER);
  // The first authenticated caller becomes admin (MixinAuthorization); this is
  // the same call the frontend makes after an Internet Identity sign-in.
  await actor._initialize_access_control();
});

afterAll(async () => {
  // `?.` because `beforeAll` may not have got that far.
  await pic?.tearDown();
});

/** The number of audit events currently on the ledger. */
async function auditCount(): Promise<number> {
  return (await actor.listAuditEvents()).length;
}

describe("vault backend", () => {
  it("exposes the sign-in and role contract without trapping", async () => {
    actor.setPrincipal(OWNER);
    const nonce = await actor._internet_identity_sign_in_start();
    expect(nonce).toBeInstanceOf(Uint8Array);
    expect(await actor.isCallerAdmin()).toBe(true);
    expect(await actor.getCallerUserRole()).toEqual({ admin: null });
  });

  it("serves the public API documentation without trapping", async () => {
    actor.setPrincipal(OWNER);
    const doc = await actor.getApiDoc();
    expect(doc).toContain("Sovereign Legacy");
    expect(doc).toContain("getSwitchState");
  });

  it("answers empty-state reads instead of trapping", async () => {
    actor.setPrincipal(OWNER);
    await expect(actor.listBeneficiaries()).resolves.toEqual([]);
    await expect(actor.listAssets()).resolves.toEqual([]);
    await expect(actor.listAuditEvents()).resolves.toEqual([]);
    const balance = await actor.getWalletBalance();
    expect(balance.assets).toEqual([]);
    expect(balance.totalUsd).toEqual([]);
  });

  it("round-trips a beneficiary through the real canister", async () => {
    actor.setPrincipal(OWNER);
    const added = await actor.addBeneficiary("Ada", 40n, ACCOUNT_ID);
    expect(added).toMatchObject({
      id: 0n,
      name: "Ada",
      allocationShare: 40n,
      walletAddress: ACCOUNT_ID,
    });
    const list = await actor.listBeneficiaries();
    expect(list).toContainEqual(
      expect.objectContaining({ id: added.id, name: "Ada", allocationShare: 40n }),
    );
  });

  it("updates and removes a beneficiary", async () => {
    actor.setPrincipal(OWNER);
    const added = await actor.addBeneficiary("Bob", 30n, ACCOUNT_ID_2);
    const updated = await actor.updateBeneficiary(added.id, "Bobby", 35n, ACCOUNT_ID_2);
    expect(updated).toEqual([
      expect.objectContaining({ id: added.id, name: "Bobby", allocationShare: 35n }),
    ]);
    await expect(actor.removeBeneficiary(added.id)).resolves.toBe(true);
    await expect(actor.removeBeneficiary(added.id)).resolves.toBe(false);
  });

  it("rejects a malformed wallet address as a hard block", async () => {
    actor.setPrincipal(OWNER);
    await expect(actor.addBeneficiary("Bad", 10n, "addr-1")).rejects.toThrow();
    // The rejected call must not have stored the beneficiary.
    const list = await actor.listBeneficiaries();
    expect(list.find((b) => b.name === "Bad")).toBeUndefined();
  });

  it("rejects an allocation sum that would exceed 100%", async () => {
    actor.setPrincipal(OWNER);
    // Ada already holds 40% from the round-trip test; adding 70% would total 110%.
    await expect(actor.addBeneficiary("Over", 70n, ACCOUNT_ID)).rejects.toThrow();
    const list = await actor.listBeneficiaries();
    expect(list.find((b) => b.name === "Over")).toBeUndefined();
  });

  it("rejects a non-positive or oversized switch cadence", async () => {
    actor.setPrincipal(OWNER);
    await expect(actor.armSwitch(0n)).rejects.toThrow();
    await expect(actor.armSwitch(31_536_001n)).rejects.toThrow();
  });

  it("removes a beneficiary's asset allocations on removal", async () => {
    actor.setPrincipal(OWNER);
    const ada = await actor.addBeneficiary("CleanupAda", 20n, ACCOUNT_ID);
    const bob = await actor.addBeneficiary("CleanupBob", 20n, ACCOUNT_ID_2);
    const asset = await actor.addAsset("ICP", "Internet Computer", 100n, 8n, [
      { beneficiaryId: ada.id, share: 10n },
      { beneficiaryId: bob.id, share: 10n },
    ]);
    expect(asset.allocations).toHaveLength(2);

    await expect(actor.removeBeneficiary(ada.id)).resolves.toBe(true);
    const assets = await actor.listAssets();
    const remaining = assets.find((a) => a.id === asset.id);
    expect(remaining?.allocations).toEqual([
      { beneficiaryId: bob.id, share: 10n },
    ]);
  });

  it("arms, checks in, and disarms the switch", async () => {
    actor.setPrincipal(OWNER);
    const initial = await actor.getSwitchState();
    expect(initial.status).toEqual({ disarmed: null });

    const armed = await actor.armSwitch(604800n);
    expect(armed.status).toEqual({ armed: null });
    expect(armed.cadenceSeconds).toBe(604800n);

    const timeline = await actor.getSwitchTimeline();
    expect(timeline.status).toEqual({ armed: null });
    expect(timeline.timeUntilRelease.length).toBe(1);
    expect(timeline.timeSinceLastCheckIn.length).toBe(1);

    const checkedIn = await actor.checkIn();
    expect(checkedIn.status).toEqual({ armed: null });

    const disarmed = await actor.disarmSwitch();
    expect(disarmed.status).toEqual({ disarmed: null });
  });

  it("appends a chained-hash audit entry on every real action", async () => {
    actor.setPrincipal(OWNER);
    const before = await auditCount();

    // A fresh beneficiary add appends a `beneficiary_added` entry.
    const added = await actor.addBeneficiary("AuditAda", 10n, ACCOUNT_ID);
    const afterAdd = await auditCount();
    expect(afterAdd).toBe(before + 1);
    const addEvent = (await actor.listAuditEvents()).at(-1)!;
    expect(addEvent.eventType).toBe("beneficiary_added");
    expect(addEvent.description).toContain("AuditAda");

    // Updating appends a `beneficiary_updated` entry.
    await actor.updateBeneficiary(added.id, "AuditAda2", 10n, ACCOUNT_ID);
    const afterUpdate = await auditCount();
    expect(afterUpdate).toBe(afterAdd + 1);
    expect((await actor.listAuditEvents()).at(-1)!.eventType).toBe("beneficiary_updated");

    // Removing appends a `beneficiary_removed` entry.
    await actor.removeBeneficiary(added.id);
    const afterRemove = await auditCount();
    expect(afterRemove).toBe(afterUpdate + 1);
    expect((await actor.listAuditEvents()).at(-1)!.eventType).toBe("beneficiary_removed");

    // Switch actions append their entries.
    await actor.armSwitch(604800n);
    expect((await actor.listAuditEvents()).at(-1)!.eventType).toBe("switch_armed");
    await actor.checkIn();
    expect((await actor.listAuditEvents()).at(-1)!.eventType).toBe("switch_checked_in");
    await actor.disarmSwitch();
    expect((await actor.listAuditEvents()).at(-1)!.eventType).toBe("switch_disarmed");

    // Adding an asset appends an `asset_added` entry.
    await actor.addAsset("BTC", "Bitcoin", 1n, 8n, []);
    expect((await actor.listAuditEvents()).at(-1)!.eventType).toBe("asset_added");
  });

  it("keeps the chained-hash format across consecutive audit entries", async () => {
    actor.setPrincipal(OWNER);
    const first = await actor.appendAuditEvent("SECURITY", "Vault armed");
    const second = await actor.appendAuditEvent("VERIFICATION", "Check-in recorded");
    expect(second.id).toBe(first.id + 1n);
    expect(second.prevHash).toEqual(first.hash);
    expect(first.hash).toBeInstanceOf(Uint8Array);
    expect(second.hash).toBeInstanceOf(Uint8Array);
    const events = await actor.listAuditEvents();
    expect(events.at(-1)).toMatchObject({
      eventType: "VERIFICATION",
      description: "Check-in recorded",
    });
  });

  it("reports wallet balance from held assets", async () => {
    actor.setPrincipal(OWNER);
    const asset = await actor.addAsset("ICP", "Internet Computer", 125000000n, 8n, []);
    expect(asset).toMatchObject({ symbol: "ICP", balance: 125000000n, decimals: 8n });
    const balance = await actor.getWalletBalance();
    expect(balance.assets).toContainEqual(
      expect.objectContaining({ symbol: "ICP", balance: 125000000n }),
    );
  });

  it("assigns roles and enforces per-caller access", async () => {
    actor.setPrincipal(OWNER);
    await actor.assignCallerUserRole(OTHER, { user: null });

    actor.setPrincipal(OTHER);
    // A `user` role can read the shared vault data without trapping. The list is
    // not empty here because earlier tests added beneficiaries to this canister.
    await expect(actor.listBeneficiaries()).resolves.toBeDefined();

    // Anonymous callers are guests and must be rejected.
    actor.setPrincipal(Principal.anonymous());
    await expect(actor.listBeneficiaries()).rejects.toThrow();
    await expect(actor.getSwitchState()).rejects.toThrow();
  });
});
