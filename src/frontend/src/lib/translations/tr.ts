import type { Translations } from "@/lib/translations/en";

/** Turkish (tr). Falls back to English for any key not covered here. */
export const tr: Partial<Translations> = {
  meta: {
    title: "Sovereign Legacy — Kasa",
    description:
      "Sovereign Legacy — Kasa. Sizin kasanız. Artık mühürlü olmayana kadar mühürlü.",
  },
  common: {
    cancel: "İptal",
    saveChanges: "Değişiklikleri kaydet",
    edit: "Düzenle",
    remove: "Kaldır",
    name: "Ad",
    optional: "İsteğe bağlı",
    addBeneficiary: "Yararlanıcı ekle",
    allocationShare: "Tahsis payı (%)",
    walletAddress: "Cüzdan adresi",
    checkInCadence: "Kontrol aralığı",
    selectCadence: "Aralık seç",
    armed: "Etkin",
    disarmed: "Devre dışı",
    arming: "Etkinleştiriliyor…",
    disarming: "Devre dışı bırakılıyor…",
    saving: "Kaydediliyor…",
    removing: "Kaldırılıyor…",
    arm: "Etkinleştir",
    disarm: "Devre dışı bırak",
  },
  nav: {
    dashboard: "Panel",
    beneficiaries: "Yararlanıcılar",
    legacyAssets: "Miras ve Varlıklar",
    theSwitch: "Anahtar",
    auditLogs: "Denetim Günlükleri",
    settings: "Ayarlar",
  },
  header: {
    home: "Sovereign Legacy ana sayfası",
    networkBadge: "Ağ · Kimlik",
    mobileMenu: "Gezinme menüsünü aç",
    mobilePrimary: "Mobil ana gezinme",
  },
  footer: {
    copyright: "© {year}. Sovereign Legacy — Kasa. Tüm hakları saklıdır.",
    tagline: "Artık mühürlü olmayana kadar mühürlü",
  },
  loading: {
    openingVault: "Kasa açılıyor…",
  },
  language: {
    label: "Dil",
  },
  landing: {
    eyebrow: "Kendi kendine egemen miras",
    headline1: "Kasanız.",
    headline2: "Açılana kadar mühürlü.",
    login: "Internet Identity ile giriş yapın",
    subhead:
      "Internet Computer üzerinde yerel olarak inşa edilmiş, kripto varlıklar için dijital bir ölü adam anahtarı — vasiyetnamesiz, gecikmesiz, zincirin kendisinden başka kimsenin izlemediği.",
    vaultDoorAlt:
      "Yıpranmış pirinç ve çelikten bir banka kasa kapısı, kapalı, ortasında Internet Computer'ın sonsuzluk döngüsü amblemi hafifçe parlıyor.",
    introduction: {
      eyebrow: "Giriş",
      heading: "Ölü Adam Anahtarı — Buhar Çağında Doğdu",
      p1: "On dokuzuncu yüzyılın son on yıllarında, yeni bir makine türü uygarlığı yeniden şekillendiriyordu. Elektrikli tramvaylar artık kalabalık şehirlerde yol alıyor, asansörler yolcuları eşi görülmemiş yükseklikteki binalara taşıyordu. Bunlar harikaydı — ve tehlikeliydiler.",
      p2: "Sorun basit ve ürkütücüydü: Kontrolü elinde tutan kişi artık kontrolü elinde tutamadığında ne olur? Bir tramvay sürücüsü direksiyonda kalp krizi geçirebilirdi. Bir asansör operatörü yolculuğun ortasında bilincini kaybedebilirdi. Ve makine, operatörünün kaderine kayıtsız, sadece devam ederdi — onu durduran bir şeye çarpana kadar.",
      p3: "1888'de Amerikalı mühendis Frank J. Sprague, Virginia'daki Richmond tramvay hatlarını elektriklendirdi — Amerika Birleşik Devletleri'ndeki ilk başarılı elektrikli kentsel demiryolu. Yeniliği motorla sınırlı kalmadı. Sprague, yüksek hızda yolcu taşıyan bir aracın, operatörün aciz kalması durumunda kendini durdurabilmesi gerektiğini anladı.",
      p4: "Ona ölü adam anahtarı dediler. Hareket etmeye devam etmek için kolu tutun. Bırakın — ister dikkat dağınıklığından, ister hastalıktan, ister ölümden — ve makine kendini durdurur. Bu isim dram için seçilmedi. Hassasiyet için seçildi. Anahtar, yaşayan elin yokluğuyla etkinleşiyordu.",
      p5: "Fikir hızla yayıldı. New York, Londra ve Tokyo'daki metrolar bunu benimsedi. Nükleer santraller bunu kontrol çubuklarına yerleştirdi. Ticari uçaklar bunu otopilotlarına gömdü. Bir makinenin hayat taşıdığı her yerde, ölü adam anahtarı onu takip etti — sessiz, sabırlı, bekleyen.",
      h3a: "Ölü Adam Anahtarı Günümüzde Nasıl Çalışır?",
      p6: "Çok çalıştınız. Kripto varlıklar biriktirdiniz — ICP, Bitcoin, Ethereum, stablecoin. Bunlar cüzdanlarda ve canister'larda, yalnızca sizin sahip olduğunuz özel anahtarlarla korunuyor. Ve kolu kavrayan tramvay sürücüsü gibi, ağdaki yalnızca sizin canlı, aktif varlığınız devreyi kapalı tutar.",
      p7: "Sovereign Legacy aynı ilkeyi şöyle uygular. Varlıklarınızı güvenli bir on-chain canister kasasına yatırırsınız. Bir veya daha fazla yararlanıcı belirlersiniz ve bir ağ etkinliksizlik süresi ayarlarsınız. Periyodik olarak giriş yaptığınız sürece anahtar kapalı kalır. Bu etkinlik durduğu anda Sovereign Legacy size uyarılar gönderir. Yanıt vermezseniz, avukatlar, mahkemeler veya gecikmeler olmadan varlıklarınız seçtiğiniz yararlanıcılara otomatik olarak aktarılır.",
      h3b: "İsteklerinizi Kişiselleştirmek İster misiniz?",
      p8: "Birden fazla alıcı istiyorsanız — bir eş, çocuklar, güvenilir bir arkadaş, hayırsever bir amaç — Sovereign Legacy varlıklarınızı yüzdeye göre bölmenize olanak tanır. Payları siz belirlersiniz. Yararlanıcılarınız tam olarak niyet ettiğinizi alır.",
    },
    advantages: {
      eyebrow: "Neden işe yarıyor",
      heading: "Avantajlar Her Adıma Yerleşiktir",
      card1: {
        title: "Avukat yok. Veraset yok. Gecikme yok.",
        body: "Ölü adam anahtarı tetiklendiği anda canister talimatlarınızı uygular. İstekleriniz ile sevdikleriniz arasında hiçbir kurum durmaz.",
      },
      card2: {
        title: "Kontrol sizde kalır.",
        body: "Yararlanıcıları değiştirin, yüzdeleri ayarlayın veya mesajınızı istediğiniz zaman güncelleyin. Her şey anında, on-chain güncellenir.",
      },
      card3: {
        title: "Siz uyurken çalışır.",
        body: "Hayat devam ederse Sovereign Legacy sessiz kalır. Devam etmezse, her şey tam olarak planladığınız gibi ilerler.",
      },
      card4: {
        title: "Küresel erişim.",
        body: "Yararlanıcılar dünyanın herhangi bir yerinde olabilir. Sovereign Legacy birden çok dil konuşur ve açıklamayı halleder, böylece sizin yapmanız gerekmez.",
      },
      card5: {
        title: "Verileriniz sizin kalır.",
        body: "Kasanız Internet Computer üzerinde bir canister'dır ve Internet Identity'nizle korunur. Sovereign Legacy'nin kendisi dahil hiçbir üçüncü taraf içeriğine erişemez.",
      },
    },
    faq: {
      eyebrow: "Sorular",
      heading: "Sık Sorulan Sorular",
      q1: {
        q: "Sovereign Legacy hangi dilleri destekliyor?",
        a: "Uygulama, Arapça, Farsça ve Urduca gibi sağdan sola diller dahil 22 dili destekler; böylece dünyanın her yerindeki yararlanıcılar bir serbest bırakma bildirimini kendi dillerinde anlayabilir.",
      },
      q2: {
        q: "Kasam ne kadar güvenli?",
        a: "Kasanız Internet Computer üzerinde bir canister'dır ve Internet Identity'nizle korunur. İçeriğini yalnızca kimliği doğrulanmış principal'ınız görüntüleyebilir veya yönetebilir.",
      },
      q3: {
        q: "Kasamı kaybedebilir miyim?",
        a: "Internet Identity'nize erişimi koruduğunuz sürece kasanız kontrolünüz altında kalır. Ana risk, Internet Identity kimlik bilgilerinizi kaybetmektir; bu yüzden kurtarma yönteminizin güvenli bir yedeğini tutmak önemlidir.",
      },
      q4: {
        q: "Varlıklar yararlanıcılar arasında nasıl bölünür?",
        a: "Her yararlanıcıya bir yüzde payı atarsınız. Paylar serbest bırakmadan önce her zaman ayarlanabilir ve tüm yararlanıcılara tahsis edilen toplam asla %100'ü aşmamalıdır.",
      },
      q5: {
        q: "Ağ etkinliksizlik zamanlayıcısını nasıl sıfırlarım?",
        a: "Internet Identity'nizle giriş yapmanız yeterlidir. Kimliği doğrulanmış herhangi bir kontrol, etkinliksizlik saatini sıfırlar ve ölü adam anahtarını etkin tutar.",
      },
      q6: {
        q: "Yararlanıcıyı nasıl eklerim?",
        a: "Panelinizden Yararlanıcılar panelini açın ve bir ad, iletişim bilgisi ve tahsis yüzdesi ekleyin.",
      },
      q7: {
        q: "Kurulumdan sonra yararlanıcılarımı değiştirebilir miyim?",
        a: "Evet. Yararlanıcılar, tahsisler ve kişisel mesajlar her zaman güncellenebilir — değişiklikler anında, on-chain geçerli olur.",
      },
      q8: {
        q: "Yararlanıcılarımı kim görebilir?",
        a: "Kasanın sahibi olarak kimliğiniz doğrulandığı sürece yalnızca siz.",
      },
    },
    terms: {
      eyebrow: "Koşullar",
      heading: "Şartlar ve Koşullar",
      card1: {
        title: "1. Genel Bakış",
        body: "ICP Sovereign Legacy, Internet Computer Protokolü (ICP) üzerine inşa edilmiş, merkeziyetsiz, tamamen on-chain bir miras ve ölü adam anahtarı platformudur. Bu hizmeti kullanarak bu şartları kabul etmiş olursunuz.",
      },
      card2: {
        title: "2. Sorumluluk Yok",
        body: "Geliştiriciler, hatalı yapılandırma, kaybolan Internet Identity kimlik bilgileri, blockchain ağ koşulları veya başka herhangi bir nedenden kaynaklanan varlık kaybından sorumlu değildir. Bu hizmeti kendi sorumluluğunuzda kullanın.",
      },
      card3: {
        title: "3. Otonom Yürütme",
        body: "Varlık dağıtımı, ölü adam anahtarınız tetiklendiğinde on-chain akıllı sözleşme mantığı tarafından otomatik olarak yürütülür. Tetiklendikten sonra insan müdahalesi gerekmez ve mümkün değildir.",
      },
      card4: {
        title: "4. Gizlilik",
        body: "Yararlanıcı listeniz on-chain olarak saklanır ve yalnızca kimliği doğrulanmış Internet Identity principal'ınız tarafından erişilebilir. Hiçbir üçüncü taraf verilerinizi göremez.",
      },
      card5: {
        title: "5. Ücretler",
        body: "Bu hizmet, uygulama içinde açıklandığı şekilde sağlanır. Belirli bir işleme uygulanan ücretler, o işlemi onaylamadan önce uygulamada açıkça gösterilir — gizli veya yinelenen ücret yoktur.",
      },
      card6: {
        title: "6. Uygunluk",
        body: "Bu hizmeti kullanmak için en az 18 yaşında (veya yargı bölgenizdeki reşit olma yaşı) olmalı ve bu şartlara girmek için yasal ehliyete sahip olmalısınız.",
      },
      card7: {
        title: "7. Garanti Yok",
        body: "Bu hizmet, açık veya zımni her türlü garanti olmaksızın «olduğu gibi» ve «mevcut olduğu gibi» sağlanır; kesintisiz veya hatasız çalışma garantisi dahildir.",
      },
      card8: {
        title: "8. Riskin Üstlenilmesi",
        body: "Kripto para ve blockchain teknolojisi; fiyat oynaklığı, ağ tıkanıklığı, akıllı sözleşme güvenlik açıkları ve temel protokollerdeki değişiklikler dahil olmak üzere doğal riskler taşır. Bu hizmeti kullanarak bu riskleri kabul edersiniz.",
      },
      card9: {
        title: "9. Fesih",
        body: "Bu şartların ihlali veya Sovereign Legacy'nin kendi takdirine göre diğer kullanıcılara ya da hizmetin kendisine zararlı olduğunu belirlediği davranışlar nedeniyle bu hizmete erişim askıya alınabilir veya sonlandırılabilir.",
      },
      card10: {
        title: "10. Bu Şartlarda Yapılan Değişiklikler",
        body: "Bu şartlar zaman zaman güncellenebilir. Önemli değişiklikler uygulama içinde sunulacaktır ve bu tür değişikliklerden sonra hizmeti kullanmaya devam etmek, güncellenmiş şartların kabulü anlamına gelir.",
      },
    },
  },
  dashboard: {
    eyebrow: "Panel",
    title: "Kasa",
    balance: "Kasa Bakiyesi",
    assetsHeld: "{count} varlık tutuluyor",
    noAssets: "Henüz tutulan varlık yok",
    beneficiaries: "Yararlanıcılar",
    named: "adlandırıldı",
    sealed: "{count} yararlanıcı mühürlendi",
    none: "Henüz yararlanıcı yok",
    allocation: "Yararlanıcı Tahsisi",
    allocationNone: "Henüz tahsis yok. Başlamak için bir yararlanıcı ekleyin.",
    allocationAria: "Yararlanıcı tahsis payları",
    allocated: "tahsis edildi",
    switch: "Anahtar",
    lastVerified: "Son doğrulama · {time}",
    notVerified: "Henüz doğrulanmadı",
  },
  beneficiaries: {
    eyebrow: "Yararlanıcılar",
    title: "Yararlanıcılar",
    subtitle:
      "Miranızın mühürlendiği kişiler ve amaçlar. Tahsis, sıra ve koşullar burada yaşar.",
    allocation: "Tahsis",
    count: "{count} yararlanıcı",
    noAllocations: "Henüz tahsis yok. Başlamak için bir yararlanıcı ekleyin.",
    allocationAria: "Yararlanıcı tahsis payları",
    manage: "Yönet",
    manageBody:
      "Bir yararlanıcı ekleyin ve kasadan payını atayın. Paylar her zaman düzenlenebilir veya iptal edilebilir.",
    loadError: "Yararlanıcılar yüklenemedi. Lütfen tekrar deneyin.",
    emptyTitle: "Henüz yararlanıcı yok",
    emptyBody:
      "Miranız atanmamış. Birisi için kasayı mühürlemek üzere ilk yararlanıcınızı ekleyin.",
    noWallet: "Cüzdan adresi yok",
    editAria: "{name} düzenle",
    removeAria: "{name} kaldır",
    modal: {
      editTitle: "Yararlanıcıyı düzenle",
      addTitle: "Yararlanıcı ekle",
      editDesc:
        "Bu yararlanıcının adını, payını veya cüzdan adresini güncelleyin.",
      addDesc: "Yeni bir yararlanıcıya ad ve tahsis payı atayın.",
    },
    namePlaceholder: "örn. Elena Marchetti",
    sharePlaceholder: "örn. 40",
    errors: {
      nameRequired: "Bu yararlanıcı için bir ad girin.",
      sharePositive: "Tahsis payı sıfırdan büyük olmalıdır.",
      invalidChecksum:
        "Bu ICP hesap tanımlayıcısının sağlama toplamı geçersiz. Adresi tekrar kontrol edin.",
      invalidWallet:
        "Geçerli bir ICP cüzdan adresi girin — 64 karakterli bir hesap tanımlayıcısı veya bir ICP principal.",
      totalExceedsEdit:
        "Bu, toplam tahsisi %{total}'a getirerek %100 sınırını aşar.",
      totalExceedsAdd: "Toplam tahsis %{total} olur ve %100 sınırını aşar.",
      saveFailed: "Değişiklikler kaydedilemedi. Lütfen tekrar deneyin.",
      addFailed: "Yararlanıcı eklenemedi. Lütfen tekrar deneyin.",
    },
  },
  assets: {
    eyebrow: "Miras ve Varlıklar",
    title: "Tutulan Varlıklar",
    subtitle:
      "Kasada tutulan her şey — bakiyeler, varlıklar ve onları yöneten talimatlar.",
    assetsHeld: "Tutulan Varlıklar",
    beneficiaries: "Yararlanıcılar",
    allocationStatus: "Tahsis Durumu",
    sealed: "Mühürlü",
    unallocated: "Tahsis edilmemiş",
    beneficiaryFallback: "Yararlanıcı #{id}",
    errorEyebrow: "Kasaya erişilemiyor",
    errorBody: "Tutulan varlıklar okunamadı. Lütfen tekrar deneyin.",
    emptyEyebrow: "Tutulan varlık yok",
    emptyBody:
      "Kasa şu anda kripto varlık tutmuyor. Varlıklar eklendiğinde bakiyeleri ve yararlanıcı tahsisleri burada görünecek.",
    allocationLabel: "Yararlanıcı Tahsisi",
  },
  switch: {
    eyebrow: "Anahtar",
    title: "Anahtar",
    subtitle: "Kasayı teslim eden tek kontrol. Etkin, doğrulanmış ve bilinçli.",
    active: "Etkin · Ölü adam anahtarı",
    standingDown: "Beklemede",
    armed: "ETKİN",
    disarmed: "DEVRE DIŞI",
    checkIn: "Hâlâ buradayım",
    arm: "Anahtarı etkinleştir",
    disarm: "Devre dışı bırak",
    cadence: "Aralık · {duration}",
    releaseIn: "{duration} içinde serbest bırakılacak",
    timelineAriaArmed:
      "Ölü adam anahtarı zaman çizelgesi, aralığın %{percent}'i geçti",
    timelineAriaDisarmed: "Ölü adam anahtarı zaman çizelgesi, devre dışı",
    lastCheckIn: "Son kontrol",
    armedAt: "Etkinleştirilme",
    cadenceLabel: "Aralık",
    standingDownTitle: "Beklemede",
    standingDownBody:
      "Devre dışı bırakmak ölü adam anahtarını durdurur. Kasa mühürlü kalır, ancak kaçırılan bir kontrolde artık yararlanıcılarınıza serbest bırakılmaz.",
    disarmTheSwitch: "Anahtarı devre dışı bırak",
    armTitle: "Anahtarı etkinleştir",
    armBody:
      "Kasanın bir sonraki kontrolünüzü ne kadar bekleyeceğini seçin. Kaçırırsanız, kasa yararlanıcılarınıza serbest bırakılır.",
    cadenceError:
      "Anahtarı etkinleştirmeden önce sıfırdan büyük bir kontrol aralığı seçin.",
    errorEyebrow: "Anahtara erişilemiyor",
    errorBody: "Anahtar durumu okunamadı. Lütfen tekrar deneyin.",
    cadence24h: "24 saat",
    cadence7d: "7 gün",
    cadence30d: "30 gün",
  },
  audit: {
    eyebrow: "Denetim Günlükleri",
    title: "Denetim Günlükleri",
    ledger: "Olay Defteri",
    count: "{count} olay mühürlendi",
    timestamp: "Zaman damgası",
    event: "Olay",
    description: "Açıklama",
    tableAria: "Kasa denetim günlüğü",
    errorEyebrow: "Deftere erişilemiyor",
    errorBody: "Denetim defteri okunamadı. Lütfen tekrar deneyin.",
    emptyTitle: "Henüz olay yok",
    emptyBody:
      "Kasaya karşı yapılan her işlem, gerçekleştikçe sırayla burada mühürlenecek.",
    footer:
      "Her kayıt defterde mühürlüdür. Kayıtlar düzenlenemez veya kaldırılamaz.",
  },
  settings: {
    eyebrow: "Ayarlar",
    title: "Kasa Yapılandırması",
    subtitle:
      "Miranızı yöneten yapılandırmayı koruyun — Anahtarın etkin/devre dışı durumu, kontrol aralığı ve mühürlendiği yararlanıcılar.",
    switchTitle: "Anahtar",
    switchDesc:
      "Kasayı etkinleştirin veya devre dışı bırakın ve ne sıklıkta doğrulanması gerektiğini ayarlayın.",
    beneficiariesTitle: "Yararlanıcılar",
    beneficiariesDesc:
      "Miranızın mühürlendiği kişileri ve amaçları düzenleyin.",
    cadence: "Aralık · {value}",
    daily: "Günlük",
    weekly: "Haftalık",
    monthly: "Aylık",
    yearly: "Yıllık",
    h24: "24 saat",
    h7d: "7 gün",
    h30d: "30 gün",
    h365d: "365 gün",
    emptyBeneficiaries: "Henüz yapılandırılmış yararlanıcı yok",
    editBeneficiary: "Yararlanıcıyı düzenle",
    editBeneficiaryDesc:
      "Bu yararlanıcının adını, tahsis payını ve cüzdan adresini güncelleyin.",
    removeBeneficiary: "Yararlanıcıyı kaldır",
    removeBeneficiaryDesc:
      "{name} kasadan kaldırılsın mı? Bu işlem geri alınamaz.",
    toast: {
      armed: "Anahtar etkinleştirildi",
      armedDesc: "Kontrol aralığı {cadence} olarak ayarlandı.",
      armError: "Anahtar etkinleştirilemedi",
      armErrorDesc: "Kasa etkinleştirilemedi. Lütfen tekrar deneyin.",
      disarmed: "Anahtar devre dışı bırakıldı",
      disarmedDesc: "Kasa artık etkin değil.",
      disarmError: "Anahtar devre dışı bırakılamadı",
      disarmErrorDesc: "Kasa devre dışı bırakılamadı. Lütfen tekrar deneyin.",
      beneficiaryUpdated: "Yararlanıcı güncellendi",
      beneficiaryUpdatedDesc: "Yararlanıcı yapılandırması kaydedildi.",
      updateError: "Yararlanıcı güncellenemedi",
      updateErrorDesc: "Değişiklikler kaydedilmedi. Lütfen tekrar deneyin.",
      beneficiaryRemoved: "Yararlanıcı kaldırıldı",
      beneficiaryRemovedDesc: "Yararlanıcı kasadan kaldırıldı.",
      removeError: "Yararlanıcı kaldırılamadı",
      removeErrorDesc: "Yararlanıcı kaldırılamadı. Lütfen tekrar deneyin.",
    },
  },
};
