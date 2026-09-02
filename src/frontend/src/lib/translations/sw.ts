import type { Translations } from "@/lib/translations/en";

/** Swahili (sw). Falls back to English for any key not covered here. */
export const sw: Partial<Translations> = {
  meta: {
    title: "Sovereign Legacy — Hazina",
    description:
      "Sovereign Legacy — Hazina. Hazina yako. Imefungwa hadi isipokuwa hivyo.",
  },
  common: {
    cancel: "Ghairi",
    saveChanges: "Hifadhi mabadiliko",
    edit: "Hariri",
    remove: "Ondoa",
    name: "Jina",
    optional: "Si lazima",
    addBeneficiary: "Ongeza mnufaika",
    allocationShare: "Sehemu ya mgao (%)",
    walletAddress: "Anwani ya pochi",
    checkInCadence: "Muda wa kuingia",
    selectCadence: "Chagua muda",
    armed: "Imewashwa",
    disarmed: "Imezimwa",
    arming: "Inawasha…",
    disarming: "Inazima…",
    saving: "Inahifadhi…",
    removing: "Inaondoa…",
    arm: "Washa",
    disarm: "Zima",
  },
  nav: {
    dashboard: "Dashibodi",
    beneficiaries: "Wanufaika",
    legacyAssets: "Urithi na Mali",
    theSwitch: "Swichi",
    auditLogs: "Kumbukumbu za Ukaguzi",
    settings: "Mipangilio",
  },
  header: {
    home: "Nyumbani kwa Sovereign Legacy",
    networkBadge: "Mtandao · Utambulisho",
    mobileMenu: "Fungua menyu ya urambazaji",
    mobilePrimary: "Urambazaji mkuu wa simu",
  },
  footer: {
    copyright: "© {year}. Sovereign Legacy — Hazina. Haki zote zimehifadhiwa.",
    tagline: "Imefungwa hadi isipokuwa hivyo",
  },
  loading: {
    openingVault: "Inafungua hazina…",
  },
  language: {
    label: "Lugha",
  },
  landing: {
    eyebrow: "Urithi wenye enzi binafsi",
    headline1: "Hazina yako.",
    headline2: "Imefungwa hadi wakati utakapofika.",
    login: "Ingia kwa kutumia Internet Identity",
    subhead:
      "Kifaa cha kidijitali cha kudhibiti urithi kwa ajili ya sarafu za kripto, kilichojengwa moja kwa moja kwenye Internet Computer — hakuna mchakato wa mahakama wa urithi, hakuna ucheleweshaji, hakuna mtu anayeangalia isipokuwa mnyororo wenyewe.",
    vaultDoorAlt:
      "Mlango wa hazina ya benki uliochakaa wa shaba na chuma, umefungwa, na nembo ya kitanzi kisicho na mwisho cha Internet Computer iking'aa hafifu katikati yake.",
    introduction: {
      eyebrow: "Utangulizi",
      heading: "Swichi ya Mtu Aliyekufa — Iliyozaliwa katika Enzi ya Mvuke",
      p1: "Katika miongo ya mwisho ya karne ya kumi na tisa, aina mpya ya mashine ilikuwa ikibadilisha ustaarabu. Tramu za umeme sasa zilipitia miji iliyojaa watu, na lifti ziliinua abiria hadi majengo ya urefu usio na kifani. Zilikuwa maajabu — na zilikuwa hatari.",
      p2: "Tatizo lilikuwa rahisi na la kutisha: nini kinatokea wakati mtu anayesimamia hawezi tena kusimamia? Dereva wa tramu angeweza kupata mshtuko wa moyo akiwa kwenye usukani. Opereta wa lifti angeweza kupoteza fahamu katikati ya safari. Na mashine, isiyojali hatima ya opereta wake, ingeendelea tu — hadi igonge kitu kinachoisimamisha.",
      p3: "Mhandisi wa Kimarekani Frank J. Sprague ndiye, mwaka 1888, aliyewasha umeme kwenye njia za tramu za Richmond, Virginia — reli ya kwanza ya umeme ya mijini iliyofanikiwa nchini Marekani. Ubunifu wake haukusimama kwenye injini. Sprague alielewa kwamba gari linalosafirisha abiria kwa kasi lilihitaji njia ya kujisimamisha ikiwa opereta angepoteza uwezo.",
      p4: "Waliita swichi ya mtu aliyekufa. Shika mpini kuendelea kusonga. Uiachie — iwe kwa kukengeushwa, ugonjwa, au kifo — na mashine inajisimamisha yenyewe. Jina halikuchaguliwa kwa ajili ya drama. Lilichaguliwa kwa usahihi. Swichi ilikuwa inawashwa na kukosekana kwa mkono ulio hai.",
      p5: "Wazo lilienea haraka. Metro za New York, London, na Tokyo zililikubali. Vituo vya nishati ya nyuklia viliijenga kwenye vijiti vyake vya udhibiti. Ndege za kibiashara ziliipachika kwenye marubani wake wa kiotomatiki. Popote ambapo mashine ilibeba maisha, swichi ya mtu aliyekufa ilifuata — kimya, kwa subira, ikingoja.",
      h3a: "Basi swichi ya mtu aliyekufa inafanya kazi vipi katika nyakati hizi?",
      p6: "Umefanya kazi kwa bidii. Umejilimbikizia mali za crypto — ICP, Bitcoin, Ethereum, sarafu thabiti. Ziko kwenye pochi na canister, zikilindwa na funguo za kibinafsi ambazo wewe pekee unazo. Na kama dereva wa tramu anayeshika mpini, uwepo wako hai na wenye shughuli kwenye mtandao ndio unaofunga mzunguko.",
      p7: "Hivi ndivyo Sovereign Legacy inavyotumia kanuni hiyo hiyo. Unaweka mali kwenye hazina salama ya canister kwenye mnyororo. Unateua mnufaika mmoja au zaidi na kuweka kipindi cha kutokuwa na shughuli kwenye mtandao. Muda wote unapoingia mara kwa mara, swichi inabaki imefungwa. Wakati shughuli hiyo inaposimama, Sovereign Legacy inakutumia arifa. Usipojibu, uhamisho unatekelezwa kiotomatiki, ukihamisha mali zako kwa wanufaika uliochagua bila mawakili, mahakama, au ucheleweshaji.",
      h3b: "Unataka kubinafsisha matakwa yako?",
      p8: "Ikiwa ungependa zaidi ya mpokeaji mmoja — mwenzi, watoto, rafiki wa kuaminika, shughuli ya hisani — Sovereign Legacy inakuruhusu kugawanya mali zako kwa asilimia. Wewe unaweka sehemu. Wanufaika wako wanapokea hasa kile ulichokusudia.",
    },
    advantages: {
      eyebrow: "Kwa nini inafanya kazi",
      heading: "Faida Zimejengwa Katika Kila Hatua",
      card1: {
        title:
          "Hakuna mawakili. Hakuna urithi wa kisheria. Hakuna ucheleweshaji.",
        body: "Canister inatekeleza maagizo yako wakati swichi ya mtu aliyekufa inapowashwa. Hakuna taasisi inayosimama kati ya matakwa yako na watu unaowapenda.",
      },
      card2: {
        title: "Wewe unabaki kwenye udhibiti.",
        body: "Badilisha wanufaika, rekebisha asilimia, au sasisha ujumbe wako wakati wowote. Kila kitu kinasasishwa papo hapo, kwenye mnyororo.",
      },
      card3: {
        title: "Inafanya kazi unapolala.",
        body: "Ikiwa maisha yanaendelea, Sovereign Legacy inabaki kimya. Isipoendelea, kila kitu kinasonga mbele hasa kama ulivyopanga.",
      },
      card4: {
        title: "Ufikiaji wa kimataifa.",
        body: "Wanufaika wanaweza kuwa popote duniani. Sovereign Legacy inazungumza lugha nyingi na inashughulikia maelezo ili usilazimike wewe.",
      },
      card5: {
        title: "Data yako inabaki yako.",
        body: "Hazina yako ni canister kwenye Internet Computer, inayolindwa na Internet Identity yako. Hakuna mtu wa tatu — ikiwa ni pamoja na Sovereign Legacy yenyewe — anayeweza kufikia yaliyomo.",
      },
    },
    faq: {
      eyebrow: "Maswali",
      heading: "Maswali Yanayoulizwa Mara kwa Mara",
      q1: {
        q: "Sovereign Legacy inasaidia lugha gani?",
        a: "Programu inasaidia lugha 22, ikiwa ni pamoja na lugha za kulia-kushoto kama Kiarabu, Kiajemi, na Kiurdu, ili wanufaika popote duniani waweze kuelewa taarifa ya kutolewa kwa lugha yao wenyewe.",
      },
      q2: {
        q: "Hazina yangu iko salama kiasi gani?",
        a: "Hazina yako ni canister kwenye Internet Computer, inayolindwa na Internet Identity yako. Ni kanuni yako iliyothibitishwa pekee inayoweza kuona au kusimamia yaliyomo.",
      },
      q3: {
        q: "Je, ningeweza kupoteza hazina yangu?",
        a: "Muda wote unapobaki na ufikiaji wa Internet Identity yako, hazina yako inabaki chini ya udhibiti wako. Hatari kuu ni kupoteza hati zako za Internet Identity, ndiyo maana kuweka nakala salama ya njia yako ya kurejesha ni muhimu.",
      },
      q4: {
        q: "Mali zinagawanywa vipi kati ya wanufaika?",
        a: "Unampa kila mnufaika sehemu ya asilimia. Sehemu zinaweza kurekebishwa wakati wowote kabla ya kutolewa, na jumla iliyogawiwa kwa wanufaika wote haipaswi kuzidi 100%.",
      },
      q5: {
        q: "Ninawezaje kuweka upya kipima muda cha kutokuwa na shughuli kwenye mtandao?",
        a: "Ingia tu kwa Internet Identity yako. Kuingia kozote kuthibitishwa kunaweka upya saa ya kutokuwa na shughuli na kuweka swichi ya mtu aliyekufa imewashwa.",
      },
      q6: {
        q: "Ninawezaje kuongeza mnufaika?",
        a: "Kutoka kwenye dashibodi yako, fungua paneli ya Wanufaika na ongeza jina, maelezo ya mawasiliano, na asilimia ya mgao.",
      },
      q7: {
        q: "Je, ninaweza kubadilisha wanufaika wangu baada ya usanidi?",
        a: "Ndiyo. Wanufaika, mgao, na ujumbe wa kibinafsi wote wanaweza kusasishwa wakati wowote — mabadiliko yanaanza kutumika mara moja, kwenye mnyororo.",
      },
      q8: {
        q: "Nani anaweza kuona wanufaika wangu?",
        a: "Wewe pekee, unapothibitishwa kama mmiliki wa hazina.",
      },
    },
    terms: {
      eyebrow: "Masharti",
      heading: "Masharti na Vigezo",
      card1: {
        title: "1. Muhtasari",
        body: "ICP Sovereign Legacy ni jukwaa la urithi na swichi ya mtu aliyekufa lililogatuliwa, likiwa kwenye mnyororo kabisa, lililojengwa kwenye Internet Computer Protocol (ICP). Kwa kutumia huduma hii, unakubali masharti haya.",
      },
      card2: {
        title: "2. Hakuna Dhima",
        body: "Watengenezaji hawawajibiki kwa upotevu wowote wa mali unaotokana na usanidi usio sahihi, hati za Internet Identity zilizopotea, hali za mtandao wa blockchain, au sababu nyingine yoyote. Tumia huduma hii kwa hatari yako mwenyewe.",
      },
      card3: {
        title: "3. Utekelezaji wa Kujitegemea",
        body: "Usambazaji wa mali unatekelezwa kiotomatiki na mantiki ya mkataba mahiri kwenye mnyororo wakati swichi yako ya mtu aliyekufa inapowashwa. Hakuna uingiliaji wa kibinadamu unaohitajika au unaowezekana mara tu inapowashwa.",
      },
      card4: {
        title: "4. Faragha",
        body: "Orodha yako ya wanufaika inahifadhiwa kwenye mnyororo na inapatikana tu kwa kanuni yako ya Internet Identity iliyothibitishwa. Hakuna mtu wa tatu anayeweza kuona data yako.",
      },
      card5: {
        title: "5. Ada",
        body: "Huduma hii inatolewa kama ilivyoelezwa ndani ya programu. Ada zozote zinazotumika kwa hatua mahususi zinaonyeshwa wazi kwenye programu kabla ya kuthibitisha hatua hiyo — hakuna ada zilizofichwa au zinazorudiwa.",
      },
      card6: {
        title: "6. Sifa",
        body: "Lazima uwe na angalau miaka 18 (au umri wa kukomaa katika eneo lako la mamlaka) na uwe na uwezo wa kisheria wa kuingia masharti haya ili kutumia huduma hii.",
      },
      card7: {
        title: "7. Hakuna Dhamana",
        body: 'Huduma hii inatolewa "kama ilivyo" na "kama inavyopatikana," bila dhamana za aina yoyote, ziwe wazi au zisizo wazi, ikiwa ni pamoja na dhamana yoyote ya uendeshaji usioingiliwa au usio na makosa.',
      },
      card8: {
        title: "8. Kukubali Hatari",
        body: "Sarafu za kidijitali na teknolojia ya blockchain hubeba hatari za asili, ikiwa ni pamoja na mabadiliko ya bei, msongamano wa mtandao, udhaifu wa mikataba mahiri, na mabadiliko ya itifaki za msingi. Kwa kutumia huduma hii, unakubali hatari hizi.",
      },
      card9: {
        title: "9. Kusitishwa",
        body: "Ufikiaji wa huduma hii unaweza kusitishwa au kukomeshwa kwa ukiukaji wa masharti haya au kwa tabia ambayo Sovereign Legacy inaamua, kwa hiari yake, kuwa hatari kwa watumiaji wengine au kwa huduma yenyewe.",
      },
      card10: {
        title: "10. Marekebisho ya Masharti Haya",
        body: "Masharti haya yanaweza kusasishwa mara kwa mara. Mabadiliko makubwa yatawasilishwa ndani ya programu, na kuendelea kutumia huduma baada ya mabadiliko hayo kunajumuisha kukubali masharti yaliyosasishwa.",
      },
    },
  },
  dashboard: {
    eyebrow: "Dashibodi",
    title: "Hazina",
    balance: "Salio la Hazina",
    assetsHeld: "{count} mali inashikiliwa",
    noAssets: "Hakuna mali inayoshikiliwa bado",
    beneficiaries: "Wanufaika",
    named: "wametajwa",
    sealed: "{count} mnufaika amefungwa",
    none: "Hakuna wanufaika bado",
    allocation: "Mgao wa Wanufaika",
    allocationNone: "Hakuna mgao bado. Ongeza mnufaika kuanza.",
    allocationAria: "Sehemu za mgao wa wanufaika",
    switch: "Swichi",
    lastVerified: "Imethibitishwa mwisho · {time}",
    notVerified: "Bado haijathibitishwa",
  },
  beneficiaries: {
    eyebrow: "Wanufaika",
    title: "Wanufaika",
    subtitle:
      "Watu na shughuli ambazo urithi wako umefungwa kwa ajili yao. Mgao, mpangilio, na masharti huishi hapa.",
    allocation: "Mgao",
    count: "{count} mnufaika",
    noAllocations: "Hakuna mgao bado. Ongeza mnufaika kuanza.",
    allocationAria: "Sehemu za mgao wa wanufaika",
    manage: "Simamia",
    manageBody:
      "Ongeza mnufaika na ugawie sehemu yake ya hazina. Sehemu zinaweza kuhaririwa au kufutwa wakati wowote.",
    loadError: "Haikuweza kupakia wanufaika. Tafadhali jaribu tena.",
    emptyTitle: "Hakuna wanufaika bado",
    emptyBody:
      "Urithi wako haujagawiwa. Ongeza mnufaika wako wa kwanza kufunga hazina kwa mtu.",
    noWallet: "Hakuna anwani ya pochi",
    editAria: "Hariri {name}",
    removeAria: "Ondoa {name}",
    modal: {
      editTitle: "Hariri mnufaika",
      addTitle: "Ongeza mnufaika",
      editDesc: "Sasisha jina, sehemu, au anwani ya pochi ya mnufaika huyu.",
      addDesc: "Gawia jina na sehemu ya mgao kwa mnufaika mpya.",
    },
    namePlaceholder: "mf. Elena Marchetti",
    sharePlaceholder: "mf. 40",
    errors: {
      nameRequired: "Ingiza jina la mnufaika huyu.",
      sharePositive: "Sehemu ya mgao lazima iwe kubwa kuliko sifuri.",
      invalidChecksum:
        "Kitambulisho hiki cha akaunti ya ICP kina jumla ya ukaguzi isiyo sahihi. Angalia anwani tena.",
      invalidWallet:
        "Ingiza anwani sahihi ya pochi ya ICP — kitambulisho cha akaunti cha herufi 64 au kanuni ya ICP.",
      totalExceedsEdit:
        "Hii itafanya jumla ya mgao kuwa {total}%, ikizidi kikomo cha 100%.",
      totalExceedsAdd:
        "Jumla ya mgao itakuwa {total}%, ikizidi kikomo cha 100%.",
      saveFailed: "Haikuweza kuhifadhi mabadiliko. Tafadhali jaribu tena.",
      addFailed: "Haikuweza kuongeza mnufaika. Tafadhali jaribu tena.",
    },
  },
  assets: {
    eyebrow: "Urithi na Mali",
    title: "Mali Zinazoshikiliwa",
    subtitle:
      "Kila kitu kinachoshikiliwa kwenye hazina — salio, mali, na maagizo yanayozisimamia.",
    assetsHeld: "Mali Zinazoshikiliwa",
    beneficiaries: "Wanufaika",
    allocationStatus: "Hali ya Mgao",
    sealed: "Imefungwa",
    unallocated: "Haijagawiwa",
    beneficiaryFallback: "Mnufaika #{id}",
    errorEyebrow: "Hazina haipatikani",
    errorBody: "Hatukuweza kusoma mali zinazoshikiliwa. Tafadhali jaribu tena.",
    emptyEyebrow: "Hakuna mali zinazoshikiliwa",
    emptyBody:
      "Hazina kwa sasa haina mali za crypto. Mara mali zitakapoongezwa, salio zake na mgao kwa wanufaika zitaonekana hapa.",
    allocationLabel: "Mgao wa Wanufaika",
  },
  switch: {
    eyebrow: "Swichi",
    title: "Swichi",
    subtitle:
      "Udhibiti mmoja unaokabidhi hazina. Imewashwa, imethibitishwa, na ya makusudi.",
    active: "Inatumika · Swichi ya mtu aliyekufa",
    standingDown: "Imesimama",
    armed: "IMEWASHWA",
    disarmed: "IMEZIMWA",
    checkIn: "Bado niko hapa",
    arm: "Washa swichi",
    disarm: "Zima",
    cadence: "Muda · {duration}",
    releaseIn: "Tolewa katika {duration}",
    timelineAriaArmed:
      "Mpangilio wa swichi ya mtu aliyekufa, {percent}% ya muda umepita",
    timelineAriaDisarmed: "Mpangilio wa swichi ya mtu aliyekufa, imezimwa",
    lastCheckIn: "Kuingia kwa mwisho",
    armedAt: "Imewashwa saa",
    cadenceLabel: "Muda",
    standingDownTitle: "Imesimama",
    standingDownBody:
      "Kuzima kunasimamisha swichi ya mtu aliyekufa. Hazina inabaki imefungwa, lakini haitatoa tena kwa wanufaika wako kwenye kuingia kukosekana.",
    disarmTheSwitch: "Zima swichi",
    armTitle: "Washa swichi",
    armBody:
      "Chagua hazina inasubiri kwa muda gani kuingia kwako kwa pili. Ukikosa, hazina inatoa kwa wanufaika wako.",
    cadenceError:
      "Chagua muda wa kuingia mkubwa kuliko sifuri kabla ya kuwasha swichi.",
    errorEyebrow: "Swichi haipatikani",
    errorBody: "Hatukuweza kusoma hali ya swichi. Tafadhali jaribu tena.",
    cadence24h: "Saa 24",
    cadence7d: "Siku 7",
    cadence30d: "Siku 30",
  },
  audit: {
    eyebrow: "Kumbukumbu za Ukaguzi",
    title: "Kumbukumbu za Ukaguzi",
    ledger: "Rejesta ya Matukio",
    count: "{count} tukio limefungwa",
    timestamp: "Muhuri wa wakati",
    event: "Tukio",
    description: "Maelezo",
    tableAria: "Kumbukumbu ya ukaguzi wa hazina",
    errorEyebrow: "Rejesta haipatikani",
    errorBody:
      "Hatukuweza kusoma kumbukumbu ya ukaguzi. Tafadhali jaribu tena.",
    emptyTitle: "Hakuna matukio bado",
    emptyBody:
      "Kila hatua inayochukuliwa dhidi ya hazina itafungwa hapa, kwa mpangilio, inapotokea.",
    footer:
      "Kila ingizo limefungwa kwenye rejesta. Ingozi haziwezi kuhaririwa au kuondolewa.",
  },
  settings: {
    eyebrow: "Mipangilio",
    title: "Usanidi wa Hazina",
    subtitle:
      "Hifadhi usanidi unaosimamia urithi wako — hali ya kuwasha/kuzima ya swichi, muda wake wa kuingia, na wanufaika ambao imefungwa kwa ajili yao.",
    switchTitle: "Swichi",
    switchDesc:
      "Washa au zima hazina na uweke mara ngapi inapaswa kuthibitishwa.",
    beneficiariesTitle: "Wanufaika",
    beneficiariesDesc:
      "Hariri watu na shughuli ambazo urithi wako umefungwa kwa ajili yao.",
    cadence: "Muda · {value}",
    daily: "Kila siku",
    weekly: "Kila wiki",
    monthly: "Kila mwezi",
    yearly: "Kila mwaka",
    h24: "Saa 24",
    h7d: "Siku 7",
    h30d: "Siku 30",
    h365d: "Siku 365",
    emptyBeneficiaries: "Hakuna wanufaika waliosanidiwa bado",
    editBeneficiary: "Hariri mnufaika",
    editBeneficiaryDesc:
      "Sasisha jina, sehemu ya mgao, na anwani ya pochi ya mnufaika huyu.",
    removeBeneficiary: "Ondoa mnufaika",
    removeBeneficiaryDesc:
      "Ondoa {name} kwenye hazina? Hili haliwezi kutenduliwa.",
    toast: {
      armed: "Swichi imewashwa",
      armedDesc: "Muda wa kuingia umewekwa kuwa {cadence}.",
      armError: "Haikuweza kuwasha swichi",
      armErrorDesc: "Hazina haikuweza kuwashwa. Tafadhali jaribu tena.",
      disarmed: "Swichi imezimwa",
      disarmedDesc: "Hazina haiwashwi tena.",
      disarmError: "Haikuweza kuzima swichi",
      disarmErrorDesc: "Hazina haikuweza kuzimwa. Tafadhali jaribu tena.",
      beneficiaryUpdated: "Mnufaika amesasishwa",
      beneficiaryUpdatedDesc: "Usanidi wa mnufaika umehifadhiwa.",
      updateError: "Haikuweza kusasisha mnufaika",
      updateErrorDesc: "Mabadiliko hayakuhifadhiwa. Tafadhali jaribu tena.",
      beneficiaryRemoved: "Mnufaika ameondolewa",
      beneficiaryRemovedDesc: "Mnufaika ameondolewa kwenye hazina.",
      removeError: "Haikuweza kuondoa mnufaika",
      removeErrorDesc: "Mnufaika haukuweza kuondolewa. Tafadhali jaribu tena.",
    },
  },
};
