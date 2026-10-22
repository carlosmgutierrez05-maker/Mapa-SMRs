# MEMORIA DE INVESTIGACIÓN TÉCNICO-ECONÓMICA
## Los Reactores Modulares Pequeños (SMR): Integración en el Mercado Energético, Mitigación de CO₂ y la Hoja de Ruta Europea 2030-2040

---

**Asignatura:** Economía de los Sistemas Energéticos  
**Titulación:** Grado en Ingeniería Energética  
**Centro:** Escuela de Ingenierías Industriales · Universidad de Valladolid (UVa)  
**Departamento:** Organización de Empresas y Comercialización e Investigación de Mercados (OECIM)  
**Curso Académico:** 2026-2027  
**Herramienta Digital Asociada:** Visualizador Georreferenciado y Simulador de Mercado SMR-ENERGY ECONOMICS (`ABRIR_MAPA_SMR.bat`)

---

## 1. Introducción y Justificación Técnico-Económica

En el marco de la transición ecológica de la Unión Europea y el compromiso vinculante de alcanzar la neutralidad climática en 2050 con un objetivo intermedio del **-90% de emisiones netas de gases de efecto invernadero para 2040**, el diseño del sistema energético afronta un reto tripartito clásico: **sostenibilidad medioambiental**, **competitividad económica** y **seguridad de suministro** (el "Trilema Energético").

La energía nuclear tradicional de gran potencia (reactores de Generación III/III+ de 1.000 a 1.600 MWe, tales como el EPR-1600 o el AP1000) ha demostrado ser una fuente firme libre de emisiones directas; sin embargo, en el contexto financiero y de mercado europeo ha tropezado con barreras económicas casi insalvables:
1. **Inversión de capital inicial prohibitiva:** Proyectos que requieren entre 8.000 y 15.000 millones de euros por unidad.
2. **Plazos de construcción excesivos:** Retrasos de 10 a 15 años (ej. Flamanville-3 u Olkiluoto-3).
3. **Elevadísimos costes por intereses durante la construcción (IDC - Interest During Construction):** El capital inmovilizado durante más de una década encarece drásticamente el Coste Nivelado de la Electricidad (LCOE) final.
4. **Riesgo financiero asimétrico:** Pocas empresas de servicios públicos (*utilities*) o consorcios privados pueden asumir tal concentración de riesgo en su balance.

Frente a este paradigma, los **Reactores Modulares Pequeños (SMR - Small Modular Reactors)**, con potencias comprendidas entre **10 y 300 MWe** (e incluso microrreactores de <20 MWe), representan una **ruptura del modelo económico**:
- **Sustitución de economías de escala por economías de serie (múltiplos):** En lugar de perseguir la escala unitaria máxima, el reactor se fabrica de forma seriada y estandarizada en un taller o fábrica centralizada (*factory fabrication*), transportando los módulos preensamblados por ferrocarril, barcaza o camión al emplazamiento.
- **Tiempos de obra reducidos a 36-42 meses:** Lo que minimiza radicalmente los costes financieros (IDC) y permite un retorno de la inversión mucho más temprano.
- **Flexibilidad de modularidad incremental:** El promotor puede instalar un primer módulo de 300 MWe, generar flujos de caja operativos y autofinanciar la construcción de los módulos subsiguientes.

---

## 2. Integración en el Mercado Energético Eléctrico

La asignatura de *Economía de los Sistemas Energéticos* analiza en profundidad el funcionamiento de los mercados mayoristas (mercado diario e intradiario marginalista), la casación de ofertas y la prestación de servicios del sistema. La integración de los SMRs redefine este escenario:

### 2.1. Casación Marginalista y Convivencia con Renovables Intermitentes
Tradicionalmente, la energía nuclear operaba como **carga base inflexible** (*must-run*), ofertando a coste variable cero o negativo para garantizar su funcionamiento al 100% de potencia nominal las 8.760 horas del año. En mercados con una penetración masiva de energía solar fotovoltaica y eólica, este comportamiento genera problemas de sobreoferta en horas centrales del día (precios cero o negativos) y canibalización de ingresos.

Los SMRs modernos de agua ligera (como el **BWRX-300** de GE Hitachi, el **Rolls-Royce SMR** o el **Nuward** de EDF) incorporan desde su diseño básico la capacidad de **seguimiento de carga rápido (Load-Following)**:
- Capacidad de modulación del **5% de la potencia nominal por minuto** entre el 20% y el 100% de carga.
- Esto permite al operador reducir la potencia eléctrica inyectada a la red durante las horas de pico solar sin sufrir estrés térmico perjudicial en los componentes primarios.
- El calor primario excedente puede ser derivado a sistemas de almacenamiento térmico (como en el reactor **Natrium** de TerraPower con sales fundidas) o a procesos de cogeneración de hidrógeno y vapor.

### 2.2. Provisión de Servicios Complementarios de Ajuste del Sistema (System Services)
La transición hacia un sistema dominado por inversores electrónicos (energía fotovoltaica y eólica asíncrona) reduce la **inercia física síncrona** del sistema interconectado europeo (ENTSO-E). Cuando la inercia total cae, cualquier perturbación (el disparo de una línea o una subestación) provoca una tasa de variación de frecuencia ($df/dt$ o RoCoF) muy acusada, amenazando con apagones sistémicos (*blackouts*).

Los SMRs aportan:
1. **Inercia física instantánea:** Mediante las grandes masas rotatorias de sus turbogeneradores síncronos convencionales acoplados a la red (constante de inercia $H \approx 4-6 \text{ s}$).
2. **Reserva de regulación primaria (FCR) y secundaria (aFRR):** Respuesta automática ante desviaciones de frecuencia de red.
3. **Control de tensión y potencia reactiva:** Inyección o absorción de MVAR en nudos críticos de la red de transporte sin necesidad de quemar gas natural en ciclos combinados.
4. **Capacidad de arranque autónomo (Black-Start):** Esencial para la restauración del suministro en caso de colapso de red.

---

## 3. Acoplamiento de Sectores (Sector Coupling) y Mercados Térmicos

Uno de los errores habituales en el análisis de la descarbonización es centrarse exclusivamente en el sector eléctrico. En la Unión Europea:
- Más del **50% de la energía final consumida es energía térmica (calor)**, destinada a procesos industriales y a la calefacción de edificios.
- Más del 70% de este calor proviene actualmente de la combustión de **gas natural, carbón y derivados del petróleo**.

Los SMRs son reactores multipropósito capaces de romper las fronteras entre el sector eléctrico y el térmico mediante el **acoplamiento sectorial**:

```
                       ┌─────────────────────────┐
                       │ Reactor Modular Pequeño │
                       │          (SMR)          │
                       └────────────┬────────────┘
                                    │ Calor Primario
            ┌───────────────────────┼───────────────────────┐
            │                       │                       │
            ▼                       ▼                       ▼
┌───────────────────────┐ ┌───────────────────┐ ┌───────────────────────┐
│ Turbina Síncrona      │ │ Vapor Industrial  │ │ Intercambiador Térmico│
│ Generación Eléctrica  │ │ Alta Temperatura  │ │ Red de Calor Urbano   │
│ Red / Carga Base      │ │ (300°C - 750°C)   │ │ (District Heating)    │
│ Load-Following        │ │ Química / Acero   │ │ Edificios / Ciudades  │
└───────────┬───────────┘ └─────────┬─────────┘ └───────────────────────┘
            │                       │
            └───────────┬───────────┘
                        ▼
            ┌───────────────────────┐
            │ Electrólisis SOEC     │
            │ Hidrógeno Verde (>85%)│
            └───────────────────────┘
```

### 3.1. Suministro de Vapor Industrial a Alta Temperatura
La industria química, petroquímica, papelera y farmacéutica requiere vapor a temperaturas de 200°C a 550°C (e incluso >700°C en siderurgia):
- Los reactores modulares de alta temperatura refrigerados por gas (**HTGR**, como el **Xe-100** de X-energy en la planta de Dow Chemical en Seadrift, Texas, o el prototipo comercial **HTR-PM** en Shidao Bay, China) entregan vapor a **565°C - 750°C**.
- En Francia, la empresa **Jimmy Energy** desarrolla microrreactores térmicos de 20 MWt dedicados exclusivamente a reemplazar las calderas de gas natural de fábricas alimentarias y papeleras, vendiendo vapor bajo el modelo *Heat-as-a-Service* (HaaS).
- En Polonia, el grupo químico **Synthos** (con OSGE) planea alimentar sus plantas de síntesis de caucho y polímeros en Oświęcim y Włocławek con vapor de SMRs BWRX-300, eliminando su exposición a las cuotas de emisión EU ETS.

### 3.2. Calefacción Urbana Distrital (District Heating)
En los países nórdicos y de Europa del Este, cientos de ciudades dependen de redes centralizadas de calefacción urbana que aún queman carbón, gas o biomasa forestal:
- **Steady Energy (Finlandia) - Reactor LDR-50:** Diseñado por el instituto VTT, es un reactor de 50 MWt que opera a baja temperatura (150°C) y muy baja presión (<10 bar). Su seguridad pasiva inherente permite construirlo en cavernas subterráneas en las inmediaciones de núcleos urbanos como Helsinki, Espoo o Kuopio. Al costar menos de 100 M€ por unidad, su coste nivelado del calor (LCOH) es de apenas **30-35 €/MWh térmico**, inferior al coste de quemar pellets o gas fósil con derechos de emisión.

### 3.3. Producción de Hidrógeno Limpio de Alta Eficiencia (SOEC)
La electrólisis convencional a baja temperatura (alcalina o PEM) alimentada con electricidad renovable variable tiene una eficiencia del 60-65% y un factor de utilización bajo (2.000 - 3.500 horas equivalentes).  
Al acoplar un SMR a una **celda de electrólisis de óxido sólido (SOEC)**:
- Se utiliza tanto el calor de vapor a alta temperatura como la electricidad continua del reactor.
- La energía térmica sustituye parte de la energía eléctrica teórica de disociación de la molécula de agua.
- La eficiencia global de conversión supera el **85%**, y el electrolizador opera a más de 8.000 horas al año, reduciendo el coste nivelado del hidrógeno limpio (LCOH2) por debajo de los **3 €/kg**.

---

## 4. Análisis Económico: Estructura de Costes, Curva de Aprendizaje y LCOE

### 4.1. Estructura de Costes de Capital (CAPEX)
El desglose típico del coste de capital en un SMR se estructura en:
1. **Fabricación del Sistema Nuclear de Suministro de Vapor (NSSS):** ~30-35% del CAPEX. Fabricado en taller con controles de calidad automatizados.
2. **Equipos convencionales (Turbina, generador, condensador):** ~20-25%. Empleo de turbinas estándar de vapor ya maduras en la industria fósil.
3. **Obra civil y contención subterránea compacta:** ~20-25% (frente a más del 45% en una gran central tradicional).
4. **Costes indirectos, ingeniería y licenciamiento:** ~15-20%.

### 4.2. Efecto Serie y Curva de Aprendizaje (FOAK vs. NOAK)
El primer reactor de su clase (**FOAK - First of a Kind**) asume todos los costes de desarrollo, homologación de proveedores y primeras pruebas de montaje:
- **FOAK CAPEX:** 5.000 - 7.500 €/kWe; LCOE de **85 - 105 €/MWh**.
- **NOAK CAPEX (a partir de la unidad 8-10):** 3.800 - 4.500 €/kWe; LCOE de **50 - 65 €/MWh**.

La reducción de costes responde a la tasa de aprendizaje industrial ($LR \approx 10-15\%$ de reducción de coste por duplicación de volumen acumulado fabricado en taller):
$$C(N) = C_1 \cdot N^{-b}$$
donde $b = -\frac{\ln(1 - LR)}{\ln 2}$. Al fabricar en una línea de ensamblaje continua en fábrica, la productividad laboral y la repetibilidad superan con creces las condiciones de una obra a la intemperie.

### 4.3. Comparativa de LCOE y Sensibilidad frente a EU ETS
En la asignatura de Economía de los Sistemas Energéticos, el Coste Nivelado de la Electricidad se calcula como:

$$LCOE = \frac{\sum_{t=0}^{N} \frac{I_t + M_t + F_t + D_t}{(1+r)^t}}{\sum_{t=1}^{N} \frac{E_t}{(1+r)^t}}$$

Donde $I_t$ es el CAPEX, $M_t$ los costes de O&M, $F_t$ el ciclo de combustible, $D_t$ el fondo de desmantelamiento/residuos, $r$ la tasa de descuento (WACC) y $E_t$ la producción eléctrica.

#### Comparativa de LCOE en Europa (Horizonte 2030-2035):

| Tecnología de Generación | CAPEX (€/kWe) | Factor Capacidad (%) | Coste Combustible (€/MWh) | Impacto CO₂ EU ETS (a 80€/t) | LCOE Medio Estimado (€/MWh) |
|---|---|---|---|---|---|
| **SMR Comercial (NOAK 300 MWe)** | 4.200 - 4.800 | 90 - 94% | 6 - 8 (Uranio/MOX) | 0 €/MWh (Exento) | **54 - 65 €/MWh** |
| **Ciclo Combinado Gas (CCGT)** | 850 - 1.100 | 60 - 85% | 55 - 68 (Gas 35€/MWh_t) | **+30,4 €/MWh** | **95 - 115 €/MWh** |
| **Fotovoltaica + Batería BESS (4h)** | 600 + 750 | 22% (FV equivalente) | 0 | 0 | **72 - 85 €/MWh** (Firmeza limitada) |
| **Gran Nuclear Tradicional (FOAK)** | 8.500 - 11.000 | 88 - 92% | 6 - 8 | 0 | **95 - 130 €/MWh** |

**Conclusión económica:** En un marco de derechos de emisión de carbono de la UE (EU ETS) cotizando por encima de **70-80 €/t CO₂**, los SMRs no sólo son más baratos que el gas natural para suministro continuo, sino que ejercen de **cobertura financiera física** (*hedge*) contra la volatilidad geopolítica del precio del gas importado.

---

## 5. La Estrategia de la Unión Europea y la Alianza Industrial de SMRs (2024-2040)

### 5.1. El Lanzamiento de la Alianza Industrial Europea de SMRs (Febrero 2024)
La Comisión Europea (Dirección General de Energía - DG ENER) oficializó el 6 de febrero de 2024 la creación de la **Alianza Industrial Europea sobre SMRs**. Su misión fundacional es estructurar la cadena de valor industrial comunitaria para que el **primer reactor modular pequeño de la UE esté operando entre 2030 y 2035**.

La Alianza se articula en **9 Grupos de Trabajo Técnicos (Technical Working Groups - TWGs)**:
1. *TWG 1: Aplicaciones industriales y calor urbano:* Identificación de polos industriales químicos, siderúrgicos y de papel.
2. *TWG 2: Financiación y modelos de negocio:* Estructuración de mecanismos de apoyo del Banco Europeo de Inversiones (BEI), Fondo de Innovación y taxonomía verde europea.
3. *TWG 3: Cadena de suministro:* Fortalecimiento de la forja pesada, vasijas de presión y componentes críticos en la UE.
4. *TWG 4: Armonización regulatoria:* Coordinación entre las autoridades nucleares nacionales (WENRA y ENSREG) para permitir licencias tipo transferibles entre Estados miembros.
5. *TWG 5: Capacitación y capital humano:* Formación de ingenieros y técnicos nucleares en colaboración con universidades como la UVa.
6. *TWG 6: Gestión del ciclo de combustible y residuos:* Compatibilidad con repositorios geológicos profundos y reactores rápidos que queman residuos.
7. *TWG 7: Gobernanza y compromiso ciudadano:* Fomento de la transparencia y la participación de comunidades locales.
8. *TWG 8: Seguridad física y ciberseguridad.*
9. *TWG 9: Reactores Modulares Avanzados (AMR de Generación IV).*

### 5.2. Los Proyectos Insignia Seleccionados en Europa
En su primera evaluación de proyectos en otoño de 2024, la Alianza seleccionó proyectos prioritarios distribuidos en dos grandes vías tecnológicas:

1. **Vía 1: Reactores de Agua Ligera (Despliegue 2030-2035):**
   - **NUWARD (Francia):** 340 MWe (2x170 MWe) liderado por EDF, Framatome, CEA y Naval Group.
   - **BWRX-300 (Polonia y Estonia):** Despliegue masivo promovido por OSGE (hasta 24 unidades en Polonia) y Fermi Energia en Estonia.
   - **Rolls-Royce SMR (República Checa y Reino Unido):** En septiembre de 2024, la empresa estatal checa ČEZ seleccionó a Rolls-Royce para construir hasta 3.000 MWe en emplazamientos checos (Temelín, Dětmarovice).
   - **RoPower / NuScale VOYGR (Rumanía):** Complejo de 462 MWe en Doicești sustituyendo una central de carbón.
2. **Vía 2: Reactores Avanzados de Generación IV y Calor (Despliegue 2030-2040):**
   - **newcleo LFR (Francia/Italia):** Reactor rápido refrigerado por plomo (200 MWe) enfocado al cierre de ciclo de combustible MOX.
   - **Steady Energy LDR-50 (Finlandia):** 50 MWt para descarbonizar la calefacción urbana de Helsinki y Kuopio.
   - **Thorizon One (Países Bajos/Francia):** 35 MWe / 100 MWt de sales fundidas con combustible de torio.
   - **Jimmy Energy y NAAREA (Francia):** Microrreactores térmicos para el sector industrial.

### 5.3. El Papel del "Coal-to-Nuclear Repurposing"
Uno de los vectores más atractivos para la economía europea es la sustitución directa de centrales térmicas de carbón en cuencas mineras en reconversión. El informe de la Comisión Europea cuantifica un **ahorro de hasta el 30% del CAPEX total** gracias a:
- Reutilización de subestaciones eléctricas de 220/400 kV y líneas de alta tensión con capacidad de evacuación ya concedida.
- Concesiones hidrológicas de toma de agua de refrigeración existentes.
- Conexiones ferroviarias y de carreteras de transporte pesado.
- Preservación del empleo técnico de alta cualificación en regiones de Transición Justa (Silesia en Polonia, Jiu Valley en Rumanía, cuencas de Moravia en Chequia). En contraste, en España el PNIEC 2023-2030 contempla el cierre progresivo del parque nuclear (2027-2035) y la reconversión de los nudos industriales hacia el vector del hidrógeno verde con grandes electrolizadores (como el Valle Andaluz del Hidrógeno Verde de Moeve en Palos de la Frontera, Huelva, y San Roque) e hibridación renovable.

---

## 6. Balance Medioambiental y Mitigación de Emisiones de CO₂

El análisis de ciclo de vida (ACV o LCA) conforme a las normas ISO 14040/44 sitúa las emisiones de gases de efecto invernadero de la energía nuclear entre **5 y 12 g CO₂eq/kWh**, cifra parangonable e incluso inferior a la eólica marina y muy inferior a la solar fotovoltaica sobre suelo (25-45 g CO₂eq/kWh por la huella de refinado del polisilicio):

| Fuente de Generación | Emisiones Ciclo de Vida (g CO₂eq/kWh) | Factor Emisión Evitado vs SMR |
|---|---|---|
| **Central de Carbón (Hulla / Lignito)** | 850 - 1.100 | ~950 g CO₂ / kWh |
| **Ciclo Combinado de Gas Natural (CCGT)** | 380 - 450 | ~400 g CO₂ / kWh |
| **Mix Eléctrico Medio de la UE (2024)** | 220 - 260 | ~240 g CO₂ / kWh |
| **Reactor Modular Pequeño (SMR)** | **5 - 12** | **Referencia Base** |

### Cuantificación para un Reactor Típico de 300 MWe (92% Disponibilidad):
- Generación eléctrica anual: $E = 300 \text{ MWe} \times 8.760 \text{ h} \times 0,92 = 2.417.760 \text{ MWh/año} \approx 2,42 \text{ TWh/año}$.
- **CO₂ evitado anualmente frente a carbón:**  
  $$2.417.760 \text{ MWh} \times 0,950 \text{ t CO}_2\text{/MWh} = \mathbf{2.296.872 \text{ t CO}_2\text{/año}} \approx \mathbf{2,30 \text{ Mt CO}_2\text{/año}}$$
- **CO₂ evitado anualmente frente a ciclo combinado de gas:**  
  $$2.417.760 \text{ MWh} \times 0,400 \text{ t CO}_2\text{/MWh} = \mathbf{967.104 \text{ t CO}_2\text{/año}} \approx \mathbf{0,97 \text{ Mt CO}_2\text{/año}}$$
- **A lo largo de 60 años de vida operativa:**  
  Un solo SMR de 300 MWe evita la emisión de **138 millones de toneladas de CO₂** a la atmósfera frente al carbón, y **58 millones de toneladas** frente al gas natural.

---

## 7. Guía de Uso del Visualizador Georreferenciado y Simulador SMR

Para enriquecer la defensa del trabajo de investigación en clase y permitir al tribunal docente interactuar con los datos, se ha desarrollado el software **SMR-ENERGY ECONOMICS**:

### 7.1. Puesta en Marcha
1. En la carpeta raíz del proyecto, hacer doble clic sobre el archivo **`ABRIR_MAPA_SMR.bat`**.
2. La aplicación se abrirá de inmediato en el navegador web predeterminado en modo pantalla completa sin necesidad de instalar dependencias externas (funciona 100% *offline*).
3. Si se desea lanzar a través de un servidor local de desarrollo Python, se puede ejecutar `INICIAR_CON_SERVIDOR_LOCAL.bat` dentro de la subcarpeta `Visualizador_SMR_Economia_Energetica/`.

### 7.2. Funcionalidades Principales
- **Mapa Mundial Interactivo (Leaflet):** Más de 40 proyectos georreferenciados con precisión en Europa, Norteamérica y Asia con iconos distintivos por tecnología y estado.
- **Línea Temporal Post-2030:** Deslizador interactivo con botón *"Reproducir Evolución"* para observar cómo el mapa de Europa se densifica en el periodo 2029-2030 y en el quinquenio 2031-2035 con el despliegue industrial de la Alianza SMR.
- **Ficha Técnica y Económica al Clicar:** Al pulsar sobre cualquier emplazamiento, se despliega un panel lateral con los datos de MWe, MWt, GWh/año, desglose de mitigación de CO₂, servicios a la red y encaje en la Alianza Europea.
- **Simulador LCOE en Vivo:** Pulsando el botón *"🧮 Simulador LCOE"*, el usuario puede modificar la potencia, CAPEX, WACC, precio del CO₂ en el EU ETS y precio del pool para comprobar la rentabilidad del SMR frente a tecnologías competidoras.
- **Dashboard de Gráficos:** Cuatro gráficos interactivos de capacidad por país, distribución de tecnologías, curva de aprendizaje FOAK vs. NOAK y mitigación acumulada al 2050.

---

## 8. Conclusiones y Recomendaciones de Política Energética

1. **Cambio de Paradigma Económico:** Los SMRs resuelven el principal cuello de botella de la energía nuclear histórica: el riesgo financiero y los intereses durante la construcción (IDC). La estandarización en fábrica transforma un megaproyecto de obra civil en un producto industrial repetitivo con costes decrecientes.
2. **Complementariedad Sistémica:** Lejos de competir con las energías renovables, los SMRs actúan como su socio natural al aportar inercia síncrona real, servicios de ajuste y seguimiento de carga rápido, evitando sobredimensionar la red y el almacenamiento masivo con baterías.
3. **Descarbonización del Calor:** El mayor potencial en Europa reside en el acoplamiento sectorial: sustitución de calderas de gas en polígonos industriales químicos y redes urbanas de calefacción de distrito.
4. **La Oportunidad de la Unión Europea:** A través de la Alianza Industrial de SMRs y el Net-Zero Industry Act, la UE tiene la oportunidad de liderar la estandarización regulatoria transfronteriza y aprovechar sus antiguas cuencas de carbón para reindustrializarse de forma limpia.

---

## 9. Referencias y Bibliografía Oficial

- **Comisión Europea (2024):** *European Industrial Alliance on Small Modular Reactors: Terms of Reference and Technical Working Groups*. Directorate-General for Energy (DG ENER), Bruselas.
- **Comisión Europea (2024):** *Securing our future: Europe's 2040 climate target and path to climate neutrality by 2050*. COM(2024) 63 final.
- **Organismo Internacional de Energía Atómica - OIEA / IAEA (2024):** *Advances in Small Modular Reactor Technology Developments*. A Supplement to the IAEA Advanced Reactors Information System (ARIS), Viena.
- **Agencia de Energía Nuclear de la OCDE - OECD-NEA (2024):** *The NEA Small Modular Reactor Dashboard: Volume II*. OECD Publishing, París.
- **World Nuclear Association - WNA (2024):** *Small Modular Reactors: Market Drivers and Supply Chain Evolution*. WNA Report Series.
- **Lazard (2024):** *Lazard's Levelized Cost of Energy Analysis - Version 17.0*. Lazard Global Energy Group.
- **Red Eléctrica de España / ENTSO-E (2023):** *Inertia and System Stability in High-Renewable Energy Systems*. Technical Working Document.
