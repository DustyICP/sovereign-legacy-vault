import type { Translations } from "@/lib/translations/en";

/** German (de). Falls back to English for any key not covered here. */
export const de: Partial<Translations> = {
  meta: {
    title: "Sovereign Legacy — Der Tresor",
    description:
      "Sovereign Legacy — Der Tresor. Ihr Tresor. Versiegelt, bis er es nicht mehr ist.",
  },
  common: {
    cancel: "Abbrechen",
    saveChanges: "Änderungen speichern",
    edit: "Bearbeiten",
    remove: "Entfernen",
    name: "Name",
    optional: "Optional",
    addBeneficiary: "Begünstigten hinzufügen",
    allocationShare: "Zuteilungsanteil (%)",
    walletAddress: "Wallet-Adresse",
    checkInCadence: "Check-in-Rhythmus",
    selectCadence: "Rhythmus auswählen",
    armed: "Aktiviert",
    disarmed: "Deaktiviert",
    arming: "Aktiviere…",
    disarming: "Deaktiviere…",
    saving: "Speichere…",
    removing: "Entferne…",
    arm: "Aktivieren",
    disarm: "Deaktivieren",
  },
  nav: {
    dashboard: "Dashboard",
    beneficiaries: "Begünstigte",
    legacyAssets: "Vermächtnis & Vermögen",
    theSwitch: "Der Schalter",
    auditLogs: "Prüfprotokolle",
    settings: "Einstellungen",
  },
  header: {
    home: "Sovereign Legacy Startseite",
    networkBadge: "Netzwerk · Identität",
    mobileMenu: "Navigationsmenü öffnen",
    mobilePrimary: "Mobile Hauptnavigation",
  },
  footer: {
    copyright:
      "© {year}. Sovereign Legacy — Der Tresor. Alle Rechte vorbehalten.",
    tagline: "Versiegelt, bis er es nicht mehr ist",
  },
  loading: {
    openingVault: "Tresor wird geöffnet…",
  },
  language: {
    label: "Sprache",
  },
  landing: {
    eyebrow: "Selbstsouveränes Erbe",
    headline1: "Ihr Tresor.",
    headline2: "Versiegelt, bis er es nicht mehr ist.",
    login: "Anmelden mit Internet Identity",
    subhead:
      "Ein digitaler Totmannschalter für Krypto-Vermögen, nativ auf dem Internet Computer — kein Nachlassverfahren, keine Verzögerungen, niemand beobachtet außer der Kette selbst.",
    vaultDoorAlt:
      "Eine verwitterte Banktresortür aus Messing und Stahl, geschlossen, mit dem schwach leuchtenden Unendlichkeitsschleifen-Emblem von Internet Computer in ihrer Mitte.",
    introduction: {
      eyebrow: "Einführung",
      heading: "Der Totmannschalter — Geboren im Zeitalter des Dampfes",
      p1: "In den letzten Jahrzehnten des neunzehnten Jahrhunderts veränderte eine neue Art von Maschine die Zivilisation. Elektrische Straßenbahnen durchzogen nun die überfüllten Städte, und Aufzüge hoben Fahrgäste in Gebäude von beispielloser Höhe. Sie waren Wunderwerke — und sie waren gefährlich.",
      p2: "Das Problem war einfach und erschreckend: Was geschieht, wenn der Mann am Steuer nicht mehr am Steuer ist? Ein Straßenbahnführer konnte am Steuer einen Herzinfarkt erleiden. Ein Aufzugführer konnte mitten in der Fahrt das Bewusstsein verlieren. Und die Maschine, gleichgültig gegenüber dem Schicksal ihres Bedieners, fuhr einfach weiter — bis sie auf etwas stieß, das sie stoppte.",
      p3: "Es war der amerikanische Ingenieur Frank J. Sprague, der 1888 die Straßenbahnlinien von Richmond, Virginia, elektrifizierte — die erste erfolgreiche elektrische Straßenbahn der Vereinigten Staaten. Seine Innovation endete nicht beim Motor. Sprague verstand, dass ein Fahrzeug, das Fahrgäste mit hoher Geschwindigkeit befördert, sich selbst stoppen können musste, falls der Bediener handlungsunfähig wurde.",
      p4: "Sie nannten es den Totmannschalter. Halten Sie den Griff, um weiterzufahren. Lassen Sie ihn los — sei es aus Ablenkung, Krankheit oder Tod — und die Maschine stoppt sich selbst. Der Name wurde nicht für das Drama gewählt. Er wurde für die Präzision gewählt. Der Schalter wurde durch die Abwesenheit der lebenden Hand aktiviert.",
      p5: "Die Idee verbreitete sich schnell. U-Bahnen in New York, London und Tokio übernahmen sie. Kernkraftwerke bauten sie in ihre Steuerstäbe ein. Verkehrsflugzeuge integrierten sie in ihre Autopiloten. Überall, wo eine Maschine Leben trug, folgte der Totmannschalter — still, geduldig, wartend.",
      h3a: "Wie Funktioniert ein Totmannschalter in Heutigen Zeiten?",
      p6: "Sie haben hart gearbeitet. Sie haben Krypto-Vermögenswerte angesammelt — ICP, Bitcoin, Ethereum, Stablecoins. Sie liegen in Wallets und Canistern, geschützt durch private Schlüssel, die nur Sie besitzen. Und wie der Straßenbahnführer, der den Griff umklammert, hält nur Ihre lebendige, aktive Präsenz im Netzwerk den Stromkreis geschlossen.",
      p7: "So wendet Sovereign Legacy dasselbe Prinzip an. Sie zahlen Vermögenswerte in einen sicheren On-Chain-Canister-Tresor ein. Sie benennen einen oder mehrere Begünstigte und legen einen Zeitraum der Netzwerkinaktivität fest. Solange Sie sich regelmäßig anmelden, bleibt der Schalter geschlossen. In dem Moment, in dem diese Aktivität aufhört, sendet Ihnen Sovereign Legacy Warnungen. Wenn Sie nicht reagieren, wird die Übertragung automatisch ausgeführt und Ihre Vermögenswerte werden ohne Anwälte, Gerichte oder Verzögerungen an Ihre gewählten Begünstigten übertragen.",
      h3b: "Möchten Sie Ihre Wünsche Personalisieren?",
      p8: "Wenn Sie mehr als einen Empfänger wünschen — einen Ehepartner, Kinder, einen vertrauten Freund, einen wohltätigen Zweck — ermöglicht Ihnen Sovereign Legacy, Ihre Vermögenswerte prozentual aufzuteilen. Sie legen die Anteile fest. Ihre Begünstigten erhalten genau das, was Sie beabsichtigt haben.",
    },
    advantages: {
      eyebrow: "Warum es funktioniert",
      heading: "Die Vorteile Sind in Jeden Schritt Eingebaut",
      card1: {
        title: "Keine Anwälte. Kein Nachlassverfahren. Keine Verzögerungen.",
        body: "Der Canister führt Ihre Anweisungen in dem Moment aus, in dem der Totmannschalter auslöst. Keine Institution steht zwischen Ihren Wünschen und den Menschen, die Sie lieben.",
      },
      card2: {
        title: "Sie behalten die Kontrolle.",
        body: "Ändern Sie Begünstigte, passen Sie Prozentsätze an oder aktualisieren Sie Ihre Nachricht jederzeit. Alles wird sofort, on-chain, aktualisiert.",
      },
      card3: {
        title: "Funktioniert, während Sie schlafen.",
        body: "Wenn das Leben weitergeht, bleibt Sovereign Legacy still. Wenn nicht, geht alles genau so voran, wie Sie es geplant haben.",
      },
      card4: {
        title: "Globale Reichweite.",
        body: "Begünstigte können überall auf der Welt sein. Sovereign Legacy spricht mehrere Sprachen und übernimmt die Erklärung, sodass Sie es nicht tun müssen.",
      },
      card5: {
        title: "Ihre Daten bleiben Ihre.",
        body: "Ihr Tresor ist ein Canister auf dem Internet Computer, gesichert durch Ihre Internet Identity. Kein Dritter — einschließlich Sovereign Legacy selbst — hat Zugriff auf seinen Inhalt.",
      },
    },
    faq: {
      eyebrow: "Fragen",
      heading: "Häufig Gestellte Fragen",
      q1: {
        q: "Welche Sprachen unterstützt Sovereign Legacy?",
        a: "Die App unterstützt 22 Sprachen, darunter rechts-nach-links-Sprachen wie Arabisch, Persisch und Urdu, damit Begünstigte überall auf der Welt eine Freigabemitteilung in ihrer eigenen Sprache verstehen können.",
      },
      q2: {
        q: "Wie sicher ist mein Tresor?",
        a: "Ihr Tresor ist ein Canister auf dem Internet Computer, gesichert durch Ihre Internet Identity. Nur Ihr authentifizierter Principal kann seinen Inhalt einsehen oder verwalten.",
      },
      q3: {
        q: "Könnte ich meinen Tresor jemals verlieren?",
        a: "Solange Sie Zugriff auf Ihre Internet Identity behalten, bleibt Ihr Tresor unter Ihrer Kontrolle. Das Hauptrisiko ist der Verlust Ihrer Internet-Identity-Zugangsdaten, weshalb eine sichere Sicherung Ihrer Wiederherstellungsmethode wichtig ist.",
      },
      q4: {
        q: "Wie werden Vermögenswerte unter den Begünstigten aufgeteilt?",
        a: "Sie weisen jedem Begünstigten einen prozentualen Anteil zu. Anteile können jederzeit vor der Freigabe angepasst werden, und die Gesamtsumme über alle Begünstigten darf niemals 100 % überschreiten.",
      },
      q5: {
        q: "Wie setze ich den Netzwerkinaktivitäts-Timer zurück?",
        a: "Melden Sie sich einfach mit Ihrer Internet Identity an. Jeder authentifizierte Check-in setzt die Inaktivitätsuhr zurück und hält den Totmannschalter aktiviert.",
      },
      q6: {
        q: "Wie füge ich einen Begünstigten hinzu?",
        a: "Öffnen Sie von Ihrem Dashboard aus das Bedienfeld Begünstigte und fügen Sie einen Namen, Kontaktinformationen und einen Zuteilungsprozentsatz hinzu.",
      },
      q7: {
        q: "Kann ich meine Begünstigten nach der Einrichtung ändern?",
        a: "Ja. Begünstigte, Zuteilungen und persönliche Nachrichten können jederzeit aktualisiert werden — Änderungen treten sofort, on-chain, in Kraft.",
      },
      q8: {
        q: "Wer kann meine Begünstigten sehen?",
        a: "Nur Sie, solange Sie als Eigentümer des Tresors authentifiziert sind.",
      },
    },
    terms: {
      eyebrow: "Bedingungen",
      heading: "Allgemeine Geschäftsbedingungen",
      card1: {
        title: "1. Überblick",
        body: "ICP Sovereign Legacy ist eine dezentrale, vollständig on-chain betriebene Plattform für Vererbung und Totmannschalter, aufgebaut auf dem Internet Computer Protocol (ICP). Durch die Nutzung dieses Dienstes stimmen Sie diesen Bedingungen zu.",
      },
      card2: {
        title: "2. Keine Haftung",
        body: "Die Entwickler haften nicht für Verluste von Vermögenswerten, die aus falscher Konfiguration, verlorenen Internet-Identity-Zugangsdaten, Bedingungen des Blockchain-Netzwerks oder anderen Ursachen resultieren. Nutzen Sie diesen Dienst auf eigenes Risiko.",
      },
      card3: {
        title: "3. Autonome Ausführung",
        body: "Die Vermögensverteilung wird automatisch durch die On-Chain-Logik des Smart Contracts ausgeführt, wenn Ihr Totmannschalter auslöst. Einmal ausgelöst, ist kein menschliches Eingreifen erforderlich oder möglich.",
      },
      card4: {
        title: "4. Datenschutz",
        body: "Ihre Begünstigtenliste wird on-chain gespeichert und ist nur für Ihren authentifizierten Internet-Identity-Principal zugänglich. Kein Dritter kann Ihre Daten einsehen.",
      },
      card5: {
        title: "5. Gebühren",
        body: "Dieser Dienst wird wie in der App beschrieben bereitgestellt. Alle Gebühren, die für eine bestimmte Aktion anfallen, werden in der App klar angezeigt, bevor Sie diese Aktion bestätigen — keine versteckten oder wiederkehrenden Gebühren.",
      },
      card6: {
        title: "6. Berechtigung",
        body: "Sie müssen mindestens 18 Jahre alt sein (oder das Alter der Volljährigkeit in Ihrer Rechtsordnung erreicht haben) und die rechtliche Fähigkeit besitzen, diese Bedingungen einzugehen, um diesen Dienst zu nutzen.",
      },
      card7: {
        title: "7. Keine Garantie",
        body: "Dieser Dienst wird „wie besehen“ und „wie verfügbar“ ohne jegliche Garantien bereitgestellt, weder ausdrücklich noch stillschweigend, einschließlich jeder Garantie für ununterbrochenen oder fehlerfreien Betrieb.",
      },
      card8: {
        title: "8. Risikoübernahme",
        body: "Kryptowährungen und Blockchain-Technologie bergen inhärente Risiken, darunter Preisvolatilität, Netzwerküberlastung, Schwachstellen von Smart Contracts und Änderungen an zugrunde liegenden Protokollen. Durch die Nutzung dieses Dienstes akzeptieren Sie diese Risiken.",
      },
      card9: {
        title: "9. Beendigung",
        body: "Der Zugang zu diesem Dienst kann bei Verstoß gegen diese Bedingungen oder bei Verhalten, das Sovereign Legacy nach eigenem Ermessen als schädlich für andere Nutzer oder für den Dienst selbst einstuft, ausgesetzt oder beendet werden.",
      },
      card10: {
        title: "10. Änderungen Dieser Bedingungen",
        body: "Diese Bedingungen können von Zeit zu Zeit aktualisiert werden. Wesentliche Änderungen werden in der App dargestellt, und die fortgesetzte Nutzung des Dienstes nach solchen Änderungen stellt die Annahme der aktualisierten Bedingungen dar.",
      },
    },
  },
  dashboard: {
    eyebrow: "Dashboard",
    title: "Der Tresor",
    balance: "Tresorsaldo",
    assetsHeld: "{count} Vermögenswert(e) gehalten",
    noAssets: "Noch keine Vermögenswerte gehalten",
    beneficiaries: "Begünstigte",
    named: "benannt",
    sealed: "{count} Begünstigte(r) versiegelt",
    none: "Noch keine Begünstigten",
    allocation: "Begünstigtenzuteilung",
    allocationNone:
      "Noch keine Zuteilungen. Fügen Sie einen Begünstigten hinzu, um zu beginnen.",
    allocationAria: "Zuteilungsanteile der Begünstigten",
    allocated: "zugewiesen",
    switch: "Der Schalter",
    lastVerified: "Zuletzt verifiziert · {time}",
    notVerified: "Noch nicht verifiziert",
  },
  beneficiaries: {
    eyebrow: "Begünstigte",
    title: "Begünstigte",
    subtitle:
      "Die Personen und Zwecke, für die Ihr Vermächtnis versiegelt ist. Zuteilung, Reihenfolge und Bedingungen leben hier.",
    allocation: "Zuteilung",
    count: "{count} Begünstigte(r)",
    noAllocations:
      "Noch keine Zuteilungen. Fügen Sie einen Begünstigten hinzu, um zu beginnen.",
    allocationAria: "Zuteilungsanteile der Begünstigten",
    manage: "Verwalten",
    manageBody:
      "Fügen Sie einen Begünstigten hinzu und weisen Sie ihm seinen Anteil am Tresor zu. Anteile können jederzeit bearbeitet oder widerrufen werden.",
    loadError:
      "Begünstigte konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
    emptyTitle: "Noch keine Begünstigten",
    emptyBody:
      "Ihr Vermächtnis ist nicht zugewiesen. Fügen Sie Ihren ersten Begünstigten hinzu, um den Tresor für jemanden zu versiegeln.",
    noWallet: "Keine Wallet-Adresse",
    editAria: "{name} bearbeiten",
    removeAria: "{name} entfernen",
    modal: {
      editTitle: "Begünstigten bearbeiten",
      addTitle: "Begünstigten hinzufügen",
      editDesc:
        "Aktualisieren Sie Name, Anteil oder Wallet-Adresse dieses Begünstigten.",
      addDesc:
        "Weisen Sie einem neuen Begünstigten einen Namen und einen Zuteilungsanteil zu.",
    },
    namePlaceholder: "z. B. Elena Marchetti",
    sharePlaceholder: "z. B. 40",
    errors: {
      nameRequired: "Geben Sie einen Namen für diesen Begünstigten ein.",
      sharePositive: "Der Zuteilungsanteil muss größer als null sein.",
      invalidChecksum:
        "Diese ICP-Konto-ID hat eine ungültige Prüfsumme. Überprüfen Sie die Adresse.",
      invalidWallet:
        "Geben Sie eine gültige ICP-Wallet-Adresse ein — eine 64-stellige Konto-ID oder einen ICP-Principal.",
      totalExceedsEdit:
        "Dies würde die Gesamtzuteilung auf {total} % bringen und das 100-%-Limit überschreiten.",
      totalExceedsAdd:
        "Die Gesamtzuteilung wäre {total} % und würde das 100-%-Limit überschreiten.",
      saveFailed:
        "Änderungen konnten nicht gespeichert werden. Bitte versuchen Sie es erneut.",
      addFailed:
        "Begünstigter konnte nicht hinzugefügt werden. Bitte versuchen Sie es erneut.",
    },
  },
  assets: {
    eyebrow: "Vermächtnis & Vermögen",
    title: "Gehaltene Vermögenswerte",
    subtitle:
      "Alles, was im Tresor gehalten wird — Salden, Bestände und die Anweisungen, die sie regeln.",
    assetsHeld: "Gehaltene Vermögenswerte",
    beneficiaries: "Begünstigte",
    allocationStatus: "Zuteilungsstatus",
    sealed: "Versiegelt",
    unallocated: "Nicht zugeteilt",
    beneficiaryFallback: "Begünstigter #{id}",
    errorEyebrow: "Tresor nicht erreichbar",
    errorBody:
      "Die gehaltenen Vermögenswerte konnten nicht gelesen werden. Bitte versuchen Sie es erneut.",
    emptyEyebrow: "Keine Vermögenswerte gehalten",
    emptyBody:
      "Der Tresor enthält derzeit keine Krypto-Vermögenswerte. Sobald Vermögenswerte hinzugefügt werden, erscheinen hier ihre Salden und Begünstigtenzuteilungen.",
    allocationLabel: "Begünstigtenzuteilung",
  },
  switch: {
    eyebrow: "Der Schalter",
    title: "Der Schalter",
    subtitle:
      "Die einzige Steuerung, die den Tresor übergibt. Aktiviert, verifiziert und bewusst.",
    active: "Aktiv · Totmannschalter",
    standingDown: "Bereit zum Ruhen",
    armed: "AKTIVIERT",
    disarmed: "DEAKTIVIERT",
    checkIn: "Ich bin noch da",
    arm: "Schalter aktivieren",
    disarm: "Deaktivieren",
    cadence: "Rhythmus · {duration}",
    releaseIn: "Freigabe in {duration}",
    timelineAriaArmed:
      "Totmannschalter-Zeitachse, {percent} % des Rhythmus verstrichen",
    timelineAriaDisarmed: "Totmannschalter-Zeitachse, deaktiviert",
    lastCheckIn: "Letzter Check-in",
    armedAt: "Aktiviert am",
    cadenceLabel: "Rhythmus",
    standingDownTitle: "Bereit zum Ruhen",
    standingDownBody:
      "Das Deaktivieren stoppt den Totmannschalter. Der Tresor bleibt versiegelt, wird aber bei einem verpassten Check-in nicht mehr an Ihre Begünstigten freigegeben.",
    disarmTheSwitch: "Schalter deaktivieren",
    armTitle: "Schalter aktivieren",
    armBody:
      "Wählen Sie, wie lange der Tresor auf Ihren nächsten Check-in wartet. Wenn Sie ihn verpassen, wird der Tresor an Ihre Begünstigten freigegeben.",
    cadenceError:
      "Wählen Sie vor dem Aktivieren des Schalters einen Check-in-Rhythmus größer als null.",
    errorEyebrow: "Schalter nicht erreichbar",
    errorBody:
      "Der Schalterstatus konnte nicht gelesen werden. Bitte versuchen Sie es erneut.",
    cadence24h: "24 Stunden",
    cadence7d: "7 Tage",
    cadence30d: "30 Tage",
  },
  audit: {
    eyebrow: "Prüfprotokolle",
    title: "Prüfprotokolle",
    ledger: "Ereignisprotokoll",
    count: "{count} Ereignis(se) versiegelt",
    timestamp: "Zeitstempel",
    event: "Ereignis",
    description: "Beschreibung",
    tableAria: "Prüfprotokoll des Tresors",
    errorEyebrow: "Protokoll nicht erreichbar",
    errorBody:
      "Das Prüfprotokoll konnte nicht gelesen werden. Bitte versuchen Sie es erneut.",
    emptyTitle: "Noch keine Ereignisse",
    emptyBody:
      "Jede Aktion, die gegen den Tresor ausgeführt wird, wird hier in der Reihenfolge versiegelt, in der sie geschieht.",
    footer:
      "Jeder Eintrag ist im Protokoll versiegelt. Einträge können weder bearbeitet noch entfernt werden.",
  },
  settings: {
    eyebrow: "Einstellungen",
    title: "Tresorkonfiguration",
    subtitle:
      "Bewahren Sie die Konfiguration, die Ihr Vermächtnis regelt — den Aktivierungs-/Deaktivierungsstatus des Schalters, seinen Check-in-Rhythmus und die Begünstigten, für die er versiegelt ist.",
    switchTitle: "Der Schalter",
    switchDesc:
      "Aktivieren oder deaktivieren Sie den Tresor und legen Sie fest, wie oft er verifiziert werden muss.",
    beneficiariesTitle: "Begünstigte",
    beneficiariesDesc:
      "Bearbeiten Sie die Personen und Zwecke, für die Ihr Vermächtnis versiegelt ist.",
    cadence: "Rhythmus · {value}",
    daily: "Täglich",
    weekly: "Wöchentlich",
    monthly: "Monatlich",
    yearly: "Jährlich",
    h24: "24 Stunden",
    h7d: "7 Tage",
    h30d: "30 Tage",
    h365d: "365 Tage",
    emptyBeneficiaries: "Noch keine Begünstigten konfiguriert",
    editBeneficiary: "Begünstigten bearbeiten",
    editBeneficiaryDesc:
      "Aktualisieren Sie Name, Zuteilungsanteil und Wallet-Adresse dieses Begünstigten.",
    removeBeneficiary: "Begünstigten entfernen",
    removeBeneficiaryDesc:
      "{name} aus dem Tresor entfernen? Dies kann nicht rückgängig gemacht werden.",
    toast: {
      armed: "Der Schalter wurde aktiviert",
      armedDesc: "Check-in-Rhythmus auf {cadence} gesetzt.",
      armError: "Der Schalter konnte nicht aktiviert werden",
      armErrorDesc:
        "Der Tresor konnte nicht aktiviert werden. Bitte versuchen Sie es erneut.",
      disarmed: "Der Schalter wurde deaktiviert",
      disarmedDesc: "Der Tresor ist nicht mehr aktiviert.",
      disarmError: "Der Schalter konnte nicht deaktiviert werden",
      disarmErrorDesc:
        "Der Tresor konnte nicht deaktiviert werden. Bitte versuchen Sie es erneut.",
      beneficiaryUpdated: "Begünstigter aktualisiert",
      beneficiaryUpdatedDesc:
        "Die Begünstigtenkonfiguration wurde gespeichert.",
      updateError: "Begünstigter konnte nicht aktualisiert werden",
      updateErrorDesc:
        "Die Änderungen wurden nicht gespeichert. Bitte versuchen Sie es erneut.",
      beneficiaryRemoved: "Begünstigter entfernt",
      beneficiaryRemovedDesc: "Der Begünstigte wurde aus dem Tresor entfernt.",
      removeError: "Begünstigter konnte nicht entfernt werden",
      removeErrorDesc:
        "Der Begünstigte konnte nicht entfernt werden. Bitte versuchen Sie es erneut.",
    },
  },
};
