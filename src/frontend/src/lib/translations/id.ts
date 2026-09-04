import type { Translations } from "@/lib/translations/en";

/** Indonesian (id). Falls back to English for any key not covered here. */
export const id: Partial<Translations> = {
  meta: {
    title: "Sovereign Legacy — Brankas",
    description:
      "Sovereign Legacy — Brankas. Brankas Anda. Tersegel sampai tidak lagi tersegel.",
  },
  common: {
    cancel: "Batal",
    saveChanges: "Simpan perubahan",
    edit: "Edit",
    remove: "Hapus",
    name: "Nama",
    optional: "Opsional",
    addBeneficiary: "Tambah penerima manfaat",
    allocationShare: "Bagian alokasi (%)",
    walletAddress: "Alamat dompet",
    checkInCadence: "Interval check-in",
    selectCadence: "Pilih interval",
    armed: "Aktif",
    disarmed: "Nonaktif",
    arming: "Mengaktifkan…",
    disarming: "Menonaktifkan…",
    saving: "Menyimpan…",
    removing: "Menghapus…",
    arm: "Aktifkan",
    disarm: "Nonaktifkan",
  },
  nav: {
    dashboard: "Dasbor",
    beneficiaries: "Penerima Manfaat",
    legacyAssets: "Warisan & Aset",
    theSwitch: "Saklar",
    auditLogs: "Log Audit",
    settings: "Pengaturan",
  },
  header: {
    home: "Beranda Sovereign Legacy",
    networkBadge: "Jaringan · Identitas",
    mobileMenu: "Buka menu navigasi",
    mobilePrimary: "Navigasi utama seluler",
  },
  footer: {
    copyright: "© {year}. Sovereign Legacy — Brankas. Semua hak dilindungi.",
    tagline: "Tersegel sampai tidak lagi tersegel",
  },
  loading: {
    openingVault: "Membuka brankas…",
  },
  language: {
    label: "Bahasa",
  },
  landing: {
    eyebrow: "Warisan yang berdaulat penuh",
    headline1: "Brankas Anda.",
    headline2: "Tersegel sampai saatnya tiba.",
    login: "Masuk dengan Internet Identity",
    subhead:
      "Saklar mati digital untuk aset kripto, dibangun secara native di Internet Computer — tanpa proses hukum warisan, tanpa penundaan, tanpa ada yang mengawasi selain rantai itu sendiri.",
    vaultDoorAlt:
      "Pintu brankas bank dari kuningan dan baja yang lapuk, tertutup, dengan lambang lingkaran tak hingga Internet Computer yang menyala redup di tengahnya.",
    introduction: {
      eyebrow: "Pendahuluan",
      heading: "Saklar Orang Mati — Lahir di Zaman Uap",
      p1: "Pada dekade-dekade terakhir abad kesembilan belas, jenis mesin baru sedang membentuk kembali peradaban. Trem listrik kini melintasi kota-kota yang padat, dan lift mengangkat penumpang ke gedung-gedung setinggi yang belum pernah ada. Itu adalah keajaiban — dan itu berbahaya.",
      p2: "Masalahnya sederhana dan menakutkan: apa yang terjadi ketika orang yang mengendalikan tidak lagi mengendalikan? Seorang pengemudi trem bisa terkena serangan jantung di kemudi. Seorang operator lift bisa kehilangan kesadaran di tengah perjalanan. Dan mesin itu, acuh tak acuh terhadap nasib operatornya, hanya terus berjalan — sampai menabrak sesuatu yang menghentikannya.",
      p3: "Adalah insinyur Amerika Frank J. Sprague yang, pada tahun 1888, mengaliri listrik jalur trem Richmond, Virginia — kereta api listrik perkotaan pertama yang sukses di Amerika Serikat. Inovasinya tidak berhenti pada motor. Sprague memahami bahwa kendaraan yang membawa penumpang dengan kecepatan tinggi perlu memiliki cara untuk berhenti sendiri jika operatornya menjadi tidak mampu.",
      p4: "Mereka menyebutnya saklar orang mati. Pegang gagangnya untuk terus bergerak. Lepaskan — entah karena gangguan, penyakit, atau kematian — dan mesin berhenti sendiri. Nama itu tidak dipilih untuk drama. Ia dipilih untuk ketepatan. Saklar diaktifkan oleh ketiadaan tangan yang hidup.",
      p5: "Ide itu menyebar dengan cepat. Kereta bawah tanah di New York, London, dan Tokyo mengadopsinya. Pembangkit listrik tenaga nuklir membangunnya ke dalam batang kendali mereka. Pesawat komersial menanamkannya ke dalam autopilot mereka. Di mana pun mesin membawa nyawa, saklar orang mati mengikutinya — diam, sabar, menunggu.",
      h3a: "Bagaimana Saklar Orang Mati Bekerja di Zaman Sekarang?",
      p6: "Anda telah bekerja keras. Anda telah mengumpulkan aset kripto — ICP, Bitcoin, Ethereum, stablecoin. Aset itu berada di dompet dan canister, diamankan oleh kunci privat yang hanya Anda miliki. Dan seperti pengemudi trem yang menggenggam gagang, hanya kehadiran Anda yang hidup dan aktif di jaringan yang menjaga sirkuit tetap tertutup.",
      p7: "Beginilah cara Sovereign Legacy menerapkan prinsip yang sama. Anda menyetor aset ke brankas canister on-chain yang aman. Anda menunjuk satu atau lebih penerima manfaat dan menetapkan periode ketidakaktifan jaringan. Selama Anda masuk secara berkala, saklar tetap tertutup. Begitu aktivitas itu berhenti, Sovereign Legacy mengirimkan peringatan kepada Anda. Jika Anda tidak merespons, transfer dieksekusi secara otomatis, memindahkan aset Anda ke penerima manfaat pilihan Anda tanpa pengacara, pengadilan, atau penundaan.",
      h3b: "Ingin Mempersonalisasi Keinginan Anda?",
      p8: "Jika Anda menginginkan lebih dari satu penerima — pasangan, anak-anak, teman tepercaya, tujuan amal — Sovereign Legacy memungkinkan Anda membagi aset berdasarkan persentase. Anda yang menentukan bagiannya. Penerima manfaat Anda menerima persis seperti yang Anda maksudkan.",
    },
    advantages: {
      eyebrow: "Mengapa berhasil",
      heading: "Keunggulan Tertanam di Setiap Langkah",
      card1: {
        title: "Tanpa pengacara. Tanpa probate. Tanpa penundaan.",
        body: "Canister mengeksekusi instruksi Anda begitu saklar orang mati terpicu. Tidak ada institusi yang berdiri di antara keinginan Anda dan orang-orang yang Anda cintai.",
      },
      card2: {
        title: "Anda tetap memegang kendali.",
        body: "Ubah penerima manfaat, sesuaikan persentase, atau perbarui pesan Anda kapan saja. Semuanya diperbarui secara instan, on-chain.",
      },
      card3: {
        title: "Bekerja saat Anda tidur.",
        body: "Jika hidup terus berjalan, Sovereign Legacy tetap diam. Jika tidak, semuanya berjalan persis seperti yang Anda rencanakan.",
      },
      card4: {
        title: "Jangkauan global.",
        body: "Penerima manfaat bisa berada di mana saja di dunia. Sovereign Legacy berbicara banyak bahasa dan menangani penjelasannya sehingga Anda tidak perlu melakukannya.",
      },
      card5: {
        title: "Data Anda tetap milik Anda.",
        body: "Brankas Anda adalah canister di Internet Computer, diamankan oleh Internet Identity Anda. Tidak ada pihak ketiga — termasuk Sovereign Legacy sendiri — yang memiliki akses ke isinya.",
      },
    },
    faq: {
      eyebrow: "Pertanyaan",
      heading: "Pertanyaan yang Sering Diajukan",
      q1: {
        q: "Bahasa apa saja yang didukung Sovereign Legacy?",
        a: "Aplikasi ini mendukung 22 bahasa, termasuk bahasa kanan-ke-kiri seperti Arab, Persia, dan Urdu, sehingga penerima manfaat di mana pun di dunia dapat memahami pemberitahuan pelepasan dalam bahasa mereka sendiri.",
      },
      q2: {
        q: "Seberapa aman brankas saya?",
        a: "Brankas Anda adalah canister di Internet Computer, diamankan oleh Internet Identity Anda. Hanya principal terautentikasi Anda yang dapat melihat atau mengelola isinya.",
      },
      q3: {
        q: "Bisakah saya kehilangan brankas saya?",
        a: "Selama Anda mempertahankan akses ke Internet Identity Anda, brankas Anda tetap berada di bawah kendali Anda. Risiko utamanya adalah kehilangan kredensial Internet Identity, itulah sebabnya menyimpan cadangan aman untuk metode pemulihan Anda itu penting.",
      },
      q4: {
        q: "Bagaimana aset dibagi di antara penerima manfaat?",
        a: "Anda menetapkan bagian persentase untuk setiap penerima manfaat. Bagian dapat disesuaikan kapan saja sebelum pelepasan, dan total yang dialokasikan ke semua penerima manfaat tidak boleh melebihi 100%.",
      },
      q5: {
        q: "Bagaimana cara mengatur ulang pengatur waktu ketidakaktifan jaringan?",
        a: "Cukup masuk dengan Internet Identity Anda. Setiap check-in terautentikasi mengatur ulang jam ketidakaktifan dan menjaga saklar orang mati tetap aktif.",
      },
      q6: {
        q: "Bagaimana cara menambah penerima manfaat?",
        a: "Dari dasbor Anda, buka panel Penerima Manfaat dan tambahkan nama, informasi kontak, dan persentase alokasi.",
      },
      q7: {
        q: "Bisakah saya mengubah penerima manfaat setelah pengaturan?",
        a: "Ya. Penerima manfaat, alokasi, dan pesan pribadi semuanya dapat diperbarui kapan saja — perubahan berlaku seketika, on-chain.",
      },
      q8: {
        q: "Siapa yang dapat melihat penerima manfaat saya?",
        a: "Hanya Anda, selama terautentikasi sebagai pemilik brankas.",
      },
    },
    terms: {
      eyebrow: "Ketentuan",
      heading: "Syarat & Ketentuan",
      card1: {
        title: "1. Ringkasan",
        body: "ICP Sovereign Legacy adalah platform warisan dan saklar orang mati yang terdesentralisasi, sepenuhnya on-chain, dibangun di atas Protokol Internet Computer (ICP). Dengan menggunakan layanan ini, Anda menyetujui ketentuan ini.",
      },
      card2: {
        title: "2. Tanpa Tanggung Jawab",
        body: "Para pengembang tidak bertanggung jawab atas kehilangan aset apa pun yang diakibatkan oleh konfigurasi yang salah, kredensial Internet Identity yang hilang, kondisi jaringan blockchain, atau penyebab lainnya. Gunakan layanan ini dengan risiko Anda sendiri.",
      },
      card3: {
        title: "3. Eksekusi Otonom",
        body: "Distribusi aset dieksekusi secara otomatis oleh logika kontrak pintar on-chain ketika saklar orang mati Anda terpicu. Tidak ada intervensi manusia yang diperlukan atau mungkin dilakukan setelah terpicu.",
      },
      card4: {
        title: "4. Privasi",
        body: "Daftar penerima manfaat Anda disimpan on-chain dan hanya dapat diakses oleh principal Internet Identity terautentikasi Anda. Tidak ada pihak ketiga yang dapat melihat data Anda.",
      },
      card5: {
        title: "5. Biaya",
        body: "Layanan ini disediakan sebagaimana dijelaskan dalam aplikasi. Biaya apa pun yang berlaku untuk tindakan tertentu ditampilkan dengan jelas di aplikasi sebelum Anda mengonfirmasi tindakan tersebut — tanpa biaya tersembunyi atau berulang.",
      },
      card6: {
        title: "6. Kelayakan",
        body: "Anda harus berusia minimal 18 tahun (atau usia dewasa di yurisdiksi Anda) dan memiliki kapasitas hukum untuk menyetujui ketentuan ini guna menggunakan layanan ini.",
      },
      card7: {
        title: "7. Tanpa Jaminan",
        body: "Layanan ini disediakan «sebagaimana adanya» dan «sesuai ketersediaan», tanpa jaminan apa pun, baik tersurat maupun tersirat, termasuk jaminan operasi tanpa gangguan atau bebas kesalahan.",
      },
      card8: {
        title: "8. Penerimaan Risiko",
        body: "Mata uang kripto dan teknologi blockchain membawa risiko yang melekat, termasuk volatilitas harga, kemacetan jaringan, kerentanan kontrak pintar, dan perubahan protokol yang mendasarinya. Dengan menggunakan layanan ini, Anda menerima risiko-risiko ini.",
      },
      card9: {
        title: "9. Penghentian",
        body: "Akses ke layanan ini dapat ditangguhkan atau dihentikan karena pelanggaran ketentuan ini atau perilaku yang menurut Sovereign Legacy, atas kebijakannya, merugikan pengguna lain atau layanan itu sendiri.",
      },
      card10: {
        title: "10. Perubahan Ketentuan Ini",
        body: "Ketentuan ini dapat diperbarui dari waktu ke waktu. Perubahan material akan disajikan di dalam aplikasi, dan penggunaan layanan yang berkelanjutan setelah perubahan tersebut merupakan penerimaan atas ketentuan yang diperbarui.",
      },
    },
  },
  dashboard: {
    eyebrow: "Dasbor",
    title: "Brankas",
    balance: "Saldo Brankas",
    assetsHeld: "{count} aset disimpan",
    noAssets: "Belum ada aset yang disimpan",
    beneficiaries: "Penerima Manfaat",
    named: "dinamai",
    sealed: "{count} penerima manfaat tersegel",
    none: "Belum ada penerima manfaat",
    allocation: "Alokasi Penerima Manfaat",
    allocationNone:
      "Belum ada alokasi. Tambahkan penerima manfaat untuk memulai.",
    allocationAria: "Bagian alokasi penerima manfaat",
    allocated: "dialokasikan",
    switch: "Saklar",
    lastVerified: "Terakhir diverifikasi · {time}",
    notVerified: "Belum diverifikasi",
  },
  beneficiaries: {
    eyebrow: "Penerima Manfaat",
    title: "Penerima Manfaat",
    subtitle:
      "Orang dan tujuan yang menjadi tempat warisan Anda tersegel. Alokasi, urutan, dan ketentuan ada di sini.",
    allocation: "Alokasi",
    count: "{count} penerima manfaat",
    noAllocations:
      "Belum ada alokasi. Tambahkan penerima manfaat untuk memulai.",
    allocationAria: "Bagian alokasi penerima manfaat",
    manage: "Kelola",
    manageBody:
      "Tambahkan penerima manfaat dan tetapkan bagian mereka dari brankas. Bagian dapat diedit atau dicabut kapan saja.",
    loadError: "Tidak dapat memuat penerima manfaat. Silakan coba lagi.",
    emptyTitle: "Belum ada penerima manfaat",
    emptyBody:
      "Warisan Anda belum ditetapkan. Tambahkan penerima manfaat pertama Anda untuk menyegel brankas bagi seseorang.",
    noWallet: "Tidak ada alamat dompet",
    editAria: "Edit {name}",
    removeAria: "Hapus {name}",
    modal: {
      editTitle: "Edit penerima manfaat",
      addTitle: "Tambah penerima manfaat",
      editDesc:
        "Perbarui nama, bagian, atau alamat dompet penerima manfaat ini.",
      addDesc: "Tetapkan nama dan bagian alokasi untuk penerima manfaat baru.",
    },
    namePlaceholder: "mis. Elena Marchetti",
    sharePlaceholder: "mis. 40",
    errors: {
      nameRequired: "Masukkan nama untuk penerima manfaat ini.",
      sharePositive: "Bagian alokasi harus lebih besar dari nol.",
      invalidChecksum:
        "Pengidentifikasi akun ICP ini memiliki checksum yang tidak valid. Periksa kembali alamatnya.",
      invalidWallet:
        "Masukkan alamat dompet ICP yang valid — pengidentifikasi akun 64 karakter atau principal ICP.",
      totalExceedsEdit:
        "Ini akan membawa total alokasi ke {total}%, melebihi batas 100%.",
      totalExceedsAdd:
        "Total alokasi akan menjadi {total}%, melebihi batas 100%.",
      saveFailed: "Tidak dapat menyimpan perubahan. Silakan coba lagi.",
      addFailed: "Tidak dapat menambah penerima manfaat. Silakan coba lagi.",
    },
  },
  assets: {
    eyebrow: "Warisan & Aset",
    title: "Aset yang Disimpan",
    subtitle:
      "Segala sesuatu yang disimpan di brankas — saldo, kepemilikan, dan instruksi yang mengaturnya.",
    assetsHeld: "Aset yang Disimpan",
    beneficiaries: "Penerima Manfaat",
    allocationStatus: "Status Alokasi",
    sealed: "Tersegel",
    unallocated: "Belum dialokasikan",
    beneficiaryFallback: "Penerima Manfaat #{id}",
    errorEyebrow: "Brankas tidak dapat diakses",
    errorBody: "Tidak dapat membaca aset yang disimpan. Silakan coba lagi.",
    emptyEyebrow: "Tidak ada aset yang disimpan",
    emptyBody:
      "Brankas saat ini tidak menyimpan aset kripto. Setelah aset ditambahkan, saldo dan alokasi penerima manfaatnya akan muncul di sini.",
    allocationLabel: "Alokasi Penerima Manfaat",
  },
  switch: {
    eyebrow: "Saklar",
    title: "Saklar",
    subtitle:
      "Satu-satunya kendali yang menyerahkan brankas. Aktif, terverifikasi, dan disengaja.",
    active: "Aktif · Saklar orang mati",
    standingDown: "Berdiri diam",
    armed: "AKTIF",
    disarmed: "NONAKTIF",
    checkIn: "Saya masih di sini",
    arm: "Aktifkan saklar",
    disarm: "Nonaktifkan",
    cadence: "Interval · {duration}",
    releaseIn: "Pelepasan dalam {duration}",
    timelineAriaArmed:
      "Linimasa saklar orang mati, {percent}% interval berlalu",
    timelineAriaDisarmed: "Linimasa saklar orang mati, nonaktif",
    lastCheckIn: "Check-in terakhir",
    armedAt: "Diaktifkan pada",
    cadenceLabel: "Interval",
    standingDownTitle: "Berdiri diam",
    standingDownBody:
      "Menonaktifkan menghentikan saklar orang mati. Brankas tetap tersegel, tetapi tidak akan lagi melepaskan ke penerima manfaat Anda saat check-in terlewat.",
    disarmTheSwitch: "Nonaktifkan saklar",
    armTitle: "Aktifkan saklar",
    armBody:
      "Pilih berapa lama brankas menunggu check-in berikutnya. Jika Anda melewatkannya, brankas melepaskan ke penerima manfaat Anda.",
    cadenceError:
      "Pilih interval check-in lebih besar dari nol sebelum mengaktifkan saklar.",
    errorEyebrow: "Saklar tidak dapat diakses",
    errorBody: "Tidak dapat membaca status saklar. Silakan coba lagi.",
    cadence24h: "24 jam",
    cadence7d: "7 hari",
    cadence30d: "30 hari",
  },
  audit: {
    eyebrow: "Log Audit",
    title: "Log Audit",
    ledger: "Buku Besar Peristiwa",
    count: "{count} peristiwa tersegel",
    timestamp: "Stempel waktu",
    event: "Peristiwa",
    description: "Deskripsi",
    tableAria: "Log audit brankas",
    errorEyebrow: "Buku besar tidak dapat diakses",
    errorBody: "Tidak dapat membaca buku besar audit. Silakan coba lagi.",
    emptyTitle: "Belum ada peristiwa",
    emptyBody:
      "Setiap tindakan yang dilakukan terhadap brankas akan tersegel di sini, secara berurutan, saat terjadi.",
    footer:
      "Setiap entri tersegel di buku besar. Entri tidak dapat diedit atau dihapus.",
  },
  settings: {
    eyebrow: "Pengaturan",
    title: "Konfigurasi Brankas",
    subtitle:
      "Pertahankan konfigurasi yang mengatur warisan Anda — status aktif/nonaktif Saklar, interval check-in, dan penerima manfaat yang menjadi tempatnya tersegel.",
    switchTitle: "Saklar",
    switchDesc:
      "Aktifkan atau nonaktifkan brankas dan atur seberapa sering brankas harus diverifikasi.",
    beneficiariesTitle: "Penerima Manfaat",
    beneficiariesDesc:
      "Edit orang dan tujuan yang menjadi tempat warisan Anda tersegel.",
    cadence: "Interval · {value}",
    daily: "Harian",
    weekly: "Mingguan",
    monthly: "Bulanan",
    yearly: "Tahunan",
    h24: "24 jam",
    h7d: "7 hari",
    h30d: "30 hari",
    h365d: "365 hari",
    emptyBeneficiaries: "Belum ada penerima manfaat yang dikonfigurasi",
    editBeneficiary: "Edit penerima manfaat",
    editBeneficiaryDesc:
      "Perbarui nama, bagian alokasi, dan alamat dompet penerima manfaat ini.",
    removeBeneficiary: "Hapus penerima manfaat",
    removeBeneficiaryDesc:
      "Hapus {name} dari brankas? Tindakan ini tidak dapat dibatalkan.",
    toast: {
      armed: "Saklar diaktifkan",
      armedDesc: "Interval check-in diatur ke {cadence}.",
      armError: "Tidak dapat mengaktifkan Saklar",
      armErrorDesc: "Brankas tidak dapat diaktifkan. Silakan coba lagi.",
      disarmed: "Saklar dinonaktifkan",
      disarmedDesc: "Brankas tidak lagi aktif.",
      disarmError: "Tidak dapat menonaktifkan Saklar",
      disarmErrorDesc: "Brankas tidak dapat dinonaktifkan. Silakan coba lagi.",
      beneficiaryUpdated: "Penerima manfaat diperbarui",
      beneficiaryUpdatedDesc: "Konfigurasi penerima manfaat telah disimpan.",
      updateError: "Tidak dapat memperbarui penerima manfaat",
      updateErrorDesc: "Perubahan tidak disimpan. Silakan coba lagi.",
      beneficiaryRemoved: "Penerima manfaat dihapus",
      beneficiaryRemovedDesc: "Penerima manfaat telah dihapus dari brankas.",
      removeError: "Tidak dapat menghapus penerima manfaat",
      removeErrorDesc:
        "Penerima manfaat tidak dapat dihapus. Silakan coba lagi.",
    },
  },
};
