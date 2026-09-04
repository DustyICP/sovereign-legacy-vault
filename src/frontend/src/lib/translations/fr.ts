import type { Translations } from "@/lib/translations/en";

/** French (fr). Falls back to English for any key not covered here. */
export const fr: Partial<Translations> = {
  meta: {
    title: "Sovereign Legacy — Le Coffre",
    description:
      "Sovereign Legacy — Le Coffre. Votre coffre. Scellé jusqu'à ce qu'il ne le soit plus.",
  },
  common: {
    cancel: "Annuler",
    saveChanges: "Enregistrer les modifications",
    edit: "Modifier",
    remove: "Supprimer",
    name: "Nom",
    optional: "Facultatif",
    addBeneficiary: "Ajouter un bénéficiaire",
    allocationShare: "Part d'allocation (%)",
    walletAddress: "Adresse du portefeuille",
    checkInCadence: "Cadence de vérification",
    selectCadence: "Sélectionner la cadence",
    armed: "Armé",
    disarmed: "Désarmé",
    arming: "Armement…",
    disarming: "Désarmement…",
    saving: "Enregistrement…",
    removing: "Suppression…",
    arm: "Armer",
    disarm: "Désarmer",
  },
  nav: {
    dashboard: "Tableau de bord",
    beneficiaries: "Bénéficiaires",
    legacyAssets: "Héritage et Actifs",
    theSwitch: "L'Interrupteur",
    auditLogs: "Journaux d'Audit",
    settings: "Paramètres",
  },
  header: {
    home: "Accueil Sovereign Legacy",
    networkBadge: "Réseau · Identité",
    mobileMenu: "Ouvrir le menu de navigation",
    mobilePrimary: "Navigation principale mobile",
  },
  footer: {
    copyright: "© {year}. Sovereign Legacy — Le Coffre. Tous droits réservés.",
    tagline: "Scellé jusqu'à ce qu'il ne le soit plus",
  },
  loading: {
    openingVault: "Ouverture du coffre…",
  },
  language: {
    label: "Langue",
  },
  landing: {
    eyebrow: "Héritage auto-souverain",
    headline1: "Votre coffre.",
    headline2: "Scellé jusqu'à ce qu'il ne le soit plus.",
    login: "Connexion avec Internet Identity",
    subhead:
      "Un interrupteur d'homme mort numérique pour vos cryptoactifs, natif sur l'Internet Computer — sans succession, sans délais, sans personne pour surveiller à part la chaîne elle-même.",
    vaultDoorAlt:
      "Une porte de coffre-fort bancaire en laiton et acier patinés, fermée, avec l'emblème en boucle infinie d'Internet Computer qui luit faiblement en son centre.",
    introduction: {
      eyebrow: "Introduction",
      heading: "L'Interrupteur de Homme Mort — Né à l'Âge de la Vapeur",
      p1: "Dans les dernières décennies du XIXe siècle, un nouveau type de machine remodelait la civilisation. Les tramways électriques sillonnaient désormais les villes bondées, et les ascenseurs hissaient les passagers dans des immeubles d'une hauteur sans précédent. C'étaient des merveilles — et elles étaient dangereuses.",
      p2: "Le problème était simple et terrifiant : que se passe-t-il quand l'homme aux commandes n'est plus aux commandes ? Un conducteur de tramway pouvait être victime d'une crise cardiaque. Un opérateur d'ascenseur pouvait perdre connaissance en pleine course. Et la machine, indifférente au sort de son opérateur, continuait simplement — jusqu'à heurter quelque chose qui l'arrêtait.",
      p3: "C'est l'ingénieur américain Frank J. Sprague qui, en 1888, électrifia les lignes de tramway de Richmond, en Virginie — le premier chemin de fer électrique urbain réussi des États-Unis. Son innovation ne s'arrêta pas au moteur. Sprague comprit qu'un véhicule transportant des passagers à grande vitesse devait pouvoir s'arrêter seul si l'opérateur devenait incapable.",
      p4: "Ils l'appelèrent l'interrupteur de homme mort. Tenez la poignée pour continuer. Relâchez-la — que ce soit par distraction, maladie ou mort — et la machine s'arrête d'elle-même. Le nom ne fut pas choisi pour le drame. Il fut choisi pour la précision. L'interrupteur était activé par l'absence de la main vivante.",
      p5: "L'idée se répandit rapidement. Les métros de New York, Londres et Tokyo l'adoptèrent. Les centrales nucléaires l'intégrèrent à leurs barres de contrôle. Les avions commerciaux l'incorporèrent à leurs pilotes automatiques. Partout où une machine transportait des vies, l'interrupteur de homme mort suivait — silencieux, patient, en attente.",
      h3a: "Comment Fonctionne un Interrupteur de Homme Mort Aujourd'hui ?",
      p6: "Vous avez travaillé dur. Vous avez accumulé des actifs crypto — ICP, Bitcoin, Ethereum, stablecoins. Ils reposent dans des portefeuilles et des canisters, protégés par des clés privées que vous seul possédez. Et comme le conducteur agrippant la poignée, seule votre présence vivante et active sur le réseau maintient le circuit fermé.",
      p7: "Voici comment Sovereign Legacy applique le même principe. Vous déposez des actifs dans un coffre canister sécurisé sur la chaîne. Vous désignez un ou plusieurs bénéficiaires et fixez une période d'inactivité réseau. Tant que vous vous connectez périodiquement, l'interrupteur reste fermé. Dès que cette activité cesse, Sovereign Legacy vous envoie des alertes. Si vous ne répondez pas, le transfert s'exécute automatiquement, déplaçant vos actifs vers vos bénéficiaires choisis, sans avocats, tribunaux ni délais.",
      h3b: "Vous Souhaitez Personnaliser Vos Volontés ?",
      p8: "Si vous souhaitez plus d'un destinataire — un conjoint, des enfants, un ami de confiance, une cause caritative — Sovereign Legacy vous permet de diviser vos actifs en pourcentages. Vous fixez les parts. Vos bénéficiaires reçoivent exactement ce que vous aviez prévu.",
    },
    advantages: {
      eyebrow: "Pourquoi ça fonctionne",
      heading: "Les Avantages Sont Intégrés à Chaque Étape",
      card1: {
        title: "Pas d'avocats. Pas de succession. Pas de délais.",
        body: "Le canister exécute vos instructions dès que l'interrupteur de homme mort se déclenche. Aucune institution ne s'interpose entre vos volontés et les personnes que vous aimez.",
      },
      card2: {
        title: "Vous gardez le contrôle.",
        body: "Modifiez les bénéficiaires, ajustez les pourcentages ou mettez à jour votre message à tout moment. Tout se met à jour instantanément, sur la chaîne.",
      },
      card3: {
        title: "Fonctionne pendant que vous dormez.",
        body: "Si la vie continue, Sovereign Legacy reste silencieux. Si elle ne continue pas, tout avance exactement comme vous l'aviez prévu.",
      },
      card4: {
        title: "Portée mondiale.",
        body: "Les bénéficiaires peuvent être n'importe où dans le monde. Sovereign Legacy parle plusieurs langues et gère l'explication pour que vous n'ayez pas à le faire.",
      },
      card5: {
        title: "Vos données restent vôtres.",
        body: "Votre coffre est un canister sur Internet Computer, sécurisé par votre Internet Identity. Aucun tiers — y compris Sovereign Legacy lui-même — n'a accès à son contenu.",
      },
    },
    faq: {
      eyebrow: "Questions",
      heading: "Questions Fréquentes",
      q1: {
        q: "Quelles langues Sovereign Legacy prend-il en charge ?",
        a: "L'application prend en charge 22 langues, dont des langues de droite à gauche comme l'arabe, le persan et l'ourdou, afin que les bénéficiaires du monde entier puissent comprendre un avis de libération dans leur propre langue.",
      },
      q2: {
        q: "Mon coffre est-il sécurisé ?",
        a: "Votre coffre est un canister sur Internet Computer, sécurisé par votre Internet Identity. Seul votre principal authentifié peut voir ou gérer son contenu.",
      },
      q3: {
        q: "Pourrais-je un jour perdre mon coffre ?",
        a: "Tant que vous conservez l'accès à votre Internet Identity, votre coffre reste sous votre contrôle. Le principal risque est de perdre vos identifiants Internet Identity, c'est pourquoi il est essentiel de conserver une sauvegarde sécurisée de votre méthode de récupération.",
      },
      q4: {
        q: "Comment les actifs sont-ils répartis entre les bénéficiaires ?",
        a: "Vous attribuez à chaque bénéficiaire une part en pourcentage. Les parts peuvent être ajustées à tout moment avant la libération, et le total alloué à tous les bénéficiaires ne doit jamais dépasser 100 %.",
      },
      q5: {
        q: "Comment réinitialiser le minuteur d'inactivité réseau ?",
        a: "Connectez-vous simplement avec votre Internet Identity. Toute vérification authentifiée réinitialise l'horloge d'inactivité et maintient l'interrupteur de homme mort armé.",
      },
      q6: {
        q: "Comment ajouter un bénéficiaire ?",
        a: "Depuis votre tableau de bord, ouvrez le panneau Bénéficiaires et ajoutez un nom, des coordonnées et un pourcentage d'allocation.",
      },
      q7: {
        q: "Puis-je modifier mes bénéficiaires après la configuration ?",
        a: "Oui. Les bénéficiaires, les allocations et les messages personnels peuvent tous être mis à jour à tout moment — les changements prennent effet immédiatement, sur la chaîne.",
      },
      q8: {
        q: "Qui peut voir mes bénéficiaires ?",
        a: "Vous seul, tant que vous êtes authentifié en tant que propriétaire du coffre.",
      },
    },
    terms: {
      eyebrow: "Conditions",
      heading: "Conditions Générales",
      card1: {
        title: "1. Présentation",
        body: "ICP Sovereign Legacy est une plateforme décentralisée d'héritage et d'interrupteur de homme mort, entièrement sur la chaîne, construite sur le protocole Internet Computer (ICP). En utilisant ce service, vous acceptez ces conditions.",
      },
      card2: {
        title: "2. Absence de Responsabilité",
        body: "Les développeurs ne sont pas responsables de toute perte d'actifs résultant d'une configuration incorrecte, de la perte d'identifiants Internet Identity, des conditions du réseau blockchain ou de toute autre cause. Utilisez ce service à vos propres risques.",
      },
      card3: {
        title: "3. Exécution Autonome",
        body: "La distribution des actifs est exécutée automatiquement par la logique des contrats intelligents sur la chaîne lorsque votre interrupteur de homme mort se déclenche. Aucune intervention humaine n'est requise ni possible une fois déclenché.",
      },
      card4: {
        title: "4. Confidentialité",
        body: "Votre liste de bénéficiaires est stockée sur la chaîne et accessible uniquement à votre principal Internet Identity authentifié. Aucun tiers ne peut voir vos données.",
      },
      card5: {
        title: "5. Frais",
        body: "Ce service est fourni tel que décrit dans l'application. Tout frais applicable à une action spécifique est clairement affiché dans l'application avant que vous ne confirmiez cette action — aucun frais caché ni récurrent.",
      },
      card6: {
        title: "6. Éligibilité",
        body: "Vous devez avoir au moins 18 ans (ou l'âge de la majorité dans votre juridiction) et avoir la capacité légale de conclure ces conditions pour utiliser ce service.",
      },
      card7: {
        title: "7. Absence de Garantie",
        body: "Ce service est fourni « tel quel » et « selon disponibilité », sans garanties d'aucune sorte, expresses ou implicites, y compris toute garantie de fonctionnement ininterrompu ou sans erreur.",
      },
      card8: {
        title: "8. Acceptation des Risques",
        body: "Les cryptomonnaies et la technologie blockchain comportent des risques inhérents, notamment la volatilité des prix, la congestion du réseau, les vulnérabilités des contrats intelligents et les modifications des protocoles sous-jacents. En utilisant ce service, vous acceptez ces risques.",
      },
      card9: {
        title: "9. Résiliation",
        body: "L'accès à ce service peut être suspendu ou résilié en cas de violation de ces conditions ou pour tout comportement que Sovereign Legacy juge, à sa discrétion, préjudiciable aux autres utilisateurs ou au service lui-même.",
      },
      card10: {
        title: "10. Modifications de Ces Conditions",
        body: "Ces conditions peuvent être mises à jour de temps à autre. Les modifications importantes seront présentées dans l'application, et l'utilisation continue du service après ces modifications constitue une acceptation des conditions mises à jour.",
      },
    },
  },
  dashboard: {
    eyebrow: "Tableau de bord",
    title: "Le Coffre",
    balance: "Solde du Coffre",
    assetsHeld: "{count} actif(s) détenu(s)",
    noAssets: "Aucun actif détenu pour l'instant",
    beneficiaries: "Bénéficiaires",
    named: "désignés",
    sealed: "{count} bénéficiaire(s) scellé(s)",
    none: "Aucun bénéficiaire pour l'instant",
    allocation: "Allocation des Bénéficiaires",
    allocationNone:
      "Aucune allocation pour l'instant. Ajoutez un bénéficiaire pour commencer.",
    allocationAria: "Parts d'allocation des bénéficiaires",
    allocated: "alloué",
    switch: "L'Interrupteur",
    lastVerified: "Dernière vérification · {time}",
    notVerified: "Pas encore vérifié",
  },
  beneficiaries: {
    eyebrow: "Bénéficiaires",
    title: "Bénéficiaires",
    subtitle:
      "Les personnes et causes pour lesquelles votre héritage est scellé. L'allocation, l'ordre et les conditions vivent ici.",
    allocation: "Allocation",
    count: "{count} bénéficiaire(s)",
    noAllocations:
      "Aucune allocation pour l'instant. Ajoutez un bénéficiaire pour commencer.",
    allocationAria: "Parts d'allocation des bénéficiaires",
    manage: "Gérer",
    manageBody:
      "Ajoutez un bénéficiaire et attribuez-lui sa part du coffre. Les parts peuvent être modifiées ou révoquées à tout moment.",
    loadError: "Impossible de charger les bénéficiaires. Veuillez réessayer.",
    emptyTitle: "Aucun bénéficiaire pour l'instant",
    emptyBody:
      "Votre héritage n'est pas attribué. Ajoutez votre premier bénéficiaire pour sceller le coffre pour quelqu'un.",
    noWallet: "Aucune adresse de portefeuille",
    editAria: "Modifier {name}",
    removeAria: "Supprimer {name}",
    modal: {
      editTitle: "Modifier le bénéficiaire",
      addTitle: "Ajouter un bénéficiaire",
      editDesc:
        "Mettez à jour le nom, la part ou l'adresse du portefeuille de ce bénéficiaire.",
      addDesc:
        "Attribuez un nom et une part d'allocation à un nouveau bénéficiaire.",
    },
    namePlaceholder: "p. ex. Elena Marchetti",
    sharePlaceholder: "p. ex. 40",
    errors: {
      nameRequired: "Saisissez un nom pour ce bénéficiaire.",
      sharePositive: "La part d'allocation doit être supérieure à zéro.",
      invalidChecksum:
        "Cet identifiant de compte ICP a une somme de contrôle invalide. Vérifiez l'adresse.",
      invalidWallet:
        "Saisissez une adresse de portefeuille ICP valide — un identifiant de compte de 64 caractères ou un principal ICP.",
      totalExceedsEdit:
        "Cela porterait l'allocation totale à {total} %, dépassant la limite de 100 %.",
      totalExceedsAdd:
        "L'allocation totale serait de {total} %, dépassant la limite de 100 %.",
      saveFailed:
        "Impossible d'enregistrer les modifications. Veuillez réessayer.",
      addFailed: "Impossible d'ajouter le bénéficiaire. Veuillez réessayer.",
    },
  },
  assets: {
    eyebrow: "Héritage et Actifs",
    title: "Actifs Détenus",
    subtitle:
      "Tout ce qui est conservé dans le coffre — soldes, avoirs et les instructions qui les régissent.",
    assetsHeld: "Actifs Détenus",
    beneficiaries: "Bénéficiaires",
    allocationStatus: "État de l'Allocation",
    sealed: "Scellé",
    unallocated: "Non alloué",
    beneficiaryFallback: "Bénéficiaire #{id}",
    errorEyebrow: "Coffre inaccessible",
    errorBody: "Impossible de lire les actifs détenus. Veuillez réessayer.",
    emptyEyebrow: "Aucun actif détenu",
    emptyBody:
      "Le coffre ne contient actuellement aucun actif crypto. Une fois des actifs ajoutés, leurs soldes et allocations aux bénéficiaires apparaîtront ici.",
    allocationLabel: "Allocation des Bénéficiaires",
  },
  switch: {
    eyebrow: "L'Interrupteur",
    title: "L'Interrupteur",
    subtitle:
      "La seule commande qui remet le coffre. Armé, vérifié et délibéré.",
    active: "Actif · Interrupteur de homme mort",
    standingDown: "En veille",
    armed: "ARMÉ",
    disarmed: "DÉSARMÉ",
    checkIn: "Je suis toujours là",
    arm: "Armer l'interrupteur",
    disarm: "Désarmer",
    cadence: "Cadence · {duration}",
    releaseIn: "Libération dans {duration}",
    timelineAriaArmed:
      "Chronologie de l'interrupteur de homme mort, {percent} % de la cadence écoulée",
    timelineAriaDisarmed:
      "Chronologie de l'interrupteur de homme mort, désarmé",
    lastCheckIn: "Dernière vérification",
    armedAt: "Armé le",
    cadenceLabel: "Cadence",
    standingDownTitle: "En veille",
    standingDownBody:
      "Désarmer interrompt l'interrupteur de homme mort. Le coffre reste scellé, mais il ne se libérera plus vers vos bénéficiaires en cas de vérification manquée.",
    disarmTheSwitch: "Désarmer l'interrupteur",
    armTitle: "Armer l'interrupteur",
    armBody:
      "Choisissez combien de temps le coffre attend votre prochaine vérification. Si vous la manquez, le coffre se libère vers vos bénéficiaires.",
    cadenceError:
      "Choisissez une cadence de vérification supérieure à zéro avant d'armer l'interrupteur.",
    errorEyebrow: "Interrupteur inaccessible",
    errorBody:
      "Impossible de lire l'état de l'interrupteur. Veuillez réessayer.",
    cadence24h: "24 heures",
    cadence7d: "7 jours",
    cadence30d: "30 jours",
  },
  audit: {
    eyebrow: "Journaux d'Audit",
    title: "Journaux d'Audit",
    ledger: "Registre des Événements",
    count: "{count} événement(s) scellé(s)",
    timestamp: "Horodatage",
    event: "Événement",
    description: "Description",
    tableAria: "Journal d'audit du coffre",
    errorEyebrow: "Registre inaccessible",
    errorBody: "Impossible de lire le registre d'audit. Veuillez réessayer.",
    emptyTitle: "Aucun événement pour l'instant",
    emptyBody:
      "Chaque action effectuée sur le coffre sera scellée ici, dans l'ordre, au fur et à mesure.",
    footer:
      "Chaque entrée est scellée dans le registre. Les entrées ne peuvent être ni modifiées ni supprimées.",
  },
  settings: {
    eyebrow: "Paramètres",
    title: "Configuration du Coffre",
    subtitle:
      "Préservez la configuration qui régit votre héritage — l'état armé/désarmé de l'Interrupteur, sa cadence de vérification et les bénéficiaires pour lesquels il est scellé.",
    switchTitle: "L'Interrupteur",
    switchDesc:
      "Armez ou désarmez le coffre et définissez la fréquence de vérification.",
    beneficiariesTitle: "Bénéficiaires",
    beneficiariesDesc:
      "Modifiez les personnes et causes pour lesquelles votre héritage est scellé.",
    cadence: "Cadence · {value}",
    daily: "Quotidien",
    weekly: "Hebdomadaire",
    monthly: "Mensuel",
    yearly: "Annuel",
    h24: "24 heures",
    h7d: "7 jours",
    h30d: "30 jours",
    h365d: "365 jours",
    emptyBeneficiaries: "Aucun bénéficiaire configuré pour l'instant",
    editBeneficiary: "Modifier le bénéficiaire",
    editBeneficiaryDesc:
      "Mettez à jour le nom, la part d'allocation et l'adresse du portefeuille de ce bénéficiaire.",
    removeBeneficiary: "Supprimer le bénéficiaire",
    removeBeneficiaryDesc:
      "Supprimer {name} du coffre ? Cette action est irréversible.",
    toast: {
      armed: "L'Interrupteur est armé",
      armedDesc: "Cadence de vérification définie sur {cadence}.",
      armError: "Impossible d'armer l'Interrupteur",
      armErrorDesc: "Le coffre n'a pas pu être armé. Veuillez réessayer.",
      disarmed: "L'Interrupteur est désarmé",
      disarmedDesc: "Le coffre n'est plus armé.",
      disarmError: "Impossible de désarmer l'Interrupteur",
      disarmErrorDesc: "Le coffre n'a pas pu être désarmé. Veuillez réessayer.",
      beneficiaryUpdated: "Bénéficiaire mis à jour",
      beneficiaryUpdatedDesc:
        "La configuration du bénéficiaire a été enregistrée.",
      updateError: "Impossible de mettre à jour le bénéficiaire",
      updateErrorDesc:
        "Les modifications n'ont pas été enregistrées. Veuillez réessayer.",
      beneficiaryRemoved: "Bénéficiaire supprimé",
      beneficiaryRemovedDesc: "Le bénéficiaire a été retiré du coffre.",
      removeError: "Impossible de supprimer le bénéficiaire",
      removeErrorDesc:
        "Le bénéficiaire n'a pas pu être supprimé. Veuillez réessayer.",
    },
  },
};
