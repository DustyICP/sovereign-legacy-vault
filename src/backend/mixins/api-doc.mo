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

### The Switch (inactivity timelines)

The switch is a dead man's switch: a single state record that the app's owner arms, disarms, and checks in against. It is configured with three separately configurable inactivity parameters (in days) that replace the old single cadence: how many days of inactivity before the first email warning goes out, how frequently subsequent warnings repeat, and the total days of inactivity before the vault triggers and releases to beneficiaries. The backend stores the switch state and reports it to the frontend; it does not itself execute any release or dispatch any email. The switch state is exposed through the role-guarded methods below and through the OQL `switchState` entity.

- `getSwitchState() : async SwitchState` — query. Returns the current switch state record, including the three timeline parameters.
- `armSwitch(warningOnsetDays : Nat, warningRepeatDays : Nat, triggerDays : Nat) : async SwitchState` — update. Arms the switch, records the current time as both `armedAt` and `lastCheckIn`, and stores the three inactivity parameters. All three must be at least 1 day, and `warningOnsetDays` must be strictly less than `triggerDays`; otherwise the call traps with `Invalid timeline: all three inactivity parameters must be at least 1 day` or `Invalid timeline: warning onset must occur before the trigger day`.
- `disarmSwitch() : async SwitchState` — update. Disarms the switch and records the current time as the last check-in.
- `checkIn() : async SwitchState` — update. \"I'm still here\": records the current time as the last check-in, resetting the inactivity clock back to zero. This is the check-in / \"log\" action tied to each warning.
- `getSwitchTimeline() : async SwitchTimeline` — query. Returns the switch status and timing information used to drive the countdown UI, including `timeUntilWarning` and `timeUntilTrigger` in seconds.

### Beneficiaries

- `addBeneficiary(name : Text, allocationShare : Nat, walletAddress : Text) : async Beneficiary` — update. Appends a beneficiary with a fresh id and `createdAt` = now. Validates the `walletAddress` format (hard block) and enforces that the sum of `allocationShare` across all beneficiaries stays at or below 100.
- `listBeneficiaries() : async [Beneficiary]` — query.
- `updateBeneficiary(id : Nat, name : Text, allocationShare : Nat, walletAddress : Text) : async ?Beneficiary` — update. Returns `null` when no beneficiary has that id. Applies the same wallet-address and allocation-sum validation as `addBeneficiary`; the updated share replaces the beneficiary's previous share in the sum.
- `removeBeneficiary(id : Nat) : async Bool` — update. Returns `false` when no beneficiary has that id. Also removes the removed beneficiary's asset-allocation entries from every asset, so remaining allocation totals stay consistent.

### Assets & wallet balance

- `addAsset(symbol : Text, name : Text, balance : Nat, decimals : Nat, allocations : [AssetAllocation]) : async Asset` — update. Appends an asset with a fresh id.
- `listAssets() : async [Asset]` — query.
- `getDepositAddress() : async Text` — query. Returns the deposit address for receiving funds: the caller's principal in its canonical textual form. This is the address the receive view shows (alongside a QR code rendered client-side).
- `getWalletBalance() : async WalletBalance` — query. Returns `{ assets : [Asset]; totalUsd : ?Nat; depositAddress : Text }`. `totalUsd` is always `null`; per-asset and portfolio USD values are **not** stored on-chain. They are computed client-side from the live CoinGecko public price feed (`api.coingecko.com`, keyless) and combined with each asset's on-chain `balance`/`decimals`.
- `getOverview() : async Overview` — query. Returns a summary snapshot for the Overview tab: the vault balance (`vaultBalance`), the beneficiary count and total allocation share (`beneficiaryCount`, `totalAllocationShare`), the switch status and timeline (`switchStatus`, `timeline`), and a condensed recent-activity feed (`recentActivity`, the last five audit log entries).

### Audit log

- `appendAuditEvent(eventType : Text, description : Text) : async AuditEvent` — update. Appends an event chained to the previous event's hash. The backend also calls this automatically on every real action (see below); the endpoint remains public for manual appends.
- `listAuditEvents() : async [AuditEvent]` — query.

The backend automatically appends a chained-hash audit entry on every real action:

- `login` — a user signs in through the app's frontend.
- `beneficiary_added` / `beneficiary_updated` / `beneficiary_removed` — a beneficiary is added, updated, or removed (removal entries note the allocation cleanup).
- `switch_armed` / `switch_disarmed` / `switch_checked_in` — the switch is armed, disarmed, or checked in.
- `asset_added` — an asset is added.

All entries keep the existing chained-hash format: each event's `hash` is the SHA-256 of its id, timestamp, event type, description, and the previous event's `hash` (`prevHash`); the first event chains from an empty blob.

### OQL

- `schema()` — returns the OQL schema describing the exposed entities.
- `execute(query)` — runs an OQL query against the exposed entities.

All OQL entities are controller-only: `schema()` and `execute()` are readable by the platform's Data Intelligence agent (the controller), not by end users through OQL. The app's own frontend reads data through the role-guarded methods above.

Exposed entities:

- `switchState` — the switch state (single row). Columns: `status` (Text, `\"armed\"` or `\"disarmed\"`), `warningOnsetDays` (Nat), `warningRepeatDays` (Nat), `triggerDays` (Nat), `lastCheckIn` (Int nanoseconds, `0` when never checked in), `armedAt` (Int nanoseconds, `0` when never armed).
- `beneficiary` — beneficiaries. Columns: `id`, `name`, `allocationShare`, `walletAddress`, `createdAt` (Int nanoseconds).
- `asset` — held assets. Columns: `id`, `symbol`, `name`, `balance`, `decimals`, `allocationCount` (Nat; the number of beneficiary allocations on the asset).
- `auditEvent` — tamper-evident audit entries. Columns: `id`, `timestamp` (Int nanoseconds), `eventType`, `description`, `prevHash`, `hash` (both 32-byte SHA-256 blobs).

## Units and encodings

- Timestamps (`Timestamp`, `lastCheckIn`, `armedAt`, `createdAt`, `AuditEvent.timestamp`) are `Int` nanoseconds since the Unix epoch (`Time.now()`).
- `timeSinceLastCheckIn`, `timeUntilWarning`, and `timeUntilTrigger` are `?Nat` seconds (`null` when the switch is not armed).
- The three inactivity parameters `warningOnsetDays`, `warningRepeatDays`, and `triggerDays` are `Nat` values in days.
- `SwitchStatus` is a variant: `#armed` or `#disarmed`.
- Audit hashes (`prevHash`, `hash`) are 32-byte SHA-256 `Blob`s.
- Identifiers (`Beneficiary.id`, `Asset.id`, `AuditEvent.id`) are `Nat`s assigned monotonically from 0.
- `allocationShare` is a plain `Nat` percentage. The backend enforces that the sum of `allocationShare` across all beneficiaries never exceeds 100: `addBeneficiary` and `updateBeneficiary` trap when the new total would exceed 100.
- `totalUsd` is `?Nat` and is always `null` in the current backend. Per-asset and portfolio USD values are computed client-side from the CoinGecko public price feed, not stored on-chain.
- `depositAddress` is a `Text` — the caller's principal in canonical textual form.

## Lifecycle and polling

- Switch lifecycle: `disarmed` → `armSwitch(warningOnsetDays, warningRepeatDays, triggerDays)` → `armed`; `checkIn()` refreshes `lastCheckIn` (resetting the inactivity clock to zero); `disarmSwitch()` returns to `disarmed`.
- While armed, `getSwitchTimeline()` reports `timeSinceLastCheckIn`, `timeUntilWarning`, and `timeUntilTrigger` in seconds, derived from the three day-based parameters. The backend only reports this state; it does not itself execute a release or dispatch a warning email.
- Polling: `getSwitchTimeline`, `getSwitchState`, `getWalletBalance`, `getDepositAddress`, and `getOverview` are queries and cheap to poll. Poll `getSwitchTimeline` to drive the countdown UI.

## Mutation retry safety

- `addBeneficiary`, `addAsset`, and `appendAuditEvent` are not idempotent: each call appends a new record with a fresh id. Retrying after an ambiguous failure can create duplicates; there is no deduplication key.
- `armSwitch`, `disarmSwitch`, and `checkIn` are idempotent in effect — they overwrite state.
- `updateBeneficiary` and `removeBeneficiary` are idempotent in effect; calling them for an unknown id returns `null` / `false` without error.
- `removeBeneficiary` also removes every asset-allocation entry referencing the removed beneficiary from all assets; allocations for remaining beneficiaries are unchanged.

## Errors, traps, and limits

- Every guarded endpoint traps with `Unauthorized` when the caller is anonymous or lacks the `#user` role. The trap rolls back the whole message; the caller cannot branch on it.
- `updateBeneficiary` and `removeBeneficiary` return `null` / `false` for unknown ids (no trap).
- Validation is a hard block: the call traps and the whole message is rolled back, so invalid values are never stored.
  - `walletAddress` is optional: a blank/empty value is accepted (no wallet is set). When present, it must be either a 64-hexadecimal-character ICP account identifier or a valid ICP principal (validated via `Principal.fromText`). Anything else is rejected as malformed (hard block): a 64-character value containing non-hexadecimal characters traps with `Invalid wallet address: account identifier must be exactly 64 hexadecimal characters`, and any other non-blank value that is not a valid principal traps when the principal parser rejects it.
  - Allocation shares: `addBeneficiary` / `updateBeneficiary` trap with `Invalid allocation: total allocation share would exceed 100%` when the summed shares across all beneficiaries would exceed 100.
  - `armSwitch` traps with `Invalid timeline: all three inactivity parameters must be at least 1 day` when any of `warningOnsetDays`, `warningRepeatDays`, or `triggerDays` is 0, and with `Invalid timeline: warning onset must occur before the trigger day` when `warningOnsetDays >= triggerDays`.
- Validation failures trap before any audit entry is appended, so a rejected call leaves no audit trail.
- `getWalletBalance().totalUsd` is always `null`; do not rely on it for a USD total. Compute per-asset and portfolio USD values client-side from the CoinGecko public price feed.
"
  };
};
