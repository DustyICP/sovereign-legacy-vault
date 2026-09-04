import type { Translations } from "@/lib/translations/en";

/** Portuguese (pt). Falls back to English for any key not covered here. */
export const pt: Partial<Translations> = {
  meta: {
    title: "Sovereign Legacy — O Cofre",
    description:
      "Sovereign Legacy — O Cofre. O seu cofre. Selado até deixar de estar.",
  },
  common: {
    cancel: "Cancelar",
    saveChanges: "Guardar alterações",
    edit: "Editar",
    remove: "Remover",
    name: "Nome",
    optional: "Opcional",
    addBeneficiary: "Adicionar beneficiário",
    allocationShare: "Percentagem de atribuição (%)",
    walletAddress: "Endereço da carteira",
    checkInCadence: "Cadência de verificação",
    selectCadence: "Selecionar cadência",
    armed: "Armado",
    disarmed: "Desarmado",
    arming: "A armar…",
    disarming: "A desarmar…",
    saving: "A guardar…",
    removing: "A remover…",
    arm: "Armar",
    disarm: "Desarmar",
  },
  nav: {
    dashboard: "Painel",
    beneficiaries: "Beneficiários",
    legacyAssets: "Legado e Ativos",
    theSwitch: "O Interruptor",
    auditLogs: "Registos de Auditoria",
    settings: "Definições",
  },
  header: {
    home: "Início do Sovereign Legacy",
    networkBadge: "Rede · Identidade",
    mobileMenu: "Abrir menu de navegação",
    mobilePrimary: "Navegação principal móvel",
  },
  footer: {
    copyright:
      "© {year}. Sovereign Legacy — O Cofre. Todos os direitos reservados.",
    tagline: "Selado até deixar de estar",
  },
  loading: {
    openingVault: "A abrir o cofre…",
  },
  language: {
    label: "Idioma",
  },
  landing: {
    eyebrow: "Herança autossoberana",
    headline1: "Seu cofre.",
    headline2: "Selado até deixar de ser.",
    login: "Entrar com Internet Identity",
    subhead:
      "Um interruptor de homem morto digital para criptoativos, construído nativamente no Internet Computer — sem inventário, sem atrasos, sem ninguém observando além da própria cadeia.",
    vaultDoorAlt:
      "Uma porta de cofre bancário de latão e aço desgastados, fechada, com o emblema do laço infinito da Internet Computer brilhando levemente ao centro.",
    introduction: {
      eyebrow: "Introdução",
      heading: "O Interruptor de Homem Morto — Nascido na Era do Vapor",
      p1: "Nas últimas décadas do século XIX, um novo tipo de máquina remodelava a civilização. Os elétricos atravessavam agora as cidades apinhadas e os elevadores erguiam os passageiros em edifícios de altura sem precedentes. Eram maravilhas — e eram perigosos.",
      p2: "O problema era simples e aterrador: o que acontece quando o homem no comando deixa de estar no comando? Um condutor podia sofrer um ataque cardíaco ao volante. Um operador de elevador podia perder a consciência a meio da viagem. E a máquina, indiferente ao destino do seu operador, simplesmente continuava — até embater em algo que a detivesse.",
      p3: "Foi o engenheiro americano Frank J. Sprague quem, em 1888, eletrificou as linhas de elétrico de Richmond, na Virgínia — o primeiro caminho de ferro elétrico urbano bem-sucedido dos Estados Unidos. A sua inovação não parou no motor. Sprague percebeu que um veículo que transportava passageiros a alta velocidade precisava de uma forma de se deter se o operador ficasse incapacitado.",
      p4: "Chamaram-lhe o interruptor de homem morto. Segure na pega para continuar a avançar. Solte-a — seja por distração, doença ou morte — e a máquina detém-se sozinha. O nome não foi escolhido por drama. Foi escolhido por precisão. O interruptor era ativado pela ausência da mão viva.",
      p5: "A ideia espalhou-se rapidamente. Os metros de Nova Iorque, Londres e Tóquio adotaram-na. As centrais nucleares integraram-na nas suas barras de controlo. Os aviões comerciais incorporaram-na nos seus pilotos automáticos. Em qualquer lugar onde uma máquina transportasse vidas, o interruptor de homem morto seguia — silencioso, paciente, à espera.",
      h3a: "Como Funciona um Interruptor de Homem Morto nos Dias de Hoje?",
      p6: "Trabalhou arduamente. Acumulou ativos de criptomoedas — ICP, Bitcoin, Ethereum, stablecoins. Estão em carteiras e canisters, protegidos por chaves privadas que só você possui. E como o condutor que agarra a pega, só a sua presença viva e ativa na rede mantém o circuito fechado.",
      p7: "Eis como o Sovereign Legacy aplica o mesmo princípio. Deposita ativos num cofre canister seguro na cadeia. Designa um ou mais beneficiários e define um período de inatividade na rede. Enquanto iniciar sessão periodicamente, o interruptor permanece fechado. No momento em que essa atividade cessa, o Sovereign Legacy envia-lhe alertas. Se não responder, a transferência é executada automaticamente, movendo os seus ativos para os beneficiários escolhidos, sem advogados, tribunais ou atrasos.",
      h3b: "Quer Personalizar os Seus Desejos?",
      p8: "Se quiser mais do que um destinatário — um cônjuge, filhos, um amigo de confiança, uma causa de caridade — o Sovereign Legacy permite-lhe dividir os seus ativos por percentagem. Você define as partes. Os seus beneficiários recebem exatamente o que pretendia.",
    },
    advantages: {
      eyebrow: "Porque funciona",
      heading: "As Vantagens Estão Integradas em Cada Passo",
      card1: {
        title: "Sem advogados. Sem inventário. Sem atrasos.",
        body: "O canister executa as suas instruções no momento em que o interruptor de homem morto dispara. Nenhuma instituição se interpõe entre os seus desejos e as pessoas que ama.",
      },
      card2: {
        title: "Você mantém o controlo.",
        body: "Altere beneficiários, ajuste percentagens ou atualize a sua mensagem a qualquer momento. Tudo é atualizado instantaneamente, na cadeia.",
      },
      card3: {
        title: "Funciona enquanto dorme.",
        body: "Se a vida continuar, o Sovereign Legacy permanece em silêncio. Se não continuar, tudo avança exatamente como planeou.",
      },
      card4: {
        title: "Alcance global.",
        body: "Os beneficiários podem estar em qualquer parte do mundo. O Sovereign Legacy fala várias línguas e trata da explicação para que você não tenha de o fazer.",
      },
      card5: {
        title: "Os seus dados continuam seus.",
        body: "O seu cofre é um canister no Internet Computer, protegido pela sua Internet Identity. Nenhum terceiro — incluindo o próprio Sovereign Legacy — tem acesso ao seu conteúdo.",
      },
    },
    faq: {
      eyebrow: "Perguntas",
      heading: "Perguntas Frequentes",
      q1: {
        q: "Que idiomas o Sovereign Legacy suporta?",
        a: "A aplicação suporta 22 idiomas, incluindo idiomas da direita para a esquerda como o árabe, o persa e o urdu, para que beneficiários em qualquer parte do mundo possam compreender um aviso de libertação no seu próprio idioma.",
      },
      q2: {
        q: "Quão seguro é o meu cofre?",
        a: "O seu cofre é um canister no Internet Computer, protegido pela sua Internet Identity. Apenas o seu principal autenticado pode ver ou gerir o seu conteúdo.",
      },
      q3: {
        q: "Poderei alguma vez perder o meu cofre?",
        a: "Enquanto mantiver acesso à sua Internet Identity, o seu cofre permanece sob o seu controlo. O principal risco é perder as suas credenciais de Internet Identity, por isso é importante manter uma cópia de segurança segura do seu método de recuperação.",
      },
      q4: {
        q: "Como são divididos os ativos entre os beneficiários?",
        a: "Atribui a cada beneficiário uma parte percentual. As partes podem ser ajustadas a qualquer momento antes da libertação, e o total atribuído a todos os beneficiários nunca deve exceder 100%.",
      },
      q5: {
        q: "Como reponho o temporizador de inatividade da rede?",
        a: "Basta iniciar sessão com a sua Internet Identity. Qualquer verificação autenticada repõe o relógio de inatividade e mantém o interruptor de homem morto armado.",
      },
      q6: {
        q: "Como adiciono um beneficiário?",
        a: "A partir do seu painel, abra o painel Beneficiários e adicione um nome, informações de contacto e percentagem de atribuição.",
      },
      q7: {
        q: "Posso alterar os meus beneficiários após a configuração?",
        a: "Sim. Beneficiários, atribuições e mensagens pessoais podem ser atualizados a qualquer momento — as alterações entram em vigor imediatamente, na cadeia.",
      },
      q8: {
        q: "Quem pode ver os meus beneficiários?",
        a: "Apenas você, enquanto estiver autenticado como proprietário do cofre.",
      },
    },
    terms: {
      eyebrow: "Termos",
      heading: "Termos e Condições",
      card1: {
        title: "1. Visão Geral",
        body: "O ICP Sovereign Legacy é uma plataforma descentralizada de herança e interruptor de homem morto, totalmente na cadeia, construída sobre o Protocolo Internet Computer (ICP). Ao utilizar este serviço, concorda com estes termos.",
      },
      card2: {
        title: "2. Sem Responsabilidade",
        body: "Os programadores não são responsáveis por qualquer perda de ativos resultante de configuração incorreta, credenciais de Internet Identity perdidas, condições da rede blockchain ou qualquer outra causa. Utilize este serviço por sua conta e risco.",
      },
      card3: {
        title: "3. Execução Autónoma",
        body: "A distribuição de ativos é executada automaticamente pela lógica de contratos inteligentes na cadeia quando o seu interruptor de homem morto dispara. Nenhuma intervenção humana é necessária ou possível depois de disparado.",
      },
      card4: {
        title: "4. Privacidade",
        body: "A sua lista de beneficiários é armazenada na cadeia e acessível apenas ao seu principal autenticado de Internet Identity. Nenhum terceiro pode ver os seus dados.",
      },
      card5: {
        title: "5. Taxas",
        body: "Este serviço é prestado conforme descrito na aplicação. Quaisquer taxas aplicáveis a uma ação específica são mostradas claramente na aplicação antes de confirmar essa ação — sem cobranças ocultas ou recorrentes.",
      },
      card6: {
        title: "6. Elegibilidade",
        body: "Deve ter pelo menos 18 anos (ou a maioridade na sua jurisdição) e capacidade legal para celebrar estes termos para utilizar este serviço.",
      },
      card7: {
        title: "7. Sem Garantia",
        body: "Este serviço é prestado «tal como está» e «conforme disponível», sem garantias de qualquer tipo, expressas ou implícitas, incluindo qualquer garantia de funcionamento ininterrupto ou sem erros.",
      },
      card8: {
        title: "8. Assunção de Riscos",
        body: "As criptomoedas e a tecnologia blockchain acarretam riscos inerentes, incluindo volatilidade de preços, congestionamento da rede, vulnerabilidades de contratos inteligentes e alterações nos protocolos subjacentes. Ao utilizar este serviço, aceita estes riscos.",
      },
      card9: {
        title: "9. Rescisão",
        body: "O acesso a este serviço pode ser suspenso ou rescindido por violação destes termos ou por conduta que o Sovereign Legacy determine, a seu critério, como prejudicial para outros utilizadores ou para o próprio serviço.",
      },
      card10: {
        title: "10. Modificações Destes Termos",
        body: "Estes termos podem ser atualizados de tempos a tempos. As alterações materiais serão apresentadas na aplicação, e a utilização continuada do serviço após tais alterações constitui aceitação dos termos atualizados.",
      },
    },
  },
  dashboard: {
    eyebrow: "Painel",
    title: "O Cofre",
    balance: "Saldo do Cofre",
    assetsHeld: "{count} ativo(s) detido(s)",
    noAssets: "Ainda sem ativos detidos",
    beneficiaries: "Beneficiários",
    named: "designados",
    sealed: "{count} beneficiário(s) selado(s)",
    none: "Ainda sem beneficiários",
    allocation: "Atribuição de Beneficiários",
    allocationNone:
      "Ainda sem atribuições. Adicione um beneficiário para começar.",
    allocationAria: "Partes de atribuição dos beneficiários",
    allocated: "atribuído",
    switch: "O Interruptor",
    lastVerified: "Última verificação · {time}",
    notVerified: "Ainda não verificado",
  },
  beneficiaries: {
    eyebrow: "Beneficiários",
    title: "Beneficiários",
    subtitle:
      "As pessoas e causas para as quais o seu legado está selado. A atribuição, a ordem e as condições vivem aqui.",
    allocation: "Atribuição",
    count: "{count} beneficiário(s)",
    noAllocations:
      "Ainda sem atribuições. Adicione um beneficiário para começar.",
    allocationAria: "Partes de atribuição dos beneficiários",
    manage: "Gerir",
    manageBody:
      "Adicione um beneficiário e atribua-lhe a sua parte do cofre. As partes podem ser editadas ou revogadas a qualquer momento.",
    loadError: "Não foi possível carregar os beneficiários. Tente novamente.",
    emptyTitle: "Ainda sem beneficiários",
    emptyBody:
      "O seu legado não está atribuído. Adicione o seu primeiro beneficiário para selar o cofre para alguém.",
    noWallet: "Sem endereço de carteira",
    editAria: "Editar {name}",
    removeAria: "Remover {name}",
    modal: {
      editTitle: "Editar beneficiário",
      addTitle: "Adicionar beneficiário",
      editDesc:
        "Atualize o nome, a parte ou o endereço da carteira deste beneficiário.",
      addDesc:
        "Atribua um nome e uma parte de atribuição a um novo beneficiário.",
    },
    namePlaceholder: "p. ex. Elena Marchetti",
    sharePlaceholder: "p. ex. 40",
    errors: {
      nameRequired: "Introduza um nome para este beneficiário.",
      sharePositive: "A parte de atribuição deve ser maior que zero.",
      invalidChecksum:
        "Este identificador de conta ICP tem uma soma de verificação inválida. Verifique o endereço.",
      invalidWallet:
        "Introduza um endereço de carteira ICP válido — um identificador de conta de 64 caracteres ou um principal ICP.",
      totalExceedsEdit:
        "Isto elevaria a atribuição total para {total}%, excedendo o limite de 100%.",
      totalExceedsAdd:
        "A atribuição total seria de {total}%, excedendo o limite de 100%.",
      saveFailed: "Não foi possível guardar as alterações. Tente novamente.",
      addFailed: "Não foi possível adicionar o beneficiário. Tente novamente.",
    },
  },
  assets: {
    eyebrow: "Legado e Ativos",
    title: "Ativos Detidos",
    subtitle:
      "Tudo o que está guardado no cofre — saldos, participações e as instruções que os regem.",
    assetsHeld: "Ativos Detidos",
    beneficiaries: "Beneficiários",
    allocationStatus: "Estado da Atribuição",
    sealed: "Selado",
    unallocated: "Não atribuído",
    beneficiaryFallback: "Beneficiário #{id}",
    errorEyebrow: "Cofre inacessível",
    errorBody: "Não foi possível ler os ativos detidos. Tente novamente.",
    emptyEyebrow: "Sem ativos detidos",
    emptyBody:
      "O cofre não contém atualmente ativos de criptomoedas. Quando forem adicionados ativos, os seus saldos e atribuições aos beneficiários aparecerão aqui.",
    allocationLabel: "Atribuição de Beneficiários",
  },
  switch: {
    eyebrow: "O Interruptor",
    title: "O Interruptor",
    subtitle:
      "O único controlo que entrega o cofre. Armado, verificado e deliberado.",
    active: "Ativo · Interruptor de homem morto",
    standingDown: "Em repouso",
    armed: "ARMADO",
    disarmed: "DESARMADO",
    checkIn: "Ainda estou aqui",
    arm: "Armar o interruptor",
    disarm: "Desarmar",
    cadence: "Cadência · {duration}",
    releaseIn: "Libertação em {duration}",
    timelineAriaArmed:
      "Cronologia do interruptor de homem morto, {percent}% da cadência decorrida",
    timelineAriaDisarmed: "Cronologia do interruptor de homem morto, desarmado",
    lastCheckIn: "Última verificação",
    armedAt: "Armado em",
    cadenceLabel: "Cadência",
    standingDownTitle: "Em repouso",
    standingDownBody:
      "Desarmar interrompe o interruptor de homem morto. O cofre permanece selado, mas deixará de libertar para os seus beneficiários numa verificação falhada.",
    disarmTheSwitch: "Desarmar o interruptor",
    armTitle: "Armar o interruptor",
    armBody:
      "Escolha quanto tempo o cofre espera pela sua próxima verificação. Se a falhar, o cofre liberta-se para os seus beneficiários.",
    cadenceError:
      "Escolha uma cadência de verificação maior que zero antes de armar o interruptor.",
    errorEyebrow: "Interruptor inacessível",
    errorBody: "Não foi possível ler o estado do interruptor. Tente novamente.",
    cadence24h: "24 horas",
    cadence7d: "7 dias",
    cadence30d: "30 dias",
  },
  audit: {
    eyebrow: "Registos de Auditoria",
    title: "Registos de Auditoria",
    ledger: "Registo de Eventos",
    count: "{count} evento(s) selado(s)",
    timestamp: "Data/hora",
    event: "Evento",
    description: "Descrição",
    tableAria: "Registo de auditoria do cofre",
    errorEyebrow: "Registo inacessível",
    errorBody: "Não foi possível ler o registo de auditoria. Tente novamente.",
    emptyTitle: "Ainda sem eventos",
    emptyBody:
      "Cada ação executada contra o cofre será selada aqui, por ordem, à medida que acontece.",
    footer:
      "Cada entrada está selada no registo. As entradas não podem ser editadas nem removidas.",
  },
  settings: {
    eyebrow: "Definições",
    title: "Configuração do Cofre",
    subtitle:
      "Preserve a configuração que rege o seu legado — o estado armado/desarmado do Interruptor, a sua cadência de verificação e os beneficiários para os quais está selado.",
    switchTitle: "O Interruptor",
    switchDesc:
      "Arme ou desarme o cofre e defina com que frequência deve ser verificado.",
    beneficiariesTitle: "Beneficiários",
    beneficiariesDesc:
      "Edite as pessoas e causas para as quais o seu legado está selado.",
    cadence: "Cadência · {value}",
    daily: "Diário",
    weekly: "Semanal",
    monthly: "Mensal",
    yearly: "Anual",
    h24: "24 horas",
    h7d: "7 dias",
    h30d: "30 dias",
    h365d: "365 dias",
    emptyBeneficiaries: "Ainda sem beneficiários configurados",
    editBeneficiary: "Editar beneficiário",
    editBeneficiaryDesc:
      "Atualize o nome, a parte de atribuição e o endereço da carteira deste beneficiário.",
    removeBeneficiary: "Remover beneficiário",
    removeBeneficiaryDesc:
      "Remover {name} do cofre? Esta ação não pode ser anulada.",
    toast: {
      armed: "O Interruptor foi armado",
      armedDesc: "Cadência de verificação definida para {cadence}.",
      armError: "Não foi possível armar o Interruptor",
      armErrorDesc: "O cofre não pôde ser armado. Tente novamente.",
      disarmed: "O Interruptor foi desarmado",
      disarmedDesc: "O cofre já não está armado.",
      disarmError: "Não foi possível desarmar o Interruptor",
      disarmErrorDesc: "O cofre não pôde ser desarmado. Tente novamente.",
      beneficiaryUpdated: "Beneficiário atualizado",
      beneficiaryUpdatedDesc: "A configuração do beneficiário foi guardada.",
      updateError: "Não foi possível atualizar o beneficiário",
      updateErrorDesc: "As alterações não foram guardadas. Tente novamente.",
      beneficiaryRemoved: "Beneficiário removido",
      beneficiaryRemovedDesc: "O beneficiário foi removido do cofre.",
      removeError: "Não foi possível remover o beneficiário",
      removeErrorDesc: "O beneficiário não pôde ser removido. Tente novamente.",
    },
  },
};
