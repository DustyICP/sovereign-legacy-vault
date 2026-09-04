import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface WalletBalance {
    assets: Array<Asset>;
    depositAddress: string;
    totalUsd?: bigint;
}
export type Result__1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface AssetAllocation {
    share: bigint;
    beneficiaryId: bigint;
}
export interface SwitchTimeline {
    status: SwitchStatus;
    warningRepeatDays: bigint;
    warningOnsetDays: bigint;
    triggerDays: bigint;
    timeUntilWarning?: bigint;
    timeUntilTrigger?: bigint;
    timeSinceLastCheckIn?: bigint;
}
export interface SwitchState {
    status: SwitchStatus;
    warningRepeatDays: bigint;
    warningOnsetDays: bigint;
    armedAt?: Timestamp;
    triggerDays: bigint;
    lastCheckIn?: Timestamp;
}
export interface AuditEvent {
    id: bigint;
    prevHash: Uint8Array;
    hash: Uint8Array;
    description: string;
    timestamp: Timestamp;
    eventType: string;
}
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export interface Cell {
    value: Value;
    name: string;
}
export interface Asset {
    id: bigint;
    decimals: bigint;
    balance: bigint;
    name: string;
    allocations: Array<AssetAllocation>;
    symbol: string;
}
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export interface Beneficiary {
    id: bigint;
    name: string;
    createdAt: Timestamp;
    allocationShare: bigint;
    walletAddress: string;
}
export interface Overview {
    switchStatus: SwitchStatus;
    totalAllocationShare: bigint;
    recentActivity: Array<AuditEvent>;
    beneficiaryCount: bigint;
    vaultBalance: WalletBalance;
    timeline: SwitchTimeline;
}
export enum SwitchStatus {
    armed = "armed",
    disarmed = "disarmed"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addAsset(symbol: string, name: string, balance: bigint, decimals: bigint, allocations: Array<AssetAllocation>): Promise<Asset>;
    addBeneficiary(name: string, allocationShare: bigint, walletAddress: string): Promise<Beneficiary>;
    appendAuditEvent(eventType: string, description: string): Promise<AuditEvent>;
    armSwitch(warningOnsetDays: bigint, warningRepeatDays: bigint, triggerDays: bigint): Promise<SwitchState>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkIn(): Promise<SwitchState>;
    disarmSwitch(): Promise<SwitchState>;
    execute(qJson: string): Promise<Result>;
    getApiDoc(): Promise<string>;
    getCallerUserRole(): Promise<UserRole>;
    getDepositAddress(): Promise<string>;
    getOverview(): Promise<Overview>;
    getSwitchState(): Promise<SwitchState>;
    getSwitchTimeline(): Promise<SwitchTimeline>;
    getWalletBalance(): Promise<WalletBalance>;
    isCallerAdmin(): Promise<boolean>;
    listAssets(): Promise<Array<Asset>>;
    listAuditEvents(): Promise<Array<AuditEvent>>;
    listBeneficiaries(): Promise<Array<Beneficiary>>;
    removeBeneficiary(id: bigint): Promise<boolean>;
    schema(): Promise<string>;
    updateBeneficiary(id: bigint, name: string, allocationShare: bigint, walletAddress: string): Promise<Beneficiary | null>;
}
