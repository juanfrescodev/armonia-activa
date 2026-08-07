// ============================================================
// ARMONÍA ACTIVA
// js/herramientas/circulo.js
// ============================================================

window.HERRAMIENTAS = window.HERRAMIENTAS || {};

const CIRCULO_DATOS = [
    { nota: "C",  alteraciones: "0",        relativa: "Am",  freqRoot: 261.63 },
    { nota: "G",  alteraciones: "1 ♯ (F♯)", relativa: "Em",  freqRoot: 392.00 },
    { nota: "D",  alteraciones: "2 ♯",      relativa: "Bm",  freqRoot: 293.66 },
    { nota: "A",  alteraciones: "3 ♯",      relativa: "F♯m", freqRoot: 220.00 },
    { nota: "E",  alteraciones: "4 ♯",      relativa: "C♯m", freqRoot: 329.63 },
    { nota: "B",  alteraciones: "5 ♯",      relativa: "G♯m", freqRoot: 246.94 },
    { nota: "F♯", alteraciones: "6 ♯ / 6 ♭",relativa: "D♯m", freqRoot: 369.99 },
    { nota: "D♭", alteraciones: "5 ♭",      relativa: "B♭m", freqRoot: 277.18 },
    { nota: "A♭", alteraciones: "4 ♭",      relativa: "Fm",  freqRoot: 207.65 },
    { nota: "E♭", alteraciones: "3 ♭",      relativa: "Cm",  freqRoot: 311.13 },
    { nota: "B♭", alteraciones: "2 ♭",      relativa: "Gm",  freqRoot: 233.08 },
    { nota: "F",  alteraciones: "1 ♭ (B♭)", relativa: "Dm",  freqRoot: 349.23 }
];

// Configuración de los 7 Modos Griegos (fórmulas relativas desde la tónica mayor)
const MODOS_CONFIG = {
    jonico: {
        nombre: "Jónico (Mayor)",
        gradosNombres: ["I", "ii", "iii", "IV", "V", "vi", "vii°"],
        semitonosGrados: [0, 2, 4, 5, 7, 9, 11],
        esMenorGrado: [false, true, true, false, false, true, true],
        descripcion: "Modo mayor estándar. Brillante, estable y consonante."
    },
    dorico: {
        nombre: "Dórico",
        gradosNombres: ["i", "ii", "♭III", "IV", "v", "vi°", "♭VII"],
        semitonosGrados: [0, 2, 3, 5, 7, 9, 10],
        esMenorGrado: [true, true, false, false, true, true, false],
        descripcion: "Menor con 6ta mayor. Típico del Jazz, Funk y Rock Bluesero."
    },
    frigio: {
        nombre: "Frigio",
        gradosNombres: ["i", "♭II", "♭III", "iv", "v°", "♭VI", "♭vii"],
        semitonosGrados: [0, 1, 3, 5, 7, 8, 10],
        esMenorGrado: [true, false, false, true, true, false, true],
        descripcion: "Menor con 2da menor. Sonido flamenco, oscuro y tenso."
    },
    lidio: {
        nombre: "Lidio",
        gradosNombres: ["I", "II", "iii", "#iv°", "V", "vi", "vii"],
        semitonosGrados: [0, 2, 4, 6, 7, 9, 11],
        esMenorGrado: [false, false, true, true, false, true, true],
        descripcion: "Mayor con 4ta aumentada. Místico, etéreo y cinematográfico."
    },
    mixolidio: {
        nombre: "Mixolidio",
        gradosNombres: ["I", "ii", "iii°", "IV", "v", "vi", "♭VII"],
        semitonosGrados: [0, 2, 4, 5, 7, 9, 10],
        esMenorGrado: [false, true, true, false, true, true, false],
        descripcion: "Mayor con 7ma menor. Típico del Blues, Rock clásico y Pop."
    },
    eolico: {
        nombre: "Eólico (Menor)",
        gradosNombres: ["i", "ii°", "♭III", "iv", "v", "♭VI", "♭VII"],
        semitonosGrados: [0, 2, 3, 5, 7, 8, 10],
        esMenorGrado: [true, true, false, true, true, false, false],
        descripcion: "Escala menor natural. Melancólica, dramática y expresiva."
    },
    locrio: {
        nombre: "Locrio",
        gradosNombres: ["i°", "♭II", "♭iii", "iv", "♭V", "♭VI", "♭vii"],
        semitonosGrados: [0, 1, 3, 5, 6, 8, 10],
        esMenorGrado: [true, false, true, true, false, false, true],
        descripcion: "5ta disminuida. Extremadamente inestable y disonante."
    }
};

// Mapeo dinámico de nombres de notas según semitonos
const NOMBRES_NOTAS = ["C", "D♭", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];

window.HERRAMIENTAS.circulo = function(panel) {
    if (!panel) return;

    let tonalidadSeleccionada = 0;
    let modoActual = "jonico";
    let audioCtx = null;

    function obtenerAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    function reproducirTono(freq, tipo = "triangle", duracion = 1.2, delay = 0) {
        const ctx = obtenerAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = tipo;
        osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

        gain.gain.setValueAtTime(0.15, ctx.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duracion);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + delay);
        osc.stop(ctx.currentTime + delay + duracion);
    }

    function reproducirAcorde(freqBase, esMenor = false) {
        const multTercera = esMenor ? 1.1892 : 1.2599;
        const multQuinta = 1.4983;

        reproducirTono(freqBase, "triangle", 1.5, 0);
        reproducirTono(freqBase * multTercera, "triangle", 1.5, 0.05);
        reproducirTono(freqBase * multQuinta, "triangle", 1.5, 0.1);
    }

    function obtenerNombreNotaDesdeBase(freqBase, semitonos) {
        // Encuentra el índice semitonal aproximado
        const semitonosBase = Math.round(12 * Math.log2(freqBase / 261.63));
        const index = (semitonosBase + semitonos + 1200) % 12;
        return NOMBRES_NOTAS[index];
    }

    panel.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 24px; max-width: 900px; margin: 0 auto; padding-bottom: 40px;">
            
            <!-- Encabezado -->
            <div style="display: flex; flex-direction: column; gap: 12px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 24px; border-radius: 16px; border: 1px solid #334155;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <button type="button" id="volverHerramientas" style="
                        background: rgba(51, 65, 85, 0.6); border: 1px solid #475569; color: #f8fafc; 
                        padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;
                    ">← Volver a Herramientas</button>
                    <span style="font-size: 2rem;">🔄</span>
                </div>
                <div>
                    <h2 style="font-size: 1.8rem; font-weight: 800; color: #f8fafc; margin: 0 0 6px 0;">Círculo de Quintas Interactivo</h2>
                    <p style="color: #94a3b8; margin: 0; font-size: 1rem;">Explorá relaciones armónicas, modos griegos e intercambio modal en tiempo real.</p>
                </div>
            </div>

            <!-- Selector de Modos -->
            <div style="background: #1e293b; padding: 16px; border-radius: 14px; border: 1px solid #334155; display: flex; flex-direction: column; gap: 10px;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #38bdf8; text-transform: uppercase;">🎛️ Selector de Modo Griegos</span>
                <div id="selectorModos" style="display: flex; gap: 8px; flex-wrap: wrap;">
                    ${Object.keys(MODOS_CONFIG).map(clave => `
                        <button type="button" data-modo="${clave}" class="btn-modo ${clave === modoActual ? 'activo' : ''}" style="
                            background: ${clave === modoActual ? '#38bdf8' : '#0f172a'}; 
                            color: ${clave === modoActual ? '#0f172a' : '#f8fafc'}; 
                            border: 1px solid #475569; padding: 8px 14px; border-radius: 8px; 
                            font-weight: 700; cursor: pointer; transition: all 0.2s; font-size: 0.85rem;
                        ">${MODOS_CONFIG[clave].nombre}</button>
                    `).join('')}
                </div>
                <p id="txtDescripcionModo" style="color: #cbd5e1; margin: 4px 0 0 0; font-size: 0.9rem; font-style: italic;"></p>
            </div>

            <!-- Panel Interactivo Principal -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; align-items: center;">
                
                <!-- Rueda SVG -->
                <div style="background: #1e293b; padding: 20px; border-radius: 16px; border: 1px solid #334155; display: flex; justify-content: center; align-items: center; position: relative;">
                    <svg id="svgCirculoQuintas" viewBox="0 0 400 400" style="width: 100%; max-width: 340px; height: auto; display: block; overflow: visible;"></svg>
                </div>

                <!-- Detalle de la Tonalidad -->
                <div style="display: flex; flex-direction: column; gap: 16px;">
                    <div style="background: #0f172a; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                        <span style="font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase;">Centro Tonal y Modo</span>
                        <h3 id="txtTonicaMayor" style="font-size: 2rem; font-weight: 800; color: #38bdf8; margin: 4px 0;">C Jónico</h3>
                        <p id="txtAlteraciones" style="color: #cbd5e1; font-size: 0.95rem; margin: 0 0 12px 0;">Armadura: 0 alteraciones</p>
                        
                        <button id="btnEscucharProgresion" style="
                            background: #0284c7; color: #ffffff; border: none; padding: 10px 16px; border-radius: 8px; 
                            font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-size: 0.9rem;
                        ">▶ Escuchar Cadencia del Modo</button>
                    </div>

                    <div style="background: #0f172a; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                        <span style="font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase;">Relativa Menor / Paralela</span>
                        <h4 id="txtRelativaMenor" style="font-size: 1.5rem; font-weight: 800; color: #818cf8; margin: 4px 0;">A menor</h4>
                    </div>
                </div>
            </div>

            <!-- Acordes Diatónicos del Modo -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; display: block; margin-bottom: 12px;">🎼 Familia Armónica Diatónica (Tocá para escuchar)</span>
                <div id="contenedorAcordesCirculo" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(90px, 1fr)); gap: 10px;"></div>
            </div>

            <!-- Intercambio Modal (Acordes Prestados) -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                <div style="display: flex; flex-direction: column; gap: 4px; margin-bottom: 12px;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: #f59e0b; text-transform: uppercase;">✨ Generador de Intercambio Modal (Acordes Prestados)</span>
                    <p style="color: #94a3b8; margin: 0; font-size: 0.85rem;">Acordes característicos tomados del modo paralelo para añadir color armónico a tu progresión.</p>
                </div>
                <div id="contenedorIntercambioModal" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(110px, 1fr)); gap: 10px;"></div>
            </div>

        </div>
    `;

    // Evento botón volver
    const volver = document.getElementById("volverHerramientas");
    if (volver) {
        volver.addEventListener("click", () => {
            if (typeof volverHerramientas === "function") volverHerramientas();
        });
    }

    // Eventos selector de modos
    const botonesModo = panel.querySelectorAll(".btn-modo");
    botonesModo.forEach(btn => {
        btn.addEventListener("click", () => {
            modoActual = btn.dataset.modo;
            botonesModo.forEach(b => {
                const activo = b.dataset.modo === modoActual;
                b.style.background = activo ? '#38bdf8' : '#0f172a';
                b.style.color = activo ? '#0f172a' : '#f8fafc';
            });
            renderRuedaSVG();
            actualizarDetalles();
        });
    });

    document.getElementById("btnEscucharProgresion").addEventListener("click", () => {
        const item = CIRCULO_DATOS[tonalidadSeleccionada];
        const cfg = MODOS_CONFIG[modoActual];
        const root = item.freqRoot;

        // Toca I/i, luego IV/iv, luego V/v y vuelve a I/i
        reproducirAcorde(root, cfg.esMenorGrado[0]);
        setTimeout(() => reproducirAcorde(root * Math.pow(2, cfg.semitonosGrados[3] / 12), cfg.esMenorGrado[3]), 800);
        setTimeout(() => reproducirAcorde(root * Math.pow(2, cfg.semitonosGrados[4] / 12), cfg.esMenorGrado[4]), 1600);
        setTimeout(() => reproducirAcorde(root, cfg.esMenorGrado[0]), 2400);
    });

    renderRuedaSVG();
    actualizarDetalles();

    function renderRuedaSVG() {
        const svg = document.getElementById("svgCirculoQuintas");
        if (!svg) return;

        const cx = 200, cy = 200;
        const rExt = 180, rMed = 120, rInt = 65;
        let html = '';

        const idxIzquierda = (tonalidadSeleccionada - 1 + 12) % 12;
        const idxDerecha = (tonalidadSeleccionada + 1) % 12;
        const vecinos = [tonalidadSeleccionada, idxIzquierda, idxDerecha];

        CIRCULO_DATOS.forEach((item, index) => {
            const anguloInicio = (index * 30 - 105) * (Math.PI / 180);
            const anguloFin = ((index + 1) * 30 - 105) * (Math.PI / 180);
            const anguloTexto = (index * 30 - 90) * (Math.PI / 180);

            const esActivo = index === tonalidadSeleccionada;
            const esVecino = vecinos.includes(index);

            let fillMayor = "#1e293b";
            let fillMenor = "#0f172a";
            let opacidad = esVecino ? "1.0" : "0.35";

            if (esActivo) {
                fillMayor = "#38bdf8";
                fillMenor = "#818cf8";
            } else if (esVecino) {
                fillMayor = "#0284c7";
                fillMenor = "#4f46e5";
            }

            const colorTextMayor = esActivo ? "#0f172a" : "#f8fafc";
            const colorTextMenor = esActivo ? "#ffffff" : "#cbd5e1";

            const pathMayor = describirArco(cx, cy, rMed, rExt, anguloInicio, anguloFin);
            const pathMenor = describirArco(cx, cy, rInt, rMed, anguloInicio, anguloFin);

            const xMayor = cx + (rExt + rMed) / 2 * Math.cos(anguloTexto);
            const yMayor = cy + (rExt + rMed) / 2 * Math.sin(anguloTexto);

            const xMenor = cx + (rMed + rInt) / 2 * Math.cos(anguloTexto);
            const yMenor = cy + (rMed + rInt) / 2 * Math.sin(anguloTexto);

            html += `
                <g class="sector-circulo" data-index="${index}" style="cursor: pointer; opacity: ${opacidad}; transition: opacity 0.2s;">
                    <path d="${pathMayor}" fill="${fillMayor}" stroke="#334155" stroke-width="2"/>
                    <path d="${pathMenor}" fill="${fillMenor}" stroke="#334155" stroke-width="2"/>
                    
                    <text x="${xMayor}" y="${yMayor}" fill="${colorTextMayor}" font-size="16" font-weight="bold" text-anchor="middle" dominant-baseline="central">${item.nota}</text>
                    <text x="${xMenor}" y="${yMenor}" fill="${colorTextMenor}" font-size="12" font-weight="bold" text-anchor="middle" dominant-baseline="central">${item.relativa}</text>
                </g>
            `;
        });

        html += `<circle cx="${cx}" cy="${cy}" r="${rInt}" fill="#0f172a" stroke="#334155" stroke-width="2"/>`;
        svg.innerHTML = html;

        svg.querySelectorAll(".sector-circulo").forEach(sector => {
            sector.addEventListener("click", () => {
                tonalidadSeleccionada = parseInt(sector.dataset.index);
                renderRuedaSVG();
                actualizarDetalles();
                reproducirAcorde(CIRCULO_DATOS[tonalidadSeleccionada].freqRoot, false);
            });
        });
    }

    function actualizarDetalles() {
        const item = CIRCULO_DATOS[tonalidadSeleccionada];
        const cfgModo = MODOS_CONFIG[modoActual];

        document.getElementById("txtTonicaMayor").innerText = `${item.nota} ${cfgModo.nombre}`;
        document.getElementById("txtAlteraciones").innerText = `Armadura: ${item.alteraciones}`;
        document.getElementById("txtRelativaMenor").innerText = `${item.relativa} (Relativa) / ${item.nota}m (Paralela)`;
        document.getElementById("txtDescripcionModo").innerText = cfgModo.descripcion;

        // Renderizar Acordes Diatónicos del Modo
        const contAcordes = document.getElementById("contenedorAcordesCirculo");
        
        const acordesModo = cfgModo.semitonosGrados.map((semitonos, i) => {
            const nombreNota = obtenerNombreNotaDesdeBase(item.freqRoot, semitonos);
            const esMenor = cfgModo.esMenorGrado[i];
            const sufijo = cfgModo.gradosNombres[i].includes("°") ? "dim" : (esMenor ? "m" : "");
            return {
                grado: cfgModo.gradosNombres[i],
                nombre: `${nombreNota}${sufijo}`,
                freq: item.freqRoot * Math.pow(2, semitonos / 12),
                esMenor: esMenor
            };
        });

        contAcordes.innerHTML = acordesModo.map((ac, i) => `
            <div class="card-acorde-circulo" data-idx="${i}" style="
                background: #0f172a; border: 1px solid #475569; padding: 10px; border-radius: 8px; text-align: center; cursor: pointer; transition: transform 0.1s;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <span style="font-size: 0.65rem; color: #94a3b8; font-weight: bold; display: block;">${ac.grado}</span>
                <strong style="color: ${i === 0 ? '#38bdf8' : '#f8fafc'}; font-size: 1.1rem;">${ac.nombre}</strong>
            </div>
        `).join('');

        contAcordes.querySelectorAll(".card-acorde-circulo").forEach(card => {
            card.addEventListener("click", () => {
                const idx = parseInt(card.dataset.idx);
                const ac = acordesModo[idx];
                reproducirAcorde(ac.freq, ac.esMenor);
            });
        });

        // Renderizar Intercambio Modal (Acordes prestados de la tonalidad paralela menor/mayor)
        const contIntercambio = document.getElementById("contenedorIntercambioModal");
        
        // Acordes prestados estándar
        const prestadosEstructura = [
            { semitono: 5, esMenor: true, grado: "iv", etiqueta: "Menor Menor" },
            { semitono: 8, esMenor: false, grado: "♭VI", etiqueta: "Subdominante Prestado" },
            { semitono: 10, esMenor: false, grado: "♭VII", etiqueta: "Subtónica" },
            { semitono: 3, esMenor: false, grado: "♭III", etiqueta: "Mediante Prestada" }
        ];

        const acordesPrestados = prestadosEstructura.map(p => {
            const nombreNota = obtenerNombreNotaDesdeBase(item.freqRoot, p.semitono);
            return {
                grado: p.grado,
                etiqueta: p.etiqueta,
                nombre: `${nombreNota}${p.esMenor ? 'm' : ''}`,
                freq: item.freqRoot * Math.pow(2, p.semitono / 12),
                esMenor: p.esMenor
            };
        });

        contIntercambio.innerHTML = acordesPrestados.map((ap, i) => `
            <div class="card-prestado-circulo" data-idx="${i}" style="
                background: #111827; border: 1px dashed #f59e0b; padding: 10px; border-radius: 8px; text-align: center; cursor: pointer; transition: transform 0.1s;
            " onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
                <span style="font-size: 0.65rem; color: #f59e0b; font-weight: bold; display: block;">${ap.grado} (${ap.etiqueta})</span>
                <strong style="color: #fbbf24; font-size: 1.1rem;">${ap.nombre}</strong>
            </div>
        `).join('');

        contIntercambio.querySelectorAll(".card-prestado-circulo").forEach(card => {
            card.addEventListener("click", () => {
                const idx = parseInt(card.dataset.idx);
                const ap = acordesPrestados[idx];
                reproducirAcorde(ap.freq, ap.esMenor);
            });
        });
    }

    function describirArco(x, y, rInterior, rExterior, anguloInicio, anguloFin) {
        const x1Ext = x + rExterior * Math.cos(anguloInicio);
        const y1Ext = y + rExterior * Math.sin(anguloInicio);
        const x2Ext = x + rExterior * Math.cos(anguloFin);
        const y2Ext = y + rExterior * Math.sin(anguloFin);

        const x1Int = x + rInterior * Math.cos(anguloFin);
        const y1Int = y + rInterior * Math.sin(anguloFin);
        const x2Int = x + rInterior * Math.cos(anguloInicio);
        const y2Int = y + rInterior * Math.sin(anguloInicio);

        return [
            `M ${x1Ext} ${y1Ext}`,
            `A ${rExterior} ${rExterior} 0 0 1 ${x2Ext} ${y2Ext}`,
            `L ${x1Int} ${y1Int}`,
            `A ${rInterior} ${rInterior} 0 0 0 ${x2Int} ${y2Int}`,
            "Z"
        ].join(" ");
    }

    panel._limpiarHerramienta = function() {
        if (audioCtx && audioCtx.state !== 'closed') {
            audioCtx.close();
            audioCtx = null;
        }
    };
};