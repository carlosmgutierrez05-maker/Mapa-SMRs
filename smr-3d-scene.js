/**
 * SMR-ENERGY ECONOMICS | Motor 3D Interactivo de Componentes y Planta
 * Inspirado en:
 * - Sketchfab SMR (Txy2u): Integral Pressurized Water Reactor cutaway
 * - Energy Encyclopedia 3D Models: SMR Reactor & SMR Hall
 * Docencia Universitaria en Economía de los Sistemas Energéticos (UVa)
 */

// ==========================================================================
// 1. BASE DE DATOS DETALLADA DE COMPONENTES DEL SMR (INGENIERÍA Y ECONOMÍA)
// ==========================================================================
const SMR_COMPONENTS_DATA = {
  'containment': {
    id: 'containment',
    name: 'Vasija de Contención Metálica',
    nameEn: 'Containment Vessel',
    category: 'Seguridad y Contención',
    groupKey: 'primary',
    icon: '🛡️',
    description: 'Recipiente cilíndrico de alta presión fabricado en acero forjado y aleación al carbono que encierra por completo la vasija del reactor (RPV). En diseños iPWR modulares integrales (como la configuración NuScale de contención sumergida), la contención opera sumergida en una piscina pasiva de agua subterránea (UHS). El espacio anular entre la RPV y la contención se mantiene al vacío absoluto (0,05 bar), lo que proporciona un aislamiento térmico excepcional en operación normal y una disipación pasiva de calor inmediata por condensación en contingencias.',
    specs: [
      { label: 'Material', val: 'Acero al carbono SA-508 Gr.3 Cl.2' },
      { label: 'Diámetro Exterior', val: '4,70 m (Radio 2,35 m) · Esbeltez 4,2:1' },
      { label: 'Presión de Diseño', val: '3,5 - 5,0 MPa (50 bar)' },
      { label: 'Temperatura Diseño', val: '260 °C' },
      { label: 'Espacio Anular', val: 'Vacío < 0,05 bar (Sin aislante de fibra)' },
      { label: 'Medio Exterior', val: 'Piscina de disipador final (UHS)' }
    ],
    economicBenefit: 'Elimina la necesidad de edificios de contención colosales de 60 metros de hormigón pretensado, reduciendo el CAPEX civil en más de un 40% y permitiendo la prefabricación completa en taller bajo estándares nucleares.',
    cameraFocus: { x: 0, y: 11.0, z: 17.5, targetX: 0, targetY: 10.5, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(0, 11.0, 2.45),
    calloutSummary: 'Recipiente de alta presión de acero forjado sumergido en la piscina UHS.'
  },
  'rpv': {
    id: 'rpv',
    name: 'Vasija de Presión del Reactor (RPV)',
    nameEn: 'Reactor Pressure Vessel',
    category: 'Circuito Primario',
    groupKey: 'primary',
    icon: '⚛️',
    description: 'Cuerpo de presión cilíndrico de 180-200 mm de espesor forjado en acero continuo. Alberga en su interior todo el bucle primario: núcleo de combustible, generadores de vapor, presurizador y mecanismos de control. Diseñada para soportar 155 bares de presión continua a 320 °C durante 60 años de vida útil sin fatiga por fluencia ni fragilización desmedida.',
    specs: [
      { label: 'Material Base', val: 'Acero forjado de baja aleación SA-508' },
      { label: 'Revestimiento Interno', val: 'Cladding inox austenítico 308L/309L (6 mm)' },
      { label: 'Presión Nominal', val: '15,5 MPa (155 bar)' },
      { label: 'Espesor de Pared', val: '180 - 200 mm forjado continuo macizo' },
      { label: 'Pernos de Brida', val: '24 espárragos forjados de alta resistencia' }
    ],
    economicBenefit: 'La arquitectura integral compacta elimina las grandes tuberías externas de bucle primario (Hot/Cold Legs de 80 cm), haciendo físicamente imposible el accidente de rotura de gran bucle (Large Break LOCA).',
    cameraFocus: { x: 0, y: 10.5, z: 15.5, targetX: 0, targetY: 10.5, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(0, 10.5, 2.05),
    calloutSummary: 'Vasija forjada de 180 mm que encierra todo el bucle primario a 155 bar.'
  },
  'core': {
    id: 'core',
    name: 'Núcleo del Reactor y Ensamblajes Combustibles',
    nameEn: 'Reactor Core & Fuel Assemblies',
    category: 'Núcleo y Reactividad',
    groupKey: 'core',
    icon: '🔥',
    description: 'Zona activa donde se produce la fisión nuclear controlada del Uranio-235. Compuesto por ensamblajes de combustible con matriz de varillas de zircaloy que contienen pastillas cerámicas de dióxido de uranio (UO₂) enriquecido al 4,5%. Los ensamblajes disponen de boquillas inferiores para la entrada del refrigerante y rejillas espaciadoras con resortes que optimizan la turbulencia hidráulica y la transferencia térmica.',
    specs: [
      { label: 'Combustible', val: 'Dióxido de Uranio cerámico (UO₂)' },
      { label: 'Enriquecimiento', val: '4,2 % - 4,95 % U-235' },
      { label: 'Vaina Metálica', val: 'Aleación Zircaloy-4 / M5 anticorrosión' },
      { label: 'Potencia Volumétrica', val: '65 - 85 kW/litro (Margen térmico DNBR > 2.0)' },
      { label: 'Ciclo de Recarga', val: '24 a 36 meses continuo' }
    ],
    economicBenefit: 'Menor densidad de potencia que los grandes reactores tradicionales, lo que incrementa sustancialmente los márgenes térmicos de seguridad (DNBR) y reduce el coste del seguro y del fondo de contingencias.',
    cameraFocus: { x: 0, y: 5.2, z: 11.0, targetX: 0, targetY: 5.2, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(0, 5.2, 0.45),
    calloutSummary: 'Zona de fisión activa con pastillas cerámicas de UO₂ al 4,5% y vainas de zircaloy.'
  },
  'control-rods': {
    id: 'control-rods',
    name: 'Barras de Control y Mecanismos CRDM',
    nameEn: 'Control Rod Clusters & CRDM',
    category: 'Núcleo y Reactividad',
    groupKey: 'core',
    icon: '🕹️',
    description: 'Conjuntos en araña de varillas absorbentes de neutrones compuestas por Carburo de Boro (B₄C), Hafnio o aleación Plata-Indio-Cadmio (AIC). Los mecanismos electromagnéticos (CRDM) situados sobre la tapa de la vasija sostienen las barras en suspensión. Ante un corte de suministro (Station Blackout), los electroimanes se desenergizan y las barras caen al núcleo por gravedad en menos de 2 segundos, apagando la reacción en cadena de forma inmediata.',
    specs: [
      { label: 'Material Absorbente', val: 'B₄C (Carburo de Boro) y Hafnio' },
      { label: 'Tiempo de Inserción SCRAM', val: '< 1,8 segundos por gravedad pura' },
      { label: 'Accionamiento', val: 'Electroimanes de enganche pasivo (Fail-Safe)' },
      { label: 'Torres CRDM Superiores', val: '17 accionadores verticales sobre la tapa de cierre' }
    ],
    economicBenefit: 'Seguridad pasiva intrínseca de nivel 3+: no requiere energía eléctrica de emergencia, ni generadores diésel de socorro, ni intervención del operador para detener el reactor.',
    cameraFocus: { x: 0, y: 12.0, z: 12.0, targetX: 0, targetY: 12.0, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(0, 12.0, 0.35),
    calloutSummary: 'Varillas de B₄C con apagado SCRAM por caída por gravedad (< 1,8 s).'
  },
  'steam-generator': {
    id: 'steam-generator',
    name: 'Generador de Vapor Helicoidal Integrado',
    nameEn: 'Helical Coil Steam Generator',
    category: 'Intercambio Térmico',
    groupKey: 'steam',
    icon: '🔄',
    description: 'Intercambiador de calor multitubular de alta compacidad dispuesto en el espacio anular entre el tubo ascendente central (riser) y la pared de la vasija. Cientos de tubos de Inconel 690 enrollados en hélices concéntricas reciben agua de alimentación secundaria a 150 °C por su parte inferior y entregan vapor sobrecalentado a 300 °C y 60 bar por la parte superior, sin contaminación radiactiva.',
    specs: [
      { label: 'Tipo de Tubos', val: 'Hélices continuas de Inconel 690 TT' },
      { label: 'Presión Secundaria', val: '5,0 - 6,5 MPa (60 bar)' },
      { label: 'Temperatura Vapor', val: '300 °C (Vapor seco sobrecalentado)' },
      { label: 'Superficie de Intercambio', val: '> 1.800 m² en volumen anular ultracompacto' },
      { label: 'Separación de Fluidos', val: 'Cero contacto físico primario-secundario' }
    ],
    economicBenefit: 'Al generar vapor sobrecalentado directamente dentro de la vasija, se elimina el secador de vapor y los generadores de vapor externos de 300 toneladas, abaratando la obra civil del edificio de contención.',
    cameraFocus: { x: 0, y: 11.2, z: 13.0, targetX: 0, targetY: 11.2, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(1.45, 11.2, 0.25),
    calloutSummary: 'Hélices de Inconel 690 que generan vapor seco sobrecalentado a 300 °C y 60 bar.'
  },
  'pressurizer': {
    id: 'pressurizer',
    name: 'Presurizador Integrado en Cúpula',
    nameEn: 'Integrated Upper Pressurizer',
    category: 'Circuito Primario',
    groupKey: 'primary',
    icon: '⚙️',
    description: 'Cámara situada en la cúpula superior de la vasija que mantiene el refrigerante primario a 155 bares de presión continua. Alberga calentadores eléctricos de inmersión en su base para aumentar la presión evaporando agua y un cabezal de rociadores de agua subenfriada en la parte superior para condensar vapor y mitigar sobrepresiones.',
    specs: [
      { label: 'Presión de Regulación', val: '15,5 MPa ± 0,2 MPa (155 bar)' },
      { label: 'Calentadores Eléctricos', val: 'Resistencias blindadas de Inconel (800 kW)' },
      { label: 'Rociador (Spray)', val: 'Inyección de agua fría desde la descarga fría' },
      { label: 'Válvulas de Seguridad', val: '2 x PORV de alivio pilotadas' }
    ],
    economicBenefit: 'Integrado directamente en la cabeza de la vasija; suprime la línea de sobrepresión (surge line) externa y los soportes antisísmicos asociados, eliminando un punto crítico de fatiga térmica.',
    cameraFocus: { x: 0, y: 16.5, z: 12.0, targetX: 0, targetY: 16.5, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(0, 16.5, 0.35),
    calloutSummary: 'Cúpula superior que fija la presión en 155 bar impidiendo la ebullición del agua.'
  },
  'pumps': {
    id: 'pumps',
    name: 'Bombas de Refrigerante Primario (PCP)',
    nameEn: 'Primary Coolant Pumps (Canned Motor)',
    category: 'Circuito Primario',
    groupKey: 'primary',
    icon: '🔄',
    description: 'Bombas centrífugas compactas de motor sellado (canned motor) montadas directamente sobre toberas en la vasija sin sellos mecánicos de eje, eliminando cualquier vía de fuga de refrigerante primario al exterior.',
    specs: [
      { label: 'Tipo de Motor', val: 'Motor sellado hermético (Canned Rotor)' },
      { label: 'Caudal de Diseño', val: '3.200 - 4.500 m³/h por unidad' },
      { label: 'Sellos de Eje', val: '0 (Hermeticidad estanca total)' },
      { label: 'Montaje', val: 'Directo sobre toberas forjadas de la vasija' }
    ],
    economicBenefit: 'La ausencia de empaquetaduras y sellos dinámicos reduce las intervenciones de mantenimiento en parada a cero durante ciclos de 10 años, abaratando el OPEX.',
    cameraFocus: { x: 2.2, y: 7.5, z: 9.5, targetX: 1.8, targetY: 7.5, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(2.4, 7.5, 1.2),
    calloutSummary: 'Bombas centrífugas de motor sellado hermético (cero fugas de eje).'
  },
  'riser': {
    id: 'riser',
    name: 'Tubo Ascendente Central (Riser Column)',
    nameEn: 'Central Riser Chimney',
    category: 'Circuito Primario',
    groupKey: 'primary',
    icon: '⬆️',
    description: 'Chimenea cilíndrica central de acero inoxidable que canaliza el refrigerante caliente a 320 °C desde la salida superior del núcleo hasta la parte superior de los generadores de vapor. Su altura crea una columna de flotabilidad térmica (efecto termosifón) que garantiza la circulación natural incluso si las bombas de refrigerante fallan.',
    specs: [
      { label: 'Material', val: 'Acero inoxidable austenítico 316L' },
      { label: 'Diámetro', val: '2,10 m (Radio 1,05 m)' },
      { label: 'Fuerza Motriz', val: 'Convección natural por gradiente de densidad' }
    ],
    economicBenefit: 'Garantiza la seguridad pasiva sin bombas (Walk-Away Safe): la disipación del calor residual posterior al apagado se mantiene indefinidamente sin suministro eléctrico.',
    cameraFocus: { x: 0, y: 11.2, z: 12.0, targetX: 0, targetY: 11.2, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(0, 11.2, 0),
    calloutSummary: 'Chimenea cilíndrica central que canaliza la circulación natural por termosifón.'
  },
  'downcomer': {
    id: 'downcomer',
    name: 'Canal Descendente Anular (Downcomer)',
    nameEn: 'Annular Downcomer Passage',
    category: 'Circuito Primario',
    groupKey: 'primary',
    icon: '⬇️',
    description: 'Espacio anular perimetral entre el tubo ascendente central y la pared interior de la vasija. El agua de refrigeración, tras ceder su energía a los tubos del generador de vapor y enfriarse a 290 °C, desciende densa por este canal hacia la placa inferior del núcleo para reiniciar el ciclo.',
    specs: [
      { label: 'Temperatura Fluido', val: '290 °C (Líquido subenfriado denso)' },
      { label: 'Trayectoria', val: 'Descendente perimétrica cruzando tubos SG' },
      { label: 'Distribución', val: 'Pleno inferior hemisférico con aletas deflectoras' }
    ],
    economicBenefit: 'Flujo hidrodinámico uniforme que previene turbulencias y erosión por cavitación en las paredes de la vasija.',
    cameraFocus: { x: 1.2, y: 9.2, z: 11.5, targetX: 0.8, targetY: 9.2, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(1.65, 9.2, 0),
    calloutSummary: 'Canal anular perimétrico por el que desciende el agua densa enfriada a 290 °C.'
  },
  'reflector': {
    id: 'reflector',
    name: 'Reflector Neutrónico y Blindaje Interior',
    nameEn: 'Neutron Reflector & Core Shroud',
    category: 'Núcleo y Reactividad',
    groupKey: 'core',
    icon: '🪞',
    description: 'Estructura cilíndrica maciza de acero inoxidable perforado dispuesta alrededor de los elementos combustibles del núcleo. Su función es rebotar hacia el centro los neutrones rápidos que escapan del núcleo, maximizando la eficiencia de fisión y blindando la pared de la vasija contra la irradiación neutrónica.',
    specs: [
      { label: 'Material', val: 'Acero inoxidable forjado 304LN con canales refrigerantes' },
      { label: 'Ahorro de Combustible', val: '~2,5 - 3,5% en requerimiento de enriquecimiento' },
      { label: 'Atenuación Fluencia', val: 'Factor > 4 de reducción en daño por radiación RPV' }
    ],
    economicBenefit: 'Aumenta el quemado del combustible nuclear y extiende la vida útil de la vasija RPV a 60-80 años sin necesidad de sustitución.',
    cameraFocus: { x: 0, y: 5.2, z: 10.0, targetX: 0, targetY: 5.2, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(0, 5.2, 1.62),
    calloutSummary: 'Blindaje de acero inoxidable que rebota neutrones y protege la vasija de radiación.'
  },
  'piping': {
    id: 'piping',
    name: 'Toberas de Vapor y Agua de Alimentación',
    nameEn: 'Feedwater & Main Steam Nozzles',
    category: 'Intercambio Térmico',
    groupKey: 'steam',
    icon: '🔩',
    description: 'Penetraciones forjadas y toberas con bridas atornilladas que comunican el generador de vapor interior con el circuito de turbina exterior. Situadas en la parte media-alta del módulo, no existen penetraciones en la parte inferior, imposibilitando el drenaje del núcleo.',
    specs: [
      { label: 'Línea de Vapor', val: 'Acero aleado al Cr-Mo P22 / Inox 316 (Cota alta)' },
      { label: 'Línea Alimentación', val: 'Acero al carbono forjado (Cota media)' },
      { label: 'Bridas', val: 'Bridas ANSI 2500# forjadas con espárragos' }
    ],
    economicBenefit: 'Las toberas están situadas en la parte superior del módulo; no hay penetraciones en el tercio inferior de la vasija, imposibilitando el drenaje accidental del núcleo.',
    cameraFocus: { x: 2.0, y: 15.2, z: 10.0, targetX: 1.5, targetY: 15.2, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(2.4, 15.2, 0),
    calloutSummary: 'Toberas forjadas con bridas atornilladas hacia la turbina (sin penetraciones inferiores).'
  },
  'steam-lines': {
    id: 'steam-lines',
    name: 'Líneas Principales de Vapor (Main Steam Lines)',
    nameEn: 'High-Pressure Steam Piping System',
    category: 'Intercambio Térmico',
    groupKey: 'steam',
    icon: '💨',
    description: 'Red de tuberías de alta presión de acero aleado al Cr-Mo P22 que evacuan el vapor sobrecalentado generado en el SMR a 285 °C y 60 bar hacia la nave de turbinas y los intercambiadores de seguridad. Cuentan con aislamiento térmico reflectante de acero inoxidable (RMI), codos forjados, juntas de dilatación y válvulas de aislamiento rápido MSIV.',
    specs: [
      { label: 'Diámetro Nominal', val: 'DN 450 (18 pulgadas, pared Sch 160)' },
      { label: 'Presión / Temperatura', val: '6,0 MPa (60 bar) / 285 °C sobrecalentado' },
      { label: 'Caudal Nominal', val: '680 toneladas/hora de vapor' },
      { label: 'Válvulas MSIV', val: 'Cierre neumático pasivo de emergencia < 3 s' }
    ],
    economicBenefit: 'El diseño corto, compacto y modular minimiza las pérdidas térmicas y la caída de presión, maximizando el rendimiento del ciclo Rankine al 36,8%.',
    cameraFocus: { x: 7.0, y: 16.0, z: 14.0, targetX: 4.5, targetY: 15.0, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(5.5, 15.2, -1.0),
    calloutSummary: 'Tuberías DN450 de alta presión (60 bar, 285 °C) con aislamiento RMI y válvulas MSIV.'
  },
  'heat-exchangers': {
    id: 'heat-exchangers',
    name: 'Intercambiadores de Calor de Emergencia (UHS)',
    nameEn: 'Passive Containment Cooling Heat Exchangers',
    category: 'Intercambio Térmico',
    groupKey: 'steam',
    icon: '❄️',
    description: 'Bancos modulares de intercambiadores multitubulares de acero inoxidable sumergidos en la piscina de agua borada. En contingencias o paradas no programadas, el calor residual de decaimiento del combustible se transfiere de forma autónoma por termosifón directo a estos módulos sumergidos sin necesidad de bombas ni alimentación eléctrica exterior.',
    specs: [
      { label: 'Capacidad de Evacuación', val: '35 MWt térmicos por termosifón natural' },
      { label: 'Material Tubos', val: 'Inconel 690 TT / Acero Inoxidable 316L' },
      { label: 'Autonomía de Enfriamiento', val: '> 30 días pasivos sin reposición de agua' },
      { label: 'Presión Secundaria', val: 'Hasta 7 MPa de diseño' }
    ],
    economicBenefit: 'Otorga seguridad pasiva intrínseca Nivel 3+ (Walkaway Safe), haciendo físicamente imposible la fusión del núcleo ante una pérdida total de suministro eléctrico (Station Blackout).',
    cameraFocus: { x: 12.0, y: 11.0, z: 12.0, targetX: 8.8, targetY: 8.5, targetZ: 0.8 },
    anchorPos3D: new THREE.Vector3(8.8, 8.5, 0.8),
    calloutSummary: 'Intercambiadores sumergidos que disipan 35 MWt de calor residual por termosifón pasivo.'
  },
  'seismic-supports': {
    id: 'seismic-supports',
    name: 'Estructuras de Soporte Sísmico',
    nameEn: 'Seismic Snubbers & Structural Restraints',
    category: 'Seguridad y Contención',
    groupKey: 'primary',
    icon: '🛡️',
    description: 'Brazos telescópicos de amortiguación hidráulica y riostras mecánicas de gran tonelaje que conectan el collarín superior de la vasija a las paredes de hormigón armado del foso. Disipan aceleraciones sísmicas de diseño seguro (SSE hasta 0,5 g) sin transmitir tensiones cortantes destructivas a las toberas ni a los anclajes de la base.',
    specs: [
      { label: 'Carga Máxima de Diseño', val: '4 x 1.250 kN por amortiguador hidráulico' },
      { label: 'Aceleración Sísmica SSE', val: '0,50 g horizontal / 0,33 g vertical' },
      { label: 'Carrera Hidráulica', val: '± 75 mm con fluido ignífugo sintético' },
      { label: 'Anclaje a Muro', val: 'Placas embebidas de acero con pernos pretensados M48' }
    ],
    economicBenefit: 'Protege las soldaduras críticas y las penetraciones de vapor, eliminando riesgos catastróficos por terremotos y reduciendo la prima del seguro de la planta en más de un 25%.',
    cameraFocus: { x: -4.0, y: 15.0, z: 12.0, targetX: -1.5, targetY: 13.5, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(-2.8, 13.5, 0),
    calloutSummary: 'Amortiguadores hidráulicos de 1.250 kN anclados al foso para absorber sismos de 0,5 g.'
  },
  'pool': {
    id: 'pool',
    name: 'Piscina de Enfriamiento Pasivo (UHS)',
    nameEn: 'Reactor Building Pool & Heat Sink',
    category: 'Nave y Edificio de Contención',
    groupKey: 'plant',
    icon: '🌊',
    description: 'Enorme piscina subterránea de hormigón armado revestida de acero inoxidable en la que descansan sumergidos los módulos SMR. Contiene más de 15.000 m³ de agua borada desmineralizada. En cualquier contingencia, el calor del reactor se transfiere pasivamente a través de las paredes de la contención y los intercambiadores al agua de la piscina, garantizando refrigeración segura durante más de 30 días sin reposición.',
    specs: [
      { label: 'Volumen de Agua', val: '> 15.000 m³ de agua borada' },
      { label: 'Autonomía Térmica', val: '> 72 horas sin intervención (hasta 30 días pasivos)' },
      { label: 'Ubicación', val: 'Subterránea, bajo nivel del terreno (anti-impactos)' },
      { label: 'Revestimiento', val: 'Liner continuo de acero inoxidable austenítico 304L' }
    ],
    economicBenefit: 'Suprime las costosas estaciones de bombeo de emergencia diésel Clase 1E y las líneas eléctricas redundantes de seguridad.',
    cameraFocus: { x: -0.4, y: 17.5, z: 27.2, targetX: 0.0, targetY: 10.8, targetZ: -0.5 },
    anchorPos3D: new THREE.Vector3(-8.5, 9.8, 2.0),
    calloutSummary: 'Piscina subterránea pasiva con > 15.000 m³ de agua borada (> 30 días de refrigeración).'
  },
  'polar-crane': {
    id: 'polar-crane',
    name: 'Puente Grúa Industrial y Polipastos',
    nameEn: 'Heavy Overhead Gantry Crane & Hoist',
    category: 'Nave y Edificio de Contención',
    groupKey: 'plant',
    icon: '🏗️',
    description: 'Puente grúa birraíl de alta capacidad montado sobre vigas carrilera de acero ancladas a las pilastras de hormigón en lo alto de la fosa. Equipado con carro de doble polipasto redundante y gancho forjado de 800 t para maniobras de izado del reactor SMR, desmontaje de la tapa de la vasija y recarga de combustible bajo agua.',
    specs: [
      { label: 'Capacidad de Carga', val: '800 - 1.000 toneladas métricas' },
      { label: 'Accionamiento', val: 'Doble polipasto redundante anti-caída' },
      { label: 'Luz de Viga', val: '31 metros entre testeros' },
      { label: 'Velocidad de Elevación', val: 'Micro-velocidad de precisión 0,2 m/min' }
    ],
    economicBenefit: 'Permite maniobras rápidas de sustitución modular del reactor y reduce el tiempo de parada de recarga de combustible a menos de 10 días.',
    cameraFocus: { x: 0, y: 22, z: 20, targetX: 0, targetY: 20, targetZ: 0 },
    anchorPos3D: new THREE.Vector3(0, 24.2, 0),
    calloutSummary: 'Puente grúa birraíl de 800-1000 t para izado de módulos y recarga rápida.'
  },
  'turbine': {
    id: 'turbine',
    name: 'Isla de Turbinas y Alternador de 470 MWe',
    nameEn: 'Turbine Generator Building (Rankine Cycle)',
    category: 'Balance de Planta (BOP)',
    groupKey: 'plant',
    icon: '⚡',
    description: 'Edificio industrial que alberga el turbogrupo de vapor multicuerpo (alta presión y baja presión) acoplado a un alternador síncrono refrigerado por hidrógeno. Convierte la energía térmica del vapor a 285 °C en 470 MWe de electricidad neta con una eficiencia termodinámica del 36,8%.',
    specs: [
      { label: 'Potencia Eléctrica', val: '470 MWe netos a 3.000 rpm (50 Hz)' },
      { label: 'Presión Entrada', val: '5,5 MPa vapor sobrecalentado' },
      { label: 'Condensador', val: 'Al vacío con refrigeración por agua o aerocondensador' }
    ],
    economicBenefit: 'Turbina modular compacta estándar de ciclo combinado modificada, disponible comercialmente sin sobrecostes nucleares específicos.',
    cameraFocus: { x: 28, y: 12, z: -25, targetX: 20, targetY: 10, targetZ: -25 },
    anchorPos3D: new THREE.Vector3(38, 7.0, -25),
    calloutSummary: 'Grupo turbina-alternador que produce 470 MWe de electricidad neta.'
  },
  'substation': {
    id: 'substation',
    name: 'Subestación Eléctrica Blindada GIS 400 kV',
    nameEn: 'Gas-Insulated Substation (GIS 400 kV)',
    category: 'Balance de Planta (BOP)',
    groupKey: 'plant',
    icon: '🔌',
    description: 'Instalación de evacuación eléctrica de muy alta tensión aislada en hexafluoruro de azufre (SF₆). Conecta el transformador principal elevador con la red de transporte eléctrico de 400 kV de Red Eléctrica / ENTSO-E.',
    specs: [
      { label: 'Nivel de Tensión', val: '400 kV trifásica' },
      { label: 'Aislamiento', val: 'SF₆ encapsulado hermético (Mínima huella)' },
      { label: 'Inercia Síncrona', val: '> 4,5 segundos (Soporte firme a la red)' }
    ],
    economicBenefit: 'Aporte de inercia rotacional y potencia firme, remunerado como servicio complementario de estabilidad de red por valor de 8-12 €/kW-mes.',
    cameraFocus: { x: 42, y: 10, z: 25, targetX: 38, targetY: 8, targetZ: 25 },
    anchorPos3D: new THREE.Vector3(45, 4.0, 25),
    calloutSummary: 'Subestación GIS blindada en SF₆ para evacuación eléctrica a la red de 400 kV.'
  }
};

// ==========================================================================
// 2. ESTADO GLOBAL DE LA APLICACIÓN 3D
// ==========================================================================
const SMR_STATE = {
  // Escena activa
  activeSceneMode: 'smr-hall', // 'smr-reactor', 'smr-hall', 'smr-plant'
  selectedComponentId: 'containment',
  hoveredComponentId: null,
  isolatedComponentId: null,

  // Corte y compuerta móvil (Corte de 1/4 activo por defecto para revelar el interior)
  cutawayMode: '120', // 'closed', '120', 'xray'
  isReactorDoorOpen: true,
  doorProgress: 0.0,
  explodedProgress: 0.0, // 0.0 (ensamblado) a 1.0 (máxima separación)
  isExplodeAnimating: false,

  // Simulación física
  controlRodsInsertion: 15,
  steamDemand: 100,
  isScram: false,
  thermalPowerMWth: 1276,
  electricPowerMWe: 470,
  coolantTempC: 320,
  coolantPressureBar: 155,
  steamFlowTph: 680,
  efficiencyPercent: 36.8,

  // Entorno y visualización
  timeOfDay: 'cad-studio',
  activeModel: 'iPWR-Integral',
  isOrthographic: false,

  // Audio guía
  isTourActive: false,
  currentStopIndex: 0,
  isSpeaking: false,
  speechRate: 1.0,
  isAudioMuted: false,

  // Referencias Three.js
  scene: null,
  camera: null,
  perspCamera: null,
  orthoCamera: null,
  renderer: null,
  controls: null,
  raycaster: null,
  mouse: new THREE.Vector2(),
  textures: {}
};

// Paradas del tour docente
const TOUR_STOPS = [
  {
    id: 'stop-containment',
    title: '1. El Módulo SMR y Vasija de Contención Metálica',
    part: 'Vasija de Contención en Acero Forjado y Seguridad Pasiva (Módulo Cerrado)',
    compTarget: 'containment',
    camera: { x: 12, y: 13, z: 16, targetX: 0, targetY: 10.5, targetZ: 0 },
    speech: `¡Bienvenidos al modelo tridimensional del SMR! Estamos observando el reactor modular cerrado y su vasija de contención exterior con su característica corona de torres CRDM en la cúspide. Puedes orbitar trescientos sesenta grados con el ratón para inspeccionar el exterior, o tocar cualquier pieza interior para activar el corte transversal y explorar sus componentes.`
  },
  {
    id: 'stop-rpv',
    title: '2. Vasija de Presión del Reactor (RPV): Filosofía Integral',
    part: 'Vasija RPV Forjada a 155 bar y Eliminación de Grandes Bucles',
    compTarget: 'rpv',
    camera: { x: 0, y: 11, z: 15.5, targetX: 0, targetY: 10.5, targetZ: 0 },
    speech: `En la sección transversal observamos la Vasija de Presión del Reactor, o RPV, con un espesor macizo de ciento ochenta milímetros forjados. A diferencia de las centrales convencionales con metros de tuberías externas, en este diseño integral la vasija alberga en su interior todo el circuito primario: núcleo, generador de vapor y presurizador, eliminando el riesgo de rotura de gran bucle.`
  },
  {
    id: 'stop-core',
    title: '3. El Núcleo Nuclear y Ensamblajes Combustibles',
    part: 'Fisión de U-235, Vainas de Zircaloy y Margen Térmico DNBR',
    compTarget: 'core',
    camera: { x: 0, y: 5.5, z: 10.5, targetX: 0, targetY: 5.2, targetZ: 0 },
    speech: `En la base de la vasija encontramos el núcleo nuclear activo con veintiún elementos combustibles en matriz cruciforme. Cada ensamblaje cuenta con varillas de zircaloy que albergan pastillas cerámicas de dióxido de uranio al cuatro y medio por ciento, protegidas por rejillas espaciadoras y bañadas por el resplandor azul Cherenkov.`
  },
  {
    id: 'stop-crdm',
    title: '4. Barras de Control y Mecanismos Superiores CRDM',
    part: 'Absorbedores de Carburo de Boro (B₄C) y Caída por Gravedad',
    compTarget: 'control-rods',
    camera: { x: 0, y: 12.5, z: 11.5, targetX: 0, targetY: 12.0, targetZ: 0 },
    speech: `Suspendidas por electroimanes sobre el núcleo se encuentran las barras de control de carburo de boro conectadas a la corona de accionadores superiores. Ante una pérdida total de energía eléctrica externa, los electroimanes se desenergizan instantáneamente y las barras caen al fondo del núcleo por su propio peso en menos de dos segundos, deteniendo la reacción por pura gravedad.`
  },
  {
    id: 'stop-sg',
    title: '5. Generador de Vapor Helicoidal Integrado',
    part: 'Tubos de Inconel 690 y Separación Absoluta de Circuitos',
    compTarget: 'steam-generator',
    camera: { x: 0, y: 11.5, z: 12.5, targetX: 0, targetY: 11.2, targetZ: 0 },
    speech: `Observad los haces concéntricos de tubos helicoidales de Inconel 690 en el espacio anular. El refrigerante primario caliente a trescientos veinte grados desciende por su exterior, transfiriendo su calor al agua secundaria que asciende por el interior de las espirales, generando vapor seco sobrecalentado a trescientos grados sin que exista contacto físico ni radiación hacia la turbina.`
  },
  {
    id: 'stop-pzr',
    title: '6. Presurizador Integrado en la Cúpula',
    part: 'Regulación Termodinámica a 155 bar en Estado Líquido',
    compTarget: 'pressurizer',
    camera: { x: 0, y: 16.5, z: 11.5, targetX: 0, targetY: 16.5, targetZ: 0 },
    speech: `En lo más alto de la vasija, el presurizador integrado mantiene el circuito a ciento cincuenta y cinco bares de presión continua mediante sus calentadores eléctricos de inmersión y su cabezal de rociadores, impidiendo que el agua hierva y maximizando la eficiencia de transporte de calor.`
  },
  {
    id: 'stop-containment',
    title: '7. Vasija de Contención Metálica al Vacío',
    part: 'Aislamiento Térmico y Seguridad Sumergida en Piscina',
    compTarget: 'containment',
    camera: { x: 0, y: 11, z: 18, targetX: 0, targetY: 10.5, targetZ: 0 },
    speech: `Envolviendo a la vasija RPV se sitúa la contención metálica de acero especial. El espacio anular se mantiene al vacío de cinco centésimas de bar, lo que proporciona un aislamiento térmico perfecto sin necesidad de materiales de fibra degradables por radiación.`
  },
  {
    id: 'stop-pool',
    title: '8. Sumidero Térmico Final: Piscina Subterránea (UHS)',
    part: 'Evacuación de Calor Residual durante > 30 Días Pasivos',
    compTarget: 'pool',
    camera: { x: 0, y: 8, z: 24, targetX: 0, targetY: 8, targetZ: 0 },
    speech: `En la nave de contención, el módulo SMR completo descansa sumergido en una gigantesca piscina subterránea de agua borada. Si fallasen todos los sistemas activos, el calor residual de decaimiento se transfiere a la piscina mediante ebullición pasiva y condensación, garantizando más de treinta días de seguridad sin suministro eléctrico.`
  },
  {
    id: 'stop-bop',
    title: '9. Balance de Planta y Economía de Inversión',
    part: 'Turbina de 470 MWe, Subestación 400 kV y Coste LCOE',
    compTarget: 'turbine',
    camera: { x: 28, y: 12, z: -25, targetX: 20, targetY: 10, targetZ: -25 },
    speech: `Finalmente, el vapor seco acciona el alternador síncrono en la isla de turbinas, produciendo cuatrocientos setenta megavatios limpios. Con un LCOE objetivo de cincuenta a sesenta euros por megavatio hora y una huella de tan solo cuatro acres, el SMR revoluciona la competitividad nuclear frente a los grandes proyectos gigavatio del pasado.`
  }
];

// Modelos SMR Reales
const SMR_MODELS_DATA = {
  'iPWR-Integral': { name: 'iPWR Modular Integral (Diseño Pasivo UHS)', powerElect: 470, powerTherm: 1276, efficiency: 36.8, type: 'iPWR Integral en Piscina Pasiva UHS (Configuración NuScale / SMR Hall)' },
  'Rolls-Royce SMR': { name: 'Rolls-Royce SMR (470 MWe · Lazos)', powerElect: 470, powerTherm: 1276, efficiency: 36.8, type: 'PWR Modular Lazos Externos (470 MWe)' },
  'NuScale VOYGR': { name: 'NuScale VOYGR (Configuración Piscina)', powerElect: 462, powerTherm: 1500, efficiency: 31.0, type: 'iPWR Integral en Piscina UHS' },
  'GE Hitachi BWRX-300': { name: 'GE Hitachi BWRX-300', powerElect: 300, powerTherm: 870, efficiency: 34.5, type: 'iBWR (300 MWe)' },
  'EDF Nuward': { name: 'EDF Nuward SMR', powerElect: 340, powerTherm: 1080, efficiency: 31.5, type: 'PWR Doble (340 MWe)' }
};

// 5 Preguntas Didácticas del Quiz
const CLASS_QUIZ_QUESTIONS = [
  {
    q: '1. ¿Por qué el circuito primario de un SMR tipo PWR se mantiene puramente líquido a 320 °C dentro de la vasija?',
    options: [
      { text: 'A) Porque se mezcla con aditivos anticongelantes que inhiben la ebullición.', isCorrect: false },
      { text: 'B) Porque el presurizador eleva la presión a 155 bar, elevando el punto de saturación del agua a unos 345 °C.', isCorrect: true },
      { text: 'C) Porque las bombas impulsan el agua a velocidad sónica impidiendo burbujas.', isCorrect: false },
      { text: 'D) Porque los neutrones absorben las burbujas de vapor.', isCorrect: false }
    ],
    explanation: '¡Correcto! En termodinámica, a 155 bar la temperatura de saturación del agua asciende a unos 345 °C. A 320 °C el refrigerante permanece en estado puramente líquido con amplio margen de seguridad.'
  },
  {
    q: '2. En caso de apagón eléctrico total (Station Blackout), ¿cómo se detiene la reacción en cadena en un SMR?',
    options: [
      { text: 'A) Motores diésel de emergencia inyectan ácido bórico en 10 segundos.', isCorrect: false },
      { text: 'B) Un operario gira manualmente una palanca de disparo.', isCorrect: false },
      { text: 'C) Los electroimanes pierden corriente y las barras de control caen al núcleo por gravedad en < 2 segundos (diseño failsafe).', isCorrect: true },
      { text: 'D) Se inyecta helio líquido para congelar el combustible.', isCorrect: false }
    ],
    explanation: '¡Exacto! El principio de seguridad pasiva intrínseca garantiza que ante cualquier pérdida de energía las barras caen por su propio peso sin depender de motores ni operadores.'
  },
  {
    q: '3. ¿Qué beneficio técnico aporta albergar los generadores de vapor dentro de la misma vasija de presión (concepto integral iPWR)?',
    options: [
      { text: 'A) Elimina las grandes tuberías externas de bucle primario, suprimiendo la posibilidad de rotura de gran tubería (Large Break LOCA).', isCorrect: true },
      { text: 'B) Permite quemar carbón junto al combustible nuclear.', isCorrect: false },
      { text: 'C) Reduce el peso del módulo a menos de 5 toneladas.', isCorrect: false },
      { text: 'D) Evita el uso de agua como refrigerante.', isCorrect: false }
    ],
    explanation: '¡Excelente! En los PWR clásicos, una rotura en las tuberías de 80 cm de diámetro es el accidente base de diseño. En el iPWR todo está dentro de la vasija, eliminando este riesgo.'
  },
  {
    q: '4. ¿Por qué el espacio anular entre la vasija de presión (RPV) y la contención metálica se mantiene al vacío absoluto?',
    options: [
      { text: 'A) Para reducir el peso total de transporte del módulo.', isCorrect: false },
      { text: 'B) Proporciona aislamiento térmico óptimo en operación normal sin aislantes de fibra y permite condensación y disipación inmediata en emergencias.', isCorrect: true },
      { text: 'C) Para que el reactor no emita ruido audible.', isCorrect: false },
      { text: 'D) Para generar electricidad adicional por vacío.', isCorrect: false }
    ],
    explanation: '¡Muy bien! El vacío suprime la convección y conducción térmica durante el funcionamiento normal, y ante cualquier incidente de vapor permite condensación pasiva directa en la pared exterior sumergida en la piscina.'
  },
  {
    q: '5. ¿Cuál es la ventaja económica crucial de la modularidad y fabricación seriada del SMR frente al gigavatio convencional?',
    options: [
      { text: 'A) Genera electricidad a coste cero tras 5 años.', isCorrect: false },
      { text: 'B) Más del 90% se prefabrica en factoría bajo techo y se monta en menos de 24 meses, acortando radicalmente los intereses durante la construcción (IDC).', isCorrect: true },
      { text: 'C) No requiere personal de operación ni mantenimiento.', isCorrect: false },
      { text: 'D) Puede funcionar sin combustible durante 20 años.', isCorrect: false }
    ],
    explanation: '¡Correcto! Los sobrecostes históricos de la energía nuclear se deben a retrasos de más de 10 años en obras civiles in situ. La prefabricación modular en taller convierte la planta en un producto industrial con plazos y costes predecibles.'
  }
];

// ==========================================================================
// 3. REFERENCIAS Y CONTENEDORES DE LA ESCENA THREE.JS
// ==========================================================================
let gInteractiveMeshes = [];     // Meshes detectables por Raycaster
let gExplodableParts = [];       // Partes que se desplazan en la vista explosionada
let gComponentMeshMap = {};      // Mapa: componentId -> Array de meshes asociados
let gClosedVesselGroup = null;   // Grupo del reactor cerrado completo 360° (Metálico exterior)
let gCutawayVesselGroup = null;  // Grupo de carcasas con corte seccional 120° y paredes macizas
let gInternalGroup = null;       // Grupo de componentes internos (Núcleo, SG, Barras, Presurizador)
let gSceneRoots = {
  smrReactorModule: null,
  smrHallBuilding: null,
  smrPlantBOP: null,
  smrGeoLandscape: null
};

// Grupos de resaltado técnico de alto contraste (Neón láser y Glow volumétrico)
let gSelectionHighlightGroup = new THREE.Group();
let gPoolNeonRimGroup = new THREE.Group();

let safeFlight = {
  active: false,
  progress: 0,
  duration: 0.38,
  startPos: new THREE.Vector3(),
  targetPos: new THREE.Vector3(),
  startLook: new THREE.Vector3(),
  targetLook: new THREE.Vector3()
};

// ==========================================================================
// 4. INICIALIZACIÓN DEL MOTOR 3D Y LIENZO WEBGL
// ==========================================================================
function init3DExplorer() {
  const container = document.getElementById('canvas-3d-container');
  if (!container) return;

  // 1. Escena con atmósfera técnica industrial (claroscuro, hormigón y agua UHS)
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x060c16);
  scene.fog = new THREE.FogExp2(0x060c16, 0.0009);
  SMR_STATE.scene = scene;

  // Añadir grupos globales de resaltado técnico de alto contraste
  scene.add(gSelectionHighlightGroup);
  scene.add(gPoolNeonRimGroup);

  // 2. Cámaras: Perspectiva y Ortográfica CAD
  const aspect = window.innerWidth / window.innerHeight;
  const camera = new THREE.PerspectiveCamera(48, aspect, 0.2, 2000);
  camera.position.set(-0.4, 17.5, 27.2); // Encuadre angular industrial fotorrealista idéntico a imagen de referencia
  SMR_STATE.camera = camera;
  SMR_STATE.perspCamera = camera;

  const frustumSize = 34;
  const orthoCamera = new THREE.OrthographicCamera(
    -frustumSize * aspect / 2,
     frustumSize * aspect / 2,
     frustumSize / 2,
    -frustumSize / 2,
     0.1,
     2000
  );
  orthoCamera.position.copy(camera.position);
  SMR_STATE.orthoCamera = orthoCamera;

  // 3. Renderizador WebGL de alto rendimiento con mapeo de tonos fílmico
  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setClearColor(0x070b14, 1);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  container.appendChild(renderer.domElement);
  SMR_STATE.renderer = renderer;

  // 4. Controles orbitales con libertad total 360° sin restricciones ni giros accidentales
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 3.0;
  controls.maxDistance = 350;
  controls.minPolarAngle = 0.05; // Libertad cenital superior
  controls.maxPolarAngle = Math.PI - 0.05; // Libertad casi vertical inferior sin inversión
  controls.target.set(0.0, 10.8, -0.5); // Foco central equilibrado centrado en la vasija del SMR y la piscina UHS
  controls.addEventListener('start', () => {
    safeFlight.active = false; // Detener de inmediato cualquier vuelo guiado si el usuario interactúa manualmente
  });
  SMR_STATE.controls = controls;

  // 5. Raycaster para detección de clics y hovers
  SMR_STATE.raycaster = new THREE.Raycaster();

  // 6. Iluminación de Estudio de Alta Definición (Luminosa, sin sombras negras)
  setupStudioLighting(scene);

  // 7. Generar Texturas y Materiales Metálicos Grises
  createProceduralMaterials();

  // 8. CONSTRUIR LOS MODELOS 3D
  // A. Módulo SMR de Alta Precisión (Centro y Estrella del simulador)
  buildHighPrecisionSMRModule(scene);

  // B. Edificio de la Nave y Piscina de Contención (SMR Hall)
  buildSMRHallBuilding(scene);

  // C. Balance de Planta y Turbina (BOP)
  buildPlantBalanceBOP(scene);

  // D. Entorno Geográfico (Júcar / Reconversión)
  // Entorno geográfico eliminado según especificación del usuario

  // Diagnóstico de geometrías
  scene.traverse(obj => {
    if (obj.geometry && obj.geometry.attributes && obj.geometry.attributes.position) {
      const pos = obj.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        if (isNaN(pos.getX(i)) || isNaN(pos.getY(i)) || isNaN(pos.getZ(i))) {
          console.warn("NAN CYLINDER:", obj.userData, JSON.stringify(obj.geometry.parameters));
          break;
        }
      }
    }
  });

  // 9. Construir la UI: Lista de Componentes, Eventos y Tooltips
  buildComponentTreeUI();
  bindInteractionEvents();

  // 10. Aplicar Modo Inicial: 'smr-hall' (Nave y Piscina SMR Hall) 100% limpio de carteles
  setSceneMode('smr-hall');
  SMR_STATE.selectedComponentId = null;
  setCutawayMode('120');

  // 11. Redimensionado y bucle de animación
  window.addEventListener('resize', onWindowResize);
  animate();
}

// ==========================================================================
// 5. ILUMINACIÓN TÉCNICA E INDUSTRIAL (CLAROSCUROS Y RESPLANDOR UHS)
// ==========================================================================
function setupStudioLighting(scene) {
  // 1. Fondo industrial oscuro de nave técnica de contención con atmósfera técnica
  scene.background = new THREE.Color(0x060c16);
  scene.fog = new THREE.FogExp2(0x060c16, 0.0008);

  // 2. Luz de relleno ambiental fría industrial tenue para claroscuros marcados y oclusión ambiental rica
  const ambientLight = new THREE.AmbientLight(0x0a111e, 0.18);
  scene.add(ambientLight);

  // 3. Iluminación Directa Principal (Key Light) de alta definición y sombras suaves
  const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
  keyLight.position.set(18, 42, 24);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.width = 2048;
  keyLight.shadow.mapSize.height = 2048;
  keyLight.shadow.camera.near = 5;
  keyLight.shadow.camera.far = 160;
  const d = 32;
  keyLight.shadow.camera.left = -d;
  keyLight.shadow.camera.right = d;
  keyLight.shadow.camera.top = d;
  keyLight.shadow.camera.bottom = -d;
  keyLight.shadow.bias = -0.0003;
  scene.add(keyLight);

  // 4. Luz de contra fría (Rim Light) para resaltar silueta del reactor, tuberías y pasarelas
  const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.55);
  rimLight.position.set(-24, 28, -22);
  scene.add(rimLight);

  // 5. Seis Focos Industriales de Campana en el Techo (High-Bay Luminaires 5500K)
  const highBayPositions = [
    { x: -10, y: 24.5, z: -8 },
    { x: 0,   y: 24.5, z: -8 },
    { x: 10,  y: 24.5, z: -8 },
    { x: -10, y: 24.5, z: 8 },
    { x: 0,   y: 24.5, z: 8 },
    { x: 10,  y: 24.5, z: 8 }
  ];
  highBayPositions.forEach(pos => {
    // Atenuación cuadrática real para concentrar el haz hacia el suelo y evitar saturar los muros
    const lamp = new THREE.PointLight(0xfff6e5, 0.45, 32, 2.0);
    lamp.position.set(pos.x, pos.y, pos.z);
    scene.add(lamp);

    // Carcasa física de la campana industrial con difusor
    const lampHood = new THREE.Mesh(
      new THREE.ConeGeometry(0.58, 0.48, 16, 1, true),
      new THREE.MeshStandardMaterial({ color: 0x242a34, roughness: 0.35, metalness: 0.85, side: THREE.DoubleSide })
    );
    lampHood.position.set(pos.x, pos.y + 0.1, pos.z);
    lampHood.rotation.x = Math.PI;
    scene.add(lampHood);

    // Bombilla emisiva protegida por rejilla
    const bulb = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0xfffae0 })
    );
    bulb.position.set(pos.x, pos.y - 0.12, pos.z);
    scene.add(bulb);
  });

  // 6. Luces de Emergencia y Balizas Ámbar de Pasarela
  const beaconPositions = [
    { x: -14.8, y: 17.5, z: -8.0 },
    { x: 14.8,  y: 17.5, z: 6.0 }
  ];
  beaconPositions.forEach(bPos => {
    const beaconLight = new THREE.PointLight(0xf59e0b, 0.85, 14, 1.6);
    beaconLight.position.set(bPos.x, bPos.y, bPos.z);
    scene.add(beaconLight);
  });

  // 7. Focos Técnicos Focalizados (Spotlights con recorte definido)
  // Spot 1: Haz sobre el colector de vapor principal y amortiguadores sísmicos
  const spotSteam = new THREE.SpotLight(0xffffff, 1.6, 38, Math.PI / 4, 0.35);
  spotSteam.position.set(14.0, 20.0, 8.0);
  spotSteam.target.position.set(2.0, 14.0, 0.0);
  scene.add(spotSteam);
  scene.add(spotSteam.target);

  // Spot 2: Haz cenital frío sobre la cúpula del reactor y cabezales CRDM
  const spotCrown = new THREE.SpotLight(0xbae6fd, 1.4, 34, Math.PI / 5, 0.4);
  spotCrown.position.set(-8.0, 25.0, 12.0);
  spotCrown.target.position.set(0.0, 19.0, 0.0);
  scene.add(spotCrown);
  scene.add(spotCrown.target);

  // Spot 3: Proyector técnico de obra centrado en el reactor nuclear SMR (intensidad calibrada sin sobreexposición)
  const spotVessel = new THREE.SpotLight(0xf1f5f9, 1.1, 48, Math.PI / 4.5, 0.45);
  spotVessel.position.set(-6.0, 26.0, 16.0);
  spotVessel.target.position.set(0.0, 11.0, 0.0);
  scene.add(spotVessel);
  scene.add(spotVessel.target);

  // 8. Seis Proyectores Subacuáticos Cherenkov (intensidad reducida un 75% para eliminar sobreexposición del fondo)
  const underwaterPositions = [
    { x: -8.0, y: 2.8, z: -6.0, col: 0x00d4ea, inten: 0.11, dist: 16 },
    { x: 8.0,  y: 2.8, z: -6.0, col: 0x00d4ea, inten: 0.11, dist: 16 },
    { x: -8.0, y: 2.8, z: 6.0,  col: 0x00d4ea, inten: 0.11, dist: 16 },
    { x: 8.0,  y: 2.8, z: 6.0,  col: 0x00d4ea, inten: 0.11, dist: 16 },
    { x: 0.0,  y: 6.0, z: -4.5, col: 0x0284c7, inten: 0.10, dist: 14 },
    { x: 0.0,  y: 6.0, z: 4.5,  col: 0x0284c7, inten: 0.10, dist: 14 }
  ];
  underwaterPositions.forEach(up => {
    const pLight = new THREE.PointLight(up.col, up.inten, up.dist, 2.0);
    pLight.position.set(up.x, up.y, up.z);
    scene.add(pLight);
  });

  // 8B. Proyector de haz rasante contra-cámara (Destellos especulares suaves y atenuados en el agua)
  const waterGlintLight = new THREE.DirectionalLight(0xffffff, 0.25);
  waterGlintLight.position.set(0, 18.0, -14.0);
  waterGlintLight.target.position.set(0, 10.5, 4.0);
  scene.add(waterGlintLight);
  scene.add(waterGlintLight.target);

  // 9. Mapa de Entorno HDRI Procedural (Iluminación Basada en Imagen IBL y Reflejos Especulares)
  try {
    if (SMR_STATE.renderer) {
      const pmrem = new THREE.PMREMGenerator(SMR_STATE.renderer);
      pmrem.compileEquirectangularShader();

      const cvEnv = document.createElement('canvas');
      cvEnv.width = 1024;
      cvEnv.height = 512;
      const ctxE = cvEnv.getContext('2d');

      // Bóveda ambiental de nave nuclear
      const envGrad = ctxE.createLinearGradient(0, 0, 0, 512);
      envGrad.addColorStop(0, '#111827');
      envGrad.addColorStop(0.35, '#2e3846');
      envGrad.addColorStop(0.5, '#3b4756');
      envGrad.addColorStop(0.65, '#1e2837');
      envGrad.addColorStop(1, '#023848');
      ctxE.fillStyle = envGrad;
      ctxE.fillRect(0, 0, 1024, 512);

      // Franjas de luz cenital blanca brillante (proyectores de nave industrial)
      ctxE.fillStyle = '#ffffff';
      for (let lx = 60; lx < 980; lx += 150) {
        ctxE.fillRect(lx, 15, 100, 35);
        const lG = ctxE.createRadialGradient(lx + 50, 32, 5, lx + 50, 32, 70);
        lG.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
        lG.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctxE.fillStyle = lG;
        ctxE.fillRect(lx - 25, 0, 150, 90);
      }

      // Focos y proyectores de foso a cota media (reflejo directo rasante sobre las olas del agua a 70°-80°)
      for (let lx = 90; lx < 950; lx += 180) {
        ctxE.fillStyle = '#ffffff';
        ctxE.fillRect(lx, 165, 110, 28);
        const mG = ctxE.createRadialGradient(lx + 55, 179, 4, lx + 55, 179, 65);
        mG.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        mG.addColorStop(0.5, 'rgba(235, 248, 255, 0.60)');
        mG.addColorStop(1, 'rgba(200, 230, 255, 0)');
        ctxE.fillStyle = mG;
        ctxE.fillRect(lx - 30, 135, 170, 90);
      }

      // Reflejo acuático industrial profundo en la mitad inferior (sin tinte turquesa plano)
      const waterG = ctxE.createLinearGradient(0, 340, 0, 512);
      waterG.addColorStop(0, 'rgba(10, 24, 38, 0.20)');
      waterG.addColorStop(0.5, 'rgba(8, 32, 52, 0.45)');
      waterG.addColorStop(1, 'rgba(4, 18, 30, 0.70)');
      ctxE.fillStyle = waterG;
      ctxE.fillRect(0, 340, 1024, 172);

      const envTex = new THREE.CanvasTexture(cvEnv);
      envTex.mapping = THREE.EquirectangularReflectionMapping;
      const envRenderTarget = pmrem.fromEquirectangular(envTex);
      scene.environment = envRenderTarget.texture;
      pmrem.dispose();
      envTex.dispose();
    }
  } catch (e) {
    console.warn("Could not generate procedural PMREM environment:", e);
  }
}

// ==========================================================================
// 6. TEXTURAS PROCEDURALES Y MATERIALES PBR INDUSTRIALES FOTORREALISTAS
// ==========================================================================
let gTextures = {};
let gMaterials = {};

function createProceduralTextures() {
  // --------------------------------------------------------------------------
  // 1. Textura de Hormigón Armado Envejecido (2048x2048) con manchas de óxido y filtraciones
  // --------------------------------------------------------------------------
  const cvConc = document.createElement('canvas');
  cvConc.width = 2048;
  cvConc.height = 2048;
  const ctxC = cvConc.getContext('2d');

  // Base multicapa de cemento industrial envejecido y oscurecido
  ctxC.fillStyle = '#48505c';
  ctxC.fillRect(0, 0, 2048, 2048);

  const imgDataC = ctxC.getImageData(0, 0, 2048, 2048);
  const dataC = imgDataC.data;
  // Ruido de áridos finos, micro-poros y gravilla
  for (let i = 0; i < dataC.length; i += 4) {
    const n = (Math.random() - 0.5) * 38;
    const toneShift = (Math.sin((i / 4) * 0.001) - 0.5) * 8;
    dataC[i]     = Math.min(255, Math.max(0, dataC[i] + n + toneShift));
    dataC[i + 1] = Math.min(255, Math.max(0, dataC[i + 1] + n + toneShift));
    dataC[i + 2] = Math.min(255, Math.max(0, dataC[i + 2] + n + toneShift * 0.8));
  }
  ctxC.putImageData(imgDataC, 0, 0);

  // Paneles de encofrado (512x340 px)
  const pw = 512, ph = 340;
  for (let y = 0; y < 2048; y += ph) {
    for (let x = 0; x < 2048; x += pw) {
      // Línea de junta de dilatación y sellado elastomérico oscuro
      ctxC.strokeStyle = 'rgba(16, 20, 26, 0.75)';
      ctxC.lineWidth = 2.2;
      ctxC.strokeRect(x, y, pw, ph);

      // Resalte biselado fino superior (luz rasante)
      ctxC.strokeStyle = 'rgba(195, 210, 225, 0.20)';
      ctxC.lineWidth = 1.0;
      ctxC.strokeRect(x + 1, y + 1, pw - 2, ph - 2);

      // Orificios de espaciadores de encofrado (Tie-rod holes) con conos cónicos
      const holes = [
        { hx: x + pw * 0.16, hy: y + ph * 0.25 },
        { hx: x + pw * 0.84, hy: y + ph * 0.25 },
        { hx: x + pw * 0.16, hy: y + ph * 0.75 },
        { hx: x + pw * 0.84, hy: y + ph * 0.75 }
      ];

      holes.forEach(hp => {
        // Arandela y cono
        ctxC.beginPath();
        ctxC.arc(hp.hx, hp.hy, 7.5, 0, Math.PI * 2);
        ctxC.fillStyle = '#282e36';
        ctxC.fill();
        ctxC.strokeStyle = '#15191f';
        ctxC.lineWidth = 1.2;
        ctxC.stroke();

        // Cono central profundo
        ctxC.beginPath();
        ctxC.arc(hp.hx, hp.hy, 4.2, 0, Math.PI * 2);
        ctxC.fillStyle = '#0f1217';
        ctxC.fill();

        // Perno hexagonal de apriete
        ctxC.beginPath();
        ctxC.arc(hp.hx, hp.hy, 1.8, 0, Math.PI * 2);
        ctxC.fillStyle = '#64748b';
        ctxC.fill();

        // Churretones y escorrentías de óxido descendente (Rust drips)
        const dripLen = 40 + Math.random() * 85;
        const rGrad = ctxC.createLinearGradient(hp.hx, hp.hy + 5, hp.hx, hp.hy + dripLen);
        rGrad.addColorStop(0, 'rgba(175, 75, 20, 0.65)');
        rGrad.addColorStop(0.3, 'rgba(135, 52, 14, 0.45)');
        rGrad.addColorStop(0.7, 'rgba(100, 38, 10, 0.25)');
        rGrad.addColorStop(1, 'rgba(100, 38, 10, 0)');

        ctxC.fillStyle = rGrad;
        ctxC.beginPath();
        ctxC.moveTo(hp.hx - 4.5, hp.hy + 4);
        ctxC.lineTo(hp.hx + 4.5, hp.hy + 4);
        ctxC.lineTo(hp.hx + 1.2, hp.hy + dripLen);
        ctxC.lineTo(hp.hx - 1.2, hp.hy + dripLen);
        ctxC.closePath();
        ctxC.fill();
      });

      // Eflorescencias minerales blancas (sales de carbonato cálcico que lixivian de juntas)
      if (Math.random() > 0.4) {
        const effGrad = ctxC.createLinearGradient(x, y, x, y + 35);
        effGrad.addColorStop(0, 'rgba(230, 240, 250, 0.35)');
        effGrad.addColorStop(0.5, 'rgba(220, 230, 240, 0.15)');
        effGrad.addColorStop(1, 'rgba(220, 230, 240, 0)');
        ctxC.fillStyle = effGrad;
        ctxC.fillRect(x + pw * 0.1, y, pw * 0.8, 30);
      }
    }
  }

  // Grandes manchas de filtración y humedad cerca del nivel de la piscina y juntas verticales
  for (let s = 0; s < 14; s++) {
    const sx = (s / 14) * 2048 + (Math.random() - 0.5) * 80;
    const sy = 600 + Math.random() * 600;
    const sLen = 500 + Math.random() * 800;
    const sWidth = 40 + Math.random() * 90;

    const seepGrad = ctxC.createLinearGradient(sx, sy, sx, sy + sLen);
    seepGrad.addColorStop(0, 'rgba(14, 20, 28, 0.68)');
    seepGrad.addColorStop(0.4, 'rgba(20, 28, 38, 0.45)');
    seepGrad.addColorStop(0.85, 'rgba(28, 36, 46, 0.20)');
    seepGrad.addColorStop(1, 'rgba(28, 36, 46, 0)');

    ctxC.fillStyle = seepGrad;
    ctxC.fillRect(sx - sWidth / 2, sy, sWidth, sLen);
  }

  // Manchas de óxido procedentes de anclajes de planchas de acero
  for (let r = 0; r < 8; r++) {
    const rx = 150 + Math.random() * 1748;
    const ry = 250 + Math.random() * 1200;
    const rGrad = ctxC.createLinearGradient(rx, ry, rx, ry + 160);
    rGrad.addColorStop(0, 'rgba(165, 68, 18, 0.70)');
    rGrad.addColorStop(0.4, 'rgba(130, 50, 12, 0.45)');
    rGrad.addColorStop(1, 'rgba(90, 35, 8, 0)');
    ctxC.fillStyle = rGrad;
    ctxC.beginPath();
    ctxC.moveTo(rx - 16, ry);
    ctxC.lineTo(rx + 16, ry);
    ctxC.lineTo(rx + 3, ry + 160);
    ctxC.lineTo(rx - 3, ry + 160);
    ctxC.closePath();
    ctxC.fill();
  }

  const concreteTex = new THREE.CanvasTexture(cvConc);
  concreteTex.wrapS = THREE.RepeatWrapping;
  concreteTex.wrapT = THREE.RepeatWrapping;
  concreteTex.repeat.set(2, 2);
  gTextures.concreteAged = concreteTex;

  // --------------------------------------------------------------------------
  // 2. Bump Map y Roughness Map de Hormigón Armado de Alta Definición
  // --------------------------------------------------------------------------
  const cvBump = document.createElement('canvas');
  cvBump.width = 1024;
  cvBump.height = 1024;
  const ctxB = cvBump.getContext('2d');
  ctxB.fillStyle = '#808080';
  ctxB.fillRect(0, 0, 1024, 1024);

  // Rugosidad granulosa de áridos y micro-poros
  const bumpData = ctxB.getImageData(0, 0, 1024, 1024);
  for (let i = 0; i < bumpData.data.length; i += 4) {
    const v = 128 + (Math.random() - 0.5) * 58;
    bumpData.data[i] = v;
    bumpData.data[i+1] = v;
    bumpData.data[i+2] = v;
  }
  ctxB.putImageData(bumpData, 0, 0);

  // Juntas de encofrado rebajadas profundas y marcas de tablón
  const bpw = 256, bph = 170;
  for (let y = 0; y < 1024; y += bph) {
    for (let x = 0; x < 1024; x += bpw) {
      // Línea de junta de panel en bajo relieve profundo
      ctxB.strokeStyle = '#181818';
      ctxB.lineWidth = 3.5;
      ctxB.strokeRect(x, y, bpw, bph);

      // Biselado perimetral del panel
      ctxB.strokeStyle = '#a4a4a4';
      ctxB.lineWidth = 1.2;
      ctxB.strokeRect(x + 2, y + 2, bpw - 4, bph - 4);

      // Vetas horizontales de encofrado fenólico de madera
      for (let ly = y + 20; ly < y + bph - 15; ly += 24) {
        ctxB.strokeStyle = Math.random() > 0.5 ? '#606060' : '#9a9a9a';
        ctxB.lineWidth = 1.0;
        ctxB.beginPath();
        ctxB.moveTo(x + 4, ly);
        ctxB.lineTo(x + bpw - 4, ly);
        ctxB.stroke();
      }

      // Orificios cónicos de tirantes (Tie-rod holes) en 4 esquinas
      [{ hx: x + bpw * 0.16, hy: y + bph * 0.25 }, { hx: x + bpw * 0.84, hy: y + bph * 0.25 },
       { hx: x + bpw * 0.16, hy: y + bph * 0.75 }, { hx: x + bpw * 0.84, hy: y + bph * 0.75 }].forEach(hp => {
        ctxB.beginPath();
        ctxB.arc(hp.hx, hp.hy, 6.0, 0, Math.PI * 2);
        ctxB.fillStyle = '#080808';
        ctxB.fill();

        ctxB.beginPath();
        ctxB.arc(hp.hx, hp.hy, 7.5, 0, Math.PI * 2);
        ctxB.strokeStyle = '#2a2a2a';
        ctxB.lineWidth = 1.5;
        ctxB.stroke();
      });
    }
  }
  const concreteBump = new THREE.CanvasTexture(cvBump);
  concreteBump.wrapS = THREE.RepeatWrapping;
  concreteBump.wrapT = THREE.RepeatWrapping;
  concreteBump.repeat.set(2, 2);
  gTextures.concreteBump = concreteBump;

  // Mapa de Rugosidad (Roughness Map): Mate seco base con zonas de filtración lisas/reflectantes
  const cvRough = document.createElement('canvas');
  cvRough.width = 1024;
  cvRough.height = 1024;
  const ctxR = cvRough.getContext('2d');
  ctxR.fillStyle = '#eaeaea'; // Mate base ~0.92
  ctxR.fillRect(0, 0, 1024, 1024);

  // Variación por panel de hormigón
  for (let y = 0; y < 1024; y += bph) {
    for (let x = 0; x < 1024; x += bpw) {
      const pRough = 0.85 + (Math.random() - 0.5) * 0.12;
      const grayVal = Math.floor(pRough * 255);
      ctxR.fillStyle = `rgb(${grayVal},${grayVal},${grayVal})`;
      ctxR.fillRect(x + 2, y + 2, bpw - 4, bph - 4);
    }
  }

  // Manchas de humedad descendentes con rugosidad reflectante
  for (let s = 0; s < 16; s++) {
    const sx = (s / 16) * 1024 + (Math.random() - 0.5) * 50;
    const sy = 250 + Math.random() * 350;
    const sLen = 280 + Math.random() * 450;
    const sGrad = ctxR.createLinearGradient(sx, sy, sx, sy + sLen);
    sGrad.addColorStop(0, '#424242'); // Brillo húmedo de agua ~0.26
    sGrad.addColorStop(0.5, '#686868');
    sGrad.addColorStop(1, '#eaeaea');
    ctxR.fillStyle = sGrad;
    ctxR.fillRect(sx - 25, sy, 50, sLen);
  }
  const concreteRough = new THREE.CanvasTexture(cvRough);
  concreteRough.wrapS = THREE.RepeatWrapping;
  concreteRough.wrapT = THREE.RepeatWrapping;
  concreteRough.repeat.set(2, 2);
  gTextures.concreteRoughness = concreteRough;

  // --------------------------------------------------------------------------
  // 2B. Revestimiento de Piscina (Liner Inox 304L): Cuadrícula de Placas Soldadas
  // --------------------------------------------------------------------------
  const cvLiner = document.createElement('canvas');
  cvLiner.width = 1024;
  cvLiner.height = 1024;
  const ctxL = cvLiner.getContext('2d');

  // Base de acero inoxidable plateado 304L (elimina el color turquesa)
  ctxL.fillStyle = '#a6b0be';
  ctxL.fillRect(0, 0, 1024, 1024);

  // Grano de laminación direccional cepillado
  const imgDataL = ctxL.getImageData(0, 0, 1024, 1024);
  const dataL = imgDataL.data;
  for (let y = 0; y < 1024; y++) {
    const lineNoise = (Math.random() - 0.5) * 12;
    for (let x = 0; x < 1024; x++) {
      const idx = (y * 1024 + x) * 4;
      const grain = (Math.random() - 0.5) * 18 + lineNoise;
      dataL[idx]     = Math.min(255, Math.max(0, dataL[idx] + grain));
      dataL[idx + 1] = Math.min(255, Math.max(0, dataL[idx + 1] + grain));
      dataL[idx + 2] = Math.min(255, Math.max(0, dataL[idx + 2] + grain + 2));
    }
  }
  ctxL.putImageData(imgDataL, 0, 0);

  // Cuadrícula de placas metálicas soldadas (256x256 px) con cordones TIG visibles
  const lpw = 256;
  for (let y = 0; y < 1024; y += lpw) {
    for (let x = 0; x < 1024; x += lpw) {
      // Sutil variación de reflectividad entre placas adyacentes
      const tint = (Math.random() - 0.5) * 10;
      ctxL.fillStyle = tint > 0 ? `rgba(255,255,255,${(tint/100).toFixed(2)})` : `rgba(0,0,0,${(-tint/100).toFixed(2)})`;
      ctxL.fillRect(x + 2, y + 2, lpw - 4, lpw - 4);

      // Cordones continuos de soldadura TIG en las uniones perimetrales
      ctxL.strokeStyle = 'rgba(60, 72, 88, 0.85)';
      ctxL.lineWidth = 3.0;
      ctxL.strokeRect(x, y, lpw, lpw);

      // Zona afectada térmicamente (HAZ - Heat-Affected Zone) azulada/dorada en bordes
      ctxL.strokeStyle = 'rgba(70, 115, 175, 0.22)';
      ctxL.lineWidth = 6.0;
      ctxL.strokeRect(x, y, lpw, lpw);

      // Ondas escamadas del cordón de soldadura TIG
      ctxL.fillStyle = '#4a5462';
      for (let wx = x; wx < x + lpw; wx += 10) {
        ctxL.beginPath();
        ctxL.arc(wx, y, 2.5, 0, Math.PI * 2);
        ctxL.fill();
      }
      for (let wy = y; wy < y + lpw; wy += 10) {
        ctxL.beginPath();
        ctxL.arc(x, wy, 2.5, 0, Math.PI * 2);
        ctxL.fill();
      }

      // Remaches/puntos de soldadura de esquina
      [[x + 12, y + 12], [x + lpw - 12, y + 12], [x + 12, y + lpw - 12], [x + lpw - 12, y + lpw - 12]].forEach(([px, py]) => {
        ctxL.beginPath();
        ctxL.arc(px, py, 3.2, 0, Math.PI * 2);
        ctxL.fillStyle = '#3a4450';
        ctxL.fill();
        ctxL.strokeStyle = '#7c8898';
        ctxL.lineWidth = 1.2;
        ctxL.stroke();
      });
    }
  }
  const poolLinerTex = new THREE.CanvasTexture(cvLiner);
  poolLinerTex.wrapS = THREE.RepeatWrapping;
  poolLinerTex.wrapT = THREE.RepeatWrapping;
  poolLinerTex.repeat.set(4, 4);
  gTextures.poolLinerMap = poolLinerTex;

  // Bump Map del Liner de Piscina (Juntas y cordones TIG en relieve)
  const cvLBump = document.createElement('canvas');
  cvLBump.width = 1024;
  cvLBump.height = 1024;
  const ctxLB = cvLBump.getContext('2d');
  ctxLB.fillStyle = '#808080';
  ctxLB.fillRect(0, 0, 1024, 1024);

  for (let y = 0; y < 1024; y += lpw) {
    for (let x = 0; x < 1024; x += lpw) {
      // Línea de unión rehundida
      ctxLB.strokeStyle = '#404040';
      ctxLB.lineWidth = 4.0;
      ctxLB.strokeRect(x, y, lpw, lpw);

      // Cordón TIG en relieve sobresaliente
      ctxLB.strokeStyle = '#b8b8b8';
      ctxLB.lineWidth = 2.0;
      ctxLB.strokeRect(x, y, lpw, lpw);

      for (let wx = x; wx < x + lpw; wx += 10) {
        ctxLB.fillStyle = '#c8c8c8';
        ctxLB.beginPath();
        ctxLB.arc(wx, y, 2.2, 0, Math.PI * 2);
        ctxLB.fill();
      }
      for (let wy = y; wy < y + lpw; wy += 10) {
        ctxLB.fillStyle = '#c8c8c8';
        ctxLB.beginPath();
        ctxLB.arc(x, wy, 2.2, 0, Math.PI * 2);
        ctxLB.fill();
      }
    }
  }
  const poolLinerBump = new THREE.CanvasTexture(cvLBump);
  poolLinerBump.wrapS = THREE.RepeatWrapping;
  poolLinerBump.wrapT = THREE.RepeatWrapping;
  poolLinerBump.repeat.set(4, 4);
  gTextures.poolLinerBump = poolLinerBump;

  // Roughness Map del Liner
  const cvLRough = document.createElement('canvas');
  cvLRough.width = 512;
  cvLRough.height = 512;
  const ctxLR = cvLRough.getContext('2d');
  ctxLR.fillStyle = '#585858'; // Acero laminado 304L ~0.35
  ctxLR.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y += 128) {
    for (let x = 0; x < 512; x += 128) {
      ctxLR.strokeStyle = '#7c7c7c'; // Cordón de soldadura ligeramente más mate ~0.48
      ctxLR.lineWidth = 3.0;
      ctxLR.strokeRect(x, y, 128, 128);
    }
  }
  const poolLinerRough = new THREE.CanvasTexture(cvLRough);
  poolLinerRough.wrapS = THREE.RepeatWrapping;
  poolLinerRough.wrapT = THREE.RepeatWrapping;
  poolLinerRough.repeat.set(4, 4);
  gTextures.poolLinerRoughness = poolLinerRough;

  // --------------------------------------------------------------------------
  // 2C. Bump Map de Acero Cepillado y Soldaduras Circunferenciales
  // --------------------------------------------------------------------------
  const cvBrushed = document.createElement('canvas');
  cvBrushed.width = 1024;
  cvBrushed.height = 1024;
  const ctxBr = cvBrushed.getContext('2d');
  ctxBr.fillStyle = '#808080';
  ctxBr.fillRect(0, 0, 1024, 1024);

  // Micro-ranuras de torno y cepillado mecánico
  for (let y = 0; y < 1024; y += 4) {
    ctxBr.strokeStyle = (Math.random() > 0.5) ? '#8e8e8e' : '#727272';
    ctxBr.lineWidth = 1.0;
    ctxBr.beginPath();
    ctxBr.moveTo(0, y);
    ctxBr.lineTo(1024, y);
    ctxBr.stroke();
  }

  // Cordones de soldadura perimetrales circunferenciales en anillos
  [180, 420, 680, 910].forEach(wy => {
    // Valle de la junta
    ctxBr.fillStyle = '#505050';
    ctxBr.fillRect(0, wy - 4, 1024, 8);
    // Corona del cordón en relieve
    ctxBr.fillStyle = '#c4c4c4';
    ctxBr.fillRect(0, wy - 2, 1024, 4);
    for (let x = 0; x < 1024; x += 12) {
      ctxBr.beginPath();
      ctxBr.arc(x, wy, 3.5, 0, Math.PI * 2);
      ctxBr.fillStyle = '#d0d0d0';
      ctxBr.fill();
    }
  });
  const brushedSteelBump = new THREE.CanvasTexture(cvBrushed);
  brushedSteelBump.wrapS = THREE.RepeatWrapping;
  brushedSteelBump.wrapT = THREE.RepeatWrapping;
  gTextures.brushedSteelBump = brushedSteelBump;

  // --------------------------------------------------------------------------
  // 3. Textura de Acero Forjado Nuclear y Vasija de Contención (2048x2048)
  // Grano de laminación, cordones de soldadura con halo térmico HAZ, micro-ralladuras
  // --------------------------------------------------------------------------
  const cvSteel = document.createElement('canvas');
  cvSteel.width = 2048;
  cvSteel.height = 2048;
  const ctxSt = cvSteel.getContext('2d');

  // Base de acero forjado gris claro con grano de laminación vertical
  ctxSt.fillStyle = '#9aa4b2';
  ctxSt.fillRect(0, 0, 2048, 2048);

  const imgDataSt = ctxSt.getImageData(0, 0, 2048, 2048);
  const dataSt = imgDataSt.data;
  for (let y = 0; y < 2048; y++) {
    const lineNoise = (Math.random() - 0.5) * 14;
    for (let x = 0; x < 2048; x++) {
      const idx = (y * 2048 + x) * 4;
      const grain = (Math.random() - 0.5) * 22 + lineNoise;
      dataSt[idx]     = Math.min(255, Math.max(0, dataSt[idx] + grain));
      dataSt[idx + 1] = Math.min(255, Math.max(0, dataSt[idx + 1] + grain));
      dataSt[idx + 2] = Math.min(255, Math.max(0, dataSt[idx + 2] + grain + 2));
    }
  }
  ctxSt.putImageData(imgDataSt, 0, 0);

  // Cuatro cordones circunferenciales de soldadura con zonas afectadas térmicamente (HAZ)
  const weldHeights = [320, 780, 1260, 1720];
  weldHeights.forEach(wy => {
    // Halo exterior de oxidación térmica (Paja / Bronce dorado)
    const hazStraw = ctxSt.createLinearGradient(0, wy - 36, 0, wy + 36);
    hazStraw.addColorStop(0, 'rgba(212, 160, 48, 0)');
    hazStraw.addColorStop(0.3, 'rgba(212, 160, 48, 0.28)');
    hazStraw.addColorStop(0.7, 'rgba(212, 160, 48, 0.28)');
    hazStraw.addColorStop(1, 'rgba(212, 160, 48, 0)');
    ctxSt.fillStyle = hazStraw;
    ctxSt.fillRect(0, wy - 36, 2048, 72);

    // Halo intermedio violeta/púrpura térmico
    const hazViolet = ctxSt.createLinearGradient(0, wy - 20, 0, wy + 20);
    hazViolet.addColorStop(0, 'rgba(140, 75, 150, 0)');
    hazViolet.addColorStop(0.35, 'rgba(140, 75, 150, 0.32)');
    hazViolet.addColorStop(0.65, 'rgba(140, 75, 150, 0.32)');
    hazViolet.addColorStop(1, 'rgba(140, 75, 150, 0)');
    ctxSt.fillStyle = hazViolet;
    ctxSt.fillRect(0, wy - 20, 2048, 40);

    // Halo interno azul cobalto eléctrico (reacción a 300°C+)
    const hazBlue = ctxSt.createLinearGradient(0, wy - 10, 0, wy + 10);
    hazBlue.addColorStop(0, 'rgba(40, 95, 190, 0)');
    hazBlue.addColorStop(0.4, 'rgba(40, 95, 190, 0.40)');
    hazBlue.addColorStop(0.6, 'rgba(40, 95, 190, 0.40)');
    hazBlue.addColorStop(1, 'rgba(40, 95, 190, 0)');
    ctxSt.fillStyle = hazBlue;
    ctxSt.fillRect(0, wy - 10, 2048, 20);

    // Cordón central de soldadura por arco sumergido (escamado de onda)
    ctxSt.fillStyle = '#4c5460';
    ctxSt.fillRect(0, wy - 3, 2048, 6);
    ctxSt.strokeStyle = '#2d333c';
    ctxSt.lineWidth = 1.4;
    for (let x = 0; x < 2048; x += 12) {
      ctxSt.beginPath();
      ctxSt.arc(x, wy, 4, 0, Math.PI * 2);
      ctxSt.stroke();
    }
  });

  // Soldaduras longitudinales verticales (4 cuadrantes)
  [0, 512, 1024, 1536].forEach(wx => {
    const vWeld = ctxSt.createLinearGradient(wx - 16, 0, wx + 16, 0);
    vWeld.addColorStop(0, 'rgba(40, 95, 190, 0)');
    vWeld.addColorStop(0.5, 'rgba(40, 95, 190, 0.35)');
    vWeld.addColorStop(1, 'rgba(40, 95, 190, 0)');
    ctxSt.fillStyle = vWeld;
    ctxSt.fillRect(wx - 16, 0, 32, 2048);

    ctxSt.fillStyle = '#4a525e';
    ctxSt.fillRect(wx - 2.5, 0, 5, 2048);
  });

  // Rayones finos y rozaduras de fricción / izado con eslingas de grúa
  for (let sc = 0; sc < 35; sc++) {
    const sx = Math.random() * 2048;
    const sy = Math.random() * 2048;
    const sl = 30 + Math.random() * 120;
    const sang = Math.PI * 0.48 + (Math.random() - 0.5) * 0.2; // Casi verticales

    ctxSt.beginPath();
    ctxSt.moveTo(sx, sy);
    ctxSt.lineTo(sx + Math.cos(sang) * sl, sy + Math.sin(sang) * sl);
    ctxSt.strokeStyle = 'rgba(215, 230, 245, 0.32)';
    ctxSt.lineWidth = 0.9;
    ctxSt.stroke();
  }

  // Zonas de polvo industrial acumulado en recovecos inferiores
  const grimeGrad = ctxSt.createLinearGradient(0, 1850, 0, 2048);
  grimeGrad.addColorStop(0, 'rgba(20, 24, 30, 0)');
  grimeGrad.addColorStop(1, 'rgba(20, 24, 30, 0.50)');
  ctxSt.fillStyle = grimeGrad;
  ctxSt.fillRect(0, 1850, 2048, 198);

  // Placa técnica de marcado ASME grabada en el cuadrante frontal
  ctxSt.fillStyle = '#222830';
  ctxSt.fillRect(220, 900, 360, 160);
  ctxSt.strokeStyle = '#c0c8d4';
  ctxSt.lineWidth = 3;
  ctxSt.strokeRect(220, 900, 360, 160);

  // Tornillos en esquinas de placa
  [[230, 910], [570, 910], [230, 1050], [570, 1050]].forEach(([bx, by]) => {
    ctxSt.beginPath();
    ctxSt.arc(bx, by, 3.5, 0, Math.PI * 2);
    ctxSt.fillStyle = '#94a3b8';
    ctxSt.fill();
  });

  ctxSt.fillStyle = '#f1f5f9';
  ctxSt.font = 'bold 18px monospace';
  ctxSt.fillText('iPWR MODULAR INTEGRAL · UHS 470 MWe', 242, 936);
  ctxSt.font = '13px monospace';
  ctxSt.fillStyle = '#94a3b8';
  ctxSt.fillText('ASME BPVC SEC III DIV 1 · CLASSE 1E', 242, 964);
  ctxSt.fillText('DESIGN: 5.0 MPa / 260°C · CARBON STEEL', 242, 988);
  ctxSt.fillText('SER. NO. iPWR-UHS-2026-ESP · N-STAMP', 242, 1012);
  ctxSt.fillStyle = '#38bdf8';
  ctxSt.fillText('● INSPECTED & CERTIFIED', 242, 1038);

  const reactorSteelTex = new THREE.CanvasTexture(cvSteel);
  gTextures.reactorSteelMap = reactorSteelTex;

  // Rugosidad del acero: zonas pulidas vs soldaduras mates vs polvo
  const cvStRough = document.createElement('canvas');
  cvStRough.width = 1024;
  cvStRough.height = 1024;
  const ctxStR = cvStRough.getContext('2d');
  ctxStR.fillStyle = '#3c3c3c'; // Brillo metálico base (~0.24)
  ctxStR.fillRect(0, 0, 1024, 1024);

  // Soldaduras más mates (0.45)
  [160, 390, 630, 860].forEach(wy => {
    ctxStR.fillStyle = '#727272';
    ctxStR.fillRect(0, wy - 10, 1024, 20);
  });

  // Zonas de fricción pulidas extra brillantes (0.12)
  for (let p = 0; p < 8; p++) {
    const px = Math.random() * 1024;
    const py = Math.random() * 1024;
    ctxStR.fillStyle = '#1e1e1e';
    ctxStR.fillRect(px, py, 60, 140);
  }
  const reactorSteelRough = new THREE.CanvasTexture(cvStRough);
  gTextures.reactorSteelRoughness = reactorSteelRough;

  // Relieve de soldaduras y placa ASME (Bump)
  const cvStBump = document.createElement('canvas');
  cvStBump.width = 1024;
  cvStBump.height = 1024;
  const ctxStB = cvStBump.getContext('2d');
  ctxStB.fillStyle = '#808080';
  ctxStB.fillRect(0, 0, 1024, 1024);
  [160, 390, 630, 860].forEach(wy => {
    ctxStB.fillStyle = '#a8a8a8';
    ctxStB.fillRect(0, wy - 3, 1024, 6);
  });
  // Placa en relieve
  ctxStB.fillStyle = '#c0c0c0';
  ctxStB.fillRect(110, 450, 180, 80);
  const reactorSteelBump = new THREE.CanvasTexture(cvStBump);
  gTextures.reactorSteelBump = reactorSteelBump;

  // --------------------------------------------------------------------------
  // 4. Textura de Tuberías Calorifugadas RMI y Marcadores ASME A13.1
  // --------------------------------------------------------------------------
  const cvPipe = document.createElement('canvas');
  cvPipe.width = 1024;
  cvPipe.height = 512;
  const ctxP = cvPipe.getContext('2d');

  // Planchas de acero inoxidable reflectante RMI con costuras
  ctxP.fillStyle = '#b0b8c4';
  ctxP.fillRect(0, 0, 1024, 512);

  // Remaches pop y juntas de lámina cada 256 px
  for (let x = 0; x < 1024; x += 256) {
    ctxP.strokeStyle = '#6c7582';
    ctxP.lineWidth = 2.5;
    ctxP.beginPath();
    ctxP.moveTo(x, 0);
    ctxP.lineTo(x, 512);
    ctxP.stroke();

    for (let y = 16; y < 512; y += 40) {
      ctxP.beginPath();
      ctxP.arc(x, y, 2.5, 0, Math.PI * 2);
      ctxP.fillStyle = '#424a56';
      ctxP.fill();
    }
  }

  // Franja reglamentaria ASME A13.1 de Vapor Principal (Main Steam)
  ctxP.fillStyle = '#b91c1c';
  ctxP.fillRect(60, 180, 500, 150);
  ctxP.strokeStyle = '#ffffff';
  ctxP.lineWidth = 4;
  ctxP.strokeRect(60, 180, 500, 150);

  ctxP.fillStyle = '#ffffff';
  ctxP.font = 'bold 32px sans-serif';
  ctxP.fillText('MAIN STEAM · 285°C', 85, 235);
  ctxP.font = 'bold 24px sans-serif';
  ctxP.fillText('VAPOR PRINCIPAL · 6.0 MPa >>>', 85, 285);

  // Franja reglamentaria de Agua Borada UHS
  ctxP.fillStyle = '#0284c7';
  ctxP.fillRect(620, 180, 360, 150);
  ctxP.strokeStyle = '#ffffff';
  ctxP.lineWidth = 4;
  ctxP.strokeRect(620, 180, 360, 150);

  ctxP.fillStyle = '#ffffff';
  ctxP.font = 'bold 28px sans-serif';
  ctxP.fillText('BORATED WATER', 645, 235);
  ctxP.font = 'bold 20px sans-serif';
  ctxP.fillText('UHS COOLING LOOP >>>', 645, 285);

  const pipeInsulatedTex = new THREE.CanvasTexture(cvPipe);
  pipeInsulatedTex.wrapS = THREE.RepeatWrapping;
  pipeInsulatedTex.wrapT = THREE.RepeatWrapping;
  gTextures.pipeInsulatedMap = pipeInsulatedTex;

  // Bump de remaches de tubería
  const cvPipeB = document.createElement('canvas');
  cvPipeB.width = 512;
  cvPipeB.height = 256;
  const ctxPB = cvPipeB.getContext('2d');
  ctxPB.fillStyle = '#808080';
  ctxPB.fillRect(0, 0, 512, 256);
  for (let x = 0; x < 512; x += 128) {
    ctxPB.fillStyle = '#404040';
    ctxPB.fillRect(x - 1, 0, 2, 256);
    for (let y = 8; y < 256; y += 20) {
      ctxPB.beginPath();
      ctxPB.arc(x, y, 2, 0, Math.PI * 2);
      ctxPB.fillStyle = '#c0c0c0';
      ctxPB.fill();
    }
  }
  const pipeInsulatedBump = new THREE.CanvasTexture(cvPipeB);
  pipeInsulatedBump.wrapS = THREE.RepeatWrapping;
  pipeInsulatedBump.wrapT = THREE.RepeatWrapping;
  gTextures.pipeInsulatedBump = pipeInsulatedBump;

  // --------------------------------------------------------------------------
  // 5. Amarillo Industrial Desgastado y Desconchado (Worn Safety Yellow)
  // --------------------------------------------------------------------------
  const cvYel = document.createElement('canvas');
  cvYel.width = 1024;
  cvYel.height = 1024;
  const ctxY = cvYel.getContext('2d');

  ctxY.fillStyle = '#deb010';
  ctxY.fillRect(0, 0, 1024, 1024);

  // Desconchones perimetrales que dejan al descubierto imprimación gris y óxido
  for (let c = 0; c < 90; c++) {
    const cx = Math.random() * 1024;
    const cy = Math.random() * 1024;
    const cr = 4 + Math.random() * 22;

    // Imprimación gris oscura
    ctxY.beginPath();
    ctxY.arc(cx, cy, cr, 0, Math.PI * 2);
    ctxY.fillStyle = '#333b45';
    ctxY.fill();

    // Núcleo de óxido oxidado
    ctxY.beginPath();
    ctxY.arc(cx, cy, cr * 0.6, 0, Math.PI * 2);
    ctxY.fillStyle = '#7c2d12';
    ctxY.fill();
  }

  // Desgaste lineal de pisadas y fricción
  for (let w = 0; w < 15; w++) {
    const wx = Math.random() * 1024;
    ctxY.fillStyle = 'rgba(40, 48, 56, 0.35)';
    ctxY.fillRect(wx, 0, 12, 1024);
  }

  const wornYellowTex = new THREE.CanvasTexture(cvYel);
  wornYellowTex.wrapS = THREE.RepeatWrapping;
  wornYellowTex.wrapT = THREE.RepeatWrapping;
  gTextures.wornYellowMap = wornYellowTex;

  // Rugosidad del amarillo desgastado
  const cvYelR = document.createElement('canvas');
  cvYelR.width = 512;
  cvYelR.height = 512;
  const ctxYR = cvYelR.getContext('2d');
  ctxYR.fillStyle = '#707070';
  ctxYR.fillRect(0, 0, 512, 512);
  const wornYellowRough = new THREE.CanvasTexture(cvYelR);
  gTextures.wornYellowRoughness = wornYellowRough;

  // --------------------------------------------------------------------------
  // 6. Textura de Rejilla Metálica / Trámex Perforada (Catwalk Grating)
  // --------------------------------------------------------------------------
  const cvGrate = document.createElement('canvas');
  cvGrate.width = 128;
  cvGrate.height = 128;
  const ctxG = cvGrate.getContext('2d');
  ctxG.clearRect(0, 0, 128, 128);
  ctxG.fillStyle = '#5c6470';
  for (let x = 0; x < 128; x += 16) {
    ctxG.fillRect(x, 0, 3.8, 128);
  }
  ctxG.fillStyle = '#848e9c';
  for (let y = 0; y < 128; y += 32) {
    ctxG.fillRect(0, y, 128, 3.2);
  }
  const gratingTex = new THREE.CanvasTexture(cvGrate);
  gratingTex.wrapS = THREE.RepeatWrapping;
  gratingTex.wrapT = THREE.RepeatWrapping;
  gratingTex.repeat.set(10, 10);
  gTextures.catwalkGrating = gratingTex;

  // --------------------------------------------------------------------------
  // 7. Franjas Diagonales de Peligro / Chevron Warning Stripes
  // --------------------------------------------------------------------------
  const cvHaz = document.createElement('canvas');
  cvHaz.width = 128;
  cvHaz.height = 128;
  const ctxH = cvHaz.getContext('2d');
  ctxH.fillStyle = '#deb010';
  ctxH.fillRect(0, 0, 128, 128);
  for (let i = -128; i < 256; i += 36) {
    ctxH.beginPath();
    ctxH.moveTo(i, 0);
    ctxH.lineTo(i + 128, 128);
    ctxH.strokeStyle = '#181e26';
    ctxH.lineWidth = 18;
    ctxH.stroke();
  }
  const hazTex = new THREE.CanvasTexture(cvHaz);
  hazTex.wrapS = THREE.RepeatWrapping;
  hazTex.wrapT = THREE.RepeatWrapping;
  hazTex.repeat.set(6, 1);
  gTextures.hazardStripes = hazTex;

  // --------------------------------------------------------------------------
  // 8. Placas de Acero Estriadas / Checkered Steel Plate
  // --------------------------------------------------------------------------
  const cvStPlate = document.createElement('canvas');
  cvStPlate.width = 256;
  cvStPlate.height = 256;
  const ctxSP = cvStPlate.getContext('2d');
  ctxSP.fillStyle = '#3e4550';
  ctxSP.fillRect(0, 0, 256, 256);
  ctxSP.strokeStyle = '#222830';
  ctxSP.lineWidth = 2;
  ctxSP.strokeRect(2, 2, 252, 252);
  [[12, 12], [244, 12], [12, 244], [244, 244], [128, 12], [128, 244]].forEach(([bx, by]) => {
    ctxSP.beginPath();
    ctxSP.arc(bx, by, 5, 0, Math.PI * 2);
    ctxSP.fillStyle = '#647080';
    ctxSP.fill();
    ctxSP.strokeStyle = '#1a1f26';
    ctxSP.stroke();
  });
  const steelPlateTex = new THREE.CanvasTexture(cvStPlate);
  steelPlateTex.wrapS = THREE.RepeatWrapping;
  steelPlateTex.wrapT = THREE.RepeatWrapping;
  steelPlateTex.repeat.set(4, 4);
  gTextures.steelPlate = steelPlateTex;

  // --------------------------------------------------------------------------
  // 9. Cartel de Peligro Radiológico Nuclear
  // --------------------------------------------------------------------------
  const cvSignR = document.createElement('canvas');
  cvSignR.width = 512;
  cvSignR.height = 256;
  const ctxSR = cvSignR.getContext('2d');
  ctxSR.fillStyle = '#deb010';
  ctxSR.fillRect(0, 0, 512, 256);
  ctxSR.strokeStyle = '#111827';
  ctxSR.lineWidth = 8;
  ctxSR.strokeRect(8, 8, 496, 240);
  ctxSR.fillStyle = '#111827';
  ctxSR.font = 'bold 36px sans-serif';
  ctxSR.textAlign = 'center';
  ctxSR.fillText('☢ PELIGRO / DANGER ☢', 256, 60);
  ctxSR.font = 'bold 24px sans-serif';
  ctxSR.fillText('ZONA CONTROLADA RADIOLÓGICA', 256, 110);
  ctxSR.font = '18px sans-serif';
  ctxSR.fillText('ACCESO SOLO PERSONAL AUTORIZADO', 256, 150);
  ctxSR.fillText('PISCINA UHS · REACTOR SMR INTEGRAL', 256, 190);
  const signRadTex = new THREE.CanvasTexture(cvSignR);
  gTextures.signRadiation = signRadTex;

  // --------------------------------------------------------------------------
  // 10. Cartel Técnico de Especificación UHS
  // --------------------------------------------------------------------------
  const cvSignU = document.createElement('canvas');
  cvSignU.width = 512;
  cvSignU.height = 256;
  const ctxSU = cvSignU.getContext('2d');
  ctxSU.fillStyle = '#0f2942';
  ctxSU.fillRect(0, 0, 512, 256);
  ctxSU.strokeStyle = '#38bdf8';
  ctxSU.lineWidth = 6;
  ctxSU.strokeRect(6, 6, 500, 244);
  ctxSU.fillStyle = '#38bdf8';
  ctxSU.font = 'bold 28px sans-serif';
  ctxSU.textAlign = 'center';
  ctxSU.fillText('ULTIMATE HEAT SINK (UHS)', 256, 50);
  ctxSU.fillStyle = '#ffffff';
  ctxSU.font = 'bold 22px sans-serif';
  ctxSU.fillText('PISCINA SUBTERRÁNEA DE SEGURIDAD PASIVA', 256, 95);
  ctxSU.font = '18px sans-serif';
  ctxSU.fillText('CAPACIDAD NOMINAL > 15.000 m³ AGUA BORADA', 256, 140);
  ctxSU.fillText('AUTONOMÍA TÉRMICA > 30 DÍAS (WALKAWAY SAFE)', 256, 175);
  ctxSU.fillStyle = '#10b981';
  ctxSU.font = 'bold 18px sans-serif';
  ctxSU.fillText('● ESTADO: CIRCUITO DE ENFRIAMIENTO OPERATIVO', 256, 215);
  const signUhsTex = new THREE.CanvasTexture(cvSignU);
  gTextures.signUHS = signUhsTex;

  // --------------------------------------------------------------------------
  // 11. Escala Métrica de Nivel de Agua (Depth Water Scale)
  // --------------------------------------------------------------------------
  const cvScale = document.createElement('canvas');
  cvScale.width = 256;
  cvScale.height = 1024;
  const ctxSc = cvScale.getContext('2d');
  ctxSc.fillStyle = '#deb010';
  ctxSc.fillRect(0, 0, 256, 1024);
  ctxSc.strokeStyle = '#181e26';
  ctxSc.lineWidth = 6;
  ctxSc.strokeRect(6, 6, 244, 1012);

  ctxSc.fillStyle = '#181e26';
  for (let m = 0; m <= 10; m++) {
    const y = 980 - (m / 10) * 940;
    ctxSc.fillRect(0, y - 4, 90, 8);
    ctxSc.font = 'bold 36px monospace';
    ctxSc.fillText(`${m}m`, 110, y + 12);
  }
  const depthScaleTex = new THREE.CanvasTexture(cvScale);
  gTextures.depthScale = depthScaleTex;

  // --------------------------------------------------------------------------
  // 12. Esfera de Manómetro Industrial de Precisión (0-200 BAR / CLASE 1E)
  // --------------------------------------------------------------------------
  const cvG = document.createElement('canvas');
  cvG.width = 512;
  cvG.height = 512;
  const ctxGm = cvG.getContext('2d');

  ctxGm.fillStyle = '#f8fafc';
  ctxGm.beginPath();
  ctxGm.arc(256, 256, 240, 0, Math.PI * 2);
  ctxGm.fill();
  ctxGm.strokeStyle = '#1e293b';
  ctxGm.lineWidth = 12;
  ctxGm.stroke();

  // Escala graduada
  for (let a = Math.PI * 0.75; a <= Math.PI * 2.25; a += Math.PI * 0.03) {
    const r1 = 190, r2 = 220;
    ctxGm.beginPath();
    ctxGm.moveTo(256 + Math.cos(a) * r1, 256 + Math.sin(a) * r1);
    ctxGm.lineTo(256 + Math.cos(a) * r2, 256 + Math.sin(a) * r2);
    ctxGm.strokeStyle = '#0f172a';
    ctxGm.lineWidth = 4;
    ctxGm.stroke();
  }

  // Sector rojo de disparo
  ctxGm.beginPath();
  ctxGm.arc(256, 256, 205, Math.PI * 1.85, Math.PI * 2.25);
  ctxGm.strokeStyle = '#dc2626';
  ctxGm.lineWidth = 18;
  ctxGm.stroke();

  // Aguja roja indicadora fijada en 155 bar
  ctxGm.beginPath();
  ctxGm.moveTo(256, 256);
  ctxGm.lineTo(256 + Math.cos(Math.PI * 1.82) * 175, 256 + Math.sin(Math.PI * 1.82) * 175);
  ctxGm.strokeStyle = '#ef4444';
  ctxGm.lineWidth = 6;
  ctxGm.stroke();

  // Centro metálico
  ctxGm.beginPath();
  ctxGm.arc(256, 256, 20, 0, Math.PI * 2);
  ctxGm.fillStyle = '#0f172a';
  ctxGm.fill();

  ctxGm.fillStyle = '#0f172a';
  ctxGm.font = 'bold 36px monospace';
  ctxGm.textAlign = 'center';
  ctxGm.fillText('155 BAR', 256, 360);
  ctxGm.font = 'bold 22px sans-serif';
  ctxGm.fillStyle = '#64748b';
  ctxGm.fillText('CLASE 1E NUCLEAR', 256, 400);

  const gaugeTex = new THREE.CanvasTexture(cvG);
  gTextures.gaugeFace = gaugeTex;

  // --------------------------------------------------------------------------
  // 12B. Cartel Técnico de Puente Grúa 800t (Crane Girder Sign)
  // --------------------------------------------------------------------------
  const cvSignC = document.createElement('canvas');
  cvSignC.width = 512;
  cvSignC.height = 128;
  const ctxSC = cvSignC.getContext('2d');
  ctxSC.fillStyle = '#deb010';
  ctxSC.fillRect(0, 0, 512, 128);
  ctxSC.strokeStyle = '#181e26';
  ctxSC.lineWidth = 6;
  ctxSC.strokeRect(6, 6, 500, 116);
  ctxSC.fillStyle = '#181e26';
  ctxSC.font = 'bold 26px sans-serif';
  ctxSC.textAlign = 'center';
  ctxSC.fillText('PUENTE GRÚA POLAR · C.M.U. 800 t', 256, 48);
  ctxSC.font = 'bold 16px sans-serif';
  ctxSC.fillText('NAVE DE REACTOR SMR · ACCIONAMIENTO CLASE 1E', 256, 85);
  const signCraneTex = new THREE.CanvasTexture(cvSignC);
  gTextures.signCrane = signCraneTex;

  // --------------------------------------------------------------------------
  // 12C. Placa Técnica de Amortiguador Sísmico Hidráulico
  // --------------------------------------------------------------------------
  const cvSignS = document.createElement('canvas');
  cvSignS.width = 512;
  cvSignS.height = 256;
  const ctxSS = cvSignS.getContext('2d');
  ctxSS.fillStyle = '#1e293b';
  ctxSS.fillRect(0, 0, 512, 256);
  ctxSS.strokeStyle = '#94a3b8';
  ctxSS.lineWidth = 6;
  ctxSS.strokeRect(6, 6, 500, 244);
  ctxSS.fillStyle = '#38bdf8';
  ctxSS.font = 'bold 24px sans-serif';
  ctxSS.textAlign = 'center';
  ctxSS.fillText('AMORTIGUADOR SÍSMICO HIDRÁULICO', 256, 50);
  ctxSS.fillStyle = '#ffffff';
  ctxSS.font = 'bold 18px sans-serif';
  ctxSS.fillText('DISEÑO SÍSMICO SSE · CLASE 1E NUCLEAR', 256, 95);
  ctxSS.fillText('CAPACIDAD NOMINAL: 1.200 kN · CARRERA: ±150 mm', 256, 140);
  ctxSS.fillText('TAG: SNB-RPV-01A · ANCLAJE ESTRUCTURAL', 256, 180);
  ctxSS.fillStyle = '#10b981';
  ctxSS.fillText('● LÍQUIDO SILICONA ALTA VISCOSIDAD OK', 256, 220);
  const signSeismicTex = new THREE.CanvasTexture(cvSignS);
  gTextures.signSeismic = signSeismicTex;

  // --------------------------------------------------------------------------
  // 13. Mapa de Ondas y Refracción del Agua (Water Ripple Normal Map de alta definición)
  // --------------------------------------------------------------------------
  const cvWn = document.createElement('canvas');
  cvWn.width = 512;
  cvWn.height = 512;
  const ctxWn = cvWn.getContext('2d');
  const wnData = ctxWn.createImageData(512, 512);

  // Mapa de elevación con 5 armónicos de ondas cruzadas
  const heightMap = new Float32Array(512 * 512);
  for (let y = 0; y < 512; y++) {
    const v = y / 512;
    for (let x = 0; x < 512; x++) {
      const u = x / 512;
      let h = Math.sin(u * 28 + v * 16) * 0.35;
      h += Math.sin(u * 52 - v * 40) * 0.25;
      h += Math.sin(v * 68 + u * 20) * 0.20;
      h += Math.sin((u + v) * 94) * 0.12;
      h += Math.sin((u - v) * 135) * 0.08;
      heightMap[y * 512 + x] = h;
    }
  }

  // Gradiente Sobel para generar normales tangenciales con pendiente real
  for (let y = 0; y < 512; y++) {
    const ym = (y - 1 + 512) % 512;
    const yp = (y + 1) % 512;
    for (let x = 0; x < 512; x++) {
      const xm = (x - 1 + 512) % 512;
      const xp = (x + 1) % 512;

      const dhdx = (heightMap[y * 512 + xp] - heightMap[y * 512 + xm]) * 4.2;
      const dhdy = (heightMap[yp * 512 + x] - heightMap[ym * 512 + x]) * 4.2;

      const len = Math.sqrt(dhdx * dhdx + dhdy * dhdy + 1.0);
      const nx = -dhdx / len;
      const ny = -dhdy / len;
      const nz = 1.0 / len;

      const idx = (y * 512 + x) * 4;
      wnData.data[idx]     = Math.floor((nx * 0.5 + 0.5) * 255);
      wnData.data[idx + 1] = Math.floor((ny * 0.5 + 0.5) * 255);
      wnData.data[idx + 2] = Math.floor((nz * 0.5 + 0.5) * 255);
      wnData.data[idx + 3] = 255;
    }
  }
  ctxWn.putImageData(wnData, 0, 0);
  const waterNormalTex = new THREE.CanvasTexture(cvWn);
  waterNormalTex.wrapS = THREE.RepeatWrapping;
  waterNormalTex.wrapT = THREE.RepeatWrapping;
  waterNormalTex.repeat.set(5, 5);
  gTextures.waterNormal = waterNormalTex;

  // --------------------------------------------------------------------------
  // 14. Textura de Sección de Corte Metalmecánico / Engineering Crosshatch CAD (ASME / DIN 45°)
  // --------------------------------------------------------------------------
  const cvHatch = document.createElement('canvas');
  cvHatch.width = 512;
  cvHatch.height = 512;
  const ctxHatch = cvHatch.getContext('2d');

  // Base metálica gris de acero forjado mecanizado fino
  ctxHatch.fillStyle = '#b8c4d0';
  ctxHatch.fillRect(0, 0, 512, 512);

  // Micro-ruido de grano de mecanizado
  const imgDataH = ctxHatch.getImageData(0, 0, 512, 512);
  const dataH = imgDataH.data;
  for (let i = 0; i < dataH.length; i += 4) {
    const gn = (Math.random() - 0.5) * 18;
    dataH[i]     = Math.min(255, Math.max(0, dataH[i] + gn));
    dataH[i + 1] = Math.min(255, Math.max(0, dataH[i + 1] + gn));
    dataH[i + 2] = Math.min(255, Math.max(0, dataH[i + 2] + gn + 2));
  }
  ctxHatch.putImageData(imgDataH, 0, 0);

  // Rayado de ingeniería a 45° continuo de alta definición ASME Sección III
  ctxHatch.strokeStyle = '#232d3b';
  ctxHatch.lineWidth = 2.4;
  const hatchStep = 18;
  for (let d = -512; d < 1024; d += hatchStep) {
    ctxHatch.beginPath();
    ctxHatch.moveTo(d, 0);
    ctxHatch.lineTo(d + 512, 512);
    ctxHatch.stroke();
  }

  // Fina línea de biselado metálico brillante
  ctxHatch.strokeStyle = 'rgba(255, 255, 255, 0.45)';
  ctxHatch.lineWidth = 0.9;
  for (let d = -512; d < 1024; d += hatchStep) {
    ctxHatch.beginPath();
    ctxHatch.moveTo(d + 1.5, 0);
    ctxHatch.lineTo(d + 513.5, 512);
    ctxHatch.stroke();
  }

  const hatchTex = new THREE.CanvasTexture(cvHatch);
  hatchTex.wrapS = THREE.RepeatWrapping;
  hatchTex.wrapT = THREE.RepeatWrapping;
  hatchTex.repeat.set(4, 4);
  gTextures.engineeringHatch = hatchTex;

  // 15. Textura con Gradiente Térmico para Elementos Combustibles (Base Naranja/Rojizo -> Vainas Zircaloy)
  const cvFuel = document.createElement('canvas');
  cvFuel.width = 256;
  cvFuel.height = 512;
  const ctxFuel = cvFuel.getContext('2d');

  const fuelGrad = ctxFuel.createLinearGradient(0, 512, 0, 0);
  fuelGrad.addColorStop(0.0, '#ff3b00'); // Base activa de fisión
  fuelGrad.addColorStop(0.18, '#ff6600');
  fuelGrad.addColorStop(0.38, '#ea580c'); // Transición térmica
  fuelGrad.addColorStop(0.55, '#64748b'); // Vainas de Zircaloy
  fuelGrad.addColorStop(0.85, '#475569');
  fuelGrad.addColorStop(1.0, '#334155');
  ctxFuel.fillStyle = fuelGrad;
  ctxFuel.fillRect(0, 0, 256, 512);

  // Rejillas espaciadoras y líneas de varillas combustibles individuales
  ctxFuel.strokeStyle = 'rgba(15, 23, 42, 0.45)';
  ctxFuel.lineWidth = 1.5;
  for (let x = 0; x < 256; x += 16) {
    ctxFuel.beginPath();
    ctxFuel.moveTo(x, 0);
    ctxFuel.lineTo(x, 512);
    ctxFuel.stroke();
  }
  [90, 200, 320, 430].forEach(gy => {
    ctxFuel.fillStyle = 'rgba(203, 213, 225, 0.55)';
    ctxFuel.fillRect(0, gy - 6, 256, 12);
    ctxFuel.strokeStyle = 'rgba(30, 41, 59, 0.7)';
    ctxFuel.strokeRect(0, gy - 6, 256, 12);
  });

  const fuelTex = new THREE.CanvasTexture(cvFuel);
  fuelTex.wrapS = THREE.RepeatWrapping;
  fuelTex.wrapT = THREE.ClampToEdgeWrapping;
  gTextures.fuelGradient = fuelTex;

  // Mapa emisivo de combustible (concentrado en la base del núcleo)
  const cvFuelEm = document.createElement('canvas');
  cvFuelEm.width = 256;
  cvFuelEm.height = 512;
  const ctxFuelEm = cvFuelEm.getContext('2d');
  const fuelEmGrad = ctxFuelEm.createLinearGradient(0, 512, 0, 0);
  fuelEmGrad.addColorStop(0.0, '#ffffff'); // Máxima emisión en el fondo del núcleo
  fuelEmGrad.addColorStop(0.22, '#ea580c');
  fuelEmGrad.addColorStop(0.45, '#7c2d12');
  fuelEmGrad.addColorStop(0.70, '#000000'); // Zona superior sin emisión
  fuelEmGrad.addColorStop(1.0, '#000000');
  ctxFuelEm.fillStyle = fuelEmGrad;
  ctxFuelEm.fillRect(0, 0, 256, 512);
  const fuelEmTex = new THREE.CanvasTexture(cvFuelEm);
  fuelEmTex.wrapS = THREE.RepeatWrapping;
  fuelEmTex.wrapT = THREE.ClampToEdgeWrapping;
  gTextures.fuelEmissiveMap = fuelEmTex;
}

function createProceduralMaterials() {
  createProceduralTextures();

  // Hormigón Envejecido con textura, mapa de rugosidad húmedo y relieve de encofrado industrial
  gMaterials.concrete = new THREE.MeshStandardMaterial({
    color: 0x6e7682,
    map: gTextures.concreteAged,
    bumpMap: gTextures.concreteBump,
    bumpScale: 0.08, // BumpScale 0.08 estrictamente como solicitó el usuario
    roughnessMap: gTextures.concreteRoughness,
    roughness: 0.92,
    metalness: 0.08
  });

  // Revestimiento interior de acero inoxidable de la piscina (Pool Liner 304L)
  // Base acero gris-azulado oscuro (#2a3b4c), cuadrícula de placas soldadas bien visible sin quemados ni bloom
  gMaterials.poolLiner = new THREE.MeshStandardMaterial({
    map: gTextures.poolLinerMap,
    bumpMap: gTextures.poolLinerBump,
    bumpScale: 0.035,
    roughnessMap: gTextures.poolLinerRoughness,
    color: 0x2a3b4c,
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0.0,
    metalness: 0.55,
    roughness: 0.45,
    envMapIntensity: 0.40
  });

  // Planchas de Acero Estriadas (Checkered Steel Plates)
  gMaterials.steelPlate = new THREE.MeshStandardMaterial({
    map: gTextures.steelPlate,
    bumpMap: gTextures.brushedSteelBump,
    bumpScale: 0.025,
    roughness: 0.30,
    metalness: 0.82,
    envMapIntensity: 1.25,
    side: THREE.DoubleSide
  });

  // Rejilla Metálica / Trámex Perforada de Pasarelas
  gMaterials.catwalkGrating = new THREE.MeshStandardMaterial({
    map: gTextures.catwalkGrating,
    transparent: true,
    alphaTest: 0.28,
    roughness: 0.38,
    metalness: 0.80,
    side: THREE.DoubleSide
  });

  // Amarillo de Seguridad Desgastado (Puente Grúa, Barandillas, Escaleras)
  gMaterials.safetyYellow = new THREE.MeshStandardMaterial({
    map: gTextures.wornYellowMap,
    roughnessMap: gTextures.wornYellowRoughness,
    color: 0xf5b722,
    metalness: 0.28,
    roughness: 0.42
  });

  // Franjas de Advertencia Chevron (Amarillo y Negro)
  gMaterials.hazardStripes = new THREE.MeshStandardMaterial({
    map: gTextures.hazardStripes,
    roughness: 0.45,
    metalness: 0.25
  });

  // Acero Forjado Pulido Mecánico PBR (Bridas, toberas, émbolos) con soldaduras perimetrales
  gMaterials.forgedSteel = new THREE.MeshStandardMaterial({
    color: 0xc4ceda,
    bumpMap: gTextures.brushedSteelBump,
    bumpScale: 0.032,
    metalness: 0.82,
    roughness: 0.28,
    envMapIntensity: 1.30,
    side: THREE.DoubleSide
  });

  // Tubos del Generador de Vapor Helicoidal - Bobinas mecánicas sólidas en aleación Inconel 690 oscura
  gMaterials.steamGenTubes = new THREE.MeshStandardMaterial({
    color: 0x6e6259, // Acero oscuro/cobre bronceado Inconel
    metalness: 0.90,
    roughness: 0.22,
    bumpMap: gTextures.brushedSteelBump,
    bumpScale: 0.020,
    envMapIntensity: 1.40,
    side: THREE.DoubleSide
  });

  // Barrilete del Núcleo (Core Barrel Assembly) - Acero Oscuro Mecanizado
  gMaterials.coreBarrelDark = new THREE.MeshStandardMaterial({
    color: 0x222730,
    metalness: 0.85,
    roughness: 0.28,
    envMapIntensity: 1.20,
    side: THREE.DoubleSide
  });

  // Cuerpo de la Vasija RPV - Acero forjado SA-508 PBR realista con soldaduras perimetrales
  gMaterials.vesselDark = new THREE.MeshStandardMaterial({
    map: gTextures.reactorSteelMap,
    roughnessMap: gTextures.reactorSteelRoughness,
    bumpMap: gTextures.reactorSteelBump,
    bumpScale: 0.024,
    color: 0xb8c2ce,
    metalness: 0.80,
    roughness: 0.30,
    envMapIntensity: 1.25,
    side: THREE.DoubleSide
  });

  // Vasija de Contención Exterior - Acero laminado nuclear PBR con soldaduras
  gMaterials.containmentSteel = new THREE.MeshStandardMaterial({
    map: gTextures.reactorSteelMap,
    roughnessMap: gTextures.reactorSteelRoughness,
    bumpMap: gTextures.reactorSteelBump,
    bumpScale: 0.026,
    color: 0xc0cbda,
    metalness: 0.80,
    roughness: 0.30,
    envMapIntensity: 1.25,
    side: THREE.DoubleSide
  });

  // Tuberías de Vapor Calorifugadas PBR (Aislamiento Inox RMI y marcadores ASME A13.1)
  gMaterials.pipeSteamInsulated = new THREE.MeshStandardMaterial({
    map: gTextures.pipeInsulatedMap,
    bumpMap: gTextures.pipeInsulatedBump,
    bumpScale: 0.012,
    color: 0xcad4df,
    metalness: 0.80,
    roughness: 0.30,
    envMapIntensity: 1.25
  });

  // Volantes de Válvulas Rojo Industrial
  gMaterials.valveRed = new THREE.MeshStandardMaterial({
    color: 0xd9383a,
    metalness: 0.40,
    roughness: 0.35
  });

  // Volantes de Válvulas Amarillo Seguridad
  gMaterials.valveYellow = new THREE.MeshStandardMaterial({
    color: 0xe5a912,
    metalness: 0.40,
    roughness: 0.35
  });

  // Revestimiento interior de la Vasija RPV (Cladding Inox 308L resistente a corrosión)
  gMaterials.claddingStainless = new THREE.MeshStandardMaterial({
    color: 0xe2e8f0,
    metalness: 0.92,
    roughness: 0.15,
    envMapIntensity: 1.35,
    side: THREE.DoubleSide
  });

  // Varillas Absorbentes de B4C (Carburo de boro)
  gMaterials.controlRodAbsorber = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    metalness: 0.88,
    roughness: 0.22
  });

  // Araña de control mecanizada (Inconel 718)
  gMaterials.spiderNickel = new THREE.MeshStandardMaterial({
    color: 0xd4d4d8,
    metalness: 0.88,
    roughness: 0.20,
    envMapIntensity: 1.3
  });

  // Espárragos y tuercas hexagonales masivas de la RPV
  gMaterials.hexNut = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    metalness: 0.86,
    roughness: 0.24,
    envMapIntensity: 1.2
  });

  // Juntas tóricas metálicas de estanqueidad
  gMaterials.oRingSeal = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.92,
    roughness: 0.18
  });

  // Acero cromado pulido espejo para vástagos de pistón de amortiguadores sísmicos
  gMaterials.polishedChrome = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    metalness: 0.96,
    roughness: 0.06,
    envMapIntensity: 1.5
  });

  // Cara mecanizada del corte seccional CAD (Sección rayada ASME Sec III en acero macizo)
  gMaterials.cutSection = new THREE.MeshStandardMaterial({
    color: 0xdde4ee,
    map: gTextures.engineeringHatch,
    bumpMap: gTextures.engineeringHatch,
    bumpScale: 0.015,
    metalness: 0.70,
    roughness: 0.28,
    envMapIntensity: 1.2,
    side: THREE.DoubleSide
  });

  // Serpentines del Generador de Vapor - Inconel 690 TT con alta definición metálica
  gMaterials.inconelTubes = new THREE.MeshStandardMaterial({
    color: 0xf4f7fa,
    metalness: 0.94,
    roughness: 0.14,
    envMapIntensity: 1.45
  });

  // Reflector Neutrónico y Core Shroud - Inox 304LN
  gMaterials.reflectorSteel = new THREE.MeshStandardMaterial({
    color: 0x9ca3af,
    metalness: 0.80,
    roughness: 0.26,
    envMapIntensity: 1.25,
    side: THREE.DoubleSide
  });

  // Tubo Ascendente Central (Riser)
  gMaterials.riserSteel = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.82,
    roughness: 0.24,
    envMapIntensity: 1.30,
    side: THREE.DoubleSide
  });

  // Elementos Combustibles Nucleares con Gradiente Térmico (Base cálida naranja/rojiza a zircaloy)
  gMaterials.fuelAssembly = new THREE.MeshStandardMaterial({
    map: gTextures.fuelGradient,
    emissiveMap: gTextures.fuelEmissiveMap,
    emissive: new THREE.Color(0xff4500),
    emissiveIntensity: 0.75,
    metalness: 0.75,
    roughness: 0.28,
    envMapIntensity: 1.15
  });

  // Vainas de Zircaloy-4 genéricas
  gMaterials.zircaloy = new THREE.MeshStandardMaterial({
    color: 0x475569,
    metalness: 0.78,
    roughness: 0.26,
    emissive: new THREE.Color(0xff5500),
    emissiveIntensity: 0.45
  });

  // Barras de Control y Mecanismos CRDM
  gMaterials.crdmMetal = new THREE.MeshStandardMaterial({
    color: 0x27272a,
    metalness: 0.85,
    roughness: 0.25
  });

  // Carcasa de Bombas Primarias PCP
  gMaterials.pumpMotor = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.78,
    roughness: 0.36
  });

  // Resplandor Neutrónico Cherenkov
  gMaterials.cherenkov = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.14,
    blending: THREE.AdditiveBlending
  });

  // Volumen de Agua Borada de la Piscina UHS: Translúcida cristalina, azul-verdoso profundo
  gMaterials.poolWater = new THREE.MeshStandardMaterial({
    color: 0x005566,
    transparent: true,
    opacity: 0.18,
    roughness: 0.06,
    metalness: 0.12,
    depthWrite: false
  });

  // Superficie Ondulada del Agua UHS con alto brillo especular Fresnel y refracción (Tonalidad acuática industrial borada)
  gMaterials.waterSurface = new THREE.MeshStandardMaterial({
    color: 0x0a384c,
    transparent: true,
    opacity: 0.44,
    roughness: 0.05,
    metalness: 0.35,
    normalMap: gTextures.waterNormal,
    normalScale: new THREE.Vector2(2.4, 2.4),
    depthWrite: false,
    side: THREE.DoubleSide
  });

  // Cables Eléctricos e Instrumentación
  gMaterials.cableBlack = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.65,
    metalness: 0.25
  });

  // Cables de señal naranja de seguridad nuclear
  gMaterials.cableOrange = new THREE.MeshStandardMaterial({
    color: 0xea580c,
    roughness: 0.55,
    metalness: 0.20
  });
}

// ==========================================================================
// 7. CONSTRUCCIÓN DEL MÓDULO SMR DE ALTA PRECISIÓN (ESTUDIO MECÁNICO)
// ==========================================================================
function buildHighPrecisionSMRModule(scene) {
  const root = new THREE.Group();
  root.position.set(0, 0, 0);
  scene.add(root);
  gSceneRoots.smrReactorModule = root;

  // Tres grupos jerárquicos perfectamente delimitados:
  gClosedVesselGroup = new THREE.Group();  // Reactor hermético 360° completo
  gCutawayVesselGroup = new THREE.Group(); // Carcasa con sección 120° abierta y paredes con espesor macizo
  gInternalGroup = new THREE.Group();      // Todo el circuito primario y núcleo interno

  root.add(gClosedVesselGroup);
  root.add(gCutawayVesselGroup);
  root.add(gInternalGroup);

  // Registrar parte interactiva y explosionable
  function registerPart(mesh, compId, explodeOffset = new THREE.Vector3(0, 0, 0)) {
    mesh.userData = {
      isComponent: true,
      componentId: compId,
      originalPos: mesh.position.clone(),
      explodedOffset: explodeOffset.clone()
    };
    gInteractiveMeshes.push(mesh);
    gExplodableParts.push(mesh);

    if (!gComponentMeshMap[compId]) gComponentMeshMap[compId] = [];
    gComponentMeshMap[compId].push(mesh);
  }

  // Proporciones de ingeniería SMR (Inspirado en Sketchfab Txy2u y Energy Encyclopedia):
  // Radio contención R_CONT = 2.35 m (Diámetro 4.7 m, Altura ~19.5 m -> Relación esbelta ~4.2:1)
  // Radio RPV R_RPV = 1.95 m (Espesor de pared de acero forjado 180 mm, radio interior 1.77 m)
  const R_CONT = 2.35;
  const R_RPV = 1.95;
  const R_RPV_IN = 1.77;
  // Corte transversal de ingeniería de 1/4 (90° frontal abierto encarando directamente la cámara +Z, 270° intactos):
  // El sector abierto abarca de -45° a +45° encarando la vista frontal (+Z).
  const CYL_CUT_START = Math.PI * 0.25;      // 45°
  const CYL_CUT_LENGTH = Math.PI * 1.5;     // 270° (3/4 de arco cilíndrico intacto)
  const SPHERE_CUT_START = Math.PI * 0.75;  // 135° (alineado con x = +0.707 R, z = +0.707 R)
  const SPHERE_CUT_LENGTH = Math.PI * 1.5; // 270° (3/4 de cúpula esférica intacta)
  const TORUS_CUT_ARC = Math.PI * 1.5;     // 270° (3/4 de anillo intacto)

  // Funciones auxiliares para torres CRDM superiores (icono distintivo de Sketchfab)
  function buildCrdmCrown(parentGroup, isCutaway) {
    const crownGroup = new THREE.Group();
    crownGroup.position.set(0, 19.35, 0);
    parentGroup.add(crownGroup);

    // Patrón de torres verticales de accionamiento electromagnético (CRDM)
    const towerCoords = [
      { x: 0, z: 0 },
      // Anillo interior (4 torres)
      { x: 0.55, z: 0 }, { x: -0.55, z: 0 }, { x: 0, z: 0.55 }, { x: 0, z: -0.55 },
      // Anillo intermedio (8 torres)
      { x: 0.95, z: 0.55 }, { x: 0.95, z: -0.55 }, { x: -0.95, z: 0.55 }, { x: -0.95, z: -0.55 },
      { x: 0.55, z: 0.95 }, { x: -0.55, z: 0.95 }, { x: 0.55, z: -0.95 }, { x: -0.55, z: -0.95 },
      // Anillo exterior (4 torres)
      { x: 1.35, z: 0 }, { x: -1.35, z: 0 }, { x: 0, z: 1.35 }, { x: 0, z: -1.35 }
    ];

    towerCoords.forEach((coord) => {
      // Si estamos en modo corte, descartar las que caen en el cuadrante frontal cortado
      if (isCutaway) {
        if (coord.z > 0.2 && Math.abs(coord.x) < 1.1) return;
      }

      // Vástago guía vertical
      const towerStem = new THREE.Mesh(
        new THREE.CylinderGeometry(0.065, 0.065, 5.0, 12),
        gMaterials.forgedSteel
      );
      towerStem.position.set(coord.x, 2.5, coord.z);
      towerStem.castShadow = true;
      crownGroup.add(towerStem);
      registerPart(towerStem, 'control-rods', new THREE.Vector3(0, 16.0, 0));

      // Cabeza terminal electromagnética en la cúspide con brida y bobinas escalonadas
      const towerCap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.40, 12),
        gMaterials.crdmMetal
      );
      towerCap.position.set(coord.x, 5.0, coord.z);
      crownGroup.add(towerCap);
      registerPart(towerCap, 'control-rods', new THREE.Vector3(0, 16.0, 0));

      // Manguito de penetración en la tapa del reactor
      const sleeve = new THREE.Mesh(
        new THREE.CylinderGeometry(0.09, 0.09, 0.45, 12),
        gMaterials.forgedSteel
      );
      sleeve.position.set(coord.x, 0.22, coord.z);
      crownGroup.add(sleeve);
      registerPart(sleeve, 'control-rods', new THREE.Vector3(0, 16.0, 0));
    });

    // Marco arriostrado estructural intermedio (Spider brace ring) a cota +2.8 m
    const spiderRing = new THREE.Mesh(
      new THREE.TorusGeometry(1.4, 0.04, 8, 24, isCutaway ? TORUS_CUT_ARC : Math.PI * 2),
      gMaterials.forgedSteel
    );
    spiderRing.rotation.set(Math.PI / 2, isCutaway ? -Math.PI * 0.75 : 0, 0);
    spiderRing.position.set(0, 2.8, 0);
    crownGroup.add(spiderRing);
    registerPart(spiderRing, 'control-rods', new THREE.Vector3(0, 16.0, 0));
  }

  // Función auxiliar para toberas laterales forjadas con bridas atornilladas (simétricas en ambos lados)
  function buildLateralNozzles(parentGroup, isCutaway) {
    [-1, 1].forEach(side => {
      const isRight = (side > 0);
      const posX = side * (R_CONT + 0.55);
      const flgX = side * (R_CONT + 1.15);
      const riserX = side * (R_CONT + 1.55);
      const expVec = new THREE.Vector3(side * 6.0, 0, -2.0);

      // 1. Toberas de Vapor Principal (Main Steam Nozzles - cota y = 15.2 m)
      const steamNozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.35, 1.2, 20), gMaterials.forgedSteel);
      steamNozzle.rotation.z = (side * Math.PI) / 2;
      steamNozzle.position.set(posX, 15.2, 0);
      parentGroup.add(steamNozzle);
      registerPart(steamNozzle, 'piping', expVec);

      const steamFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.18, 20), gMaterials.forgedSteel);
      steamFlange.rotation.z = (side * Math.PI) / 2;
      steamFlange.position.set(flgX, 15.2, 0);
      parentGroup.add(steamFlange);
      registerPart(steamFlange, 'piping', expVec);

      for (let b = 0; b < 8; b++) {
        const ang = (b / 8) * Math.PI * 2;
        const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.28, 8), gMaterials.forgedSteel);
        bolt.rotation.z = (side * Math.PI) / 2;
        bolt.position.set(flgX, 15.2 + Math.sin(ang) * 0.42, Math.cos(ang) * 0.42);
        parentGroup.add(bolt);
        registerPart(bolt, 'piping', expVec);
      }

      // 2. Toberas Sumergidas de Agua de Alimentación / Evacuación Pasiva (cota y = 8.2 m)
      const feedNozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.28, 1.2, 20), gMaterials.forgedSteel);
      feedNozzle.rotation.z = (side * Math.PI) / 2;
      feedNozzle.position.set(posX, 8.2, 0);
      parentGroup.add(feedNozzle);
      registerPart(feedNozzle, 'piping', expVec);

      const feedFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.16, 20), gMaterials.forgedSteel);
      feedFlange.rotation.z = (side * Math.PI) / 2;
      feedFlange.position.set(flgX, 8.2, 0);
      parentGroup.add(feedFlange);
      registerPart(feedFlange, 'piping', expVec);

      for (let b = 0; b < 8; b++) {
        const ang = (b / 8) * Math.PI * 2;
        const bMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.24, 8), gMaterials.hexNut);
        bMesh.rotation.z = (side * Math.PI) / 2;
        bMesh.position.set(flgX, 8.2 + Math.sin(ang) * 0.32, Math.cos(ang) * 0.32);
        parentGroup.add(bMesh);
        registerPart(bMesh, 'piping', expVec);
      }

      // Codo 90° forjado ascendente desde la tobera sumergida (flgX, 8.2) hacia la vertical (riserX, 8.6)
      const feedElbow1 = new THREE.Mesh(new THREE.TorusGeometry(0.40, 0.18, 12, 20, Math.PI / 2), gMaterials.forgedSteel);
      feedElbow1.position.set(riserX, 8.2, 0);
      feedElbow1.rotation.z = side > 0 ? Math.PI / 2 : 0;
      parentGroup.add(feedElbow1);
      registerPart(feedElbow1, 'piping', expVec);

      // Tubería vertical ascendente continua desde la tobera sumergida (y = 8.6 m) hasta el colector superior (y = 15.2 m)
      const feedRiserH = 15.2 - 8.6; // 6.6 m de columna continua sin cortes en el aire
      const feedRiser = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, feedRiserH, 16), gMaterials.riserSteel);
      feedRiser.position.set(riserX, 8.6 + feedRiserH / 2, 0);
      feedRiser.castShadow = true;
      parentGroup.add(feedRiser);
      registerPart(feedRiser, 'piping', expVec);

      // Brida en 'T' de conexión continua (T-junction) a la cota y = 15.2 m con la línea horizontal principal
      const teeUpper = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 12), gMaterials.forgedSteel);
      teeUpper.position.set(riserX, 15.2, 0);
      parentGroup.add(teeUpper);
      registerPart(teeUpper, 'piping', expVec);

      // Brida vertical inferior de la 'T'
      const teeBtmFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.10, 16), gMaterials.forgedSteel);
      teeBtmFlange.position.set(riserX, 15.2 - 0.22, 0);
      parentGroup.add(teeBtmFlange);
      registerPart(teeBtmFlange, 'piping', expVec);

      // Tramo horizontal de conexión que une la tobera de la vasija (flgX) con la 'T' (riserX) a y = 15.2 m
      const hLinkLen = Math.abs(riserX - flgX);
      const hLink = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, hLinkLen, 16), gMaterials.forgedSteel);
      hLink.rotation.z = Math.PI / 2;
      hLink.position.set((flgX + riserX) / 2, 15.2, 0);
      parentGroup.add(hLink);
      registerPart(hLink, 'piping', expVec);
    });
  }

  // Función auxiliar para bombas primarias compactas (Canned Motor PCP)
  // 4 grandes bombas horizontales (2 a la izquierda, 2 a la derecha) con estatores aleteados y cables
  function buildCoolantPumps(parentGroup) {
    const pcpPositions = [
      // Lado derecho (+X)
      { x: R_CONT + 0.45, y: 7.5, z: -1.45, dirX: 1, explodeOffset: new THREE.Vector3(6.5, 0, 2.5) },
      { x: R_CONT + 0.45, y: 7.5, z: 1.45,  dirX: 1, explodeOffset: new THREE.Vector3(6.5, 0, 2.5) },
      // Lado izquierdo (-X)
      { x: -R_CONT - 0.45, y: 7.5, z: -1.45, dirX: -1, explodeOffset: new THREE.Vector3(-6.5, 0, 2.5) },
      { x: -R_CONT - 0.45, y: 7.5, z: 1.45,  dirX: -1, explodeOffset: new THREE.Vector3(-6.5, 0, 2.5) }
    ];

    pcpPositions.forEach(p => {
      const pumpGroup = new THREE.Group();
      pumpGroup.position.set(p.x, p.y, p.z);
      parentGroup.add(pumpGroup);

      // Tobera forjada y brida de conexión con la vasija
      const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.44, 0.65, 20), gMaterials.forgedSteel);
      nozzle.rotation.z = (p.dirX * Math.PI) / 2;
      nozzle.position.set(-p.dirX * 0.25, 0, 0);
      pumpGroup.add(nozzle);
      registerPart(nozzle, 'pumps', p.explodeOffset);

      // Brida circular con pernos perimetrales
      const flange = new THREE.Mesh(new THREE.CylinderGeometry(0.56, 0.56, 0.16, 20), gMaterials.forgedSteel);
      flange.rotation.z = (p.dirX * Math.PI) / 2;
      flange.position.set(0, 0, 0);
      pumpGroup.add(flange);
      registerPart(flange, 'pumps', p.explodeOffset);

      for (let b = 0; b < 8; b++) {
        const ang = (b / 8) * Math.PI * 2;
        const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.24, 8), gMaterials.forgedSteel);
        bolt.rotation.z = (p.dirX * Math.PI) / 2;
        bolt.position.set(0, Math.sin(ang) * 0.46, Math.cos(ang) * 0.46);
        pumpGroup.add(bolt);
        registerPart(bolt, 'pumps', p.explodeOffset);
      }

      // Rodete centrífugo de bombeo primario con 6 álabes curvados forjados en cromo pulido espejo
      const impellerHub = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.18, 0.22, 16), gMaterials.polishedChrome);
      impellerHub.rotation.z = (p.dirX * Math.PI) / 2;
      impellerHub.position.set(-p.dirX * 0.08, 0, 0);
      pumpGroup.add(impellerHub);
      registerPart(impellerHub, 'pumps', p.explodeOffset);

      for (let b = 0; b < 6; b++) {
        const bAng = (b / 6) * Math.PI * 2;
        const blade = new THREE.Mesh(new THREE.BoxGeometry(0.025, 0.28, 0.14), gMaterials.polishedChrome);
        blade.position.set(-p.dirX * 0.08, Math.sin(bAng) * 0.22, Math.cos(bAng) * 0.22);
        blade.rotation.x = -bAng + 0.38; // Curvatura hidrodinámica del álabe
        pumpGroup.add(blade);
        registerPart(blade, 'pumps', p.explodeOffset);
      }

      // Carcasa cilíndrica horizontal del motor estator (Canned Motor Stator Casing)
      const motorLen = 1.6;
      const motor = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, motorLen, 24), gMaterials.pumpMotor);
      motor.rotation.z = (p.dirX * Math.PI) / 2;
      motor.position.set(p.dirX * 0.88, 0, 0);
      pumpGroup.add(motor);
      registerPart(motor, 'pumps', p.explodeOffset);

      // Cúpula terminal redondeada del cojinete trasero
      const endCap = new THREE.Mesh(new THREE.SphereGeometry(0.48, 20, 16, 0, Math.PI * 2, 0, Math.PI / 2), gMaterials.forgedSteel);
      endCap.rotation.z = -p.dirX * Math.PI / 2;
      endCap.position.set(p.dirX * (0.88 + motorLen / 2), 0, 0);
      pumpGroup.add(endCap);
      registerPart(endCap, 'pumps', p.explodeOffset);

      // Aletas longitudinales de disipación térmica del estator (12 aletas)
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 6) {
        const fin = new THREE.Mesh(new THREE.BoxGeometry(motorLen * 0.92, 0.035, 0.12), gMaterials.forgedSteel);
        fin.position.set(p.dirX * 0.88, Math.sin(a) * 0.54, Math.cos(a) * 0.54);
        fin.rotation.x = -a;
        pumpGroup.add(fin);
        registerPart(fin, 'pumps', p.explodeOffset);
      }

      // Caja de bornes y conexionado eléctrico en la parte superior
      const termBox = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.28, 0.38), gMaterials.crdmMetal);
      termBox.position.set(p.dirX * 0.72, 0.62, 0);
      pumpGroup.add(termBox);
      registerPart(termBox, 'pumps', p.explodeOffset);

      // Cableado flexible blindado industrial que desciende hacia la penetración de la vasija
      const cableCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(p.dirX * 0.72, 0.75, 0),
        new THREE.Vector3(p.dirX * 0.45, 0.65, 0.18),
        new THREE.Vector3(p.dirX * 0.15, 0.35, 0.22),
        new THREE.Vector3(-p.dirX * 0.25, 0.15, 0.12)
      ]);
      const cableMesh = new THREE.Mesh(new THREE.TubeGeometry(cableCurve, 16, 0.042, 8, false), gMaterials.crdmMetal);
      pumpGroup.add(cableMesh);
      registerPart(cableMesh, 'pumps', p.explodeOffset);
    });
  }

  // Función auxiliar: Pedestal macizo de hormigón armado y faldón de soporte ASME
  function buildReactorBasePedestal(parentGroup, isCutaway) {
    const pedGroup = new THREE.Group();
    parentGroup.add(pedGroup);

    const arcLength = isCutaway ? CYL_CUT_LENGTH : Math.PI * 2;
    const arcStart = isCutaway ? CYL_CUT_START : 0;

    // 1. Pedestal cilíndrico macizo de hormigón armado incrustado en la losa del suelo (y = -0.20 a 1.45 m)
    const pedBottomY = -0.20;
    const pedTopY = 1.45;
    const pedH = pedTopY - pedBottomY;
    const pedR = 2.75;
    const pedMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(pedR, pedR + 0.18, pedH, 48, 1, false, arcStart, arcLength),
      gMaterials.concrete
    );
    pedMesh.position.set(0, (pedTopY + pedBottomY) / 2, 0);
    pedMesh.receiveShadow = true;
    pedGroup.add(pedMesh);
    registerPart(pedMesh, 'seismic-supports');

    // Placa anular de acero estructural empotrada en coronación del pedestal (Embedment Plate)
    const embedPlate = new THREE.Mesh(
      new THREE.CylinderGeometry(pedR - 0.04, pedR - 0.04, 0.08, 48, 1, false, arcStart, arcLength),
      gMaterials.steelPlate
    );
    embedPlate.position.set(0, pedTopY, 0);
    pedGroup.add(embedPlate);
    registerPart(embedPlate, 'seismic-supports');

    // 2. Faldón de soporte cónico forjado (ASME Conical Steel Support Skirt, y = 1.45 a 2.65 m)
    const skirtH = 1.20;
    const skirtMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(R_CONT + 0.05, pedR - 0.12, skirtH, 48, 1, true, arcStart, arcLength),
      gMaterials.containmentSteel
    );
    skirtMesh.position.set(0, 1.45 + skirtH / 2, 0);
    pedGroup.add(skirtMesh);
    registerPart(skirtMesh, 'seismic-supports');

    // Anillo forjado de coronación soldado a la contención
    const skirtTopRing = new THREE.Mesh(
      new THREE.TorusGeometry(R_CONT + 0.08, 0.06, 8, 36, isCutaway ? TORUS_CUT_ARC : Math.PI * 2),
      gMaterials.forgedSteel
    );
    skirtTopRing.rotation.set(Math.PI / 2, isCutaway ? -Math.PI * 0.75 : 0, 0);
    skirtTopRing.position.set(0, 2.65, 0);
    pedGroup.add(skirtTopRing);
    registerPart(skirtTopRing, 'seismic-supports');

    // 8 Cartelas triangulares radiales de rigidización antisísmica (Gussets)
    for (let g = 0; g < 8; g++) {
      const gAngle = (g / 8) * Math.PI * 2;
      if (isCutaway && (gAngle > Math.PI * 0.18 && gAngle < Math.PI * 0.82)) continue;

      const gusset = new THREE.Mesh(new THREE.BoxGeometry(0.06, skirtH * 0.92, 0.42), gMaterials.forgedSteel);
      gusset.position.set(Math.cos(gAngle) * (R_CONT + 0.22), 1.45 + skirtH / 2, Math.sin(gAngle) * (R_CONT + 0.22));
      gusset.rotation.y = -gAngle;
      pedGroup.add(gusset);
      registerPart(gusset, 'seismic-supports');

      // Pernos de cimentación M64 en la base del faldón
      const fBolt = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.22, 6), gMaterials.hexNut);
      fBolt.position.set(Math.cos(gAngle) * (pedR - 0.22), 1.45 + 0.11, Math.sin(gAngle) * (pedR - 0.22));
      pedGroup.add(fBolt);
      registerPart(fBolt, 'seismic-supports');
    }

    // 3. 4 PATAS INCLINADAS ESTRUCTURALES PESADAS TOTALMENTE CONECTADAS AL SUELO REAL
    // Se extienden inclinadas desde la cúpula inferior (y = 2.65 m) hasta incrustarse físicamente en la losa del suelo (y = -0.06 m)
    // con placas de anclaje cuadradas oscuras (#1e242c) y pernos de cimentación sobre el suelo
    const legAngles = [Math.PI * 0.25, Math.PI * 0.75, Math.PI * 1.25, Math.PI * 1.75];
    const rTop = 2.15;
    const yTop = 2.65;
    const rBtm = 3.00;
    const yBtm = -0.06; // Incrustada bajo la losa del suelo

    legAngles.forEach((ang) => {
      const topX = Math.cos(ang) * rTop;
      const topZ = Math.sin(ang) * rTop;
      const btmX = Math.cos(ang) * rBtm;
      const btmZ = Math.sin(ang) * rBtm;

      const pTop = new THREE.Vector3(topX, yTop, topZ);
      const pBtm = new THREE.Vector3(btmX, yBtm, btmZ);
      const legVec = new THREE.Vector3().subVectors(pTop, pBtm);
      const legLen = legVec.length();
      const legMid = new THREE.Vector3().addVectors(pTop, pBtm).multiplyScalar(0.5);
      const legDir = legVec.clone().normalize();

      // Columna principal inclinada de acero forjado
      const legCol = new THREE.Mesh(
        new THREE.CylinderGeometry(0.24, 0.28, legLen, 16),
        gMaterials.forgedSteel
      );
      legCol.position.copy(legMid);
      legCol.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), legDir);
      legCol.castShadow = true;
      pedGroup.add(legCol);
      registerPart(legCol, 'seismic-supports');

      // Placa de anclaje cuadrada oscura sobre el suelo (Baseplate estructural)
      const legBasePlate = new THREE.Mesh(
        new THREE.BoxGeometry(1.05, 0.12, 1.05),
        gMaterials.coreBarrelDark
      );
      legBasePlate.position.set(btmX, 0.06, btmZ);
      legBasePlate.rotation.y = -ang;
      legBasePlate.receiveShadow = true;
      pedGroup.add(legBasePlate);
      registerPart(legBasePlate, 'seismic-supports');

      // 4 Pernos pesados de anclaje de cimentación con tuercas hexagonales
      [[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35]].forEach(([bx, bz]) => {
        const cosA = Math.cos(ang);
        const sinA = Math.sin(ang);
        const boltWorldX = btmX + (bx * cosA - bz * sinA);
        const boltWorldZ = btmZ + (bx * sinA + bz * cosA);
        const ancBolt = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.24, 6), gMaterials.hexNut);
        ancBolt.position.set(boltWorldX, 0.16, boltWorldZ);
        pedGroup.add(ancBolt);
        registerPart(ancBolt, 'seismic-supports');
      });

      // Cartelas triangulares oscuras de rigidización en la base sobre la placa
      const baseGusset = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.52, 0.45), gMaterials.coreBarrelDark);
      baseGusset.position.set(btmX * 0.96, 0.32, btmZ * 0.96);
      baseGusset.rotation.y = -ang;
      pedGroup.add(baseGusset);
      registerPart(baseGusset, 'seismic-supports');

      // Cartela superior de articulación contra la cúpula inferior de la vasija
      const topGusset = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.65, 0.45), gMaterials.forgedSteel);
      topGusset.position.set(topX * 0.95, 2.38, topZ * 0.95);
      topGusset.rotation.y = -ang;
      pedGroup.add(topGusset);
      registerPart(topGusset, 'seismic-supports');
    });
  }

  // =========================================================================
  // 1. CONSTRUCCIÓN DEL REACTOR CERRADO 360° (gClosedVesselGroup)
  // =========================================================================
  // Cilindro inferior de contención (y=2.5 a 12.5)
  const closedContLower = new THREE.Mesh(
    new THREE.CylinderGeometry(R_CONT, R_CONT, 10.0, 48),
    gMaterials.containmentSteel
  );
  closedContLower.position.set(0, 7.5, 0);
  closedContLower.castShadow = true;
  gClosedVesselGroup.add(closedContLower);
  registerPart(closedContLower, 'containment', new THREE.Vector3(-6.5, 0, 0));

  // Cilindro superior de contención (y=12.5 a 17.5)
  const closedContUpper = new THREE.Mesh(
    new THREE.CylinderGeometry(R_CONT, R_CONT, 5.0, 48),
    gMaterials.containmentSteel
  );
  closedContUpper.position.set(0, 15.0, 0);
  closedContUpper.castShadow = true;
  gClosedVesselGroup.add(closedContUpper);
  registerPart(closedContUpper, 'containment', new THREE.Vector3(0, 9.5, 0));

  // Tapa hemisférica superior de contención (y=17.5 a 19.85)
  const closedContDome = new THREE.Mesh(
    new THREE.SphereGeometry(R_CONT, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2),
    gMaterials.containmentSteel
  );
  closedContDome.position.set(0, 17.5, 0);
  closedContDome.castShadow = true;
  gClosedVesselGroup.add(closedContDome);
  registerPart(closedContDome, 'containment', new THREE.Vector3(0, 16.0, 0));

  // Fondo hemisférico inferior de contención (y=1.0 a 2.5)
  const closedContBottom = new THREE.Mesh(
    new THREE.SphereGeometry(R_CONT, 48, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
    gMaterials.containmentSteel
  );
  closedContBottom.position.set(0, 2.5, 0);
  gClosedVesselGroup.add(closedContBottom);
  registerPart(closedContBottom, 'containment', new THREE.Vector3(0, -7.5, 0));

  // Anclaje estructural: Pedestal de hormigón armado y faldón de soporte conectado al suelo de la piscina
  buildReactorBasePedestal(gClosedVesselGroup, false);

  // Muñones de izado para grúa polar
  [-1, 1].forEach(side => {
    const trunnion = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.1, 20), gMaterials.forgedSteel);
    trunnion.rotation.z = Math.PI / 2;
    trunnion.position.set(side * (R_CONT + 0.5), 16.5, 0);
    gClosedVesselGroup.add(trunnion);
    registerPart(trunnion, 'containment', new THREE.Vector3(0, 16.0, 0));
  });

  // Canales verticales de instrumentación nuclear (RTD y flujómetros) a lo largo de la vasija
  [Math.PI * 0.35, Math.PI * 0.65].forEach(ang => {
    const condX = Math.cos(ang) * (R_CONT + 0.05);
    const condZ = Math.sin(ang) * (R_CONT + 0.05);

    const conduitTrack = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 15.0, 0.05),
      gMaterials.forgedSteel
    );
    conduitTrack.position.set(condX, 10.0, condZ);
    conduitTrack.rotation.y = -ang;
    gClosedVesselGroup.add(conduitTrack);
    registerPart(conduitTrack, 'containment', new THREE.Vector3(0, 8.0, 0));

    // Abrazaderas de fijación sísmica cada 2 metros
    for (let cy = 3.5; cy <= 17.0; cy += 2.0) {
      const clamp = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.045, 0.08, 8),
        gMaterials.hexNut
      );
      clamp.position.set(condX, cy, condZ);
      gClosedVesselGroup.add(clamp);
    }
  });

  // Caja terminal de distribución umbilical en la cúpula donde arriba el festoon de la grúa
  const umbilicalBox = new THREE.Mesh(
    new THREE.BoxGeometry(0.55, 0.42, 0.45),
    gMaterials.crdmMetal
  );
  umbilicalBox.position.set(0, 19.6, 0.85);
  gClosedVesselGroup.add(umbilicalBox);
  registerPart(umbilicalBox, 'containment', new THREE.Vector3(0, 16.0, 0));

  // Elementos exteriores del reactor cerrado
  buildCrdmCrown(gClosedVesselGroup, false);
  buildLateralNozzles(gClosedVesselGroup, false);
  buildCoolantPumps(gClosedVesselGroup);

  // =========================================================================
  // 2. CONSTRUCCIÓN DEL REACTOR CON CORTE SECCIONAL 120° (gCutawayVesselGroup)
  // =========================================================================
  // Carcasa de contención en 270° (3/4 de envolvente cilíndrica, 1/4 abierto hacia el frente +Z)
  const cutContLower = new THREE.Mesh(
    new THREE.CylinderGeometry(R_CONT, R_CONT, 10.0, 48, 1, false, CYL_CUT_START, CYL_CUT_LENGTH),
    gMaterials.containmentSteel
  );
  cutContLower.position.set(0, 7.5, 0);
  cutContLower.castShadow = true;
  gCutawayVesselGroup.add(cutContLower);
  registerPart(cutContLower, 'containment', new THREE.Vector3(-6.5, 0, 0));

  const cutContUpper = new THREE.Mesh(
    new THREE.CylinderGeometry(R_CONT, R_CONT, 5.0, 48, 1, false, CYL_CUT_START, CYL_CUT_LENGTH),
    gMaterials.containmentSteel
  );
  cutContUpper.position.set(0, 15.0, 0);
  cutContUpper.castShadow = true;
  gCutawayVesselGroup.add(cutContUpper);
  registerPart(cutContUpper, 'containment', new THREE.Vector3(0, 9.5, 0));

  const cutContDome = new THREE.Mesh(
    new THREE.SphereGeometry(R_CONT, 48, 24, SPHERE_CUT_START, SPHERE_CUT_LENGTH, 0, Math.PI / 2),
    gMaterials.containmentSteel
  );
  cutContDome.position.set(0, 17.5, 0);
  cutContDome.castShadow = true;
  gCutawayVesselGroup.add(cutContDome);
  registerPart(cutContDome, 'containment', new THREE.Vector3(0, 16.0, 0));

  const cutContBottom = new THREE.Mesh(
    new THREE.SphereGeometry(R_CONT, 48, 24, SPHERE_CUT_START, SPHERE_CUT_LENGTH, Math.PI / 2, Math.PI / 2),
    gMaterials.containmentSteel
  );
  cutContBottom.position.set(0, 2.5, 0);
  gCutawayVesselGroup.add(cutContBottom);
  registerPart(cutContBottom, 'containment', new THREE.Vector3(0, -7.5, 0));

  // Anclaje estructural: Pedestal y faldón cónico seccionado conectado al suelo
  buildReactorBasePedestal(gCutawayVesselGroup, true);

  // =========================================================================
  // VASIJA DE PRESIÓN DEL REACTOR (RPV) - ALTA DEFINICIÓN BIMETÁLICA
  // Acero Forjado SA-508 + Cladding Inox 308L + Tambor Interno + Doble Junta Tórica
  // =========================================================================
  // 1. Cuerpo cilíndrico exterior forjado SA-508 (Espesor masivo 180 mm)
  const cutRpvBody = new THREE.Mesh(
    new THREE.CylinderGeometry(R_RPV, R_RPV, 13.0, 48, 1, false, CYL_CUT_START, CYL_CUT_LENGTH),
    gMaterials.vesselDark
  );
  cutRpvBody.position.set(0, 10.0, 0);
  cutRpvBody.castShadow = true;
  gCutawayVesselGroup.add(cutRpvBody);
  registerPart(cutRpvBody, 'rpv', new THREE.Vector3(0, 0, -6.5));

  // 2. Revestimiento interior anticorrosión (Internal Cladding Inox 308L de 6 mm)
  const cutRpvCladding = new THREE.Mesh(
    new THREE.CylinderGeometry(R_RPV_IN, R_RPV_IN, 12.98, 48, 1, false, CYL_CUT_START, CYL_CUT_LENGTH),
    gMaterials.claddingStainless
  );
  cutRpvCladding.position.set(0, 10.0, 0);
  gCutawayVesselGroup.add(cutRpvCladding);
  registerPart(cutRpvCladding, 'rpv', new THREE.Vector3(0, 0, -6.5));

  // 3. Tambor del núcleo interno (Core Barrel Assembly en Acero Oscuro Mecanizado)
  const cutCoreBarrel = new THREE.Mesh(
    new THREE.CylinderGeometry(1.72, 1.72, 11.2, 48, 1, true, CYL_CUT_START, CYL_CUT_LENGTH),
    gMaterials.coreBarrelDark
  );
  cutCoreBarrel.position.set(0, 9.8, 0);
  gCutawayVesselGroup.add(cutCoreBarrel);
  registerPart(cutCoreBarrel, 'rpv', new THREE.Vector3(0, 0, -4.5));

  // Pestaña anular de soporte del tambor en el resalte mecanizado de la RPV
  const barrelFlange = new THREE.Mesh(
    new THREE.TorusGeometry(1.74, 0.05, 8, 36, TORUS_CUT_ARC),
    gMaterials.coreBarrelDark
  );
  barrelFlange.rotation.set(Math.PI / 2, -Math.PI * 0.75, 0);
  barrelFlange.position.set(0, 15.4, 0);
  gCutawayVesselGroup.add(barrelFlange);
  registerPart(barrelFlange, 'rpv', new THREE.Vector3(0, 0, -4.5));

  // 4. Fondo hemisférico inferior forjado de la RPV
  const cutRpvBottom = new THREE.Mesh(
    new THREE.SphereGeometry(R_RPV, 48, 24, SPHERE_CUT_START, SPHERE_CUT_LENGTH, Math.PI / 2, Math.PI / 2),
    gMaterials.vesselDark
  );
  cutRpvBottom.position.set(0, 3.5, 0);
  gCutawayVesselGroup.add(cutRpvBottom);
  registerPart(cutRpvBottom, 'rpv', new THREE.Vector3(0, -5.5, 0));

  // Revestimiento interior de fondo
  const cutRpvBottomClad = new THREE.Mesh(
    new THREE.SphereGeometry(R_RPV_IN, 48, 24, SPHERE_CUT_START, SPHERE_CUT_LENGTH, Math.PI / 2, Math.PI / 2),
    gMaterials.claddingStainless
  );
  cutRpvBottomClad.position.set(0, 3.5, 0);
  gCutawayVesselGroup.add(cutRpvBottomClad);
  registerPart(cutRpvBottomClad, 'rpv', new THREE.Vector3(0, -5.5, 0));

  // Placa cóncava distribuidora de caudal en el pleno inferior (Flow Distribution Plate en Acero Oscuro)
  const flowDistPlate = new THREE.Mesh(
    new THREE.SphereGeometry(1.55, 36, 12, SPHERE_CUT_START, SPHERE_CUT_LENGTH, Math.PI * 0.65, Math.PI * 0.35),
    gMaterials.coreBarrelDark
  );
  flowDistPlate.position.set(0, 3.65, 0);
  gCutawayVesselGroup.add(flowDistPlate);
  registerPart(flowDistPlate, 'rpv', new THREE.Vector3(0, -5.5, 0));

  // Deflectores radiales mecanizados anti-vórtice en el fondo hemisférico
  for (let s = 0; s < 4; s++) {
    const theta = CYL_CUT_START + (s / 3) * CYL_CUT_LENGTH;
    const baffle = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.45, 1.3), gMaterials.reflectorSteel);
    baffle.position.set(Math.sin(theta) * 0.75, 2.35, Math.cos(theta) * 0.75);
    baffle.rotation.y = theta - Math.PI / 2;
    gCutawayVesselGroup.add(baffle);
    registerPart(baffle, 'rpv', new THREE.Vector3(0, -5.5, 0));
  }

  // 5. Cabezal superior / Tapa forjada de cierre de la RPV
  const cutRpvHead = new THREE.Mesh(
    new THREE.SphereGeometry(R_RPV, 48, 24, SPHERE_CUT_START, SPHERE_CUT_LENGTH, 0, Math.PI / 2),
    gMaterials.forgedSteel
  );
  cutRpvHead.position.set(0, 16.5, 0);
  gCutawayVesselGroup.add(cutRpvHead);
  registerPart(cutRpvHead, 'rpv', new THREE.Vector3(0, 6.0, 0));

  const cutRpvHeadClad = new THREE.Mesh(
    new THREE.SphereGeometry(R_RPV_IN, 48, 24, SPHERE_CUT_START, SPHERE_CUT_LENGTH, 0, Math.PI / 2),
    gMaterials.claddingStainless
  );
  cutRpvHeadClad.position.set(0, 16.5, 0);
  gCutawayVesselGroup.add(cutRpvHeadClad);
  registerPart(cutRpvHeadClad, 'rpv', new THREE.Vector3(0, 6.0, 0));

  // 6. Brida principal masiva forjada de la RPV con reborde de asiento
  const cutRpvFlange = new THREE.Mesh(
    new THREE.CylinderGeometry(R_RPV + 0.22, R_RPV + 0.22, 0.45, 48, 1, false, CYL_CUT_START, CYL_CUT_LENGTH),
    gMaterials.forgedSteel
  );
  cutRpvFlange.position.set(0, 16.5, 0);
  gCutawayVesselGroup.add(cutRpvFlange);
  registerPart(cutRpvFlange, 'rpv', new THREE.Vector3(0, 4.0, 0));

  // Doble junta tórica metálica concéntrica de estanqueidad (Dual Metallic O-Rings a 155 bar)
  [R_RPV + 0.06, R_RPV + 0.13].forEach(orR => {
    const oRing = new THREE.Mesh(
      new THREE.TorusGeometry(orR, 0.018, 8, 36, TORUS_CUT_ARC),
      gMaterials.oRingSeal
    );
    oRing.rotation.set(Math.PI / 2, -Math.PI * 0.75, 0);
    oRing.position.set(0, 16.73, 0);
    gCutawayVesselGroup.add(oRing);
    registerPart(oRing, 'rpv', new THREE.Vector3(0, 4.0, 0));
  });

  // 18 Espárragos de tracción forjados en el sector no cortado
  for (let s = 0; s < 18; s++) {
    const theta = CYL_CUT_START + (s / 17) * CYL_CUT_LENGTH;
    const posX = Math.sin(theta) * (R_RPV + 0.14);
    const posZ = Math.cos(theta) * (R_RPV + 0.14);

    // Vástago de espárrago vertical
    const stud = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.75, 12), gMaterials.forgedSteel);
    stud.position.set(posX, 16.75, posZ);
    gCutawayVesselGroup.add(stud);
    registerPart(stud, 'rpv', new THREE.Vector3(0, 4.0, 0));

    // Arandela esférica mecanizada de asiento
    const washer = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.04, 12), gMaterials.forgedSteel);
    washer.position.set(posX, 16.78, posZ);
    gCutawayVesselGroup.add(washer);
    registerPart(washer, 'rpv', new THREE.Vector3(0, 4.0, 0));

    // Tuerca hexagonal en 3D (CylinderGeometry con 6 lados mecanizados)
    const nut = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.115, 0.18, 6), gMaterials.hexNut);
    nut.position.set(posX, 16.89, posZ);
    nut.rotation.y = theta + 0.2;
    gCutawayVesselGroup.add(nut);
    registerPart(nut, 'rpv', new THREE.Vector3(0, 4.0, 0));
  }

  // TAPAS DE CORTE SECCIONAL MACIZAS (Solid Wall Cut Caps) - Espesor real de 180 mm en RPV y 120 mm en Contención
  const cutAngles = [Math.PI * 0.25, -Math.PI * 0.25];
  cutAngles.forEach(ang => {
    // Pared maciza de la vasija RPV (Espesor 180 mm con sección rayada de ingeniería ASME)
    const rpvWallThickness = R_RPV - R_RPV_IN;
    const rpvWallCap = new THREE.Mesh(
      new THREE.BoxGeometry(rpvWallThickness, 13.0, 0.04),
      gMaterials.cutSection
    );
    const rMidRpv = (R_RPV + R_RPV_IN) / 2;
    rpvWallCap.position.set(Math.sin(ang) * rMidRpv, 10.0, Math.cos(ang) * rMidRpv);
    rpvWallCap.rotation.y = ang - Math.PI / 2;
    gCutawayVesselGroup.add(rpvWallCap);
    registerPart(rpvWallCap, 'rpv', new THREE.Vector3(0, 0, -6.5));

    // Pared maciza de la contención (Espesor 120 mm con sección rayada de ingeniería ASME)
    const contWallThickness = 0.12;
    const contWallCap = new THREE.Mesh(
      new THREE.BoxGeometry(contWallThickness, 15.0, 0.04),
      gMaterials.cutSection
    );
    const rMidCont = R_CONT - 0.06;
    contWallCap.position.set(Math.sin(ang) * rMidCont, 10.0, Math.cos(ang) * rMidCont);
    contWallCap.rotation.y = ang - Math.PI / 2;
    gCutawayVesselGroup.add(contWallCap);
    registerPart(contWallCap, 'containment', new THREE.Vector3(-6.5, 0, 0));
  });

  // Elementos exteriores visibles sobre el sector no cortado
  buildCrdmCrown(gCutawayVesselGroup, true);
  buildLateralNozzles(gCutawayVesselGroup, true);
  buildCoolantPumps(gCutawayVesselGroup);

  // =========================================================================
  // 3. CONSTRUCCIÓN DE COMPONENTES INTERNOS (gInternalGroup)
  // =========================================================================
  // A. NÚCLEO ACTIVO Y ELEMENTOS COMBUSTIBLES (CORE)
  const coreGroup = new THREE.Group();
  coreGroup.position.set(0, 5.2, 0);
  gInternalGroup.add(coreGroup);

  // Placa soporte inferior del núcleo forjada con orificios de paso
  const corePlate = new THREE.Mesh(
    new THREE.CylinderGeometry(1.65, 1.65, 0.28, 32),
    gMaterials.forgedSteel
  );
  corePlate.position.set(0, -2.1, 0);
  coreGroup.add(corePlate);
  registerPart(corePlate, 'core', new THREE.Vector3(0, -2.0, 0));

  // Rejilla inferior de boquillas (Lower nozzle grid)
  const lowerNozzleGrid = new THREE.Mesh(
    new THREE.CylinderGeometry(1.62, 1.62, 0.14, 32),
    gMaterials.forgedSteel
  );
  lowerNozzleGrid.position.set(0, -1.9, 0);
  coreGroup.add(lowerNozzleGrid);
  registerPart(lowerNozzleGrid, 'core', new THREE.Vector3(0, -2.0, 0));

  // 21 Ensamblajes de combustible nuclear en matriz cruciforme realista (5x5 sin esquinas)
  const faSpacing = 0.54;
  for (let fx = -2; fx <= 2; fx++) {
    for (let fz = -2; fz <= 2; fz++) {
      if (Math.abs(fx) === 2 && Math.abs(fz) === 2) continue;

      const posX = fx * faSpacing;
      const posZ = fz * faSpacing;

      // Haces de combustible (Vainas con gradiente térmico: base naranja/rojiza a zircaloy)
      const faAssembly = new THREE.Mesh(
        new THREE.BoxGeometry(0.46, 3.8, 0.46),
        gMaterials.fuelAssembly
      );
      faAssembly.position.set(posX, 0, posZ);
      faAssembly.castShadow = true;
      coreGroup.add(faAssembly);
      registerPart(faAssembly, 'core', new THREE.Vector3(0, -2.0, 0));

      // Rejillas espaciadoras hidráulicas (4 por ensamblaje)
      [-1.3, -0.4, 0.5, 1.4].forEach(gy => {
        const grid = new THREE.Mesh(new THREE.BoxGeometry(0.49, 0.12, 0.49), gMaterials.forgedSteel);
        grid.position.set(posX, gy, posZ);
        coreGroup.add(grid);
        registerPart(grid, 'core', new THREE.Vector3(0, -2.0, 0));
      });

      // Boquilla superior con resortes de sujeción (Holddown leaf springs)
      const topNozzle = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.16, 0.48), gMaterials.forgedSteel);
      topNozzle.position.set(posX, 1.98, posZ);
      coreGroup.add(topNozzle);
      registerPart(topNozzle, 'core', new THREE.Vector3(0, -2.0, 0));
    }
  }

  // Resplandor neutrónico azul Cherenkov en el cuadrante posterior (sin bloquear la visibilidad frontal del núcleo)
  const cherenkovGlow = new THREE.Mesh(
    new THREE.CylinderGeometry(1.45, 1.45, 3.6, 24, 1, true, CYL_CUT_START, CYL_CUT_LENGTH),
    gMaterials.cherenkov
  );
  cherenkovGlow.position.set(0, 0, 0);
  coreGroup.add(cherenkovGlow);
  registerPart(cherenkovGlow, 'core', new THREE.Vector3(0, -2.0, 0));

  // Iluminación térmica operativa cálida en el núcleo de fisión activa (contraste frente al agua exterior)
  const coreThermalLight = new THREE.PointLight(0xff6600, 4.2, 11.5, 1.3);
  coreThermalLight.position.set(0, 0.4, 0.3);
  coreGroup.add(coreThermalLight);

  // Iluminación técnica interior (blanco-cálido limpio) que realza el tubo ascendente (riser), SG helicoidal y CRDM
  const internalReactorLight = new THREE.PointLight(0xffeed8, 1.6, 16.0, 1.4);
  internalReactorLight.position.set(0, 11.2, 0.6);
  gInternalGroup.add(internalReactorLight);

  // B. REFLECTOR NEUTRÓNICO Y BLINDAJE INTERIOR (CORE SHROUD)
  // Al despiezar, se proyecta hacia adelante (+Z = 5.0 m) dejando el núcleo totalmente descubierto
  const reflectorMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(1.68, 1.68, 4.2, 32, 1, true, CYL_CUT_START, CYL_CUT_LENGTH),
    gMaterials.reflectorSteel
  );
  reflectorMesh.position.set(0, 5.2, 0);
  gInternalGroup.add(reflectorMesh);
  registerPart(reflectorMesh, 'reflector', new THREE.Vector3(0, -1.0, 5.0));

  // =========================================================================
  // C. BARRAS DE CONTROL Y MECANISMOS CRDM - ALTA DEFINICIÓN
  // Araña mecanizada Inconel 718 + Varillas B4C con ojivas cónicas + Tubos guía
  // =========================================================================
  const crdmGroup = new THREE.Group();
  crdmGroup.position.set(0, 9.8, 0);
  gInternalGroup.add(crdmGroup);

  // 1. Cubo central mecanizado de la araña (Spider Hub) con adaptador de bayoneta
  const spiderHub = new THREE.Mesh(
    new THREE.CylinderGeometry(0.24, 0.28, 0.42, 16),
    gMaterials.spiderNickel
  );
  spiderHub.position.set(0, 0, 0);
  crdmGroup.add(spiderHub);
  registerPart(spiderHub, 'control-rods', new THREE.Vector3(0, 4.5, 0));

  const spiderAdapter = new THREE.Mesh(
    new THREE.CylinderGeometry(0.12, 0.22, 0.32, 16),
    gMaterials.spiderNickel
  );
  spiderAdapter.position.set(0, 0.35, 0);
  crdmGroup.add(spiderAdapter);
  registerPart(spiderAdapter, 'control-rods', new THREE.Vector3(0, 4.5, 0));

  // 2. 8 Brazos radiales mecanizados de la araña con nervios de refuerzo y casquillos
  const numArms = 8;
  const rodPositions = []; // Coordenadas (x, z) de las varillas individuales
  for (let a = 0; a < numArms; a++) {
    const angle = (a / numArms) * Math.PI * 2;
    const armGroup = new THREE.Group();
    armGroup.rotation.y = angle;
    crdmGroup.add(armGroup);

    // Brazo estructural con nervadura superior
    const armVane = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 0.12, 0.038),
      gMaterials.spiderNickel
    );
    armVane.position.set(0.68, 0, 0);
    armGroup.add(armVane);
    registerPart(armVane, 'control-rods', new THREE.Vector3(0, 4.5, 0));

    // Casquillos de sujeción cilíndricos a radio interior y exterior
    [0.60, 1.15].forEach(r => {
      const socket = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.055, 0.16, 12),
        gMaterials.spiderNickel
      );
      socket.position.set(r, -0.06, 0);
      armGroup.add(socket);
      registerPart(socket, 'control-rods', new THREE.Vector3(0, 4.5, 0));

      // Guardar posición absoluta para las varillas
      rodPositions.push({
        x: Math.cos(angle) * r,
        z: -Math.sin(angle) * r
      });
    });
  }

  // 3. Varillas absorbentes de B4C individuales con ojivas cónicas de guiado
  rodPositions.forEach(pos => {
    // Vaina absorbente cilíndrica de Carburo de Boro
    const rodBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.036, 0.036, 4.5, 12),
      gMaterials.controlRodAbsorber
    );
    rodBody.position.set(pos.x, -2.35, pos.z);
    crdmGroup.add(rodBody);
    registerPart(rodBody, 'control-rods', new THREE.Vector3(0, 4.5, 0));

    // Ojiva cónica hidrodinámica en la punta inferior para inserción rápida
    const rodNose = new THREE.Mesh(
      new THREE.ConeGeometry(0.036, 0.16, 12),
      gMaterials.polishedChrome
    );
    rodNose.rotation.x = Math.PI; // Punta hacia abajo
    rodNose.position.set(pos.x, -4.68, pos.z);
    crdmGroup.add(rodNose);
    registerPart(rodNose, 'control-rods', new THREE.Vector3(0, 4.5, 0));

    // Vástago vertical continuo de accionamiento de barra de control (CRDM Drive Rod)
    // Desciende desde los mecanismos electromagnéticos superiores (y = 20.3) atravesando el pleno y guías hasta el núcleo (y = 5.2)
    const fullDriveRod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.038, 0.038, 14.8, 12),
      gMaterials.polishedChrome
    );
    fullDriveRod.position.set(pos.x, 2.8, pos.z);
    crdmGroup.add(fullDriveRod);
    registerPart(fullDriveRod, 'control-rods', new THREE.Vector3(0, 5.0, 0));
  });

  // 4. Placas deflectoras y tubos guía del pleno superior (Guide Thimble Cards)
  [-1.5, -3.2].forEach(py => {
    const guideCard = new THREE.Mesh(
      new THREE.CylinderGeometry(1.55, 1.55, 0.08, 24, 1, false, CYL_CUT_START, CYL_CUT_LENGTH),
      gMaterials.reflectorSteel
    );
    guideCard.position.set(0, py, 0);
    crdmGroup.add(guideCard);
    registerPart(guideCard, 'control-rods', new THREE.Vector3(0, 2.0, 0));
  });

  // D. TUBO ASCENDENTE CENTRAL (RISER CHIMNEY)
  // Al despiezar se desplaza a atrás-izquierda (-3.5, 2.0, -3.0)
  const riserMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(1.05, 1.05, 7.0, 32, 1, true, CYL_CUT_START, CYL_CUT_LENGTH),
    gMaterials.riserSteel
  );
  riserMesh.position.set(0, 10.8, 0);
  gInternalGroup.add(riserMesh);
  registerPart(riserMesh, 'riser', new THREE.Vector3(-3.5, 2.0, -3.0));

  // E. GENERADOR DE VAPOR HELICOIDAL INTEGRADO (HÉLICE CILÍNDRICA 3D REAL INCONEL 690 TT)
  // Sustituye el diseño antiguo en zig-zag por hélices 3D continuas renderizadas con CatmullRomCurve3 y TubeGeometry
  const sgGroup = new THREE.Group();
  sgGroup.position.set(0, 11.0, 0);
  gInternalGroup.add(sgGroup);

  const sgRadii = [1.20, 1.34, 1.48, 1.62]; // 4 capas concéntricas alrededor del riser
  const yMinSG = -2.65;
  const yMaxSG = 2.65;
  const ySpanSG = yMaxSG - yMinSG;
  const turnsPerHelix = 4.2;

  sgRadii.forEach((rad, rIdx) => {
    // 2 hélices entrelazadas continuas por radio con desfase de fase
    for (let h = 0; h < 2; h++) {
      const phase = h * Math.PI + (rIdx * 0.45);
      const points = [];
      const numPts = 140;
      for (let p = 0; p <= numPts; p++) {
        const frac = p / numPts;
        const theta = frac * Math.PI * 2 * turnsPerHelix + phase;
        const py = yMinSG + frac * ySpanSG;
        points.push(new THREE.Vector3(Math.cos(theta) * rad, py, Math.sin(theta) * rad));
      }
      const curve = new THREE.CatmullRomCurve3(points);
      const tubeGeo = new THREE.TubeGeometry(curve, 160, 0.038, 10, false);
      const tubeMesh = new THREE.Mesh(tubeGeo, gMaterials.inconelTubes);
      tubeMesh.castShadow = true;
      sgGroup.add(tubeMesh);
      registerPart(tubeMesh, 'steam-generator', new THREE.Vector3(5.5, 1.0, 0));
    }
  });

  // 4 Tirantes verticales de soporte estructural y arriostramiento (sin dientes en zig-zag)
  for (let s = 0; s < 4; s++) {
    const sAng = (s / 4) * Math.PI * 2;
    const tieR = 1.41;
    const tieRod = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, ySpanSG + 0.3, 12),
      gMaterials.forgedSteel
    );
    tieRod.position.set(Math.cos(sAng) * tieR, 0, Math.sin(sAng) * tieR);
    sgGroup.add(tieRod);
    registerPart(tieRod, 'steam-generator', new THREE.Vector3(5.5, 1.0, 0));
  }

  // Colector anular superior forjado de vapor seco (Upper Steam Ring Header)
  const upperSgHeader = new THREE.Mesh(
    new THREE.TorusGeometry(1.41, 0.14, 16, 48, TORUS_CUT_ARC),
    gMaterials.forgedSteel
  );
  upperSgHeader.rotation.set(Math.PI / 2, -Math.PI * 0.75, 0);
  upperSgHeader.position.set(0, yMaxSG + 0.18, 0);
  sgGroup.add(upperSgHeader);
  registerPart(upperSgHeader, 'steam-generator', new THREE.Vector3(5.5, 1.0, 0));

  // Colector anular inferior forjado de agua de alimentación (Lower Feedwater Header)
  const lowerSgHeader = new THREE.Mesh(
    new THREE.TorusGeometry(1.41, 0.14, 16, 48, TORUS_CUT_ARC),
    gMaterials.forgedSteel
  );
  lowerSgHeader.rotation.set(Math.PI / 2, -Math.PI * 0.75, 0);
  lowerSgHeader.position.set(0, yMinSG - 0.18, 0);
  sgGroup.add(lowerSgHeader);
  registerPart(lowerSgHeader, 'steam-generator', new THREE.Vector3(5.5, 1.0, 0));

  // F. PRESURIZADOR INTEGRADO EN LA CÚPULA SUPERIOR Y PLATOS SEPARADORES DE VAPOR
  // Al despiezar se desplaza hacia arriba y adelante (0, 3.5, 4.0)
  const pzrGroup = new THREE.Group();
  pzrGroup.position.set(0, 16.5, 0);
  gInternalGroup.add(pzrGroup);

  // 1. Platos separadores de humedad / Ciclones centrífugos de vapor (Steam Cyclone Separators Deck)
  const sepDeckPlate = new THREE.Mesh(
    new THREE.CylinderGeometry(R_RPV_IN - 0.06, R_RPV_IN - 0.06, 0.12, 32, 1, false, CYL_CUT_START, CYL_CUT_LENGTH),
    gMaterials.reflectorSteel
  );
  sepDeckPlate.position.set(0, -0.65, 0);
  pzrGroup.add(sepDeckPlate);
  registerPart(sepDeckPlate, 'pressurizer', new THREE.Vector3(0, 3.5, 4.0));

  // 6 Tubos separadores ciclónicos verticales con difusor superior y toberas de remolino
  for (let c = 0; c < 6; c++) {
    const cAng = (c / 6) * Math.PI * 2;
    if (cAng > Math.PI * 0.20 && cAng < Math.PI * 0.80) continue;
    const cR = 0.95;
    const cycloneGroup = new THREE.Group();
    cycloneGroup.position.set(Math.cos(cAng) * cR, -0.15, Math.sin(cAng) * cR);
    pzrGroup.add(cycloneGroup);

    const cyBody = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.85, 16), gMaterials.forgedSteel);
    cycloneGroup.add(cyBody);

    const cyCap = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.25, 16), gMaterials.spiderNickel);
    cyCap.position.y = 0.50;
    cycloneGroup.add(cyCap);
    registerPart(cyBody, 'pressurizer', new THREE.Vector3(0, 3.5, 4.0));
  }

  // 2. Placa deflectora y secador de vapor Chevron (Steam Dryer Vane Deck)
  const chevronDryer = new THREE.Mesh(
    new THREE.CylinderGeometry(R_RPV_IN - 0.10, R_RPV_IN - 0.10, 0.16, 32, 1, false, CYL_CUT_START, CYL_CUT_LENGTH),
    gMaterials.cutSection
  );
  chevronDryer.position.set(0, 0.75, 0);
  pzrGroup.add(chevronDryer);
  registerPart(chevronDryer, 'pressurizer', new THREE.Vector3(0, 3.5, 4.0));

  // 3. Placa deflectora de oleaje del presurizador (Surge Baffle Plate)
  const pzrBaffle = new THREE.Mesh(
    new THREE.CylinderGeometry(R_RPV_IN - 0.05, R_RPV_IN - 0.05, 0.18, 32),
    gMaterials.forgedSteel
  );
  pzrBaffle.position.set(0, -1.2, 0);
  pzrGroup.add(pzrBaffle);
  registerPart(pzrBaffle, 'pressurizer', new THREE.Vector3(0, 3.5, 4.0));

  // 4. Calentadores eléctricos de inmersión en racimo (Heater bundle)
  for (let hx = -0.9; hx <= 0.9; hx += 0.45) {
    for (let hz = -0.9; hz <= 0.9; hz += 0.45) {
      if (hx * hx + hz * hz <= 0.95) {
        const heater = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.8, 10), gMaterials.inconelTubes);
        heater.position.set(hx, -0.2, hz);
        pzrGroup.add(heater);
        registerPart(heater, 'pressurizer', new THREE.Vector3(0, 3.5, 4.0));
      }
    }
  }

  // 5. Cabezal de rociadores de condensación (Spray nozzle)
  const sprayHead = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.45, 16), gMaterials.forgedSteel);
  sprayHead.rotation.x = Math.PI;
  sprayHead.position.set(0, 1.4, 0);
  pzrGroup.add(sprayHead);
  registerPart(sprayHead, 'pressurizer', new THREE.Vector3(0, 3.5, 4.0));

  // 6. Válvulas de seguridad PORV
  const pzrValve = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.55, 0.38), gMaterials.crdmMetal);
  pzrValve.position.set(0.9, 1.8, 0);
  pzrGroup.add(pzrValve);
  registerPart(pzrValve, 'pressurizer', new THREE.Vector3(0, 3.5, 4.0));

  // G. CANAL DESCENDENTE ANULAR (DOWNCOMER)
  const downcomerMesh = new THREE.Mesh(
    new THREE.RingGeometry(1.68, R_RPV_IN - 0.02, 32),
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.35, side: THREE.DoubleSide })
  );
  downcomerMesh.rotation.x = Math.PI / 2;
  downcomerMesh.position.set(0, 9.2, 0);
  gInternalGroup.add(downcomerMesh);
  registerPart(downcomerMesh, 'downcomer', new THREE.Vector3(-3.0, 0, 2.5));

  // H. SISTEMA DE PARTÍCULAS DE CONVECCIÓN NATURAL DEL CIRCUITO PRIMARIO (RIGOR TERMODINÁMICO)
  // Confinadas estrictamente dentro del corte del reactor:
  // 1. Partículas calientes ascendentes (+Y) en el Riser central (320 °C, gradiente rojo/naranja)
  // 2. Partículas frías descendentes (-Y) en el Downcomer anular (290 °C, azul/cian) tras el serpentín SG
  const pCount = 360;
  const convGeo = new THREE.BufferGeometry();
  const convPos = new Float32Array(pCount * 3);
  const convColors = new Float32Array(pCount * 3);
  const convSpeeds = new Float32Array(pCount);
  const convIsRiser = new Uint8Array(pCount);

  for (let i = 0; i < pCount; i++) {
    const isRiser = (i < pCount / 2);
    convIsRiser[i] = isRiser ? 1 : 0;
    const ang = Math.random() * Math.PI * 2;

    if (isRiser) {
      // Ascenso por el tubo central (Riser): r in [0.05, 0.88], y in [4.5, 14.2]
      const r = Math.sqrt(Math.random()) * 0.88;
      convPos[i * 3]     = Math.cos(ang) * r;
      convPos[i * 3 + 1] = 4.5 + Math.random() * 9.5;
      convPos[i * 3 + 2] = Math.sin(ang) * r;
      convSpeeds[i]      = 1.6 + Math.random() * 1.2;

      // Color cálido naranja/rojo
      const c = new THREE.Color(Math.random() > 0.4 ? 0xf97316 : 0xef4444);
      convColors[i * 3]     = c.r;
      convColors[i * 3 + 1] = c.g;
      convColors[i * 3 + 2] = c.b;
    } else {
      // Descenso por el canal anular (Downcomer): r in [1.28, 1.72], y in [4.5, 14.2]
      const r = 1.28 + Math.random() * 0.42;
      convPos[i * 3]     = Math.cos(ang) * r;
      convPos[i * 3 + 1] = 4.5 + Math.random() * 9.5;
      convPos[i * 3 + 2] = Math.sin(ang) * r;
      convSpeeds[i]      = 1.2 + Math.random() * 0.9;

      // Color frío azul/cian
      const c = new THREE.Color(Math.random() > 0.45 ? 0x0284c7 : 0x38bdf8);
      convColors[i * 3]     = c.r;
      convColors[i * 3 + 1] = c.g;
      convColors[i * 3 + 2] = c.b;
    }
  }

  convGeo.setAttribute('position', new THREE.BufferAttribute(convPos, 3));
  convGeo.setAttribute('color', new THREE.BufferAttribute(convColors, 3));
  const convMat = new THREE.PointsMaterial({
    size: 0.16,
    vertexColors: true,
    transparent: true,
    opacity: 0.92,
    blending: THREE.AdditiveBlending
  });
  const convPoints = new THREE.Points(convGeo, convMat);
  gInternalGroup.add(convPoints);
  gPrimaryConvectionParticles = {
    points: convPoints,
    speeds: convSpeeds,
    isRiser: convIsRiser
  };

  // Estado inicial de visibilidad: corte transversal de ingeniería (120°) activo por defecto
  gClosedVesselGroup.visible = false;
  gCutawayVesselGroup.visible = true;
  gInternalGroup.visible = true;
}

// ==========================================================================
// 8. CONSTRUCCIÓN DE LA NAVE DE CONTENCIÓN Y PISCINA INDUSTRIAL (SMR HALL)
// Entorno con piscina abierta UHS, agua translúcida, pasarela, escaleras y tuberías
// ==========================================================================
// Variables globales para animar la superficie del agua y las corrientes de convección térmica
let gWaterSurfaceMesh = null;
let gPrimaryConvectionParticles = null;

function buildSMRHallBuilding(scene) {
  const hallRoot = new THREE.Group();
  scene.add(hallRoot);
  gSceneRoots.smrHallBuilding = hallRoot;

  function registerHallPart(mesh, compId) {
    mesh.userData = { isComponent: true, componentId: compId };
    gInteractiveMeshes.push(mesh);
    if (!gComponentMeshMap[compId]) gComponentMeshMap[compId] = [];
    gComponentMeshMap[compId].push(mesh);
  }

  function registerPoolMeshVisual(mesh) {
    if (!gComponentMeshMap['pool']) gComponentMeshMap['pool'] = [];
    gComponentMeshMap['pool'].push(mesh);
  }

  // =========================================================================
  // 1. EL FOSO: MUROS MASIVOS DE HORMIGÓN ARMADO ENVEJECIDO, LINER INOX Y PILASTRAS
  // =========================================================================
  // Suelo masivo del foso de hormigón armado a cota y = 0
  const poolFloor = new THREE.Mesh(new THREE.BoxGeometry(32.0, 1.2, 28.0), gMaterials.concrete);
  poolFloor.position.set(0, -0.6, 0);
  poolFloor.receiveShadow = true;
  hallRoot.add(poolFloor);
  registerPoolMeshVisual(poolFloor);

  // Revestimiento de fondo (Pool Bottom Liner) en chapa de acero inox 304L soldada
  const poolLinerFloor = new THREE.Mesh(new THREE.BoxGeometry(29.6, 0.04, 25.6), gMaterials.poolLiner);
  poolLinerFloor.position.set(0, 0.02, 0);
  poolLinerFloor.receiveShadow = true;
  hallRoot.add(poolLinerFloor);
  registerPoolMeshVisual(poolLinerFloor);

  // Placas del suelo retiradas: suelo de piscina limpio y despejado a cota 0

  // Revestimiento lateral de acero inoxidable (Pool Wall Liner 304L) hasta cota de agua y = 10.5 m
  const linerBack = new THREE.Mesh(new THREE.BoxGeometry(29.6, 10.4, 0.08), gMaterials.poolLiner);
  linerBack.position.set(0, 5.25, -12.95);
  hallRoot.add(linerBack);

  const linerLeft = new THREE.Mesh(new THREE.BoxGeometry(0.08, 10.4, 25.6), gMaterials.poolLiner);
  linerLeft.position.set(-14.95, 5.25, 0);
  hallRoot.add(linerLeft);

  const linerRight = new THREE.Mesh(new THREE.BoxGeometry(0.08, 10.4, 25.6), gMaterials.poolLiner);
  linerRight.position.set(14.95, 5.25, 0);
  hallRoot.add(linerRight);

  // Pared trasera masiva de hormigón armado a z = -13.5 m
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(32.0, 26.0, 1.4), gMaterials.concrete);
  backWall.position.set(0, 13.0, -13.7);
  backWall.receiveShadow = true;
  hallRoot.add(backWall);

  // Pared lateral izquierda a x = -15.5 m
  const leftWall = new THREE.Mesh(new THREE.BoxGeometry(1.4, 26.0, 28.0), gMaterials.concrete);
  leftWall.position.set(-15.7, 13.0, 0);
  leftWall.receiveShadow = true;
  hallRoot.add(leftWall);

  // Pared lateral derecha a x = 15.5 m
  const rightWall = new THREE.Mesh(new THREE.BoxGeometry(1.4, 26.0, 28.0), gMaterials.concrete);
  rightWall.position.set(15.7, 13.0, 0);
  rightWall.receiveShadow = true;
  hallRoot.add(rightWall);

  // -------------------------------------------------------------------------
  // CIMENTACIONES PROFUNDAS Y ZAPATAS DE HORMIGÓN ARMADO (CIVIL ENGINEERING FOUNDATIONS)
  // Evita que el edificio parezca una caja fina flotando en el vacío negro
  // -------------------------------------------------------------------------
  // Losa profunda de sub-cimentación masiva (y = -1.2 a -3.6 m)
  const foundationBasemat = new THREE.Mesh(new THREE.BoxGeometry(33.6, 2.4, 28.6), gMaterials.concrete);
  foundationBasemat.position.set(0, -2.4, 0);
  foundationBasemat.receiveShadow = true;
  hallRoot.add(foundationBasemat);
  registerPoolMeshVisual(foundationBasemat);

  // Zapatas corridas y encepados de cimentación bajo los muros de contención (y = -3.6 a -4.8 m)
  // Zapata bajo muro izquierdo (x = -15.7 m)
  const footingLeft = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.2, 29.2), gMaterials.concrete);
  footingLeft.position.set(-15.7, -4.2, 0);
  footingLeft.receiveShadow = true;
  hallRoot.add(footingLeft);
  registerPoolMeshVisual(footingLeft);

  // Zapata bajo muro derecho (x = +15.7 m)
  const footingRight = new THREE.Mesh(new THREE.BoxGeometry(3.6, 1.2, 29.2), gMaterials.concrete);
  footingRight.position.set(15.7, -4.2, 0);
  footingRight.receiveShadow = true;
  hallRoot.add(footingRight);
  registerPoolMeshVisual(footingRight);

  // Zapata bajo muro trasero (z = -13.7 m)
  const footingBack = new THREE.Mesh(new THREE.BoxGeometry(34.0, 1.2, 3.6), gMaterials.concrete);
  footingBack.position.set(0, -4.2, -13.7);
  footingBack.receiveShadow = true;
  hallRoot.add(footingBack);
  registerPoolMeshVisual(footingBack);

  // Encepado central de gran canto bajo el pedestal del reactor
  const footingCore = new THREE.Mesh(new THREE.BoxGeometry(8.5, 1.6, 8.5), gMaterials.concrete);
  footingCore.position.set(0, -4.0, 0);
  footingCore.receiveShadow = true;
  hallRoot.add(footingCore);
  registerPoolMeshVisual(footingCore);

  // Capa de hormigón de limpieza y asiento de grava en el lecho inferior
  const blindingBed = new THREE.Mesh(new THREE.BoxGeometry(36.0, 0.4, 31.0), gMaterials.concrete);
  blindingBed.position.set(0, -5.0, 0);
  blindingBed.receiveShadow = true;
  hallRoot.add(blindingBed);

  // -------------------------------------------------------------------------
  // CORTE SECCIONAL DE LA FACHADA (Bordes gruesos con biseles/marcos metálicos)
  // En el plano frontal z = +14.0 m
  // -------------------------------------------------------------------------
  const cutPlaneZ = 14.0;

  // 1. Remate seccionado del muro izquierdo (x = -15.7 m, y = 0 a 26 m)
  const leftCutSection = new THREE.Mesh(new THREE.BoxGeometry(1.4, 26.0, 0.30), gMaterials.cutSection);
  leftCutSection.position.set(-15.7, 13.0, cutPlaneZ);
  hallRoot.add(leftCutSection);

  // Marco metálico perimetral de corte en muro izquierdo
  const leftBezelV1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 26.0, 0.40), gMaterials.forgedSteel);
  leftBezelV1.position.set(-16.4, 13.0, cutPlaneZ);
  hallRoot.add(leftBezelV1);
  const leftBezelV2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 26.0, 0.40), gMaterials.forgedSteel);
  leftBezelV2.position.set(-15.0, 13.0, cutPlaneZ);
  hallRoot.add(leftBezelV2);
  const leftBezelH1 = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.08, 0.40), gMaterials.forgedSteel);
  leftBezelH1.position.set(-15.7, 26.0, cutPlaneZ);
  hallRoot.add(leftBezelH1);

  // 2. Remate seccionado del muro derecho (x = +15.7 m, y = 0 a 26 m)
  const rightCutSection = new THREE.Mesh(new THREE.BoxGeometry(1.4, 26.0, 0.30), gMaterials.cutSection);
  rightCutSection.position.set(15.7, 13.0, cutPlaneZ);
  hallRoot.add(rightCutSection);

  // Marco metálico perimetral de corte en muro derecho
  const rightBezelV1 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 26.0, 0.40), gMaterials.forgedSteel);
  rightBezelV1.position.set(15.0, 13.0, cutPlaneZ);
  hallRoot.add(rightBezelV1);
  const rightBezelV2 = new THREE.Mesh(new THREE.BoxGeometry(0.08, 26.0, 0.40), gMaterials.forgedSteel);
  rightBezelV2.position.set(16.4, 13.0, cutPlaneZ);
  hallRoot.add(rightBezelV2);
  const rightBezelH1 = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.08, 0.40), gMaterials.forgedSteel);
  rightBezelH1.position.set(15.7, 26.0, cutPlaneZ);
  hallRoot.add(rightBezelH1);

  // 3. Remate seccionado de la losa inferior y cimentaciones (y = 0.0 a -4.8 m, ancho 32.8 m)
  const slabCutSection = new THREE.Mesh(new THREE.BoxGeometry(32.8, 4.8, 0.30), gMaterials.cutSection);
  slabCutSection.position.set(0, -2.4, cutPlaneZ);
  hallRoot.add(slabCutSection);

  // Marco metálico perimetral inferior
  const slabBezelTop = new THREE.Mesh(new THREE.BoxGeometry(32.9, 0.08, 0.40), gMaterials.forgedSteel);
  slabBezelTop.position.set(0, 0.0, cutPlaneZ);
  hallRoot.add(slabBezelTop);
  const slabBezelBtm = new THREE.Mesh(new THREE.BoxGeometry(32.9, 0.08, 0.40), gMaterials.forgedSteel);
  slabBezelBtm.position.set(0, -4.8, cutPlaneZ);
  hallRoot.add(slabBezelBtm);

  // Borde de forjado perimetral pegado a los muros laterales con barandillas amarillas
  // (La viga frontal central que tapaba el núcleo ha sido retirada para máxima visibilidad)
  [-1, 1].forEach(side => {
    const slabX = side * 13.6; // Pegado al muro a x = +-15.7
    const slabWidth = 4.2;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(slabWidth, 1.8, 2.8), gMaterials.concrete);
    slab.position.set(slabX, 9.8, 13.5);
    slab.receiveShadow = true;
    hallRoot.add(slab);
    registerHallPart(slab, 'pool');

    // Rodapié de advertencia chevron en el borde interior del forjado
    const stripe = new THREE.Mesh(new THREE.BoxGeometry(slabWidth, 0.12, 0.08), gMaterials.hazardStripes);
    stripe.position.set(slabX, 10.74, 12.08);
    hallRoot.add(stripe);

    // Barandilla perimetral amarilla de seguridad (postes verticales + pasamanos doble)
    const railX = side * 11.5; // Borde frontal hacia la piscina
    for (let rz = 12.2; rz <= 14.8; rz += 0.8) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.15, 8), gMaterials.safetyYellow);
      post.position.set(railX, 11.32, rz);
      hallRoot.add(post);
    }
    const topRail = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.05, 2.6), gMaterials.safetyYellow);
    topRail.position.set(railX, 11.9, 13.5);
    hallRoot.add(topRail);

    const midRail = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.04, 2.6), gMaterials.safetyYellow);
    midRail.position.set(railX, 11.35, 13.5);
    hallRoot.add(midRail);

    // Placa técnica de advertencia sobre el forjado perimetral
    const curbPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(2.4, 0.65),
      new THREE.MeshBasicMaterial({ map: gTextures.signRadiation })
    );
    curbPlate.rotation.x = -Math.PI / 2;
    curbPlate.position.set(slabX, 10.72, 13.5);
    hallRoot.add(curbPlate);
  });

  // 8 Pilastras estructurales de hormigón armado (Contrafuertes verticales macizos)
  const pilasterPositions = [
    // Pared trasera
    { x: -8.0, y: 13.0, z: -13.1, w: 1.4, d: 0.9 },
    { x: 8.0,  y: 13.0, z: -13.1, w: 1.4, d: 0.9 },
    // Pared izquierda
    { x: -15.1, y: 13.0, z: -8.0, w: 0.9, d: 1.4 },
    { x: -15.1, y: 13.0, z: 0.0,  w: 0.9, d: 1.4 },
    { x: -15.1, y: 13.0, z: 8.0,  w: 0.9, d: 1.4 },
    // Pared derecha
    { x: 15.1,  y: 13.0, z: -8.0, w: 0.9, d: 1.4 },
    { x: 15.1,  y: 13.0, z: -1.5, w: 0.9, d: 1.4 },
    { x: 15.1,  y: 13.0, z: 6.5,  w: 0.9, d: 1.4 }
  ];

  pilasterPositions.forEach(p => {
    const col = new THREE.Mesh(new THREE.BoxGeometry(p.w, 26.0, p.d), gMaterials.concrete);
    col.position.set(p.x, p.y, p.z);
    col.receiveShadow = true;
    hallRoot.add(col);

    // Planchas de acero empotradas (Embedment plates) con pernos hexagonales en cotas clave
    [12.0, 16.5, 23.5].forEach(ey => {
      const plate = new THREE.Mesh(new THREE.BoxGeometry(p.w * 0.85, 0.9, p.d * 0.85), gMaterials.steelPlate);
      plate.position.set(p.x, ey, p.z);
      hallRoot.add(plate);

      // 4 Pernos hexagonales de anclaje
      [[-0.25, -0.25], [0.25, -0.25], [-0.25, 0.25], [0.25, 0.25]].forEach(([bx, bz]) => {
        const b = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.12, 6), gMaterials.hexNut);
        b.rotation.x = Math.PI / 2;
        b.position.set(p.x + (p.w > p.d ? bx * p.w : 0), ey, p.z + (p.d > p.w ? bz * p.d : 0));
        hallRoot.add(b);
      });
    });
  });

  // Escala métrica de nivel de agua en la pared derecha (Depth Gauge Scale)
  const depthScaleMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(0.65, 10.4),
    new THREE.MeshBasicMaterial({ map: gTextures.depthScale, transparent: true })
  );
  depthScaleMesh.rotation.y = -Math.PI / 2;
  depthScaleMesh.position.set(14.88, 5.25, 8.5);
  hallRoot.add(depthScaleMesh);

  // =========================================================================
  // 2. EL AGUA Y LA PISCINA UHS (VOLUMEN TRANSLÚCIDO AZUL-VERDOSO Y BURBUJAS)
  // =========================================================================
  // Superficie del agua con brillo especular, refracción Fresnel y mapa de relieve de ondas dinámico
  const waterSurfaceGeo = new THREE.PlaneGeometry(29.6, 25.1, 48, 48);
  const waterSurface = new THREE.Mesh(waterSurfaceGeo, gMaterials.waterSurface);
  waterSurface.rotation.x = -Math.PI / 2;
  waterSurface.position.set(0, 10.48, -0.25);
  waterSurface.receiveShadow = true;
  hallRoot.add(waterSurface);
  registerPoolMeshVisual(waterSurface);
  gWaterSurfaceMesh = waterSurface;

  // -------------------------------------------------------------------------
  // ELIMINACIÓN DE ARTEFACTOS Y PLANOS FANTASMA EN EL AGUA
  // -------------------------------------------------------------------------
  while (gPoolNeonRimGroup.children.length > 0) {
    const c = gPoolNeonRimGroup.children.pop();
    if (c.geometry) c.geometry.dispose();
  }
  gPoolNeonRimGroup.visible = false;

  // Rigor Termodinámico: El espacio anular está al vacío y no burbujea al agua exterior.
  // Las partículas de convección térmica primaria se confinan dentro del corte del reactor (gPrimaryConvectionParticles).
  gBubbleParticles = null;

  // =========================================================================
  // 3. PUENTE GRÚA SUPERIOR (GANTRY CRANE INDUSTRIAL CON FESTOON UMBILICAL)
  // =========================================================================
  // =========================================================================
  // 3. PUENTE GRÚA POLAR INDUSTRIAL Y BALANCÍN DE SUSPENSIÓN PESADA (800t CMU)
  // =========================================================================
  const craneGroup = new THREE.Group();
  craneGroup.position.set(0, 21.8, 0); // Altura optimizada dentro del campo visual superior de la cámara
  hallRoot.add(craneGroup);

  // Vigas carrilera de rodadura (Crane runway rails) en las paredes laterales
  [-15.0, 15.0].forEach(rx => {
    const runwayBeam = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.75, 27.0), gMaterials.forgedSteel);
    runwayBeam.position.set(rx, -0.35, 0);
    craneGroup.add(runwayBeam);

    const railTrack = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.18, 27.0), gMaterials.forgedSteel);
    railTrack.position.set(rx, 0.1, 0);
    craneGroup.add(railTrack);
  });

  // Doble Viga Cajón Principal en Amarillo Industrial (Luz de 30 metros)
  [-1.6, 1.6].forEach((gz, idx) => {
    const girder = new THREE.Mesh(new THREE.BoxGeometry(30.2, 1.8, 0.65), gMaterials.safetyYellow);
    girder.position.set(0, 0.9, gz);
    girder.castShadow = true;
    craneGroup.add(girder);
    registerHallPart(girder, 'polar-crane');

    // Cartel técnico de carga nominal C.M.U. 800t en la viga frontal
    if (idx === 1) {
      const signCraneMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(7.2, 1.1),
        new THREE.MeshBasicMaterial({ map: gTextures.signCrane, transparent: true })
      );
      signCraneMesh.position.set(0, 0.9, gz + 0.35);
      craneGroup.add(signCraneMesh);
    }

    // Testeros terminales con franjas de peligro chevron
    [-14.8, 14.8].forEach(tx => {
      const endTruck = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 1.4), gMaterials.hazardStripes);
      endTruck.position.set(tx, 0.6, gz);
      craneGroup.add(endTruck);
      registerHallPart(endTruck, 'polar-crane');

      // Baliza de advertencia ámbar
      const beacon = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.12, 0.28, 8),
        new THREE.MeshBasicMaterial({ color: 0xf59e0b })
      );
      beacon.position.set(tx, 1.9, gz);
      craneGroup.add(beacon);
    });
  });

  // Pasarela de mantenimiento y barandilla sobre la viga del puente grúa
  const craneWalkway = new THREE.Mesh(new THREE.BoxGeometry(29.0, 0.1, 1.2), gMaterials.catwalkGrating);
  craneWalkway.position.set(0, 1.85, 0);
  craneGroup.add(craneWalkway);

  // Carro de Polipasto (Hoist Crab / Trolley)
  const trolley = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.95, 3.8), gMaterials.vesselDark);
  trolley.position.set(0, 2.15, 0);
  craneGroup.add(trolley);
  registerHallPart(trolley, 'polar-crane');

  // Tambor de cable y motorreductor del polipasto
  const drum = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 2.4, 16), gMaterials.forgedSteel);
  drum.rotation.z = Math.PI / 2;
  drum.position.set(0, 2.9, 0);
  craneGroup.add(drum);

  // Poleas de reenvío en el carro
  [-0.7, 0.7].forEach(px => {
    const sheave = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 0.12, 16), gMaterials.forgedSteel);
    sheave.rotation.z = Math.PI / 2;
    sheave.position.set(px, 1.7, 0);
    craneGroup.add(sheave);
  });

  // 4 Cables de acero de izado vertical tensados desde el tambor al gancho
  [[-0.6, -0.6], [0.6, -0.6], [-0.6, 0.6], [0.6, 0.6]].forEach(([cx, cz]) => {
    const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 3.2, 8), gMaterials.forgedSteel);
    cable.position.set(cx, 0.35, cz);
    craneGroup.add(cable);
  });

  // Bloque de gancho forjado de grúa de 800 toneladas con poleas
  const hookBlock = new THREE.Mesh(new THREE.BoxGeometry(1.6, 1.1, 1.4), gMaterials.safetyYellow);
  hookBlock.position.set(0, -1.2, 0);
  craneGroup.add(hookBlock);
  registerHallPart(hookBlock, 'polar-crane');

  const hookCurv = new THREE.Mesh(new THREE.TorusGeometry(0.52, 0.16, 12, 16, Math.PI * 1.4), gMaterials.forgedSteel);
  hookCurv.rotation.z = -Math.PI * 0.7;
  hookCurv.position.set(0, -2.1, 0);
  craneGroup.add(hookCurv);
  registerHallPart(hookCurv, 'polar-crane');

  // =========================================================================
  // BALANCÍN / VIGA SEPARADORA DE CARGA PESADA (800t HEAVY SPREADER BEAM)
  // Justifica físicamente la suspensión del reactor nuclear en la piscina UHS
  // =========================================================================
  const spreaderGroup = new THREE.Group();
  spreaderGroup.position.set(0, -2.0, 0); // world y = 19.8 m
  craneGroup.add(spreaderGroup);

  // Viga cajón estructural del balancín en amarillo de seguridad
  const spreaderBody = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.65, 0.75), gMaterials.safetyYellow);
  spreaderBody.castShadow = true;
  spreaderGroup.add(spreaderBody);
  registerHallPart(spreaderBody, 'polar-crane');

  // Franjas de advertencia en los extremos del balancín
  [-2.4, 2.4].forEach(bx => {
    const bHazard = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.67, 0.77), gMaterials.hazardStripes);
    bHazard.position.set(bx, 0, 0);
    spreaderGroup.add(bHazard);
  });

  // Orejeta central y grillete maestro de suspensión al gancho de la grúa
  const masterLug = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.45, 0.14), gMaterials.forgedSteel);
  masterLug.position.set(0, 0.45, 0);
  spreaderGroup.add(masterLug);

  const masterPin = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.55, 12), gMaterials.forgedSteel);
  masterPin.rotation.x = Math.PI / 2;
  masterPin.position.set(0, 0.5, 0);
  spreaderGroup.add(masterPin);

  // 4 Grilletes de extremo forjados en el balancín
  const spreaderCorners = [
    { x: -2.3, z: -0.28 },
    { x: -2.3, z:  0.28 },
    { x:  2.3, z: -0.28 },
    { x:  2.3, z:  0.28 }
  ];
  spreaderCorners.forEach(sc => {
    const shackle = new THREE.Mesh(new THREE.TorusGeometry(0.12, 0.035, 8, 12), gMaterials.forgedSteel);
    shackle.position.set(sc.x, -0.4, sc.z);
    spreaderGroup.add(shackle);
  });

  // 4 Eslingas masivas de cable de acero trenzado (Wire Slings Ø55 mm) que conectan el balancín a los muñones del reactor
  // Puntos de anclaje en el reactor:
  // Muñón izquierdo: world (-2.85, 16.5, 0) -> relativo a craneGroup (-2.85, 16.5 - 21.8 = -5.3, 0)
  // Muñón derecho: world (2.85, 16.5, 0) -> relativo a craneGroup (2.85, 16.5 - 21.8 = -5.3, 0)
  const slingTargets = [
    { top: new THREE.Vector3(-2.3, -2.4, -0.28), btm: new THREE.Vector3(-2.85, -5.3, 0) },
    { top: new THREE.Vector3(-2.3, -2.4,  0.28), btm: new THREE.Vector3(-2.85, -5.3, 0) },
    { top: new THREE.Vector3( 2.3, -2.4, -0.28), btm: new THREE.Vector3( 2.85, -5.3, 0) },
    { top: new THREE.Vector3( 2.3, -2.4,  0.28), btm: new THREE.Vector3( 2.85, -5.3, 0) }
  ];

  slingTargets.forEach(st => {
    const sLen = st.top.distanceTo(st.btm);
    const sMid = new THREE.Vector3().addVectors(st.top, st.btm).multiplyScalar(0.5);
    const sWire = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, sLen, 8), gMaterials.forgedSteel);
    sWire.position.copy(sMid);
    sWire.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), new THREE.Vector3().subVectors(st.top, st.btm).normalize());
    craneGroup.add(sWire);
    registerHallPart(sWire, 'polar-crane');
  });

  // 2 Eslingas verticales auxiliares a cáncamos de la cúpula superior
  [-0.85, 0.85].forEach(cz => {
    const cWire = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.4, 8), gMaterials.forgedSteel);
    cWire.position.set(0, -2.7, cz);
    craneGroup.add(cWire);
    registerHallPart(cWire, 'polar-crane');
  });

  // Mazo de Cables Umbilical Festoon que cuelga en catenaria hacia el reactor
  const festoonCurve1 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0.5, 23.2, 0.5),
    new THREE.Vector3(1.2, 21.5, 0.9),
    new THREE.Vector3(0.8, 20.2, 1.1),
    new THREE.Vector3(0.2, 19.6, 0.85)
  ]);
  const festoonMesh1 = new THREE.Mesh(new THREE.TubeGeometry(festoonCurve1, 24, 0.045, 8, false), gMaterials.cableBlack);
  hallRoot.add(festoonMesh1);

  const festoonCurve2 = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-0.4, 23.2, 0.5),
    new THREE.Vector3(-0.9, 21.4, 0.8),
    new THREE.Vector3(-0.6, 20.1, 1.0),
    new THREE.Vector3(-0.1, 19.6, 0.85)
  ]);
  const festoonMesh2 = new THREE.Mesh(new THREE.TubeGeometry(festoonCurve2, 24, 0.04, 8, false), gMaterials.cableOrange);
  hallRoot.add(festoonMesh2);

  // =========================================================================
  // 4. PASARELAS METÁLICAS DE REJILLA (CATWALKS) Y ESCALERAS DE VARIOS NIVELES
  // =========================================================================
  // A. Pasarela Superior Perimetral a y = 16.5 m (En U: pared trasera, izquierda y derecha)
  const upperCatwalkGroup = new THREE.Group();
  upperCatwalkGroup.position.set(0, 16.5, 0);
  hallRoot.add(upperCatwalkGroup);

  // Plataforma trasera
  const backPlat = new THREE.Mesh(new THREE.BoxGeometry(29.0, 0.14, 2.0), gMaterials.catwalkGrating);
  backPlat.position.set(0, 0, -12.4);
  upperCatwalkGroup.add(backPlat);

  // Plataforma lateral izquierda
  const leftPlat = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.14, 25.0), gMaterials.catwalkGrating);
  leftPlat.position.set(-14.4, 0, 0.5);
  upperCatwalkGroup.add(leftPlat);

  // Plataforma lateral derecha
  const rightPlat = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.14, 25.0), gMaterials.catwalkGrating);
  rightPlat.position.set(14.4, 0, 0.5);
  upperCatwalkGroup.add(rightPlat);

  // Barandillas de seguridad en amarillo industrial desgastado con rodapié chevron
  function buildRailingSection(group, start, end) {
    const len = start.distanceTo(end);
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const dir = new THREE.Vector3().subVectors(end, start).normalize();
    const ang = Math.atan2(dir.z, dir.x);

    // Pasamanos superior (1.1 m)
    const top = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, len, 8), gMaterials.safetyYellow);
    top.rotation.z = Math.PI / 2;
    top.rotation.y = -ang;
    top.position.set(mid.x, 1.1, mid.z);
    group.add(top);

    // Barra intermedia (0.55 m)
    const midR = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, len, 8), gMaterials.safetyYellow);
    midR.rotation.z = Math.PI / 2;
    midR.rotation.y = -ang;
    midR.position.set(mid.x, 0.55, mid.z);
    group.add(midR);

    // Rodapié con franjas chevron
    const toe = new THREE.Mesh(new THREE.BoxGeometry(len, 0.14, 0.04), gMaterials.hazardStripes);
    toe.rotation.y = -ang;
    toe.position.set(mid.x, 0.1, mid.z);
    group.add(toe);

    // Postes verticales cada 2 metros
    const numPosts = Math.max(2, Math.floor(len / 2.0));
    for (let i = 0; i <= numPosts; i++) {
      const frac = i / numPosts;
      const px = start.x + (end.x - start.x) * frac;
      const pz = start.z + (end.z - start.z) * frac;
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.1, 8), gMaterials.safetyYellow);
      post.position.set(px, 0.55, pz);
      group.add(post);
    }
  }

  buildRailingSection(upperCatwalkGroup, new THREE.Vector3(-13.4, 0, -11.4), new THREE.Vector3(13.4, 0, -11.4));
  buildRailingSection(upperCatwalkGroup, new THREE.Vector3(-13.4, 0, -11.4), new THREE.Vector3(-13.4, 0, 12.8));
  buildRailingSection(upperCatwalkGroup, new THREE.Vector3(13.4, 0, -11.4), new THREE.Vector3(13.4, 0, 12.8));

  // Ménsulas diagonales de soporte de acero ancladas a las pilastras bajo la pasarela
  [-8.0, 8.0].forEach(bx => {
    const strut = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.8, 0.12), gMaterials.forgedSteel);
    strut.position.set(bx, -0.9, -12.9);
    strut.rotation.x = Math.PI / 4;
    upperCatwalkGroup.add(strut);
  });

  // Estación de seguridad en la pasarela (Ducha lavaojos de emergencia y teléfono industrial)
  const safetyStation = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.85, 0.35), gMaterials.crdmMetal);
  safetyStation.position.set(-13.8, 1.2, 5.0);
  upperCatwalkGroup.add(safetyStation);

  const safetySign = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.35, 0.08), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
  safetySign.position.set(-13.8, 1.8, 5.0);
  upperCatwalkGroup.add(safetySign);

  // B. Pasarela Intermedia de Servicio a cota y = 12.0 m (Pared izquierda y trasera, 1.5 m sobre el agua)
  const midCatwalk = new THREE.Group();
  midCatwalk.position.set(0, 12.0, 0);
  hallRoot.add(midCatwalk);

  const midLeftPlat = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.12, 18.0), gMaterials.catwalkGrating);
  midLeftPlat.position.set(-14.4, 0, -3.0);
  midCatwalk.add(midLeftPlat);
  buildRailingSection(midCatwalk, new THREE.Vector3(-13.4, 0, -11.4), new THREE.Vector3(-13.4, 0, 6.0));

  // C. Escalera Industrial Metálica (Descenso de y = 16.5 m a y = 12.0 m en la pared izquierda)
  const stairGroup = new THREE.Group();
  stairGroup.position.set(-14.2, 12.0, 7.5);
  hallRoot.add(stairGroup);

  const steps = 16;
  const rise = (16.5 - 12.0) / steps;
  const run = 5.2 / steps;
  for (let s = 0; s < steps; s++) {
    const step = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.05, 0.32), gMaterials.catwalkGrating);
    step.position.set(0, s * rise, -s * run);
    stairGroup.add(step);

    // Cantonera antideslizante amarilla en el borde del peldaño
    const nosing = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.03, 0.04), gMaterials.safetyYellow);
    nosing.position.set(0, s * rise + 0.02, -s * run + 0.14);
    stairGroup.add(nosing);
  }
  // Zancas y barandilla inclinada en amarillo
  [-0.72, 0.72].forEach(sx => {
    const stringer = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.18, 7.0), gMaterials.forgedSteel);
    stringer.position.set(sx, 2.25, -2.6);
    stringer.rotation.x = -Math.atan2(16.5 - 12.0, 5.2);
    stairGroup.add(stringer);

    const handrail = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, 7.0, 8), gMaterials.safetyYellow);
    handrail.position.set(sx, 3.25, -2.6);
    handrail.rotation.x = -Math.atan2(16.5 - 12.0, 5.2);
    stairGroup.add(handrail);
  });

  // D. Escalera vertical de gato con jaula quitamiedos (Pared derecha, de y = 10.8 m a y = 16.5 m)
  const cagedLadder = new THREE.Group();
  cagedLadder.position.set(15.2, 10.8, -6.5);
  hallRoot.add(cagedLadder);
  [-0.26, 0.26].forEach(lx => {
    const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 6.2, 8), gMaterials.forgedSteel);
    rail.position.set(lx, 3.1, 0);
    cagedLadder.add(rail);
  });
  for (let y = 0; y < 5.8; y += 0.38) {
    const rung = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.52, 8), gMaterials.forgedSteel);
    rung.rotation.z = Math.PI / 2;
    rung.position.set(0, y, 0);
    cagedLadder.add(rung);
  }
  // Jaula circular de seguridad quitamiedos
  for (let y = 2.0; y <= 6.0; y += 0.8) {
    const hoop = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.018, 8, 16, Math.PI * 1.2), gMaterials.safetyYellow);
    hoop.rotation.x = Math.PI / 2;
    hoop.rotation.z = -Math.PI * 0.1;
    hoop.position.set(0, y, 0.28);
    cagedLadder.add(hoop);
  }

  // =========================================================================
  // 5. ESTRUCTURAS DE SOPORTE SÍSMICO DEL REACTOR (SNUBBERS HIDRÁULICOS A MURO)
  // =========================================================================
  const seismicGroup = new THREE.Group();
  hallRoot.add(seismicGroup);

  // Collarín forjado macizo de amarre en la vasija del reactor a cota y = 13.5 m con cartelas
  const seismicCollar = new THREE.Mesh(
    new THREE.CylinderGeometry(2.48, 2.48, 0.65, 32),
    gMaterials.forgedSteel
  );
  seismicCollar.position.set(0, 13.5, 0);
  seismicGroup.add(seismicCollar);
  registerHallPart(seismicCollar, 'seismic-supports');

  // Cartelas radiales de rigidización (16 gusset plates)
  for (let g = 0; g < 16; g++) {
    const gang = (g / 16) * Math.PI * 2;
    const gusset = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.55, 0.28), gMaterials.forgedSteel);
    gusset.position.set(Math.cos(gang) * 2.45, 13.5, Math.sin(gang) * 2.45);
    gusset.rotation.y = -gang;
    seismicGroup.add(gusset);
  }

  // Pernos perimetrales del collarín
  for (let b = 0; b < 24; b++) {
    const ang = (b / 24) * Math.PI * 2;
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.75, 8), gMaterials.hexNut);
    bolt.position.set(Math.cos(ang) * 2.58, 13.5, Math.sin(ang) * 2.58);
    seismicGroup.add(bolt);
    registerHallPart(bolt, 'seismic-supports');
  }

  // 5 Amortiguadores telescópicos hidráulicos masivos hacia los muros del foso (pares simétricos izq/dcha + trasero)
  const snubberTargets = [
    { wx: -14.8, wy: 13.5, wz: -3.8 },  // Pilastra izquierda trasera
    { wx: -14.8, wy: 13.5, wz: 3.8 },   // Pilastra izquierda delantera
    { wx: 14.8,  wy: 13.5, wz: -3.8 },  // Pilastra derecha trasera
    { wx: 14.8,  wy: 13.5, wz: 3.8 },   // Pilastra derecha delantera (simetría recuperada)
    { wx: 0.0,   wy: 13.5, wz: -12.8 }  // Pilastra trasera central
  ];

  snubberTargets.forEach(tgt => {
    const endPos = new THREE.Vector3(tgt.wx, tgt.wy, tgt.wz);
    const startPos = new THREE.Vector3(tgt.wx, 0, tgt.wz).normalize().multiplyScalar(2.48).setY(13.5);
    const midPos = new THREE.Vector3().addVectors(startPos, endPos).multiplyScalar(0.5);
    const len = startPos.distanceTo(endPos);

    const snubberAssembly = new THREE.Group();
    snubberAssembly.position.copy(midPos);
    snubberAssembly.lookAt(endPos);
    seismicGroup.add(snubberAssembly);

    // Horquilla de empotramiento forjada en el collarín del reactor (z = -len/2)
    const collarLug = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.55, 0.45), gMaterials.forgedSteel);
    collarLug.position.set(0, 0, -len / 2);
    snubberAssembly.add(collarLug);
    registerHallPart(collarLug, 'seismic-supports');

    const pin1 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.52, 12), gMaterials.polishedChrome);
    pin1.position.set(0, 0, -len / 2);
    snubberAssembly.add(pin1);

    // Cilindro hidráulico exterior continuo (desde el collarín z=-len/2 hacia el centro)
    const cylLen = len * 0.60;
    const cyl = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, cylLen, 16), gMaterials.vesselDark);
    cyl.rotation.x = Math.PI / 2;
    cyl.position.z = -len / 2 + cylLen / 2;
    cyl.castShadow = true;
    snubberAssembly.add(cyl);
    registerHallPart(cyl, 'seismic-supports');

    // Émbolo cromado pulido espejo de precisión continuo (desde el centro hasta el anclaje a muro z=+len/2)
    const pisLen = len * 0.55;
    const piston = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, pisLen, 16), gMaterials.polishedChrome);
    piston.rotation.x = Math.PI / 2;
    piston.position.z = len / 2 - pisLen / 2;
    piston.castShadow = true;
    snubberAssembly.add(piston);
    registerHallPart(piston, 'seismic-supports');

    // Depósito acumulador de fluido de silicona y latiguillo flexible sobre el cuerpo
    const accum = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.45, 12), gMaterials.forgedSteel);
    accum.position.set(0.22, 0.18, -len * 0.20);
    snubberAssembly.add(accum);

    // Horquilla de articulación y pasador en el anclaje a muro (z = +len/2)
    const wallLug = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.55, 0.45), gMaterials.forgedSteel);
    wallLug.position.set(0, 0, len / 2);
    snubberAssembly.add(wallLug);
    registerHallPart(wallLug, 'seismic-supports');

    const pin2 = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.58, 12), gMaterials.polishedChrome);
    pin2.position.set(0, 0, len / 2);
    snubberAssembly.add(pin2);

    // Placa base de anclaje sísmico en el hormigón con 8 pernos M48
    const basePlate = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.95, 0.14), gMaterials.steelPlate);
    basePlate.position.copy(endPos);
    if (Math.abs(tgt.wx) > 10) basePlate.rotation.y = Math.PI / 2;
    seismicGroup.add(basePlate);
    registerHallPart(basePlate, 'seismic-supports');
  });

  // Placa técnica de especificación de amortiguador sísmico en el muro
  const signSeismicMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.6, 0.9),
    new THREE.MeshBasicMaterial({ map: gTextures.signSeismic, transparent: true })
  );
  signSeismicMesh.position.set(-6.5, 15.5, -12.9);
  seismicGroup.add(signSeismicMesh);

  // Llaves de cizalladura sísmica radiales en la bancada del fondo (Radial Seismic Keys)
  [0, Math.PI / 2, Math.PI, Math.PI * 1.5].forEach(kAng => {
    const keyBlock = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.65, 0.55), gMaterials.forgedSteel);
    keyBlock.position.set(Math.cos(kAng) * 2.85, 0.35, Math.sin(kAng) * 2.85);
    keyBlock.rotation.y = -kAng;
    seismicGroup.add(keyBlock);
    registerHallPart(keyBlock, 'seismic-supports');
  });

  // =========================================================================
  // 6. LÍNEAS PRINCIPALES DE VAPOR DE ALTA PRESIÓN Y PÓRTICOS DE SOPORTE ESTRUCTURAL
  // Tuberías continuas DN450 sin elementos flotantes, pórticos de acero, perchas y anclajes
  // =========================================================================
  const steamGroup = new THREE.Group();
  hallRoot.add(steamGroup);

  // Dos líneas principales de vapor continuas (Línea A y Línea B) que penetran en el muro hacia la Isla de Turbinas (BOP)
  const steamPipeRuns = [
    { id: 'A', startX: 2.35, y: 15.2, startZ: 0.0, elbow1X: 6.4, runZ: -2.2, endX: 17.5, hxZ: -2.2 },
    { id: 'B', startX: 2.35, y: 15.2, startZ: 1.2, elbow1X: 6.4, runZ: 3.8,  endX: 17.5, hxZ: 3.8 }
  ];

  steamPipeRuns.forEach((sp, idx) => {
    // -----------------------------------------------------------------------
    // TRAMO 1: Salida radial de la tobera del reactor a lo largo del eje X
    // -----------------------------------------------------------------------
    const seg1Len = Math.abs(sp.elbow1X - sp.startX);
    const seg1 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, seg1Len, 20), gMaterials.pipeSteamInsulated);
    seg1.rotation.z = Math.PI / 2;
    seg1.position.set(sp.startX + seg1Len / 2, sp.y, sp.startZ);
    seg1.castShadow = true;
    steamGroup.add(seg1);
    registerHallPart(seg1, 'steam-lines');

    // Junta de dilatación / fuelle metálico corrugado de Inconel (absorbe expansión térmica del reactor)
    const bellows = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.45, 16), gMaterials.inconelTubes);
    bellows.rotation.z = Math.PI / 2;
    bellows.position.set(sp.startX + 1.2, sp.y, sp.startZ);
    steamGroup.add(bellows);
    for (let r = -0.15; r <= 0.15; r += 0.08) {
      const bRing = new THREE.Mesh(new THREE.TorusGeometry(0.29, 0.022, 8, 16), gMaterials.forgedSteel);
      bRing.rotation.y = Math.PI / 2;
      bRing.position.set(sp.startX + 1.2 + r, sp.y, sp.startZ);
      steamGroup.add(bRing);
    }

    // Par de bridas de unión ANSI Clase 1500 con anillo de junta espirometálica visible
    [sp.startX + 2.2, sp.startX + 2.38].forEach(fx => {
      const flg = new THREE.Mesh(new THREE.CylinderGeometry(0.40, 0.40, 0.08, 20), gMaterials.forgedSteel);
      flg.rotation.z = Math.PI / 2;
      flg.position.set(fx, sp.y, sp.startZ);
      steamGroup.add(flg);
      registerHallPart(flg, 'steam-lines');
    });
    const gasket1 = new THREE.Mesh(new THREE.CylinderGeometry(0.41, 0.41, 0.02, 16), gMaterials.valveYellow);
    gasket1.rotation.z = Math.PI / 2;
    gasket1.position.set(sp.startX + 2.29, sp.y, sp.startZ);
    steamGroup.add(gasket1);

    // -----------------------------------------------------------------------
    // CODO 1: Curva forjada continua a 90° girando de +X a Z
    // -----------------------------------------------------------------------
    const elbow1 = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.24, 14, 20, Math.PI / 2), gMaterials.pipeSteamInsulated);
    elbow1.position.set(sp.elbow1X, sp.y, sp.startZ);
    elbow1.rotation.x = Math.PI / 2;
    if (sp.runZ < sp.startZ) {
      elbow1.rotation.z = -Math.PI / 2; // Giro hacia -Z
    } else {
      elbow1.rotation.z = Math.PI;      // Giro hacia +Z
    }
    steamGroup.add(elbow1);
    registerHallPart(elbow1, 'steam-lines');

    // -----------------------------------------------------------------------
    // TRAMO 2: Tubería longitudinal continua a lo largo del eje Z
    // -----------------------------------------------------------------------
    const zSpan = Math.abs(sp.runZ - sp.startZ);
    const zDir = Math.sign(sp.runZ - sp.startZ);
    const seg2 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, zSpan, 20), gMaterials.pipeSteamInsulated);
    seg2.position.set(sp.elbow1X, sp.y, sp.startZ + (zSpan / 2) * zDir);
    seg2.castShadow = true;
    steamGroup.add(seg2);
    registerHallPart(seg2, 'steam-lines');

    // -----------------------------------------------------------------------
    // CODO 2: Curva forjada continua a 90° girando de Z a +X
    // -----------------------------------------------------------------------
    const elbow2 = new THREE.Mesh(new THREE.TorusGeometry(0.55, 0.24, 14, 20, Math.PI / 2), gMaterials.pipeSteamInsulated);
    elbow2.position.set(sp.elbow1X, sp.y, sp.runZ);
    elbow2.rotation.x = Math.PI / 2;
    if (sp.runZ < sp.startZ) {
      elbow2.rotation.z = 0;           // Vuelve a apuntar hacia +X
    } else {
      elbow2.rotation.z = Math.PI / 2; // Vuelve a apuntar hacia +X
    }
    steamGroup.add(elbow2);
    registerHallPart(elbow2, 'steam-lines');

    // -----------------------------------------------------------------------
    // TRAMO 3: Tubería horizontal continua que penetra en el muro hacia la Isla de Turbinas
    // -----------------------------------------------------------------------
    const seg3Len = Math.abs(sp.endX - sp.elbow1X);
    const seg3 = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, seg3Len, 20), gMaterials.pipeSteamInsulated);
    seg3.rotation.z = Math.PI / 2;
    seg3.position.set(sp.elbow1X + seg3Len / 2, sp.y, sp.runZ);
    seg3.castShadow = true;
    steamGroup.add(seg3);
    registerHallPart(seg3, 'steam-lines');

    // Válvula de aislamiento rápido de vapor MSIV
    const msivGroup = new THREE.Group();
    msivGroup.position.set(7.5, sp.y, sp.runZ);
    steamGroup.add(msivGroup);

    // Cuerpo esférico y cilíndrico forjado en acero PBR
    const msivBody = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.40, 0.74, 20), gMaterials.forgedSteel);
    msivBody.rotation.z = Math.PI / 2;
    msivGroup.add(msivBody);
    registerHallPart(msivBody, 'steam-lines');

    // Bridas de conexión del cuerpo de válvula
    [-0.37, 0.37].forEach(fx => {
      const vFlg = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.10, 20), gMaterials.forgedSteel);
      vFlg.rotation.z = Math.PI / 2;
      vFlg.position.set(fx, 0, 0);
      msivGroup.add(vFlg);
      registerHallPart(vFlg, 'steam-lines');
    });

    // Yugo y prensaestopas
    const vYoke = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.45, 12), gMaterials.forgedSteel);
    vYoke.position.set(0, 0.48, 0);
    msivGroup.add(vYoke);

    const vStem = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.55, 10), gMaterials.polishedChrome);
    vStem.position.set(0, 0.72, 0);
    msivGroup.add(vStem);

    // Volante manual rojo de seguridad
    const handwheel = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.048, 8, 16), gMaterials.valveRed);
    handwheel.position.set(0, 0.98, 0);
    handwheel.rotation.x = Math.PI / 2;
    msivGroup.add(handwheel);
    registerHallPart(handwheel, 'steam-lines');

    // Actuador neumático rápido superior de disparo de emergencia
    const msivActuator = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.26, 0.42, 16), gMaterials.safetyYellow);
    msivActuator.position.set(0, 1.25, 0);
    msivGroup.add(msivActuator);

    // =======================================================================
    // TEE DE DERIVACIÓN Y BAJANTE VERTICAL EXACTAMENTE ALINEADA CON EL TANQUE DHRS
    // Coordenadas: X = 8.8 m, Z = sp.runZ (-2.2 m para línea A, +3.8 m para línea B)
    // Entra perpendicularmente por el centro de la cúpula superior del tanque a y = 12.03 m
    // =======================================================================
    const teeX = 8.8;
    const teeFitting = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 12), gMaterials.forgedSteel);
    teeFitting.position.set(teeX, sp.y, sp.runZ);
    steamGroup.add(teeFitting);
    registerHallPart(teeFitting, 'steam-lines');

    // Bajante vertical continua DN250 desde la línea de vapor (y = 15.2 m) hasta el centro de la cúpula superior (y = 12.03 m)
    const domeZenithY = 12.03;
    const dropPipeLen = Math.abs(sp.y - domeZenithY); // 3.17 m
    const dropPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, dropPipeLen, 16), gMaterials.pipeSteamInsulated);
    dropPipe.position.set(teeX, sp.y - dropPipeLen / 2, sp.runZ);
    dropPipe.castShadow = true;
    steamGroup.add(dropPipe);
    registerHallPart(dropPipe, 'steam-lines');

    // VÁLVULA SUPERIOR: Válvula de control con volante amarillo a y = 13.8 m sobre el eje del tanque (8.8, Z)
    const vlvYellowBody = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.38, 16), gMaterials.forgedSteel);
    vlvYellowBody.position.set(teeX, 13.8, sp.runZ);
    steamGroup.add(vlvYellowBody);
    registerHallPart(vlvYellowBody, 'steam-lines');

    [-0.19, 0.19].forEach(fy => {
      const vFlg = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.08, 16), gMaterials.forgedSteel);
      vFlg.position.set(teeX, 13.8 + fy, sp.runZ);
      steamGroup.add(vFlg);
      registerHallPart(vFlg, 'steam-lines');
    });

    const vlvYellowWheel = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.035, 8, 16), gMaterials.valveYellow);
    vlvYellowWheel.position.set(teeX, 13.8, sp.runZ + 0.30);
    steamGroup.add(vlvYellowWheel);
    registerHallPart(vlvYellowWheel, 'steam-lines');

    // VÁLVULA INFERIOR: Válvula de aislamiento rápido con volante rojo a y = 12.9 m sobre el eje del tanque (8.8, Z)
    const vlvRedBody = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.28, 0.38, 16), gMaterials.forgedSteel);
    vlvRedBody.position.set(teeX, 12.9, sp.runZ);
    steamGroup.add(vlvRedBody);
    registerHallPart(vlvRedBody, 'steam-lines');

    [-0.19, 0.19].forEach(fy => {
      const vFlg = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.08, 16), gMaterials.forgedSteel);
      vFlg.position.set(teeX, 12.9 + fy, sp.runZ);
      steamGroup.add(vFlg);
      registerHallPart(vFlg, 'steam-lines');
    });

    const vlvRedWheel = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.035, 8, 16), gMaterials.valveRed);
    vlvRedWheel.position.set(teeX, 12.9, sp.runZ - 0.30);
    steamGroup.add(vlvRedWheel);
    registerHallPart(vlvRedWheel, 'steam-lines');

    // Brida de conexión en el cenit de la cúpula superior del intercambiador a y = 12.05 m
    const domeInFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.10, 20), gMaterials.forgedSteel);
    domeInFlange.position.set(teeX, 12.05, sp.runZ);
    steamGroup.add(domeInFlange);
    registerHallPart(domeInFlange, 'steam-lines');

    // Instrumentación de paso en la línea: Manómetro Bourdon con tubo sifón pigtail
    const instX = 11.8;
    const siphonTorus = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.016, 8, 16), gMaterials.polishedChrome);
    siphonTorus.rotation.y = Math.PI / 2;
    siphonTorus.position.set(instX, sp.y + 0.32, sp.runZ);
    steamGroup.add(siphonTorus);

    const pipeGauge = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.06, 20), gMaterials.forgedSteel);
    pipeGauge.rotation.x = Math.PI / 2;
    pipeGauge.position.set(instX, sp.y + 0.52, sp.runZ);
    steamGroup.add(pipeGauge);

    const pipeGaugeFace = new THREE.Mesh(new THREE.PlaneGeometry(0.32, 0.32), new THREE.MeshBasicMaterial({ map: gTextures.gaugeFace, transparent: true }));
    pipeGaugeFace.position.set(instX, sp.y + 0.52, sp.runZ + 0.035);
    steamGroup.add(pipeGaugeFace);

    // Manguito pasamuros de penetración sellada atravesando el muro de hormigón a x = 15.7 m
    const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 2.0, 24), gMaterials.forgedSteel);
    sleeve.rotation.z = Math.PI / 2;
    sleeve.position.set(15.7, sp.y, sp.runZ);
    steamGroup.add(sleeve);
    registerHallPart(sleeve, 'steam-lines');

    // Brida pasamuros de sellado empotrada en el liner a x = 14.95 m
    const sleeveFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.64, 0.16, 24), gMaterials.forgedSteel);
    sleeveFlange.rotation.z = Math.PI / 2;
    sleeveFlange.position.set(14.95, sp.y, sp.runZ);
    steamGroup.add(sleeveFlange);
    registerHallPart(sleeveFlange, 'steam-lines');
  });

  // -------------------------------------------------------------------------
  // PERCHAS Y TIRANTES COLGANTES DESDE EL TECHO (SPRING PIPE HANGERS ASME)
  // Sustituyen cualquier poste flotante en el agua sosteniendo las tuberías limpiamente desde arriba
  // -------------------------------------------------------------------------
  const hangerPositions = [
    { x: 4.5,  yTop: 21.8, yBtm: 15.45, z: 0.0 },
    { x: 4.5,  yTop: 21.8, yBtm: 15.45, z: 1.2 },
    { x: 6.4,  yTop: 21.8, yBtm: 15.45, z: -2.2 },
    { x: 6.4,  yTop: 21.8, yBtm: 15.45, z: 3.8 },
    { x: 8.8,  yTop: 21.8, yBtm: 15.45, z: -2.2 },
    { x: 8.8,  yTop: 21.8, yBtm: 15.45, z: 3.8 },
    { x: 11.5, yTop: 21.8, yBtm: 15.45, z: -2.2 },
    { x: 11.5, yTop: 21.8, yBtm: 15.45, z: 3.8 }
  ];

  hangerPositions.forEach(hp => {
    const hLen = Math.abs(hp.yTop - hp.yBtm);
    const hRod = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, hLen, 8), gMaterials.forgedSteel);
    hRod.position.set(hp.x, hp.yBtm + hLen / 2, hp.z);
    steamGroup.add(hRod);

    // Bote cilíndrico de muelle de compensación de dilatación (Spring Canister)
    const sCan = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.55, 12), gMaterials.vesselDark);
    sCan.position.set(hp.x, hp.yBtm + 1.2, hp.z);
    steamGroup.add(sCan);

    // Abrazadera de suspensión en la tubería
    const hClamp = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.028, 8, 16), gMaterials.forgedSteel);
    hClamp.position.set(hp.x, 15.2, hp.z);
    hClamp.rotation.y = Math.PI / 2;
    steamGroup.add(hClamp);
  });

  // -------------------------------------------------------------------------
  // MÉNSULAS EN VOLADIZO DE ANCLAJE A MURO DERECHO (WALL CANTILEVER BRACKETS) A x = 14.0 m
  // -------------------------------------------------------------------------
  [-2.2, 3.8].forEach(wz => {
    // Brazo horizontal en voladizo desde el muro a x = 14.8
    const bArm = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 0.22), gMaterials.forgedSteel);
    bArm.position.set(14.0, 14.92, wz);
    steamGroup.add(bArm);

    // Puntal diagonal de apoyo contra el muro
    const bStrut = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.12, 0.12), gMaterials.forgedSteel);
    bStrut.position.set(14.2, 14.3, wz);
    bStrut.rotation.z = -Math.PI / 4;
    steamGroup.add(bStrut);

    // Placa mural con 4 pernos de anclaje químico
    const mPlate = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.95, 0.55), gMaterials.steelPlate);
    mPlate.position.set(14.78, 14.6, wz);
    steamGroup.add(mPlate);
  });

  // =========================================================================
  // 7. INTERCAMBIADORES DE CALOR DE EMERGENCIA DE PISCINA (UHS PASSIVE COOLERS)
  // Ubicados íntegramente dentro de la losa de la piscina (x = 8.8 m) con apoyo directo a suelo
  // =========================================================================
  const hxGroup = new THREE.Group();
  hallRoot.add(hxGroup);

  // Dos módulos verticales situados dentro de la piscina y sumergidos en el agua
  [ { x: 8.8, z: -2.2 }, { x: 8.8, z: 3.8 } ].forEach(hp => {
    // Casco cilíndrico del intercambiador (y = 5.0 a 11.5 m -> sumergido en agua cristalina!)
    const hxShell = new THREE.Mesh(new THREE.CylinderGeometry(0.68, 0.68, 6.2, 24), gMaterials.pipeSteamInsulated);
    hxShell.position.set(hp.x, 8.25, hp.z);
    hxShell.castShadow = true;
    hxGroup.add(hxShell);
    registerHallPart(hxShell, 'heat-exchangers');

    // Haces tubulares sumergidos (Inconel tube bundle matrix) visibles con total nitidez bajo el agua
    for (let t = 0; t < 8; t++) {
      const tang = (t / 8) * Math.PI * 2;
      const tPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 4.8, 8), gMaterials.inconelTubes);
      tPipe.position.set(hp.x + Math.cos(tang) * 0.48, 7.5, hp.z + Math.sin(tang) * 0.48);
      hxGroup.add(tPipe);
    }

    // Cabezal superior semiesférico
    const topDome = new THREE.Mesh(new THREE.SphereGeometry(0.68, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), gMaterials.forgedSteel);
    topDome.position.set(hp.x, 11.35, hp.z);
    hxGroup.add(topDome);
    registerHallPart(topDome, 'heat-exchangers');

    // Cabezal inferior sumergido
    const btmDome = new THREE.Mesh(new THREE.SphereGeometry(0.68, 20, 12, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), gMaterials.forgedSteel);
    btmDome.position.set(hp.x, 5.15, hp.z);
    hxGroup.add(btmDome);
    registerHallPart(btmDome, 'heat-exchangers');

    // Columna vertical estructural HEB hasta el suelo de la piscina (y = 0.0 a 5.15 m)
    const hxColH = 5.15;
    const hxCol = new THREE.Mesh(new THREE.BoxGeometry(0.52, hxColH, 0.52), gMaterials.forgedSteel);
    hxCol.position.set(hp.x, hxColH / 2, hp.z);
    hxCol.castShadow = true;
    hxGroup.add(hxCol);
    registerHallPart(hxCol, 'heat-exchangers');

    // Placa base de cimentación y pernos en el suelo de la piscina
    const hxBasePlate = new THREE.Mesh(new THREE.BoxGeometry(1.10, 0.16, 1.10), gMaterials.steelPlate);
    hxBasePlate.position.set(hp.x, 0.08, hp.z);
    hxGroup.add(hxBasePlate);
    registerHallPart(hxBasePlate, 'heat-exchangers');

    [[-0.42, -0.42], [0.42, -0.42], [-0.42, 0.42], [0.42, 0.42]].forEach(([bx, bz]) => {
      const bBolt = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.24, 6), gMaterials.hexNut);
      bBolt.position.set(hp.x + bx, 0.18, hp.z + bz);
      hxGroup.add(bBolt);
    });

    // Asiento forjado / cuna de apoyo de la cúpula inferior a y = 5.15 m
    const hxSaddle = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.54, 0.35, 24), gMaterials.forgedSteel);
    hxSaddle.position.set(hp.x, 5.0, hp.z);
    hxGroup.add(hxSaddle);
    registerHallPart(hxSaddle, 'heat-exchangers');

    // Tobera y brida de conexión superior conectada directamente con la bajante de vapor en el cenit
    const inFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.12, 20), gMaterials.forgedSteel);
    inFlange.position.set(hp.x, 12.05, hp.z);
    hxGroup.add(inFlange);
    registerHallPart(inFlange, 'heat-exchangers');

    // Viga ménsula de sustentación masiva que se empotra firmemente en el muro lateral derecho de hormigón (x = 16.3 m)
    const bracketEnd = 16.3;
    const bracketLen = bracketEnd - hp.x; // 7.5 m de longitud continua empotrada en el muro
    const supportBracket = new THREE.Mesh(new THREE.BoxGeometry(bracketLen, 0.50, 0.70), gMaterials.forgedSteel);
    supportBracket.position.set(hp.x + bracketLen / 2, 8.0, hp.z);
    hxGroup.add(supportBracket);
    registerHallPart(supportBracket, 'heat-exchangers');

    // Placa mural de empotramiento en el muro de hormigón a nivel del liner
    const hxWallPlate = new THREE.Mesh(new THREE.BoxGeometry(0.18, 1.3, 1.05), gMaterials.steelPlate);
    hxWallPlate.position.set(14.95, 8.0, hp.z);
    hxGroup.add(hxWallPlate);
    registerHallPart(hxWallPlate, 'heat-exchangers');
  });

  // =========================================================================
  // 8. RED DE TUBERÍAS AUXILIARES, SOPORTES A MURO Y ANDAMIAJE DE MANTENIMIENTO
  // =========================================================================
  const pipingGroup = new THREE.Group();
  hallRoot.add(pipingGroup);

  // Colector horizontal de agua de alimentación en pared trasera a y = 11.2 m (atraviesa ambos muros laterales)
  const feedPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 33.0, 20), gMaterials.riserSteel);
  feedPipe.rotation.z = Math.PI / 2;
  feedPipe.position.set(0, 11.2, -12.4);
  pipingGroup.add(feedPipe);
  registerHallPart(feedPipe, 'piping');

  [-14.95, 14.95].forEach(mx => {
    const fFlg = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.12, 16), gMaterials.forgedSteel);
    fFlg.rotation.z = Math.PI / 2;
    fFlg.position.set(mx, 11.2, -12.4);
    pipingGroup.add(fFlg);
    registerHallPart(fFlg, 'piping');
  });

  // Soportes de pared de acero (Wall Standoff Brackets) asegurando el colector trasero cada 3.5 m
  for (let wx = -10.5; wx <= 10.5; wx += 3.5) {
    const wBracket = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.16, 0.8), gMaterials.forgedSteel);
    wBracket.position.set(wx, 11.2, -12.9);
    pipingGroup.add(wBracket);

    const wClamp = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.024, 8, 16), gMaterials.safetyYellow);
    wClamp.rotation.y = Math.PI / 2;
    wClamp.position.set(wx, 11.2, -12.4);
    pipingGroup.add(wClamp);
  }

  // Tubería de purificación y recirculación de piscina a y = 3.5 m (SUMERGIDA - Atraviesa ambos muros)
  const subPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 33.0, 20), gMaterials.claddingStainless);
  subPipe.rotation.z = Math.PI / 2;
  subPipe.position.set(0, 3.5, -12.4);
  pipingGroup.add(subPipe);
  registerHallPart(subPipe, 'piping');

  [-14.95, 14.95].forEach(mx => {
    const sFlg = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.12, 16), gMaterials.forgedSteel);
    sFlg.rotation.z = Math.PI / 2;
    sFlg.position.set(mx, 3.5, -12.4);
    pipingGroup.add(sFlg);
    registerHallPart(sFlg, 'piping');

    const sSlv = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.6, 16), gMaterials.forgedSteel);
    sSlv.rotation.z = Math.PI / 2;
    sSlv.position.set(mx < 0 ? -15.7 : 15.7, 3.5, -12.4);
    pipingGroup.add(sSlv);
    registerHallPart(sSlv, 'piping');
  });

  // Colector sumergido inferior de rociado de emergencia (Sparger Header) a y = 7.0 m
  const spargerPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 26.0, 16), gMaterials.claddingStainless);
  spargerPipe.rotation.z = Math.PI / 2;
  spargerPipe.position.set(0, 7.0, -12.4);
  pipingGroup.add(spargerPipe);
  registerHallPart(spargerPipe, 'piping');

  // Boquillas de descarga subacuáticas (Spargers) cada 3.5 metros
  for (let sx = -10; sx <= 10; sx += 3.5) {
    const spargerNozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.45, 8), gMaterials.forgedSteel);
    spargerNozzle.rotation.x = Math.PI / 2;
    spargerNozzle.position.set(sx, 7.0, -12.1);
    pipingGroup.add(spargerNozzle);
  }

  // Bajantes verticales murales en extremos
  [-10.5, 10.5].forEach(px => {
    const downPipe = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 7.7, 16), gMaterials.forgedSteel);
    downPipe.position.set(px, 7.35, -12.2);
    pipingGroup.add(downPipe);
    registerHallPart(downPipe, 'piping');

    // Válvulas manuales de seccionamiento con volantes alternados
    const vBody = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.38), gMaterials.crdmMetal);
    vBody.position.set(px, 11.8, -12.0);
    pipingGroup.add(vBody);
    registerHallPart(vBody, 'piping');

    const vWheel = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.035, 8, 16), px < 0 ? gMaterials.valveRed : gMaterials.valveYellow);
    vWheel.position.set(px, 11.8, -11.75);
    pipingGroup.add(vWheel);
    registerHallPart(vWheel, 'piping');
  });

  // =========================================================================
  // TUBERÍA EN 'L' SUMERGIDA A LA IZQUIERDA (CERRADO DE CIRCUITO DE PURIFICACIÓN)
  // Baja al agua por x = -10.5, hace codo de 90° hacia la izquierda a y = 3.5 m y
  // atraviesa el muro izquierdo de la piscina (x = -15.7 m) con su brida pasamuros
  // =========================================================================
  const lElbow = new THREE.Mesh(new THREE.TorusGeometry(0.35, 0.16, 14, 20, Math.PI / 2), gMaterials.forgedSteel);
  lElbow.position.set(-10.5, 3.5, -12.2);
  lElbow.rotation.z = Math.PI / 2; // Gira de vertical -Y a horizontal -X
  pipingGroup.add(lElbow);
  registerHallPart(lElbow, 'piping');

  const lHorizLen = 16.8 - 10.5; // 6.3 m continuo hasta penetrar el muro
  const lHoriz = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, lHorizLen, 20), gMaterials.forgedSteel);
  lHoriz.rotation.z = Math.PI / 2;
  lHoriz.position.set(-10.5 - lHorizLen / 2, 3.5, -12.2);
  lHoriz.castShadow = true;
  pipingGroup.add(lHoriz);
  registerHallPart(lHoriz, 'piping');

  // Brida pasamuros de penetración en el liner a x = -14.95 m
  const lFlange = new THREE.Mesh(new THREE.CylinderGeometry(0.44, 0.44, 0.14, 20), gMaterials.forgedSteel);
  lFlange.rotation.z = Math.PI / 2;
  lFlange.position.set(-14.95, 3.5, -12.2);
  pipingGroup.add(lFlange);
  registerHallPart(lFlange, 'piping');

  // Manguito pasamuros sellado empotrado en el muro de hormigón a x = -15.7 m
  const lSleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 1.6, 20), gMaterials.forgedSteel);
  lSleeve.rotation.z = Math.PI / 2;
  lSleeve.position.set(-15.7, 3.5, -12.2);
  pipingGroup.add(lSleeve);
  registerHallPart(lSleeve, 'piping');

  // Grupo motobomba de recirculación sobre bancada de hormigón en la plataforma a y = 12.0 m
  const pumpBed = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.35, 1.4), gMaterials.concrete);
  pumpBed.position.set(-13.8, 12.18, -2.5);
  pipingGroup.add(pumpBed);

  const pumpMotor = new THREE.Mesh(new THREE.CylinderGeometry(0.38, 0.38, 1.2, 16), gMaterials.pumpMotor);
  pumpMotor.rotation.z = Math.PI / 2;
  pumpMotor.position.set(-13.8, 12.75, -2.5);
  pipingGroup.add(pumpMotor);
  registerHallPart(pumpMotor, 'piping');

  const pumpImpeller = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.48, 0.45, 16), gMaterials.forgedSteel);
  pumpImpeller.rotation.x = Math.PI / 2;
  pumpImpeller.position.set(-13.0, 12.75, -2.5);
  pipingGroup.add(pumpImpeller);
  registerHallPart(pumpImpeller, 'piping');

  // -------------------------------------------------------------------------
  // ANDAMIAJE TUBULAR DE MANTENIMIENTO INDUSTRIAL (MODULAR TUBE SCAFFOLDING)
  // Riqueza visual en la pared izquierda y trasera con plataformas transitables
  // -------------------------------------------------------------------------
  const scaffGroup = new THREE.Group();
  scaffGroup.position.set(-10.5, 10.8, -12.2);
  hallRoot.add(scaffGroup);

  // 4 Postes verticales tubulares de aluminio (Standards)
  const scW = 2.8, scD = 1.2, scH = 5.6;
  [[-scW/2, -scD/2], [scW/2, -scD/2], [-scW/2, scD/2], [scW/2, scD/2]].forEach(([sx, sz]) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.024, 0.024, scH, 8), gMaterials.forgedSteel);
    post.position.set(sx, scH / 2, sz);
    scaffGroup.add(post);

    const bPlate = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.03, 0.16), gMaterials.steelPlate);
    bPlate.position.set(sx, 0.015, sz);
    scaffGroup.add(bPlate);
  });

  // Largueros y travesaños horizontales (Ledgers & Transoms) en dos niveles
  [2.2, 4.4].forEach(ly => {
    // Plataforma de rejilla transitable
    const deck = new THREE.Mesh(new THREE.BoxGeometry(scW + 0.3, 0.06, scD + 0.2), gMaterials.catwalkGrating);
    deck.position.set(0, ly, 0);
    scaffGroup.add(deck);

    // Rodapié de madera/amarillo
    const toeboard = new THREE.Mesh(new THREE.BoxGeometry(scW + 0.3, 0.14, scD + 0.22), gMaterials.safetyYellow);
    toeboard.position.set(0, ly + 0.09, 0);
    scaffGroup.add(toeboard);

    // Barandillas tubulares
    [-scD/2, scD/2].forEach(rz => {
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, scW, 8), gMaterials.safetyYellow);
      rail.rotation.z = Math.PI / 2;
      rail.position.set(0, ly + 0.95, rz);
      scaffGroup.add(rail);
    });
  });

  // Diagonales de arriostramiento en cruz (Cross Braces)
  const diagLen = Math.sqrt(scW * scW + 2.2 * 2.2);
  const diag1 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, diagLen, 8), gMaterials.forgedSteel);
  diag1.position.set(0, 1.1, scD / 2);
  diag1.rotation.z = Math.atan2(2.2, scW);
  scaffGroup.add(diag1);

  const diag2 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, diagLen, 8), gMaterials.forgedSteel);
  diag2.position.set(0, 1.1, scD / 2);
  diag2.rotation.z = -Math.atan2(2.2, scW);
  scaffGroup.add(diag2);

  // =========================================================================
  // 9. BANDEJAS PORTACABLES (3 NIVELES), CONDUCTOS EMT, CAJAS EX-D, MANÓMETROS Y CARTELES
  // =========================================================================
  const equipGroup = new THREE.Group();
  hallRoot.add(equipGroup);

  // Bandejas metálicas portacables en 3 alturas (14.2 m, 16.0 m, 17.8 m)
  [14.2, 16.0, 17.8].forEach((ty, idx) => {
    // Bandeja trasera
    const trayBack = new THREE.Mesh(new THREE.BoxGeometry(29.0, 0.08, 0.38), gMaterials.steelPlate);
    trayBack.position.set(0, ty, -13.0);
    equipGroup.add(trayBack);

    // Mazos de cables clasificados por código de color
    const cableMat = (idx === 0) ? gMaterials.cableBlack : (idx === 1 ? gMaterials.cableOrange : gMaterials.cableBlack);
    const cableBundle = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 29.0, 8), cableMat);
    cableBundle.rotation.z = Math.PI / 2;
    cableBundle.position.set(0, ty + 0.08, -13.0);
    equipGroup.add(cableBundle);

    // Bandeja derecha
    const trayRight = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.08, 25.0), gMaterials.steelPlate);
    trayRight.position.set(15.0, ty, 0);
    equipGroup.add(trayRight);

    const cableRight = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 25.0, 8), cableMat);
    cableRight.position.set(15.0, ty + 0.08, 0);
    equipGroup.add(cableRight);
  });

  // Bajantes de tubos de conducto eléctrico rígido EMT galvanizado (Conduit runs)
  [-14.9, 14.9].forEach(cx => {
    for (let c = 0; c < 3; c++) {
      const conduit = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 6.0, 8), gMaterials.forgedSteel);
      conduit.position.set(cx, 15.0, -4.0 + c * 0.35);
      equipGroup.add(conduit);
    }
  });

  // Cajas de conexiones eléctricas murales Ex-d / NEMA 4X
  [ { x: -14.9, y: 13.5, z: -6.0 }, { x: 14.9, y: 13.5, z: 8.0 }, { x: 5.5, y: 14.5, z: -13.0 } ].forEach(jb => {
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.65, 0.32), gMaterials.vesselDark);
    box.position.set(jb.x, jb.y, jb.z);
    equipGroup.add(box);

    const indicator = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
    indicator.position.set(jb.x, jb.y + 0.22, jb.z + 0.17);
    equipGroup.add(indicator);
  });

  // Racks de transmisores de presión con tubos capilares impulse lines conectados a toberas
  const transmitterRack = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1.2, 0.25), gMaterials.forgedSteel);
  transmitterRack.position.set(14.88, 14.8, 2.0);
  equipGroup.add(transmitterRack);

  // Tubos capilares de acero inoxidable SS316 (12mm) que van desde el transmisor hacia el colector
  const impulseTube = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 3.2, 8), gMaterials.polishedChrome);
  impulseTube.rotation.z = Math.PI / 4;
  impulseTube.position.set(13.2, 15.2, 1.5);
  equipGroup.add(impulseTube);

  // Manómetros analógicos de precisión (0-200 BAR) con carátula impresa de alta resolución
  [ { x: 7.5, y: 15.9, z: -3.8 }, { x: 11.2, y: 15.9, z: -3.8 } ].forEach(mp => {
    const gaugeStem = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.35, 8), gMaterials.forgedSteel);
    gaugeStem.position.set(mp.x, mp.y - 0.15, mp.z);
    equipGroup.add(gaugeStem);

    const gaugeDial = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.08, 24),
      new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.85, roughness: 0.18 })
    );
    gaugeDial.rotation.x = Math.PI / 2;
    gaugeDial.position.set(mp.x, mp.y, mp.z);
    equipGroup.add(gaugeDial);

    // Carátula impresa del manómetro
    const gaugeFace = new THREE.Mesh(
      new THREE.PlaneGeometry(0.38, 0.38),
      new THREE.MeshBasicMaterial({ map: gTextures.gaugeFace, transparent: true })
    );
    gaugeFace.position.set(mp.x, mp.y, mp.z + 0.045);
    equipGroup.add(gaugeFace);
  });

  // Conductos de ventilación HVAC rectangulares de chapa galvanizada bajo el techo
  const duct = new THREE.Mesh(new THREE.BoxGeometry(29.0, 0.75, 1.2), gMaterials.claddingStainless);
  duct.position.set(0, 21.8, -12.4);
  equipGroup.add(duct);

  // Cartel de Peligro Radiológico en la pared trasera
  const signRad = new THREE.Mesh(
    new THREE.PlaneGeometry(2.4, 1.2),
    new THREE.MeshBasicMaterial({ map: gTextures.signRadiation })
  );
  signRad.position.set(-5.5, 15.2, -12.9);
  equipGroup.add(signRad);

  // Cartel de Especificación Técnica UHS en la pared derecha
  const signUhs = new THREE.Mesh(
    new THREE.PlaneGeometry(2.8, 1.4),
    new THREE.MeshBasicMaterial({ map: gTextures.signUHS })
  );
  signUhs.rotation.y = -Math.PI / 2;
  signUhs.position.set(14.9, 15.2, -2.0);
  equipGroup.add(signUhs);
}

// ==========================================================================
// 9. BALANCE DE PLANTA Y TURBINAS (BOP)
// ==========================================================================
function buildPlantBalanceBOP(scene) {
  const bopRoot = new THREE.Group();
  scene.add(bopRoot);
  gSceneRoots.smrPlantBOP = bopRoot;

  function registerBopPart(mesh, compId) {
    mesh.userData = { isComponent: true, componentId: compId };
    gInteractiveMeshes.push(mesh);
    if (!gComponentMeshMap[compId]) gComponentMeshMap[compId] = [];
    gComponentMeshMap[compId].push(mesh);
  }

  // Edificio de turbinas (Turbine Hall)
  const turbBuilding = new THREE.Mesh(
    new THREE.BoxGeometry(36, 16, 26),
    new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6, metalness: 0.3 })
  );
  turbBuilding.position.set(38, 8.0, -25);
  bopRoot.add(turbBuilding);
  registerBopPart(turbBuilding, 'turbine');

  // Turbina multietapa y alternador visible dentro
  const turbineCasing = new THREE.Mesh(
    new THREE.CylinderGeometry(2.4, 2.4, 18, 24),
    gMaterials.forgedSteel
  );
  turbineCasing.rotation.z = Math.PI / 2;
  turbineCasing.position.set(36, 6.0, -25);
  bopRoot.add(turbineCasing);
  registerBopPart(turbineCasing, 'turbine');

  const genCasing = new THREE.Mesh(
    new THREE.CylinderGeometry(2.0, 2.0, 9, 24),
    gMaterials.pumpMotor
  );
  genCasing.rotation.z = Math.PI / 2;
  genCasing.position.set(50, 6.0, -25);
  bopRoot.add(genCasing);
  registerBopPart(genCasing, 'turbine');

  // Subestación GIS 400 kV
  const subGroup = new THREE.Group();
  subGroup.position.set(45, 0, 25);
  bopRoot.add(subGroup);

  const subPad = new THREE.Mesh(new THREE.BoxGeometry(28, 0.6, 22), gMaterials.concrete);
  subPad.position.y = 0.3;
  subGroup.add(subPad);
  registerBopPart(subPad, 'substation');

  // Módulos blindados SF6
  for (let x = -8; x <= 8; x += 8) {
    const gisBay = new THREE.Mesh(new THREE.BoxGeometry(3.5, 4.5, 12), gMaterials.crdmMetal);
    gisBay.position.set(x, 2.6, 0);
    subGroup.add(gisBay);
    registerBopPart(gisBay, 'substation');
  }

  // Transformador principal de 400 kV
  const trafo = new THREE.Mesh(new THREE.BoxGeometry(6.5, 5.5, 5.5), gMaterials.vesselDark);
  trafo.position.set(0, 3.1, -6);
  subGroup.add(trafo);
  registerBopPart(trafo, 'substation');
}

// Entorno geográfico eliminado según especificación del usuario (foco exclusivo en el SMR)
// ==========================================================================
// 11. CAMBIO DE MODO DE ESCENA (REACTOR vs HALL vs BOP vs GEO)
// ==========================================================================
function setSceneMode(mode) {
  SMR_STATE.activeSceneMode = mode;

  // Actualizar botones de pestañas
  document.querySelectorAll('.mode-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.scene === mode);
  });

  const roots = gSceneRoots;
  switch (mode) {
    case 'smr-reactor':
      // Modo Estudio Mecánico del Reactor
      if (roots.smrReactorModule) roots.smrReactorModule.visible = true;
      if (roots.smrHallBuilding) roots.smrHallBuilding.visible = true; // Integrado con piscina UHS y nave industrial
      if (roots.smrPlantBOP) roots.smrPlantBOP.visible = false;
      if (roots.smrGeoLandscape) roots.smrGeoLandscape.visible = false;
      flyCameraTo({ x: 0, y: 14.5, z: 20.5 }, { x: 0, y: 10.5, z: 0 });
      break;

    case 'smr-hall':
      // Modo Nave de Contención y Piscina
      if (roots.smrReactorModule) roots.smrReactorModule.visible = true;
      if (roots.smrHallBuilding) roots.smrHallBuilding.visible = true;
      if (roots.smrPlantBOP) roots.smrPlantBOP.visible = false;
      if (roots.smrGeoLandscape) roots.smrGeoLandscape.visible = false;
      flyCameraTo({ x: -0.4, y: 17.5, z: 27.2 }, { x: 0.0, y: 10.8, z: -0.5 });
      break;

    case 'smr-plant':
      // Modo Balance de Planta Completo
      if (roots.smrReactorModule) roots.smrReactorModule.visible = true;
      if (roots.smrHallBuilding) roots.smrHallBuilding.visible = true;
      if (roots.smrPlantBOP) roots.smrPlantBOP.visible = true;
      if (roots.smrGeoLandscape) roots.smrGeoLandscape.visible = false;
      flyCameraTo({ x: 45, y: 35, z: 50 }, { x: 15, y: 8, z: 0 });
      break;
  }

  // Ficha técnica siempre visible con datos globales de la pestaña activa si no hay subcomponente seleccionado
  if (!SMR_STATE.selectedComponentId) {
    showDefaultInspectorForActiveMode();
  }
}

// ==========================================================================
// 12. SELECCIÓN E INSPECCIÓN DE COMPONENTES CON ENFOQUE SEGURO Y TRANSPARENCIA
// ==========================================================================
const INTERNAL_COMPONENTS = ['core', 'control-rods', 'steam-generator', 'pressurizer', 'riser', 'downcomer', 'reflector', 'pumps', 'piping'];

function selectComponent(compId, smoothFly = true) {
  const comp = SMR_COMPONENTS_DATA[compId];
  if (!comp) return;

  SMR_STATE.selectedComponentId = compId;

  // 1. Sincronizar modo de escena de forma coherente
  if (comp.groupKey === 'plant' || compId === 'steam-lines' || compId === 'heat-exchangers' || compId === 'seismic-supports') {
    if (compId === 'turbine' || compId === 'substation') {
      if (SMR_STATE.activeSceneMode !== 'smr-plant') setSceneMode('smr-plant');
    } else {
      if (SMR_STATE.activeSceneMode !== 'smr-hall' && SMR_STATE.activeSceneMode !== 'smr-plant') {
        setSceneMode('smr-hall');
      }
    }
  } else {
    if (SMR_STATE.activeSceneMode !== 'smr-reactor' && SMR_STATE.activeSceneMode !== 'smr-hall') {
      setSceneMode('smr-reactor');
    }
  }

  // 2. Si se selecciona un componente interior y el reactor está cerrado, abrir automáticamente en modo corte
  const isInternal = INTERNAL_COMPONENTS.includes(compId) || compId === 'rpv';
  if (isInternal && SMR_STATE.cutawayMode === 'closed') {
    setCutawayMode('120');
  }
  // IMPORTANTE: Si se selecciona 'containment' mientras estamos en modo corte, NO cerrar el reactor.
  // El reactor solo se cierra si el usuario pulsa expresamente el botón 'Reactor Cerrado (360°)' o la tecla 'C'.

  // 3. Actualizar menú lateral de opciones
  document.querySelectorAll('.comp-item-btn').forEach(btn => {
    const isThis = (btn.dataset.comp === compId);
    btn.classList.toggle('active', isThis);
    const pill = btn.querySelector('.badge-pill');
    if (pill) pill.textContent = isThis ? 'Viendo' : 'Ver';
  });

  // 4. Rellenar Ficha Técnica de Ingeniería (Inspector Card)
  const card = document.getElementById('component-inspector-card');
  if (card) {
    card.classList.remove('hidden');

    const elCat = document.getElementById('inspect-category');
    const elIcon = document.getElementById('inspect-icon');
    const elName = document.getElementById('inspect-name');
    const elNameEn = document.getElementById('inspect-name-en');
    const elDesc = document.getElementById('inspect-description');
    const elEcon = document.getElementById('inspect-economic');

    if (elCat) elCat.textContent = comp.category;
    if (elIcon) elIcon.textContent = comp.icon;
    if (elName) elName.textContent = comp.name;
    if (elNameEn) elNameEn.textContent = comp.nameEn;
    if (elDesc) elDesc.textContent = comp.description;
    if (elEcon) elEcon.textContent = comp.economicBenefit;

    const specsGrid = document.getElementById('inspect-specs-grid');
    if (specsGrid && comp.specs) {
      const rowsHtml = comp.specs.map(s => `
        <div class="inspect-spec-row">
          <span class="inspect-spec-label">${s.label}</span>
          <span class="inspect-spec-val">${s.val}</span>
        </div>
      `).join('');

      const econThermalHtml = `
        <div class="inspect-thermal-econ-card">
          <div class="card-metric-title">📊 BALANCE TÉRMICO & ECONOMÍA (ESE · UVa)</div>
          <div class="card-metric-grid">
            <div class="metric-item">
              <span class="m-lbl">Rendimiento (η)</span>
              <span class="m-val" style="color: #059669;">36.8% Rankine</span>
            </div>
            <div class="metric-item">
              <span class="m-lbl">Salto Térmico (ΔT)</span>
              <span class="m-val" style="color: #0284c7;">30 °C (290→320)</span>
            </div>
            <div class="metric-item">
              <span class="m-lbl">Coste Nivelado (LCOE)</span>
              <span class="m-val" style="color: #d97706;">52 €/MWh</span>
            </div>
            <div class="metric-item">
              <span class="m-lbl">Overnight CAPEX</span>
              <span class="m-val" style="color: #2563eb;">3.200 €/kWe</span>
            </div>
          </div>
        </div>
      `;
      specsGrid.innerHTML = rowsHtml + econThermalHtml;
    }
  }

  // 5. Actualizar Etiqueta 3D Flotante con Puntero Directo y Resumen de Función
  const calloutIcon = document.getElementById('callout-icon');
  const calloutTitle = document.getElementById('callout-title');
  const calloutDesc = document.getElementById('callout-desc');
  if (calloutIcon) calloutIcon.textContent = comp.icon || '⚛️';
  if (calloutTitle) calloutTitle.textContent = comp.name;
  if (calloutDesc) calloutDesc.textContent = comp.calloutSummary || (comp.description ? comp.description.slice(0, 95) + '...' : '');
  updateCalloutTag3D();

  // 6. Resaltado emisivo y visibilidad
  updateComponentVisibilityAndHighlight(compId);

  // 7. Vuelo de cámara suave, rápido (0.38s) y estable que mantiene el ángulo de visión del usuario
  if (smoothFly) {
    focusCameraOnComponent(comp);
  }
}

function deselectComponent() {
  SMR_STATE.selectedComponentId = null;
  const tagEl = document.getElementById('smr-3d-callout-tag');
  if (tagEl) tagEl.classList.add('hidden');
  const inspectCard = document.getElementById('component-inspector-card');
  if (inspectCard) inspectCard.classList.remove('hidden'); // Fijo y siempre visible
  document.querySelectorAll('.comp-item-btn').forEach(btn => {
    btn.classList.remove('active');
    const pill = btn.querySelector('.badge-pill');
    if (pill) pill.textContent = 'Ver';
  });
  updateComponentVisibilityAndHighlight(null);
  updateCalloutTag3D();
  showDefaultInspectorForActiveMode();
}

// Función para mantener siempre lleno y visible el panel lateral derecho con la ficha técnica y balance económico
function showDefaultInspectorForActiveMode() {
  const card = document.getElementById('component-inspector-card');
  if (!card) return;
  card.classList.remove('hidden');

  let defaultCompId = 'pool';
  const mode = SMR_STATE.activeSceneMode || 'smr-hall';
  if (mode === 'smr-reactor') {
    defaultCompId = 'containment';
  } else if (mode === 'smr-hall') {
    defaultCompId = 'pool';
  } else if (mode === 'smr-plant') {
    defaultCompId = 'turbine';
  }

  const comp = SMR_COMPONENTS_DATA[defaultCompId] || SMR_COMPONENTS_DATA['pool'];
  if (!comp) return;

  const elCat = document.getElementById('inspect-category');
  const elIcon = document.getElementById('inspect-icon');
  const elName = document.getElementById('inspect-name');
  const elNameEn = document.getElementById('inspect-name-en');
  const elDesc = document.getElementById('inspect-description');
  const elEcon = document.getElementById('inspect-economic');

  if (elCat) elCat.textContent = comp.category;
  if (elIcon) elIcon.textContent = comp.icon;
  if (elName) elName.textContent = comp.name;
  if (elNameEn) elNameEn.textContent = comp.nameEn;
  if (elDesc) elDesc.textContent = comp.description;
  if (elEcon) elEcon.textContent = comp.economicBenefit;

  const specsGrid = document.getElementById('inspect-specs-grid');
  if (specsGrid && comp.specs) {
    const rowsHtml = comp.specs.map(s => `
      <div class="inspect-spec-row">
        <span class="inspect-spec-label">${s.label}</span>
        <span class="inspect-spec-val">${s.val}</span>
      </div>
    `).join('');

    const econThermalHtml = `
      <div class="inspect-thermal-econ-card">
        <div class="card-metric-title">📊 BALANCE TÉRMICO & ECONOMÍA (ESE · UVa)</div>
        <div class="card-metric-grid">
          <div class="metric-item">
            <span class="m-lbl">Rendimiento (η)</span>
            <span class="m-val" style="color: #059669;">36.8% Rankine</span>
          </div>
          <div class="metric-item">
            <span class="m-lbl">Salto Térmico (ΔT)</span>
            <span class="m-val" style="color: #0284c7;">30 °C (290→320)</span>
          </div>
          <div class="metric-item">
            <span class="m-lbl">Coste Nivelado (LCOE)</span>
            <span class="m-val" style="color: #d97706;">52 €/MWh</span>
          </div>
          <div class="metric-item">
            <span class="m-lbl">Overnight CAPEX</span>
            <span class="m-val" style="color: #2563eb;">3.200 €/kWe</span>
          </div>
        </div>
      </div>
    `;
    specsGrid.innerHTML = rowsHtml + econThermalHtml;
  }
}

function updateComponentVisibilityAndHighlight(selectedId) {
  if (SMR_STATE.isolatedComponentId) {
    gInteractiveMeshes.forEach(mesh => {
      mesh.visible = (mesh.userData.componentId === SMR_STATE.isolatedComponentId);
    });
    return;
  }

  const isCutaway = (SMR_STATE.cutawayMode === '120');
  const isXray = (SMR_STATE.cutawayMode === 'xray');
  const isClosed = (SMR_STATE.cutawayMode === 'closed');

  const contMeshes = gComponentMeshMap['containment'] || [];
  const rpvMeshes = gComponentMeshMap['rpv'] || [];
  const coreMeshes = gComponentMeshMap['core'] || [];
  const reflectorMeshes = gComponentMeshMap['reflector'] || [];
  const crdmMeshes = gComponentMeshMap['control-rods'] || [];
  const sgMeshes = gComponentMeshMap['steam-generator'] || [];
  const riserMeshes = gComponentMeshMap['riser'] || [];
  const pzrMeshes = gComponentMeshMap['pressurizer'] || [];
  const pumpMeshes = gComponentMeshMap['pumps'] || [];
  const pipingMeshes = gComponentMeshMap['piping'] || [];
  const downcomerMeshes = gComponentMeshMap['downcomer'] || [];

  // 1. Restaurar todos los componentes interiores a estado sólido por defecto
  setMeshesTransparency(coreMeshes, false, 1.0);
  setMeshesTransparency(reflectorMeshes, false, 1.0);
  setMeshesTransparency(crdmMeshes, false, 1.0);
  setMeshesTransparency(sgMeshes, false, 1.0);
  setMeshesTransparency(riserMeshes, false, 1.0);
  setMeshesTransparency(pzrMeshes, false, 1.0);
  setMeshesTransparency(pumpMeshes, false, 1.0);
  setMeshesTransparency(pipingMeshes, false, 1.0);
  setMeshesTransparency(downcomerMeshes, true, 0.35);

  if (isClosed) {
    // Reactor cerrado: carcasas 100% sólidas
    setMeshesTransparency(contMeshes, false, 1.0);
    setMeshesTransparency(rpvMeshes, false, 1.0);
  } else if (isXray) {
    // Modo Rayos X: carcasas translúcidas globales
    setMeshesTransparency(contMeshes, true, 0.14);
    setMeshesTransparency(rpvMeshes, true, 0.20);
  } else if (isCutaway) {
    // Modo Corte Seccional: La vasija y contención se mantienen 100% sólidas y opacas (sin transparencia borrosa)
    // El corte geométrico limpio de 90° con tapas de espesor ASME Sección III permite ver el interior con máxima nitidez
    setMeshesTransparency(contMeshes, false, 1.0);
    setMeshesTransparency(rpvMeshes, false, 1.0);

    // Ajuste selectivo únicamente para elementos interiores que requieran despeje visual directo
    if (selectedId === 'core') {
      setMeshesTransparency(reflectorMeshes, true, 0.20);
    } else if (selectedId === 'riser') {
      setMeshesTransparency(sgMeshes, true, 0.20);
    }
  }

  // 2. Resaltado emisivo técnico y sistema de contorno Neón + Glow Volumétrico
  // A. Gestión de la Piscina UHS
  if (selectedId === 'pool') {
    if (gPoolNeonRimGroup) gPoolNeonRimGroup.visible = true;
  } else {
    if (gPoolNeonRimGroup) gPoolNeonRimGroup.visible = false;
  }

  // B. Regenerar contorno neón láser ('outline') y resplandor interior translúcido
  while (gSelectionHighlightGroup.children.length > 0) {
    const obj = gSelectionHighlightGroup.children.pop();
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) {
      if (Array.isArray(obj.material)) obj.material.forEach(m => m.dispose());
      else obj.material.dispose();
    }
  }

  if (selectedId && selectedId !== 'pool') {
    const meshes = gComponentMeshMap[selectedId] || [];
    const isCore = (selectedId === 'core');
    const outlineColor = isCore ? 0xff8c00 : 0x00f0ff;
    const glowColor = isCore ? 0xf97316 : 0x00e5ff;

    meshes.forEach(m => {
      if (m && m.geometry && m.visible && m.material !== gMaterials.concrete && m.material !== gMaterials.poolLiner) {
        m.updateMatrixWorld(true);

        try {
          const edges = new THREE.EdgesGeometry(m.geometry, 28);
          const lineMat = new THREE.LineBasicMaterial({
            color: outlineColor,
            transparent: true,
            opacity: 0.95,
            depthTest: true
          });
          const line = new THREE.LineSegments(edges, lineMat);
          line.matrixAutoUpdate = false;
          line.matrix.copy(m.matrixWorld);
          gSelectionHighlightGroup.add(line);

          // Resplandor o 'glow' translúcido en el interior para iluminar el volumen
          const glowMat = new THREE.MeshBasicMaterial({
            color: glowColor,
            transparent: true,
            opacity: 0.22,
            side: THREE.DoubleSide,
            depthWrite: false,
            blending: THREE.AdditiveBlending
          });
          const glowMesh = new THREE.Mesh(m.geometry, glowMat);
          glowMesh.matrixAutoUpdate = false;
          glowMesh.matrix.copy(m.matrixWorld);
          gSelectionHighlightGroup.add(glowMesh);
        } catch (e) {
          // Seguridad ante geometrías no indexadas
        }
      }
    });
  }

  // C. Resaltado emisivo técnico en el material base
  gInteractiveMeshes.forEach(mesh => {
    if (mesh.material && mesh.material.emissive) {
      if (mesh.userData.componentId === selectedId &&
          mesh.material !== gMaterials.concrete &&
          mesh.material !== gMaterials.poolLiner &&
          mesh.material !== gMaterials.waterSurface) {
        const emColor = (selectedId === 'core') ? 0xf97316 : 0x00f0ff;
        mesh.material.emissive.setHex(emColor);
        if (mesh.material.emissiveIntensity !== undefined) mesh.material.emissiveIntensity = 0.28;
      } else {
        mesh.material.emissive.setHex(0x000000);
        if (mesh.material.emissiveIntensity !== undefined) mesh.material.emissiveIntensity = 0.0;
      }
    }
  });
}

function setMeshesTransparency(meshes, transparent, opacity) {
  if (!meshes || !Array.isArray(meshes)) return;
  meshes.forEach(m => {
    if (m.material) {
      // Si el mesh aún no tiene su propia instancia aislada de material, clonarla para evitar efectos secundarios
      if (!m.userData.hasIsolatedMat) {
        m.material = m.material.clone();
        m.userData.hasIsolatedMat = true;
      }
      m.material.transparent = transparent;
      m.material.opacity = opacity;
      m.material.depthWrite = !transparent;
      m.material.needsUpdate = true;
    }
  });
}

function focusCameraOnComponent(comp) {
  const camera = SMR_STATE.camera;
  const controls = SMR_STATE.controls;
  if (!camera || !controls) return;

  if (comp.id === 'pool') {
    startSafeCameraFlight(new THREE.Vector3(-0.8, 20.0, 31.5), new THREE.Vector3(0, 12.0, -1.0), 0.42);
    return;
  }

  const targetX = comp.targetX || (comp.cameraFocus ? comp.cameraFocus.targetX : 0) || 0;
  const targetY = (comp.targetY !== undefined) ? comp.targetY : ((comp.cameraFocus && comp.cameraFocus.targetY !== undefined) ? comp.cameraFocus.targetY : 10.5);
  const targetZ = comp.targetZ || (comp.cameraFocus ? comp.cameraFocus.targetZ : 0) || 0;
  const targetLook = new THREE.Vector3(targetX, targetY, targetZ);

  if (comp.cameraFocus && comp.cameraFocus.x !== undefined && comp.id !== 'containment') {
    startSafeCameraFlight(new THREE.Vector3(comp.cameraFocus.x, comp.cameraFocus.y, comp.cameraFocus.z), targetLook, 0.38);
    return;
  }

  let baseDist = comp.targetDistance || (comp.cameraFocus ? Math.max(14.0, comp.cameraFocus.z) : 15.0);
  if (comp.groupKey === 'plant') baseDist = 28.0;

  // CLAVE: Mantener el azimut y elevación exactos del usuario, sin voltear ni girar la cámara bruscamente
  const dir = new THREE.Vector3().subVectors(camera.position, controls.target);
  let curDist = dir.length();
  if (curDist < 0.2 || isNaN(curDist)) {
    dir.set(12, 10, 15);
    curDist = dir.length();
  }
  dir.normalize();

  // Asegurar elevación cómoda (entre 12° y 48° sobre la horizontal)
  dir.y = Math.max(0.18, Math.min(0.68, dir.y));
  dir.normalize();

  const desiredDist = Math.max(13.5, Math.min(24.0, baseDist));
  const targetCamPos = new THREE.Vector3().copy(targetLook).addScaledVector(dir, desiredDist);

  // Vuelo rápido y suave (0.38 segundos) para respuesta inmediata al hacer clic entre piezas
  startSafeCameraFlight(targetCamPos, targetLook, 0.38);
}

function startSafeCameraFlight(targetPos, targetLook, duration = 0.38) {
  const camera = SMR_STATE.camera;
  const controls = SMR_STATE.controls;
  if (!camera || !controls) return;

  safeFlight.active = true;
  safeFlight.progress = 0;
  safeFlight.duration = duration;

  safeFlight.startPos.copy(camera.position);
  safeFlight.targetPos.copy(targetPos);

  safeFlight.startLook.copy(controls.target);
  safeFlight.targetLook.copy(targetLook);
}

function updateExplodeButtonState(progress) {
  const btn = document.getElementById('btn-toggle-full-explode');
  if (!btn) return;
  if (progress > 0.45) {
    btn.innerHTML = '🔄 Ensamblar Reactor';
    btn.classList.add('active');
    btn.title = 'Volver a unir todos los componentes en el reactor ensamblado (Tecla D)';
  } else {
    btn.innerHTML = '💥 Despiece Completo';
    btn.classList.remove('active');
    btn.title = 'Despiezar completamente todos los componentes del reactor SMR para inspeccionarlos separados (Tecla D)';
  }
}

function updateExplodedView(progress) {
  SMR_STATE.explodedProgress = progress;

  const disp = document.getElementById('exploded-val-disp');
  if (disp) disp.textContent = `${Math.round(progress * 100)}%`;

  updateExplodeButtonState(progress);

  // Al despiezar (> 5%), si el reactor estaba hermético, abrir automáticamente en modo corte para ver el interior
  if (progress > 0.05 && SMR_STATE.cutawayMode === 'closed') {
    setCutawayMode('120');
  }

  gExplodableParts.forEach(mesh => {
    if (mesh.userData && mesh.userData.originalPos && mesh.userData.explodedOffset) {
      mesh.position.copy(mesh.userData.originalPos).addScaledVector(mesh.userData.explodedOffset, progress);
    }
  });

  // Actualizar etiqueta flotante si hay un componente seleccionado
  updateCalloutTag3D();
}

function toggleAnimateExplode() {
  if (SMR_STATE.isExplodeAnimating) return;
  SMR_STATE.isExplodeAnimating = true;

  const target = SMR_STATE.explodedProgress > 0.45 ? 0.0 : 1.0;
  const start = SMR_STATE.explodedProgress;
  const startTime = performance.now();
  const duration = 1200;

  // Si se va a despiezar y la cámara está muy cerca, ajustar suavemente a visión panorámica
  if (target === 1.0 && SMR_STATE.camera && SMR_STATE.controls) {
    const dist = SMR_STATE.camera.position.distanceTo(SMR_STATE.controls.target);
    if (dist < 18.0) {
      const dir = new THREE.Vector3().subVectors(SMR_STATE.camera.position, SMR_STATE.controls.target).normalize();
      const newPos = new THREE.Vector3().copy(SMR_STATE.controls.target).addScaledVector(dir, 24.0);
      newPos.y = Math.max(12.0, newPos.y);
      startSafeCameraFlight(newPos, SMR_STATE.controls.target, 0.8);
    }
  }

  function stepExplode(now) {
    const elapsed = now - startTime;
    const t = Math.min(1.0, elapsed / duration);
    const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    const current = start + (target - start) * ease;

    updateExplodedView(current);
    const slider = document.getElementById('exploded-view-slider');
    if (slider) slider.value = Math.round(current * 100);

    if (t < 1.0) {
      requestAnimationFrame(stepExplode);
    } else {
      SMR_STATE.isExplodeAnimating = false;
      updateExplodeButtonState(target);
    }
  }
  requestAnimationFrame(stepExplode);
}

function setReactorDoorOpen(open) {
  setCutawayMode(open ? '120' : 'closed');
}

function setCutawayMode(mode) {
  SMR_STATE.cutawayMode = mode;
  SMR_STATE.isReactorDoorOpen = (mode !== 'closed');

  const isClosed = (mode === 'closed');
  const isXray = (mode === 'xray');

  // Alternar visibilidad de grupos (sin piezas flotando en el aire)
  if (gClosedVesselGroup) gClosedVesselGroup.visible = isClosed;
  if (gCutawayVesselGroup) gCutawayVesselGroup.visible = !isClosed;
  if (gInternalGroup) gInternalGroup.visible = !isClosed || isXray;

  // Manejo de transparencia para rayos X
  const contMeshes = gComponentMeshMap['containment'] || [];
  const rpvMeshes = gComponentMeshMap['rpv'] || [];

  if (isXray) {
    setMeshesTransparency(contMeshes, true, 0.16);
    setMeshesTransparency(rpvMeshes, true, 0.22);
  } else {
    setMeshesTransparency(contMeshes, false, 1.0);
    setMeshesTransparency(rpvMeshes, false, 1.0);
  }

  // Actualizar botones de UI
  document.querySelectorAll('.cut-mode-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.cut === mode);
  });

  updateComponentVisibilityAndHighlight(SMR_STATE.selectedComponentId);
}

function isolateComponent(compId) {
  SMR_STATE.isolatedComponentId = compId;

  gInteractiveMeshes.forEach(mesh => {
    mesh.visible = (mesh.userData.componentId === compId);
  });
}

function unisolateAllComponents() {
  SMR_STATE.isolatedComponentId = null;
  setCutawayMode(SMR_STATE.cutawayMode);
}

// ==========================================================================
// 16. GENERACIÓN DINÁMICA DEL ÁRBOL DE COMPONENTES UI
// ==========================================================================
function buildComponentTreeUI() {
  const listPrimary = document.getElementById('comp-list-primary');
  const listCore = document.getElementById('comp-list-core');
  const listSteam = document.getElementById('comp-list-steam');
  const listPlant = document.getElementById('comp-list-plant');

  const targets = {
    primary: listPrimary,
    core: listCore,
    steam: listSteam,
    plant: listPlant
  };

  Object.values(SMR_COMPONENTS_DATA).forEach(comp => {
    const container = targets[comp.groupKey];
    if (!container) return;

    const btn = document.createElement('button');
    btn.className = `comp-item-btn ${comp.id === SMR_STATE.selectedComponentId ? 'active' : ''}`;
    btn.dataset.comp = comp.id;
    btn.innerHTML = `
      <div class="left-wrap">
        <span class="icon">${comp.icon}</span>
        <span>${comp.name}</span>
      </div>
      <span class="badge-pill">Ver</span>
    `;

    btn.addEventListener('click', () => {
      selectComponent(comp.id, true);
    });

    container.appendChild(btn);
  });
}

// ==========================================================================
// 17. INTERACCIÓN CON RATÓN Y RAYCASTER (HOVER & CLICK)
// ==========================================================================
function bindInteractionEvents() {
  const container = document.getElementById('canvas-3d-container');
  const tooltip = document.getElementById('hover-tooltip-3d');
  const tipIcon = document.getElementById('tooltip-icon');
  const tipText = document.getElementById('tooltip-text');

  // Función para resolver el componente impactado con prioridad interior en modo corte
  function resolveHitComponent(intersects) {
    if (!intersects || intersects.length === 0) return null;

    let internalHit = null;
    let externalHit = null;

    for (const hit of intersects) {
      let m = hit.object;
      while (m && !m.userData.isComponent && m.parent) {
        m = m.parent;
      }

      if (m && m.userData.isComponent) {
        const cid = m.userData.componentId;
        if (INTERNAL_COMPONENTS.includes(cid) || cid === 'rpv') {
          if (!internalHit) internalHit = cid;
        } else {
          if (!externalHit) externalHit = cid;
        }
      }
    }

    // Si estamos en modo corte o rayos X, priorizar siempre el componente interior impactado
    if (SMR_STATE.cutawayMode !== 'closed' && internalHit) {
      return internalHit;
    }
    return internalHit || externalHit;
  }

  let currentHoverMesh = null;
  let currentHoverOriginalEmissive = 0;
  let currentHoverOriginalIntensity = 0;

  function resetHoverEmissive() {
    if (currentHoverMesh && currentHoverMesh.material && currentHoverMesh.material.emissive) {
      if (currentHoverMesh.userData.componentId !== SMR_STATE.selectedComponentId) {
        currentHoverMesh.material.emissive.setHex(currentHoverOriginalEmissive);
        if (currentHoverMesh.material.emissiveIntensity !== undefined) {
          currentHoverMesh.material.emissiveIntensity = currentHoverOriginalIntensity;
        }
      }
    }
    currentHoverMesh = null;
  }

  // Mouse Move: Hover sutil con brillo emisivo ligero y Tooltip con nombre (sin abrir tarjeta completa)
  window.addEventListener('mousemove', (e) => {
    SMR_STATE.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    SMR_STATE.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    if (!SMR_STATE.camera || !SMR_STATE.raycaster) return;

    SMR_STATE.raycaster.setFromCamera(SMR_STATE.mouse, SMR_STATE.camera);
    const visibleMeshes = gInteractiveMeshes.filter(m => m.visible && m.parent && m.parent.visible !== false);
    const intersects = SMR_STATE.raycaster.intersectObjects(visibleMeshes, true);

    const compId = resolveHitComponent(intersects);
    if (compId) {
      const comp = SMR_COMPONENTS_DATA[compId];
      if (comp) {
        document.body.style.cursor = 'pointer';

        // Localizar malla impactada para brillo emisivo sutil
        let hitObj = intersects[0].object;
        while (hitObj && !hitObj.userData.isComponent && hitObj.parent) {
          hitObj = hitObj.parent;
        }

        if (hitObj && hitObj !== currentHoverMesh) {
          resetHoverEmissive();
          if (hitObj.material && hitObj.material.emissive && hitObj.userData.componentId !== SMR_STATE.selectedComponentId) {
            currentHoverMesh = hitObj;
            currentHoverOriginalEmissive = hitObj.material.emissive.getHex();
            currentHoverOriginalIntensity = hitObj.material.emissiveIntensity !== undefined ? hitObj.material.emissiveIntensity : 0.0;
            const isCore = (compId === 'core');
            hitObj.material.emissive.setHex(isCore ? 0xf97316 : 0x00f0ff);
            hitObj.material.emissiveIntensity = 0.22;
          }
        }

        if (tooltip) {
          if (compId === SMR_STATE.selectedComponentId) {
            tooltip.style.display = 'none';
          } else {
            tooltip.style.display = 'flex';
            tooltip.style.left = `${e.clientX + 14}px`;
            tooltip.style.top = `${e.clientY + 14}px`;
            if (tipIcon) tipIcon.textContent = comp.icon;
            if (tipText) tipText.textContent = comp.name;
          }
        }
        return;
      }
    }

    resetHoverEmissive();
    document.body.style.cursor = 'default';
    if (tooltip) tooltip.style.display = 'none';
  });

  container.addEventListener('pointerleave', () => {
    resetHoverEmissive();
    document.body.style.cursor = 'default';
    if (tooltip) tooltip.style.display = 'none';
  });

  // Detección precisa de clic vs arrastre de órbita 360°
  let isDraggingPointer = false;
  let pointerStartPos = { x: 0, y: 0 };

  container.addEventListener('pointerdown', (e) => {
    isDraggingPointer = false;
    pointerStartPos = { x: e.clientX, y: e.clientY };
    safeFlight.active = false;
  });

  container.addEventListener('pointermove', (e) => {
    const dist = Math.hypot(e.clientX - pointerStartPos.x, e.clientY - pointerStartPos.y);
    if (dist > 6) {
      isDraggingPointer = true;
    }
  });

  container.addEventListener('pointerup', (e) => {
    if (isDraggingPointer) return;

    if (!SMR_STATE.camera || !SMR_STATE.raycaster) return;

    if (tooltip) tooltip.style.display = 'none';

    SMR_STATE.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    SMR_STATE.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    SMR_STATE.raycaster.setFromCamera(SMR_STATE.mouse, SMR_STATE.camera);

    const visibleMeshes = gInteractiveMeshes.filter(m => m.visible && m.parent && m.parent.visible !== false);
    const intersects = SMR_STATE.raycaster.intersectObjects(visibleMeshes, true);

    const targetCompId = resolveHitComponent(intersects);
    if (targetCompId) {
      selectComponent(targetCompId, true);
    } else {
      // Clic fuera de componentes: deseleccionar y cerrar información
      deselectComponent();
    }
  });

  // Selector de Modos de Escena
  document.querySelectorAll('.mode-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setSceneMode(btn.dataset.scene);
    });
  });

  // Pines de Anotación Técnica Guía Directa al Entorno Industrial (Referencia Visual)
  document.querySelectorAll('.smr-3d-pin-label').forEach(pin => {
    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      const compId = pin.dataset.comp;
      if (compId) {
        selectComponent(compId, true);
      }
    });
  });

  // Slider de Despiece
  const expSlider = document.getElementById('exploded-view-slider');
  if (expSlider) {
    expSlider.addEventListener('input', (e) => {
      updateExplodedView(parseFloat(e.target.value) / 100);
    });
  }

  const btnAnimExp = document.getElementById('btn-animate-explode');
  if (btnAnimExp) btnAnimExp.addEventListener('click', toggleAnimateExplode);

  const btnFullExp = document.getElementById('btn-toggle-full-explode');
  if (btnFullExp) btnFullExp.addEventListener('click', toggleAnimateExplode);

  // Modos de corte
  document.querySelectorAll('.cut-mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      setCutawayMode(btn.dataset.cut);
    });
  });

  // Botones de acción del Inspector
  const btnCloseInspect = document.getElementById('btn-close-inspector');
  if (btnCloseInspect) {
    btnCloseInspect.addEventListener('click', () => {
      deselectComponent();
    });
  }

  const btnFocusComp = document.getElementById('btn-focus-component');
  if (btnFocusComp) {
    btnFocusComp.addEventListener('click', () => {
      selectComponent(SMR_STATE.selectedComponentId, true);
    });
  }

  const btnIsolate = document.getElementById('btn-isolate-component');
  if (btnIsolate) {
    btnIsolate.addEventListener('click', () => {
      isolateComponent(SMR_STATE.selectedComponentId);
    });
  }

  const btnUnisolate = document.getElementById('btn-unisolate-all');
  if (btnUnisolate) btnUnisolate.addEventListener('click', unisolateAllComponents);

  // Búsqueda de componentes
  const searchInput = document.getElementById('comp-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.comp-item-btn').forEach(btn => {
        const text = btn.textContent.toLowerCase();
        btn.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });
  }

  // Minimizar panel de componentes
  const btnToggleCompPanel = document.getElementById('btn-toggle-comp-panel');
  if (btnToggleCompPanel) {
    btnToggleCompPanel.addEventListener('click', () => {
      document.getElementById('component-tree-panel').classList.toggle('collapsed');
    });
  }

  // Modal de Sketchfab Oficial
  const btnOpenSketchfab = document.getElementById('btn-open-sketchfab-modal');
  const sfModal = document.getElementById('sketchfab-modal');
  const sfIframe = document.getElementById('sketchfab-iframe');
  const btnCloseSf = document.getElementById('btn-close-sketchfab');

  if (btnOpenSketchfab && sfModal) {
    btnOpenSketchfab.addEventListener('click', () => {
      if (sfIframe) {
        sfIframe.src = 'https://sketchfab.com/models/80a4c3f4e0cd42698d872c81d045b54c/embed?autostart=1&internal=1&ui_infos=1&ui_watermark=0';
      }
      sfModal.classList.add('open');
    });
  }

  if (btnCloseSf && sfModal) {
    btnCloseSf.addEventListener('click', () => {
      sfModal.classList.remove('open');
      if (sfIframe) sfIframe.src = ''; // Detener reproducción
    });
  }

  // Conmutador de Cámara Ortográfica CAD
  const btnOrtho = document.getElementById('btn-toggle-ortho');
  if (btnOrtho) btnOrtho.addEventListener('click', toggleCameraProjection);

  // Botón Reset Cámara
  const btnResetCam = document.getElementById('btn-reset-camera');
  if (btnResetCam) {
    btnResetCam.addEventListener('click', () => {
      selectComponent(SMR_STATE.selectedComponentId, true);
    });
  }

  // Selector de Modelo SMR
  const modelSelect = document.getElementById('smr-model-selector');
  if (modelSelect) {
    modelSelect.addEventListener('change', (e) => {
      SMR_STATE.activeModel = e.target.value;
      updatePhysics();
    });
  }

  // Selector de Luz / Hora (Fondo blanco de estudio técnico)
  const timeSelect = document.getElementById('smr-time-selector');
  if (timeSelect) {
    timeSelect.addEventListener('change', (e) => {
      setTimeOfDay(e.target.value);
    });
  }

  // Controles de Guía Virtual
  const btnPlayPause = document.getElementById('btn-play-pause-speech');
  if (btnPlayPause) btnPlayPause.addEventListener('click', toggleAudioPlayback);

  const btnPrevStop = document.getElementById('btn-prev-stop');
  if (btnPrevStop) {
    btnPrevStop.addEventListener('click', () => {
      if (SMR_STATE.currentStopIndex > 0) updateTourStop(SMR_STATE.currentStopIndex - 1, true);
    });
  }

  const btnNextStop = document.getElementById('btn-next-stop');
  if (btnNextStop) {
    btnNextStop.addEventListener('click', () => {
      if (SMR_STATE.currentStopIndex < TOUR_STOPS.length - 1) updateTourStop(SMR_STATE.currentStopIndex + 1, true);
    });
  }

  const btnToggleGuideHud = document.getElementById('btn-toggle-guide-hud');
  if (btnToggleGuideHud) {
    btnToggleGuideHud.addEventListener('click', () => {
      const p = document.getElementById('virtual-guide-panel');
      p.classList.toggle('collapsed');
      btnToggleGuideHud.classList.toggle('active', !p.classList.contains('collapsed'));
    });
  }

  const btnToggleTelemHud = document.getElementById('btn-toggle-telemetry-hud');
  if (btnToggleTelemHud) {
    btnToggleTelemHud.addEventListener('click', () => {
      const p = document.getElementById('telemetry-panel');
      p.classList.toggle('collapsed');
      btnToggleTelemHud.classList.toggle('active', !p.classList.contains('collapsed'));
    });
  }

  // Quiz Modal
  const btnQuiz = document.getElementById('btn-open-quiz');
  if (btnQuiz) btnQuiz.addEventListener('click', openClassQuizModal);

  const btnCloseQuiz = document.getElementById('btn-close-quiz');
  if (btnCloseQuiz) btnCloseQuiz.addEventListener('click', closeClassQuizModal);

  const btnQuizNext = document.getElementById('btn-quiz-next');
  if (btnQuizNext) btnQuizNext.addEventListener('click', nextQuizQuestion);

  // Sliders de simulación
  const sliderRods = document.getElementById('sim-slider-rods');
  if (sliderRods) {
    sliderRods.addEventListener('input', (e) => {
      SMR_STATE.controlRodsInsertion = parseInt(e.target.value);
      document.getElementById('val-disp-rods').textContent = `${e.target.value}%`;
      updatePhysics();
    });
  }

  const sliderDemand = document.getElementById('sim-slider-demand');
  if (sliderDemand) {
    sliderDemand.addEventListener('input', (e) => {
      SMR_STATE.steamDemand = parseInt(e.target.value);
      document.getElementById('val-disp-demand').textContent = `${e.target.value}%`;
      updatePhysics();
    });
  }

  const btnScram = document.getElementById('btn-trigger-scram');
  if (btnScram) btnScram.addEventListener('click', triggerScram);

  // Atajos de Teclado
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

    if (e.code === 'Space') {
      e.preventDefault();
      toggleAudioPlayback();
    } else if (e.key === 'd' || e.key === 'D') {
      toggleAnimateExplode();
    } else if (e.key === 'c' || e.key === 'C') {
      setReactorDoorOpen(!SMR_STATE.isReactorDoorOpen);
    } else if (e.key === 'o' || e.key === 'O') {
      toggleCameraProjection();
    } else if (e.key === 'r' || e.key === 'R') {
      selectComponent(SMR_STATE.selectedComponentId, true);
    }
  });
}

function setTimeOfDay(time) {
  SMR_STATE.timeOfDay = time;
  const scene = SMR_STATE.scene;
  if (!scene) return;

  if (time === 'cad-studio') {
    scene.background = new THREE.Color(0x0a101d); // Nave técnica industrial claroscuro
    if (scene.fog) scene.fog.color.setHex(0x0a101d);
  } else if (time === 'day') {
    scene.background = new THREE.Color(0x111c2e); // Iluminación de inspección diurna
    if (scene.fog) scene.fog.color.setHex(0x111c2e);
  } else if (time === 'sunset') {
    scene.background = new THREE.Color(0x18181b); // Focos de turno de tarde
    if (scene.fog) scene.fog.color.setHex(0x18181b);
  } else if (time === 'night') {
    scene.background = new THREE.Color(0x050811); // Noche técnica profunda con luminiscencia UHS
    if (scene.fog) scene.fog.color.setHex(0x050811);
  }
}

// ==========================================================================
// 18. FÍSICA Y TELEMETRÍA EN TIEMPO REAL
// ==========================================================================
function updatePhysics() {
  const rods = SMR_STATE.controlRodsInsertion;

  if (SMR_STATE.isScram) {
    SMR_STATE.thermalPowerMWth = Math.max(0, SMR_STATE.thermalPowerMWth * 0.98);
    SMR_STATE.electricPowerMWe = 0;
    SMR_STATE.coolantTempC = Math.max(260, SMR_STATE.coolantTempC - 0.2);
    SMR_STATE.steamFlowTph = Math.max(0, SMR_STATE.steamFlowTph - 4);
  } else {
    const rodFactor = Math.max(0, (100 - rods) / 100);
    const maxPower = SMR_MODELS_DATA[SMR_STATE.activeModel].powerTherm;
    const maxElect = SMR_MODELS_DATA[SMR_STATE.activeModel].powerElect;

    SMR_STATE.thermalPowerMWth = Math.round(maxPower * Math.pow(rodFactor, 1.05));
    SMR_STATE.electricPowerMWe = Math.round(maxElect * Math.pow(rodFactor, 1.1) * (SMR_STATE.steamDemand / 100));
    SMR_STATE.coolantTempC = Math.round(290 + 35 * rodFactor);
    SMR_STATE.steamFlowTph = Math.round(680 * (SMR_STATE.electricPowerMWe / 470));
  }

  // Actualizar UI de telemetría
  const elTherm = document.getElementById('kpi-val-thermal');
  const elElect = document.getElementById('kpi-val-electric');
  const elTemp = document.getElementById('kpi-val-temp');
  const elPress = document.getElementById('kpi-val-press');
  const elFlow = document.getElementById('kpi-val-steam');
  const elEff = document.getElementById('kpi-val-eff');

  if (elTherm) elTherm.textContent = SMR_STATE.thermalPowerMWth.toLocaleString();
  if (elElect) elElect.textContent = SMR_STATE.electricPowerMWe.toLocaleString();
  if (elTemp) elTemp.textContent = SMR_STATE.coolantTempC;
  if (elPress) elPress.textContent = SMR_STATE.coolantPressureBar;
  if (elFlow) elFlow.textContent = SMR_STATE.steamFlowTph;
  if (elEff) elEff.textContent = SMR_STATE.electricPowerMWe > 0 ? SMR_STATE.efficiencyPercent : '0.0';
}

function triggerScram() {
  SMR_STATE.isScram = true;
  SMR_STATE.controlRodsInsertion = 100;
  const slider = document.getElementById('sim-slider-rods');
  if (slider) slider.value = 100;
  document.getElementById('val-disp-rods').textContent = '100% (SCRAM)';
  const badge = document.getElementById('reactor-state-badge');
  if (badge) {
    badge.textContent = '🚨 DISPARO SCRAM';
    badge.className = 'reactor-state-badge scram';
  }
}

function flyCameraTo(targetPos, lookAtTarget, duration = 1.0) {
  const camera = SMR_STATE.camera;
  const controls = SMR_STATE.controls;
  if (!camera || !controls) return;

  const targetLook = new THREE.Vector3(lookAtTarget.x, lookAtTarget.y, lookAtTarget.z);
  const targetCam = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);

  // Garantizar que la distancia cámara-objetivo nunca sea cero o infinitesimal
  if (targetCam.distanceTo(targetLook) < 4.0) {
    targetCam.copy(targetLook).add(new THREE.Vector3(0, 4, 16));
  }

  startSafeCameraFlight(targetCam, targetLook, duration);
}

function toggleCameraProjection() {
  SMR_STATE.isOrthographic = !SMR_STATE.isOrthographic;
  const controls = SMR_STATE.controls;
  if (!controls) return;
  const aspect = window.innerWidth / window.innerHeight;

  if (SMR_STATE.isOrthographic) {
    const dist = SMR_STATE.perspCamera.position.distanceTo(controls.target);
    const frustumHeight = Math.max(22, dist * 0.7);

    SMR_STATE.orthoCamera.position.copy(SMR_STATE.perspCamera.position);
    SMR_STATE.orthoCamera.left = -frustumHeight * aspect / 2;
    SMR_STATE.orthoCamera.right = frustumHeight * aspect / 2;
    SMR_STATE.orthoCamera.top = frustumHeight / 2;
    SMR_STATE.orthoCamera.bottom = -frustumHeight / 2;
    SMR_STATE.orthoCamera.updateProjectionMatrix();

    SMR_STATE.camera = SMR_STATE.orthoCamera;
    controls.object = SMR_STATE.orthoCamera;
  } else {
    SMR_STATE.perspCamera.position.copy(SMR_STATE.orthoCamera.position);
    SMR_STATE.perspCamera.aspect = aspect;
    SMR_STATE.perspCamera.updateProjectionMatrix();

    SMR_STATE.camera = SMR_STATE.perspCamera;
    controls.object = SMR_STATE.perspCamera;
  }
  controls.update();

  const btnOrtho = document.getElementById('btn-toggle-ortho');
  if (btnOrtho) {
    btnOrtho.classList.toggle('active', SMR_STATE.isOrthographic);
    btnOrtho.innerHTML = SMR_STATE.isOrthographic ? '📐 Ortográfica CAD [Activa]' : '📐 Proyección CAD';
  }
}

// ==========================================================================
// 20. GUÍA VIRTUAL DOCENTE (DRA. ELENA ALARCÓN)
// ==========================================================================
let synth = window.speechSynthesis;

function updateTourStop(index, autoSpeak = true) {
  if (index < 0 || index >= TOUR_STOPS.length) return;
  SMR_STATE.currentStopIndex = index;
  const stop = TOUR_STOPS[index];

  if (stop.compTarget) {
    selectComponent(stop.compTarget, false);
  }

  flyCameraTo(stop.camera, { x: stop.camera.targetX, y: stop.camera.targetY, z: stop.camera.targetZ });

  const elBadge = document.getElementById('tour-stop-badge');
  const elPart = document.getElementById('tour-stop-target');
  const elTitle = document.getElementById('guide-speech-title');
  const elText = document.getElementById('guide-speech-text');

  if (elBadge) elBadge.textContent = `Parada ${index + 1} de ${TOUR_STOPS.length}`;
  if (elPart) elPart.textContent = stop.part;
  if (elTitle) elTitle.textContent = stop.title;
  if (elText) elText.textContent = stop.speech;

  updateStopDots(index);

  if (autoSpeak && !SMR_STATE.isAudioMuted) {
    speakGuideText(stop.speech);
  }
}

function updateStopDots(activeIndex) {
  const container = document.getElementById('guide-stops-dots');
  if (!container) return;
  container.innerHTML = TOUR_STOPS.map((_, i) => `
    <div class="stop-dot ${i === activeIndex ? 'active' : (i < activeIndex ? 'visited' : '')}"
         onclick="updateTourStop(${i}, true)"
         title="Ir a parada ${i + 1}"></div>
  `).join('');
}

function speakGuideText(text) {
  if (!synth) return;
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES';
  utterance.rate = SMR_STATE.speechRate;
  utterance.pitch = 1.05;

  const voices = synth.getVoices();
  const esVoice = voices.find(v => v.lang.startsWith('es') && (v.name.includes('Google') || v.name.includes('Helena') || v.name.includes('Natural') || v.name.includes('Monica')));
  if (esVoice) utterance.voice = esVoice;

  utterance.onstart = () => {
    SMR_STATE.isSpeaking = true;
    updateVoiceUI(true);
  };
  utterance.onend = () => {
    SMR_STATE.isSpeaking = false;
    updateVoiceUI(false);
  };
  utterance.onerror = () => {
    SMR_STATE.isSpeaking = false;
    updateVoiceUI(false);
  };

  synth.speak(utterance);
}

function toggleAudioPlayback() {
  if (!synth) return;
  if (synth.speaking && !synth.paused) {
    synth.pause();
    updateVoiceUI(false);
  } else if (synth.paused) {
    synth.resume();
    updateVoiceUI(true);
  } else {
    const stop = TOUR_STOPS[SMR_STATE.currentStopIndex];
    if (stop) speakGuideText(stop.speech);
  }
}

function updateVoiceUI(speaking) {
  const dot = document.getElementById('guide-status-dot');
  const btn = document.getElementById('btn-play-pause-speech');
  const wave = document.getElementById('guide-voice-indicator');

  if (dot) dot.classList.toggle('speaking', speaking);
  if (wave) wave.classList.toggle('speaking', speaking);
  if (btn) btn.innerHTML = speaking ? '⏸ Pausa' : '▶ Escuchar';
}

// ==========================================================================
// 21. EVALUACIÓN Y QUIZ EN EL AULA
// ==========================================================================
let currentQuizIndex = 0;
let userQuizScore = 0;

function openClassQuizModal() {
  currentQuizIndex = 0;
  userQuizScore = 0;
  renderQuizQuestion();
  const backdrop = document.getElementById('quiz-backdrop');
  if (backdrop) backdrop.classList.add('open');
}

function closeClassQuizModal() {
  const backdrop = document.getElementById('quiz-backdrop');
  if (backdrop) backdrop.classList.remove('open');
}

function renderQuizQuestion() {
  const qData = CLASS_QUIZ_QUESTIONS[currentQuizIndex];
  if (!qData) {
    renderQuizFinalScore();
    return;
  }

  const qNum = document.getElementById('quiz-q-num');
  const qText = document.getElementById('quiz-q-text');
  const optList = document.getElementById('quiz-options-list');
  const explBox = document.getElementById('quiz-explanation-box');
  const btnNext = document.getElementById('btn-quiz-next');

  if (qNum) qNum.textContent = `Pregunta ${currentQuizIndex + 1} de ${CLASS_QUIZ_QUESTIONS.length}`;
  if (qText) qText.textContent = qData.q;
  if (explBox) explBox.style.display = 'none';
  if (btnNext) btnNext.style.display = 'none';

  if (optList) {
    optList.innerHTML = qData.options.map((opt, i) => `
      <button class="quiz-opt-btn" onclick="selectQuizOption(${i})">
        ${opt.text}
      </button>
    `).join('');
  }
}

function selectQuizOption(optIndex) {
  const qData = CLASS_QUIZ_QUESTIONS[currentQuizIndex];
  const buttons = document.querySelectorAll('.quiz-opt-btn');
  const explBox = document.getElementById('quiz-explanation-box');
  const btnNext = document.getElementById('btn-quiz-next');

  buttons.forEach((btn, idx) => {
    btn.disabled = true;
    if (qData.options[idx].isCorrect) {
      btn.classList.add('correct');
    } else if (idx === optIndex) {
      btn.classList.add('incorrect');
    }
  });

  if (qData.options[optIndex].isCorrect) userQuizScore++;

  if (explBox) {
    explBox.innerHTML = `<strong>💡 Explicación Técnica:</strong> ${qData.explanation}`;
    explBox.style.display = 'block';
  }
  if (btnNext) btnNext.style.display = 'inline-flex';
}

function nextQuizQuestion() {
  currentQuizIndex++;
  renderQuizQuestion();
}

function renderQuizFinalScore() {
  const qNum = document.getElementById('quiz-q-num');
  const qText = document.getElementById('quiz-q-text');
  const optList = document.getElementById('quiz-options-list');
  const explBox = document.getElementById('quiz-explanation-box');
  const btnNext = document.getElementById('btn-quiz-next');

  if (qNum) qNum.textContent = 'Evaluación Completada';
  if (qText) qText.textContent = `Resultado: ${userQuizScore} de ${CLASS_QUIZ_QUESTIONS.length} correctas`;

  const percent = Math.round((userQuizScore / CLASS_QUIZ_QUESTIONS.length) * 100);
  if (optList) {
    optList.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <div style="font-size: 3rem; font-family: var(--font-display); color: var(--accent-cyan); font-weight: 800;">${percent}%</div>
        <p style="color: #cbd5e1; font-size: 0.95rem; margin-top: 10px;">Excelente sesión didáctica de ingeniería y economía SMR.</p>
        <button class="btn-header primary" style="margin: 20px auto 0 auto;" onclick="openClassQuizModal()">
          🔄 Repetir Evaluación
        </button>
      </div>
    `;
  }
  if (explBox) explBox.style.display = 'none';
  if (btnNext) btnNext.style.display = 'none';
}

// ==========================================================================
// 22. BUCLE DE RENDERIZADO, PROYECCIÓN DE ETIQUETAS Y ANIMACIÓN
// ==========================================================================
let clock = new THREE.Clock();

function updateCalloutTag3D() {
  if (!SMR_STATE.camera) return;

  const svgLinesGroup = document.getElementById('cad-svg-lines-group');
  const svgNodesGroup = document.getElementById('cad-svg-nodes-group');
  let linesMarkup = '';
  let nodesMarkup = '';
  const now = performance.now();

  // 1. Etiqueta 3D Flotante con Puntero CAD al Componente Activo Seleccionado
  const tagEl = document.getElementById('smr-3d-callout-tag');
  const selCompId = SMR_STATE.selectedComponentId;
  const selComp = SMR_COMPONENTS_DATA[selCompId];

  if (tagEl) {
    if (!selComp || !selComp.anchorPos3D) {
      tagEl.classList.add('hidden');
    } else {
      let worldPos = selComp.anchorPos3D.clone();
      if (SMR_STATE.explodedProgress > 0 && gComponentMeshMap[selCompId] && gComponentMeshMap[selCompId][0]) {
        const primaryMesh = gComponentMeshMap[selCompId][0];
        if (primaryMesh.userData && primaryMesh.userData.explodedOffset) {
          worldPos.addScaledVector(primaryMesh.userData.explodedOffset, SMR_STATE.explodedProgress);
        }
      }

      const screenPos = worldPos.clone().project(SMR_STATE.camera);
      if (screenPos.z > 1.0) {
        tagEl.classList.add('hidden');
      } else {
        tagEl.classList.remove('hidden');

        const targetX = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
        const targetY = (-(screenPos.y * 0.5) + 0.5) * window.innerHeight;

        const isCore = (selCompId === 'core');
        const themeColor = isCore ? '#f97316' : '#00f0ff';
        const themeFilter = isCore ? 'url(#cad-glow-amber)' : 'url(#cad-glow-cyan)';

        // Posicionar tarjeta flotante sin tapar el componente ni otros elementos
        let cardOffsetX = -130;
        let cardOffsetY = -80;
        if (selCompId === 'pool') {
          // Para la piscina UHS, situar la tarjeta holgadamente a la izquierda sobre el agua
          cardOffsetX = -135;
          cardOffsetY = -45;
        } else if (selCompId === 'core') {
          cardOffsetX = 90;
          cardOffsetY = -80;
        } else if (targetX < window.innerWidth * 0.40) {
          cardOffsetX = 100;
        }

        const cardX = Math.max(160, Math.min(window.innerWidth - 320, targetX + cardOffsetX));
        const cardY = Math.max(130, Math.min(window.innerHeight - 100, targetY + cardOffsetY));

        tagEl.style.left = `${cardX}px`;
        tagEl.style.top = `${cardY}px`;

        // Punto de anclaje de salida de la línea CAD
        const cardStartX = (targetX > cardX) ? (cardX + 90) : (cardX - 90);
        const cardStartY = cardY + 15;

        // Línea de conexión CAD recta y fina con resplandor neón
        linesMarkup += `
          <line x1="${cardStartX.toFixed(1)}" y1="${cardStartY.toFixed(1)}" x2="${targetX.toFixed(1)}" y2="${targetY.toFixed(1)}" stroke="${themeColor}" stroke-width="1.8" filter="${themeFilter}" />
          <line x1="${cardStartX.toFixed(1)}" y1="${cardStartY.toFixed(1)}" x2="${targetX.toFixed(1)}" y2="${targetY.toFixed(1)}" stroke="#ffffff" stroke-width="0.8" opacity="0.95" />
        `;

        // Nodo concéntrico brillante en la superficie de la pieza
        const pingR = 7 + ((now % 1400) / 1400) * 12;
        const pingOp = Math.max(0, 1 - (now % 1400) / 1400);
        nodesMarkup += `
          <g transform="translate(${targetX.toFixed(1)}, ${targetY.toFixed(1)})">
            <circle cx="0" cy="0" r="${pingR.toFixed(1)}" fill="none" stroke="${themeColor}" stroke-width="1.2" opacity="${pingOp.toFixed(2)}" />
            <circle cx="0" cy="0" r="7.5" fill="rgba(4, 18, 32, 0.85)" stroke="${themeColor}" stroke-width="1.8" filter="${themeFilter}" />
            <line x1="-12" y1="0" x2="-8.5" y2="0" stroke="${themeColor}" stroke-width="1.2" />
            <line x1="8.5" y1="0" x2="12" y2="0" stroke="${themeColor}" stroke-width="1.2" />
            <line x1="0" y1="-12" x2="0" y2="-8.5" stroke="${themeColor}" stroke-width="1.2" />
            <line x1="0" y1="8.5" x2="0" y2="12" stroke="${themeColor}" stroke-width="1.2" />
            <circle cx="0" cy="0" r="2.8" fill="#ffffff" />
          </g>
        `;
      }
    }
  }

  // Asegurar que las etiquetas fijas secundarias estén siempre ocultas (Cero etiquetas flotantes por defecto)
  const pinIds = ['pin-seismic-supports', 'pin-steam-lines', 'pin-pool-uhs', 'pin-heat-exchangers', 'pin-reactor-core'];
  pinIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  });

  if (svgLinesGroup) svgLinesGroup.innerHTML = linesMarkup;
  if (svgNodesGroup) svgNodesGroup.innerHTML = nodesMarkup;
}

function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  // 1. Interpolación de Cámara Estable y Suave (Ease-out cúbico rápido sin giros bruscos)
  if (safeFlight.active && SMR_STATE.camera && SMR_STATE.controls) {
    safeFlight.progress += delta / safeFlight.duration;
    if (safeFlight.progress >= 1.0) {
      safeFlight.progress = 1.0;
      safeFlight.active = false;
      SMR_STATE.controls.target.copy(safeFlight.targetLook);
      SMR_STATE.camera.position.copy(safeFlight.targetPos);
    } else {
      const t = safeFlight.progress;
      const ease = 1 - Math.pow(1 - t, 3);
      SMR_STATE.controls.target.lerpVectors(safeFlight.startLook, safeFlight.targetLook, ease);
      SMR_STATE.camera.position.lerpVectors(safeFlight.startPos, safeFlight.targetPos, ease);
    }

    // Watchdog de separación mínima física
    const curDist = SMR_STATE.camera.position.distanceTo(SMR_STATE.controls.target);
    if (curDist < 2.5 || isNaN(curDist)) {
      SMR_STATE.camera.position.copy(SMR_STATE.controls.target).add(new THREE.Vector3(0, 4, 15));
    }
  }

  // 2. Watchdog global anti-NaN en caso de cualquier anomalía
  if (SMR_STATE.camera && (isNaN(SMR_STATE.camera.position.x) || isNaN(SMR_STATE.controls.target.x))) {
    SMR_STATE.camera.position.set(13, 14, 18);
    SMR_STATE.controls.target.set(0, 10.5, 0);
  }

  if (SMR_STATE.controls) SMR_STATE.controls.update();

  // 3. Resaltado armónico pulsante de Neón tecnológico y Glow volumétrico
  const highlightPulse = 0.82 + 0.18 * Math.sin(performance.now() * 0.0055);
  if (gPoolNeonRimGroup && gPoolNeonRimGroup.visible) {
    gPoolNeonRimGroup.children.forEach(c => {
      if (c.material && c.material.opacity !== undefined) {
        if (c.geometry instanceof THREE.BoxGeometry) {
          c.material.opacity = 0.12 * highlightPulse;
        } else {
          c.material.opacity = 0.85 * highlightPulse;
        }
      }
    });
  }
  if (gSelectionHighlightGroup && gSelectionHighlightGroup.children.length > 0) {
    gSelectionHighlightGroup.children.forEach(c => {
      if (c instanceof THREE.LineSegments && c.material) {
        c.material.opacity = 0.92 * highlightPulse;
      } else if (c.material && c.material.opacity !== undefined) {
        c.material.opacity = 0.22 * highlightPulse;
      }
    });
  }

  const pulseVal = 0.18 + 0.08 * Math.sin(performance.now() * 0.005);
  const selId = SMR_STATE.selectedComponentId;
  gInteractiveMeshes.forEach(mesh => {
    if (mesh.material && mesh.material.emissive) {
      if (mesh.userData && mesh.userData.componentId === selId) {
        if (mesh.material === gMaterials.concrete ||
            mesh.material === gMaterials.poolLiner ||
            mesh.material === gMaterials.waterSurface) {
          mesh.material.emissive.setHex(0x000000);
          mesh.material.emissiveIntensity = 0;
        } else {
          const emColor = (selId === 'core') ? 0xf97316 : 0x00f0ff;
          mesh.material.emissive.setHex(emColor);
          mesh.material.emissiveIntensity = pulseVal * 1.5;
        }
      } else if (mesh.material === gMaterials.zircaloy) {
        // Brillo térmico operativo permanente de fisión nuclear en las vainas de combustible
        mesh.material.emissive.setHex(0xff5500);
        mesh.material.emissiveIntensity = 0.58 + 0.14 * Math.sin(performance.now() * 0.003);
      } else if (mesh.material !== gMaterials.concrete &&
                 mesh.material !== gMaterials.poolLiner &&
                 mesh.material !== gMaterials.waterSurface) {
        if (mesh.material.emissive.getHex() !== 0x000000) {
          mesh.material.emissive.setHex(0x000000);
          mesh.material.emissiveIntensity = 0;
        }
      }
    }
  });

  // 4. Actualizar proyección de la etiqueta 3D flotante con líneas CAD y nodos concéntricos
  updateCalloutTag3D();

  // 5. Animación de convección térmica del circuito primario (Rigor Termodinámico)
  // Confinada dentro del corte del reactor: partículas rojas/naranjas subiendo por el riser central
  // y partículas azules frías bajando por el canal anular (downcomer) tras pasar por el generador de vapor
  if (gPrimaryConvectionParticles && gPrimaryConvectionParticles.points) {
    const posAttr = gPrimaryConvectionParticles.points.geometry.attributes.position;
    const count = posAttr.count;
    for (let i = 0; i < count; i++) {
      let y = posAttr.getY(i);
      const spd = gPrimaryConvectionParticles.speeds[i];
      const isRiser = gPrimaryConvectionParticles.isRiser[i];
      if (isRiser) {
        y += spd * delta;
        if (y > 11.2) {
          y = 3.2 + Math.random() * 0.4;
        }
      } else {
        y -= spd * delta;
        if (y < 3.2) {
          y = 11.2 - Math.random() * 0.4;
        }
      }
      posAttr.setY(i, y);
    }
    posAttr.needsUpdate = true;
  }

  // Ondulación sutil y dinámica de la superficie del agua en la piscina
  if (gMaterials.waterSurface && gMaterials.waterSurface.normalMap) {
    gMaterials.waterSurface.normalMap.offset.x += 0.012 * delta;
    gMaterials.waterSurface.normalMap.offset.y += 0.008 * delta;
  }

  // 6. Actualizar simulación física
  updatePhysics();

  // 7. Renderizar fotograma
  if (SMR_STATE.renderer && SMR_STATE.scene && SMR_STATE.camera) {
    SMR_STATE.renderer.render(SMR_STATE.scene, SMR_STATE.camera);
  }
}

function onWindowResize() {
  if (!SMR_STATE.renderer) return;
  const aspect = window.innerWidth / window.innerHeight;

  if (SMR_STATE.perspCamera) {
    SMR_STATE.perspCamera.aspect = aspect;
    SMR_STATE.perspCamera.updateProjectionMatrix();
  }

  if (SMR_STATE.orthoCamera) {
    const frustumHeight = 32;
    SMR_STATE.orthoCamera.left = -frustumHeight * aspect / 2;
    SMR_STATE.orthoCamera.right = frustumHeight * aspect / 2;
    SMR_STATE.orthoCamera.top = frustumHeight / 2;
    SMR_STATE.orthoCamera.bottom = -frustumHeight / 2;
    SMR_STATE.orthoCamera.updateProjectionMatrix();
  }

  SMR_STATE.renderer.setSize(window.innerWidth, window.innerHeight);
}

// Iniciar al cargar el DOM
window.addEventListener('DOMContentLoaded', () => {
  init3DExplorer();
});
