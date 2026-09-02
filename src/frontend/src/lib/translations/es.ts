import type { Translations } from "@/lib/translations/en";

/** Spanish (es). Falls back to English for any key not covered here. */
export const es: Partial<Translations> = {
  meta: {
    title: "Sovereign Legacy — La Bóveda",
    description:
      "Sovereign Legacy — La Bóveda. Tu bóveda. Sellada hasta que deje de estarlo.",
  },
  common: {
    cancel: "Cancelar",
    saveChanges: "Guardar cambios",
    edit: "Editar",
    remove: "Eliminar",
    name: "Nombre",
    optional: "Opcional",
    addBeneficiary: "Añadir beneficiario",
    allocationShare: "Porcentaje de asignación (%)",
    walletAddress: "Dirección de la cartera",
    checkInCadence: "Cadencia de verificación",
    selectCadence: "Seleccionar cadencia",
    armed: "Armado",
    disarmed: "Desarmado",
    arming: "Armando…",
    disarming: "Desarmando…",
    saving: "Guardando…",
    removing: "Eliminando…",
    arm: "Armar",
    disarm: "Desarmar",
  },
  nav: {
    dashboard: "Panel",
    beneficiaries: "Beneficiarios",
    legacyAssets: "Legado y Activos",
    theSwitch: "El Interruptor",
    auditLogs: "Registros de Auditoría",
    settings: "Ajustes",
  },
  header: {
    home: "Inicio de Sovereign Legacy",
    networkBadge: "Red · Identidad",
    mobileMenu: "Abrir menú de navegación",
    mobilePrimary: "Navegación principal móvil",
  },
  footer: {
    copyright:
      "© {year}. Sovereign Legacy — La Bóveda. Todos los derechos reservados.",
    tagline: "Sellada hasta que deje de estarlo",
  },
  loading: {
    openingVault: "Abriendo la bóveda…",
  },
  language: {
    label: "Idioma",
  },
  landing: {
    eyebrow: "Herencia autosoberana",
    headline1: "Tu bóveda.",
    headline2: "Sellada hasta que deje de estarlo.",
    login: "Iniciar sesión con Internet Identity",
    subhead:
      "Un interruptor de hombre muerto digital para criptoactivos, construido de forma nativa en Internet Computer — sin sucesión judicial, sin demoras, sin nadie observando salvo la cadena misma.",
    vaultDoorAlt:
      "Una puerta de bóveda bancaria de latón y acero desgastados, cerrada, con el emblema del bucle infinito de Internet Computer brillando tenuemente en su centro.",
    introduction: {
      eyebrow: "Introducción",
      heading: "El Interruptor de Hombre Muerto: Nacido en la Era del Vapor",
      p1: "En las últimas décadas del siglo XIX, un nuevo tipo de máquina estaba remodelando la civilización. Los tranvías eléctricos ya recorrían las ciudades abarrotadas y los ascensores elevaban a los pasajeros en edificios de una altura sin precedentes. Eran maravillas, y eran peligrosos.",
      p2: "El problema era simple y aterrador: ¿qué ocurre cuando el hombre al mando ya no está al mando? Un conductor podía sufrir un infarto al volante. Un operador de ascensor podía perder el conocimiento a mitad del trayecto. Y la máquina, indiferente al destino de su operador, simplemente continuaba, hasta chocar con algo que la detuviera.",
      p3: "Fue el ingeniero estadounidense Frank J. Sprague quien, en 1888, electrificó las líneas de tranvía de Richmond, Virginia: el primer ferrocarril eléctrico urbano exitoso de Estados Unidos. Su innovación no se detuvo en el motor. Sprague entendió que un vehículo que transportaba pasajeros a gran velocidad necesitaba una forma de detenerse si el operador quedaba incapacitado.",
      p4: "Lo llamaron el interruptor de hombre muerto. Mantén la manija para seguir avanzando. Suéltala, ya sea por distracción, enfermedad o muerte, y la máquina se detiene sola. El nombre no se eligió por dramatismo, sino por precisión. El interruptor se activaba por la ausencia de la mano viva.",
      p5: "La idea se extendió rápidamente. Los metros de Nueva York, Londres y Tokio la adoptaron. Las centrales nucleares la integraron en sus barras de control. Los aviones comerciales la incorporaron a sus pilotos automáticos. En cualquier lugar donde una máquina transportara vidas, el interruptor de hombre muerto la seguía: silencioso, paciente, a la espera.",
      h3a: "¿Cómo Funciona un Interruptor de Hombre Muerto en Estos Tiempos?",
      p6: "Has trabajado duro. Has acumulado activos de criptomonedas: ICP, Bitcoin, Ethereum, stablecoins. Están en carteras y canisters, protegidos por claves privadas que solo tú posees. Y como el conductor que sujeta la manija, solo tu presencia viva y activa en la red mantiene el circuito cerrado.",
      p7: "Así aplica Sovereign Legacy el mismo principio. Depositas activos en una bóveda canister segura en la cadena. Designas uno o más beneficiarios y estableces un período de inactividad en la red. Mientras inicies sesión periódicamente, el interruptor permanece cerrado. En el momento en que esa actividad cesa, Sovereign Legacy te envía alertas. Si no respondes, la transferencia se ejecuta automáticamente, moviendo tus activos a tus beneficiarios elegidos sin abogados, tribunales ni demoras.",
      h3b: "¿Quieres Personalizar Tus Deseos?",
      p8: "Si deseas más de un destinatario (un cónyuge, hijos, un amigo de confianza, una causa benéfica), Sovereign Legacy te permite dividir tus activos por porcentaje. Tú fijas las participaciones. Tus beneficiarios reciben exactamente lo que pretendías.",
    },
    advantages: {
      eyebrow: "Por qué funciona",
      heading: "Las Ventajas Están Integradas en Cada Paso",
      card1: {
        title: "Sin abogados. Sin sucesiones. Sin demoras.",
        body: "El canister ejecuta tus instrucciones en el momento en que se activa el interruptor de hombre muerto. Ninguna institución se interpone entre tus deseos y las personas que amas.",
      },
      card2: {
        title: "Tú mantienes el control.",
        body: "Cambia beneficiarios, ajusta porcentajes o actualiza tu mensaje en cualquier momento. Todo se actualiza al instante, en la cadena.",
      },
      card3: {
        title: "Funciona mientras duermes.",
        body: "Si la vida continúa, Sovereign Legacy permanece en silencio. Si no, todo avanza exactamente como lo planeaste.",
      },
      card4: {
        title: "Alcance global.",
        body: "Los beneficiarios pueden estar en cualquier parte del mundo. Sovereign Legacy habla varios idiomas y se encarga de la explicación para que tú no tengas que hacerlo.",
      },
      card5: {
        title: "Tus datos siguen siendo tuyos.",
        body: "Tu bóveda es un canister en Internet Computer, protegida por tu Internet Identity. Ningún tercero, incluido el propio Sovereign Legacy, tiene acceso a su contenido.",
      },
    },
    faq: {
      eyebrow: "Preguntas",
      heading: "Preguntas Frecuentes",
      q1: {
        q: "¿Qué idiomas admite Sovereign Legacy?",
        a: "La aplicación admite 22 idiomas, incluidos idiomas de derecha a izquierda como el árabe, el persa y el urdu, para que los beneficiarios de cualquier parte del mundo puedan entender un aviso de liberación en su propio idioma.",
      },
      q2: {
        q: "¿Qué tan segura es mi bóveda?",
        a: "Tu bóveda es un canister en Internet Computer, protegida por tu Internet Identity. Solo tu principal autenticado puede ver o gestionar su contenido.",
      },
      q3: {
        q: "¿Podría perder mi bóveda alguna vez?",
        a: "Mientras conserves acceso a tu Internet Identity, tu bóveda permanece bajo tu control. El principal riesgo es perder tus credenciales de Internet Identity, por eso es importante mantener una copia de seguridad segura de tu método de recuperación.",
      },
      q4: {
        q: "¿Cómo se dividen los activos entre los beneficiarios?",
        a: "Asignas a cada beneficiario un porcentaje. Las participaciones pueden ajustarse en cualquier momento antes de la liberación, y el total asignado entre todos los beneficiarios nunca debe superar el 100%.",
      },
      q5: {
        q: "¿Cómo restablezco el temporizador de inactividad de la red?",
        a: "Simplemente inicia sesión con tu Internet Identity. Cualquier verificación autenticada restablece el reloj de inactividad y mantiene armado el interruptor de hombre muerto.",
      },
      q6: {
        q: "¿Cómo añado un beneficiario?",
        a: "Desde tu panel, abre el apartado de Beneficiarios y añade un nombre, información de contacto y porcentaje de asignación.",
      },
      q7: {
        q: "¿Puedo cambiar mis beneficiarios después de la configuración?",
        a: "Sí. Los beneficiarios, las asignaciones y los mensajes personales pueden actualizarse en cualquier momento: los cambios surten efecto de inmediato, en la cadena.",
      },
      q8: {
        q: "¿Quién puede ver mis beneficiarios?",
        a: "Solo tú, mientras estés autenticado como propietario de la bóveda.",
      },
    },
    terms: {
      eyebrow: "Términos",
      heading: "Términos y Condiciones",
      card1: {
        title: "1. Resumen",
        body: "ICP Sovereign Legacy es una plataforma descentralizada de herencia e interruptor de hombre muerto, totalmente en la cadena, construida sobre el Protocolo de Internet Computer (ICP). Al usar este servicio, aceptas estos términos.",
      },
      card2: {
        title: "2. Sin Responsabilidad",
        body: "Los desarrolladores no son responsables de ninguna pérdida de activos derivada de una configuración incorrecta, credenciales de Internet Identity perdidas, condiciones de la red blockchain o cualquier otra causa. Usa este servicio bajo tu propio riesgo.",
      },
      card3: {
        title: "3. Ejecución Autónoma",
        body: "La distribución de activos se ejecuta automáticamente mediante la lógica de contratos inteligentes en la cadena cuando se activa tu interruptor de hombre muerto. No se requiere ni es posible la intervención humana una vez activado.",
      },
      card4: {
        title: "4. Privacidad",
        body: "Tu lista de beneficiarios se almacena en la cadena y solo es accesible para tu principal autenticado de Internet Identity. Ningún tercero puede ver tus datos.",
      },
      card5: {
        title: "5. Comisiones",
        body: "Este servicio se presta tal como se describe en la aplicación. Cualquier comisión aplicable a una acción concreta se muestra claramente en la aplicación antes de que confirmes esa acción: sin cargos ocultos ni recurrentes.",
      },
      card6: {
        title: "6. Elegibilidad",
        body: "Debes tener al menos 18 años (o la mayoría de edad en tu jurisdicción) y capacidad legal para aceptar estos términos y usar este servicio.",
      },
      card7: {
        title: "7. Sin Garantía",
        body: "Este servicio se presta «tal cual» y «según disponibilidad», sin garantías de ningún tipo, expresas o implícitas, incluida cualquier garantía de funcionamiento ininterrumpido o sin errores.",
      },
      card8: {
        title: "8. Asunción de Riesgos",
        body: "Las criptomonedas y la tecnología blockchain conllevan riesgos inherentes, incluidos la volatilidad de precios, la congestión de la red, las vulnerabilidades de los contratos inteligentes y los cambios en los protocolos subyacentes. Al usar este servicio, aceptas estos riesgos.",
      },
      card9: {
        title: "9. Terminación",
        body: "El acceso a este servicio puede suspenderse o terminarse por violación de estos términos o por conductas que Sovereign Legacy determine, a su discreción, como perjudiciales para otros usuarios o para el propio servicio.",
      },
      card10: {
        title: "10. Modificaciones de Estos Términos",
        body: "Estos términos pueden actualizarse de vez en cuando. Los cambios importantes se presentarán dentro de la aplicación, y el uso continuado del servicio después de dichos cambios constituye la aceptación de los términos actualizados.",
      },
    },
  },
  dashboard: {
    eyebrow: "Panel",
    title: "La Bóveda",
    balance: "Saldo de la Bóveda",
    assetsHeld: "{count} activo(s) en custodia",
    noAssets: "Aún no hay activos",
    beneficiaries: "Beneficiarios",
    named: "designados",
    sealed: "{count} beneficiario(s) sellados",
    none: "Aún no hay beneficiarios",
    allocation: "Asignación de Beneficiarios",
    allocationNone:
      "Aún no hay asignaciones. Añade un beneficiario para empezar.",
    allocationAria: "Participaciones de asignación de beneficiarios",
    switch: "El Interruptor",
    lastVerified: "Última verificación · {time}",
    notVerified: "Aún no verificado",
  },
  beneficiaries: {
    eyebrow: "Beneficiarios",
    title: "Beneficiarios",
    subtitle:
      "Las personas y causas para las que está sellado tu legado. La asignación, el orden y las condiciones viven aquí.",
    allocation: "Asignación",
    count: "{count} beneficiario(s)",
    noAllocations:
      "Aún no hay asignaciones. Añade un beneficiario para empezar.",
    allocationAria: "Participaciones de asignación de beneficiarios",
    manage: "Gestionar",
    manageBody:
      "Añade un beneficiario y asigna su parte de la bóveda. Las participaciones pueden editarse o revocarse en cualquier momento.",
    loadError: "No se pudieron cargar los beneficiarios. Inténtalo de nuevo.",
    emptyTitle: "Aún no hay beneficiarios",
    emptyBody:
      "Tu legado no está asignado. Añade tu primer beneficiario para sellar la bóveda para alguien.",
    noWallet: "Sin dirección de cartera",
    editAria: "Editar {name}",
    removeAria: "Eliminar {name}",
    modal: {
      editTitle: "Editar beneficiario",
      addTitle: "Añadir beneficiario",
      editDesc:
        "Actualiza el nombre, la participación o la dirección de cartera de este beneficiario.",
      addDesc: "Asigna un nombre y una participación a un nuevo beneficiario.",
    },
    namePlaceholder: "p. ej. Elena Marchetti",
    sharePlaceholder: "p. ej. 40",
    errors: {
      nameRequired: "Introduce un nombre para este beneficiario.",
      sharePositive: "La participación debe ser mayor que cero.",
      invalidChecksum:
        "Este identificador de cuenta ICP tiene una suma de verificación no válida. Revisa la dirección.",
      invalidWallet:
        "Introduce una dirección de cartera ICP válida: un identificador de cuenta de 64 caracteres o un principal ICP.",
      totalExceedsEdit:
        "Esto elevaría la asignación total al {total}%, superando el límite del 100%.",
      totalExceedsAdd:
        "La asignación total sería del {total}%, superando el límite del 100%.",
      saveFailed: "No se pudieron guardar los cambios. Inténtalo de nuevo.",
      addFailed: "No se pudo añadir el beneficiario. Inténtalo de nuevo.",
    },
  },
  assets: {
    eyebrow: "Legado y Activos",
    title: "Activos en Custodia",
    subtitle:
      "Todo lo que se guarda en la bóveda: saldos, tenencias y las instrucciones que los rigen.",
    assetsHeld: "Activos en Custodia",
    beneficiaries: "Beneficiarios",
    allocationStatus: "Estado de Asignación",
    sealed: "Sellado",
    unallocated: "Sin asignar",
    beneficiaryFallback: "Beneficiario #{id}",
    errorEyebrow: "Bóveda inaccesible",
    errorBody: "No pudimos leer los activos en custodia. Inténtalo de nuevo.",
    emptyEyebrow: "No hay activos en custodia",
    emptyBody:
      "La bóveda no contiene actualmente activos de criptomonedas. Cuando se añadan activos, sus saldos y asignaciones a beneficiarios aparecerán aquí.",
    allocationLabel: "Asignación de Beneficiarios",
  },
  switch: {
    eyebrow: "El Interruptor",
    title: "El Interruptor",
    subtitle:
      "El único control que entrega la bóveda. Armado, verificado y deliberado.",
    active: "Activo · Interruptor de hombre muerto",
    standingDown: "En reposo",
    armed: "ARMADO",
    disarmed: "DESARMADO",
    checkIn: "Sigo aquí",
    arm: "Armar el interruptor",
    disarm: "Desarmar",
    cadence: "Cadencia · {duration}",
    releaseIn: "Liberación en {duration}",
    timelineAriaArmed:
      "Cronología del interruptor de hombre muerto, {percent}% de la cadencia transcurrida",
    timelineAriaDisarmed:
      "Cronología del interruptor de hombre muerto, desarmado",
    lastCheckIn: "Última verificación",
    armedAt: "Armado el",
    cadenceLabel: "Cadencia",
    standingDownTitle: "En reposo",
    standingDownBody:
      "Desarmar detiene el interruptor de hombre muerto. La bóveda permanece sellada, pero ya no se liberará a tus beneficiarios si se pierde una verificación.",
    disarmTheSwitch: "Desarmar el interruptor",
    armTitle: "Armar el interruptor",
    armBody:
      "Elige cuánto tiempo espera la bóveda tu próxima verificación. Si la pierdes, la bóveda se libera a tus beneficiarios.",
    cadenceError:
      "Elige una cadencia de verificación mayor que cero antes de armar el interruptor.",
    errorEyebrow: "Interruptor inaccesible",
    errorBody: "No pudimos leer el estado del interruptor. Inténtalo de nuevo.",
    cadence24h: "24 horas",
    cadence7d: "7 días",
    cadence30d: "30 días",
  },
  audit: {
    eyebrow: "Registros de Auditoría",
    title: "Registros de Auditoría",
    ledger: "Registro de Eventos",
    count: "{count} evento(s) sellados",
    timestamp: "Marca de tiempo",
    event: "Evento",
    description: "Descripción",
    tableAria: "Registro de auditoría de la bóveda",
    errorEyebrow: "Registro inaccesible",
    errorBody: "No pudimos leer el registro de auditoría. Inténtalo de nuevo.",
    emptyTitle: "Aún no hay eventos",
    emptyBody:
      "Cada acción realizada contra la bóveda quedará sellada aquí, en orden, a medida que ocurra.",
    footer:
      "Cada entrada está sellada en el registro. Las entradas no pueden editarse ni eliminarse.",
  },
  settings: {
    eyebrow: "Ajustes",
    title: "Configuración de la Bóveda",
    subtitle:
      "Conserva la configuración que rige tu legado: el estado de armado/desarmado del Interruptor, su cadencia de verificación y los beneficiarios para los que está sellado.",
    switchTitle: "El Interruptor",
    switchDesc:
      "Arma o desarma la bóveda y establece con qué frecuencia debe verificarse.",
    beneficiariesTitle: "Beneficiarios",
    beneficiariesDesc:
      "Edita las personas y causas para las que está sellado tu legado.",
    cadence: "Cadencia · {value}",
    daily: "Diario",
    weekly: "Semanal",
    monthly: "Mensual",
    yearly: "Anual",
    h24: "24 horas",
    h7d: "7 días",
    h30d: "30 días",
    h365d: "365 días",
    emptyBeneficiaries: "Aún no hay beneficiarios configurados",
    editBeneficiary: "Editar beneficiario",
    editBeneficiaryDesc:
      "Actualiza el nombre, la participación y la dirección de cartera de este beneficiario.",
    removeBeneficiary: "Eliminar beneficiario",
    removeBeneficiaryDesc:
      "¿Eliminar a {name} de la bóveda? Esta acción no se puede deshacer.",
    toast: {
      armed: "El Interruptor se ha armado",
      armedDesc: "Cadencia de verificación establecida en {cadence}.",
      armError: "No se pudo armar el Interruptor",
      armErrorDesc: "La bóveda no pudo armarse. Inténtalo de nuevo.",
      disarmed: "El Interruptor se ha desarmado",
      disarmedDesc: "La bóveda ya no está armada.",
      disarmError: "No se pudo desarmar el Interruptor",
      disarmErrorDesc: "La bóveda no pudo desarmarse. Inténtalo de nuevo.",
      beneficiaryUpdated: "Beneficiario actualizado",
      beneficiaryUpdatedDesc:
        "La configuración del beneficiario se ha guardado.",
      updateError: "No se pudo actualizar el beneficiario",
      updateErrorDesc: "Los cambios no se guardaron. Inténtalo de nuevo.",
      beneficiaryRemoved: "Beneficiario eliminado",
      beneficiaryRemovedDesc: "El beneficiario se ha eliminado de la bóveda.",
      removeError: "No se pudo eliminar el beneficiario",
      removeErrorDesc:
        "El beneficiario no pudo eliminarse. Inténtalo de nuevo.",
    },
  },
};
