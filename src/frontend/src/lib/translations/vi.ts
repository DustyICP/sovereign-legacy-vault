import type { Translations } from "@/lib/translations/en";

/** Vietnamese (vi). Falls back to English for any key not covered here. */
export const vi: Partial<Translations> = {
  meta: {
    title: "Sovereign Legacy — Két Sắt",
    description:
      "Sovereign Legacy — Két Sắt. Két sắt của bạn. Niêm phong cho đến khi không còn niêm phong.",
  },
  common: {
    cancel: "Hủy",
    saveChanges: "Lưu thay đổi",
    edit: "Chỉnh sửa",
    remove: "Xóa",
    name: "Tên",
    optional: "Tùy chọn",
    addBeneficiary: "Thêm người thụ hưởng",
    allocationShare: "Tỷ lệ phân bổ (%)",
    walletAddress: "Địa chỉ ví",
    checkInCadence: "Chu kỳ điểm danh",
    selectCadence: "Chọn chu kỳ",
    armed: "Đã kích hoạt",
    disarmed: "Đã hủy kích hoạt",
    arming: "Đang kích hoạt…",
    disarming: "Đang hủy kích hoạt…",
    saving: "Đang lưu…",
    removing: "Đang xóa…",
    arm: "Kích hoạt",
    disarm: "Hủy kích hoạt",
  },
  nav: {
    dashboard: "Bảng điều khiển",
    beneficiaries: "Người thụ hưởng",
    legacyAssets: "Di sản & Tài sản",
    theSwitch: "Công Tắc",
    auditLogs: "Nhật ký Kiểm toán",
    settings: "Cài đặt",
  },
  header: {
    home: "Trang chủ Sovereign Legacy",
    networkBadge: "Mạng · Danh tính",
    mobileMenu: "Mở menu điều hướng",
    mobilePrimary: "Điều hướng chính trên di động",
  },
  footer: {
    copyright: "© {year}. Sovereign Legacy — Két Sắt. Bảo lưu mọi quyền.",
    tagline: "Niêm phong cho đến khi không còn niêm phong",
  },
  loading: {
    openingVault: "Đang mở két sắt…",
  },
  language: {
    label: "Ngôn ngữ",
  },
  landing: {
    eyebrow: "Thừa kế tự chủ",
    headline1: "Kho lưu trữ của bạn.",
    headline2: "Niêm phong cho đến khi không còn nữa.",
    login: "Đăng nhập bằng Internet Identity",
    subhead:
      "Một công tắc người chết kỹ thuật số dành cho tiền mã hóa, được xây dựng trực tiếp trên Internet Computer — không cần thủ tục thừa kế, không trì hoãn, không ai giám sát ngoài chính chuỗi khối.",
    vaultDoorAlt:
      "Một cánh cửa kho tiền ngân hàng bằng đồng thau và thép đã phong hóa, đóng lại, với biểu tượng vòng lặp vô hạn của Internet Computer phát sáng mờ nhạt ở trung tâm.",
    introduction: {
      eyebrow: "Giới thiệu",
      heading: "Công Tắc Tử Thần — Ra Đời Trong Kỷ Nguyên Hơi Nước",
      p1: "Trong những thập niên cuối của thế kỷ mười chín, một loại máy móc mới đang định hình lại nền văn minh. Xe điện chạy len lỏi qua các thành phố đông đúc, và thang máy đưa hành khách lên những tòa nhà cao chưa từng thấy. Chúng là những kỳ quan — và chúng nguy hiểm.",
      p2: "Vấn đề đơn giản và đáng sợ: điều gì xảy ra khi người điều khiển không còn điều khiển được nữa? Một tài xế xe điện có thể lên cơn đau tim khi đang lái. Một người vận hành thang máy có thể bất tỉnh giữa chuyến đi. Và cỗ máy, thờ ơ với số phận của người vận hành, cứ tiếp tục chạy — cho đến khi đâm vào thứ gì đó khiến nó dừng lại.",
      p3: "Chính kỹ sư người Mỹ Frank J. Sprague, vào năm 1888, đã điện khí hóa các tuyến xe điện ở Richmond, Virginia — tuyến đường sắt điện đô thị thành công đầu tiên tại Hoa Kỳ. Sáng kiến của ông không dừng lại ở động cơ. Sprague hiểu rằng một phương tiện chở hành khách ở tốc độ cao cần có cách tự dừng nếu người vận hành mất khả năng điều khiển.",
      p4: "Họ gọi nó là công tắc tử thần. Giữ tay cầm để tiếp tục di chuyển. Buông ra — dù vì mất tập trung, bệnh tật hay cái chết — và cỗ máy tự dừng lại. Cái tên không được chọn vì kịch tính. Nó được chọn vì sự chính xác. Công tắc được kích hoạt bởi sự vắng mặt của bàn tay sống.",
      p5: "Ý tưởng lan truyền nhanh chóng. Tàu điện ngầm ở New York, London và Tokyo áp dụng nó. Các nhà máy điện hạt nhân tích hợp nó vào thanh điều khiển. Máy bay thương mại nhúng nó vào hệ thống lái tự động. Bất cứ nơi nào cỗ máy chở theo sinh mạng, công tắc tử thần đều theo sau — im lặng, kiên nhẫn, chờ đợi.",
      h3a: "Công Tắc Tử Thần Hoạt Động Như Thế Nào Trong Thời Đại Này?",
      p6: "Bạn đã làm việc chăm chỉ. Bạn đã tích lũy tài sản mã hóa — ICP, Bitcoin, Ethereum, stablecoin. Chúng nằm trong ví và canister, được bảo vệ bởi khóa riêng tư chỉ mình bạn sở hữu. Và như người tài xế nắm chặt tay cầm, chỉ có sự hiện diện sống động, tích cực của bạn trên mạng mới giữ cho mạch điện đóng.",
      p7: "Đây là cách Sovereign Legacy áp dụng nguyên tắc tương tự. Bạn gửi tài sản vào một két sắt canister an toàn trên chuỗi. Bạn chỉ định một hoặc nhiều người thụ hưởng và đặt thời gian không hoạt động mạng. Chừng nào bạn còn đăng nhập định kỳ, công tắc vẫn đóng. Khoảnh khắc hoạt động đó dừng lại, Sovereign Legacy gửi cho bạn cảnh báo. Nếu bạn không phản hồi, giao dịch chuyển sẽ tự động thực hiện, chuyển tài sản của bạn đến những người thụ hưởng đã chọn mà không cần luật sư, tòa án hay chậm trễ.",
      h3b: "Muốn Cá Nhân Hóa Di Nguyện Của Bạn?",
      p8: "Nếu bạn muốn nhiều hơn một người nhận — vợ/chồng, con cái, một người bạn tin cậy, một tổ chức từ thiện — Sovereign Legacy cho phép bạn chia tài sản theo tỷ lệ phần trăm. Bạn đặt các phần. Người thụ hưởng của bạn nhận đúng những gì bạn dự định.",
    },
    advantages: {
      eyebrow: "Vì sao hiệu quả",
      heading: "Lợi Ích Được Xây Dựng Vào Từng Bước",
      card1: {
        title: "Không luật sư. Không thủ tục. Không chậm trễ.",
        body: "Canister thực thi chỉ dẫn của bạn ngay khi công tắc tử thần kích hoạt. Không tổ chức nào đứng giữa di nguyện của bạn và những người bạn yêu thương.",
      },
      card2: {
        title: "Bạn luôn nắm quyền kiểm soát.",
        body: "Thay đổi người thụ hưởng, điều chỉnh tỷ lệ hoặc cập nhật thông điệp của bạn bất cứ lúc nào. Mọi thứ cập nhật tức thì, trên chuỗi.",
      },
      card3: {
        title: "Hoạt động khi bạn ngủ.",
        body: "Nếu cuộc sống tiếp diễn, Sovereign Legacy giữ im lặng. Nếu không, mọi thứ tiến triển đúng như bạn đã hoạch định.",
      },
      card4: {
        title: "Tầm với toàn cầu.",
        body: "Người thụ hưởng có thể ở bất kỳ đâu trên thế giới. Sovereign Legacy nói nhiều ngôn ngữ và lo phần giải thích để bạn không phải làm.",
      },
      card5: {
        title: "Dữ liệu của bạn vẫn là của bạn.",
        body: "Két sắt của bạn là một canister trên Internet Computer, được bảo vệ bởi Internet Identity của bạn. Không bên thứ ba nào — kể cả chính Sovereign Legacy — có quyền truy cập nội dung của nó.",
      },
    },
    faq: {
      eyebrow: "Câu hỏi",
      heading: "Câu Hỏi Thường Gặp",
      q1: {
        q: "Sovereign Legacy hỗ trợ những ngôn ngữ nào?",
        a: "Ứng dụng hỗ trợ 22 ngôn ngữ, bao gồm các ngôn ngữ từ phải sang trái như tiếng Ả Rập, tiếng Ba Tư và tiếng Urdu, để người thụ hưởng ở bất kỳ đâu trên thế giới có thể hiểu thông báo giải phóng bằng ngôn ngữ của họ.",
      },
      q2: {
        q: "Két sắt của tôi an toàn đến mức nào?",
        a: "Két sắt của bạn là một canister trên Internet Computer, được bảo vệ bởi Internet Identity của bạn. Chỉ principal đã xác thực của bạn mới có thể xem hoặc quản lý nội dung của nó.",
      },
      q3: {
        q: "Tôi có thể mất két sắt của mình không?",
        a: "Chừng nào bạn còn giữ quyền truy cập Internet Identity, két sắt của bạn vẫn nằm trong tầm kiểm soát. Rủi ro chính là mất thông tin xác thực Internet Identity, vì vậy việc giữ bản sao lưu an toàn cho phương thức khôi phục của bạn là điều quan trọng.",
      },
      q4: {
        q: "Tài sản được chia cho các người thụ hưởng như thế nào?",
        a: "Bạn gán cho mỗi người thụ hưởng một phần trăm. Các phần có thể được điều chỉnh bất cứ lúc nào trước khi giải phóng, và tổng phân bổ cho tất cả người thụ hưởng không bao giờ được vượt quá 100%.",
      },
      q5: {
        q: "Làm thế nào để đặt lại bộ đếm thời gian không hoạt động mạng?",
        a: "Chỉ cần đăng nhập bằng Internet Identity của bạn. Bất kỳ lần điểm danh đã xác thực nào cũng đặt lại đồng hồ không hoạt động và giữ công tắc tử thần ở trạng thái kích hoạt.",
      },
      q6: {
        q: "Làm thế nào để thêm người thụ hưởng?",
        a: "Từ bảng điều khiển của bạn, mở bảng Người thụ hưởng và thêm tên, thông tin liên hệ và tỷ lệ phân bổ.",
      },
      q7: {
        q: "Tôi có thể thay đổi người thụ hưởng sau khi thiết lập không?",
        a: "Có. Người thụ hưởng, phân bổ và thông điệp cá nhân đều có thể được cập nhật bất cứ lúc nào — các thay đổi có hiệu lực ngay lập tức, trên chuỗi.",
      },
      q8: {
        q: "Ai có thể nhìn thấy người thụ hưởng của tôi?",
        a: "Chỉ mình bạn, khi đã xác thực với tư cách chủ sở hữu két sắt.",
      },
    },
    terms: {
      eyebrow: "Điều khoản",
      heading: "Điều Khoản & Điều Kiện",
      card1: {
        title: "1. Tổng quan",
        body: "ICP Sovereign Legacy là một nền tảng thừa kế và công tắc tử thần phi tập trung, hoàn toàn trên chuỗi, được xây dựng trên Giao thức Internet Computer (ICP). Bằng việc sử dụng dịch vụ này, bạn đồng ý với các điều khoản này.",
      },
      card2: {
        title: "2. Không Chịu Trách Nhiệm",
        body: "Các nhà phát triển không chịu trách nhiệm về bất kỳ tổn thất tài sản nào do cấu hình sai, mất thông tin xác thực Internet Identity, điều kiện mạng blockchain hoặc bất kỳ nguyên nhân nào khác. Sử dụng dịch vụ này với rủi ro của riêng bạn.",
      },
      card3: {
        title: "3. Thực Thi Tự Động",
        body: "Việc phân phối tài sản được thực thi tự động bởi logic hợp đồng thông minh trên chuỗi khi công tắc tử thần của bạn kích hoạt. Không cần và không thể có sự can thiệp của con người sau khi kích hoạt.",
      },
      card4: {
        title: "4. Quyền Riêng Tư",
        body: "Danh sách người thụ hưởng của bạn được lưu trữ trên chuỗi và chỉ principal Internet Identity đã xác thực của bạn mới có thể truy cập. Không bên thứ ba nào có thể xem dữ liệu của bạn.",
      },
      card5: {
        title: "5. Phí",
        body: "Dịch vụ này được cung cấp như mô tả trong ứng dụng. Mọi khoản phí áp dụng cho một hành động cụ thể đều được hiển thị rõ ràng trong ứng dụng trước khi bạn xác nhận hành động đó — không có khoản phí ẩn hoặc định kỳ.",
      },
      card6: {
        title: "6. Điều Kiện Tham Gia",
        body: "Bạn phải từ 18 tuổi trở lên (hoặc độ tuổi thành niên theo pháp luật nơi bạn cư trú) và có năng lực pháp lý để chấp nhận các điều khoản này khi sử dụng dịch vụ.",
      },
      card7: {
        title: "7. Không Bảo Hành",
        body: "Dịch vụ này được cung cấp «nguyên trạng» và «theo tình trạng sẵn có», không có bất kỳ bảo hành nào, dù rõ ràng hay ngụ ý, bao gồm mọi bảo hành về hoạt động không gián đoạn hoặc không có lỗi.",
      },
      card8: {
        title: "8. Chấp Nhận Rủi Ro",
        body: "Tiền mã hóa và công nghệ blockchain tiềm ẩn những rủi ro cố hữu, bao gồm biến động giá, tắc nghẽn mạng, lỗ hổng hợp đồng thông minh và thay đổi giao thức nền tảng. Bằng việc sử dụng dịch vụ này, bạn chấp nhận những rủi ro này.",
      },
      card9: {
        title: "9. Chấm Dứt",
        body: "Quyền truy cập dịch vụ này có thể bị đình chỉ hoặc chấm dứt do vi phạm các điều khoản này hoặc do hành vi mà Sovereign Legacy xác định, theo quyết định của mình, là gây hại cho người dùng khác hoặc cho chính dịch vụ.",
      },
      card10: {
        title: "10. Sửa Đổi Các Điều Khoản Này",
        body: "Các điều khoản này có thể được cập nhật theo thời gian. Các thay đổi quan trọng sẽ được trình bày trong ứng dụng, và việc tiếp tục sử dụng dịch vụ sau những thay đổi đó được coi là chấp nhận các điều khoản đã cập nhật.",
      },
    },
  },
  dashboard: {
    eyebrow: "Bảng điều khiển",
    title: "Két Sắt",
    balance: "Số Dư Két Sắt",
    assetsHeld: "Đang giữ {count} tài sản",
    noAssets: "Chưa có tài sản nào",
    beneficiaries: "Người thụ hưởng",
    named: "được chỉ định",
    sealed: "{count} người thụ hưởng được niêm phong",
    none: "Chưa có người thụ hưởng",
    allocation: "Phân Bổ Người Thụ Hưởng",
    allocationNone: "Chưa có phân bổ nào. Thêm người thụ hưởng để bắt đầu.",
    allocationAria: "Phần phân bổ của người thụ hưởng",
    switch: "Công Tắc",
    lastVerified: "Xác minh lần cuối · {time}",
    notVerified: "Chưa được xác minh",
  },
  beneficiaries: {
    eyebrow: "Người thụ hưởng",
    title: "Người thụ hưởng",
    subtitle:
      "Những người và mục đích mà di sản của bạn được niêm phong. Phân bổ, thứ tự và điều kiện nằm ở đây.",
    allocation: "Phân bổ",
    count: "{count} người thụ hưởng",
    noAllocations: "Chưa có phân bổ nào. Thêm người thụ hưởng để bắt đầu.",
    allocationAria: "Phần phân bổ của người thụ hưởng",
    manage: "Quản lý",
    manageBody:
      "Thêm người thụ hưởng và gán phần của họ trong két sắt. Các phần có thể được chỉnh sửa hoặc thu hồi bất cứ lúc nào.",
    loadError: "Không thể tải người thụ hưởng. Vui lòng thử lại.",
    emptyTitle: "Chưa có người thụ hưởng",
    emptyBody:
      "Di sản của bạn chưa được chỉ định. Thêm người thụ hưởng đầu tiên để niêm phong két sắt cho một người nào đó.",
    noWallet: "Không có địa chỉ ví",
    editAria: "Chỉnh sửa {name}",
    removeAria: "Xóa {name}",
    modal: {
      editTitle: "Chỉnh sửa người thụ hưởng",
      addTitle: "Thêm người thụ hưởng",
      editDesc: "Cập nhật tên, phần hoặc địa chỉ ví của người thụ hưởng này.",
      addDesc: "Gán tên và phần phân bổ cho một người thụ hưởng mới.",
    },
    namePlaceholder: "vd: Elena Marchetti",
    sharePlaceholder: "vd: 40",
    errors: {
      nameRequired: "Nhập tên cho người thụ hưởng này.",
      sharePositive: "Phần phân bổ phải lớn hơn không.",
      invalidChecksum:
        "Mã định danh tài khoản ICP này có checksum không hợp lệ. Kiểm tra lại địa chỉ.",
      invalidWallet:
        "Nhập địa chỉ ví ICP hợp lệ — mã định danh tài khoản 64 ký tự hoặc principal ICP.",
      totalExceedsEdit:
        "Điều này sẽ đưa tổng phân bổ lên {total}%, vượt quá giới hạn 100%.",
      totalExceedsAdd: "Tổng phân bổ sẽ là {total}%, vượt quá giới hạn 100%.",
      saveFailed: "Không thể lưu thay đổi. Vui lòng thử lại.",
      addFailed: "Không thể thêm người thụ hưởng. Vui lòng thử lại.",
    },
  },
  assets: {
    eyebrow: "Di sản & Tài sản",
    title: "Tài Sản Đang Giữ",
    subtitle:
      "Mọi thứ được giữ trong két sắt — số dư, tài sản nắm giữ và các chỉ dẫn quản lý chúng.",
    assetsHeld: "Tài Sản Đang Giữ",
    beneficiaries: "Người thụ hưởng",
    allocationStatus: "Trạng Thái Phân Bổ",
    sealed: "Đã niêm phong",
    unallocated: "Chưa phân bổ",
    beneficiaryFallback: "Người thụ hưởng #{id}",
    errorEyebrow: "Két sắt không truy cập được",
    errorBody: "Không thể đọc tài sản đang giữ. Vui lòng thử lại.",
    emptyEyebrow: "Không có tài sản nào",
    emptyBody:
      "Két sắt hiện không giữ tài sản mã hóa nào. Khi tài sản được thêm vào, số dư và phân bổ cho người thụ hưởng sẽ xuất hiện ở đây.",
    allocationLabel: "Phân Bổ Người Thụ Hưởng",
  },
  switch: {
    eyebrow: "Công Tắc",
    title: "Công Tắc",
    subtitle:
      "Điều khiển duy nhất trao két sắt. Được kích hoạt, xác minh và cân nhắc kỹ lưỡng.",
    active: "Đang hoạt động · Công tắc tử thần",
    standingDown: "Đứng yên",
    armed: "ĐÃ KÍCH HOẠT",
    disarmed: "ĐÃ HỦY KÍCH HOẠT",
    checkIn: "Tôi vẫn ở đây",
    arm: "Kích hoạt công tắc",
    disarm: "Hủy kích hoạt",
    cadence: "Chu kỳ · {duration}",
    releaseIn: "Giải phóng sau {duration}",
    timelineAriaArmed:
      "Dòng thời gian công tắc tử thần, {percent}% chu kỳ đã trôi qua",
    timelineAriaDisarmed: "Dòng thời gian công tắc tử thần, đã hủy kích hoạt",
    lastCheckIn: "Lần điểm danh cuối",
    armedAt: "Kích hoạt lúc",
    cadenceLabel: "Chu kỳ",
    standingDownTitle: "Đứng yên",
    standingDownBody:
      "Hủy kích hoạt sẽ dừng công tắc tử thần. Két sắt vẫn được niêm phong, nhưng sẽ không còn giải phóng cho người thụ hưởng khi bỏ lỡ một lần điểm danh.",
    disarmTheSwitch: "Hủy kích hoạt công tắc",
    armTitle: "Kích hoạt công tắc",
    armBody:
      "Chọn khoảng thời gian két sắt chờ lần điểm danh tiếp theo của bạn. Nếu bạn bỏ lỡ, két sắt sẽ giải phóng cho người thụ hưởng của bạn.",
    cadenceError:
      "Chọn chu kỳ điểm danh lớn hơn không trước khi kích hoạt công tắc.",
    errorEyebrow: "Công tắc không truy cập được",
    errorBody: "Không thể đọc trạng thái công tắc. Vui lòng thử lại.",
    cadence24h: "24 giờ",
    cadence7d: "7 ngày",
    cadence30d: "30 ngày",
  },
  audit: {
    eyebrow: "Nhật ký Kiểm toán",
    title: "Nhật ký Kiểm toán",
    ledger: "Sổ Cái Sự Kiện",
    count: "{count} sự kiện được niêm phong",
    timestamp: "Dấu thời gian",
    event: "Sự kiện",
    description: "Mô tả",
    tableAria: "Nhật ký kiểm toán két sắt",
    errorEyebrow: "Sổ cái không truy cập được",
    errorBody: "Không thể đọc sổ cái kiểm toán. Vui lòng thử lại.",
    emptyTitle: "Chưa có sự kiện nào",
    emptyBody:
      "Mọi hành động thực hiện đối với két sắt sẽ được niêm phong ở đây, theo thứ tự, khi chúng xảy ra.",
    footer:
      "Mọi mục đều được niêm phong trên sổ cái. Các mục không thể chỉnh sửa hoặc xóa.",
  },
  settings: {
    eyebrow: "Cài đặt",
    title: "Cấu Hình Két Sắt",
    subtitle:
      "Giữ gìn cấu hình quản lý di sản của bạn — trạng thái kích hoạt/hủy kích hoạt của Công Tắc, chu kỳ điểm danh và những người thụ hưởng mà nó được niêm phong.",
    switchTitle: "Công Tắc",
    switchDesc:
      "Kích hoạt hoặc hủy kích hoạt két sắt và đặt tần suất xác minh.",
    beneficiariesTitle: "Người thụ hưởng",
    beneficiariesDesc:
      "Chỉnh sửa những người và mục đích mà di sản của bạn được niêm phong.",
    cadence: "Chu kỳ · {value}",
    daily: "Hàng ngày",
    weekly: "Hàng tuần",
    monthly: "Hàng tháng",
    yearly: "Hàng năm",
    h24: "24 giờ",
    h7d: "7 ngày",
    h30d: "30 ngày",
    h365d: "365 ngày",
    emptyBeneficiaries: "Chưa có người thụ hưởng nào được cấu hình",
    editBeneficiary: "Chỉnh sửa người thụ hưởng",
    editBeneficiaryDesc:
      "Cập nhật tên, phần phân bổ và địa chỉ ví của người thụ hưởng này.",
    removeBeneficiary: "Xóa người thụ hưởng",
    removeBeneficiaryDesc:
      "Xóa {name} khỏi két sắt? Hành động này không thể hoàn tác.",
    toast: {
      armed: "Công Tắc đã được kích hoạt",
      armedDesc: "Chu kỳ điểm danh được đặt thành {cadence}.",
      armError: "Không thể kích hoạt Công Tắc",
      armErrorDesc: "Két sắt không thể được kích hoạt. Vui lòng thử lại.",
      disarmed: "Công Tắc đã được hủy kích hoạt",
      disarmedDesc: "Két sắt không còn được kích hoạt.",
      disarmError: "Không thể hủy kích hoạt Công Tắc",
      disarmErrorDesc:
        "Két sắt không thể được hủy kích hoạt. Vui lòng thử lại.",
      beneficiaryUpdated: "Đã cập nhật người thụ hưởng",
      beneficiaryUpdatedDesc: "Cấu hình người thụ hưởng đã được lưu.",
      updateError: "Không thể cập nhật người thụ hưởng",
      updateErrorDesc: "Các thay đổi chưa được lưu. Vui lòng thử lại.",
      beneficiaryRemoved: "Đã xóa người thụ hưởng",
      beneficiaryRemovedDesc: "Người thụ hưởng đã được xóa khỏi két sắt.",
      removeError: "Không thể xóa người thụ hưởng",
      removeErrorDesc: "Người thụ hưởng không thể bị xóa. Vui lòng thử lại.",
    },
  },
};
