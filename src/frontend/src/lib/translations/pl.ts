import type { Translations } from "@/lib/translations/en";

/** Polish (pl). Falls back to English for any key not covered here. */
export const pl: Partial<Translations> = {
  meta: {
    title: "Sovereign Legacy — Skarbiec",
    description:
      "Sovereign Legacy — Skarbiec. Twój skarbiec. Zapieczętowany, dopóki nie przestanie być.",
  },
  common: {
    cancel: "Anuluj",
    saveChanges: "Zapisz zmiany",
    edit: "Edytuj",
    remove: "Usuń",
    name: "Imię",
    optional: "Opcjonalne",
    addBeneficiary: "Dodaj beneficjenta",
    allocationShare: "Udział w podziale (%)",
    walletAddress: "Adres portfela",
    checkInCadence: "Częstotliwość logowania",
    selectCadence: "Wybierz częstotliwość",
    armed: "Uzbrojony",
    disarmed: "Rozbrojony",
    arming: "Uzbrajanie…",
    disarming: "Rozbrajanie…",
    saving: "Zapisywanie…",
    removing: "Usuwanie…",
    arm: "Uzbrój",
    disarm: "Rozbrój",
  },
  nav: {
    dashboard: "Pulpit",
    beneficiaries: "Beneficjenci",
    legacyAssets: "Spuścizna i Aktywa",
    theSwitch: "Przełącznik",
    auditLogs: "Dzienniki Audytu",
    settings: "Ustawienia",
  },
  header: {
    home: "Strona główna Sovereign Legacy",
    networkBadge: "Sieć · Tożsamość",
    mobileMenu: "Otwórz menu nawigacji",
    mobilePrimary: "Główna nawigacja mobilna",
  },
  footer: {
    copyright:
      "© {year}. Sovereign Legacy — Skarbiec. Wszelkie prawa zastrzeżone.",
    tagline: "Zapieczętowany, dopóki nie przestanie być",
  },
  loading: {
    openingVault: "Otwieranie skarbca…",
  },
  language: {
    label: "Język",
  },
  landing: {
    eyebrow: "Suwerenne dziedzictwo",
    headline1: "Twój skarbiec.",
    headline2: "Zapieczętowany, dopóki nie nadejdzie czas.",
    login: "Zaloguj się przez Internet Identity",
    subhead:
      "Cyfrowy wyłącznik czuwania dla kryptowalut, zbudowany natywnie na Internet Computer — bez postępowania spadkowego, bez opóźnień, bez nikogo pilnującego poza samym łańcuchem.",
    vaultDoorAlt:
      "Zwietrzałe mosiężno-stalowe drzwi bankowego skarbca, zamknięte, z emblematem pętli nieskończoności Internet Computer delikatnie świecącym w ich centrum.",
    introduction: {
      eyebrow: "Wprowadzenie",
      heading: "Wyłącznik Martwego Człowieka — Narodzony w Erze Pary",
      p1: "W ostatnich dekadach dziewiętnastego wieku nowy rodzaj maszyny przekształcał cywilizację. Elektryczne tramwaje przecinały teraz zatłoczone miasta, a windy wznosiły pasażerów w budynki o niespotykanej wysokości. Były cudem — i były niebezpieczne.",
      p2: "Problem był prosty i przerażający: co się dzieje, gdy człowiek u sterów przestaje być u sterów? Motorniczy mógł dostać zawału serca za kierownicą. Operator windy mógł stracić przytomność w trakcie jazdy. A maszyna, obojętna na los swojego operatora, po prostu jechała dalej — aż uderzyła w coś, co ją zatrzymało.",
      p3: "To amerykański inżynier Frank J. Sprague w 1888 roku zelektryfikował linie tramwajowe w Richmond w Wirginii — pierwszą udaną elektryczną kolej miejską w Stanach Zjednoczonych. Jego innowacja nie kończyła się na silniku. Sprague zrozumiał, że pojazd przewożący pasażerów z dużą prędkością potrzebuje sposobu na samozatrzymanie, jeśli operator stanie się niezdolny do działania.",
      p4: "Nazwali to wyłącznikiem martwego człowieka. Trzymaj uchwyt, aby jechać dalej. Puść go — czy to z roztargnienia, choroby, czy śmierci — a maszyna zatrzyma się sama. Nazwa nie została wybrana dla dramatyzmu. Została wybrana dla precyzji. Wyłącznik był aktywowany przez nieobecność żywej dłoni.",
      p5: "Pomysł szybko się rozprzestrzenił. Metro w Nowym Jorku, Londynie i Tokio go przyjęło. Elektrownie jądrowe wbudowały go w swoje pręty kontrolne. Samoloty komercyjne osadziły go w autopilotach. Wszędzie tam, gdzie maszyna niosła życie, wyłącznik martwego człowieka podążał za nią — cichy, cierpliwy, czekający.",
      h3a: "Jak Wyłącznik Martwego Człowieka Działa w Dzisiejszych Czasach?",
      p6: "Ciężko pracowałeś. Zgromadziłeś aktywa kryptowalutowe — ICP, Bitcoin, Ethereum, stablecoiny. Leżą w portfelach i canisterach, zabezpieczone prywatnymi kluczami, które posiadasz tylko ty. I jak motorniczy ściskający uchwyt, tylko twoja żywa, aktywna obecność w sieci utrzymuje obwód zamknięty.",
      p7: "Oto jak Sovereign Legacy stosuje tę samą zasadę. Deponujesz aktywa w bezpiecznym skarbcu-canisterze on-chain. Wyznaczasz jednego lub więcej beneficjentów i ustawiasz okres braku aktywności w sieci. Dopóki logujesz się okresowo, wyłącznik pozostaje zamknięty. W chwili, gdy ta aktywność ustaje, Sovereign Legacy wysyła ci alerty. Jeśli nie odpowiesz, transfer wykonuje się automatycznie, przenosząc twoje aktywa do wybranych beneficjentów bez prawników, sądów i opóźnień.",
      h3b: "Chcesz Spersonalizować Swoje Życzenia?",
      p8: "Jeśli chcesz więcej niż jednego odbiorcę — małżonka, dzieci, zaufanego przyjaciela, cel charytatywny — Sovereign Legacy pozwala ci podzielić aktywa procentowo. Ty ustalasz udziały. Twoi beneficjenci otrzymują dokładnie to, co zamierzałeś.",
    },
    advantages: {
      eyebrow: "Dlaczego to działa",
      heading: "Zalety Są Wbudowane w Każdy Krok",
      card1: {
        title: "Bez prawników. Bez spadku. Bez opóźnień.",
        body: "Canister wykonuje twoje instrukcje w momencie zadziałania wyłącznika martwego człowieka. Żadna instytucja nie stoi między twoimi życzeniami a ludźmi, których kochasz.",
      },
      card2: {
        title: "Ty zachowujesz kontrolę.",
        body: "Zmieniaj beneficjentów, dostosowuj procenty lub aktualizuj swoją wiadomość w dowolnym momencie. Wszystko aktualizuje się natychmiast, on-chain.",
      },
      card3: {
        title: "Działa, gdy śpisz.",
        body: "Jeśli życie toczy się dalej, Sovereign Legacy milczy. Jeśli nie, wszystko przebiega dokładnie tak, jak zaplanowałeś.",
      },
      card4: {
        title: "Globalny zasięg.",
        body: "Beneficjenci mogą być gdziekolwiek na świecie. Sovereign Legacy mówi w wielu językach i zajmuje się wyjaśnieniami, abyś ty nie musiał.",
      },
      card5: {
        title: "Twoje dane pozostają twoje.",
        body: "Twój skarbiec to canister na Internet Computer, zabezpieczony twoją Internet Identity. Żadna strona trzecia — w tym sam Sovereign Legacy — nie ma dostępu do jego zawartości.",
      },
    },
    faq: {
      eyebrow: "Pytania",
      heading: "Często Zadawane Pytania",
      q1: {
        q: "Jakie języki obsługuje Sovereign Legacy?",
        a: "Aplikacja obsługuje 22 języki, w tym języki pisane od prawej do lewej, takie jak arabski, perski i urdu, aby beneficjenci gdziekolwiek na świecie mogli zrozumieć powiadomienie o zwolnieniu w swoim własnym języku.",
      },
      q2: {
        q: "Jak bezpieczny jest mój skarbiec?",
        a: "Twój skarbiec to canister na Internet Computer, zabezpieczony twoją Internet Identity. Tylko twój uwierzytelniony principal może przeglądać lub zarządzać jego zawartością.",
      },
      q3: {
        q: "Czy mogę kiedyś stracić swój skarbiec?",
        a: "Dopóki zachowujesz dostęp do swojej Internet Identity, twój skarbiec pozostaje pod twoją kontrolą. Głównym ryzykiem jest utrata danych uwierzytelniających Internet Identity, dlatego ważne jest przechowywanie bezpiecznej kopii zapasowej metody odzyskiwania.",
      },
      q4: {
        q: "Jak aktywa są dzielone między beneficjentów?",
        a: "Przydzielasz każdemu beneficjentowi udział procentowy. Udziały można dostosowywać w dowolnym momencie przed zwolnieniem, a łączna kwota przydzielona wszystkim beneficjentom nigdy nie może przekroczyć 100%.",
      },
      q5: {
        q: "Jak zresetować licznik braku aktywności w sieci?",
        a: "Po prostu zaloguj się przez swoją Internet Identity. Każde uwierzytelnione logowanie resetuje zegar braku aktywności i utrzymuje wyłącznik martwego człowieka uzbrojony.",
      },
      q6: {
        q: "Jak dodać beneficjenta?",
        a: "Z pulpitu otwórz panel Beneficjenci i dodaj imię, dane kontaktowe oraz procent przydziału.",
      },
      q7: {
        q: "Czy mogę zmienić beneficjentów po konfiguracji?",
        a: "Tak. Beneficjenci, przydziały i osobiste wiadomości mogą być aktualizowane w dowolnym momencie — zmiany wchodzą w życie natychmiast, on-chain.",
      },
      q8: {
        q: "Kto może zobaczyć moich beneficjentów?",
        a: "Tylko ty, dopóki jesteś uwierzytelniony jako właściciel skarbca.",
      },
    },
    terms: {
      eyebrow: "Warunki",
      heading: "Warunki i Postanowienia",
      card1: {
        title: "1. Przegląd",
        body: "ICP Sovereign Legacy to zdecentralizowana, w pełni on-chain platforma dziedziczenia i wyłącznika martwego człowieka, zbudowana na protokole Internet Computer (ICP). Korzystając z tej usługi, akceptujesz niniejsze warunki.",
      },
      card2: {
        title: "2. Brak Odpowiedzialności",
        body: "Deweloperzy nie ponoszą odpowiedzialności za jakąkolwiek utratę aktywów wynikającą z nieprawidłowej konfiguracji, utraty danych uwierzytelniających Internet Identity, warunków sieci blockchain lub jakiejkolwiek innej przyczyny. Korzystasz z tej usługi na własne ryzyko.",
      },
      card3: {
        title: "3. Autonomiczne Wykonanie",
        body: "Dystrybucja aktywów jest wykonywana automatycznie przez logikę inteligentnych kontraktów on-chain, gdy zadziała twój wyłącznik martwego człowieka. Po zadziałaniu interwencja człowieka nie jest wymagana ani możliwa.",
      },
      card4: {
        title: "4. Prywatność",
        body: "Twoja lista beneficjentów jest przechowywana on-chain i dostępna tylko dla twojego uwierzytelnionego principala Internet Identity. Żadna strona trzecia nie może zobaczyć twoich danych.",
      },
      card5: {
        title: "5. Opłaty",
        body: "Usługa jest świadczona zgodnie z opisem w aplikacji. Wszelkie opłaty dotyczące konkretnej czynności są jasno pokazane w aplikacji przed jej potwierdzeniem — bez ukrytych lub cyklicznych opłat.",
      },
      card6: {
        title: "6. Kwalifikowalność",
        body: "Musisz mieć co najmniej 18 lat (lub wiek pełnoletności w twojej jurysdykcji) i posiadać zdolność prawną do zawarcia niniejszych warunków, aby korzystać z tej usługi.",
      },
      card7: {
        title: "7. Brak Gwarancji",
        body: "Usługa jest świadczona «tak jak jest» i «jak dostępna», bez jakichkolwiek gwarancji, wyraźnych lub dorozumianych, w tym jakiejkolwiek gwarancji nieprzerwanego lub bezbłędnego działania.",
      },
      card8: {
        title: "8. Przyjęcie Ryzyka",
        body: "Kryptowaluty i technologia blockchain niosą ze sobą nieodłączne ryzyko, w tym zmienność cen, przeciążenie sieci, podatności inteligentnych kontraktów i zmiany w bazowych protokołach. Korzystając z tej usługi, akceptujesz te ryzyka.",
      },
      card9: {
        title: "9. Wypowiedzenie",
        body: "Dostęp do tej usługi może zostać zawieszony lub wypowiedziany z powodu naruszenia niniejszych warunków lub zachowania, które Sovereign Legacy uzna, według własnego uznania, za szkodliwe dla innych użytkowników lub samej usługi.",
      },
      card10: {
        title: "10. Zmiany Niniejszych Warunków",
        body: "Niniejsze warunki mogą być od czasu do czasu aktualizowane. Istotne zmiany zostaną przedstawione w aplikacji, a dalsze korzystanie z usługi po takich zmianach stanowi akceptację zaktualizowanych warunków.",
      },
    },
  },
  dashboard: {
    eyebrow: "Pulpit",
    title: "Skarbiec",
    balance: "Saldo Skarbca",
    assetsHeld: "Przechowywane aktywa: {count}",
    noAssets: "Brak przechowywanych aktywów",
    beneficiaries: "Beneficjenci",
    named: "wyznaczonych",
    sealed: "Zapieczętowano beneficjentów: {count}",
    none: "Brak beneficjentów",
    allocation: "Przydział Beneficjentów",
    allocationNone: "Brak przydziałów. Dodaj beneficjenta, aby rozpocząć.",
    allocationAria: "Udziały przydziału beneficjentów",
    allocated: "przydzielono",
    switch: "Przełącznik",
    lastVerified: "Ostatnia weryfikacja · {time}",
    notVerified: "Jeszcze nie zweryfikowano",
  },
  beneficiaries: {
    eyebrow: "Beneficjenci",
    title: "Beneficjenci",
    subtitle:
      "Ludzie i sprawy, dla których zapieczętowana jest twoja spuścizna. Przydział, kolejność i warunki mieszkają tutaj.",
    allocation: "Przydział",
    count: "Beneficjenci: {count}",
    noAllocations: "Brak przydziałów. Dodaj beneficjenta, aby rozpocząć.",
    allocationAria: "Udziały przydziału beneficjentów",
    manage: "Zarządzaj",
    manageBody:
      "Dodaj beneficjenta i przydziel mu udział w skarbcu. Udziały można edytować lub odwoływać w dowolnym momencie.",
    loadError: "Nie udało się załadować beneficjentów. Spróbuj ponownie.",
    emptyTitle: "Brak beneficjentów",
    emptyBody:
      "Twoja spuścizna nie jest przypisana. Dodaj pierwszego beneficjenta, aby zapieczętować skarbiec dla kogoś.",
    noWallet: "Brak adresu portfela",
    editAria: "Edytuj {name}",
    removeAria: "Usuń {name}",
    modal: {
      editTitle: "Edytuj beneficjenta",
      addTitle: "Dodaj beneficjenta",
      editDesc:
        "Zaktualizuj imię, udział lub adres portfela tego beneficjenta.",
      addDesc: "Przypisz nowemu beneficjentowi imię i udział w przydziale.",
    },
    namePlaceholder: "np. Elena Marchetti",
    sharePlaceholder: "np. 40",
    errors: {
      nameRequired: "Wprowadź imię dla tego beneficjenta.",
      sharePositive: "Udział w przydziale musi być większy od zera.",
      invalidChecksum:
        "Ten identyfikator konta ICP ma nieprawidłową sumę kontrolną. Sprawdź adres.",
      invalidWallet:
        "Wprowadź prawidłowy adres portfela ICP — 64-znakowy identyfikator konta lub principal ICP.",
      totalExceedsEdit:
        "To zwiększy łączny przydział do {total}%, przekraczając limit 100%.",
      totalExceedsAdd:
        "Łączny przydział wyniesie {total}%, przekraczając limit 100%.",
      saveFailed: "Nie udało się zapisać zmian. Spróbuj ponownie.",
      addFailed: "Nie udało się dodać beneficjenta. Spróbuj ponownie.",
    },
  },
  assets: {
    eyebrow: "Spuścizna i Aktywa",
    title: "Przechowywane Aktywa",
    subtitle:
      "Wszystko, co znajduje się w skarbcu — salda, zasoby i instrukcje, które nimi rządzą.",
    assetsHeld: "Przechowywane Aktywa",
    beneficiaries: "Beneficjenci",
    allocationStatus: "Status Przydziału",
    sealed: "Zapieczętowany",
    unallocated: "Nieprzydzielony",
    beneficiaryFallback: "Beneficjent #{id}",
    errorEyebrow: "Skarbiec niedostępny",
    errorBody:
      "Nie udało się odczytać przechowywanych aktywów. Spróbuj ponownie.",
    emptyEyebrow: "Brak przechowywanych aktywów",
    emptyBody:
      "Skarbiec obecnie nie przechowuje aktywów kryptowalutowych. Po dodaniu aktywów ich salda i przydziały dla beneficjentów pojawią się tutaj.",
    allocationLabel: "Przydział Beneficjentów",
  },
  switch: {
    eyebrow: "Przełącznik",
    title: "Przełącznik",
    subtitle:
      "Jedyna kontrola, która przekazuje skarbiec. Uzbrojony, zweryfikowany i przemyślany.",
    active: "Aktywny · Wyłącznik martwego człowieka",
    standingDown: "W gotowości",
    armed: "UZBROJONY",
    disarmed: "ROZBROJONY",
    checkIn: "Wciąż tu jestem",
    arm: "Uzbrój przełącznik",
    disarm: "Rozbrój",
    cadence: "Częstotliwość · {duration}",
    releaseIn: "Zwolnienie za {duration}",
    timelineAriaArmed:
      "Oś czasu wyłącznika martwego człowieka, upłynęło {percent}% częstotliwości",
    timelineAriaDisarmed: "Oś czasu wyłącznika martwego człowieka, rozbrojony",
    lastCheckIn: "Ostatnie logowanie",
    armedAt: "Uzbrojony o",
    cadenceLabel: "Częstotliwość",
    standingDownTitle: "W gotowości",
    standingDownBody:
      "Rozbrojenie zatrzymuje wyłącznik martwego człowieka. Skarbiec pozostaje zapieczętowany, ale nie zwolni już aktywów twoim beneficjentom po pominiętym logowaniu.",
    disarmTheSwitch: "Rozbrój przełącznik",
    armTitle: "Uzbrój przełącznik",
    armBody:
      "Wybierz, jak długo skarbiec czeka na twoje następne logowanie. Jeśli je pominiesz, skarbiec zwolni aktywa twoim beneficjentom.",
    cadenceError:
      "Wybierz częstotliwość logowania większą od zera przed uzbrojeniem przełącznika.",
    errorEyebrow: "Przełącznik niedostępny",
    errorBody: "Nie udało się odczytać stanu przełącznika. Spróbuj ponownie.",
    cadence24h: "24 godziny",
    cadence7d: "7 dni",
    cadence30d: "30 dni",
  },
  audit: {
    eyebrow: "Dzienniki Audytu",
    title: "Dzienniki Audytu",
    ledger: "Rejestr Zdarzeń",
    count: "Zapieczętowano zdarzeń: {count}",
    timestamp: "Znacznik czasu",
    event: "Zdarzenie",
    description: "Opis",
    tableAria: "Dziennik audytu skarbca",
    errorEyebrow: "Rejestr niedostępny",
    errorBody: "Nie udało się odczytać rejestru audytu. Spróbuj ponownie.",
    emptyTitle: "Brak zdarzeń",
    emptyBody:
      "Każda czynność wykonana wobec skarbca zostanie zapieczętowana tutaj, w kolejności, w miarę jej występowania.",
    footer:
      "Każdy wpis jest zapieczętowany w rejestrze. Wpisów nie można edytować ani usuwać.",
  },
  settings: {
    eyebrow: "Ustawienia",
    title: "Konfiguracja Skarbca",
    subtitle:
      "Zachowaj konfigurację zarządzającą twoją spuścizną — stan uzbrojenia/rozbrojenia przełącznika, częstotliwość logowania i beneficjentów, dla których jest zapieczętowany.",
    switchTitle: "Przełącznik",
    switchDesc:
      "Uzbrój lub rozbrój skarbiec i ustaw, jak często ma być weryfikowany.",
    beneficiariesTitle: "Beneficjenci",
    beneficiariesDesc:
      "Edytuj ludzi i sprawy, dla których zapieczętowana jest twoja spuścizna.",
    cadence: "Częstotliwość · {value}",
    daily: "Codziennie",
    weekly: "Co tydzień",
    monthly: "Co miesiąc",
    yearly: "Co rok",
    h24: "24 godziny",
    h7d: "7 dni",
    h30d: "30 dni",
    h365d: "365 dni",
    emptyBeneficiaries: "Brak skonfigurowanych beneficjentów",
    editBeneficiary: "Edytuj beneficjenta",
    editBeneficiaryDesc:
      "Zaktualizuj imię, udział w przydziale i adres portfela tego beneficjenta.",
    removeBeneficiary: "Usuń beneficjenta",
    removeBeneficiaryDesc:
      "Usunąć {name} ze skarbca? Tej operacji nie można cofnąć.",
    toast: {
      armed: "Przełącznik uzbrojony",
      armedDesc: "Częstotliwość logowania ustawiona na {cadence}.",
      armError: "Nie udało się uzbroić przełącznika",
      armErrorDesc: "Skarbiec nie mógł zostać uzbrojony. Spróbuj ponownie.",
      disarmed: "Przełącznik rozbrojony",
      disarmedDesc: "Skarbiec nie jest już uzbrojony.",
      disarmError: "Nie udało się rozbroić przełącznika",
      disarmErrorDesc: "Skarbiec nie mógł zostać rozbrojony. Spróbuj ponownie.",
      beneficiaryUpdated: "Beneficjent zaktualizowany",
      beneficiaryUpdatedDesc: "Konfiguracja beneficjenta została zapisana.",
      updateError: "Nie udało się zaktualizować beneficjenta",
      updateErrorDesc: "Zmiany nie zostały zapisane. Spróbuj ponownie.",
      beneficiaryRemoved: "Beneficjent usunięty",
      beneficiaryRemovedDesc: "Beneficjent został usunięty ze skarbca.",
      removeError: "Nie udało się usunąć beneficjenta",
      removeErrorDesc:
        "Beneficjent nie mógł zostać usunięty. Spróbuj ponownie.",
    },
  },
};
