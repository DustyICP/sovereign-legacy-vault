import type { Translations } from "@/lib/translations/en";

/** Filipino (fil). Falls back to English for any key not covered here. */
export const fil: Partial<Translations> = {
  meta: {
    title: "Sovereign Legacy — Ang Vault",
    description:
      "Sovereign Legacy — Ang Vault. Ang iyong vault. Nakatatak hanggang hindi na.",
  },
  common: {
    cancel: "Kanselahin",
    saveChanges: "I-save ang mga pagbabago",
    edit: "I-edit",
    remove: "Alisin",
    name: "Pangalan",
    optional: "Opsyonal",
    addBeneficiary: "Magdagdag ng benepisyaryo",
    allocationShare: "Bahagi ng alokasyon (%)",
    walletAddress: "Address ng wallet",
    checkInCadence: "Dalas ng check-in",
    selectCadence: "Pumili ng dalas",
    armed: "Aktibo",
    disarmed: "Hindi aktibo",
    arming: "Ina-activate…",
    disarming: "Ina-deactivate…",
    saving: "Sine-save…",
    removing: "Inaalis…",
    arm: "I-activate",
    disarm: "I-deactivate",
  },
  nav: {
    dashboard: "Dashboard",
    beneficiaries: "Mga Benepisyaryo",
    legacyAssets: "Legacy at Mga Asset",
    theSwitch: "Ang Switch",
    auditLogs: "Mga Audit Log",
    settings: "Mga Setting",
  },
  header: {
    home: "Home ng Sovereign Legacy",
    networkBadge: "Network · Identity",
    mobileMenu: "Buksan ang menu ng nabigasyon",
    mobilePrimary: "Pangunahing nabigasyon sa mobile",
  },
  footer: {
    copyright:
      "© {year}. Sovereign Legacy — Ang Vault. Nakalaan ang lahat ng karapatan.",
    tagline: "Nakatatak hanggang hindi na",
  },
  loading: {
    openingVault: "Binubuksan ang vault…",
  },
  language: {
    label: "Wika",
  },
  landing: {
    eyebrow: "Sariling-soberanong pamana",
    headline1: "Ang iyong kaban.",
    headline2: "Nakasarado hanggang sa hindi na.",
    login: "Mag-login gamit ang Internet Identity",
    subhead:
      "Isang digital na switch na pang-hudyat kapag pumanaw ang may-ari, para sa crypto, likas na itinayo sa Internet Computer — walang paglilitis ng mana, walang pagkaantala, walang nagmamasid maliban sa mismong kadena.",
    vaultDoorAlt:
      "Isang lumang pinto ng bangko na gawa sa tanso at bakal, nakasara, na may emblemang infinity-loop ng Internet Computer na kumikinang nang mahina sa gitna nito.",
    introduction: {
      eyebrow: "Panimula",
      heading: "Ang Dead Man's Switch — Ipinanganak sa Panahon ng Singaw",
      p1: "Sa mga huling dekada ng ikalabinsiyam na siglo, isang bagong uri ng makina ang humuhubog muli sa sibilisasyon. Ang mga de-kuryenteng tramway ay dumaraan na sa mga mataong lungsod, at ang mga elevator ay nag-aangat ng mga pasahero sa mga gusaling may hindi pa naganap na taas. Sila ay mga kahanga-hanga — at sila ay mapanganib.",
      p2: "Ang problema ay simple at nakakatakot: ano ang mangyayari kapag ang taong may kontrol ay wala nang kontrol? Ang isang motorman ay maaaring ma-heart attack sa manibela. Ang isang operator ng elevator ay maaaring mawalan ng malay sa kalagitnaan ng biyahe. At ang makina, walang pakialam sa kapalaran ng operator nito, ay magpapatuloy lamang — hanggang sa bumangga ito sa isang bagay na pumipigil dito.",
      p3: "Ang Amerikanong inhinyero na si Frank J. Sprague ang, noong 1888, nagpaandar ng kuryente sa mga linya ng tramway ng Richmond, Virginia — ang unang matagumpay na de-kuryenteng urban railway sa Estados Unidos. Ang kanyang inobasyon ay hindi huminto sa motor. Naunawaan ni Sprague na ang sasakyang nagdadala ng mga pasahero sa mataas na bilis ay nangangailangan ng paraan upang huminto kung sakaling mawalan ng kakayahan ang operator.",
      p4: "Tinawag nila itong dead man's switch. Hawakan ang hawakan upang magpatuloy sa paggalaw. Bitawan ito — dahil man sa pagkagambala, sakit, o kamatayan — at humihinto ang makina nang mag-isa. Ang pangalan ay hindi pinili para sa drama. Ito ay pinili para sa katumpakan. Ang switch ay na-activate ng kawalan ng buhay na kamay.",
      p5: "Mabilis na kumalat ang ideya. Ang mga subway sa New York, London, at Tokyo ay nagpatibay nito. Ang mga planta ng nukleyar na kuryente ay isinama ito sa kanilang mga control rod. Ang mga komersyal na sasakyang panghimpapawid ay isinama ito sa kanilang mga autopilot. Saanman nagdadala ng buhay ang isang makina, sumusunod ang dead man's switch — tahimik, matiyaga, naghihintay.",
      h3a: "Paano Gumagana ang Dead Man's Switch sa Panahong Ito?",
      p6: "Nagsumikap ka. Nag-ipon ka ng mga crypto asset — ICP, Bitcoin, Ethereum, stablecoin. Nasa mga wallet at canister ang mga ito, protektado ng mga pribadong susi na tanging ikaw ang mayroon. At tulad ng motorman na humahawak sa hawakan, tanging ang iyong buhay at aktibong presensya sa network ang nagpapanatiling nakasara sa circuit.",
      p7: "Narito kung paano inilalapat ng Sovereign Legacy ang parehong prinsipyo. Nagdeposito ka ng mga asset sa isang ligtas na on-chain canister vault. Nagtatalaga ka ng isa o higit pang benepisyaryo at nagtatakda ng panahon ng kawalan ng aktibidad sa network. Hangga't regular kang nagla-login, nananatiling nakasara ang switch. Sa sandaling huminto ang aktibidad na iyon, nagpapadala sa iyo ng mga alerto ang Sovereign Legacy. Kung hindi ka tumugon, awtomatikong isinasagawa ang paglipat, inililipat ang iyong mga asset sa iyong mga napiling benepisyaryo nang walang mga abogado, korte, o pagkaantala.",
      h3b: "Gusto Mong I-personalize ang Iyong Mga Hiling?",
      p8: "Kung gusto mo ng higit sa isang tatanggap — asawa, mga anak, isang pinagkakatiwalaang kaibigan, isang kawanggawa — pinapayagan ka ng Sovereign Legacy na hatiin ang iyong mga asset ayon sa porsyento. Ikaw ang nagtatakda ng mga bahagi. Natatanggap ng iyong mga benepisyaryo ang eksaktong iyong nilayon.",
    },
    advantages: {
      eyebrow: "Bakit ito gumagana",
      heading: "Ang Mga Bentahe ay Nakapaloob sa Bawat Hakbang",
      card1: {
        title: "Walang abogado. Walang probate. Walang pagkaantala.",
        body: "Isinasagawa ng canister ang iyong mga tagubilin sa sandaling mag-trigger ang dead man's switch. Walang institusyon ang nakatayo sa pagitan ng iyong mga hiling at ng mga taong mahal mo.",
      },
      card2: {
        title: "Ikaw ang nananatiling may kontrol.",
        body: "Palitan ang mga benepisyaryo, ayusin ang mga porsyento, o i-update ang iyong mensahe anumang oras. Lahat ay agad na na-update, on-chain.",
      },
      card3: {
        title: "Gumagana habang natutulog ka.",
        body: "Kung magpapatuloy ang buhay, nananatiling tahimik ang Sovereign Legacy. Kung hindi, lahat ay sumusulong nang eksakto tulad ng iyong binalak.",
      },
      card4: {
        title: "Pandaigdigang abot.",
        body: "Maaaring nasa kahit saan sa mundo ang mga benepisyaryo. Nagsasalita ang Sovereign Legacy ng maraming wika at hinahawakan ang paliwanag upang hindi mo na kailanganin.",
      },
      card5: {
        title: "Ang iyong data ay nananatiling sa iyo.",
        body: "Ang iyong vault ay isang canister sa Internet Computer, na sinisiguro ng iyong Internet Identity. Walang ikatlong partido — kabilang ang Sovereign Legacy mismo — ang may access sa mga nilalaman nito.",
      },
    },
    faq: {
      eyebrow: "Mga Tanong",
      heading: "Mga Madalas Itanong",
      q1: {
        q: "Anong mga wika ang sinusuportahan ng Sovereign Legacy?",
        a: "Sinusuportahan ng app ang 22 wika, kabilang ang mga wikang kanan-papuntang-kaliwa tulad ng Arabic, Persian, at Urdu, upang maunawaan ng mga benepisyaryo saanman sa mundo ang isang abiso ng paglabas sa kanilang sariling wika.",
      },
      q2: {
        q: "Gaano kaligtas ang aking vault?",
        a: "Ang iyong vault ay isang canister sa Internet Computer, na sinisiguro ng iyong Internet Identity. Tanging ang iyong na-authenticate na principal ang makakakita o makakapamahala sa mga nilalaman nito.",
      },
      q3: {
        q: "Maaari ko bang mawala ang aking vault?",
        a: "Hangga't pinapanatili mo ang access sa iyong Internet Identity, nananatili ang iyong vault sa ilalim ng iyong kontrol. Ang pangunahing panganib ay ang mawala ang iyong mga kredensyal sa Internet Identity, kaya naman mahalaga ang pag-iingat ng ligtas na backup ng iyong paraan ng pagbawi.",
      },
      q4: {
        q: "Paano hinahati ang mga asset sa mga benepisyaryo?",
        a: "Nagtatalaga ka sa bawat benepisyaryo ng bahaging porsyento. Maaaring ayusin ang mga bahagi anumang oras bago ang paglabas, at ang kabuuang inilaan sa lahat ng benepisyaryo ay hindi dapat lumampas sa 100%.",
      },
      q5: {
        q: "Paano ko ire-reset ang timer ng kawalan ng aktibidad sa network?",
        a: "Mag-login lamang gamit ang iyong Internet Identity. Anumang na-authenticate na check-in ay nagre-reset ng orasan ng kawalan ng aktibidad at pinapanatiling aktibo ang dead man's switch.",
      },
      q6: {
        q: "Paano ako magdadagdag ng benepisyaryo?",
        a: "Mula sa iyong dashboard, buksan ang panel ng Mga Benepisyaryo at magdagdag ng pangalan, impormasyon sa pakikipag-ugnayan, at porsyento ng alokasyon.",
      },
      q7: {
        q: "Maaari ko bang baguhin ang aking mga benepisyaryo pagkatapos ng setup?",
        a: "Oo. Ang mga benepisyaryo, alokasyon, at personal na mensahe ay maaaring i-update anumang oras — ang mga pagbabago ay may agarang epekto, on-chain.",
      },
      q8: {
        q: "Sino ang makakakita sa aking mga benepisyaryo?",
        a: "Ikaw lamang, habang na-authenticate bilang may-ari ng vault.",
      },
    },
    terms: {
      eyebrow: "Mga Tuntunin",
      heading: "Mga Tuntunin at Kundisyon",
      card1: {
        title: "1. Pangkalahatang-tanaw",
        body: "Ang ICP Sovereign Legacy ay isang desentralisado, ganap na on-chain na platform ng pamana at dead-man's-switch na binuo sa Internet Computer Protocol (ICP). Sa paggamit ng serbisyong ito, sumasang-ayon ka sa mga tuntuning ito.",
      },
      card2: {
        title: "2. Walang Pananagutan",
        body: "Ang mga developer ay hindi mananagot sa anumang pagkawala ng mga asset na dulot ng maling configuration, nawalang mga kredensyal sa Internet Identity, mga kondisyon ng blockchain network, o anumang iba pang dahilan. Gamitin ang serbisyong ito sa iyong sariling panganib.",
      },
      card3: {
        title: "3. Awtomatikong Pagpapatupad",
        body: "Ang pamamahagi ng asset ay awtomatikong isinasagawa ng on-chain smart contract logic kapag nag-trigger ang iyong dead-man's-switch. Walang interbensyon ng tao ang kinakailangan o posible kapag na-trigger na.",
      },
      card4: {
        title: "4. Privacy",
        body: "Ang iyong listahan ng benepisyaryo ay nakaimbak on-chain at naa-access lamang ng iyong na-authenticate na Internet Identity principal. Walang ikatlong partido ang makakakita sa iyong data.",
      },
      card5: {
        title: "5. Mga Bayarin",
        body: "Ang serbisyong ito ay ibinibigay gaya ng inilarawan sa loob ng app. Anumang bayarin na naaangkop sa isang partikular na aksyon ay malinaw na ipinapakita sa app bago mo kumpirmahin ang aksyong iyon — walang nakatagong o paulit-ulit na singil.",
      },
      card6: {
        title: "6. Pagiging Karapat-dapat",
        body: "Dapat kang hindi bababa sa 18 taong gulang (o ang edad ng mayoridad sa iyong hurisdiksyon) at may legal na kapasidad na pumasok sa mga tuntuning ito upang gamitin ang serbisyong ito.",
      },
      card7: {
        title: "7. Walang Warranty",
        body: "Ang serbisyong ito ay ibinibigay «gaya ng dati» at «gaya ng magagamit», nang walang mga warranty ng anumang uri, maging hayag o ipinahiwatig, kabilang ang anumang warranty ng walang patid o walang error na operasyon.",
      },
      card8: {
        title: "8. Pagtanggap sa Panganib",
        body: "Ang cryptocurrency at blockchain technology ay may mga likas na panganib, kabilang ang pagbabagu-bago ng presyo, pagsisikip ng network, mga kahinaan ng smart contract, at mga pagbabago sa mga pinagbabatayang protocol. Sa paggamit ng serbisyong ito, tinatanggap mo ang mga panganib na ito.",
      },
      card9: {
        title: "9. Pagwawakas",
        body: "Ang access sa serbisyong ito ay maaaring masuspinde o wakasan dahil sa paglabag sa mga tuntuning ito o sa mga pag-uugali na itinuturing ng Sovereign Legacy, sa sarili nitong pagpapasya, na nakakapinsala sa ibang mga user o sa serbisyo mismo.",
      },
      card10: {
        title: "10. Mga Pagbabago sa Mga Tuntuning Ito",
        body: "Ang mga tuntuning ito ay maaaring i-update paminsan-minsan. Ang mga materyal na pagbabago ay ipapakita sa loob ng app, at ang patuloy na paggamit ng serbisyo pagkatapos ng mga naturang pagbabago ay bumubuo ng pagtanggap sa mga na-update na tuntunin.",
      },
    },
  },
  dashboard: {
    eyebrow: "Dashboard",
    title: "Ang Vault",
    balance: "Balanse ng Vault",
    assetsHeld: "{count} asset ang hawak",
    noAssets: "Wala pang hawak na asset",
    beneficiaries: "Mga Benepisyaryo",
    named: "pinangalanan",
    sealed: "{count} benepisyaryo ang nakatatak",
    none: "Wala pang benepisyaryo",
    allocation: "Alokasyon ng mga Benepisyaryo",
    allocationNone:
      "Wala pang alokasyon. Magdagdag ng benepisyaryo upang magsimula.",
    allocationAria: "Mga bahagi ng alokasyon ng benepisyaryo",
    allocated: "inilaan",
    switch: "Ang Switch",
    lastVerified: "Huling na-verify · {time}",
    notVerified: "Hindi pa na-verify",
  },
  beneficiaries: {
    eyebrow: "Mga Benepisyaryo",
    title: "Mga Benepisyaryo",
    subtitle:
      "Ang mga tao at layunin kung saan nakatatak ang iyong pamana. Ang alokasyon, pagkakasunud-sunod, at mga kondisyon ay nakatira dito.",
    allocation: "Alokasyon",
    count: "{count} benepisyaryo",
    noAllocations:
      "Wala pang alokasyon. Magdagdag ng benepisyaryo upang magsimula.",
    allocationAria: "Mga bahagi ng alokasyon ng benepisyaryo",
    manage: "Pamahalaan",
    manageBody:
      "Magdagdag ng benepisyaryo at italaga ang kanilang bahagi ng vault. Ang mga bahagi ay maaaring i-edit o bawiin anumang oras.",
    loadError: "Hindi ma-load ang mga benepisyaryo. Pakisubukang muli.",
    emptyTitle: "Wala pang benepisyaryo",
    emptyBody:
      "Ang iyong pamana ay hindi pa itinalaga. Idagdag ang iyong unang benepisyaryo upang itatak ang vault para sa isang tao.",
    noWallet: "Walang address ng wallet",
    editAria: "I-edit si {name}",
    removeAria: "Alisin si {name}",
    modal: {
      editTitle: "I-edit ang benepisyaryo",
      addTitle: "Magdagdag ng benepisyaryo",
      editDesc:
        "I-update ang pangalan, bahagi, o address ng wallet ng benepisyaryong ito.",
      addDesc:
        "Magtalaga ng pangalan at bahagi ng alokasyon sa isang bagong benepisyaryo.",
    },
    namePlaceholder: "hal. Elena Marchetti",
    sharePlaceholder: "hal. 40",
    errors: {
      nameRequired: "Maglagay ng pangalan para sa benepisyaryong ito.",
      sharePositive: "Ang bahagi ng alokasyon ay dapat na mas malaki sa zero.",
      invalidChecksum:
        "Ang ICP account identifier na ito ay may hindi wastong checksum. Suriing muli ang address.",
      invalidWallet:
        "Maglagay ng wastong ICP wallet address — isang 64-character account identifier o isang ICP principal.",
      totalExceedsEdit:
        "Dadalhin nito ang kabuuang alokasyon sa {total}%, na lumalampas sa limitasyong 100%.",
      totalExceedsAdd:
        "Ang kabuuang alokasyon ay magiging {total}%, na lumalampas sa limitasyong 100%.",
      saveFailed: "Hindi mai-save ang mga pagbabago. Pakisubukang muli.",
      addFailed: "Hindi maidagdag ang benepisyaryo. Pakisubukang muli.",
    },
  },
  assets: {
    eyebrow: "Legacy at Mga Asset",
    title: "Mga Hawak na Asset",
    subtitle:
      "Lahat ng hawak sa vault — mga balanse, pag-aari, at ang mga tagubiling namamahala sa mga ito.",
    assetsHeld: "Mga Hawak na Asset",
    beneficiaries: "Mga Benepisyaryo",
    allocationStatus: "Katayuan ng Alokasyon",
    sealed: "Nakatatak",
    unallocated: "Hindi inilaan",
    beneficiaryFallback: "Benepisyaryo #{id}",
    errorEyebrow: "Hindi ma-access ang vault",
    errorBody: "Hindi mabasa ang mga hawak na asset. Pakisubukang muli.",
    emptyEyebrow: "Walang hawak na asset",
    emptyBody:
      "Ang vault ay kasalukuyang walang hawak na crypto asset. Kapag naidagdag ang mga asset, lalabas dito ang kanilang mga balanse at alokasyon sa benepisyaryo.",
    allocationLabel: "Alokasyon ng mga Benepisyaryo",
  },
  switch: {
    eyebrow: "Ang Switch",
    title: "Ang Switch",
    subtitle:
      "Ang tanging kontrol na nag-aabot ng vault. Aktibo, na-verify, at sinadya.",
    active: "Aktibo · Dead man's switch",
    standingDown: "Nakatayo",
    armed: "AKTIBO",
    disarmed: "HINDI AKTIBO",
    checkIn: "Narito pa ako",
    arm: "I-activate ang switch",
    disarm: "I-deactivate",
    cadence: "Dalas · {duration}",
    releaseIn: "Paglabas sa {duration}",
    timelineAriaArmed:
      "Timeline ng dead man's switch, {percent}% ng dalas ang lumipas",
    timelineAriaDisarmed: "Timeline ng dead man's switch, hindi aktibo",
    lastCheckIn: "Huling check-in",
    armedAt: "Na-activate noong",
    cadenceLabel: "Dalas",
    standingDownTitle: "Nakatayo",
    standingDownBody:
      "Ang pag-deactivate ay humihinto sa dead man's switch. Nananatiling nakatatak ang vault, ngunit hindi na ito maglalabas sa iyong mga benepisyaryo sa isang napalampas na check-in.",
    disarmTheSwitch: "I-deactivate ang switch",
    armTitle: "I-activate ang switch",
    armBody:
      "Piliin kung gaano katagal maghihintay ang vault para sa iyong susunod na check-in. Kung mapalampas mo ito, maglalabas ang vault sa iyong mga benepisyaryo.",
    cadenceError:
      "Pumili ng dalas ng check-in na mas malaki sa zero bago i-activate ang switch.",
    errorEyebrow: "Hindi ma-access ang switch",
    errorBody: "Hindi mabasa ang estado ng switch. Pakisubukang muli.",
    cadence24h: "24 oras",
    cadence7d: "7 araw",
    cadence30d: "30 araw",
  },
  audit: {
    eyebrow: "Mga Audit Log",
    title: "Mga Audit Log",
    ledger: "Ledger ng mga Kaganapan",
    count: "{count} kaganapan ang nakatatak",
    timestamp: "Timestamp",
    event: "Kaganapan",
    description: "Paglalarawan",
    tableAria: "Audit log ng vault",
    errorEyebrow: "Hindi ma-access ang ledger",
    errorBody: "Hindi mabasa ang audit ledger. Pakisubukang muli.",
    emptyTitle: "Wala pang kaganapan",
    emptyBody:
      "Bawat aksyon na ginawa laban sa vault ay itatatak dito, sa pagkakasunud-sunod, habang nangyayari ito.",
    footer:
      "Bawat entry ay nakatatak sa ledger. Ang mga entry ay hindi maaaring i-edit o alisin.",
  },
  settings: {
    eyebrow: "Mga Setting",
    title: "Configuration ng Vault",
    subtitle:
      "Panatilihin ang configuration na namamahala sa iyong pamana — ang estado ng pag-activate/pag-deactivate ng Switch, ang dalas ng check-in nito, at ang mga benepisyaryo kung saan ito nakatatak.",
    switchTitle: "Ang Switch",
    switchDesc:
      "I-activate o i-deactivate ang vault at itakda kung gaano kadalas ito dapat i-verify.",
    beneficiariesTitle: "Mga Benepisyaryo",
    beneficiariesDesc:
      "I-edit ang mga tao at layunin kung saan nakatatak ang iyong pamana.",
    cadence: "Dalas · {value}",
    daily: "Araw-araw",
    weekly: "Lingguhan",
    monthly: "Buwanan",
    yearly: "Taunan",
    h24: "24 oras",
    h7d: "7 araw",
    h30d: "30 araw",
    h365d: "365 araw",
    emptyBeneficiaries: "Wala pang na-configure na benepisyaryo",
    editBeneficiary: "I-edit ang benepisyaryo",
    editBeneficiaryDesc:
      "I-update ang pangalan, bahagi ng alokasyon, at address ng wallet ng benepisyaryong ito.",
    removeBeneficiary: "Alisin ang benepisyaryo",
    removeBeneficiaryDesc:
      "Alisin si {name} sa vault? Hindi ito maaaring i-undo.",
    toast: {
      armed: "Na-activate ang Switch",
      armedDesc: "Ang dalas ng check-in ay itinakda sa {cadence}.",
      armError: "Hindi ma-activate ang Switch",
      armErrorDesc: "Hindi ma-activate ang vault. Pakisubukang muli.",
      disarmed: "Na-deactivate ang Switch",
      disarmedDesc: "Hindi na aktibo ang vault.",
      disarmError: "Hindi ma-deactivate ang Switch",
      disarmErrorDesc: "Hindi ma-deactivate ang vault. Pakisubukang muli.",
      beneficiaryUpdated: "Na-update ang benepisyaryo",
      beneficiaryUpdatedDesc: "Na-save ang configuration ng benepisyaryo.",
      updateError: "Hindi ma-update ang benepisyaryo",
      updateErrorDesc: "Hindi na-save ang mga pagbabago. Pakisubukang muli.",
      beneficiaryRemoved: "Naalis ang benepisyaryo",
      beneficiaryRemovedDesc: "Naalis ang benepisyaryo sa vault.",
      removeError: "Hindi maalis ang benepisyaryo",
      removeErrorDesc: "Hindi maalis ang benepisyaryo. Pakisubukang muli.",
    },
  },
};
