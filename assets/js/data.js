/* ============================================================
   SEVEN Medical Company — Catálogo de equipos
   Los datos técnicos provienen de las fichas y brochures
   oficiales de Mindray distribuidos por SEVEN Medical Company.
   ============================================================ */

window.SEVEN_CATS = [
  { key: 'todos',      label: 'Todos los equipos' },
  { key: 'radiologia', label: 'Radiología',        note: 'Diagnóstico general de alta gama' },
  { key: 'mujer',      label: 'Salud de la mujer', note: 'Serie Nuewa' },
  { key: 'general',    label: 'Imagen general',    note: 'Series MX y MU' },
  { key: 'cardio',     label: 'Cardiología',       note: 'Serie Recho' },
  { key: 'poc',        label: 'Punto de atención', note: 'Emergencias y cuidados críticos' }
];

window.SEVEN_PRODUCTS = [

  /* ---------------- RADIOLOGÍA ---------------- */
  {
    id: 'resona-a20',
    name: 'Resona A20',
    cat: 'radiologia',
    catLabel: 'Radiología',
    platform: 'Plataforma AIT',
    badge: 'Tope de gama',
    img: 'images/resona-a20-sm.png',
    gallery: ['images/resona-a20-sm.png', 'images/resona-a20-b-sm.png'],
    tagline: 'Reveal What Matters: el sistema premium de radiología de Mindray.',
    short: 'Monitor HD de 27", panel flotante de control eléctrico y plataforma Acoustic Intelligence Technology (AIT).',
    desc: [
      'El Resona A20 es el sistema de ultrasonido premium de Mindray para radiología. Está construido sobre la plataforma AIT (Acoustic Intelligence Technology), que combina transductores AFM, la tecnología FreeWave Tx/Rx, el beamforming FreeBeam y el procesamiento inteligente FreeIQ sobre una arquitectura de cómputo hiperparalelo. El resultado es un salto en calidad de dato acústico, en algoritmos de imagen y en potencia de procesamiento respecto a las generaciones anteriores.',
      'En la práctica clínica, esto se traduce en mayor intensidad de eco —más de 50 % según el fabricante—, mejor resolución en campo cercano, mayor penetración en campo lejano y menos artefactos de volumen. El puesto de trabajo acompaña ese nivel: monitor HD de 27 pulgadas con amplio ángulo de visión, pantalla táctil MAX, panel flotante con control eléctrico, asistente eléctrico de desplazamiento, hasta una hora de escaneo con batería y cinco puertos activos de transductor con gestión de cables antienredo.'
    ],
    specs: [
      'Plataforma AIT (Acoustic Intelligence Technology)',
      'Monitor HD de 27" con amplio ángulo de visión',
      'Pantalla táctil MAX de alta sensibilidad',
      'Panel flotante con control eléctrico y amplio rango de posicionamiento',
      'Transductores AFM con tecnología Acoustic Boost',
      'Hasta 1 hora de escaneo con batería y asistente eléctrico de desplazamiento',
      '5 puertos activos de transductor con gestión de cables antienredo'
    ],
    apps: ['Radiología general', 'Abdomen', 'Vascular', 'Partes pequeñas', 'Investigación clínica'],
    setting: 'Hospital · Centro de imagen de referencia'
  },
  {
    id: 'resona-i10',
    name: 'Resona I10',
    cat: 'radiologia',
    catLabel: 'Radiología',
    platform: 'Plataforma iZST+',
    badge: 'Nuevo',
    img: 'images/resona-i10-sm.png',
    gallery: ['images/resona-i10-sm.png'],
    tagline: 'La evolución de la serie Resona para diagnóstico de alta exigencia.',
    short: 'Sistema de carro de gama alta con panel flotante, pantalla táctil de gran formato y consola iConsole.',
    desc: [
      'El Resona I10 es la incorporación más reciente de la serie Resona al portafolio de radiología de Mindray. Mantiene la línea de diseño de la serie —monitor sin marco, panel de control flotante full-space y consola iConsole— y la lleva a una generación de plataforma superior, orientada a servicios de imagen con alta demanda diagnóstica.',
      'Está pensado para instituciones que necesitan resolver en un solo equipo estudios de abdomen, vascular, partes pequeñas y aplicaciones avanzadas, sin sacrificar ergonomía en jornadas largas.'
    ],
    specs: [
      'Sistema de ultrasonido de carro de gama alta',
      'Monitor sin marco de gran formato',
      'Panel de control flotante full-space',
      'Pantalla táctil de alta definición con operación por gestos',
      'Consola iConsole con teclas configurables',
      'Amplia gama de transductores Mindray'
    ],
    apps: ['Radiología general', 'Abdomen', 'Vascular', 'Partes pequeñas', 'Musculoesquelético'],
    setting: 'Hospital · Servicio de imagen'
  },
  {
    id: 'resona-i9',
    name: 'Resona I9',
    cat: 'radiologia',
    catLabel: 'Radiología',
    platform: 'Plataforma ZST+',
    badge: null,
    img: 'images/resona-i9-sm.png',
    gallery: ['images/resona-i9-sm.png'],
    tagline: 'Innovation, in every facet.',
    short: 'Pantalla sin marco de 23.8", táctil full HD de 15.6", consola iConsole con teclas E-ink y diseño de 26 dB.',
    desc: [
      'El Resona I9 se apoya en la plataforma ZST+, que sustituye el beamforming convencional por un procesamiento basado en datos de canal. Con ello supera el compromiso tradicional entre resolución espacial, resolución temporal y uniformidad tisular, y entrega una calidad de imagen consistente en todo el rango de aplicaciones.',
      'Su diseño está pensado para reducir la fatiga del operador: consola inteligente iConsole con seis teclas E-ink de pantalla digital que se reconfiguran según el tipo de estudio, panel de control flotante full-space que se bloquea en cualquier posición, estructura plegable hasta un metro de altura, autonomía de batería prolongada y un nivel sonoro de 26 dB, comparable al de un dormitorio.',
      'En herramientas diagnósticas incorpora STE de alta tasa de cuadros para una evaluación consistente de la rigidez tisular, Smart Breast y Smart Thyroid para el análisis automático y estandarizado de lesiones, y V Flow como método de estudio hemodinámico vascular.'
    ],
    specs: [
      'Plataforma ZST+ con procesamiento basado en datos de canal',
      'Pantalla sin marco de 23.8" con brillo adaptativo',
      'Pantalla táctil full HD de 15.6" con interacción intuitiva',
      'Consola iConsole con seis teclas E-ink configurables',
      'Panel de control flotante full-space, plegable hasta 1 m de altura',
      'Diseño supersilencioso de 26 dB',
      'STE de alta tasa de cuadros, Smart Breast, Smart Thyroid y V Flow'
    ],
    apps: ['Abdomen', 'Cardiología', 'Vascular', 'Partes pequeñas', 'Urología'],
    setting: 'Hospital · Clínica especializada'
  },
  {
    id: 'resona-i8',
    name: 'Resona I8',
    cat: 'radiologia',
    catLabel: 'Radiología',
    platform: 'Plataforma ZST+',
    badge: null,
    img: 'images/resona-i8-sm.png',
    gallery: ['images/resona-i8-sm.png'],
    tagline: 'Alto rendimiento diagnóstico con máxima conveniencia de operación.',
    short: 'Brazo flotante de doble ala, pantalla sin marco de 23.8" y hasta 2 horas de escaneo sin cable de alimentación.',
    desc: [
      'El Resona I8 lleva la plataforma ZST+ a servicios que necesitan resolver un volumen alto de estudios sin renunciar a herramientas avanzadas. Combina transductores de última generación con algoritmos de imagen innovadores y un conjunto diagnóstico que incluye HiFR STE para acceso preciso y consistente a la rigidez tisular, imagen de contraste UWN+ para el diagnóstico de lesiones focales con perfusión, y Fusion Imaging para localización precisa de tumores.',
      'La capa de inteligencia asistida cubre los estudios de rutina: Smart HRI para evaluar de forma rápida la esteatosis hepática, Smart Bladder para el cálculo automático del volumen vesical, Smart Track con seguimiento automático de vasos, y Smart Breast y Smart Thyroid para la valoración de lesiones mamarias y nódulos tiroideos. En análisis de precisión suma RIMT sobre datos RF para medir el grosor íntima-media de forma independiente de la imagen, R-VQS para el estudio de rigidez de la pared vascular y Tissue Tracking QA para la evaluación del movimiento miocárdico.',
      'El equipo está diseñado para moverse: brazo flotante de doble ala, altura mínima de un metro con estructura plegable, maletín de transporte reforzado y un formato que entra en una camioneta tipo MPV. Su diseño modular simplifica el mantenimiento y el nivel sonoro de 26 dB lo hace apto para áreas sensibles.'
    ],
    specs: [
      'Plataforma ZST+ con transductores avanzados',
      'Pantalla sin marco de 23.8" para visualización inmersiva',
      'Pantalla táctil operada por gestos',
      'Brazo flotante de doble ala para ajuste flexible',
      'Hasta 2 horas de escaneo ininterrumpido sin cable de alimentación',
      'Altura mínima de 1 m, plegable y transportable en maletín reforzado',
      'Diseño modular de mantenimiento rápido y nivel sonoro de 26 dB',
      'HiFR STE, UWN+ CEUS, Fusion Imaging, Smart HRI, Smart Breast y Smart Thyroid'
    ],
    apps: ['Abdomen', 'Mama y tiroides', 'Partes pequeñas', 'Cardiovascular', 'Musculoesquelético'],
    setting: 'Hospital · Clínica · Unidades móviles'
  },
  {
    id: 'consona-n9',
    name: 'Consona N9',
    cat: 'radiologia',
    catLabel: 'Radiología',
    platform: 'Plataforma ZST+',
    badge: null,
    img: 'images/consona-n9-sm.png',
    gallery: ['images/consona-n9-sm.png'],
    tagline: 'La nueva generación de la serie Consona N.',
    short: 'Ultrasonido de carro con monitor de 23.8", panel táctil de 15.6" y transductores de cristal único.',
    desc: [
      'El Consona N9 combina un diseño ergonómico pensado para jornadas clínicas largas con una estación de trabajo completamente ajustable: panel de control giratorio, altura regulable y un monitor de gran formato que facilita la lectura de imagen en cualquier posición de escaneo.',
      'Está construido sobre la plataforma ZST+ de Mindray, la tecnología que da soporte a toda la serie Consona N, e incorpora transductores de cristal único para obtener mayor sensibilidad y definición en la imagen diagnóstica.'
    ],
    specs: [
      'Plataforma ZST+ (Zone Sonography Technology)',
      'Monitor de 23.8"',
      'Panel táctil de 15.6"',
      'Panel de control giratorio y altura ajustable',
      'Transductores de cristal único',
      'Diseño ergonómico para jornadas prolongadas'
    ],
    apps: ['Radiología general', 'Obstetricia y ginecología', 'Abdomen', 'Vascular'],
    setting: 'Hospital · Clínica especializada'
  },

  {
    id: 'consona-n7',
    name: 'Consona N7',
    cat: 'radiologia',
    catLabel: 'Radiología',
    platform: 'Plataforma ZST+',
    badge: null,
    img: 'images/consona-n7-sm.png',
    gallery: ['images/consona-n7-sm.png', 'images/consona-n7-b-sm.png'],
    tagline: 'Concrete to Resonate: soluciones concretas para la atención primaria.',
    short: 'Monitor full HD de 21.5", pantalla táctil de 13.3", transductores ComboWave y herramientas inteligentes sobre la plataforma ZST+.',
    desc: [
      'El Consona N7 está diseñado para usuarios de atención primaria: reúne soluciones concretas que ayudan a realizar diagnósticos fluidos en una gran variedad de pacientes, tanto en hospitales y clínicas como en la formación de nuevos ecografistas. Se apoya en la plataforma ZST+, que lleva el procesamiento del ultrasonido del beamforming convencional a un procesamiento basado en datos de canal, para una calidad de imagen excepcional.',
      'Cubre imagen general, salud de la mujer y cardiovascular con herramientas inteligentes: Smart Scene 3D, Smart Face, Smart OB y Smart FLC para obstetricia y fertilidad; Smart HRI para la evaluación de esteatosis hepática; AutoEF, TTQA y RIMT en cardiovascular. iScanHelper, Smart Vue e iWorks acortan la curva de aprendizaje y estandarizan el estudio.'
    ],
    specs: [
      'Plataforma ZST+ con procesamiento basado en datos de canal',
      'Monitor full HD de 21.5" con brazo elevable',
      'Pantalla táctil full HD de 13.3" y panel de control giratorio',
      'Transductores ComboWave para mayor sensibilidad de imagen',
      'PSH, iClear, iBeam, HD Scope, HR Flow y elastografía NTE',
      'Smart Scene 3D, Smart Face, Smart OB, Smart FLC 2D/3D, Smart HRI, AutoEF, TTQA y RIMT',
      'Altura ajustable, diseño de bajo ruido, panel resistente al agua y al polvo y batería integrada'
    ],
    apps: ['Imagen general', 'Obstetricia y ginecología', 'Cardiovascular', 'Abdomen', 'Partes pequeñas y musculoesquelético'],
    setting: 'Hospital · Clínica · Atención primaria'
  },
  {
    id: 'consona-n6',
    name: 'Consona N6',
    cat: 'radiologia',
    catLabel: 'Radiología',
    platform: 'Plataforma ZST+',
    badge: null,
    img: 'images/consona-n6-sm.png',
    gallery: ['images/consona-n6-sm.png', 'images/consona-n6-b-sm.png'],
    tagline: 'La serie Consona en su versión más accesible, con plataforma ZST+.',
    short: 'Monitor full HD de 21.5", pantalla táctil de 13.3" y herramientas inteligentes para imagen general, mujer y cardiovascular.',
    desc: [
      'El Consona N6 lleva la plataforma ZST+ a la atención primaria con una propuesta concreta y eficiente: procesamiento basado en datos de canal para obtener imagen de alta calidad en una gran variedad de pacientes, en hospitales, clínicas y centros de formación.',
      'Incluye herramientas inteligentes para cada escenario clínico: Smart HRI, Smart Bladder, Smart Calc e iTouch+ en imagen general; AutoEF, RIMT y TDI en cardiovascular; Smart Face, Smart OB y Glazing Flow en salud de la mujer. Además ofrece imagen de contraste UWN+ y elastografía NTE, con iScanHelper, Smart Vue e iWorks para guiar y estandarizar el estudio.'
    ],
    specs: [
      'Plataforma ZST+ con procesamiento basado en datos de canal',
      'Monitor full HD de 21.5" con ángulo de visión ajustable',
      'Pantalla táctil full HD de 13.3" y panel de control giratorio',
      'Transductores ComboWave para mayor sensibilidad de imagen',
      'PSH, Glazing Flow, iClear, iBeam, HD Scope, HR Flow, NTE y contraste UWN+',
      'Smart HRI, Smart Bladder, Smart Calc, AutoEF, RIMT, TDI, Smart Face y Smart OB',
      'Espacio de almacenamiento y diseño ergonómico para la rutina diaria'
    ],
    apps: ['Imagen general', 'Abdomen', 'Obstetricia y ginecología', 'Cardiovascular', 'Urología'],
    setting: 'Clínica · Centro de atención primaria · Hospital'
  },

  /* ---------------- SALUD DE LA MUJER ---------------- */
  {
    id: 'nuewa-i10',
    name: 'Nuewa I10',
    cat: 'mujer',
    catLabel: 'Salud de la mujer',
    platform: 'Plataforma iZST+',
    badge: 'Nuevo',
    img: 'images/nuewa-i10-sm.png',
    gallery: ['images/nuewa-i10-sm.png'],
    tagline: 'In/finite possibilities: la nueva generación en salud de la mujer.',
    short: 'Plataforma iZST+ con el triple de potencia de cómputo, transductor inalámbrico y suite completa de herramientas inteligentes.',
    desc: [
      'El Nuewa I10 es la propuesta más reciente de Mindray para salud de la mujer y está construido sobre iZST+, la evolución de la plataforma ZST+. Triplica la potencia de cómputo para procesamiento paralelo de alta velocidad y aproximadamente duplica la calidad del dato acústico-eléctrico, apoyándose en tres tecnologías: Acoustic Boost, que aumenta la intensidad de señal en más de un 50 %; Free Band, que amplía el ancho de banda en más de un 30 %; y FreeWave RX, que incrementa al doble la tasa de muestreo del sistema.',
      'El objetivo clínico es concreto: visualizar con más claridad estructuras fetales complejas, detectar antes lesiones sutiles y sostener estudios de alta calidad con mayor eficiencia. Para ello incorpora algoritmos como HD Zoom para corazón fetal, OmniRender para cara fetal, iPage para endometrio, FlowBoost para circulación fetal y UMA para flujo pericalloso.',
      'La estación de trabajo suma monitor HD de vista completa, pantalla táctil de interacción intuitiva, consola iConsole con teclas E-ink y botones resistentes al desgaste, panel flotante full-space plegable hasta un metro de altura, trackball con iluminación RGB, porta-transductores integrados, panel apto para desinfección, carga inalámbrica, escaneo continuo con batería y nivel sonoro de dormitorio. Ofrece además un transductor inalámbrico de diseño ultradelgado para uso a la cabecera del paciente.'
    ],
    specs: [
      'Plataforma iZST+ con el triple de potencia de cómputo',
      'Acoustic Boost (+50 % de señal), Free Band (+30 % de ancho de banda) y FreeWave RX (+100 % de muestreo)',
      'Monitor HD de vista completa y pantalla táctil intuitiva',
      'Consola iConsole con teclas E-ink y trackball iluminado RGB',
      'Panel flotante full-space, plegable hasta 1 m de altura',
      'Transductor inalámbrico ultradelgado para uso a la cabecera',
      'Carga inalámbrica, escaneo continuo con batería y funcionamiento supersilencioso',
      'Suite inteligente: Smart Planes, Smart ICV, Smart Pelvic, Smart FLC, 4D HyCoSy, IOTA-ADNEX'
    ],
    apps: ['Fertilidad', 'Obstetricia', 'Ginecología', 'Uroginecología', 'Mama', 'Neonatología'],
    setting: 'Hospital materno · Centro de medicina fetal'
  },
  {
    id: 'nuewa-i9',
    name: 'Nuewa I9',
    cat: 'mujer',
    catLabel: 'Salud de la mujer',
    platform: 'Full-space floating',
    badge: null,
    img: 'images/nuewa-i9-sm.png',
    gallery: ['images/nuewa-i9-sm.png'],
    tagline: 'Soluciones integrales para la salud de la mujer y el recién nacido.',
    short: 'Pantalla sin marco de 23.8", panel de control flotante y panel táctil full HD de 15.6" con gestos.',
    desc: [
      'El Nuewa I9 es la plataforma de Mindray dedicada a la salud de la mujer. Su concepto full-space floating —panel de control flotante y pantalla sin marco de 23.8"— permite adaptar el equipo a distintos escenarios de escaneo sin perder ergonomía, algo determinante en estudios obstétricos prolongados.',
      'El panel táctil full HD de 15.6" se opera mediante gestos y la visualización en doble pantalla facilita comparar imagen y herramientas de análisis al mismo tiempo. Incorpora un conjunto de herramientas inteligentes avanzadas —entre ellas Smart Scene 3D, iLive, Bone y Tissue— orientadas a obtener representaciones más realistas del estudio.'
    ],
    specs: [
      'Pantalla sin marco de 23.8"',
      'Panel de control flotante',
      'Panel táctil full HD de 15.6" con operación mediante gestos',
      'Visualización en doble pantalla',
      'Herramientas inteligentes avanzadas',
      'Modos de renderizado Smart Scene 3D, iLive, Bone y Tissue'
    ],
    apps: ['Solución neonatal', 'Solución obstétrica', 'Salud reproductiva', 'Posparto y suelo pélvico'],
    setting: 'Hospital materno · Ginecología y obstetricia'
  },
  {
    id: 'nuewa-i8',
    name: 'Nuewa I8',
    cat: 'mujer',
    catLabel: 'Salud de la mujer',
    platform: 'Plataforma ZST+',
    badge: null,
    img: 'images/nuewa-i8-sm.png',
    gallery: ['images/nuewa-i8-sm.png'],
    tagline: 'Obstetricia y ginecología de alto nivel en un equipo más compacto.',
    short: 'Sistema de carro con brazo flotante, pantalla táctil y herramientas 3D/4D para estudios obstétricos.',
    desc: [
      'El Nuewa I8 comparte el enfoque de la serie Nuewa —ergonomía y herramientas dedicadas a la salud de la mujer— en un sistema orientado a servicios de obstetricia y ginecología con volumen alto de estudios. El brazo flotante y el panel táctil permiten ajustar la posición de trabajo estudio a estudio, algo relevante en jornadas de consulta continuas.',
      'Incorpora las herramientas de renderizado y automatización de la serie para obtener imágenes 3D/4D de la anatomía fetal y estandarizar mediciones, reduciendo la variabilidad entre operadores.'
    ],
    specs: [
      'Plataforma ZST+',
      'Brazo flotante para ajuste flexible del panel',
      'Pantalla táctil de operación intuitiva',
      'Herramientas de renderizado 3D/4D',
      'Automatización de mediciones obstétricas',
      'Transductores dedicados a obstetricia y ginecología'
    ],
    apps: ['Obstetricia', 'Ginecología', 'Salud reproductiva', 'Suelo pélvico'],
    setting: 'Hospital · Clínica de ginecología y obstetricia'
  },
  {
    id: 'nuewa-n9',
    name: 'Nuewa N9',
    cat: 'mujer',
    catLabel: 'Salud de la mujer',
    platform: 'Plataforma ZST+',
    badge: null,
    img: 'images/nuewa-n9-sm.png',
    gallery: ['images/nuewa-n9-sm.png'],
    tagline: 'La serie Nuewa aplicada al trabajo diario en salud de la mujer.',
    short: 'Sistema de carro con monitor de gran formato, panel táctil y set de transductores para obstetricia y ginecología.',
    desc: [
      'El Nuewa N9 acerca las soluciones de salud de la mujer de Mindray a clínicas y centros de salud que necesitan un equipo confiable para el trabajo diario. Monitor de gran formato, panel de control táctil y estación ajustable en altura conforman un puesto de trabajo cómodo para consultas de alta rotación.',
      'Su set de transductores cubre las aplicaciones más frecuentes en obstetricia y ginecología —convexos, endocavitarios y lineales— con la calidad de imagen de la plataforma ZST+.'
    ],
    specs: [
      'Plataforma ZST+',
      'Monitor de gran formato',
      'Panel de control con pantalla táctil',
      'Estación de trabajo con altura ajustable',
      'Transductores convexos, endocavitarios y lineales',
      'Diseño móvil sobre ruedas con frenos'
    ],
    apps: ['Obstetricia', 'Ginecología', 'Abdomen', 'Partes pequeñas'],
    setting: 'Clínica · Centro de salud'
  },

  /* ---------------- IMAGEN GENERAL ---------------- */
  {
    id: 'mx7',
    name: 'MX7',
    cat: 'general',
    catLabel: 'Imagen general',
    platform: 'Plataforma ZST+',
    badge: null,
    img: 'images/mx7-sm.png',
    gallery: ['images/mx7-sm.png'],
    tagline: 'Tecnología ZONE Sonography en formato portátil.',
    short: 'Portátil compacto con panel táctil, carro móvil opcional y variedad de transductores.',
    desc: [
      'El MX7 lleva la tecnología ZONE Sonography (ZST+) a un equipo portátil de diseño compacto. Es la opción indicada cuando se necesita calidad de imagen de gama alta en un sistema que se transporta entre pisos, quirófanos o sedes, y que puede montarse sobre un carro móvil dedicado cuando queda fijo en un servicio.',
      'Su panel táctil y el diseño ergonómico reducen el número de pasos para completar un estudio, y la variedad de transductores disponibles permite cubrir aplicaciones distintas con el mismo equipo.'
    ],
    specs: [
      'Tecnología ZONE Sonography (ZST+)',
      'Diseño compacto con panel táctil',
      'Carro móvil dedicado opcional con porta-transductores',
      'Alto grado de movilidad y portabilidad',
      'Variedad de transductores intercambiables',
      'Puesta en marcha rápida'
    ],
    apps: ['Emergencias', 'Quirófano', 'Unidades móviles', 'Diagnóstico general'],
    setting: 'Hospital · Emergencias · Unidades móviles'
  },
  {
    id: 'mx6',
    name: 'MX6',
    cat: 'general',
    catLabel: 'Imagen general',
    platform: 'Serie MX',
    badge: null,
    img: 'images/mx6-sm.png',
    gallery: ['images/mx6-sm.png'],
    tagline: 'Portátil de rendimiento alto en formato tipo laptop.',
    short: 'Sistema portátil con panel de control físico completo, buena calidad Doppler y traslado sencillo.',
    desc: [
      'El MX6 se ubica en la parte alta de la serie MX portátil: un equipo tipo laptop con panel de control físico completo, pensado para servicios que necesitan rendimiento de gama media-alta sin renunciar a la movilidad.',
      'Es una configuración habitual en hospitales que rotan el equipo entre consultorios, sala y áreas de apoyo durante el día, y en clínicas que requieren un solo sistema capaz de cubrir varias especialidades.'
    ],
    specs: [
      'Formato portátil tipo laptop',
      'Panel de control físico completo',
      'Imagen Doppler color, pulsado y continuo',
      'Transductores intercambiables para múltiples aplicaciones',
      'Carro móvil opcional',
      'Traslado sencillo entre servicios'
    ],
    apps: ['Diagnóstico general', 'Abdomen', 'Vascular', 'Obstetricia'],
    setting: 'Hospital · Clínica'
  },
  {
    id: 'mx5',
    name: 'MX5',
    cat: 'general',
    catLabel: 'Imagen general',
    platform: 'Serie MX',
    badge: null,
    img: 'images/mx5-sm.png',
    gallery: ['images/mx5-sm.png'],
    tagline: 'Portátil versátil, con o sin carro móvil.',
    short: 'Sistema portátil montable sobre carro dedicado, para servicios que alternan consultorio y sala.',
    desc: [
      'El MX5 es un ultrasonido portátil pensado para el trabajo diario en consulta externa y apoyo en sala. Montado sobre su carro móvil dedicado funciona como una estación fija con porta-transductores y bandeja de trabajo; desmontado, se traslada entre consultorios sin complicaciones.',
      'Es una opción frecuente cuando la inversión debe cubrir varios escenarios de uso con un solo equipo.'
    ],
    specs: [
      'Formato portátil tipo laptop',
      'Carro móvil dedicado opcional con porta-transductores',
      'Imagen Doppler para estudio vascular y abdominal',
      'Panel de control físico con teclado dedicado',
      'Transductores convexos, lineales y endocavitarios',
      'Configuración escalable según necesidad clínica'
    ],
    apps: ['Consulta externa', 'Diagnóstico general', 'Obstetricia', 'Abdomen'],
    setting: 'Clínica · Centro de salud'
  },
  {
    id: 'mx3',
    name: 'MX3',
    cat: 'general',
    catLabel: 'Imagen general',
    platform: 'Serie MX',
    badge: null,
    img: 'images/mx3-sm.png',
    gallery: ['images/mx3-sm.png'],
    tagline: 'Ultrasonido portátil de alto rendimiento.',
    short: 'Diseño compacto, alta calidad de imagen Doppler y precisión clínica para diagnósticos confiables.',
    desc: [
      'El MX3 es un ultrasonido portátil de alto rendimiento pensado para consultorios y hospitales que necesitan un equipo confiable, fácil de trasladar y listo para trabajar en poco tiempo.',
      'Su fortaleza está en la calidad de imagen Doppler y en la precisión clínica que ofrece dentro de un formato compacto, lo que lo hace apropiado tanto para consulta externa como para apoyo diagnóstico en sala.'
    ],
    specs: [
      'Diseño compacto y portátil',
      'Alta calidad de imagen Doppler',
      'Precisión clínica para diagnósticos confiables',
      'Formato tipo laptop con panel de control físico',
      'Pantalla abatible para ajuste de ángulo de visión',
      'Traslado sencillo entre consultorios'
    ],
    apps: ['Consulta externa', 'Diagnóstico general', 'Vascular', 'Apoyo en sala'],
    setting: 'Consultorio · Hospital'
  },
  {
    id: 'mu9',
    name: 'MU9',
    cat: 'general',
    catLabel: 'Imagen general',
    platform: 'Serie MU',
    badge: 'Nuevo',
    img: 'images/mu9-sm.png',
    gallery: ['images/mu9-sm.png'],
    tagline: 'La nueva generación portátil de Mindray, en su configuración más completa.',
    short: 'Portátil tipo laptop de gama alta, con pantalla de gran formato y herramientas de análisis avanzadas.',
    desc: [
      'El MU9 encabeza la nueva serie MU de portátiles de Mindray. Mantiene el formato tipo laptop —encendido rápido, traslado sencillo, operación con batería— y sube el nivel de prestaciones: pantalla de gran formato, procesamiento de imagen de nueva generación y herramientas de análisis que hasta hace poco eran exclusivas de equipos de carro.',
      'Es la opción indicada para servicios que necesitan un equipo móvil, pero no quieren perder capacidad diagnóstica al salir del área de imagen.'
    ],
    specs: [
      'Formato portátil tipo laptop de gama alta',
      'Pantalla de gran formato con ángulo ajustable',
      'Procesamiento de imagen de nueva generación',
      'Herramientas de análisis y medición avanzadas',
      'Operación con batería para uso a la cabecera',
      'Transductores intercambiables multiaplicación'
    ],
    apps: ['Diagnóstico general', 'Abdomen', 'Vascular', 'Partes pequeñas', 'Cuidados intensivos'],
    setting: 'Hospital · Clínica · Cabecera del paciente'
  },
  {
    id: 'mu7',
    name: 'MU7',
    cat: 'general',
    catLabel: 'Imagen general',
    platform: 'Serie MU',
    badge: null,
    img: 'images/mu7-sm.png',
    gallery: ['images/mu7-sm.png'],
    tagline: 'Portátil de nueva generación para el trabajo diario.',
    short: 'Sistema tipo laptop con panel de control ergonómico, imagen Doppler color y operación con batería.',
    desc: [
      'El MU7 es la configuración de trabajo diario de la serie MU: un portátil tipo laptop con panel de control ergonómico y pantalla abatible, orientado a consulta externa, apoyo en sala y estudios a la cabecera del paciente.',
      'Ofrece la calidad de imagen y la fiabilidad que se espera de la línea Mindray en un equipo que se enciende rápido, se traslada sin herramientas y funciona con batería cuando no hay toma disponible.'
    ],
    specs: [
      'Formato portátil tipo laptop',
      'Panel de control ergonómico con trackball',
      'Imagen Doppler color, pulsado y continuo',
      'Pantalla abatible con ajuste de ángulo',
      'Operación con batería',
      'Carro móvil opcional'
    ],
    apps: ['Consulta externa', 'Diagnóstico general', 'Abdomen', 'Apoyo en sala'],
    setting: 'Consultorio · Clínica · Hospital'
  },

  /* ---------------- CARDIOLOGÍA ---------------- */
  {
    id: 'recho-r9',
    name: 'Recho R9',
    cat: 'cardio',
    catLabel: 'Cardiología',
    platform: 'Serie Recho',
    badge: null,
    img: 'images/recho-r9-sm.png',
    gallery: ['images/recho-r9-sm.png'],
    tagline: 'Plataforma cardiovascular dedicada de Mindray.',
    short: 'Sistema de carro para ecocardiografía, con monitor de gran formato y herramientas de análisis cardíaco avanzado.',
    desc: [
      'El Recho R9 es la plataforma de Mindray dedicada al estudio cardiovascular. A diferencia de un equipo de diagnóstico general con paquete cardiológico, su arquitectura, sus transductores sectoriales y su flujo de trabajo están diseñados alrededor de la ecocardiografía: adquisición de alta tasa de cuadros, herramientas de cuantificación y protocolos de estudio dedicados.',
      'La estación de trabajo incluye monitor de gran formato con brazo articulado, panel de control con pantalla táctil y porta-transductores integrados, y está pensada para laboratorios de ecocardiografía y servicios de cardiología con volumen alto de estudios.'
    ],
    specs: [
      'Plataforma dedicada a estudio cardiovascular',
      'Monitor de gran formato sobre brazo articulado',
      'Panel de control con pantalla táctil',
      'Transductores sectoriales para ecocardiografía',
      'Herramientas de cuantificación y análisis cardíaco',
      'Porta-transductores integrados y diseño móvil sobre ruedas'
    ],
    apps: ['Ecocardiografía', 'Cardiología adulta', 'Cardiología pediátrica', 'Vascular'],
    setting: 'Hospital · Laboratorio de ecocardiografía'
  },

  /* ---------------- PUNTO DE ATENCIÓN ---------------- */
  {
    id: 'te-x20',
    name: 'TE X20',
    cat: 'poc',
    catLabel: 'Punto de atención',
    platform: 'Plataforma ZST+',
    badge: null,
    img: 'images/te-x20-sm.png',
    gallery: ['images/te-x20-sm.png', 'images/te-x20-b-sm.png'],
    tagline: 'Point of Care, Reimagined: el punto de atención, reinventado.',
    short: 'Pantalla táctil HD de 23.8" giratoria, transductor inalámbrico y X-Link, que integra el ECG y otros signos fisiológicos sobre la imagen.',
    desc: [
      'La serie TE X20 está pensada para entornos exigentes como los cuidados críticos y la medicina de emergencia. Integra tecnologías avanzadas en una solución accesible y centrada en el paciente: imagen de gran claridad con la plataforma ZST+, un flujo de trabajo orientado a la aplicación clínica, herramientas inteligentes y un diseño pensado para trabajar junto a la cama.',
      'Con X-Link, el ECG y otras ondas fisiológicas se visualizan superpuestos a la imagen de ultrasonido (Physio-View), y la imagen puede integrarse a la central de monitoreo (U-View). X-Pilot guía los estudios de choque (protocolos RUSH, FALLS y GDE), respiratorios (protocolo BLUE) y de trauma (FAST y eFAST), y herramientas como AutoEF Plus, Auto DFR, Smart Echovue y Smart VTI/IVC/B-line apoyan la evaluación cardíaca y el manejo de fluidos.'
    ],
    specs: [
      'Pantalla táctil HD de 23.8" giratoria, en formato horizontal o vertical',
      'Plataforma ZST+ y transductores con tecnología 3T',
      'Transductor inalámbrico, estación de carga inalámbrica y control por voz inalámbrico',
      '4 conectores activos de transductor',
      'X-Link: Physio-View sobre la imagen y U-View en la central de monitoreo',
      'X-Pilot para choque, respiratorio y trauma (RUSH, FALLS, GDE, BLUE, FAST y eFAST)',
      'AutoEF Plus, Auto DFR, Smart Echovue, Smart TTQA, Smart Nerve y Smart VTI/IVC/B-line',
      'Interfaz sellada resistente a fluidos y fácil de desinfectar'
    ],
    apps: ['Medicina de emergencia', 'Cuidados críticos', 'Anestesia y bloqueos nerviosos', 'Ecocardiografía en el punto de atención', 'Pulmón y manejo de fluidos'],
    setting: 'Emergencias · Cuidados intensivos · Quirófano'
  }
];

/* Datos de contacto centralizados */
window.SEVEN_INFO = {
  empresa: 'SEVEN Medical Company',
  ciudad: 'Ciudad de Panamá, República de Panamá',
  telefono: '+507 000-0000',
  telefonoTel: '+507000000',
  email: 'info@sevenmedical.com.pa',
  desde: '2020',
  mision: 'Brindar soluciones tecnológicas especializadas generando confianza para transformar vidas y mejorar la salud de los pacientes.',
  vision: 'Ser la empresa líder reconocida en el mercado de imagenología médica de Panamá.'
};
