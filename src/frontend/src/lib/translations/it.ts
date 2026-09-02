import type { Translations } from "@/lib/translations/en";

/** Italian (it). Falls back to English for any key not covered here. */
export const it: Partial<Translations> = {
  meta: {
    title: "Sovereign Legacy — La Volta",
    description:
      "Sovereign Legacy — La Volta. La tua volta. Sigillata finché non lo sarà più.",
  },
  common: {
    cancel: "Annulla",
    saveChanges: "Salva modifiche",
    edit: "Modifica",
    remove: "Rimuovi",
    name: "Nome",
    optional: "Facoltativo",
    addBeneficiary: "Aggiungi beneficiario",
    allocationShare: "Quota di assegnazione (%)",
    walletAddress: "Indirizzo del portafoglio",
    checkInCadence: "Cadenza di verifica",
    selectCadence: "Seleziona cadenza",
    armed: "Armato",
    disarmed: "Disarmato",
    arming: "Armamento…",
    disarming: "Disarmamento…",
    saving: "Salvataggio…",
    removing: "Rimozione…",
    arm: "Arma",
    disarm: "Disarma",
  },
  nav: {
    dashboard: "Pannello",
    beneficiaries: "Beneficiari",
    legacyAssets: "Eredità e Attivi",
    theSwitch: "L'Interruttore",
    auditLogs: "Registri di Controllo",
    settings: "Impostazioni",
  },
  header: {
    home: "Home di Sovereign Legacy",
    networkBadge: "Rete · Identità",
    mobileMenu: "Apri menu di navigazione",
    mobilePrimary: "Navigazione principale mobile",
  },
  footer: {
    copyright:
      "© {year}. Sovereign Legacy — La Volta. Tutti i diritti riservati.",
    tagline: "Sigillata finché non lo sarà più",
  },
  loading: {
    openingVault: "Apertura della volta…",
  },
  language: {
    label: "Lingua",
  },
  landing: {
    eyebrow: "Eredità auto-sovrana",
    headline1: "Il tuo caveau.",
    headline2: "Sigillato finché non lo è più.",
    login: "Accedi con Internet Identity",
    subhead:
      "Un interruttore digitale dell'uomo morto per le criptovalute, costruito nativamente su Internet Computer — senza successione, senza ritardi, senza nessuno a sorvegliare tranne la catena stessa.",
    vaultDoorAlt:
      "Una porta di cassaforte bancaria in ottone e acciaio consumati, chiusa, con l'emblema del cappio infinito di Internet Computer che brilla debolmente al centro.",
    introduction: {
      eyebrow: "Introduzione",
      heading: "L'Interruttore di Uomo Morto — Nato nell'Età del Vapore",
      p1: "Negli ultimi decenni del diciannovesimo secolo, un nuovo tipo di macchina stava rimodellando la civiltà. I tram elettrici ora attraversavano le città affollate e gli ascensori sollevavano i passeggeri in edifici di altezza senza precedenti. Erano meraviglie — ed erano pericolosi.",
      p2: "Il problema era semplice e terrificante: cosa succede quando l'uomo al comando non è più al comando? Un conducente di tram poteva subire un infarto al volante. Un operatore di ascensore poteva perdere conoscenza a metà corsa. E la macchina, indifferente al destino del suo operatore, semplicemente continuava — finché non urtava qualcosa che la fermava.",
      p3: "Fu l'ingegnere americano Frank J. Sprague che, nel 1888, elettrificò le linee tranviarie di Richmond, in Virginia — la prima ferrovia elettrica urbana di successo negli Stati Uniti. La sua innovazione non si fermò al motore. Sprague capì che un veicolo che trasportava passeggeri ad alta velocità doveva poter fermarsi da solo se l'operatore fosse diventato incapace.",
      p4: "Lo chiamarono l'interruttore di uomo morto. Tieni la maniglia per continuare a muoverti. Rilasciala — sia per distrazione, malattia o morte — e la macchina si ferma da sola. Il nome non fu scelto per il dramma. Fu scelto per la precisione. L'interruttore era attivato dall'assenza della mano viva.",
      p5: "L'idea si diffuse rapidamente. Le metropolitane di New York, Londra e Tokyo la adottarono. Le centrali nucleari la integrarono nelle loro barre di controllo. Gli aerei commerciali la incorporarono nei loro piloti automatici. Ovunque una macchina trasportasse vite, l'interruttore di uomo morto la seguiva — silenzioso, paziente, in attesa.",
      h3a: "Come Funziona un Interruttore di Uomo Morto ai Giorni Nostri?",
      p6: "Hai lavorato duramente. Hai accumulato attivi in criptovaluta — ICP, Bitcoin, Ethereum, stablecoin. Riposano in portafogli e canister, protetti da chiavi private che solo tu possiedi. E come il conducente che stringe la maniglia, solo la tua presenza viva e attiva sulla rete mantiene il circuito chiuso.",
      p7: "Ecco come Sovereign Legacy applica lo stesso principio. Depositi attivi in una volta canister sicura sulla catena. Designi uno o più beneficiari e imposti un periodo di inattività di rete. Finché accedi periodicamente, l'interruttore resta chiuso. Nel momento in cui quell'attività cessa, Sovereign Legacy ti invia avvisi. Se non rispondi, il trasferimento viene eseguito automaticamente, spostando i tuoi attivi verso i beneficiari scelti senza avvocati, tribunali o ritardi.",
      h3b: "Vuoi Personalizzare i Tuoi Desideri?",
      p8: "Se desideri più di un destinatario — un coniuge, figli, un amico fidato, una causa benefica — Sovereign Legacy ti consente di dividere i tuoi attivi in percentuale. Tu imposti le quote. I tuoi beneficiari ricevono esattamente ciò che intendevi.",
    },
    advantages: {
      eyebrow: "Perché funziona",
      heading: "I Vantaggi Sono Integrati in Ogni Passaggio",
      card1: {
        title: "Niente avvocati. Niente successioni. Niente ritardi.",
        body: "Il canister esegue le tue istruzioni nel momento in cui scatta l'interruttore di uomo morto. Nessuna istituzione si frappone tra i tuoi desideri e le persone che ami.",
      },
      card2: {
        title: "Tu mantieni il controllo.",
        body: "Cambia beneficiari, regola le percentuali o aggiorna il tuo messaggio in qualsiasi momento. Tutto si aggiorna all'istante, sulla catena.",
      },
      card3: {
        title: "Funziona mentre dormi.",
        body: "Se la vita continua, Sovereign Legacy resta in silenzio. Se non continua, tutto procede esattamente come avevi pianificato.",
      },
      card4: {
        title: "Portata globale.",
        body: "I beneficiari possono essere ovunque nel mondo. Sovereign Legacy parla più lingue e gestisce la spiegazione, così non devi farlo tu.",
      },
      card5: {
        title: "I tuoi dati restano tuoi.",
        body: "La tua volta è un canister su Internet Computer, protetto dalla tua Internet Identity. Nessun terzo — incluso lo stesso Sovereign Legacy — ha accesso al suo contenuto.",
      },
    },
    faq: {
      eyebrow: "Domande",
      heading: "Domande Frequenti",
      q1: {
        q: "Quali lingue supporta Sovereign Legacy?",
        a: "L'app supporta 22 lingue, incluse lingue da destra a sinistra come arabo, persiano e urdu, così i beneficiari in qualsiasi parte del mondo possono comprendere un avviso di rilascio nella propria lingua.",
      },
      q2: {
        q: "Quanto è sicura la mia volta?",
        a: "La tua volta è un canister su Internet Computer, protetto dalla tua Internet Identity. Solo il tuo principal autenticato può visualizzare o gestire il suo contenuto.",
      },
      q3: {
        q: "Potrei mai perdere la mia volta?",
        a: "Finché mantieni l'accesso alla tua Internet Identity, la tua volta resta sotto il tuo controllo. Il rischio principale è perdere le credenziali di Internet Identity, ecco perché è importante conservare un backup sicuro del tuo metodo di recupero.",
      },
      q4: {
        q: "Come vengono divisi gli attivi tra i beneficiari?",
        a: "Assegni a ogni beneficiario una quota percentuale. Le quote possono essere modificate in qualsiasi momento prima del rilascio, e il totale assegnato a tutti i beneficiari non deve mai superare il 100%.",
      },
      q5: {
        q: "Come reimposto il timer di inattività di rete?",
        a: "Basta accedere con la tua Internet Identity. Qualsiasi verifica autenticata reimposta l'orologio di inattività e mantiene armato l'interruttore di uomo morto.",
      },
      q6: {
        q: "Come aggiungo un beneficiario?",
        a: "Dal tuo pannello, apri il pannello Beneficiari e aggiungi un nome, informazioni di contatto e percentuale di assegnazione.",
      },
      q7: {
        q: "Posso cambiare i miei beneficiari dopo la configurazione?",
        a: "Sì. Beneficiari, assegnazioni e messaggi personali possono essere aggiornati in qualsiasi momento — le modifiche hanno effetto immediato, sulla catena.",
      },
      q8: {
        q: "Chi può vedere i miei beneficiari?",
        a: "Solo tu, finché sei autenticato come proprietario della volta.",
      },
    },
    terms: {
      eyebrow: "Termini",
      heading: "Termini e Condizioni",
      card1: {
        title: "1. Panoramica",
        body: "ICP Sovereign Legacy è una piattaforma decentralizzata di eredità e interruttore di uomo morto, interamente sulla catena, costruita sul Protocollo Internet Computer (ICP). Utilizzando questo servizio, accetti questi termini.",
      },
      card2: {
        title: "2. Nessuna Responsabilità",
        body: "Gli sviluppatori non sono responsabili per alcuna perdita di attivi derivante da configurazione errata, credenziali Internet Identity perse, condizioni della rete blockchain o qualsiasi altra causa. Utilizza questo servizio a tuo rischio.",
      },
      card3: {
        title: "3. Esecuzione Autonoma",
        body: "La distribuzione degli attivi viene eseguita automaticamente dalla logica degli smart contract sulla catena quando scatta il tuo interruttore di uomo morto. Nessun intervento umano è necessario o possibile una volta scattato.",
      },
      card4: {
        title: "4. Privacy",
        body: "Il tuo elenco di beneficiari è memorizzato sulla catena ed è accessibile solo al tuo principal autenticato di Internet Identity. Nessun terzo può vedere i tuoi dati.",
      },
      card5: {
        title: "5. Commissioni",
        body: "Questo servizio è fornito come descritto nell'app. Eventuali commissioni applicabili a un'azione specifica sono mostrate chiaramente nell'app prima che tu confermi quell'azione — nessun addebito nascosto o ricorrente.",
      },
      card6: {
        title: "6. Idoneità",
        body: "Devi avere almeno 18 anni (o la maggiore età nella tua giurisdizione) e la capacità legale di stipulare questi termini per utilizzare questo servizio.",
      },
      card7: {
        title: "7. Nessuna Garanzia",
        body: "Questo servizio è fornito «così com'è» e «come disponibile», senza garanzie di alcun tipo, esplicite o implicite, incluse eventuali garanzie di funzionamento ininterrotto o senza errori.",
      },
      card8: {
        title: "8. Assunzione del Rischio",
        body: "Le criptovalute e la tecnologia blockchain comportano rischi intrinseci, tra cui volatilità dei prezzi, congestione della rete, vulnerabilità degli smart contract e modifiche ai protocolli sottostanti. Utilizzando questo servizio, accetti questi rischi.",
      },
      card9: {
        title: "9. Risoluzione",
        body: "L'accesso a questo servizio può essere sospeso o risolto per violazione di questi termini o per condotte che Sovereign Legacy determini, a sua discrezione, dannose per altri utenti o per il servizio stesso.",
      },
      card10: {
        title: "10. Modifiche a Questi Termini",
        body: "Questi termini possono essere aggiornati di volta in volta. Le modifiche sostanziali saranno presentate nell'app, e l'uso continuato del servizio dopo tali modifiche costituisce accettazione dei termini aggiornati.",
      },
    },
  },
  dashboard: {
    eyebrow: "Pannello",
    title: "La Volta",
    balance: "Saldo della Volta",
    assetsHeld: "{count} attivo/i detenuto/i",
    noAssets: "Nessun attivo detenuto per ora",
    beneficiaries: "Beneficiari",
    named: "designati",
    sealed: "{count} beneficiario/i sigillato/i",
    none: "Nessun beneficiario per ora",
    allocation: "Assegnazione dei Beneficiari",
    allocationNone:
      "Nessuna assegnazione per ora. Aggiungi un beneficiario per iniziare.",
    allocationAria: "Quote di assegnazione dei beneficiari",
    switch: "L'Interruttore",
    lastVerified: "Ultima verifica · {time}",
    notVerified: "Non ancora verificato",
  },
  beneficiaries: {
    eyebrow: "Beneficiari",
    title: "Beneficiari",
    subtitle:
      "Le persone e le cause per cui la tua eredità è sigillata. Assegnazione, ordine e condizioni vivono qui.",
    allocation: "Assegnazione",
    count: "{count} beneficiario/i",
    noAllocations:
      "Nessuna assegnazione per ora. Aggiungi un beneficiario per iniziare.",
    allocationAria: "Quote di assegnazione dei beneficiari",
    manage: "Gestisci",
    manageBody:
      "Aggiungi un beneficiario e assegna la sua quota della volta. Le quote possono essere modificate o revocate in qualsiasi momento.",
    loadError: "Impossibile caricare i beneficiari. Riprova.",
    emptyTitle: "Nessun beneficiario per ora",
    emptyBody:
      "La tua eredità non è assegnata. Aggiungi il tuo primo beneficiario per sigillare la volta per qualcuno.",
    noWallet: "Nessun indirizzo di portafoglio",
    editAria: "Modifica {name}",
    removeAria: "Rimuovi {name}",
    modal: {
      editTitle: "Modifica beneficiario",
      addTitle: "Aggiungi beneficiario",
      editDesc:
        "Aggiorna nome, quota o indirizzo del portafoglio di questo beneficiario.",
      addDesc:
        "Assegna un nome e una quota di assegnazione a un nuovo beneficiario.",
    },
    namePlaceholder: "es. Elena Marchetti",
    sharePlaceholder: "es. 40",
    errors: {
      nameRequired: "Inserisci un nome per questo beneficiario.",
      sharePositive: "La quota di assegnazione deve essere maggiore di zero.",
      invalidChecksum:
        "Questo identificatore di conto ICP ha un checksum non valido. Controlla l'indirizzo.",
      invalidWallet:
        "Inserisci un indirizzo di portafoglio ICP valido — un identificatore di conto di 64 caratteri o un principal ICP.",
      totalExceedsEdit:
        "Questo porterebbe l'assegnazione totale al {total}%, superando il limite del 100%.",
      totalExceedsAdd:
        "L'assegnazione totale sarebbe del {total}%, superando il limite del 100%.",
      saveFailed: "Impossibile salvare le modifiche. Riprova.",
      addFailed: "Impossibile aggiungere il beneficiario. Riprova.",
    },
  },
  assets: {
    eyebrow: "Eredità e Attivi",
    title: "Attivi Detenuti",
    subtitle:
      "Tutto ciò che è custodito nella volta — saldi, partecipazioni e le istruzioni che li governano.",
    assetsHeld: "Attivi Detenuti",
    beneficiaries: "Beneficiari",
    allocationStatus: "Stato dell'Assegnazione",
    sealed: "Sigillato",
    unallocated: "Non assegnato",
    beneficiaryFallback: "Beneficiario #{id}",
    errorEyebrow: "Volta non raggiungibile",
    errorBody: "Impossibile leggere gli attivi detenuti. Riprova.",
    emptyEyebrow: "Nessun attivo detenuto",
    emptyBody:
      "La volta non contiene attualmente attivi in criptovaluta. Una volta aggiunti, qui appariranno i loro saldi e le assegnazioni ai beneficiari.",
    allocationLabel: "Assegnazione dei Beneficiari",
  },
  switch: {
    eyebrow: "L'Interruttore",
    title: "L'Interruttore",
    subtitle:
      "L'unico controllo che consegna la volta. Armato, verificato e deliberato.",
    active: "Attivo · Interruttore di uomo morto",
    standingDown: "In riposo",
    armed: "ARMATO",
    disarmed: "DISARMATO",
    checkIn: "Sono ancora qui",
    arm: "Arma l'interruttore",
    disarm: "Disarma",
    cadence: "Cadenza · {duration}",
    releaseIn: "Rilascio tra {duration}",
    timelineAriaArmed:
      "Cronologia dell'interruttore di uomo morto, {percent}% della cadenza trascorsa",
    timelineAriaDisarmed:
      "Cronologia dell'interruttore di uomo morto, disarmato",
    lastCheckIn: "Ultima verifica",
    armedAt: "Armato il",
    cadenceLabel: "Cadenza",
    standingDownTitle: "In riposo",
    standingDownBody:
      "Disarmare interrompe l'interruttore di uomo morto. La volta resta sigillata, ma non si rilascerà più ai tuoi beneficiari in caso di verifica mancata.",
    disarmTheSwitch: "Disarma l'interruttore",
    armTitle: "Arma l'interruttore",
    armBody:
      "Scegli per quanto tempo la volta attende la tua prossima verifica. Se la manchi, la volta si rilascia ai tuoi beneficiari.",
    cadenceError:
      "Scegli una cadenza di verifica maggiore di zero prima di armare l'interruttore.",
    errorEyebrow: "Interruttore non raggiungibile",
    errorBody: "Impossibile leggere lo stato dell'interruttore. Riprova.",
    cadence24h: "24 ore",
    cadence7d: "7 giorni",
    cadence30d: "30 giorni",
  },
  audit: {
    eyebrow: "Registri di Controllo",
    title: "Registri di Controllo",
    ledger: "Registro degli Eventi",
    count: "{count} evento/i sigillato/i",
    timestamp: "Data/ora",
    event: "Evento",
    description: "Descrizione",
    tableAria: "Registro di controllo della volta",
    errorEyebrow: "Registro non raggiungibile",
    errorBody: "Impossibile leggere il registro di controllo. Riprova.",
    emptyTitle: "Nessun evento per ora",
    emptyBody:
      "Ogni azione eseguita sulla volta sarà sigillata qui, in ordine, man mano che accade.",
    footer:
      "Ogni voce è sigillata nel registro. Le voci non possono essere modificate né rimosse.",
  },
  settings: {
    eyebrow: "Impostazioni",
    title: "Configurazione della Volta",
    subtitle:
      "Preserva la configurazione che governa la tua eredità — lo stato armato/disarmato dell'Interruttore, la sua cadenza di verifica e i beneficiari per cui è sigillato.",
    switchTitle: "L'Interruttore",
    switchDesc:
      "Arma o disarma la volta e imposta con quale frequenza deve essere verificata.",
    beneficiariesTitle: "Beneficiari",
    beneficiariesDesc:
      "Modifica le persone e le cause per cui la tua eredità è sigillata.",
    cadence: "Cadenza · {value}",
    daily: "Giornaliero",
    weekly: "Settimanale",
    monthly: "Mensile",
    yearly: "Annuale",
    h24: "24 ore",
    h7d: "7 giorni",
    h30d: "30 giorni",
    h365d: "365 giorni",
    emptyBeneficiaries: "Nessun beneficiario configurato per ora",
    editBeneficiary: "Modifica beneficiario",
    editBeneficiaryDesc:
      "Aggiorna nome, quota di assegnazione e indirizzo del portafoglio di questo beneficiario.",
    removeBeneficiary: "Rimuovi beneficiario",
    removeBeneficiaryDesc:
      "Rimuovere {name} dalla volta? Questa azione non può essere annullata.",
    toast: {
      armed: "L'Interruttore è stato armato",
      armedDesc: "Cadenza di verifica impostata su {cadence}.",
      armError: "Impossibile armare l'Interruttore",
      armErrorDesc: "La volta non ha potuto essere armata. Riprova.",
      disarmed: "L'Interruttore è stato disarmato",
      disarmedDesc: "La volta non è più armata.",
      disarmError: "Impossibile disarmare l'Interruttore",
      disarmErrorDesc: "La volta non ha potuto essere disarmata. Riprova.",
      beneficiaryUpdated: "Beneficiario aggiornato",
      beneficiaryUpdatedDesc:
        "La configurazione del beneficiario è stata salvata.",
      updateError: "Impossibile aggiornare il beneficiario",
      updateErrorDesc: "Le modifiche non sono state salvate. Riprova.",
      beneficiaryRemoved: "Beneficiario rimosso",
      beneficiaryRemovedDesc: "Il beneficiario è stato rimosso dalla volta.",
      removeError: "Impossibile rimuovere il beneficiario",
      removeErrorDesc: "Il beneficiario non ha potuto essere rimosso. Riprova.",
    },
  },
};
