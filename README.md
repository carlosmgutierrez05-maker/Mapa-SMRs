# ⚛️ SMR-ENERGY ECONOMICS | Observatorio Tecno-Económico de SMRs
> **Observatorio Georreferenciado y Simulador Tecno-Económico de Reactores Modulares Pequeños (SMRs)**  
> **Área:** Economía de los Sistemas Energéticos | Grado en Ingeniería Energética | Universidad de Valladolid (UVa)

---

## 📌 Descripción General

**SMR-Energy Economics** es una plataforma analítica interactiva y de divulgación técnica orientada a evaluar el papel estratégico, económico y regulatorio de los **Reactores Modulares Pequeños (SMRs)** en la transición energética europea hacia el horizonte **2030–2040+**.

La plataforma integra:
1. **🗺️ Observatorio Cartográfico GIS (Leaflet + MarkerCluster):** Georreferenciación de más de 40 proyectos mundiales y europeos clasificados por estado (*Operativo*, *En Construcción*, *Ola 2030 UE* y *Horizonte 2035+*).
2. **📈 Simulador Tecno-Económico LCOE:** Modelo interactivo de cálculo de coste nivelado de la energía (LCOE), sensibilidad a CAPEX, tasa de descuento (WACC), factor de capacidad y precio de penalización de CO₂.
3. **🇪🇺 Rastreador de la Alianza Europea de SMRs:** Seguimiento del encaje regulatorio bajo el *Net-Zero Industry Act (NZIA)*, taxonomía verde y sustitución de carbón (*Coal-to-Nuclear Repurposing*).
4. **🔬 Gemelo Digital 3D (Three.js · *Próximamente*):** Módulo en desarrollo para exploración tridimensional de componentes de reactores y contención pasiva.

---

## 🚀 Despliegue y Visualización Online

Esta aplicación está desarrollada con tecnologías web estándar (**HTML5, Vanilla CSS3 y JavaScript moderno**) sin necesidad de backend o bases de datos pesadas, lo que permite un despliegue instantáneo en cualquier plataforma estática:

- **GitHub Pages:** Despliegue automático desde la rama `main` (carpeta `/root`).
- **Vercel / Netlify:** Importación directa o arrastrar y soltar de la carpeta del proyecto.
- **Servidor Local:** Ejecutar `INICIAR_CON_SERVIDOR_LOCAL.bat` o levantar un servidor HTTP básico:
  ```bash
  python -m http.server 8080
  ```

---

## 📂 Estructura del Repositorio

```text
├── index.html                   # Interfaz principal (Mapa GIS, KPIs y Simulador LCOE)
├── css/
│   └── styles.css               # Sistema de diseño HUD institucional (Dark/Light mode)
├── js/
│   ├── app.js                   # Controlador principal, mapas y simulación económica
│   └── smr-data.js              # Base de datos tecno-económica de proyectos SMR
├── lib/                         # Librerías locales offline (Leaflet, Chart.js, MarkerCluster)
└── Memoria/                     # Documentación técnica, metodológica y académica
```

---

## ⚖️ Metodología y Fuentes de Referencia

- **IEA (International Energy Agency):** *Projected Costs of Generating Electricity (2020/2025)*.
- **IAEA (Organismo Internacional de Energía Atómica):** *Advances in Small Modular Reactor Technology Developments (2022/2024)*.
- **Comisión Europea:** *European SMR Industrial Alliance (Working Groups 2024)*.
- **NEA (Nuclear Energy Agency):** *The NEA SMR Dashboard (Vol. 1 & 2)*.

---

## 🎓 Autoría y Citas

Desarrollado en el marco de la asignatura **Economía de los Sistemas Energéticos**, Universidad de Valladolid (UVa).  
Para citas académicas o consultas de investigación:
> *SMR-Energy Economics: Observatorio Georreferenciado y Modelo Tecno-Económico para el Despliegue de SMRs en el Mercado Eléctrico Europeo (2024-2026).*
