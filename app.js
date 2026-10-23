/**
 * SMR-ENERGY ECONOMICS | Visualizador Georreferenciado y Plataforma Técnico-Económica
 * Asignatura: Economía de los Sistemas Energéticos (UVa)
 * 
 * Módulo 2D Enterprise:
 * - Marcadores SVG escalables con micro-animación de radar para reactores operativos y en construcción
 * - Capa coroplética GeoJSON por países con escala monocromática (Azul marino a Cyan eléctrico)
 * - Tooltips enriquecidos estilo widget financiero con sparkline SVG de curva de aprendizaje LCOE vs Pool
 * - Sincronización temporal con animación de contadores numéricos (CountUp con requestAnimationFrame)
 * - Modo presentación (100% pantalla completa) con sidebar colapsable
 * - Filtrado avanzado por tecnología de reactor (PWR, BWR, HTGR, LFR, MSR) y uso final (Carga base, calor, hidrógeno)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Estado global de la aplicación
  const state = {
    theme: localStorage.getItem('smr-theme') || 'dark',
    activeTimelineIndex: 0, // 0: Todos, 1: 2024, 2: 2026-2028, 3: 2029-2030, 4: 2031-2035, 5: 2036-2040+
    timelinePhases: [
      { id: 'all', label: 'Todos (2024-2040+)', minYear: 0, maxYear: 9999 },
      { id: 'current', label: 'Hasta 2024 (Operativos / Actualidad)', minYear: 0, maxYear: 2024 },
      { id: 'near', label: 'Hasta 2028 (Primeras Conexiones)', minYear: 0, maxYear: 2028 },
      { id: 'h2030', label: 'Hasta 2030 (1ª Ola Alianza UE)', minYear: 0, maxYear: 2030 },
      { id: 'h2035', label: 'Hasta 2035 (Despliegue Industrial)', minYear: 0, maxYear: 2035 },
      { id: 'h2040', label: 'Hasta 2040+ (Madurez & Gen IV)', minYear: 0, maxYear: 2050 }
    ],
    filters: {
      region: 'Europa', // Sincronizado con la selección inicial de index.html
      status: 'all',
      tech: 'all',
      application: 'all',
      search: ''
    },
    showLabelsOnMap: false,
    selectedProject: null,
    selectedCountry: null,
    isPlayingTimeline: false,
    timelineInterval: null,
    map: null,
    activeBaseLayer: null,
    baseMaps: {},
    overlayMaps: {},
    markersCluster: null,
    markersLayer: null,
    choroplethLayer: null,
    countryStats: {},
    chartInstances: {},
    selectedWacc: 0.07
  };

  // Configurar tema inicial
  document.documentElement.setAttribute('data-theme', state.theme);

  // Inicializar Componentes de la Plataforma
  initMap();
  initChoroplethLayer();
  initEventListeners();
  renderTimelineStatus();
  updateFilteredProjects();
  initEconomicCalculator();

  /* =========================================================================
     1. INICIALIZACIÓN DEL MAPA LEAFLET 2D Y CARTOGRAFÍA DE ALTA PRECISIÓN
     ========================================================================= */
  function initMap() {
    // Coordenadas iniciales: Centrado en Europa
    state.map = L.map('leaflet-map', {
      center: [52.0, 16.0],
      zoom: 4,
      minZoom: 2,
      maxZoom: 17,
      zoomControl: false
    });

    // Control de zoom en esquina inferior derecha
    L.control.zoom({ position: 'bottomright' }).addTo(state.map);

    // Capas base cartográficas institucionales
    const esriDarkBase = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    });
    const esriDarkRef = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    });
    const esriDark = L.layerGroup([esriDarkBase, esriDarkRef]);

    const esriLightBase = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    });
    const esriLightRef = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 16
    });
    const esriLight = L.layerGroup([esriLightBase, esriLightRef]);

    // Capas OpenStreetMap fiables y de alta resolución (sin bloqueo HTTP 403 / Access Denied de la OSM Foundation)
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap France | &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 20,
      subdomains: 'abc'
    });

    // Capa Topográfica de alta definición (relieve sombreado y curvas de nivel sin requerimiento de API Key)
    const esriTopoLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, USGS',
      maxZoom: 19
    });

    // Capa Satélite Híbrido de alta resolución (Ortofoto global + Nombres de ciudades y fronteras)
    const esriSatBase = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Earthstar Geographics',
      maxZoom: 19
    });
    const esriSatRef = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
      maxZoom: 19
    });
    const esriSatellite = L.layerGroup([esriSatBase, esriSatRef]);

    const esriStreetLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Sources: Esri, USGS, NOAA',
      maxZoom: 19
    });

    state.baseMaps = {
      '🌑 Esri Dark Canvas': esriDark,
      '☀️ Esri Light Canvas': esriLight,
      '🗺️ OpenStreetMap': osmLayer,
      '🧭 Esri Topográfico': esriTopoLayer,
      '🛰️ Satélite Híbrido': esriSatellite,
      '🏛️ Esri Político': esriStreetLayer
    };

    // Capa base por defecto según tema inicial
    state.activeBaseLayer = state.theme === 'light' ? esriLight : esriDark;
    state.activeBaseLayer.addTo(state.map);

    // Control nativo de capas
    state.overlayMaps = {};
    state.layersControl = L.control.layers(state.baseMaps, state.overlayMaps, {
      position: 'topright',
      collapsed: true
    }).addTo(state.map);

    state.map.on('baselayerchange', (e) => {
      state.activeBaseLayer = e.layer;
    });

    // Inicializar agrupación de reactores con Leaflet.markercluster
    if (typeof L.markerClusterGroup === 'function') {
      state.markersCluster = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 45,
        spiderfyOnMaxZoom: true,
        zoomToBoundsOnClick: true,
        disableClusteringAtZoom: 12,
        iconCreateFunction: function(cluster) {
          const count = cluster.getChildCount();
          let sizeClass = 'cluster-small';
          let size = 32;
          if (count >= 10) {
            sizeClass = 'cluster-large';
            size = 40;
          } else if (count >= 5) {
            sizeClass = 'cluster-medium';
            size = 36;
          }
          return L.divIcon({
            html: `<div class="corp-cluster-badge ${sizeClass}" style="background-color: #0f172a; color: #38bdf8; border: 1.5px solid rgba(0, 229, 255, 0.7); box-shadow: 0 4px 12px rgba(0,0,0,0.6); display: flex; align-items: center; justify-content: center; border-radius: 50%; font-weight: 800; font-family: 'Outfit', sans-serif;"><span>${count}</span></div>`,
            className: 'corp-cluster-wrapper',
            iconSize: L.point(size, size)
          });
        }
      });
      state.map.addLayer(state.markersCluster);
    } else {
      state.markersLayer = L.layerGroup().addTo(state.map);
    }
  }

  /* =========================================================================
     2. MARCADORES SVG PERSONALIZADOS & MICRO-ANIMACIÓN DE BARRIDO DE RADAR
     ========================================================================= */
  function createSvgMarkerIcon(p) {
    const isOperational = p.status === 'Operativo';
    const isConstruction = p.status === 'En Construcción';
    const isPulsing = isOperational || isConstruction;

    let color = '#00E5FF'; // Azul Eléctrico para Planificado 2030
    let statusClass = 'plan';
    if (isOperational) {
      color = '#10B981'; // Verde Neón
      statusClass = 'op';
    } else if (isConstruction) {
      color = '#F59E0B'; // Ámbar Neón
      statusClass = 'const';
    } else if (p.status === 'Horizonte 2035+') {
      color = '#38BDF8'; // Cyan Eléctrico
      statusClass = 'plan-late';
    }

    const badgeIcon = p.floatingVessel ? '🚢' : (p.greenHydrogenFocus ? '🟢' : '');
    const badgeHtml = badgeIcon ? `<div class="marker-special-subicon" style="position: absolute; top: -7px; right: -7px; font-size: 11px; line-height: 1; background: #0f172a; border-radius: 50%; border: 1.5px solid ${color}; padding: 1px 2px; box-shadow: 0 2px 6px rgba(0,0,0,0.8); z-index: 10;">${badgeIcon}</div>` : '';

    const html = `
      <div class="smr-marker-container ${isPulsing ? 'smr-marker-pulsing' : ''} status-${statusClass}" style="color: ${color};">
        ${isPulsing ? `
          <div class="marker-radar-ring ring-1" style="border-color: ${color};"></div>
          <div class="marker-radar-ring ring-2" style="border-color: ${color};"></div>
        ` : ''}
        ${badgeHtml}
        <div class="marker-badge-core" style="border-color: ${color}; box-shadow: 0 0 10px ${color}66;">
          <svg viewBox="0 0 24 24" class="marker-svg-icon" fill="none" stroke="${color}" stroke-width="1.8">
            <circle cx="12" cy="12" r="3.2" fill="${color}" />
            <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(30 12 12)" stroke="${color}" stroke-opacity="0.85" />
            <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(-30 12 12)" stroke="${color}" stroke-opacity="0.85" />
          </svg>
        </div>
      </div>
    `;

    return L.divIcon({
      className: 'smr-svg-marker-wrapper',
      html: html,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
      popupAnchor: [0, -18]
    });
  }

  /* =========================================================================
     3. TOOLTIPS FINANCIEROS ENRIQUECIDOS CON SPARKLINES SVG
     ========================================================================= */
  /* =========================================================================
     3. MICRO-GRÁFICOS MINIMALISTAS & POPUPS/HOVER-CARDS (ESTILO BLOOMBERG / PALANTIR)
     ========================================================================= */

  /**
   * Genera un micro-gráfico vectorial (SVG Sparkline) minimalista mostrando
   * la correlación y aprendizaje de LCOE (€/MWh) vs CAPEX ($/kW).
   * Sin ejes toscos ni gridlines saturadas.
   */
  function generateLcoeVsCapexSparkline(p) {
    const w = 290;
    const h = 42;
    const padX = 10;
    const padY = 6;
    const graphW = w - padX * 2;
    const graphH = h - padY * 2;

    const capexUsdKw = Math.round((p.capexEurKw || 4800) * 1.08);
    const foakLcoe = Math.round((p.lcoeTargetEurMWh || 75) * 1.52);

    // 5 etapas de aprendizaje industrial: FOAK -> U2 -> U4 -> U8 -> NOAK (Meta Comercial)
    const capexPoints = [1.0, 0.84, 0.73, 0.64, 0.58].map(r => Math.round(capexUsdKw * r));
    const lcoePoints = [1.0, 0.86, 0.75, 0.67, 0.62].map(r => Math.round(foakLcoe * r));

    const minCapex = Math.min(...capexPoints);
    const maxCapex = Math.max(...capexPoints);
    const minLcoe = Math.min(...lcoePoints);
    const maxLcoe = Math.max(...lcoePoints);

    const getX = idx => padX + (idx / 4) * graphW;
    const getYCapex = v => padY + graphH - ((v - minCapex) / (maxCapex - minCapex || 1)) * (graphH * 0.85);
    const getYLcoe = v => padY + graphH - ((v - minLcoe) / (maxLcoe - minLcoe || 1)) * (graphH * 0.85);

    const capexCoords = capexPoints.map((v, i) => ({ x: getX(i), y: getYCapex(v) }));
    const lcoeCoords = lcoePoints.map((v, i) => ({ x: getX(i), y: getYLcoe(v) }));

    function toPathD(coords) {
      return coords.reduce((acc, pt, i, arr) => {
        if (i === 0) return `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
        const prev = arr[i - 1];
        const cx = (prev.x + pt.x) / 2;
        return `${acc} C ${cx.toFixed(1)} ${prev.y.toFixed(1)}, ${cx.toFixed(1)} ${pt.y.toFixed(1)}, ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
      }, '');
    }

    const pathCapex = toPathD(capexCoords);
    const pathLcoe = toPathD(lcoeCoords);

    const areaCapex = `${pathCapex} L ${capexCoords[4].x.toFixed(1)} ${h} L ${padX} ${h} Z`;
    const areaLcoe = `${pathLcoe} L ${lcoeCoords[4].x.toFixed(1)} ${h} L ${padX} ${h} Z`;

    return `
      <svg viewBox="0 0 ${w} ${h}" width="100%" height="${h}" style="overflow: visible; display: block;">
        <defs>
          <linearGradient id="gradCapex-${p.id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#f59e0b" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.0" />
          </linearGradient>
          <linearGradient id="gradLcoe-${p.id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#00e5ff" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#00e5ff" stop-opacity="0.0" />
          </linearGradient>
        </defs>

        <!-- Áreas degradadas sin cuadrículas toscas -->
        <path d="${areaCapex}" fill="url(#gradCapex-${p.id})" />
        <path d="${areaLcoe}" fill="url(#gradLcoe-${p.id})" />

        <!-- Trazo CAPEX ($/kW) en Ámbar -->
        <path d="${pathCapex}" fill="none" stroke="#f59e0b" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Trazo LCOE (€/MWh) en Cyan -->
        <path d="${pathLcoe}" fill="none" stroke="#00e5ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Nodos de origen FOAK -->
        <circle cx="${capexCoords[0].x.toFixed(1)}" cy="${capexCoords[0].y.toFixed(1)}" r="2.5" fill="#f59e0b" />
        <circle cx="${lcoeCoords[0].x.toFixed(1)}" cy="${lcoeCoords[0].y.toFixed(1)}" r="2.5" fill="#00e5ff" />

        <!-- Nodos de destino NOAK con anillo indicador -->
        <circle cx="${capexCoords[4].x.toFixed(1)}" cy="${capexCoords[4].y.toFixed(1)}" r="3" fill="#fbbf24" stroke="#0f172a" stroke-width="1.5" />
        <circle cx="${lcoeCoords[4].x.toFixed(1)}" cy="${lcoeCoords[4].y.toFixed(1)}" r="3.5" fill="#00e5ff" stroke="#0f172a" stroke-width="1.5" />
      </svg>
    `;
  }

  /**
   * Genera un tooltip minimalista estilo pastilla (Pill) en formato horizontal compacto:
   * (Bandera + Nombre del Reactor • Potencia MWe • Estado).
   * Elimina cualquier popup flotante intrusivo y evita desbordamientos o colisiones.
   */
  function createPillTooltipHtml(p) {
    const flag = getFlagEmoji(p.countryCode);
    const powerText = p.netElectricCapacityMWe > 0 
      ? `${p.netElectricCapacityMWe} MWe` 
      : `${p.thermalCapacityMWt} MWt`;

    let statusPillClass = 'plan';
    let statusLabel = 'Planificado';
    if (p.status === 'Operativo') {
      statusPillClass = 'op';
      statusLabel = 'Operativo';
    } else if (p.status === 'En Construcción') {
      statusPillClass = 'const';
      statusLabel = 'En Construcción';
    } else if (p.status === 'Horizonte 2035+') {
      statusPillClass = 'plan-late';
      statusLabel = 'Madurez 2035+';
    }

    const shipTag = p.floatingVessel ? `<span class="pill-badge-ship" style="background: rgba(14, 165, 233, 0.25); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.5); padding: 1px 6px; border-radius: 3px; font-weight: 700; font-size: 0.65rem;">🚢 Buque Flotante</span><span class="pill-sep">&bull;</span>` : '';
    const h2Tag = p.greenHydrogenFocus ? `<span class="pill-badge-h2" style="background: rgba(34, 197, 94, 0.25); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.5); padding: 1px 6px; border-radius: 3px; font-weight: 700; font-size: 0.65rem;">🟢 Hidrógeno Verde</span><span class="pill-sep">&bull;</span>` : '';

    return `
      <div class="smr-pill-tooltip">
        <span class="pill-flag">${flag}</span>
        <span class="pill-name">${p.name}</span>
        <span class="pill-sep">&bull;</span>
        ${shipTag}
        ${h2Tag}
        <span class="pill-power">${powerText}</span>
        <span class="pill-sep">&bull;</span>
        <span class="pill-status-dot ${statusPillClass}"></span>
        <span class="pill-status-text ${statusPillClass}">${statusLabel}</span>
      </div>
    `;
  }

  // Exponer función global para abrir el drawer desde botones dentro de tablas/listas
  window.openProjectDrawerById = function(projectId) {
    const project = (window.SMR_DATABASE || []).find(item => item.id === projectId);
    if (project) {
      openProjectDrawer(project);
    }
  };

  /* =========================================================================
     4. RENDERIZADO DE MARCADORES CON LEAFLET
     ========================================================================= */
  function renderMarkers(projects) {
    if (state.markersCluster) {
      state.markersCluster.clearLayers();
    }
    if (state.markersLayer) {
      state.markersLayer.clearLayers();
    }

    const markersList = [];

    projects.forEach(p => {
      const marker = L.marker([p.lat, p.lng], {
        icon: createSvgMarkerIcon(p)
      });

      // Tooltip minimalista estilo pastilla en hover (sin popups pesados ni colisiones)
      marker.bindTooltip(createPillTooltipHtml(p), {
        direction: 'top',
        offset: [0, -14],
        className: 'smr-pill-tooltip-wrapper',
        opacity: 1
      });

      // Al hacer clic, cierra de inmediato cualquier tooltip, centra el mapa en el área visible y abre exclusivamente el Sliding Right Drawer
      marker.on('click', (e) => {
        if (e && e.originalEvent) {
          L.DomEvent.stopPropagation(e);
        }
        marker.closeTooltip();
        openProjectDrawer(p);
      });

      markersList.push(marker);
    });

    if (state.markersCluster) {
      state.markersCluster.addLayers(markersList);
    } else if (state.markersLayer) {
      markersList.forEach(m => m.addTo(state.markersLayer));
    }
  }

  /* =========================================================================
     5. CAPA COROPLÉTICA GEOJSON (HEATMAP GLOBAL DE CAPACIDAD POR PAÍS)
     ========================================================================= */
  function getChoroplethColor(capacityMWe, projectsCount) {
    if ((!capacityMWe || capacityMWe === 0) && (!projectsCount || projectsCount === 0)) {
      return 'rgba(15, 23, 42, 0.25)';
    }
    if (capacityMWe <= 200) return '#0c2d48';
    if (capacityMWe <= 500) return '#145da0';
    if (capacityMWe <= 1000) return '#0284c7';
    if (capacityMWe <= 1800) return '#00b4d8';
    return '#00e5ff'; // > 1.800 MWe (Reino Unido, Polonia)
  }

  // Mapa de correspondencia ISO2 a ISO3 para compatibilidad universal
  const ISO2_TO_ISO3 = {
    'AR': 'ARG', 'BG': 'BGR', 'CA': 'CAN', 'CN': 'CHN', 'CZ': 'CZE',
    'EE': 'EST', 'ES': 'ESP', 'FI': 'FIN', 'FR': 'FRA', 'GB': 'GBR',
    'IT': 'ITA', 'JP': 'JPN', 'KR': 'KOR', 'NL': 'NLD', 'PL': 'POL',
    'RO': 'ROU', 'RU': 'RUS', 'SE': 'SWE', 'SK': 'SVK', 'US': 'USA'
  };

  function computeGlobalCountryStats() {
    const statsByCode = {};
    const statsByName = {};

    (window.SMR_DATABASE || []).forEach(p => {
      const code = (p.countryCode || '').toUpperCase();
      const name = (p.country || '').trim();
      if (!code) return;

      if (!statsByCode[code]) {
        statsByCode[code] = {
          name: name,
          code: code,
          region: p.region || 'Europa',
          totalCapacityMWe: 0,
          totalCapexM: 0,
          projectsCount: 0,
          modelWeights: {},
          projects: []
        };
      }

      const s = statsByCode[code];
      s.totalCapacityMWe += (p.netElectricCapacityMWe || 0);
      s.totalCapexM += (p.totalCapexMillionEur || 0);
      s.projectsCount += 1;
      s.projects.push(p);

      const model = (p.reactorModel || 'SMR').split('(')[0].trim();
      s.modelWeights[model] = (s.modelWeights[model] || 0) + (p.netElectricCapacityMWe || 100);
    });

    // Calcular tecnología dominante para cada país
    Object.values(statsByCode).forEach(s => {
      let topModel = '';
      let maxW = -1;
      for (const [model, weight] of Object.entries(s.modelWeights)) {
        if (weight > maxW) {
          maxW = weight;
          topModel = model;
        }
      }
      s.dominantTechnology = topModel || 'SMR Modular';
      statsByName[s.name.toLowerCase()] = s;
    });

    return { statsByCode, statsByName };
  }

  // Comprueba si un país pertenece a la región activa del filtro
  function isCountryInActiveRegion(data) {
    if (!data) return false;
    const activeRegion = state.filters.region || 'all';
    if (activeRegion === 'all') return true;
    if (activeRegion === 'Europa') return data.region === 'Europa';
    if (activeRegion === 'Norteamérica') return data.region === 'Norteamérica';
    if (activeRegion === 'Asia') return data.region === 'Asia';
    if (activeRegion === 'Resto') return data.region !== 'Europa' && data.region !== 'Norteamérica' && data.region !== 'Asia';
    return true;
  }

  function findCountryData(feature) {
    if (!feature || !feature.properties || !state.countryStats) return null;
    const props = feature.properties;
    const statsByCode = state.countryStats;
    const iso2 = (props.iso2 || props['ISO3166-1-Alpha-2'] || props.ISO_A2 || '').toUpperCase();
    if (iso2 && statsByCode[iso2]) return statsByCode[iso2];

    const iso3 = (props.iso3 || props['ISO3166-1-Alpha-3'] || props.ISO_A3 || '').toUpperCase();
    if (iso3) {
      for (const s of Object.values(statsByCode)) {
        if (ISO2_TO_ISO3[s.code] === iso3) return s;
      }
    }

    const name = (props.name || props.admin || props.name_long || '').toLowerCase();
    if (name) {
      for (const s of Object.values(statsByCode)) {
        if (s.name.toLowerCase() === name) return s;
      }
      if (name.includes('united states') || name === 'usa') return statsByCode['US'];
      if (name.includes('russia') || name.includes('federation')) return statsByCode['RU'];
      if (name.includes('china')) return statsByCode['CN'];
      if (name.includes('south korea') || name === 'korea' || name.includes('republic of korea')) return statsByCode['KR'];
      if (name.includes('czech')) return statsByCode['CZ'];
      if (name.includes('united kingdom') || name.includes('britain')) return statsByCode['GB'];
      if (name.includes('spain')) return statsByCode['ES'];
      if (name.includes('france')) return statsByCode['FR'];
      if (name.includes('canada')) return statsByCode['CA'];
      if (name.includes('japan')) return statsByCode['JP'];
      if (name.includes('italy')) return statsByCode['IT'];
      if (name.includes('sweden')) return statsByCode['SE'];
      if (name.includes('finland')) return statsByCode['FI'];
      if (name.includes('poland')) return statsByCode['PL'];
      if (name.includes('romania')) return statsByCode['RO'];
      if (name.includes('bulgaria')) return statsByCode['BG'];
      if (name.includes('slovakia')) return statsByCode['SK'];
      if (name.includes('netherlands')) return statsByCode['NL'];
      if (name.includes('argentina')) return statsByCode['AR'];
    }

    return null;
  }

  function createChoroplethTooltipHtml(data) {
    const flag = getFlagEmoji(data.code);
    const capacityText = data.totalCapacityMWe > 0 ? `${data.totalCapacityMWe.toLocaleString('es-ES')} MWe` : 'Térmico / I+D';
    const capexText = `${data.totalCapexM.toLocaleString('es-ES')} M€`;
    const countText = `${data.projectsCount} ${data.projectsCount === 1 ? 'Reactor' : 'Reactores'}`;

    return `
      <div class="smr-choropleth-tooltip">
        <div class="ch-tt-header">
          <span class="ch-tt-flag">${flag}</span>
          <span class="ch-tt-name">${data.name}</span>
          <span class="ch-tt-badge">${countText}</span>
        </div>
        <div class="ch-tt-body">
          <div class="ch-tt-row">
            <span class="ch-tt-lbl">Total Planned Capacity:</span>
            <span class="ch-tt-val cyan">${capacityText}</span>
          </div>
          <div class="ch-tt-row">
            <span class="ch-tt-lbl">Estimated National Investment:</span>
            <span class="ch-tt-val amber">${capexText}</span>
          </div>
          <div class="ch-tt-row">
            <span class="ch-tt-lbl">Dominant Technology:</span>
            <span class="ch-tt-val">${data.dominantTechnology}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Recalcula y actualiza dinámicamente los estilos coropléticos para que pinten EXCLUSIVAMENTE la región activa
  function updateChoroplethLayerStyles() {
    if (!state.choroplethLayer) return;

    state.choroplethLayer.eachLayer(layer => {
      const feature = layer.feature;
      const data = findCountryData(feature);
      const inRegion = isCountryInActiveRegion(data);
      const hasSmr = inRegion && data && (data.totalCapacityMWe > 0 || data.projectsCount > 0);
      const cap = hasSmr ? data.totalCapacityMWe : 0;

      layer.setStyle({
        fillColor: hasSmr ? getChoroplethColor(cap, data.projectsCount) : 'rgba(15, 23, 42, 0.25)',
        weight: hasSmr ? 1.5 : 0.6,
        opacity: hasSmr ? 0.9 : 0.25,
        color: hasSmr ? '#38bdf8' : '#334155',
        fillOpacity: hasSmr ? (state.theme === 'dark' ? 0.65 : 0.45) : (state.theme === 'dark' ? 0.12 : 0.04)
      });

      if (hasSmr) {
        const ttContent = createChoroplethTooltipHtml(data);
        if (layer.getTooltip()) {
          layer.setTooltipContent(ttContent);
        } else {
          layer.bindTooltip(ttContent, { sticky: true, className: 'choropleth-hud-tooltip' });
        }
      } else {
        if (layer.getTooltip()) {
          layer.unbindTooltip();
        }
      }
    });
  }

  async function resolveWorldGeoJSON() {
    if (window.WORLD_GEOJSON && window.WORLD_GEOJSON.features) {
      return window.WORLD_GEOJSON;
    }
    // Fallback dinámico a CDN público confiable
    try {
      const res = await fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson');
      if (res.ok) {
        const data = await res.json();
        window.WORLD_GEOJSON = data;
        return data;
      }
    } catch (e) {
      console.warn('Fallback CDN World GeoJSON fetch error:', e);
    }
    return null;
  }

  async function initChoroplethLayer() {
    const geojsonData = await resolveWorldGeoJSON();
    if (!geojsonData || !geojsonData.features) return;

    const { statsByCode, statsByName } = computeGlobalCountryStats();
    state.countryStats = statsByCode;

    state.choroplethLayer = L.geoJSON(geojsonData, {
      style: feature => {
        const data = findCountryData(feature);
        const inRegion = isCountryInActiveRegion(data);
        const hasSmr = inRegion && data && (data.totalCapacityMWe > 0 || data.projectsCount > 0);
        const cap = hasSmr ? data.totalCapacityMWe : 0;
        return {
          fillColor: hasSmr ? getChoroplethColor(cap, data.projectsCount) : 'rgba(15, 23, 42, 0.25)',
          weight: hasSmr ? 1.5 : 0.6,
          opacity: hasSmr ? 0.9 : 0.25,
          color: hasSmr ? '#38bdf8' : '#334155',
          fillOpacity: hasSmr ? (state.theme === 'dark' ? 0.65 : 0.45) : (state.theme === 'dark' ? 0.12 : 0.04)
        };
      },
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: e => {
            const currentData = findCountryData(feature);
            if (!currentData || !isCountryInActiveRegion(currentData) || (currentData.totalCapacityMWe === 0 && currentData.projectsCount === 0)) {
              return;
            }
            const l = e.target;
            l.setStyle({ weight: 2, color: '#38bdf8', fillOpacity: 0.85 });
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              l.bringToFront();
            }
          },
          mouseout: e => {
            if (state.choroplethLayer) {
              const currentData = findCountryData(feature);
              const inReg = isCountryInActiveRegion(currentData);
              const has = inReg && currentData && (currentData.totalCapacityMWe > 0 || currentData.projectsCount > 0);
              const capVal = has ? currentData.totalCapacityMWe : 0;
              e.target.setStyle({
                fillColor: has ? getChoroplethColor(capVal, currentData.projectsCount) : 'rgba(15, 23, 42, 0.25)',
                weight: has ? 1.5 : 0.6,
                opacity: has ? 0.9 : 0.25,
                color: has ? '#38bdf8' : '#334155',
                fillOpacity: has ? (state.theme === 'dark' ? 0.65 : 0.45) : (state.theme === 'dark' ? 0.12 : 0.04)
              });
            }
          },
          click: (e) => {
            const currentData = findCountryData(feature);
            if (!currentData || !isCountryInActiveRegion(currentData) || (currentData.totalCapacityMWe === 0 && currentData.projectsCount === 0)) {
              return;
            }
            if (e && e.originalEvent) L.DomEvent.stopPropagation(e);
            selectCountry(currentData.name);
          }
        });
      }
    });

    // Aplicar estilos y tooltips estrictamente según la región activa actual
    updateChoroplethLayerStyles();

    // Añadir al control nativo de capas
    if (state.layersControl) {
      state.layersControl.addOverlay(state.choroplethLayer, '🗺️ Capacidad País (MWe)');
    }
  }

  function toggleChoropleth(forceState) {
    if (!state.choroplethLayer) {
      initChoroplethLayer().then(() => {
        if (state.choroplethLayer) toggleChoropleth(forceState);
      });
      return;
    }
    const shouldShow = forceState !== undefined ? forceState : !state.map.hasLayer(state.choroplethLayer);
    const btn = document.getElementById('btn-toggle-choropleth');
    const scaleBox = document.getElementById('choropleth-scale-box');

    if (shouldShow) {
      updateChoroplethLayerStyles();
      state.map.addLayer(state.choroplethLayer);
      state.choroplethLayer.bringToBack();
      if (btn) btn.classList.add('active');
      if (scaleBox) scaleBox.style.display = 'block';
    } else {
      state.map.removeLayer(state.choroplethLayer);
      if (btn) btn.classList.remove('active');
      if (scaleBox) scaleBox.style.display = 'none';
    }
  }

  /* =========================================================================
     6. ANIMACIÓN DE CONTADORES NUMÉRICOS (COUNTUP EFFECT CON RAF)
     ========================================================================= */
  function animateCounter(el, endVal, suffix = '', duration = 650, decimals = 0, prefix = '') {
    if (!el) return;
    const startVal = el._currentVal !== undefined ? el._currentVal : 0;
    el._currentVal = endVal;

    const startTime = performance.now();
    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Cubic ease out
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (endVal - startVal) * easeOut;

      let formatted;
      if (decimals > 0) {
        formatted = current.toFixed(decimals).replace('.', ',');
      } else {
        formatted = Math.round(current).toLocaleString('es-ES');
      }

      el.textContent = `${prefix}${formatted}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  /* =========================================================================
     7. FILTRADO DINÁMICO AVANZADO DE PROYECTOS Y KPIs
     ========================================================================= */
  function updateFilteredProjects() {
    const activePhase = state.timelinePhases[state.activeTimelineIndex];

    const filtered = (window.SMR_DATABASE || []).filter(p => {
      // 1. Filtro Temporal: Evolución acumulativa de la flota (los reactores construidos u operativos permanecen)
      if (activePhase.id !== 'all') {
        if (p.targetYear > activePhase.maxYear && p.status !== 'Operativo') {
          return false;
        }
      }

      // 2. Filtro de Región
      if (state.filters.region !== 'all') {
        if (state.filters.region === 'Europa' && p.region !== 'Europa') return false;
        if (state.filters.region === 'Norteamérica' && p.region !== 'Norteamérica') return false;
        if (state.filters.region === 'Asia' && p.region !== 'Asia') return false;
        if (state.filters.region === 'Resto' && (p.region === 'Europa' || p.region === 'Norteamérica' || p.region === 'Asia')) return false;
      }

      // 3. Filtro de Estado
      if (state.filters.status !== 'all' && p.status !== state.filters.status) {
        return false;
      }

      // 4. Filtro de Tecnología de Reactor (PWR, BWR, HTGR, LFR, SFR, MSR)
      if (state.filters.tech !== 'all') {
        const filterVal = state.filters.tech;
        const matchesTech = p.technology && p.technology.toUpperCase().includes(filterVal);
        const matchesFamily = p.techFamily && p.techFamily.toUpperCase().includes(filterVal);
        const matchesModel = p.reactorModel && p.reactorModel.toUpperCase().includes(filterVal);
        if (!matchesTech && !matchesFamily && !matchesModel) {
          return false;
        }
      }

      // 5. Filtro de Uso Final / Vector Energético (End-Use)
      if (state.filters.application !== 'all') {
        if (state.filters.application === 'coalRepurposing') {
          if (!p.coalRepurposing) return false;
        } else {
          const app = state.filters.application;
          if (p.primaryApplication !== app && p.secondaryApplication !== app) {
            return false;
          }
        }
      }

      // 6. Filtro de Búsqueda de Texto
      if (state.filters.search.trim() !== '') {
        const query = state.filters.search.toLowerCase();
        const textToSearch = `${p.name} ${p.country} ${p.developer} ${p.reactorModel} ${p.location} ${p.technology}`.toLowerCase();
        if (!textToSearch.includes(query)) return false;
      }

      return true;
    });

    // Actualizar marcadores SVG en mapa
    renderMarkers(filtered);

    // Actualizar KPIs animados
    updateKpisDisplay(filtered);

    return filtered;
  }

  function updateKpisDisplay(projects) {
    const countEl = document.getElementById('kpi-projects-count');
    const capEl = document.getElementById('kpi-total-capacity');
    const genEl = document.getElementById('kpi-total-gen');
    const co2El = document.getElementById('kpi-total-co2');

    const totalCap = projects.reduce((sum, p) => sum + p.netElectricCapacityMWe, 0);
    const totalGenTWh = projects.reduce((sum, p) => sum + p.annualGenerationGWh, 0) / 1000;
    const totalCo2CoalMt = projects.reduce((sum, p) => sum + p.co2AvoidedCoalTonYear, 0) / 1e6;

    animateCounter(countEl, projects.length, '');
    animateCounter(capEl, totalCap, ' MWe');
    animateCounter(genEl, totalGenTWh, ' TWh/a', 650, 1);
    animateCounter(co2El, totalCo2CoalMt, ' Mt/a', 650, 1);

    // Actualizar contadores animados en la Leyenda interactiva
    const countOp = window.SMR_DATABASE.filter(p => p.status === 'Operativo').length;
    const countConst = window.SMR_DATABASE.filter(p => p.status === 'En Construcción').length;
    const count2030 = window.SMR_DATABASE.filter(p => p.status === 'Horizonte 2030').length;
    const count2035 = window.SMR_DATABASE.filter(p => p.status === 'Horizonte 2035+').length;

    animateCounter(document.getElementById('leg-count-op'), countOp);
    animateCounter(document.getElementById('leg-count-const'), countConst);
    animateCounter(document.getElementById('leg-count-2030'), count2030);
    animateCounter(document.getElementById('leg-count-2035'), count2035);
  }

  /* =========================================================================
     8. EXPLORADOR POR PAÍSES / ZONAS Y BANNER DE RESUMEN
     ========================================================================= */
  const COUNTRY_SUMMARIES = {
    'Polonia': {
      title: '🇵🇱 Polonia - Hub SMR de Europa Central',
      zoom: [51.9, 19.1, 6],
      desc: 'Polonia lidera los planes de SMRs en la UE para sustituir centrales térmicas de carbón en cuencas mineras y descarbonizar la petroquímica de Synthos y PKN Orlen con hasta 24 reactores BWRX-300.'
    },
    'Francia': {
      title: '🇫🇷 Francia - Alianza Industrial SMR & Reactores Avanzados',
      zoom: [46.6, 2.2, 6],
      desc: 'Consorcio NUWARD (EDF, CEA, Framatome) para exportación europea de agua ligera, microrreactores térmicos Jimmy para vapor industrial y reactores de sales fundidas NAAREA y newcleo.'
    },
    'Rumanía': {
      title: '🇷🇴 Rumanía - Proyecto Bandera Doicești (Carbón a Nuclear)',
      zoom: [44.99, 25.39, 7],
      desc: 'Sustitución directa de la central de carbón clausurada de Doicești con un complejo de 6 módulos NuScale VOYGR (462 MWe), con financiación de US EXIM Bank y DFC.'
    },
    'República Checa': {
      title: '🇨🇿 República Checa - Alianza ČEZ & Rolls-Royce SMR',
      zoom: [49.8, 15.4, 7],
      desc: 'ČEZ seleccionó a Rolls-Royce SMR en 2024 para desplegar hasta 3.000 MWe en Temelín y Dětmarovice, suministrando carga base y calefacción urbana distrital a Moravia.'
    },
    'Finlandia': {
      title: '🇫🇮 Finlandia - Descarbonización de Redes de Calor Urbanas',
      zoom: [60.5, 25.5, 7],
      desc: 'Steady Energy LDR-50 (50 MWt): reactor dedicado exclusivamente a calefacción de distrito a 150°C para Helsinki, Espoo y Kuopio, sustituyendo carbón y biomasa urbana.'
    },
    'Suecia': {
      title: '🇸🇪 Suecia - Energía para la Gran Industria Fósil-Free',
      zoom: [58.5, 14.5, 6],
      desc: 'Vattenfall proyecta desplegar SMRs en Ringhals para alimentar la siderurgia de acero verde y fábricas de baterías; reactor rápido de plomo SEALER en Studsvik.'
    },
    'Estonia': {
      title: '🇪🇪 Estonia - Soberanía Energética Báltica (Fermi Energia)',
      zoom: [59.4, 26.6, 7.5],
      desc: 'Despliegue del BWRX-300 para desconectarse definitivamente de la red rusa y erradicar la generación con esquisto bituminoso fósil en Ida-Virumaa.'
    },
    'Reino Unido': {
      title: '🇬🇧 Reino Unido - Programa Insignia Great British Nuclear',
      zoom: [54.0, -3.0, 6],
      desc: 'Despliegue de reactores Rolls-Royce SMR (470 MWe por módulo) en emplazamientos prioritarios de Wylfa (Gales) y Moorside (Cumbria).'
    },
    'Canadá': {
      title: '🇨🇦 Canadá - Darlington New Nuclear Project (En Construcción)',
      zoom: [44.0, -78.7, 7],
      desc: 'Primer proyecto de SMR de gran escala en construcción activa en la OCDE: 4 unidades BWRX-300 (1.200 MWe) en Ontario Power Generation, más microrreactores en Chalk River.'
    },
    'Estados Unidos': {
      title: '🇺🇸 Estados Unidos - Demostración de Vanguardia y Gen IV',
      zoom: [39.0, -98.0, 4.5],
      desc: 'TerraPower Natrium con almacenamiento de sales fundidas en Wyoming, Dow Chemical & X-energy Xe-100 para vapor a 565°C en Texas, Clinch River (TVA) y Oklo para centros de datos de IA.'
    },
    'China': {
      title: '🇨🇳 China - Pionera Mundial en SMR de Generación IV',
      zoom: [32.0, 115.0, 4.8],
      desc: 'Central HTR-PM (210 MWe) de alta temperatura refrigerada por gas en operación comercial en Shandong, y Linglong One (ACP100) en construcción en Hainan.'
    },
    'Rusia': {
      title: '🇷🇺 Rusia - Central Flotante y Ciclo Rápido de Plomo',
      zoom: [62.0, 100.0, 3.5],
      desc: 'Akademik Lomonosov (central nuclear flotante en Pevek), RITM-200N en Yakutia y el reactor rápido de plomo BREST-OD-300 en Seversk para ciclo cerrado de combustible.'
    },
    'Argentina': {
      title: '🇦🇷 Argentina - Pionera Latinoamericana en SMR (CAREM-25)',
      zoom: [-34.0, -59.2, 7],
      desc: 'Reactor modular integral PWR de diseño nacional desarrollado por CNEA e INVAP en Lima (Buenos Aires) para generación eléctrica aislada y desalinización de agua.'
    },
    'Corea del Sur': {
      title: '🇰🇷 Corea del Sur - Consorcio i-SMR y Licenciamiento SMART',
      zoom: [36.0, 128.0, 7],
      desc: 'Despliegue del i-SMR (170 MWe por módulo) por KHNP y KAERI con sistemas de seguridad pasiva y licencias avanzadas de exportación global.'
    },
    'Japón': {
      title: '🇯🇵 Japón - HTTR de Alta Temperatura y Mitigación Industrial',
      zoom: [36.4, 140.6, 7],
      desc: 'JAEA y Mitsubishi Heavy Industries operan el High Temperature Engineering Test Reactor (HTTR) para producción termoquímica de hidrógeno limpio a 950°C.'
    },
    'Bulgaria': {
      title: '🇧🇬 Bulgaria - Transición Nuclear en Kozloduy',
      zoom: [43.7, 25.0, 7],
      desc: 'Evaluación y acuerdos de prefactibilidad para reactores AP300 y NuScale VOYGR para reemplazar unidades de carbón y complementar Kozloduy.'
    },
    'Eslovaquia': {
      title: '🇸🇰 Eslovaquia - Descarbonización de la Industria Pesada',
      zoom: [48.7, 19.5, 7],
      desc: 'Estudios de viabilidad de Slovenské elektrárne y consorcio industrial para ubicar SMRs en emplazamientos térmicos de carbón en Nováky y Vojany.'
    },
    'Italia': {
      title: '🇮🇹 Italia - Alianza newcleo de Reactores Rápidos de Plomo',
      zoom: [43.5, 12.0, 6],
      desc: 'newcleo desarrolla reactores rápidos LFR-AS-200 refrigerados por plomo líquido para generación de carga base y cierre del ciclo de combustible nuclear.'
    },
    'Países Bajos': {
      title: '🇳🇱 Países Bajos - Reactores de Sales Fundidas en Borssele',
      zoom: [52.0, 5.0, 7],
      desc: 'Thorizon desarrolla el generador modular de sales fundidas Thorizon One (35 MWe / 100 MWt) en el clúster energético e industrial de Borssele.'
    }
  };

  function selectCountry(countryName) {
    state.selectedCountry = countryName;

    // Actualizar botones de la cinta
    document.querySelectorAll('.country-ribbon-btn').forEach(btn => {
      if (btn.getAttribute('data-country') === countryName) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    const countryProjects = (window.SMR_DATABASE || []).filter(p => p.country === countryName || p.countryCode === countryName);
    const info = COUNTRY_SUMMARIES[countryName];

    if (state.map) {
      if (info && info.zoom) {
        state.map.flyTo([info.zoom[0], info.zoom[1]], info.zoom[2], { duration: 1.4 });
      } else if (countryProjects.length > 0) {
        const lats = countryProjects.map(p => p.lat).filter(l => typeof l === 'number');
        const lngs = countryProjects.map(p => p.lng).filter(l => typeof l === 'number');
        if (lats.length > 0) {
          const bounds = L.latLngBounds([Math.min(...lats), Math.min(...lngs)], [Math.max(...lats), Math.max(...lngs)]);
          state.map.flyToBounds(bounds, { paddingTopLeft: [40, 80], paddingBottomRight: [40, 100], maxZoom: 7, duration: 1.4 });
        }
      }

      // Calcular estadísticas de este país
      const totalPower = countryProjects.reduce((sum, p) => sum + (p.netElectricCapacityMWe || 0), 0);
      const totalCo2 = (countryProjects.reduce((sum, p) => sum + (p.co2AvoidedCoalTonYear || 0), 0) / 1e6).toFixed(1);
      const flag = countryProjects[0] ? getFlagEmoji(countryProjects[0].countryCode) : '🌐';

      // Mostrar Banner
      const banner = document.getElementById('country-summary-banner');
      if (banner) {
        document.getElementById('cs-title').textContent = info ? info.title : `${flag} ${countryName} - Programa SMR Nacional`;
        document.getElementById('cs-stat-projects').textContent = `${countryProjects.length} Proyecto${countryProjects.length > 1 ? 's' : ''}`;
        document.getElementById('cs-stat-power').textContent = totalPower > 0 ? `${totalPower.toLocaleString('es-ES')} MWe` : 'Térmico';
        document.getElementById('cs-stat-co2').textContent = `${totalCo2} Mt/a`;
        document.getElementById('cs-details').textContent = info ? info.desc : `Despliegue y análisis estratégico de reactores modulares pequeños en ${countryName}.`;
        banner.style.display = 'block';
      }
    }
  }

  function closeCountryBanner() {
    const banner = document.getElementById('country-summary-banner');
    if (banner) banner.style.display = 'none';
    state.selectedCountry = null;
    document.querySelectorAll('.country-ribbon-btn').forEach(btn => btn.classList.remove('active'));
  }

  /* =========================================================================
     9. ARQUITECTURA FINANCIERA ENTERPRISE & SLIDING RIGHT DRAWER
     ========================================================================= */

  /**
   * Deduce la estrategia de venta, comprador ancla y bancabilidad para el reactor
   * según su tecnología, rol de mercado y país de emplazamiento.
   */
  function deriveOfftakeStrategy(p) {
    const text = `${p.name} ${p.primaryApplication || ''} ${p.secondaryApplication || ''} ${p.marketRole || ''} ${p.economicModel || ''} ${p.sectorCoupling || ''}`.toLowerCase();
    
    // 1. Off-taker Principal
    let offtaker = 'Red Eléctrica (TSO Carga Base)';
    if (text.includes('químic') || text.includes('quimic') || text.includes('synthos') || text.includes('dow') || text.includes('vapor industrial')) {
      offtaker = 'Cluster Químico & Vapor de Proceso';
    } else if (text.includes('distrito') || text.includes('distrital') || text.includes('calor') || text.includes('calefacción') || text.includes('district heating') || text.includes('steady')) {
      offtaker = 'Red Urbana de Calefacción Distrital';
    } else if (text.includes('data center') || text.includes('centro de datos') || text.includes('ia') || text.includes('oklo') || text.includes('hyperscale')) {
      offtaker = 'Hyperscale AI & Data Centers';
    } else if (text.includes('siderurg') || text.includes('acero') || text.includes('hidrógeno') || text.includes('hidrogeno')) {
      offtaker = 'Siderurgia Verde & Producción H₂';
    } else if (p.coalRepurposing) {
      offtaker = 'Sustitución Nudo Térmico Retirado';
    }

    // 2. Mecanismo de Financiación
    let mechanism = 'PPA Industrial a Largo Plazo (15-25a)';
    if (p.countryCode === 'GB' || p.country === 'Reino Unido') {
      mechanism = 'Regulated Asset Base (RAB) / CfD';
    } else if (p.countryCode === 'PL' || p.country === 'Polonia') {
      mechanism = 'Corporate PPA + Apoyo Net-Zero Act';
    } else if (p.countryCode === 'RO' || p.country === 'Rumanía') {
      mechanism = 'Préstamo Intergub. US EXIM / DFC';
    } else if (p.countryCode === 'CZ' || p.country === 'República Checa') {
      mechanism = 'Cofinanciación ČEZ + CfD Garantizado';
    } else if (p.countryCode === 'FI' || p.countryCode === 'SE') {
      mechanism = 'Modelo Cooperativo Mankala / Consorcio';
    } else if (p.countryCode === 'FR' || p.country === 'Francia') {
      mechanism = 'Fondo France 2030 + Balance Utility';
    } else if (p.countryCode === 'CA' || p.country === 'Canadá') {
      mechanism = 'Tarifa Regulada OPG + Bonos Verdes';
    } else if (p.countryCode === 'US' || p.country === 'Estados Unidos') {
      mechanism = 'DOE ARDP Cost-Share + Capital Privado';
    }

    // 3. Riesgo de Canibalización de Mercado
    let cannibalization = {
      badge: 'Bajo (Behind-the-Meter)',
      colorClass: 'green',
      hint: 'Contrato bilateral directo o suministro de calor sin riesgo de precios cero'
    };

    if (offtaker.includes('Cluster Químico') || offtaker.includes('Calefacción') || offtaker.includes('AI')) {
      cannibalization = {
        badge: 'Bajo (Demanda Cautiva)',
        colorClass: 'green',
        hint: 'Demanda térmica/eléctrica inelástica 24/7 desacoplada del pool mayorista'
      };
    } else if (p.marketRole && p.marketRole.toLowerCase().includes('cogeneración')) {
      cannibalization = {
        badge: 'Medio (Híbrido PPA / Red)',
        colorClass: 'cyan',
        hint: 'Flexibilidad de despacho entre consumidor ancla y venta a la red'
      };
    } else {
      cannibalization = {
        badge: 'Moderado (Exposición Pool)',
        colorClass: 'amber',
        hint: 'Venta de excedentes al mercado mayorista con riesgo de canibalización renovable'
      };
    }

    return { offtaker, mechanism, cannibalization };
  }

  /**
   * Motor de Cálculo Financiero Determinista Unificado (Single Formula Engine).
   * Deriva estrictamente todas las métricas de 3 parámetros base + WACC:
   * - netCapacityMWe
   * - occPerKwEUR
   * - constructionYears
   * 
   * Formulas:
   * Direct_OCC_Total (€M) = (netCapacityMWe * 1000 * occPerKwEUR) / 1e6
   * Indirect_EPC (€M) = Direct_OCC_Total * 0.18
   * FOAK_Contingency (€M) = Direct_OCC_Total * 0.20 (FOAK) ó 0.08 (NOAK)
   * IDC_Financing (€M) = (Direct_OCC_Total + Indirect_EPC) * ((1 + WACC)^(constructionYears / 2) - 1)
   * Total_Capital_Investment_TCI (€M) = Direct_OCC_Total + Indirect_EPC + FOAK_Contingency + IDC_Financing
   */
  function calculateSMRFinancials(p, wacc = 0.07) {
    const netCapacityMWe = p.netElectricCapacityMWe > 0 
      ? p.netElectricCapacityMWe 
      : (p.thermalCapacityMWt ? Math.round(p.thermalCapacityMWt * 0.33) : 300);
    const occPerKwEUR = p.capexEurKw || 4800;
    const constructionMonths = p.constructionTimeMonths || 36;
    const constructionYears = constructionMonths / 12;

    const isFOAK = p.status !== 'Operativo' && (p.targetYear <= 2032 || p.generation === 'Gen IV');
    const isConstruction = p.status === 'En Construcción';
    const isOperational = p.status === 'Operativo';

    // 1. Direct Overnight Capital Cost (€M)
    const directOccTotal = (netCapacityMWe * 1000 * occPerKwEUR) / 1e6;

    // 2. Indirect EPC & Licensing (€M) (18% of Direct OCC)
    const indirectEpc = directOccTotal * 0.18;

    // 3. FOAK Construction Contingencies (€M) (20% para FOAK, 8% para NOAK, 5% operativo)
    const contingencyRate = isOperational ? 0.05 : (isFOAK ? 0.20 : 0.08);
    const foakContingency = directOccTotal * contingencyRate;

    // 4. IDC Financing (€M)
    // Formula: (Direct_OCC_Total + Indirect_EPC) * ((1 + WACC)^(constructionYears / 2) - 1)
    const idcRate = Math.pow(1 + wacc, constructionYears / 2) - 1;
    const idcFinancing = (directOccTotal + indirectEpc) * idcRate;

    // 5. Total Capital Investment (TCI) (€M)
    const totalCapitalInvestmentTci = directOccTotal + indirectEpc + foakContingency + idcFinancing;

    // 6. LCOE Calculation (€/MWh) dinámico y sensible al WACC
    const lifeYears = 60;
    const crf = (wacc * Math.pow(1 + wacc, lifeYears)) / (Math.pow(1 + wacc, lifeYears) - 1);
    const annualCapexCostEur = (totalCapitalInvestmentTci * 1e6) * crf;
    const availabilityFactor = p.availabilityFactor || 0.92;
    const annualGenMWh = netCapacityMWe * 8760 * availabilityFactor;
    const lcoeCapex = annualCapexCostEur / annualGenMWh;

    const fixedOmEurYear = netCapacityMWe * 65000; // 65 €/kWe-año
    const lcoeFixedOm = fixedOmEurYear / annualGenMWh;
    const varOmEurMWh = 4.5;
    const fuelCostEurMWh = p.generation === 'Gen IV' ? 8.5 : 7.0;
    const wasteDecomEurMWh = 2.5;

    const lcoeTotalEurMWh = Math.round(lcoeCapex + lcoeFixedOm + varOmEurMWh + fuelCostEurMWh + wasteDecomEurMWh);

    // Formateador estándar comercial español en M€ (ej. 3.810 M€, 1.440 M€, 159 M€)
    function fmtEur(m) {
      return `${Math.round(m).toLocaleString('es-ES')} M€`;
    }

    // Matriz de Riesgo y Cuellos de Botella
    let delayRiskBadge = '+14 meses (Margen FOAK)';
    let licensingProgressPct = 68;
    let licensingStageText = 'Fase 3: Evaluación de Seguridad de Emplazamiento (VDA / PAA)';
    let completionRiskPct = isFOAK ? 36 : 24;
    let completionRiskLabel = isFOAK ? 'Riesgo Moderado (Primer reactor FOAK)' : 'Riesgo Controlado (Serie Comercial)';
    let supplyChainRisk = p.generation === 'Gen IV' 
      ? 'Alto (Dependencia HALEU >5% y forjas especiales)' 
      : 'Medio (Cadena europea LWR en cualificación)';

    if (isOperational) {
      delayRiskBadge = 'Operativo comercial';
      licensingProgressPct = 100;
      licensingStageText = 'Licencia de Explotación Comercial Vigente';
      completionRiskPct = 4;
      completionRiskLabel = 'Riesgo Mínimo (Activo en Operación)';
      supplyChainRisk = 'Bajo (Combustible y recambios asegurados)';
    } else if (isConstruction) {
      delayRiskBadge = '+8 meses (Margen de obra civil)';
      licensingProgressPct = 88;
      licensingStageText = 'Fase Final: Permiso de Carga de Núcleo y Ensayos';
      completionRiskPct = 18;
      completionRiskLabel = 'Riesgo Bajo (Obra Civil Avanzada)';
      supplyChainRisk = 'Medio (Suministro de módulos en taller)';
    } else if (p.targetYear > 2033) {
      delayRiskBadge = '+12 meses (Margen de fase pre-FID)';
      licensingProgressPct = 45;
      licensingStageText = 'Fase 2: Revisión Pre-Licenciamiento y Selección de Sitio';
      completionRiskPct = 42;
      completionRiskLabel = 'Riesgo Moderado-Alto (Fase Pre-FID)';
      supplyChainRisk = 'Medio-Alto (Estandarización de componentes)';
    }

    const offtakeData = deriveOfftakeStrategy(p);

    return {
      netCapacityMWe,
      occPerKwEUR,
      constructionYears,
      constructionMonths,
      wacc,
      isFOAK,
      directOccTotal,
      indirectEpc,
      foakContingency,
      idcFinancing,
      totalCapitalInvestmentTci,
      lcoeTotalEurMWh,
      directOccFmt: fmtEur(directOccTotal),
      indirectEpcFmt: fmtEur(indirectEpc),
      foakContingencyFmt: fmtEur(foakContingency),
      idcFinancingFmt: fmtEur(idcFinancing),
      tciFmt: fmtEur(totalCapitalInvestmentTci),
      directOccPct: Math.round((directOccTotal / totalCapitalInvestmentTci) * 100),
      indirectEpcPct: Math.round((indirectEpc / totalCapitalInvestmentTci) * 100),
      foakContingencyPct: Math.round((foakContingency / totalCapitalInvestmentTci) * 100),
      idcPct: Math.round((idcFinancing / totalCapitalInvestmentTci) * 100),
      delayRiskBadge,
      licensingProgressPct,
      licensingStageText,
      completionRiskPct,
      completionRiskLabel,
      supplyChainRisk,
      offtakeData
    };
  }

  function getProjectModulesInfo(p) {
    if (p.modules) return `${p.modules} módulo${p.modules > 1 ? 's' : ''}`;
    const str = `${p.reactorModel || ''} ${p.name || ''}`;
    const multMatch = str.match(/(\d+)\s*[xX]\s*\d+\s*MWe/i);
    if (multMatch) return `${multMatch[1]} módulos`;
    const unitMatch = str.match(/(\d+)\s*(?:módulos|unidades|reactores)/i);
    if (unitMatch) return `${unitMatch[1]} módulos`;
    const rangeMatch = str.match(/(\d+\s*a\s*\d+)\s*(?:módulos|unidades|reactores)/i);
    if (rangeMatch) return `${rangeMatch[1]} reactores`;
    if (str.includes('BWRX-300') && p.netElectricCapacityMWe) {
      const count = Math.round(p.netElectricCapacityMWe / 300);
      if (count > 1) return `${count} módulos`;
    }
    return '1 módulo';
  }

  function renderDrawerCapexDonut(fin) {
    const canvas = document.getElementById('drawer-capex-donut');
    if (!canvas || typeof Chart === 'undefined') return;

    if (state.chartInstances['drawer-capex-donut']) {
      state.chartInstances['drawer-capex-donut'].destroy();
    }

    const ctx = canvas.getContext('2d');
    state.chartInstances['drawer-capex-donut'] = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: [
          'Coste Físico de Planta (OCC)',
          'Ingeniería y Permisos (EPC)',
          fin.isFOAK ? 'Fondo para Imprevistos (FOAK)' : 'Fondo para Imprevistos (NOAK)',
          'Intereses Bancarios en Obra (IDC)'
        ],
        datasets: [{
          data: [
            Math.round(fin.directOccTotal),
            Math.round(fin.indirectEpc),
            Math.round(fin.foakContingency),
            Math.round(fin.idcFinancing)
          ],
          backgroundColor: ['#00e5ff', '#38bdf8', '#f59e0b', '#a855f7'],
          hoverBackgroundColor: ['#33eaff', '#60a5fa', '#fbbf24', '#c084fc'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '70%',
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.94)',
            titleColor: '#ffffff',
            bodyColor: '#f1f5f9',
            borderColor: 'rgba(255, 255, 255, 0.15)',
            borderWidth: 1,
            padding: 8,
            callbacks: {
              label: function(item) {
                return ` ${item.label}: ${item.raw.toLocaleString('es-ES')} M€`;
              }
            }
          }
        },
        animation: {
          animateScale: true,
          duration: 450
        }
      }
    });
  }

  function updateDrawerFinancials(project, wacc) {
    const fin = calculateSMRFinancials(project, wacc);

    // 1. KPIs Superiores en Español Claro (100% consistencia con el Donut en M€)
    document.getElementById('drawer-fin-tci').textContent = fin.tciFmt;
    document.getElementById('drawer-fin-tci-sub').textContent = `Presupuesto total llave en mano (${(wacc * 100).toFixed(1)}% WACC)`;
    document.getElementById('drawer-fin-occ-total').textContent = fin.directOccFmt;
    document.getElementById('drawer-fin-occ-rate').textContent = `${fin.occPerKwEUR.toLocaleString('es-ES')} €/kWe neto instalado`;
    document.getElementById('drawer-fin-lcoe').textContent = `${fin.lcoeTotalEurMWh} €/MWh`;
    document.getElementById('drawer-fin-lcoe-sub').textContent = `Precio necesario para rentabilizar la planta (${(wacc * 100).toFixed(1)}% WACC)`;
    document.getElementById('drawer-fin-idc').textContent = fin.idcFinancingFmt;
    document.getElementById('drawer-fin-idc-sub').textContent = `Intereses devengados durante la obra (${fin.constructionMonths} meses)`;

    // 2. Desglose en Leyenda Donut Chart en Español Claro
    document.getElementById('drawer-capex-occ-val').textContent = `${fin.directOccFmt} (${fin.directOccPct}%)`;
    document.getElementById('drawer-capex-ind-val').textContent = `${fin.indirectEpcFmt} (${fin.indirectEpcPct}%)`;
    const contLbl = document.getElementById('drawer-capex-cont-lbl');
    if (contLbl) contLbl.textContent = fin.isFOAK ? 'Fondo para Imprevistos (FOAK):' : 'Fondo para Imprevistos (NOAK):';
    document.getElementById('drawer-capex-cont-val').textContent = `${fin.foakContingencyFmt} (${fin.foakContingencyPct}%)`;
    document.getElementById('drawer-capex-idc-val').textContent = `${fin.idcFinancingFmt} (${fin.idcPct}%)`;

    // 3. Renderizar Donut Chart
    renderDrawerCapexDonut(fin);

    // 4. Actualizar Tag WACC Activo
    const waccTag = document.getElementById('drawer-wacc-active-tag');
    if (waccTag) waccTag.textContent = `${(wacc * 100).toFixed(1)}% WACC`;

    return fin;
  }

  function openProjectDrawer(project) {
    state.selectedProject = project;
    const drawer = document.getElementById('smr-detail-drawer');
    if (!drawer) return;

    // Sincronizar botones de WACC con state.selectedWacc
    document.querySelectorAll('.btn-wacc').forEach(btn => {
      const bWacc = parseFloat(btn.getAttribute('data-wacc'));
      if (Math.abs(bWacc - state.selectedWacc) < 0.005) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // 1. Cabecera Institucional
    document.getElementById('drawer-flag').textContent = getFlagEmoji(project.countryCode);
    document.getElementById('drawer-country-name').textContent = project.country;
    document.getElementById('drawer-project-title').textContent = project.name;

    // Badge prominente de Potencia Neta y Factor de Capacidad
    const powerBadgeContent = document.getElementById('drawer-power-badge-content');
    if (powerBadgeContent) {
      const modInfo = getProjectModulesInfo(project);
      const powerText = project.netElectricCapacityMWe > 0 
        ? `${project.netElectricCapacityMWe.toLocaleString('es-ES')} MWe` 
        : `${(project.thermalCapacityMWt || 300).toLocaleString('es-ES')} MWt (Térmico)`;
      const cfPct = Math.round((project.availabilityFactor || 0.90) * 100);
      const smrClassText = project.smrClass ? ` • ${project.smrClass}` : ' • SMR de Potencia Media';
      powerBadgeContent.textContent = `⚡ Potencia SMR: ${powerText} (${modInfo})${smrClassText} • Factor de Capacidad: ${cfPct}%`;
    }

    document.getElementById('drawer-dev-tag').textContent = `Promotor: ${project.developer} | ${project.location}`;

    // Badges Especiales de Ingeniería: Buque Flotante, Hidrógeno Verde, Categoría SMR
    const specialBadges = document.getElementById('drawer-special-badges');
    if (specialBadges) {
      let bHtml = '';
      if (project.floatingVessel) {
        bHtml += `<span style="background: rgba(14, 165, 233, 0.2); color: #38bdf8; border: 1px solid rgba(14, 165, 233, 0.5); padding: 3px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">🚢 CENTRAL EN BUQUE / BARCO FLOTANTE</span>`;
      }
      if (project.greenHydrogenFocus) {
        bHtml += `<span style="background: rgba(34, 197, 94, 0.2); color: #4ade80; border: 1px solid rgba(34, 197, 94, 0.5); padding: 3px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">🟢 PRODUCCIÓN DE HIDRÓGENO VERDE</span>`;
      }
      bHtml += `<span style="background: rgba(99, 102, 241, 0.15); color: #a5b4fc; border: 1px solid rgba(99, 102, 241, 0.4); padding: 3px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 700; display: inline-flex; align-items: center; gap: 4px;">⚛️ CATEGORÍA SMR (POTENCIA MEDIA / BAJA)</span>`;
      specialBadges.innerHTML = bHtml;
    }

    // 2. Banner de Estado
    const statusBanner = document.getElementById('drawer-status-banner');
    let statusClass = 'h2030';
    let statusText = `Horizonte Comercial: ${project.targetYear} (${project.timelinePhase})`;
    if (project.status === 'Operativo') {
      statusClass = 'op';
      statusText = `✅ YA INSTALADO / EN OPERACIÓN COMERCIAL (Desde ${project.targetYear})`;
    } else if (project.status === 'En Construcción') {
      statusClass = 'const';
      statusText = `🚧 EN CONSTRUCCIÓN ACTIVA (Puesta en Marcha: ${project.targetYear})`;
    } else if (project.status === 'Horizonte 2035+') {
      statusClass = 'h2035';
      statusText = `🔮 DESARROLLO HORIZONTE 2035-2040+ (${project.timelinePhase})`;
    }
    statusBanner.className = `status-banner ${statusClass}`;
    statusBanner.textContent = statusText;

    // 3. Calcular y Actualizar Métricas Financieras (Single Formula Engine)
    const fin = updateDrawerFinancials(project, state.selectedWacc);

    // 4. Estrategia de Off-take y Bancabilidad
    const offtakeBuyer = document.getElementById('drawer-offtake-buyer');
    if (offtakeBuyer) offtakeBuyer.textContent = fin.offtakeData.offtaker;
    const offtakeMech = document.getElementById('drawer-offtake-mechanism');
    if (offtakeMech) offtakeMech.textContent = fin.offtakeData.mechanism;
    const offtakeRisk = document.getElementById('drawer-offtake-risk');
    if (offtakeRisk) {
      offtakeRisk.innerHTML = `<span class="cannibalization-badge ${fin.offtakeData.cannibalization.colorClass}">${fin.offtakeData.cannibalization.badge}</span>`;
    }

    // 5. Matriz de Riesgo y Barras de Progreso
    document.getElementById('drawer-licensing-pct').textContent = `${fin.licensingProgressPct}%`;
    const licensingBar = document.getElementById('drawer-licensing-bar');
    if (licensingBar) licensingBar.style.width = `${fin.licensingProgressPct}%`;
    document.getElementById('drawer-licensing-stage').textContent = fin.licensingStageText;

    document.getElementById('drawer-risk-score-pct').textContent = `${fin.completionRiskPct}%`;
    const riskScoreBar = document.getElementById('drawer-risk-score-bar');
    if (riskScoreBar) riskScoreBar.style.width = `${fin.completionRiskPct}%`;
    document.getElementById('drawer-risk-score-desc').textContent = fin.completionRiskLabel;

    document.getElementById('drawer-delay-badge').textContent = fin.delayRiskBadge;
    document.getElementById('drawer-supply-chain-tag').textContent = fin.supplyChainRisk;

    // 6. Parámetros Técnicos
    document.getElementById('drawer-val-electric').textContent = project.netElectricCapacityMWe > 0 ? `${project.netElectricCapacityMWe} MWe` : 'Térmico Puro';
    document.getElementById('drawer-val-thermal').textContent = `${project.thermalCapacityMWt} MWt`;
    document.getElementById('drawer-val-gen').textContent = `${project.annualGenerationGWh.toLocaleString('es-ES')} GWh/año`;
    document.getElementById('drawer-val-leadtime').textContent = `${project.constructionTimeMonths || 36} meses`;

    // 7. Mitigación de CO2
    document.getElementById('drawer-co2-coal').textContent = `${(project.co2AvoidedCoalTonYear / 1e6).toFixed(2)} Mt CO₂/año`;
    document.getElementById('drawer-co2-gas').textContent = `${(project.co2AvoidedGasTonYear / 1e6).toFixed(2)} Mt CO₂/año`;
    document.getElementById('drawer-co2-lifetime').textContent = `${((project.co2AvoidedCoalTonYear * 60) / 1e6).toFixed(0)} Mt CO₂`;

    // 8. Integración en Red y Mercado
    document.getElementById('drawer-market-role').textContent = project.marketRole;
    document.getElementById('drawer-load-following').textContent = project.loadFollowingDetails;
    document.getElementById('drawer-grid-services').textContent = project.gridServices;
    document.getElementById('drawer-sector-coupling').textContent = project.sectorCoupling;

    // Reutilización de Carbón
    const coalRepurposingBox = document.getElementById('drawer-coal-box');
    if (coalRepurposingBox) {
      if (project.coalRepurposing) {
        coalRepurposingBox.style.display = 'block';
        document.getElementById('drawer-coal-details').textContent = project.coalRepurposingDetails;
      } else {
        coalRepurposingBox.style.display = 'none';
      }
    }

    // Encaje en Alianza SMR UE
    const euBox = document.getElementById('drawer-eu-box');
    if (euBox) {
      if (project.euTrack) {
        euBox.style.display = 'block';
        document.getElementById('drawer-eu-details').textContent = project.euAllianceProject;
      } else {
        euBox.style.display = 'none';
      }
    }

    // Central Nuclear Flotante en Buque (Rusia / Rosatom)
    const floatingBox = document.getElementById('drawer-floating-box');
    if (floatingBox) {
      if (project.floatingVessel) {
        floatingBox.style.display = 'block';
        document.getElementById('drawer-floating-details').textContent = project.floatingVesselDetails || 'Central nuclear instalada íntegramente a bordo de un buque flotante naval.';
      } else {
        floatingBox.style.display = 'none';
      }
    }

    // Producción de Hidrógeno Verde (Japón Tokio/Oarai HTTR)
    const hydrogenBox = document.getElementById('drawer-hydrogen-box');
    if (hydrogenBox) {
      if (project.greenHydrogenFocus) {
        hydrogenBox.style.display = 'block';
        document.getElementById('drawer-hydrogen-details').textContent = project.greenHydrogenDetails || 'Reactor SMR de muy alta temperatura optimizado para generar hidrógeno verde masivo.';
      } else {
        hydrogenBox.style.display = 'none';
      }
    }

    // Abrir Sliding Drawer y añadir clase al body para desplazar controles
    drawer.classList.add('open');
    document.body.classList.add('drawer-open');

    // Centrar mapa de manera matemática en el área visible (a la izquierda del drawer de 420px)
    if (state.map) {
      const drawerW = Math.min(420, window.innerWidth * 0.94);
      const zoom = Math.max(state.map.getZoom(), 6);
      const point = state.map.project([project.lat, project.lng], zoom);
      const offsetPoint = point.add([drawerW / 2, 0]);
      const targetLatLng = state.map.unproject(offsetPoint, zoom);
      state.map.flyTo(targetLatLng, zoom, { duration: 0.85 });
    }
  }

  function closeProjectDrawer() {
    const drawer = document.getElementById('smr-detail-drawer');
    if (drawer) drawer.classList.remove('open');
    document.body.classList.remove('drawer-open');
    if (state.chartInstances['drawer-capex-donut']) {
      state.chartInstances['drawer-capex-donut'].destroy();
      delete state.chartInstances['drawer-capex-donut'];
    }
    state.selectedProject = null;
  }

  /* =========================================================================
     10. MODO PRESENTACIÓN (100% PANTALLA COMPLETA)
     ========================================================================= */
  function togglePresentationMode() {
    const sidebar = document.getElementById('sidebar-panel');
    if (!sidebar) return;
    const isCollapsed = sidebar.classList.toggle('collapsed');
    const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
    const btnPresentation = document.getElementById('btn-toggle-presentation');
    let banner = document.getElementById('presentation-mode-banner');

    if (btnToggleSidebar) btnToggleSidebar.textContent = isCollapsed ? '▶' : '◀';
    if (btnPresentation) {
      if (isCollapsed) btnPresentation.classList.add('active');
      else btnPresentation.classList.remove('active');
    }

    if (isCollapsed) {
      if (!banner) {
        banner = document.createElement('div');
        banner.id = 'presentation-mode-banner';
        banner.className = 'presentation-mode-badge';
        banner.innerHTML = `<span>📺 Modo Presentación Activo (Pantalla Completa)</span><button id="btn-exit-presentation" style="background:none;border:none;color:#ffffff;cursor:pointer;margin-left:8px;font-size:12px;" title="Salir de pantalla completa">✕</button>`;
        const wrapper = document.querySelector('.map-viewport-wrapper');
        if (wrapper) wrapper.appendChild(banner);
        document.getElementById('btn-exit-presentation').addEventListener('click', togglePresentationMode);
      } else {
        banner.style.display = 'flex';
      }
    } else {
      if (banner) banner.style.display = 'none';
    }

    // Redimensionar el mapa de Leaflet tras la transición de anchura
    setTimeout(() => {
      if (state.map) state.map.invalidateSize();
    }, 320);
  }

  /* =========================================================================
     11. SIMULADOR ECONÓMICO LCOE, FINANCIACIÓN Y RENTABILIDAD DE MERCADO
     ========================================================================= */
  function initEconomicCalculator() {
    const inputCapacity = document.getElementById('calc-in-capacity');
    const inputCapex = document.getElementById('calc-in-capex');
    const inputCf = document.getElementById('calc-in-cf');
    const inputWacc = document.getElementById('calc-in-wacc');
    const inputCo2Price = document.getElementById('calc-in-co2');
    const inputPoolPrice = document.getElementById('calc-in-pool');

    // Botones de Escenarios Predefinidos de la Industria
    const scenarioButtons = document.querySelectorAll('.btn-scenario');
    const SCENARIOS = {
      noak: { capacity: 300, capex: 4500, cf: 92, wacc: 6.5, pool: 75, co2: 80 },
      coal: { capacity: 300, capex: 3400, cf: 93, wacc: 6.0, pool: 75, co2: 80 },
      foak: { capacity: 300, capex: 6500, cf: 85, wacc: 8.0, pool: 75, co2: 80 },
      rab:  { capacity: 300, capex: 4500, cf: 94, wacc: 4.5, pool: 75, co2: 80 }
    };

    scenarioButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        scenarioButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const sKey = btn.getAttribute('data-scenario');
        const s = SCENARIOS[sKey];
        if (s) {
          if (inputCapacity) inputCapacity.value = s.capacity;
          if (inputCapex) inputCapex.value = s.capex;
          if (inputCf) inputCf.value = s.cf;
          if (inputWacc) inputWacc.value = s.wacc;
          if (inputPoolPrice) inputPoolPrice.value = s.pool;
          if (inputCo2Price) inputCo2Price.value = s.co2;
          updateCalc();
        }
      });
    });

    const updateCalc = () => {
      const capMWe = parseFloat(inputCapacity.value);
      const capexKw = parseFloat(inputCapex.value);
      const cf = parseFloat(inputCf.value) / 100;
      const wacc = parseFloat(inputWacc.value) / 100;
      const co2Price = parseFloat(inputCo2Price.value);
      const poolPrice = parseFloat(inputPoolPrice.value);
      const lifeYears = 60;

      // Actualizar valores textuales junto a sliders
      document.getElementById('val-disp-capacity').textContent = `${capMWe} MWe`;
      document.getElementById('val-disp-capex').textContent = `${capexKw.toLocaleString('es-ES')} €/kWe`;
      document.getElementById('val-disp-cf').textContent = `${(cf * 100).toFixed(0)} %`;
      document.getElementById('val-disp-wacc').textContent = `${(wacc * 100).toFixed(1)} %`;
      document.getElementById('val-disp-co2').textContent = `${co2Price} €/t CO₂`;
      document.getElementById('val-disp-pool').textContent = `${poolPrice} €/MWh`;

      // 1. Inversión Total Inicial (I₀ en M€)
      const totalCapexM = (capMWe * 1000 * capexKw) / 1e6;

      // 2. Generación anual neta MWh
      const annualGenMWh = capMWe * 8760 * cf;

      // 3. Factor de Recuperación de Capital (CRF) a 60 años
      const crf = (wacc * Math.pow(1 + wacc, lifeYears)) / (Math.pow(1 + wacc, lifeYears) - 1);
      const annualCapexCost = (totalCapexM * 1e6) * crf;
      const lcoeCapex = annualCapexCost / annualGenMWh;

      // 4. Componentes OPEX, Combustible y Desmantelamiento
      const fixedOmEurYear = capMWe * 65000;
      const lcoeFixedOm = fixedOmEurYear / annualGenMWh;
      const varOmEurMWh = 4.5;
      const lcoeOpex = lcoeFixedOm + varOmEurMWh;
      const fuelCostEurMWh = 7.5;
      const wasteDecomEurMWh = 2.5;

      // 5. Coste Nivelado Total LCOE (€/MWh)
      const lcoeSmr = lcoeCapex + lcoeOpex + fuelCostEurMWh + wasteDecomEurMWh;

      // 6. Evaluación de Rentabilidad (Ingresos, EBITDA, VAN, Payback)
      const annualRevenueM = (annualGenMWh * poolPrice) / 1e6;
      const annualOpexM = (fixedOmEurYear + (annualGenMWh * (varOmEurMWh + fuelCostEurMWh + wasteDecomEurMWh))) / 1e6;
      const ebitdaM = annualRevenueM - annualOpexM;
      const vanM = (ebitdaM / crf) - totalCapexM;

      let paybackYears = '> 60 años';
      const pRatio = (totalCapexM * wacc) / ebitdaM;
      if (ebitdaM > 0 && pRatio < 1) {
        const pb = -Math.log(1 - pRatio) / Math.log(1 + wacc);
        paybackYears = pb < 60 ? `${pb.toFixed(1)} años` : '> 60 años';
      }

      // 7. Comparativas de Mercado
      const ccgtCapitalOm = 14.0;
      const ccgtFuelGas = 62.0;
      const ccgtCo2Cost = 0.38 * co2Price;
      const lcoeCcgt = ccgtCapitalOm + ccgtFuelGas + ccgtCo2Cost;
      const lcoeSolarPlusStorage = 32.0 + 45.0;

      // 8. Beneficios Ambientales y Derechos EU ETS
      const annualCo2AvoidedMt = (annualGenMWh * 0.40) / 1e6;
      const annualCo2SavingsM = annualCo2AvoidedMt * co2Price;
      const spreadVsGas = lcoeCcgt - lcoeSmr;

      // Renderizar Valores en Pantalla
      document.getElementById('calc-res-lcoe-smr').textContent = `${lcoeSmr.toFixed(1)} €/MWh`;
      document.getElementById('calc-breakdown-capex').textContent = `${lcoeCapex.toFixed(1)} €/MWh`;
      document.getElementById('calc-breakdown-opex').textContent = `${lcoeOpex.toFixed(1)} €/MWh`;
      document.getElementById('calc-breakdown-fuel').textContent = `${fuelCostEurMWh.toFixed(1)} €/MWh`;
      document.getElementById('calc-breakdown-decom').textContent = `${wasteDecomEurMWh.toFixed(1)} €/MWh`;
      document.getElementById('calc-breakdown-total').textContent = `${lcoeSmr.toFixed(1)} €/MWh`;

      document.getElementById('calc-res-total-capex').textContent = `${Math.round(totalCapexM).toLocaleString('es-ES')} M€`;
      document.getElementById('calc-res-annual-rev').textContent = `${annualRevenueM.toFixed(1)} M€/año`;
      document.getElementById('calc-res-ebitda').textContent = `${ebitdaM.toFixed(1)} M€/año`;

      const vanEl = document.getElementById('calc-res-van');
      if (vanEl) {
        vanEl.textContent = `${vanM >= 0 ? '+' : ''}${Math.round(vanM).toLocaleString('es-ES')} M€`;
        vanEl.className = vanM >= 0 ? 'calc-num-cell calc-positive' : 'calc-num-cell';
      }

      document.getElementById('calc-res-payback').textContent = paybackYears;
      document.getElementById('calc-res-lcoe-ccgt').textContent = `${lcoeCcgt.toFixed(1)} €/MWh`;
      document.getElementById('calc-res-lcoe-pv-bess').textContent = `${lcoeSolarPlusStorage.toFixed(1)} €/MWh`;
      document.getElementById('calc-res-co2-savings').textContent = `${annualCo2SavingsM.toFixed(1)} M€/año`;

      const compGasEl = document.getElementById('calc-res-spread-gas');
      if (compGasEl) {
        if (spreadVsGas >= 0) {
          compGasEl.innerHTML = `<strong>Diagnóstico de Mercado:</strong> Ventaja económica de <strong>+${spreadVsGas.toFixed(1)} €/MWh</strong> frente a Ciclo Combinado de Gas. La central genera un VAN positivo de <strong>+${Math.round(vanM).toLocaleString('es-ES')} M€</strong> y recupera la inversión en <strong>${paybackYears}</strong>.`;
        } else {
          compGasEl.innerHTML = `<strong>Diagnóstico de Mercado:</strong> Sobrecoste de <strong>${Math.abs(spreadVsGas).toFixed(1)} €/MWh</strong> frente a gas fósil. Alcanzaría paridad económica si el derecho de emisión de CO₂ supera los <strong>${((lcoeSmr - ccgtCapitalOm - ccgtFuelGas) / 0.38).toFixed(0)} €/t</strong>.`;
        }
      }
    };

    [inputCapacity, inputCapex, inputCf, inputWacc, inputCo2Price, inputPoolPrice].forEach(input => {
      if (input) input.addEventListener('input', updateCalc);
    });

    updateCalc();
  }

  function loadProjectIntoCalculator(p) {
    if (!p) return;
    const inputCapacity = document.getElementById('calc-in-capacity');
    const inputCapex = document.getElementById('calc-in-capex');
    const inputCf = document.getElementById('calc-in-cf');
    if (inputCapacity) inputCapacity.value = p.netElectricCapacityMWe > 0 ? p.netElectricCapacityMWe : 300;
    if (inputCapex) inputCapex.value = p.capexEurKw;
    if (inputCf) inputCf.value = Math.round(p.availabilityFactor * 100);

    document.querySelectorAll('.btn-scenario').forEach(b => b.classList.remove('active'));

    inputCapacity.dispatchEvent(new Event('input'));
    openModal('modal-calculator');
  }

  /* =========================================================================
     12. DASHBOARD DE GRÁFICOS (Chart.js)
     ========================================================================= */
  function renderChartsDashboard() {
    if (typeof Chart === 'undefined') return;

    Object.values(state.chartInstances).forEach(chart => chart.destroy());
    state.chartInstances = {};

    const isDark = state.theme === 'dark';
    const textColor = isDark ? '#94a3b8' : '#475569';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';

    // Gráfico 1: Capacidad SMR en Europa por País al 2035 (MWe)
    const ctxEurope = document.getElementById('chart-europe-capacity');
    if (ctxEurope) {
      const euProjects = (window.SMR_DATABASE || []).filter(p => p.region === 'Europa');
      const countryCap = {};
      euProjects.forEach(p => {
        countryCap[p.country] = (countryCap[p.country] || 0) + p.netElectricCapacityMWe;
      });

      const sortedCountries = Object.keys(countryCap).sort((a, b) => countryCap[b] - countryCap[a]);

      state.chartInstances.europe = new Chart(ctxEurope, {
        type: 'bar',
        data: {
          labels: sortedCountries,
          datasets: [{
            label: 'Capacidad SMR Prevista (MWe)',
            data: sortedCountries.map(c => countryCap[c]),
            backgroundColor: [
              '#0284c7', '#3b82f6', '#8b5cf6', '#10b981', '#f59e0b',
              '#ec4899', '#06b6d4', '#6366f1', '#14b8a6', '#f43f5e'
            ],
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => `Capacidad: ${ctx.raw.toLocaleString('es-ES')} MWe instalados`
              }
            }
          },
          scales: {
            x: { ticks: { color: textColor }, grid: { display: false } },
            y: { ticks: { color: textColor }, grid: { color: gridColor } }
          }
        }
      });
    }

    // Gráfico 2: Reparto de Potencia por Familia Tecnológica (Barras Horizontales de Alta Legibilidad)
    const ctxTech = document.getElementById('chart-tech-distrib');
    if (ctxTech) {
      const techAgg = {
        'PWR': { name: 'iPWR · Agua a Presión', cap: 0, count: 0, color: '#00e5ff' },
        'BWR': { name: 'iBWR · Agua en Ebullición', cap: 0, count: 0, color: '#38bdf8' },
        'LFR': { name: 'LFR · Plomo Rápido (Gen IV)', cap: 0, count: 0, color: '#10b981' },
        'HTGR': { name: 'HTGR · Gas Alta Temp.', cap: 0, count: 0, color: '#f59e0b' },
        'SFR': { name: 'SFR · Sodio Rápido', cap: 0, count: 0, color: '#6366f1' },
        'MSR': { name: 'MSR · Sales Fundidas', cap: 0, count: 0, color: '#a855f7' }
      };

      let totalCap = 0;
      (window.SMR_DATABASE || []).forEach(p => {
        const t = (p.technology || '').toUpperCase();
        if (techAgg[t]) {
          techAgg[t].cap += (p.netElectricCapacityMWe || 0);
          techAgg[t].count += 1;
          totalCap += (p.netElectricCapacityMWe || 0);
        }
      });

      const sortedTechKeys = Object.keys(techAgg).sort((a, b) => techAgg[b].cap - techAgg[a].cap);
      const labels = sortedTechKeys.map(k => techAgg[k].name);
      const dataValues = sortedTechKeys.map(k => techAgg[k].cap);
      const colors = sortedTechKeys.map(k => techAgg[k].color);

      state.chartInstances.tech = new Chart(ctxTech, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Capacidad SMR Prevista (MWe)',
            data: dataValues,
            backgroundColor: colors,
            borderRadius: 6,
            barThickness: 16
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => {
                  const key = sortedTechKeys[ctx.dataIndex];
                  const info = techAgg[key];
                  const pct = totalCap > 0 ? ((info.cap / totalCap) * 100).toFixed(1) : 0;
                  return ` Capacidad: ${info.cap.toLocaleString('es-ES')} MWe · ${info.count} reactores (${pct}% del total)`;
                }
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: textColor,
                maxRotation: 0,
                minRotation: 0,
                maxTicksLimit: 5,
                callback: val => `${val.toLocaleString('es-ES')} MWe`
              },
              grid: { color: gridColor },
              title: { display: true, text: 'Capacidad SMR Prevista (MWe)', color: textColor, font: { size: 10 } }
            },
            y: {
              ticks: { color: textColor, font: { size: 10.5, weight: '500' } },
              grid: { display: false }
            }
          }
        }
      });
    }

    // Gráfico 3: Benchmark de Competitividad LCOE en el Mercado Eléctrico Europeo (€/MWh)
    const ctxLearning = document.getElementById('chart-learning-curve');
    if (ctxLearning) {
      const benchmarkData = [
        { tech: '🎯 SMR Serie Comercial (NOAK)', lcoe: 56, type: 'smr-noak', color: '#00e5ff' },
        { tech: '💨 Eólica Terrestre (Onshore)', lcoe: 62, type: 'renovable', color: '#0ea5e9' },
        { tech: '☀️ Solar FV + Baterías (4h)', lcoe: 76, type: 'renovable', color: '#38bdf8' },
        { tech: '🌊 Eólica Marina (Offshore)', lcoe: 88, type: 'renovable', color: '#0284c7' },
        { tech: '⚡ SMR 1ª Unidad (FOAK)', lcoe: 98, type: 'smr-foak', color: '#f59e0b' },
        { tech: '🔥 Gas CCGT (+ CO₂ ETS 80€/t)', lcoe: 112, type: 'fossil', color: '#f43f5e' },
        { tech: '⚛️ Giga-Nuclear EPR (Convencional)', lcoe: 125, type: 'nuclear-conv', color: '#8b5cf6' }
      ];

      state.chartInstances.learning = new Chart(ctxLearning, {
        type: 'bar',
        data: {
          labels: benchmarkData.map(d => d.tech),
          datasets: [{
            label: 'Coste Nivelado (LCOE)',
            data: benchmarkData.map(d => d.lcoe),
            backgroundColor: benchmarkData.map(d => d.color),
            borderRadius: 6,
            barThickness: 15
          }]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: ctx => {
                  const item = benchmarkData[ctx.dataIndex];
                  if (item.type === 'smr-noak') {
                    return ` LCOE: ${item.lcoe} €/MWh · Reducción de coste del 43% vs FOAK (Efecto serie en fábrica)`;
                  } else if (item.type === 'smr-foak') {
                    return ` LCOE: ${item.lcoe} €/MWh · Primera unidad comercial con 20% contingencias`;
                  } else if (item.type === 'fossil') {
                    return ` LCOE: ${item.lcoe} €/MWh · Ciclo combinado expuesto a ETS (>80€/t) y precio de gas`;
                  } else if (item.type === 'nuclear-conv') {
                    return ` LCOE: ${item.lcoe} €/MWh · Gigavatio convencional (Flamanville/HPC) con 10-15 años de obra`;
                  }
                  return ` LCOE: ${item.lcoe} €/MWh (Benchmark Mercado Europeo)`;
                }
              }
            }
          },
          scales: {
            x: {
              ticks: { color: textColor, callback: val => `${val} €` },
              grid: { color: gridColor },
              title: { display: true, text: 'Coste Nivelado de la Electricidad (€/MWh)', color: textColor, font: { size: 10 } }
            },
            y: {
              ticks: { color: textColor, font: { size: 10.5, weight: '500' } },
              grid: { display: false }
            }
          }
        }
      });
    }

    // Gráfico 4: Mitigación de CO2
    const ctxCo2 = document.getElementById('chart-co2-mitigation');
    if (ctxCo2) {
      state.chartInstances.co2 = new Chart(ctxCo2, {
        type: 'bar',
        data: {
          labels: ['2025', '2030', '2035', '2040', '2045', '2050'],
          datasets: [
            {
              label: 'Ahorro vs Carbón (Mt CO₂/año)',
              data: [4.2, 18.5, 68.4, 142.0, 230.5, 315.0],
              backgroundColor: '#10b981',
              borderRadius: 6
            },
            {
              label: 'Ahorro vs Gas Natural (Mt CO₂/año)',
              data: [1.8, 7.8, 28.8, 59.8, 97.0, 132.5],
              backgroundColor: '#0284c7',
              borderRadius: 6
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: textColor } }
          },
          scales: {
            x: { ticks: { color: textColor }, grid: { display: false } },
            y: { ticks: { color: textColor }, grid: { color: gridColor }, title: { display: true, text: 'Millones de Toneladas CO₂/año', color: textColor } }
          }
        }
      });
    }
  }

  /* =========================================================================
     13. LÍNEA TEMPORAL Y ANIMACIÓN EVOLUTIVA
     ========================================================================= */
  function renderTimelineStatus() {
    const slider = document.getElementById('timeline-slider');
    const badge = document.getElementById('timeline-status-badge');
    const phase = state.timelinePhases[state.activeTimelineIndex];

    if (slider) slider.value = state.activeTimelineIndex;
    if (badge) badge.textContent = phase.label;

    const labels = document.querySelectorAll('.timeline-labels span');
    labels.forEach((el, idx) => {
      if (idx === state.activeTimelineIndex) el.classList.add('active');
      else el.classList.remove('active');
    });
  }

  function toggleTimelinePlay() {
    const playBtn = document.getElementById('btn-play-timeline');
    if (state.isPlayingTimeline) {
      clearInterval(state.timelineInterval);
      state.isPlayingTimeline = false;
      if (playBtn) playBtn.innerHTML = '▶ Reproducir Evolución';
    } else {
      state.isPlayingTimeline = true;
      if (playBtn) playBtn.innerHTML = '⏸ Pausar';

      state.timelineInterval = setInterval(() => {
        state.activeTimelineIndex = (state.activeTimelineIndex + 1) % state.timelinePhases.length;
        renderTimelineStatus();
        updateFilteredProjects();
      }, 2500);
    }
  }

  /* =========================================================================
     14. MEMORIA TÉCNICO-ECONÓMICA OFICIAL DE INGENIERÍA (FORMATO INFORME A4)
     ========================================================================= */

  function calculateParametricLCOE(p, testWacc, testCF) {
    const fin = calculateSMRFinancials(p, testWacc);
    const n = 60;
    const crf = (testWacc * Math.pow(1 + testWacc, n)) / (Math.pow(1 + testWacc, n) - 1);
    const capacity = p.netElectricCapacityMWe > 0 ? p.netElectricCapacityMWe : (p.thermalCapacityMWt || 300);
    const annualGenMWh = capacity * 8760 * testCF;
    const capitalAnn = (fin.totalCapitalInvestmentTci * 1e6) * crf;
    const fixedOpex = 35 * 1000 * capacity;
    const varOpex = 3.0;
    const fuel = 7.0;
    const decom = 2.0;
    const lcoe = ((capitalAnn + fixedOpex) / annualGenMWh) + varOpex + fuel + decom;
    return Math.round(lcoe);
  }

  function calculateProjectFinancialMetrics(p, fin, wacc) {
    const ppaPrice = 80; // €/MWh precio de referencia PPA baseload industrial
    const annualGenMWh = p.netElectricCapacityMWe > 0 
      ? (p.netElectricCapacityMWe * 8760 * (p.availabilityFactor || 0.90))
      : (p.annualGenerationGWh * 1000);
    const capacity = p.netElectricCapacityMWe > 0 ? p.netElectricCapacityMWe : (p.thermalCapacityMWt || 300);
    
    const annualRevenueMeur = (annualGenMWh * ppaPrice) / 1e6;
    const annualFixedOpexMeur = (35 * 1000 * capacity) / 1e6;
    const annualVarOpexMeur = (annualGenMWh * (3.0 + 7.0 + 2.0)) / 1e6;
    const annualTotalOpexMeur = annualFixedOpexMeur + annualVarOpexMeur;
    const annualCashFlowMeur = annualRevenueMeur - annualTotalOpexMeur;
    const tciMeur = fin.totalCapitalInvestmentTci;

    // VAN (NPV) a 60 años con WACC
    const discountSum = (1 - Math.pow(1 + wacc, -60)) / wacc;
    const npvMeur = Math.round((annualCashFlowMeur * discountSum) - tciMeur);

    // Estimación de TIR (IRR) mediante aproximación bisección
    let irrPct = 0;
    if (annualCashFlowMeur > 0 && tciMeur > 0) {
      let low = 0.01, high = 0.35;
      for (let iter = 0; iter < 24; iter++) {
        const mid = (low + high) / 2;
        const midCrf = (mid * Math.pow(1 + mid, 60)) / (Math.pow(1 + mid, 60) - 1);
        const midNpv = (annualCashFlowMeur / midCrf) - tciMeur;
        if (midNpv > 0) low = mid;
        else high = mid;
      }
      irrPct = ((low + high) / 2 * 100).toFixed(1);
    }

    return {
      ppaPrice,
      annualRevenueMeur: annualRevenueMeur.toFixed(1),
      annualCashFlowMeur: annualCashFlowMeur.toFixed(1),
      npvMeur: npvMeur.toLocaleString('es-ES'),
      irrPct: irrPct > 0 ? `${irrPct}%` : 'N/D'
    };
  }

  function exportProjectToCSV(p) {
    if (!p) {
      p = state.selectedProject || (window.SMR_DATABASE ? window.SMR_DATABASE[0] : null);
    }
    if (!p) return;

    const wacc = state.selectedWacc || 0.07;
    const fin = calculateSMRFinancials(p, wacc);
    const metrics = calculateProjectFinancialMetrics(p, fin, wacc);
    const modInfo = getProjectModulesInfo(p);

    const rows = [
      ["VARIABLE / PARAMETRO TECNICO", "VALOR", "UNIDAD", "CRITERIO METODOLOGICO"],
      ["ID del Proyecto", p.id, "—", "Identificador Alianza SMR"],
      ["Denominacion Oficial", `"${p.name}"`, "—", "Nombre del emplazamiento"],
      ["Pais", p.country, "—", p.countryCode],
      ["Region / Localizacion", `"${p.location}, ${p.region}"`, "—", "Ubicacion geografica"],
      ["Coordenadas Georreferenciadas", `"${p.lat.toFixed(4)} N, ${p.lng.toFixed(4)} E"`, "Grados", "WGS84"],
      ["Estado Administrativo", p.status, "—", `Ano horizonte objetivo: ${p.targetYear}`],
      ["Modelo de Reactor", `"${p.reactorModel}"`, "—", p.technology],
      ["Familia Tecnologica", `"${p.techFamily}"`, "—", p.generation],
      ["Promotor / Desarrollador", `"${p.developer}"`, "—", "Consorcio o Utility"],
      ["Potencia Electrica Neta", p.netElectricCapacityMWe, "MWe", `Configuracion: ${modInfo}`],
      ["Potencia Termica Primaria", p.thermalCapacityMWt, "MWt", "Capacidad termica de diseño"],
      ["Rendimiento Termico Neto", p.netElectricCapacityMWe > 0 ? ((p.netElectricCapacityMWe / p.thermalCapacityMWt) * 100).toFixed(1) : 100, "%", "Pe / Pth"],
      ["Generacion Anual Firme", p.annualGenerationGWh, "GWh/año", `Factor de disponibilidad: ${Math.round((p.availabilityFactor || 0.9) * 100)}%`],
      ["Tiempo de Construccion y Montaje", p.constructionTimeMonths || 36, "meses", "Construccion seriada en fábrica"],
      ["Vida Util de Diseño", 60, "años", "Extensible a 80 años"],
      ["Coste Overnight Directo (OCC)", fin.occPerKwEUR, "€/kWe", "Base llave en mano directa"],
      ["Costes Directos de Capital", fin.directOvernightCostMeur.toFixed(1), "M€", `${fin.directOccPct}% del TCI`],
      ["Costes Indirectos EPC & Licencia", fin.indirectEpcMeur.toFixed(1), "M€", `${fin.indirectEpcPct}% del TCI (+18% s/OCC)`],
      ["Contingencias FOAK / NOAK", fin.foakContingencyMeur.toFixed(1), "M€", `${fin.foakContingencyPct}% del TCI`],
      ["Intereses Durante Construccion (IDC)", fin.idcFinancingMeur.toFixed(1), "M€", `${fin.idcPct}% del TCI al ${(wacc * 100).toFixed(1)}% WACC`],
      ["Total Capital Investment (TCI)", fin.totalCapitalInvestmentTci.toFixed(1), "M€", "Inversion total consolidada"],
      ["Inversion Unitaria Especifica", p.netElectricCapacityMWe > 0 ? Math.round((fin.totalCapitalInvestmentTci * 1e6) / (p.netElectricCapacityMWe * 1000)) : Math.round((fin.totalCapitalInvestmentTci * 1e6) / ((p.thermalCapacityMWt || 100) * 1000)), p.netElectricCapacityMWe > 0 ? "€/kWe neto" : "€/kWt termico", p.netElectricCapacityMWe > 0 ? "TCI por potencia electrica neta" : "TCI por potencia termica primaria"],
      ["Tasa WACC de Evaluacion", (wacc * 100).toFixed(1), "%", "Coste medio ponderado del capital"],
      ["LCOE Nivelado Total", fin.lcoeTotalEurMWh, "€/MWh", "Coste nivelado de generacion"],
      ["LCOE Amortizacion de Capital", fin.lcoeCapitalEurMWh, "€/MWh", "Recuperacion de inversion (CRF)"],
      ["LCOE O&M Fijo", fin.lcoeFixedOpexEurMWh, "€/MWh", "Personal de planta y licencias"],
      ["LCOE O&M Variable", fin.lcoeVarOpexEurMWh, "€/MWh", "Consumibles y mantenimiento"],
      ["LCOE Combustible Nuclear", fin.lcoeFuelEurMWh, "€/MWh", "Enriquecimiento y fabricacion UO2"],
      ["LCOE Fondo de Residuos", fin.lcoeDecomEurMWh, "€/MWh", "Fondo desmantelamiento / DGR"],
      ["Mitigacion CO2 frente a Carbon", (p.co2AvoidedCoalTonYear / 1e6).toFixed(3), "Mt CO2/año", "Emisiones evitadas 950 g/kWh"],
      ["Mitigacion CO2 frente a Gas CCGT", (p.co2AvoidedGasTonYear / 1e6).toFixed(3), "Mt CO2/año", "Emisiones evitadas 400 g/kWh"],
      ["Mitigacion CO2 Ciclo de Vida 60a", ((p.co2AvoidedCoalTonYear * 60) / 1e6).toFixed(2), "Mt CO2", "Mitigacion acumulada total"],
      ["VAN Estimado (PPA 80 €/MWh)", metrics.npvMeur, "M€", "Valor Actual Neto a 60 años"],
      ["TIR Estimada de Proyecto", metrics.irrPct, "%", "Tasa Interna de Retorno"],
      ["Rol en el Mercado Electrico", `"${p.marketRole}"`, "—", "Casacion marginalista / gestionabilidad"],
      ["Servicios de Red & Inercia", `"${p.gridServices}"`, "—", "RoCoF, FCR, aFRR, inercia fisica"],
      ["Acoplamiento de Sectores", `"${p.sectorCoupling}"`, "—", "Vapor industrial, H2 SOEC, DH"],
      ["Proyecto Coal-to-Nuclear (C2N)", p.coalRepurposing ? "SI" : "NO", "—", `"${p.coalRepurposingDetails || 'No aplica reconversión directa'}"`],
      ["Estrategia de Off-take", `"${fin.offtakeData.offtaker}"`, "—", fin.offtakeData.mechanism]
    ];

    const csvContent = "\uFEFF" + rows.map(e => e.join(";")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Ficha_Tecnica_SMR_${p.id}_UVa.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function generateSMRReportHtml(p, wacc = (state.selectedWacc || 0.07)) {
    if (!p) {
      p = (window.SMR_DATABASE && window.SMR_DATABASE.length > 0) ? window.SMR_DATABASE[0] : null;
    }
    if (!p) return '<div style="padding: 2rem; text-align: center;">No hay ningún reactor seleccionado.</div>';

    const fin = calculateSMRFinancials(p, wacc);
    const todayStr = new Date().toLocaleDateString("es-ES", { year: 'numeric', month: 'long', day: 'numeric' });
    const flag = getFlagEmoji(p.countryCode);
    const modInfo = getProjectModulesInfo(p);
    const cfPct = Math.round((p.availabilityFactor || 0.90) * 100);

    // Sensibilidad financiera a WACC
    const fin4 = calculateSMRFinancials(p, 0.04);
    const fin7 = calculateSMRFinancials(p, 0.07);
    const fin10 = calculateSMRFinancials(p, 0.10);

    const netElectricStr = p.netElectricCapacityMWe > 0 ? `${p.netElectricCapacityMWe.toLocaleString('es-ES')} MWe` : 'Térmico Puro (0 MWe)';
    const thermalStr = `${(p.thermalCapacityMWt || 300).toLocaleString('es-ES')} MWt`;
    const genAnnualStr = `${p.annualGenerationGWh.toLocaleString('es-ES')} GWh/año`;
    const genTWhStr = `${(p.annualGenerationGWh / 1000).toFixed(2)} TWh/año`;

    const thermalEff = p.netElectricCapacityMWe > 0 
      ? ((p.netElectricCapacityMWe / (p.thermalCapacityMWt || (p.netElectricCapacityMWe * 3))) * 100).toFixed(1) + '%' 
      : '100% (Cogeneración/Calor)';

    const specificCapex = p.netElectricCapacityMWe > 0 
      ? `${Math.round((fin.totalCapitalInvestmentTci * 1e6) / (p.netElectricCapacityMWe * 1000)).toLocaleString('es-ES')} €/kWe`
      : `${Math.round((fin.totalCapitalInvestmentTci * 1e6) / ((p.thermalCapacityMWt || 100) * 1000)).toLocaleString('es-ES')} €/kWt`;

    const co2CoalMt = (p.co2AvoidedCoalTonYear / 1e6).toFixed(2);
    const co2GasMt = (p.co2AvoidedGasTonYear / 1e6).toFixed(2);
    const co2LifetimeMt = ((p.co2AvoidedCoalTonYear * 60) / 1e6).toFixed(1);

    // Indicadores Financieros de Proyecto
    const metrics = calculateProjectFinancialMetrics(p, fin, wacc);

    // Matriz de Sensibilidad Paramétrica (WACC 4%, 7%, 10% vs CF 85%, 90%, 95%)
    const m_4_85 = calculateParametricLCOE(p, 0.04, 0.85);
    const m_4_90 = calculateParametricLCOE(p, 0.04, 0.90);
    const m_4_95 = calculateParametricLCOE(p, 0.04, 0.95);

    const m_7_85 = calculateParametricLCOE(p, 0.07, 0.85);
    const m_7_90 = calculateParametricLCOE(p, 0.07, 0.90);
    const m_7_95 = calculateParametricLCOE(p, 0.07, 0.95);

    const m_10_85 = calculateParametricLCOE(p, 0.10, 0.85);
    const m_10_90 = calculateParametricLCOE(p, 0.10, 0.90);
    const m_10_95 = calculateParametricLCOE(p, 0.10, 0.95);

    function getBadgeClass(val) {
      if (val < 65) return 'rep-matrix-green';
      if (val <= 82) return 'rep-matrix-blue';
      if (val <= 100) return 'rep-matrix-amber';
      return 'rep-matrix-red';
    }

    return `
      <!-- Cabecera Institucional y Académica Oficial (Consultoría UVa) -->
      <div class="rep-header-official">
        <div style="flex: 1;">
          <div class="rep-inst-title">Universidad de Valladolid · Escuela de Ingenierías Industriales (UVa)</div>
          <div class="rep-inst-title" style="color: #0284c7; margin-top: 2px;">Grado en Ingeniería Energética · Departamento de Organización de Empresas</div>
          
          <div class="rep-badge-group">
            <span class="rep-badge rep-badge-navy">DICTAMEN TÉCNICO-ECONÓMICO</span>
            <span class="rep-badge rep-badge-blue">ALIANZA SMR UE · TWG 1 & 2</span>
            <span class="rep-badge rep-badge-green">REVISIÓN 1.0 OFICIAL</span>
            <span class="rep-badge rep-badge-amber">WACC ${(wacc * 100).toFixed(1)}%</span>
            <span class="rep-badge" style="background: #312e81; color: #c7d2fe;">⚛️ CATEGORÍA SMR POTENCIA MEDIA</span>
            ${p.floatingVessel ? `<span class="rep-badge" style="background: #0284c7; color: #ffffff;">🚢 BUQUE NUCLEAR FLOTANTE (FNPP)</span>` : ''}
            ${p.greenHydrogenFocus ? `<span class="rep-badge" style="background: #16a34a; color: #ffffff;">🟢 VECTOR HIDRÓGENO VERDE (950°C)</span>` : ''}
          </div>

          <div class="rep-doc-title">PROYECTO DE IMPLANTACIÓN Y VIABILIDAD ECONÓMICA DE REACTOR SMR</div>
          <div class="rep-doc-subtitle" style="font-size: 0.95rem; font-weight: 700; color: #1e3a8a; margin: 0.45rem 0 0.55rem 0; line-height: 1.45;">${flag} ${p.name} · ${p.country} (${p.location})</div>
          
          <div class="rep-doc-meta">
            <strong>Asignatura:</strong> Economía de los Sistemas Energéticos · <strong>Curso:</strong> 2025/2026<br>
            <strong>Normativa de Referencia:</strong> Taxonomía Verde Europea (Reglamento Delegado 2022/1214) · Estándares EPRI / OIEA ARIS
          </div>
        </div>
        
        <div class="rep-code-box">
          <div style="font-weight: 800; color: #0f172a; margin-bottom: 2px;">DOC Nº: ESE-SMR-2026-${(p.id || 'GEN').toUpperCase()}</div>
          <div><strong>FECHA EMISIÓN:</strong> ${todayStr}</div>
          <div><strong>ESTADO:</strong> <span style="color: #0284c7; font-weight: 700;">${p.status.toUpperCase()}</span> (Obj. ${p.targetYear})</div>
          <div><strong>TECNOLOGÍA:</strong> ${p.reactorModel} (${p.technology})</div>
          <div style="margin-top: 5px; padding-top: 4px; border-top: 1px dashed #cbd5e1; font-family: monospace; font-size: 0.65rem; color: #64748b;">
            HASH: SHA256-${(p.id || 'gen').slice(0, 4).toUpperCase()}-984B-71
          </div>
        </div>
      </div>

      <!-- Resumen Ejecutivo (Executive Summary Callout) -->
      <div class="rep-callout">
        <div class="rep-callout-title">
          <span>📌</span> <strong>Resumen Ejecutivo & Dictamen de Ingeniería:</strong>
        </div>
        El proyecto <strong>${p.name}</strong> contempla la implantación comercial de un reactor modular de tecnología <em>${p.reactorModel} (${p.techFamily})</em> 
        promovido por <strong>${p.developer}</strong> en <em>${p.location} (${p.country})</em>. Diseñado para suministrar una potencia eléctrica neta de <strong>${netElectricStr}</strong> 
        y una capacidad térmica primaria de <strong>${thermalStr}</strong> con un rendimiento del <strong>${thermalEff}</strong>, la instalación aporta firmeza continua y 
        descarboniza la matriz energética regional mediante una generación anual de <strong>${genTWhStr}</strong> (${cfPct}% de disponibilidad). 
        ${p.coalRepurposing 
          ? `Al tratarse de una reconversión directa de carbón a nuclear (Coal-to-Nuclear), el proyecto aprovecha las subestaciones de 220/400 kV y concesiones de agua existentes, rebajando el CAPEX total en hasta un 30%.` 
          : `El proyecto se integra en un polo industrial estratégico permitiendo suministrar vapor y calor de proceso además de energía eléctrica a la red.`}
        ${p.floatingVessel 
          ? `<div style="margin-top: 0.5rem; padding: 0.5rem 0.75rem; background: rgba(14, 165, 233, 0.12); border-left: 3px solid #0284c7; border-radius: 4px; font-size: 0.8rem; color: #0369a1;">
               <strong>🚢 Central Nuclear Flotante (Instalada sobre Buque / Barcaza):</strong> ${p.floatingVesselDetails}
             </div>` 
          : ''}
        ${p.greenHydrogenFocus 
          ? `<div style="margin-top: 0.5rem; padding: 0.5rem 0.75rem; background: rgba(34, 197, 94, 0.12); border-left: 3px solid #16a34a; border-radius: 4px; font-size: 0.8rem; color: #15803d;">
               <strong>🟢 Producción Masiva de Hidrógeno Verde / Limpio (Termoquímica 950°C):</strong> ${p.greenHydrogenDetails}
             </div>` 
          : ''}
      </div>

      <!-- Resumen Ejecutivo (KPI Ribbon - 7 Tarjetas con Borde de Acento) -->
      <div class="rep-kpi-grid">
        <div class="rep-kpi-card" style="border-top: 3px solid #0284c7;">
          <div class="rep-kpi-val" style="color: #0284c7;">${netElectricStr}</div>
          <div class="rep-kpi-lbl">Potencia Neta</div>
          <div class="rep-kpi-sub">${modInfo}</div>
        </div>
        <div class="rep-kpi-card" style="border-top: 3px solid #ea580c;">
          <div class="rep-kpi-val" style="color: #ea580c;">${thermalStr}</div>
          <div class="rep-kpi-lbl">Potencia Térmica</div>
          <div class="rep-kpi-sub">Rendimiento: ${thermalEff}</div>
        </div>
        <div class="rep-kpi-card" style="border-top: 3px solid #3b82f6;">
          <div class="rep-kpi-val" style="color: #1e3a8a;">${genTWhStr}</div>
          <div class="rep-kpi-lbl">Generación Firme</div>
          <div class="rep-kpi-sub">Disponibilidad: ${cfPct}%</div>
        </div>
        <div class="rep-kpi-card rep-kpi-card-highlight" style="border-top: 3px solid #16a34a;">
          <div class="rep-kpi-val" style="color: #15803d;">${fin.lcoeTotalEurMWh} €/MWh</div>
          <div class="rep-kpi-lbl">LCOE Nivelado</div>
          <div class="rep-kpi-sub">WACC: ${(wacc * 100).toFixed(1)}% · 60 años</div>
        </div>
      </div>

      <div class="rep-kpi-grid-sub">
        <div class="rep-kpi-card" style="border-top: 3px solid #6366f1;">
          <div class="rep-kpi-val" style="color: #4338ca;">${fin.tciFmt}</div>
          <div class="rep-kpi-lbl">Inversión Llave en Mano (TCI)</div>
          <div class="rep-kpi-sub">Incluye OCC + EPC + Contingencias + IDC</div>
        </div>
        <div class="rep-kpi-card" style="border-top: 3px solid #8b5cf6;">
          <div class="rep-kpi-val" style="color: #6d28d9;">${specificCapex}</div>
          <div class="rep-kpi-lbl">Ratio Específico Unitario</div>
          <div class="rep-kpi-sub">Inversión consolidada por kW instalado</div>
        </div>
        <div class="rep-kpi-card" style="border-top: 3px solid #059669;">
          <div class="rep-kpi-val" style="color: #047857;">${co2CoalMt} Mt/año</div>
          <div class="rep-kpi-lbl">Mitigación de CO₂ (vs Carbón)</div>
          <div class="rep-kpi-sub">Acumulado 60a: ${co2LifetimeMt} Mt CO₂</div>
        </div>
      </div>

      <!-- 1. Ficha Técnica y Emplazamiento -->
      <div class="rep-section">
        <div class="rep-section-title">
          <span><span class="rep-section-num">1</span> Ficha Técnica de Ingeniería y Emplazamiento Georreferenciado</span>
          <span style="font-size: 0.72rem; color: #64748b; font-weight: normal;">Parámetros del Sistema Nuclear de Suministro de Vapor (NSSS)</span>
        </div>
        <table class="rep-table">
          <tbody>
            <tr>
              <td style="width: 25%; font-weight: 700; background: #f8fafc;">Denominación Oficial:</td>
              <td style="width: 35%; font-weight: 700; color: #0f172a;">${p.name}</td>
              <td style="width: 18%; font-weight: 700; background: #f8fafc;">Promotor Principal:</td>
              <td style="width: 22%;">${p.developer}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">Emplazamiento y Región:</td>
              <td>${p.location}, ${p.country} (${p.region})</td>
              <td style="font-weight: 700; background: #f8fafc;">Coordenadas WGS84:</td>
              <td><code>${p.lat.toFixed(4)}° N, ${p.lng.toFixed(4)}° E</code></td>
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">Modelo y Tecnología:</td>
              <td><strong>${p.reactorModel}</strong> · ${p.techFamily} (${p.technology})</td>
              <td style="font-weight: 700; background: #f8fafc;">Generación Nuclear:</td>
              <td><span class="rep-badge rep-badge-blue">${p.generation}</span></td>
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">Capacidades Nominales:</td>
              <td><strong>${netElectricStr}</strong> (Eléctrica) / <strong>${thermalStr}</strong> (Térmica)</td>
              <td style="font-weight: 700; background: #f8fafc;">Rendimiento Térmico:</td>
              <td><strong>${thermalEff}</strong> (Termodinámico neto)</td>
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">Disponibilidad & Factor Planta:</td>
              <td>${cfPct}% (${p.annualGenerationGWh.toLocaleString('es-ES')} MWh/año)</td>
              <td style="font-weight: 700; background: #f8fafc;">Plazo de Ejecución:</td>
              <td>${p.constructionTimeMonths || 36} meses (Montaje modular en fábrica)</td>
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">Arquitectura de Seguridad:</td>
              <td>Refrigeración pasiva por convección natural (72h walk-away safe sin alimentación eléctrica exterior SBO)</td>
              <td style="font-weight: 700; background: #f8fafc;">Vida Útil de Diseño:</td>
              <td>60 años (extensión técnica licenciable a 80 años)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 2. Integración en el Mercado Energético y Transición Justa -->
      <div class="rep-section">
        <div class="rep-section-title">
          <span><span class="rep-section-num">2</span> Integración en el Mercado Marginalista, Red de Transporte y Acoplamiento Sectorial</span>
          <span style="font-size: 0.72rem; color: #64748b; font-weight: normal;">Servicios de Ajuste del Sistema & Transición Justa</span>
        </div>
        <table class="rep-table">
          <tbody>
            <tr>
              <td style="width: 25%; font-weight: 700; background: #f8fafc;">Casación en Mercado Diario:</td>
              <td colspan="3">${p.marketRole} (Coste marginal a corto plazo SRMC de 8-13 €/MWh en la base del orden de mérito).</td>
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">Estabilidad de Red e Inercia:</td>
              <td colspan="3">${p.gridServices}. Generación síncrona convencional con constante de inercia H ≈ 4.5 s para mitigar la tasa de variación de frecuencia (RoCoF).</td>
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">Acoplamiento de Sectores (Vapor/H₂):</td>
              <td colspan="3">${p.sectorCoupling}</td>
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">Estrategia 'Coal-to-Nuclear' (C2N):</td>
              <td colspan="3">
                ${p.coalRepurposing 
                  ? `<strong style="color: #16a34a;">✅ Proyecto Activo de Reutilización de Central de Carbón:</strong> ${p.coalRepurposingDetails}. Ahorro contrastado de hasta un 30% del CAPEX total en subestaciones eléctricas 220/400 kV, concesiones de agua de refrigeración e infraestructuras de transporte existentes.` 
                  : `<span style="color: #64748b;">No aplica sustitución directa de carbón; emplazamiento en polígono químico/industrial, nodo nuclear preexistente o complejo de calor urbano.</span>`}
              </td>
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">Comprador Ancla & Contrato:</td>
              <td colspan="3">
                <strong>Offtaker Principal:</strong> ${fin.offtakeData.offtaker} · <strong>Instrumento Comercial:</strong> ${fin.offtakeData.mechanism}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 3. Presupuesto Desglosado de Inversión (TCI / CAPEX) -->
      <div class="rep-section">
        <div class="rep-section-title">
          <span><span class="rep-section-num">3</span> Estructura de Desglose de Costes de Capital (Cost Breakdown Structure - CBS)</span>
          <span style="font-size: 0.72rem; color: #64748b; font-weight: normal;">Estándar IEA/NEA/EPRI · WACC Base: ${(wacc * 100).toFixed(1)}%</span>
        </div>

        <!-- Barra Gráfica de Presupuesto Stacked -->
        <div class="rep-budget-bar-container">
          <div style="font-size: 0.72rem; font-weight: 700; color: #0f172a; margin-bottom: 0.4rem; display: flex; justify-content: space-between;">
            <span>Distribución Relativa del Presupuesto Total de Inversión (TCI)</span>
            <span>Total: <strong>${fin.tciFmt}</strong></span>
          </div>
          <div class="rep-budget-bar">
            <div class="rep-budget-seg" style="width: ${fin.directOccPct}%; background: #1e3a8a;" title="Costes Directos OCC: ${fin.directOccPct}%">${fin.directOccPct}%</div>
            <div class="rep-budget-seg" style="width: ${fin.indirectEpcPct}%; background: #0284c7;" title="Costes Indirectos EPC: ${fin.indirectEpcPct}%">${fin.indirectEpcPct}%</div>
            <div class="rep-budget-seg" style="width: ${fin.foakContingencyPct}%; background: #64748b;" title="Contingencias: ${fin.foakContingencyPct}%">${fin.foakContingencyPct}%</div>
            <div class="rep-budget-seg" style="width: ${fin.idcPct}%; background: #ea580c;" title="Intereses Durante la Construcción IDC: ${fin.idcPct}%">${fin.idcPct}%</div>
          </div>
          <div class="rep-budget-legend">
            <div class="rep-legend-item"><span class="rep-legend-dot" style="background: #1e3a8a;"></span> Costes Directos OCC (${fin.directOccFmt})</div>
            <div class="rep-legend-item"><span class="rep-legend-dot" style="background: #0284c7;"></span> Indirectos EPC & Licencia (${fin.indirectEpcFmt})</div>
            <div class="rep-legend-item"><span class="rep-legend-dot" style="background: #64748b;"></span> Contingencias (${fin.foakContingencyFmt})</div>
            <div class="rep-legend-item"><span class="rep-legend-dot" style="background: #ea580c;"></span> Intereses IDC (${fin.idcFinancingFmt})</div>
          </div>
        </div>

        <table class="rep-table">
          <thead>
            <tr>
              <th>Partida Presupuestaria de Inversión</th>
              <th>Criterio Técnico-Metodológico de Cálculo</th>
              <th style="text-align: right;">Importe (€M)</th>
              <th style="text-align: right;">% s/ TCI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>1. Costes Directos Llave en Mano (Direct OCC)</strong></td>
              <td>Vasija NSSS, turbogenerador síncrono, generador de vapor, obra civil y contención subterránea (${fin.occPerKwEUR.toLocaleString('es-ES')} €/kWe)</td>
              <td style="text-align: right; font-weight: 700;">${fin.directOccFmt}</td>
              <td style="text-align: right;">${fin.directOccPct}%</td>
            </tr>
            <tr>
              <td><strong>2. Costes Indirectos EPC, Licenciamiento & Propiedad</strong></td>
              <td>Ingeniería de detalle EPCM, tasas de seguridad nuclear regulatoria, pruebas en fábrica (+18% sobre OCC)</td>
              <td style="text-align: right; font-weight: 700;">${fin.indirectEpcFmt}</td>
              <td style="text-align: right;">${fin.indirectEpcPct}%</td>
            </tr>
            <tr>
              <td><strong>3. Fondo de Contingencias e Imprevistos Técnicos</strong></td>
              <td>Margen de incertidumbre (${fin.isFOAK ? 'FOAK: +20% por primer prototipo' : 'NOAK: +8% por unidad seriada en fábrica'})</td>
              <td style="text-align: right; font-weight: 700;">${fin.foakContingencyFmt}</td>
              <td style="text-align: right;">${fin.foakContingencyPct}%</td>
            </tr>
            <tr>
              <td><strong>4. Intereses Durante la Construcción (IDC Financing)</strong></td>
              <td>Coste financiero de la deuda durante ${fin.constructionMonths} meses de obra con tasa WACC del ${(wacc * 100).toFixed(1)}%</td>
              <td style="text-align: right; font-weight: 700; color: #ea580c;">${fin.idcFinancingFmt}</td>
              <td style="text-align: right;">${fin.idcPct}%</td>
            </tr>
            <tr class="rep-table-tot">
              <td colspan="2">TOTAL CAPITAL INVESTMENT (TCI LLAVE EN MANO CONSOLIDADO)</td>
              <td style="text-align: right; color: #0284c7; font-size: 0.9rem;">${fin.tciFmt}</td>
              <td style="text-align: right;">100,0%</td>
            </tr>
          </tbody>
        </table>
        <div style="font-size: 0.74rem; color: #475569; margin-top: 0.35rem;">
          <em>Ratio Unitario Resultante:</em> Inversión consolidada de <strong>${specificCapex}</strong> instalado puesto en servicio comercial.
        </div>
      </div>

      <!-- 4. Estructura del LCOE y Sensibilidad Financiera -->
      <div class="rep-section">
        <div class="rep-section-title">
          <span><span class="rep-section-num">4</span> Metodología del LCOE, Fórmulas de Cálculo y Sensibilidad al Coste de Capital</span>
          <span style="font-size: 0.72rem; color: #64748b; font-weight: normal;">Vida Económica: 60 años · Factor de Recuperación de Capital (CRF)</span>
        </div>

        <!-- Caja de Fórmulas Matemáticas Explícitas -->
        <div class="rep-formula-box">
          <div class="rep-formula-eq">
            LCOE = [ (TCI · CRF + OPEX_fijo) / E_anual ] + OPEX_var + C_comb + C_decom
          </div>
          <div class="rep-formula-eq" style="font-size: 0.85rem; padding-top: 0.2rem; border-bottom: none;">
            CRF = [ WACC · (1 + WACC)<sup>n</sup> ] / [ (1 + WACC)<sup>n</sup> - 1 ] &nbsp;&nbsp;|&nbsp;&nbsp; n = 60 años
          </div>
          <div class="rep-formula-desc">
            <strong>Donde:</strong> <em>TCI</em> = Inversión de capital total consolidada (€); <em>CRF</em> = Factor de recuperación de capital; 
            <em>E_anual</em> = Generación anual neta (MWh/año); <em>OPEX_fijo</em> = Costes fijos de operación y licencias (35 k€/MW-año); 
            <em>OPEX_var</em> = 3,0 €/MWh; <em>C_comb</em> = Coste del ciclo de combustible (7,0 €/MWh); <em>C_decom</em> = Fondo de desmantelamiento y gestión de residuos (2,0 €/MWh).
          </div>
        </div>

        <!-- Tabla de Escenarios Financieros -->
        <table class="rep-table">
          <thead>
            <tr>
              <th>Escenario de Financiación</th>
              <th>WACC</th>
              <th style="text-align: right;">Amortiz. Capital</th>
              <th style="text-align: right;">O&M Total</th>
              <th style="text-align: right;">Combustible</th>
              <th style="text-align: right;">LCOE Total (€/MWh)</th>
            </tr>
          </thead>
          <tbody>
            <tr ${Math.abs(wacc - 0.04) < 0.005 ? 'style="background: #e0f2fe; font-weight: 700;"' : ''}>
              <td><strong>1. Modelo Regulado RAB / Aval Público</strong> (Garantía estatal de bajo riesgo)</td>
              <td>4,0%</td>
              <td style="text-align: right;">${Math.round(fin4.lcoeTotalEurMWh - 22)} €/MWh</td>
              <td style="text-align: right;">12 €/MWh</td>
              <td style="text-align: right;">10 €/MWh</td>
              <td style="text-align: right; color: #16a34a; font-weight: 800;">${fin4.lcoeTotalEurMWh} €/MWh</td>
            </tr>
            <tr ${Math.abs(wacc - 0.07) < 0.005 ? 'style="background: #e0f2fe; font-weight: 700;"' : ''}>
              <td><strong>2. PPA Industrial Privado / Consorcio</strong> (Caso Base de Negocio)</td>
              <td>7,0%</td>
              <td style="text-align: right;">${Math.round(fin7.lcoeTotalEurMWh - 22)} €/MWh</td>
              <td style="text-align: right;">12 €/MWh</td>
              <td style="text-align: right;">10 €/MWh</td>
              <td style="text-align: right; color: #0284c7; font-weight: 800;">${fin7.lcoeTotalEurMWh} €/MWh</td>
            </tr>
            <tr ${Math.abs(wacc - 0.10) < 0.005 ? 'style="background: #e0f2fe; font-weight: 700;"' : ''}>
              <td><strong>3. Mercado Merchant a Riesgo Pool</strong> (Financiación puramente privada)</td>
              <td>10,0%</td>
              <td style="text-align: right;">${Math.round(fin10.lcoeTotalEurMWh - 22)} €/MWh</td>
              <td style="text-align: right;">12 €/MWh</td>
              <td style="text-align: right;">10 €/MWh</td>
              <td style="text-align: right; color: #d97706; font-weight: 800;">${fin10.lcoeTotalEurMWh} €/MWh</td>
            </tr>
          </tbody>
        </table>

        <!-- Matriz de Sensibilidad Paramétrica Cruzada -->
        <div style="margin-top: 1rem;">
          <div style="font-size: 0.74rem; font-weight: 700; color: #0f172a; margin-bottom: 0.35rem;">
            Matriz de Sensibilidad: LCOE (€/MWh) según Coste de Capital (WACC) y Factor de Disponibilidad (CF)
          </div>
          <table class="rep-table" style="text-align: center;">
            <thead>
              <tr>
                <th style="text-align: left;">Tasa WACC \\ Factor Capacidad</th>
                <th style="text-align: center;">CF = 85%</th>
                <th style="text-align: center;">CF = 90% (Base)</th>
                <th style="text-align: center;">CF = 95%</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="text-align: left; font-weight: 700;">WACC = 4,0% (Regulado / RAB)</td>
                <td><span class="rep-matrix-badge ${getBadgeClass(m_4_85)}">${m_4_85} €/MWh</span></td>
                <td><span class="rep-matrix-badge ${getBadgeClass(m_4_90)}">${m_4_90} €/MWh</span></td>
                <td><span class="rep-matrix-badge ${getBadgeClass(m_4_95)}">${m_4_95} €/MWh</span></td>
              </tr>
              <tr>
                <td style="text-align: left; font-weight: 700;">WACC = 7,0% (PPA Industrial)</td>
                <td><span class="rep-matrix-badge ${getBadgeClass(m_7_85)}">${m_7_85} €/MWh</span></td>
                <td><span class="rep-matrix-badge ${getBadgeClass(m_7_90)}">${m_7_90} €/MWh</span></td>
                <td><span class="rep-matrix-badge ${getBadgeClass(m_7_95)}">${m_7_95} €/MWh</span></td>
              </tr>
              <tr>
                <td style="text-align: left; font-weight: 700;">WACC = 10,0% (Merchant Pool)</td>
                <td><span class="rep-matrix-badge ${getBadgeClass(m_10_85)}">${m_10_85} €/MWh</span></td>
                <td><span class="rep-matrix-badge ${getBadgeClass(m_10_90)}">${m_10_90} €/MWh</span></td>
                <td><span class="rep-matrix-badge ${getBadgeClass(m_10_95)}">${m_10_95} €/MWh</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Indicadores Financieros VAN y TIR -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 5px; padding: 0.65rem 0.95rem; margin-top: 0.65rem; font-size: 0.74rem; color: #334155; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <strong>Indicadores Económicos de Proyecto (a PPA base de ${metrics.ppaPrice} €/MWh):</strong><br>
            Flujo de Caja Operativo Anual (EBITDA): <strong>${metrics.annualCashFlowMeur} M€/año</strong>
          </div>
          <div style="display: flex; gap: 1rem;">
            <div>VAN (NPV a 60a): <strong style="color: ${metrics.npvMeur.startsWith('-') ? '#b91c1c' : '#15803d'}; font-size: 0.85rem;">${metrics.npvMeur} M€</strong></div>
            <div>TIR (IRR de Proyecto): <strong style="color: #0284c7; font-size: 0.85rem;">${metrics.irrPct}</strong></div>
          </div>
        </div>
      </div>

      <!-- 5. Balance Medioambiental y Mitigación de CO2 -->
      <div class="rep-section">
        <div class="rep-section-title">
          <span><span class="rep-section-num">5</span> Balance Medioambiental y Mitigación de Huella de Carbono</span>
          <span style="font-size: 0.72rem; color: #64748b; font-weight: normal;">Ciclo de Vida LCA (Normas ISO 14040/44)</span>
        </div>
        <table class="rep-table">
          <thead>
            <tr>
              <th>Tecnología de Generación Sustituida</th>
              <th>Factor Emisión Ciclo de Vida</th>
              <th style="text-align: right;">CO₂ Evitado Anualmente</th>
              <th style="text-align: right;">CO₂ Evitado en 60 años</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Central Térmica de Carbón (Hulla / Lignito)</strong></td>
              <td>~950 g CO₂/kWh</td>
              <td style="text-align: right; font-weight: 700; color: #16a34a;">${co2CoalMt} Mt CO₂/año</td>
              <td style="text-align: right; font-weight: 800; color: #16a34a;">${co2LifetimeMt} Mt CO₂</td>
            </tr>
            <tr>
              <td><strong>Ciclo Combinado de Gas Natural (CCGT)</strong></td>
              <td>~400 g CO₂/kWh</td>
              <td style="text-align: right; font-weight: 700;">${co2GasMt} Mt CO₂/año</td>
              <td style="text-align: right; font-weight: 800;">${((p.co2AvoidedGasTonYear * 60) / 1e6).toFixed(1)} Mt CO₂</td>
            </tr>
            <tr>
              <td><strong>Mix Eléctrico Medio de la Unión Europea (2024)</strong></td>
              <td>~250 g CO₂/kWh</td>
              <td style="text-align: right; font-weight: 700;">${((p.annualGenerationGWh * 250) / 1e6).toFixed(2)} Mt CO₂/año</td>
              <td style="text-align: right; font-weight: 800;">${((p.annualGenerationGWh * 250 * 60) / 1e6).toFixed(1)} Mt CO₂</td>
            </tr>
            <tr style="background: #f8fafc;">
              <td><strong>Reactor SMR (${p.technology})</strong></td>
              <td><strong>5 - 12 g CO₂/kWh</strong></td>
              <td colspan="2" style="text-align: center; color: #0284c7; font-weight: 700;">Tecnología Neutra en Carbono (Taxonomía Verde UE)</td>
            </tr>
          </tbody>
        </table>
        
        <!-- Nota Didáctica de Contexto España vs UE -->
        <div style="background: #f8fafc; border-left: 3px solid #0284c7; padding: 0.65rem 0.85rem; margin-top: 0.65rem; font-size: 0.74rem; color: #334155; line-height: 1.5;">
          <strong>Nota Metodológica de Debate Energético (España vs Resto de Europa):</strong><br>
          A diferencia de los países de Europa Central y Oriental (Polonia, Chequia, Rumanía, Finlandia) que emplean SMRs para sustitución de centrales de carbón y calor distrital, en <strong>España</strong> el PNIEC 2023-2030 establece el cierre escalonado y ordenado del parque nuclear (2027-2035) y concentra la descarbonización en energías renovables (solar/eólica) y <strong>valles de hidrógeno verde basados en grandes electrolizadores</strong> (como el Valle Andaluz del Hidrógeno Verde de <em>Moeve</em> en Palos de la Frontera, Huelva, y San Roque con hasta 2.000 MW de capacidad de electrólisis).
        </div>
      </div>

      <!-- 6. Firmas, Visado y Certificación de Ingeniería -->
      <div class="rep-visado-container no-print-sign">
        <div class="rep-visado-header">
          <div class="rep-visado-title">Diligencia Oficial de Visado y Certificación del Proyecto de Ingeniería</div>
          <div style="font-size: 0.68rem; color: #64748b;">Convocatoria Oficial · Grado en Ingeniería Energética (UVa)</div>
        </div>
        
        <div class="rep-visado-grid">
          <div class="rep-signature-card">
            <div class="rep-stamp-box">
              VISADO DIGITAL<br>REG: UVa-ESE-2026-01
            </div>
            <div class="rep-engineer-name">Javier García Cuñado</div>
            <div class="rep-engineer-role">Ingeniero Redactor · Modelización Económica y LCOE</div>
            <div class="rep-engineer-role">Escuela de Ingenierías Industriales (UVa)</div>
          </div>
          
          <div class="rep-signature-card">
            <div class="rep-stamp-box">
              VISADO DIGITAL<br>REG: UVa-ESE-2026-02
            </div>
            <div class="rep-engineer-name">Carlos Moreno Gutiérrez</div>
            <div class="rep-engineer-role">Ingeniero Redactor · Integración en Mercado y Red</div>
            <div class="rep-engineer-role">Escuela de Ingenierías Industriales (UVa)</div>
          </div>
          
          <div class="rep-signature-card">
            <div class="rep-stamp-box">
              VISADO DIGITAL<br>REG: UVa-ESE-2026-03
            </div>
            <div class="rep-engineer-name">Jorge Seco García</div>
            <div class="rep-engineer-role">Ingeniero Redactor · Fichas Técnicas & SMRs</div>
            <div class="rep-engineer-role">Escuela de Ingenierías Industriales (UVa)</div>
          </div>
        </div>
        
        <div style="margin-top: 0.85rem; text-align: center; font-size: 0.68rem; color: #64748b;">
          Evaluado en: <strong>Economía de los Sistemas Energéticos</strong> · Departamento de Organización de Empresas · Universidad de Valladolid (UVa)
        </div>
      </div>
    `;
  }

  function openEngineeringReportModal(project) {
    if (project) {
      state.selectedProject = project;
    } else if (!state.selectedProject && window.SMR_DATABASE && window.SMR_DATABASE.length > 0) {
      // Default to Stawy Monowskie or first
      const defaultProj = window.SMR_DATABASE.find(p => p.id === 'pl-osge-stawy') || window.SMR_DATABASE[0];
      state.selectedProject = defaultProj;
    }

    const modal = document.getElementById('modal-engineering-report');
    if (!modal) return;

    // Populate SMR selector dropdown
    const selector = document.getElementById('report-smr-selector');
    if (selector && window.SMR_DATABASE) {
      selector.innerHTML = '';
      window.SMR_DATABASE.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `${getFlagEmoji(p.countryCode)} ${p.name} (${p.netElectricCapacityMWe > 0 ? p.netElectricCapacityMWe + ' MWe' : 'Térmico'})`;
        if (state.selectedProject && p.id === state.selectedProject.id) {
          opt.selected = true;
        }
        selector.appendChild(opt);
      });
    }

    // Render report HTML
    const doc = document.getElementById('smr-engineering-report-doc');
    if (doc) {
      doc.innerHTML = generateSMRReportHtml(state.selectedProject, state.selectedWacc);
    }

    modal.style.display = 'flex';
  }

  /* =========================================================================
     15. MODALES Y EVENT LISTENERS
     ========================================================================= */
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('open');

    if (modalId === 'modal-charts') {
      setTimeout(renderChartsDashboard, 150);
    }
  }

  function initEventListeners() {
    // 1. Leyenda Interactiva (Filtro por Clic y Minimizar)
    const legendItems = document.querySelectorAll('.interactive-legend-item');

    function syncStatusFilters(filterVal) {
      state.filters.status = filterVal;

      legendItems.forEach(i => {
        if (i.getAttribute('data-status-filter') === filterVal) i.classList.add('active');
        else i.classList.remove('active');
      });

      // Si se elige 'Operativo' o 'En Construcción', poner slider temporal en 'Todos' para verlos
      if (filterVal === 'Operativo' || filterVal === 'En Construcción') {
        state.activeTimelineIndex = 0;
        renderTimelineStatus();
      } else if (filterVal === 'Horizonte 2030') {
        state.activeTimelineIndex = 3;
        renderTimelineStatus();
      } else if (filterVal === 'Horizonte 2035+') {
        state.activeTimelineIndex = 4;
        renderTimelineStatus();
      }

      const sidebarStatusSelect = document.getElementById('filter-status');
      if (sidebarStatusSelect) sidebarStatusSelect.value = filterVal;

      updateFilteredProjects();
    }

    legendItems.forEach(item => {
      item.addEventListener('click', () => {
        const filterVal = item.getAttribute('data-status-filter');
        if (state.filters.status === filterVal) {
          syncStatusFilters('all');
        } else {
          syncStatusFilters(filterVal);
        }
      });
    });

    const btnToggleLegend = document.getElementById('btn-toggle-legend');
    const legendContainer = document.getElementById('legend-items-container');
    if (btnToggleLegend && legendContainer) {
      btnToggleLegend.addEventListener('click', (e) => {
        e.stopPropagation();
        const isHidden = legendContainer.style.display === 'none';
        legendContainer.style.display = isHidden ? 'flex' : 'none';
        btnToggleLegend.textContent = isHidden ? '—' : '+';
      });
    }

    // 2. Botón para Alternar Mapa Coroplético de Capacidad por País
    const btnToggleChoro = document.getElementById('btn-toggle-choropleth');
    if (btnToggleChoro) {
      btnToggleChoro.addEventListener('click', () => {
        toggleChoropleth();
      });
    }

    // 3. Cinta de Selección Rápida de Países / Zonas con Drag-to-Scroll y Chevrons
    const countryRibbon = document.getElementById('map-countries-ribbon');
    if (countryRibbon) {
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;
      let hasDragged = false;

      countryRibbon.addEventListener('mousedown', (e) => {
        isDown = true;
        hasDragged = false;
        countryRibbon.classList.add('dragging');
        startX = e.pageX - countryRibbon.offsetLeft;
        scrollLeft = countryRibbon.scrollLeft;
      });

      window.addEventListener('mouseup', () => {
        if (isDown) {
          isDown = false;
          countryRibbon.classList.remove('dragging');
          setTimeout(() => { hasDragged = false; }, 60);
        }
      });

      countryRibbon.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        const x = e.pageX - countryRibbon.offsetLeft;
        const walk = (x - startX);
        if (Math.abs(walk) > 4) {
          hasDragged = true;
          e.preventDefault();
          countryRibbon.scrollLeft = scrollLeft - walk * 1.5;
        }
      });

      // Chevron buttons
      const btnPrev = document.getElementById('btn-ribbon-prev');
      const btnNext = document.getElementById('btn-ribbon-next');
      if (btnPrev) {
        btnPrev.addEventListener('click', (e) => {
          e.stopPropagation();
          countryRibbon.scrollBy({ left: -260, behavior: 'smooth' });
        });
      }
      if (btnNext) {
        btnNext.addEventListener('click', (e) => {
          e.stopPropagation();
          countryRibbon.scrollBy({ left: 260, behavior: 'smooth' });
        });
      }

      // Prevenir click en botón tras arrastrar
      countryRibbon.addEventListener('click', (e) => {
        if (hasDragged) {
          e.stopPropagation();
          e.preventDefault();
        }
      }, true);
    }

    const countryButtons = document.querySelectorAll('.country-ribbon-btn');
    countryButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const country = btn.getAttribute('data-country');
        selectCountry(country);
      });
    });

    // Cerrar banner de país
    const btnCloseCs = document.getElementById('btn-close-cs-banner');
    if (btnCloseCs) btnCloseCs.addEventListener('click', closeCountryBanner);

    // 4. Selector de Línea Temporal
    const slider = document.getElementById('timeline-slider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        state.activeTimelineIndex = parseInt(e.target.value, 10);
        renderTimelineStatus();
        updateFilteredProjects();
      });
    }

    const playBtn = document.getElementById('btn-play-timeline');
    if (playBtn) playBtn.addEventListener('click', toggleTimelinePlay);

    // 5. Filtros de Sidebar y Navegación Rápida
    const filterRegion = document.getElementById('filter-region');
    const filterStatus = document.getElementById('filter-status');
    const filterTech = document.getElementById('filter-tech');
    const filterApp = document.getElementById('filter-app');
    const searchInput = document.getElementById('input-search-smr');
    const navButtons = document.querySelectorAll('.map-nav-btn[data-nav]');

    if (filterRegion) {
      filterRegion.addEventListener('change', (e) => {
        state.filters.region = e.target.value;

        // Sincronizar botones de navegación del mapa
        navButtons.forEach(b => {
          const t = b.getAttribute('data-nav');
          if (state.filters.region === 'all' && t === 'world') b.classList.add('active');
          else if (state.filters.region === 'Europa' && t === 'europe') b.classList.add('active');
          else if (state.filters.region === 'Norteamérica' && t === 'north-america') b.classList.add('active');
          else if (state.filters.region === 'Asia' && t === 'asia') b.classList.add('active');
          else b.classList.remove('active');
        });

        // Enfocar cámara a la región elegida
        const flyOpts = { paddingTopLeft: [40, 80], paddingBottomRight: [40, 100], duration: 1.2 };
        if (state.filters.region === 'all') {
          state.map.flyToBounds([[-42, -135], [74, 175]], flyOpts);
        } else if (state.filters.region === 'Europa') {
          state.map.flyToBounds([[34, -12], [66, 34]], flyOpts);
        } else if (state.filters.region === 'Norteamérica') {
          state.map.flyToBounds([[24, -128], [55, -60]], flyOpts);
        } else if (state.filters.region === 'Asia') {
          state.map.flyToBounds([[15, 75], [72, 175]], flyOpts);
        }

        updateFilteredProjects();
        updateChoroplethLayerStyles();
      });
    }

    if (filterStatus) {
      filterStatus.addEventListener('change', (e) => {
        state.filters.status = e.target.value;
        legendItems.forEach(i => {
          if (i.getAttribute('data-status-filter') === e.target.value) i.classList.add('active');
          else i.classList.remove('active');
        });
        updateFilteredProjects();
      });
    }

    if (filterTech) {
      filterTech.addEventListener('change', (e) => {
        state.filters.tech = e.target.value;
        updateFilteredProjects();
      });
    }

    if (filterApp) {
      filterApp.addEventListener('change', (e) => {
        state.filters.application = e.target.value;
        updateFilteredProjects();
      });
    }

    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.filters.search = e.target.value;
        updateFilteredProjects();
      });
    }

    // Botón reset filtros
    const btnResetFilters = document.getElementById('btn-reset-filters');
    if (btnResetFilters) {
      btnResetFilters.addEventListener('click', () => {
        if (filterRegion) filterRegion.value = 'Europa';
        if (filterStatus) filterStatus.value = 'all';
        if (filterTech) filterTech.value = 'all';
        if (filterApp) filterApp.value = 'all';
        if (searchInput) searchInput.value = '';
        legendItems.forEach(i => i.classList.remove('active'));
        state.filters = { region: 'Europa', status: 'all', tech: 'all', application: 'all', search: '' };
        state.activeTimelineIndex = 0;
        closeCountryBanner();
        renderTimelineStatus();
        navButtons.forEach(b => {
          if (b.getAttribute('data-nav') === 'europe') b.classList.add('active');
          else b.classList.remove('active');
        });
        updateFilteredProjects();
        updateChoroplethLayerStyles();
      });
    }

    // 6. Colapso del Sidebar y Modo Presentación
    const btnToggleSidebar = document.getElementById('btn-toggle-sidebar');
    if (btnToggleSidebar) {
      btnToggleSidebar.addEventListener('click', togglePresentationMode);
    }

    const btnPresentation = document.getElementById('btn-toggle-presentation');
    if (btnPresentation) {
      btnPresentation.addEventListener('click', togglePresentationMode);
    }

    // 7. Quick Nav Buttons en el Mapa con flyToBounds y sincronización total de filtros y coroplético
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-nav');
        const flyOpts = { paddingTopLeft: [40, 80], paddingBottomRight: [40, 100], duration: 1.2 };

        if (target === 'world') {
          state.filters.region = 'all';
          state.map.flyToBounds([[-42, -135], [74, 175]], flyOpts);
        } else if (target === 'europe') {
          state.filters.region = 'Europa';
          state.map.flyToBounds([[34, -12], [66, 34]], flyOpts);
        } else if (target === 'north-america') {
          state.filters.region = 'Norteamérica';
          state.map.flyToBounds([[24, -128], [55, -60]], flyOpts);
        } else if (target === 'asia') {
          state.filters.region = 'Asia';
          state.map.flyToBounds([[15, 75], [72, 175]], flyOpts);
        }

        // Sincronizar el selector del sidebar
        if (filterRegion) {
          filterRegion.value = state.filters.region;
        }

        // Actualizar reactores visibles en el mapa
        updateFilteredProjects();

        // Actualizar capa coroplética para que pinte EXCLUSIVAMENTE los países de la región activa
        updateChoroplethLayerStyles();
      });
    });

    // 8. Drawer Close y Acciones
    const btnCloseDrawer = document.getElementById('btn-close-drawer');
    if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeProjectDrawer);

    // 8.1 Selector Interactivo WACC en el Drawer (Recálculo dinámico en tiempo real)
    document.querySelectorAll('.btn-wacc').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-wacc').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.selectedWacc = parseFloat(btn.getAttribute('data-wacc')) || 0.07;
        if (state.selectedProject) {
          updateDrawerFinancials(state.selectedProject, state.selectedWacc);
        }
      });
    });

    const btnLoadCalc = document.getElementById('btn-load-calc-from-drawer');
    if (btnLoadCalc) {
      btnLoadCalc.addEventListener('click', () => {
        if (state.selectedProject) {
          loadProjectIntoCalculator(state.selectedProject);
        }
      });
    }

    // 9. Botones de Cabecera (Modales y Explorador 3D)
    const btnSmr3d = document.getElementById('btn-open-smr-3d');
    if (btnSmr3d) {
      btnSmr3d.addEventListener('click', () => {
        window.open('explorador-smr-3d.html', '_blank');
      });
    }

    const btnEuStrategy = document.getElementById('btn-open-eu-strategy');
    if (btnEuStrategy) btnEuStrategy.addEventListener('click', () => openModal('modal-eu-strategy'));

    const btnCalc = document.getElementById('btn-open-calc');
    if (btnCalc) btnCalc.addEventListener('click', () => openModal('modal-calculator'));

    const btnCharts = document.getElementById('btn-open-charts');
    if (btnCharts) btnCharts.addEventListener('click', () => openModal('modal-charts'));

    // Terminal de Inteligencia B2B y Centros de Datos
    const btnPremium = document.getElementById('btn-open-premium');
    if (btnPremium) {
      btnPremium.addEventListener('click', () => {
        openModal('modal-premium-intelligence');
        updateDataCenterKpis();
      });
    }

    // Pestañas del Módulo B2B
    document.querySelectorAll('.b2b-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.b2b-tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.b2b-tab-pane').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const targetId = 'pane-' + btn.getAttribute('data-b2btab');
        const targetPane = document.getElementById(targetId);
        if (targetPane) targetPane.classList.add('active');
      });
    });

    // Simulador PPA Centros de Datos (IA) & Energía Firme 24/7
    function updateDataCenterKpis() {
      const pMw = parseFloat(document.getElementById('range-dc-power')?.value || 100);
      const ppaPrice = parseFloat(document.getElementById('range-dc-ppa')?.value || 70);
      const gridPrice = parseFloat(document.getElementById('range-dc-grid')?.value || 115);
      const downtimeCostK = parseFloat(document.getElementById('range-dc-downtime')?.value || 80);

      const dispPower = document.getElementById('disp-dc-power');
      if (dispPower) dispPower.textContent = pMw + ' MWe';

      const dispPpa = document.getElementById('disp-dc-ppa');
      if (dispPpa) dispPpa.textContent = ppaPrice + ' €/MWh';

      const dispGrid = document.getElementById('disp-dc-grid');
      if (dispGrid) dispGrid.textContent = gridPrice + ' €/MWh';

      const dispDt = document.getElementById('disp-dc-downtime');
      if (dispDt) dispDt.textContent = (downtimeCostK * 1000).toLocaleString('es-ES') + ' €/h';

      // Cálculos Financieros
      const annualMWh = pMw * 8760;
      const annualCostPpa = annualMWh * ppaPrice;
      const annualCostGrid = annualMWh * gridPrice;
      const savingsM = (annualCostGrid - annualCostPpa) / 1000000;
      const savings25yM = savingsM * 25;

      const co2Tons = annualMWh * 0.38; // 0.38 tCO2/MWh de ciclo combinado evitado
      const riskSavedM = (20 * downtimeCostK * 1000) / 1000000; // 20 horas de caída de red mitigadas

      const elSavings = document.getElementById('kpi-dc-savings');
      if (elSavings) elSavings.textContent = (savingsM >= 0 ? '+' : '') + savingsM.toFixed(2).replace('.', ',') + ' M€ / año';

      const elSavings25 = document.getElementById('kpi-dc-savings-25y');
      if (elSavings25) elSavings25.textContent = '~' + Math.round(savings25yM).toLocaleString('es-ES') + ' M€';

      const elCo2 = document.getElementById('kpi-dc-co2');
      if (elCo2) elCo2.textContent = Math.round(co2Tons).toLocaleString('es-ES') + ' t';

      const elRisk = document.getElementById('kpi-dc-risk-saved');
      if (elRisk) elRisk.textContent = '+' + riskSavedM.toFixed(2).replace('.', ',') + ' M€/año';
    }

    ['range-dc-power', 'range-dc-ppa', 'range-dc-grid', 'range-dc-downtime'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.addEventListener('input', updateDataCenterKpis);
    });

    // Memoria Técnico-Económica (Informe Oficial A4)
    const btnOpenReport = document.getElementById('btn-open-report');
    if (btnOpenReport) {
      btnOpenReport.addEventListener('click', () => openEngineeringReportModal(state.selectedProject));
    }

    const drawerBtnViewReport = document.getElementById('drawer-btn-view-report');
    if (drawerBtnViewReport) {
      drawerBtnViewReport.addEventListener('click', () => openEngineeringReportModal(state.selectedProject));
    }

    const btnCloseReport = document.getElementById('btn-close-report-modal');
    if (btnCloseReport) {
      btnCloseReport.addEventListener('click', () => {
        const modal = document.getElementById('modal-engineering-report');
        if (modal) modal.style.display = 'none';
      });
    }

    const btnPrintReport = document.getElementById('btn-print-report-modal');
    if (btnPrintReport) {
      btnPrintReport.addEventListener('click', () => {
        window.print();
      });
    }

    const btnExportCsv = document.getElementById('btn-export-csv-report');
    if (btnExportCsv) {
      btnExportCsv.addEventListener('click', () => {
        exportProjectToCSV(state.selectedProject);
      });
    }

    const reportSmrSelector = document.getElementById('report-smr-selector');
    if (reportSmrSelector) {
      reportSmrSelector.addEventListener('change', (e) => {
        const found = (window.SMR_DATABASE || []).find(p => p.id === e.target.value);
        if (found) {
          state.selectedProject = found;
          const doc = document.getElementById('smr-engineering-report-doc');
          if (doc) {
            doc.innerHTML = generateSMRReportHtml(found, state.selectedWacc);
          }
        }
      });
    }

    const reportModal = document.getElementById('modal-engineering-report');
    if (reportModal) {
      reportModal.addEventListener('click', (e) => {
        if (e.target === reportModal) {
          reportModal.style.display = 'none';
        }
      });
    }

    // Cerrar Modales
    document.querySelectorAll('.btn-close-modal').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const modal = e.target.closest('.modal-backdrop');
        if (modal) modal.classList.remove('open');
      });
    });

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) backdrop.classList.remove('open');
      });
    });

    // 10. Alternar Tema Oscuro / Claro
    const btnToggleTheme = document.getElementById('btn-toggle-theme');
    if (btnToggleTheme) {
      btnToggleTheme.addEventListener('click', () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', state.theme);
        localStorage.setItem('smr-theme', state.theme);
        btnToggleTheme.textContent = state.theme === 'dark' ? '☀️' : '🌙';

        // Sincronizar automáticamente la capa de mapa con el nuevo tema
        const esriDark = state.baseMaps && state.baseMaps['🌑 Esri Dark Canvas'];
        const esriLight = state.baseMaps && state.baseMaps['☀️ Esri Light Canvas'];
        if (state.theme === 'light') {
          if (esriDark && state.map.hasLayer(esriDark)) {
            state.map.removeLayer(esriDark);
            state.map.addLayer(esriLight);
            state.activeBaseLayer = esriLight;
          }
        } else {
          if (esriLight && state.map.hasLayer(esriLight)) {
            state.map.removeLayer(esriLight);
            state.map.addLayer(esriDark);
            state.activeBaseLayer = esriDark;
          }
        }

        // Actualizar estilo del mapa coroplético si está activo
        if (state.choroplethLayer) {
          state.choroplethLayer.setStyle(feature => {
            const iso = (feature.properties.iso2 || '').toUpperCase();
            const data = state.countryStats && state.countryStats[iso];
            const hasSmr = data && (data.totalCapacityMWe > 0 || data.projectsCount > 0);
            const cap = data ? data.totalCapacityMWe : 0;
            return {
              fillColor: hasSmr ? getChoroplethColor(cap, data.projectsCount) : 'rgba(15, 23, 42, 0.25)',
              weight: hasSmr ? 1.5 : 0.6,
              opacity: hasSmr ? 0.9 : 0.25,
              color: hasSmr ? '#38bdf8' : '#334155',
              fillOpacity: hasSmr ? (state.theme === 'dark' ? 0.65 : 0.45) : (state.theme === 'dark' ? 0.12 : 0.04)
            };
          });
        }

        if (document.getElementById('modal-charts').classList.contains('open')) {
          renderChartsDashboard();
        }
      });
      btnToggleTheme.textContent = state.theme === 'dark' ? '☀️' : '🌙';
    }

    // 11. Tecla Escape para cerrar drawer o cualquier modal
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeProjectDrawer();
        document.querySelectorAll('.modal-backdrop.open').forEach(m => m.classList.remove('open'));
      }
    });
  }

  // Utilidad para emojis de banderas
  function getFlagEmoji(countryCode) {
    if (!countryCode || countryCode.length !== 2) return '🌐';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
  }
});
