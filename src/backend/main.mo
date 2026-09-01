import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import OQL "mo:caffeineai-oql";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import ListEntity "mo:caffeineai-oql/ListEntity";
import RecordValue "mo:caffeineai-oql/RecordValue";
import NatValue "mo:caffeineai-oql/NatValue";
import TextValue "mo:caffeineai-oql/TextValue";
import IntValue "mo:caffeineai-oql/IntValue";
import BlobValue "mo:caffeineai-oql/BlobValue";
import Types "types/vault";
import SwitchApi "mixins/switch-api";
import VaultApi "mixins/vault-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  let switchState : Types.SwitchStateInternal;
  let beneficiaries : List.List<Types.Beneficiary>;
  let assets : List.List<Types.Asset>;
  let auditEvents : List.List<Types.AuditEvent>;
  let ids : Types.VaultIds;
  include MixinAuthorization(accessControlState, null);
  include Expose({
    entities = [
      OQL.Entity.manual<Types.SwitchStateInternal>(
        "switchState",
        func () = [switchState].values(),
        "SwitchState",
        "status",
      )
        .sample({ var status = #disarmed; var cadenceSeconds = 0; var lastCheckIn = null; var armedAt = null } : Types.SwitchStateInternal)
        .payload("status", func s = switch (s.status) { case (#armed) "armed"; case (#disarmed) "disarmed" })
        .payload("cadenceSeconds", func s = s.cadenceSeconds)
        .payload("lastCheckIn", func s = switch (s.lastCheckIn) { case (?t) t; case null 0 })
        .payload("armedAt", func s = switch (s.armedAt) { case (?t) t; case null 0 })
        .controllerOnly()
        .build(),
      beneficiaries.toEntity("beneficiary", "Beneficiary", "id")
        .sample({ id = 0; name = ""; allocationShare = 0; walletAddress = ""; createdAt = 0 })
        .controllerOnly()
        .build(),
      assets.toEntityManual("asset", "Asset", "id")
        .sample({ id = 0; symbol = ""; name = ""; balance = 0; decimals = 0; allocations = [] })
        .payload("symbol", func a = a.symbol)
        .payload("name", func a = a.name)
        .payload("balance", func a = a.balance)
        .payload("decimals", func a = a.decimals)
        .payload("allocationCount", func a = a.allocations.size())
        .controllerOnly()
        .build(),
      auditEvents.toEntity("auditEvent", "AuditEvent", "id")
        .sample({ id = 0; timestamp = 0; eventType = ""; description = ""; prevHash = "\00\00\00\00"; hash = "\00\00\00\00" } : Types.AuditEvent)
        .controllerOnly()
        .build(),
    ];
  });
  include SwitchApi(accessControlState, switchState);
  include VaultApi(accessControlState, beneficiaries, assets, auditEvents, ids);
  include ApiDocMixin();
};
