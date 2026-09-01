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
    const added = await actor.addBeneficiary("Ada", 40n, "addr-1");
    expect(added).toMatchObject({
      id: 0n,
      name: "Ada",
      allocationShare: 40n,
      walletAddress: "addr-1",
    });
    const list = await actor.listBeneficiaries();
    expect(list).toContainEqual(
      expect.objectContaining({ id: added.id, name: "Ada", allocationShare: 40n }),
    );
  });

  it("updates and removes a beneficiary", async () => {
    actor.setPrincipal(OWNER);
    const added = await actor.addBeneficiary("Bob", 30n, "addr-2");
    const updated = await actor.updateBeneficiary(added.id, "Bobby", 35n, "addr-2b");
    expect(updated).toEqual([
      expect.objectContaining({ id: added.id, name: "Bobby", allocationShare: 35n }),
    ]);
    await expect(actor.removeBeneficiary(added.id)).resolves.toBe(true);
    await expect(actor.removeBeneficiary(added.id)).resolves.toBe(false);
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

  it("records audit events with chained hashes", async () => {
    actor.setPrincipal(OWNER);
    const first = await actor.appendAuditEvent("SECURITY", "Vault armed");
    expect(first.id).toBe(0n);
    expect(first.eventType).toBe("SECURITY");
    expect(first.hash).toBeInstanceOf(Uint8Array);
    const second = await actor.appendAuditEvent("VERIFICATION", "Check-in recorded");
    expect(second.id).toBe(1n);
    expect(second.prevHash).toEqual(first.hash);
    const events = await actor.listAuditEvents();
    expect(events).toHaveLength(2);
    expect(events[1]).toMatchObject({ eventType: "VERIFICATION", description: "Check-in recorded" });
  });

  it("reports wallet balance from held assets", async () => {
    actor.setPrincipal(OWNER);
    const asset = await actor.addAsset("ICP", "Internet Computer", 125000000n, 8n, []);
    expect(asset).toMatchObject({ id: 0n, symbol: "ICP", balance: 125000000n, decimals: 8n });
    const balance = await actor.getWalletBalance();
    expect(balance.assets).toHaveLength(1);
    expect(balance.assets[0]).toMatchObject({ symbol: "ICP", balance: 125000000n });
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
