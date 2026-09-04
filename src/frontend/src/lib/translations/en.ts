/**
 * English is the source-of-truth dictionary. Every user-facing string in the
 * app lives here. Other locale files provide a `Partial<Translations>` and
 * fall back to English for any key they do not yet cover, so the app is never
 * left with a missing string.
 *
 * The brand name "Sovereign Legacy" is intentionally left untranslated in
 * every locale.
 */
export const en = {
  meta: {
    title: "Sovereign Legacy — The Vault",
    description:
      "Sovereign Legacy — The Vault. Your vault. Sealed until it isn't.",
  },
  common: {
    cancel: "Cancel",
    saveChanges: "Save changes",
    edit: "Edit",
    remove: "Remove",
    name: "Name",
    optional: "Optional",
    addBeneficiary: "Add beneficiary",
    allocationShare: "Allocation share (%)",
    walletAddress: "Wallet address",
    checkInCadence: "Check-in cadence",
    selectCadence: "Select cadence",
    armed: "Armed",
    disarmed: "Disarmed",
    arming: "Arming…",
    disarming: "Disarming…",
    saving: "Saving…",
    removing: "Removing…",
    arm: "Arm",
    disarm: "Disarm",
  },
  nav: {
    dashboard: "Dashboard",
    beneficiaries: "Beneficiaries",
    legacyAssets: "Legacy & Assets",
    theSwitch: "The Switch",
    auditLogs: "Audit Logs",
    settings: "Settings",
  },
  tabs: {
    overview: "Overview",
    wallet: "Wallet",
    beneficiary: "Beneficiary",
    timelines: "Timelines",
  },
  sidebar: {
    beneficiaries: "Beneficiaries",
    noBeneficiaries: "No beneficiaries yet",
    noWallet: "No wallet address",
    settings: "Settings",
  },
  header: {
    home: "Sovereign Legacy home",
    networkBadge: "Network · Identity",
    mobileMenu: "Open navigation menu",
    mobilePrimary: "Mobile primary",
  },
  footer: {
    copyright: "© {year}. Sovereign Legacy — The Vault. All rights reserved.",
    tagline: "Sealed until it isn't",
  },
  loading: {
    openingVault: "Opening vault…",
  },
  language: {
    label: "Language",
  },
  landing: {
    eyebrow: "Self-sovereign inheritance",
    headline1: "Your vault.",
    headline2: "Sealed until it isn't.",
    login: "Login with Internet Identity",
    subhead:
      "A digital dead man's switch for crypto, built natively on the Internet Computer — no probate, no delays, no one watching but the chain itself.",
    vaultDoorAlt:
      "A weathered brass and steel bank vault door, closed, with the Internet Computer infinity-loop emblem glowing faintly at its center.",
    introduction: {
      eyebrow: "Introduction",
      heading: "The Dead Man's Switch — Born in the Age of Steam",
      p1: "In the closing decades of the nineteenth century, a new kind of machine was reshaping civilization. Electric streetcars now threaded their way through crowded cities, and elevators lifted passengers skyward in buildings of unprecedented height. They were marvels — and they were dangerous.",
      p2: "The problem was simple and terrifying: what happens when the man in control is no longer in control? A motorman could suffer a heart attack at the helm. An elevator operator might lose consciousness mid-ride. And the machine, indifferent to the fate of its operator, would simply continue — until it hit something that stopped it.",
      p3: "It was the American engineer Frank J. Sprague who, in 1888, electrified the streetcar lines of Richmond, Virginia — the first successful electric street railway in the United States. His innovation did not stop at the motor. Sprague understood that a vehicle carrying passengers at speed needed a way to stop itself if the operator became incapacitated.",
      p4: "They called it the dead man's switch. Hold the handle to keep moving. Release it — whether from distraction, illness, or death — and the machine stops itself. The name was not chosen for drama. It was chosen for precision. The switch was activated by the absence of the living hand.",
      p5: "The idea spread quickly. Subways in New York, London, and Tokyo adopted it. Nuclear power stations built it into their control rods. Commercial aircraft embedded it in their autopilots. Anywhere a machine carried lives, the dead man's switch followed — silent, patient, waiting.",
      h3a: "So How Does a Dead Man's Switch Work in These Times?",
      p6: "You've worked hard. You've accumulated crypto assets — ICP, Bitcoin, Ethereum, stablecoins. They sit in wallets and canisters, secured by private keys that only you possess. And like the motorman gripping the handle, only your living, active presence on the network keeps the circuit closed.",
      p7: "Here's how Sovereign Legacy applies the same principle. You deposit assets into a secure on-chain canister vault. You designate one or more beneficiaries and set a network inactivity period. As long as you log in periodically, the switch stays closed. The moment that activity stops, Sovereign Legacy sends you alerts. If you do not respond, the transfer executes automatically, moving your assets to your chosen beneficiaries without lawyers, courts, or delays.",
      h3b: "Want to Personalize Your Wishes?",
      p8: "If you'd like more than one recipient — a spouse, children, a trusted friend, a charitable cause — Sovereign Legacy lets you divide your assets by percentage. You set the shares. Your beneficiaries receive exactly what you intended.",
    },
    advantages: {
      eyebrow: "Why it works",
      heading: "The Advantages Are Built Into Every Step",
      card1: {
        title: "No lawyers. No probate. No delays.",
        body: "The canister executes your instructions the moment the dead man's switch triggers. No institution stands between your wishes and the people you love.",
      },
      card2: {
        title: "You stay in control.",
        body: "Change beneficiaries, adjust percentages, or update your message at any time. Everything updates instantly, on-chain.",
      },
      card3: {
        title: "Works while you sleep.",
        body: "If life goes on, Sovereign Legacy stays quiet. If it does not, everything moves forward exactly as you planned.",
      },
      card4: {
        title: "Global reach.",
        body: "Beneficiaries can be anywhere in the world. Sovereign Legacy speaks multiple languages and handles the explanation so you do not have to.",
      },
      card5: {
        title: "Your data stays yours.",
        body: "Your vault is a canister on the Internet Computer, secured by your Internet Identity. No third party — including Sovereign Legacy itself — has access to its contents.",
      },
    },
    faq: {
      eyebrow: "Questions",
      heading: "Frequently Asked Questions",
      q1: {
        q: "What languages does Sovereign Legacy support?",
        a: "The app supports 22 languages, including right-to-left languages such as Arabic, Persian, and Urdu, so beneficiaries anywhere in the world can understand a release notice in their own language.",
      },
      q2: {
        q: "How secure is my vault?",
        a: "Your vault is a canister on the Internet Computer, secured by your Internet Identity. Only your authenticated principal can view or manage its contents.",
      },
      q3: {
        q: "Could I ever lose my vault?",
        a: "As long as you retain access to your Internet Identity, your vault remains under your control. The main risk is losing your Internet Identity credentials, which is why keeping a secure backup of your recovery method matters.",
      },
      q4: {
        q: "How are assets divided among beneficiaries?",
        a: "You assign each beneficiary a percentage share. Shares can be adjusted at any time before release, and the total allocated across all beneficiaries must never exceed 100%.",
      },
      q5: {
        q: "How do I reset the network inactivity timer?",
        a: "Simply log in with your Internet Identity. Any authenticated check-in resets the inactivity clock and keeps the dead man's switch armed.",
      },
      q6: {
        q: "How do I add a beneficiary?",
        a: "From your dashboard, open the Beneficiaries panel and add a name, contact information, and allocation percentage.",
      },
      q7: {
        q: "Can I change my beneficiaries after setup?",
        a: "Yes. Beneficiaries, allocations, and personal messages can all be updated at any time — changes take effect immediately, on-chain.",
      },
      q8: {
        q: "Who can see my beneficiaries?",
        a: "Only you, while authenticated as the vault's owner.",
      },
    },
    terms: {
      eyebrow: "Terms",
      heading: "Terms & Conditions",
      card1: {
        title: "1. Overview",
        body: "ICP Sovereign Legacy is a decentralized, fully on-chain inheritance and dead-man's-switch platform built on the Internet Computer Protocol (ICP). By using this service, you agree to these terms.",
      },
      card2: {
        title: "2. No Liability",
        body: "The developers are not liable for any loss of assets resulting from incorrect configuration, lost Internet Identity credentials, blockchain network conditions, or any other cause. Use this service at your own risk.",
      },
      card3: {
        title: "3. Autonomous Execution",
        body: "Asset distribution is executed automatically by on-chain smart contract logic when your dead-man's-switch triggers. No human intervention is required or possible once triggered.",
      },
      card4: {
        title: "4. Privacy",
        body: "Your beneficiary list is stored on-chain and accessible only to your authenticated Internet Identity principal. No third party can view your data.",
      },
      card5: {
        title: "5. Fees",
        body: "This service is provided as described within the app. Any fees that apply to a specific action are shown clearly in the app before you confirm that action — no hidden or recurring charges.",
      },
      card6: {
        title: "6. Eligibility",
        body: "You must be at least 18 years old (or the age of majority in your jurisdiction) and have the legal capacity to enter into these terms to use this service.",
      },
      card7: {
        title: "7. No Warranty",
        body: 'This service is provided "as is" and "as available," without warranties of any kind, whether express or implied, including any warranty of uninterrupted or error-free operation.',
      },
      card8: {
        title: "8. Assumption of Risk",
        body: "Cryptocurrency and blockchain technology carry inherent risks, including price volatility, network congestion, smart contract vulnerabilities, and changes to underlying protocols. By using this service, you accept these risks.",
      },
      card9: {
        title: "9. Termination",
        body: "Access to this service may be suspended or terminated for violation of these terms or for conduct that Sovereign Legacy determines, in its discretion, to be harmful to other users or to the service itself.",
      },
      card10: {
        title: "10. Modifications to These Terms",
        body: "These terms may be updated from time to time. Material changes will be presented within the app, and continued use of the service after such changes constitutes acceptance of the updated terms.",
      },
    },
  },
  dashboard: {
    eyebrow: "Dashboard",
    title: "The Vault",
    balance: "Vault Balance",
    assetsHeld: "{count} asset(s) held",
    noAssets: "No assets held yet",
    beneficiaries: "Beneficiaries",
    named: "named",
    sealed: "{count} beneficiary(ies) sealed",
    none: "No beneficiaries yet",
    allocation: "Beneficiary Allocation",
    allocationNone: "No allocations yet. Add a beneficiary to begin.",
    allocationAria: "Beneficiary allocation shares",
    allocated: "allocated",
    switch: "The Switch",
    lastVerified: "Last verified · {time}",
    notVerified: "Not yet verified",
  },
  beneficiaries: {
    eyebrow: "Beneficiaries",
    title: "Beneficiaries",
    subtitle:
      "The people and causes your legacy is sealed for. Allocation, order, and conditions live here.",
    allocation: "Allocation",
    count: "{count} beneficiary(ies)",
    noAllocations: "No allocations yet. Add a beneficiary to begin.",
    allocationAria: "Beneficiary allocation shares",
    manage: "Manage",
    manageBody:
      "Add a beneficiary and assign their share of the vault. Shares can be edited or revoked at any time.",
    loadError: "Could not load beneficiaries. Please try again.",
    emptyTitle: "No beneficiaries yet",
    emptyBody:
      "Your legacy is unassigned. Add your first beneficiary to seal the vault for someone.",
    noWallet: "No wallet address",
    editAria: "Edit {name}",
    removeAria: "Remove {name}",
    modal: {
      editTitle: "Edit beneficiary",
      addTitle: "Add beneficiary",
      editDesc:
        "Update the name, share, or wallet address for this beneficiary.",
      addDesc: "Assign a name and allocation share to a new beneficiary.",
    },
    namePlaceholder: "e.g. Elena Marchetti",
    sharePlaceholder: "e.g. 40",
    errors: {
      nameRequired: "Enter a name for this beneficiary.",
      sharePositive: "Allocation share must be greater than zero.",
      invalidChecksum:
        "This ICP account identifier has an invalid checksum. Double-check the address.",
      invalidWallet:
        "Enter a valid ICP wallet address — a 64-character account identifier or an ICP principal.",
      totalExceedsEdit:
        "This would bring the total allocation to {total}%, exceeding the 100% limit.",
      totalExceedsAdd:
        "Total allocation would be {total}%, exceeding the 100% limit.",
      saveFailed: "Could not save changes. Please try again.",
      addFailed: "Could not add beneficiary. Please try again.",
    },
  },
  assets: {
    eyebrow: "Legacy & Assets",
    title: "Held Assets",
    subtitle:
      "Everything held in the vault — balances, holdings, and the instructions that govern them.",
    assetsHeld: "Assets Held",
    beneficiaries: "Beneficiaries",
    allocationStatus: "Allocation Status",
    sealed: "Sealed",
    unallocated: "Unallocated",
    beneficiaryFallback: "Beneficiary #{id}",
    errorEyebrow: "Vault unreachable",
    errorBody: "We couldn't read the held assets. Please try again.",
    emptyEyebrow: "No assets held",
    emptyBody:
      "The vault currently holds no crypto assets. Once assets are added, their balances and beneficiary allocations will appear here.",
    allocationLabel: "Beneficiary Allocation",
  },
  switch: {
    eyebrow: "The Switch",
    title: "The Switch",
    subtitle:
      "The single control that hands the vault over. Armed, verified, and deliberate.",
    active: "Active · Dead man's switch",
    standingDown: "Standing down",
    armed: "ARMED",
    disarmed: "DISARMED",
    checkIn: "I'm still here",
    arm: "Arm the switch",
    disarm: "Disarm",
    cadence: "Cadence · {duration}",
    releaseIn: "Release in {duration}",
    timelineAriaArmed:
      "Dead man's switch timeline, {percent}% of cadence elapsed",
    timelineAriaDisarmed: "Dead man's switch timeline, disarmed",
    lastCheckIn: "Last check-in",
    armedAt: "Armed at",
    cadenceLabel: "Cadence",
    standingDownTitle: "Standing down",
    standingDownBody:
      "Disarming halts the dead man's switch. The vault stays sealed, but it will no longer release to your beneficiaries on a missed check-in.",
    disarmTheSwitch: "Disarm the switch",
    armTitle: "Arm the switch",
    armBody:
      "Choose how long the vault waits for your next check-in. If you miss it, the vault releases to your beneficiaries.",
    cadenceError:
      "Choose a check-in cadence greater than zero before arming the switch.",
    errorEyebrow: "Switch unreachable",
    errorBody: "We couldn't read the switch state. Please try again.",
    cadence24h: "24 hours",
    cadence7d: "7 days",
    cadence30d: "30 days",
  },
  timelines: {
    eyebrow: "Timelines",
    title: "Inactivity Timelines",
    subtitle:
      "Three separately configurable inactivity parameters govern when the vault warns you and when it finally releases to your beneficiaries.",
    active: "Active · Dead man's switch",
    standingDown: "Standing down",
    armed: "ARMED",
    disarmed: "DISARMED",
    checkIn: "I'm still here",
    log: "Log check-in",
    arm: "Arm the switch",
    disarm: "Disarm",
    lastCheckIn: "Last check-in",
    armedAt: "Armed at",
    warningIn: "First warning in {duration}",
    triggerIn: "Vault triggers in {duration}",
    noWarningScheduled: "No warning scheduled",
    noTriggerScheduled: "No trigger scheduled",
    timelineAriaArmed:
      "Inactivity timeline, first warning in {warning}, vault triggers in {trigger}",
    timelineAriaDisarmed: "Inactivity timeline, disarmed",
    standingDownTitle: "Standing down",
    standingDownBody:
      "Disarming halts the dead man's switch. The vault stays sealed, but it will no longer warn you or release to your beneficiaries on a missed check-in.",
    disarmTheSwitch: "Disarm the switch",
    armTitle: "Arm the switch",
    armBody:
      "Set the three inactivity parameters below, then arm the switch. If you stop checking in, the vault warns you and eventually releases to your beneficiaries.",
    armError: "Could not arm the switch",
    armErrorDesc: "The vault could not be armed. Please try again.",
    disarmedToast: "The switch disarmed",
    disarmedToastDesc: "The vault is no longer armed.",
    armedToast: "The switch armed",
    armedToastDesc: "Inactivity timelines are now active.",
    checkInToast: "Check-in logged",
    checkInToastDesc: "The inactivity clock has been reset to zero.",
    checkInError: "Could not log check-in",
    checkInErrorDesc: "The check-in could not be recorded. Please try again.",
    errorEyebrow: "Switch unreachable",
    errorBody: "We couldn't read the switch state. Please try again.",
    param: {
      onset: {
        label: "Warning onset",
        hint: "Days of inactivity before the first email warning",
        unit: "days",
      },
      repeat: {
        label: "Warning repeat",
        hint: "How often subsequent warnings repeat",
        unit: "days",
      },
      trigger: {
        label: "Trigger",
        hint: "Total days of inactivity before the vault releases",
        unit: "days",
      },
    },
    validation: {
      allPositive: "All three parameters must be at least 1 day.",
      onsetBeforeTrigger: "Warning onset must occur before the trigger day.",
    },
  },
  audit: {
    eyebrow: "Audit Logs",
    title: "Audit Logs",
    ledger: "Event Ledger",
    count: "{count} event(s) sealed",
    timestamp: "Timestamp",
    event: "Event",
    description: "Description",
    tableAria: "Vault audit log",
    errorEyebrow: "Ledger unreachable",
    errorBody: "We couldn't read the audit ledger. Please try again.",
    emptyTitle: "No events yet",
    emptyBody:
      "Every action taken against the vault will be sealed here, in order, as it happens.",
    footer:
      "Every entry is sealed on the ledger. Entries cannot be edited or removed.",
    eventTypes: {
      login: "Login",
      switch_armed: "Switch armed",
      switch_disarmed: "Switch disarmed",
      switch_checked_in: "Check-in",
      beneficiary_added: "Beneficiary added",
      beneficiary_updated: "Beneficiary updated",
      beneficiary_removed: "Beneficiary removed",
      asset_added: "Asset added",
    },
    descriptions: {
      login: "User signed in",
      switch_armed_cadence:
        "Switch armed with check-in cadence of {seconds} seconds",
      switch_armed_timeline:
        "Switch armed: warning after {warning} days, repeating every {repeat} days, triggering after {trigger} days",
      switch_disarmed: "Switch disarmed",
      switch_checked_in: "Switch check-in recorded",
      switch_checked_in_reset:
        "Switch check-in recorded; inactivity clock reset",
      beneficiary_added:
        "Beneficiary '{name}' added with allocation share {share}%",
      beneficiary_updated:
        "Beneficiary '{name}' (id {id}) updated with allocation share {share}%",
      beneficiary_removed:
        "Beneficiary (id {id}) removed and its asset allocations cleaned up",
      asset_added: "Asset '{name}' ({symbol}) added with balance {balance}",
    },
  },
  wallet: {
    eyebrow: "Wallet",
    title: "Wallet",
    subtitle:
      "The liquid assets held in the vault, their live USD value, and the address to receive more.",
    totalValue: "Portfolio Value",
    assetsHeld: "{count} asset(s) held",
    noAssets: "No assets held yet",
    assetDropdown: "Select asset",
    assetDropdownAria: "Select an asset to view its value",
    allAssets: "All assets",
    balance: "Balance",
    price: "Price",
    value: "Value",
    allocation: "Allocation",
    breakdown: "Portfolio Breakdown",
    breakdownDesc: "Each asset's share of the total portfolio value.",
    transactions: "Transaction History",
    transactionsDesc: "Every action sealed against the vault, in order.",
    noTransactions: "No transactions yet",
    receive: "Receive",
    receiveDesc: "Send assets to this address to deposit them into the vault.",
    depositAddress: "Deposit address",
    copyAddress: "Copy address",
    copied: "Address copied",
    qrAria: "QR code encoding the vault deposit address",
    errorEyebrow: "Vault unreachable",
    errorBody: "We couldn't read the wallet. Please try again.",
    emptyTitle: "No assets held",
    emptyBody:
      "The vault currently holds no liquid assets. Once assets are added, their balances and live USD values will appear here.",
    noPrice: "Price unavailable",
    connectWallet: "Connect Wallet",
    connectWalletDesc:
      "Connect your OISY wallet to send assets from the vault. A popup will open at oisy.com for you to approve the connection.",
    connecting: "Connecting to OISY…",
    connected: "Connected",
    connectedAccount: "OISY account",
    disconnect: "Disconnect",
    disconnectDesc:
      "End the OISY session. The wallet returns to the disconnected state.",
    send: "Send",
    sendDesc:
      "Send an ICRC-standard token from the vault. Every send requires your explicit approval in the OISY popup.",
    sendTitle: "Send tokens",
    asset: "Asset",
    selectAsset: "Select asset",
    recipient: "Recipient",
    recipientPlaceholder: "Account identifier or principal",
    amount: "Amount",
    amountPlaceholder: "0.00",
    available: "Available · {balance}",
    sendButton: "Send",
    waitingForApproval: "Waiting for approval in OISY",
    waitingForApprovalDesc:
      "Approve the transfer in the OISY popup to complete the send. This window stays open until you approve or reject it.",
    sendSuccess: "Send complete",
    sendSuccessDesc: "Transfer confirmed on block {block}.",
    sendError: "Send failed",
    sendErrorDesc: "The transfer was not completed. Please try again.",
    sendRejected: "Send cancelled",
    sendRejectedDesc: "The transfer was not approved in OISY.",
    validation: {
      recipientRequired: "Enter a recipient account.",
      amountRequired: "Enter an amount to send.",
      amountInvalid: "Enter a valid amount greater than zero.",
      amountExceedsBalance: "Amount exceeds the available balance.",
      assetRequired: "Select an asset to send.",
    },
  },
  settings: {
    eyebrow: "Settings",
    title: "Vault Configuration",
    subtitle:
      "Preserve the configuration that governs your legacy — the arm/disarm state of The Switch, its check-in cadence, and the beneficiaries it is sealed for.",
    switchTitle: "The Switch",
    switchDesc:
      "Arm or disarm the vault and set how often it must be verified.",
    beneficiariesTitle: "Beneficiaries",
    beneficiariesDesc: "Edit the people and causes your legacy is sealed for.",
    cadence: "Cadence · {value}",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    yearly: "Yearly",
    h24: "24 hours",
    h7d: "7 days",
    h30d: "30 days",
    h365d: "365 days",
    emptyBeneficiaries: "No beneficiaries configured yet",
    editBeneficiary: "Edit beneficiary",
    editBeneficiaryDesc:
      "Update the name, allocation share, and wallet address for this beneficiary.",
    removeBeneficiary: "Remove beneficiary",
    removeBeneficiaryDesc:
      "Remove {name} from the vault? This cannot be undone.",
    toast: {
      armed: "The Switch armed",
      armedDesc: "Check-in cadence set to {cadence}.",
      armError: "Could not arm The Switch",
      armErrorDesc: "The vault could not be armed. Please try again.",
      disarmed: "The Switch disarmed",
      disarmedDesc: "The vault is no longer armed.",
      disarmError: "Could not disarm The Switch",
      disarmErrorDesc: "The vault could not be disarmed. Please try again.",
      beneficiaryUpdated: "Beneficiary updated",
      beneficiaryUpdatedDesc: "The beneficiary configuration has been saved.",
      updateError: "Could not update beneficiary",
      updateErrorDesc: "The changes were not saved. Please try again.",
      beneficiaryRemoved: "Beneficiary removed",
      beneficiaryRemovedDesc:
        "The beneficiary has been removed from the vault.",
      removeError: "Could not remove beneficiary",
      removeErrorDesc:
        "The beneficiary could not be removed. Please try again.",
    },
  },
} as const;

/** Deep-widen English string literals so locale dictionaries may use any string. */
type Widen<T> = T extends string ? string : { [K in keyof T]: Widen<T[K]> };

export type Translations = Omit<Widen<typeof en>, "audit"> & {
  audit: Omit<Widen<typeof en>["audit"], "eventTypes" | "descriptions"> & {
    eventTypes?: Record<string, string>;
    descriptions?: Record<string, string>;
  };
};
