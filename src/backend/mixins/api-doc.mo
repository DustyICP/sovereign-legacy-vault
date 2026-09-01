mixin () {
  public query func getApiDoc() : async Text {
    "# Sovereign Legacy — Backend API

## Purpose

Sovereign Legacy is a self-sovereign digital inheritance vault running on the Internet Computer. The backend stores the beneficiary list with allocation shares, the held crypto assets, and a tamper-evident audit log. All data is private to the app's registered users; there is no public read surface.

## Authentication and authorization

Every data endpoint is role-guarded and requires a signed-in (non-anonymous) caller holding at least the `#user` role. Anonymous callers and signed-in callers without a role are rejected with a trap: `Runtime.trap(\"Unauthorized\")` — the call is rejected with the message `Unauthorized`.

Registration happens through the app's frontend. The first signed-in caller to call `_initialize_access_control` becomes the admin; subsequent signed-in callers receive the `#user` role. A direct API caller must call `_initialize_access_control` once as a signed-in caller before any role-guarded call, guarded queries included. An admin can change roles with `assignCallerUserRole`.

A caller can be unregistered even when the app seems to know it: registration happens only when a caller signs in through the app's own frontend, so a principal that never did so is unregistered even when it belongs to the app's owner, and a signed-in caller derived against a different origin is a different principal than the one the frontend registered.

The app's frontend pins an Internet Identity derivation origin, published at `/.well-known/ii-derivation-origin` when available. An agent already holding the user's Internet Identity authorization derives the correct per-app principal against that origin (for example `icp identity link web <name> --app <host>`). Such a delegation acts with the user's full authority in this app until it expires.

## Public methods

### Authorization (MixinAuthorization)

- `_initialize_access_control` — registers the caller. The first signed-in caller becomes admin; later signed-in callers become users.
- `assignCallerUserRole(user, role)` — assigns a role to a principal (admin-only).
- `getCallerUserRole()` — returns the caller's role.
- `isCallerAdmin()` — whether the caller is an admin.
- `_internet_identity_sign_in_start` / `_internet_identity_sign_in_finish` — Internet Identity sign-in flow used by the frontend.
- `__accessControlState` — access-control state inspection.
- `getApiDoc()` — this document.

### The Switch

The switch is a dead man's switch: a single state record that the app's owner arms, disarms, and checks in against. The backend stores the switch state and reports it to the frontend; it does not itself execute any release. The switch state is exposed through the role-guarded methods below and through the OQL `switchState` entity.

- `getSwitchState() : async SwitchState` — query. Returns the current switch state record.
- `armSwitch(cadenceSeconds : Nat) : async SwitchState` — update. Arms the switch and records the current time.
- `disarmSwitch() : async SwitchState` — update. Disarms the switch and records the current time.
- `checkIn() : async SwitchState` — update. \"I'm still here\": records the current time as the last check-in.
- `getSwitchTimeline() : async SwitchTimeline` — query. Returns the switch status and timing information used to drive the countdown UI.

### Beneficiaries

- `addBeneficiary(name : Text, allocationShare : Nat, walletAddress : Text) : async Beneficiary` — update. Appends a beneficiary with a fresh id and `createdAt` = now.
- `listBeneficiaries() : async [Beneficiary]` — query.
- `updateBeneficiary(id : Nat, name : Text, allocationShare : Nat, walletAddress : Text) : async ?Beneficiary` — update. Returns `null` when no beneficiary has that id.
- `removeBeneficiary(id : Nat) : async Bool` — update. Returns `false` when no beneficiary has that id.

### Assets & wallet balance

- `addAsset(symbol : Text, name : Text, balance : Nat, decimals : Nat, allocations : [AssetAllocation]) : async Asset` — update. Appends an asset with a fresh id.
- `listAssets() : async [Asset]` — query.
- `getWalletBalance() : async WalletBalance` — query. Returns `{ assets : [Asset]; totalUsd : ?Nat }`; `totalUsd` is currently always `null`.

### Audit log

- `appendAuditEvent(eventType : Text, description : Text) : async AuditEvent` — update. Appends an event chained to the previous event's hash.
- `listAuditEvents() : async [AuditEvent]` — query.

### OQL

- `schema()` — returns the OQL schema describing the exposed entities.
- `execute(query)` — runs an OQL query against the exposed entities.

All OQL entities are controller-only: `schema()` and `execute()` are readable by the platform's Data Intelligence agent (the controller), not by end users through OQL. The app's own frontend reads data through the role-guarded methods above.

Exposed entities:

- `switchState` — the switch state (single row). Columns: `status` (Text, `\"armed\"` or `\"disarmed\"`), `cadenceSeconds` (Nat), `lastCheckIn` (Int nanoseconds, `0` when never checked in), `armedAt` (Int nanoseconds, `0` when never armed).
- `beneficiary` — beneficiaries. Columns: `id`, `name`, `allocationShare`, `walletAddress`, `createdAt` (Int nanoseconds).
- `asset` — held assets. Columns: `id`, `symbol`, `name`, `balance`, `decimals`, `allocationCount` (Nat; the number of beneficiary allocations on the asset).
- `auditEvent` — tamper-evident audit entries. Columns: `id`, `timestamp` (Int nanoseconds), `eventType`, `description`, `prevHash`, `hash` (both 32-byte SHA-256 blobs).

## Units and encodings

- Timestamps (`Timestamp`, `lastCheckIn`, `armedAt`, `createdAt`, `AuditEvent.timestamp`) are `Int` nanoseconds since the Unix epoch (`Time.now()`).
- `timeSinceLastCheckIn` and `timeUntilRelease` are `Nat` seconds.
- `cadenceSeconds` is a `Nat` in seconds.
- `SwitchStatus` is a variant: `#armed` or `#disarmed`.
- Audit hashes (`prevHash`, `hash`) are 32-byte SHA-256 `Blob`s.
- Identifiers (`Beneficiary.id`, `Asset.id`, `AuditEvent.id`) are `Nat`s assigned monotonically from 0.
- `allocationShare` and `AssetAllocation.share` are plain `Nat`s; the backend does not validate that shares sum to any total.
- `totalUsd` is `?Nat` and is always `null` in the current backend.

## Lifecycle and polling

- Switch lifecycle: `disarmed` → `armSwitch(cadenceSeconds)` → `armed`; `checkIn()` refreshes `lastCheckIn`; `disarmSwitch()` returns to `disarmed`.
- While armed, `getSwitchTimeline()` reports `timeSinceLastCheckIn` and `timeUntilRelease` in seconds. The backend only reports this state; it does not itself execute a release.
- Polling: `getSwitchTimeline` and `getSwitchState` are queries and cheap to poll. Poll `getSwitchTimeline` to drive the countdown UI.

## Mutation retry safety

- `addBeneficiary`, `addAsset`, and `appendAuditEvent` are not idempotent: each call appends a new record with a fresh id. Retrying after an ambiguous failure can create duplicates; there is no deduplication key.
- `armSwitch`, `disarmSwitch`, and `checkIn` are idempotent in effect — they overwrite state.
- `updateBeneficiary` and `removeBeneficiary` are idempotent in effect; calling them for an unknown id returns `null` / `false` without error.
- `removeBeneficiary` does not touch asset allocations that reference the removed beneficiary.

## Errors, traps, and limits

- Every guarded endpoint traps with `Unauthorized` when the caller is anonymous or lacks the `#user` role. The trap rolls back the whole message; the caller cannot branch on it.
- `updateBeneficiary` and `removeBeneficiary` return `null` / `false` for unknown ids (no trap).
- The backend performs no validation of `allocationShare` sums, `cadenceSeconds > 0`, or `walletAddress` format — invalid values are stored as given.
- `getWalletBalance().totalUsd` is always `null`; do not rely on it for a USD total.
"
  };
};
