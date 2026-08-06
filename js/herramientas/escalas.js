// ============================================================
// ARMONÍA ACTIVA
// js/herramientas/escalas.js
// ============================================================
// EXPLORADOR DE ESCALAS E IMPROVISACIÓN
// - Mapeo de escalas mayores, menores, pentatónicas, modos.
// - Visualización en Piano y Guitarra (por patrones).
// - Generación de acordes diatónicos (Armonización).
// - Audio de acompañamiento en bucle con Web Audio API.
// ============================================================

window.HERRAMIENTAS = window.HERRAMIENTAS || {};

const NOTAS_ESCALAS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Fórmulas expresadas en semitonos desde la tónica (0)
const TIPOS_ESCALAS = {
    "mayor": { nombre: "Mayor (Jónico)", patron: [0, 2, 4, 5, 7, 9, 11], grados: ["Maj", "m", "m", "Maj", "7", "m", "dim"] },
    "menor": { nombre: "Menor Natural (Eólico)", patron: [0, 2, 3, 5, 7, 8, 10], grados: ["m", "dim", "Maj", "m", "m", "Maj", "Maj"] },
    "penta_menor": { nombre: "Pentatónica Menor", patron: [0, 3, 5, 7, 10], grados: [] },
    "penta_mayor": { nombre: "Pentatónica Mayor", patron: [0, 2, 4, 7, 9], grados: [] },
    "blues": { nombre: "Blues (Menor + b5)", patron: [0, 3, 5, 6, 7, 10], grados: [] },
    "dorico": { nombre: "Modo Dórico", patron: [0, 2, 3, 5, 7, 9, 10], grados: ["m", "m", "Maj", "Maj", "m", "dim", "Maj"] },
    "mixolidio": { nombre: "Modo Mixolidio", patron: [0, 2, 4, 5, 7, 9, 10], grados: ["Maj", "m", "dim", "Maj", "m", "m", "Maj"] },
    "menor_armonica": { nombre: "Menor Armónica", patron: [0, 2, 3, 5, 7, 8, 11], grados: ["m", "dim", "Aug", "m", "Maj", "Maj", "dim"] }
};

window.HERRAMIENTAS.escalas = function(panel) {
    if (!panel) return;

    let audioCtx = null;
    let loopInterval = null;
    let reproduciendoBase = false;

    panel.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 24px; max-width: 900px; margin: 0 auto; padding-bottom: 40px;">
            
            <!-- Encabezado -->
            <div style="display: flex; flex-direction: column; gap: 12px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 24px; border-radius: 16px; border: 1px solid #334155;">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <button type="button" id="volverHerramientas" style="
                        background: rgba(51, 65, 85, 0.6); border: 1px solid #475569; color: #f8fafc; 
                        padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;
                    ">← Volver a Herramientas</button>
                    <span style="font-size: 2rem;">🎼</span>
                </div>
                <div>
                    <h2 style="font-size: 1.8rem; font-weight: 800; color: #f8fafc; margin: 0 0 6px 0;">Explorador de Escalas e Improvisación</h2>
                    <p style="color: #94a3b8; margin: 0; font-size: 1rem;">Mapeá digitaciones en piano y guitarra, descubrí los acordes para acompañar y activá una base en bucle para practicar arriba.</p>
                </div>
            </div>

            <!-- Panel de Controles -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                
                <!-- Tónica -->
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">1. Tónica</label>
                    <select id="selectTonicaEscala" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #475569; border-radius: 8px; color: white; cursor: pointer;">
                        ${NOTAS_ESCALAS.map(n => `<option value="${n}">${n}</option>`).join('')}
                    </select>
                </div>

                <!-- Tipo de Escala -->
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">2. Tipo de Escala</label>
                    <select id="selectTipoEscala" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #475569; border-radius: 8px; color: white; cursor: pointer;">
                        ${Object.keys(TIPOS_ESCALAS).map(k => `<option value="${k}">${TIPOS_ESCALAS[k].nombre}</option>`).join('')}
                    </select>
                </div>

                <!-- Botón Reproductor de Base -->
                <div style="display: flex; flex-direction: column; justify-content: flex-end;">
                    <button type="button" id="btnPlayBase" style="
                        background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); color: white; border: none;
                        padding: 11px 16px; border-radius: 8px; font-weight: 800; cursor: pointer; font-size: 0.95rem;
                        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3); transition: all 0.2s ease;
                    ">▶ Practicar con Base</button>
                </div>

            </div>

            <!-- Muestra de Notas de la Escala -->
            <div style="background: #0f172a; padding: 20px; border-radius: 14px; border: 1px solid #334155; text-align: center;">
                <span style="font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase;">Notas de la Escala</span>
                <div id="contenedorNotasEscala" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; margin-top: 10px;"></div>
            </div>

            <!-- Grados y Acordes Diatónicos para Acompañar -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">🎼 Acordes para Acompañar (Armonización)</span>
                <p style="font-size: 0.85rem; color: #94a3b8; margin: 0 0 12px 0;">Estos acordes combinan perfectamente para crear bases o acompañamientos en esta escala:</p>
                <div id="contenedorAcordesDiatonicos" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
            </div>

            <!-- Teclado de Piano -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 12px;">🎹 Mapa en Piano (2 Octavas)</span>
                <div id="pianoEscalaContainer" style="display: flex; justify-content: center; overflow-x: auto; padding: 10px 0;"></div>
            </div>

            <!-- Diapasón de Guitarra -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 12px;">🎸 Diapasón de Guitarra (Trastes 0 al 12)</span>
                <div id="guitarraEscalaContainer" style="overflow-x: auto;"></div>
            </div>

        </div>
    `;

    // Eventos
    const volver = document.getElementById("volverHerramientas");
    if (volver) {
        volver.addEventListener("click", () => {
            if (typeof volverHerramientas === "function") volverHerramientas();
        });
    }

    const selTonica = document.getElementById("selectTonicaEscala");
    const selTipo = document.getElementById("selectTipoEscala");
    const btnPlay = document.getElementById("btnPlayBase");

    selTonica.addEventListener("change", actualizarEscala);
    selTipo.addEventListener("change", actualizarEscala);
    btnPlay.addEventListener("click", toggleBaseAudio);

    actualizarEscala();

    function actualizarEscala() {
        const tonica = selTonica.value;
        const tipoKey = selTipo.value;
        const estructura = TIPOS_ESCALAS[tipoKey];

        const idxBase = NOTAS_ESCALAS.indexOf(tonica);
        const notasEscala = estructura.patron.map(st => NOTAS_ESCALAS[(idxBase + st) % 12]);

        // Render Notas
        const contNotas = document.getElementById("contenedorNotasEscala");
        contNotas.innerHTML = notasEscala.map((n, i) => `
            <span style="background: ${i === 0 ? '#38bdf8' : '#334155'}; color: white; padding: 8px 16px; border-radius: 8px; font-weight: 800; font-size: 1.1rem;">
                ${n} ${i === 0 ? '<small style="font-size:0.65rem; display:block; opacity:0.8;">(Tónica)</small>' : ''}
            </span>
        `).join('');

        // Render Acordes
        const contAcordes = document.getElementById("contenedorAcordesDiatonicos");
        if (estructura.grados.length > 0) {
            contAcordes.innerHTML = notasEscala.map((n, i) => `
                <div style="background: #0f172a; border: 1px solid #475569; padding: 8px 14px; border-radius: 8px; text-align: center; min-width: 70px;">
                    <span style="font-size: 0.65rem; color: #94a3b8; font-weight: bold; display: block;">GRADO ${i + 1}</span>
                    <strong style="color: #38bdf8; font-size: 1rem;">${n}${estructura.grados[i]}</strong>
                </div>
            `).join('');
        } else {
            contAcordes.innerHTML = `<span style="color: #64748b; font-size: 0.85rem; font-style: italic;">Las escalas pentatónicas/blues no poseen armonización diatónica rígida de 7 grados. Usá los acordes de la escala mayor/menor relativa.</span>`;
        }

        renderPianoEscala(notasEscala, tonica);
        renderGuitarraEscala(notasEscala, tonica);
    }

    // Audio sintetizado en bucle para practicar
    function toggleBaseAudio() {
        if (reproduciendoBase) {
            detenerAudio();
            btnPlay.textContent = "▶ Practicar con Base";
            btnPlay.style.background = "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)";
            reproduciendoBase = false;
        } else {
            iniciarAudio();
            btnPlay.textContent = "⏹ Detener Base";
            btnPlay.style.background = "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)";
            reproduciendoBase = true;
        }
    }

    function iniciarAudio() {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const tonica = selTonica.value;
        const idxBase = NOTAS_ESCALAS.indexOf(tonica);
        
        // Frecuencia tónica
        const frecBase = 130.81 * Math.pow(2, idxBase / 12); // C3 de referencia

        let paso = 0;
        loopInterval = setInterval(() => {
            if (!audioCtx) return;
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            // Alterna entre Tónica y Quinta para dar base rítmica
            const mult = paso % 2 === 0 ? 1 : 1.498; 
            osc.frequency.setValueAtTime(frecBase * mult, audioCtx.currentTime);
            osc.type = "triangle";

            gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.start();
            osc.stop(audioCtx.currentTime + 0.8);

            paso++;
        }, 800);
    }

    function detenerAudio() {
        if (loopInterval) clearInterval(loopInterval);
        if (audioCtx && audioCtx.state !== "closed") audioCtx.close();
        audioCtx = null;
    }

    panel._limpiarHerramienta = function() {
        detenerAudio();
        selTonica.removeEventListener("change", actualizarEscala);
        selTipo.removeEventListener("change", actualizarEscala);
        btnPlay.removeEventListener("click", toggleBaseAudio);
    };
};

// ============================================================
// RENDERS VISUALES
// ============================================================
function renderPianoEscala(notasEscala, tonica) {
    const container = document.getElementById("pianoEscalaContainer");
    if (!container) return;

    const secuencia = [
        { n: "C", t: false }, { n: "C#", t: true }, { n: "D", t: false }, { n: "D#", t: true },
        { n: "E", t: false }, { n: "F", t: false }, { n: "F#", t: true }, { n: "G", t: false },
        { n: "G#", t: true }, { n: "A", t: false }, { n: "A#", t: true }, { n: "B", t: false }
    ];

    // Duplicar para 2 octavas
    const octavas = [...secuencia, ...secuencia];

    container.innerHTML = `
        <div style="display: flex; height: 120px; background: #0f172a; padding: 8px; border-radius: 8px; border: 1px solid #475569; position: relative;">
            ${octavas.map(item => {
                const esNota = notasEscala.includes(item.n);
                const esTonica = item.n === tonica;
                
                let bgBlanca = esNota ? (esTonica ? '#38bdf8' : '#818cf8') : '#ffffff';
                let bgNegra = esNota ? (esTonica ? '#0284c7' : '#6366f1') : '#0f172a';

                if (!item.t) {
                    return `<div style="width: 28px; height: 110px; background: ${bgBlanca}; border: 1px solid #94a3b8; border-radius: 0 0 5px 5px; z-index: 1;"></div>`;
                } else {
                    return `<div style="width: 18px; height: 68px; background: ${bgNegra}; margin-left: -9px; margin-right: -9px; z-index: 2; border-radius: 0 0 4px 4px; border: 1px solid #334155;"></div>`;
                }
            }).join('')}
        </div>
    `;
}

function renderGuitarraEscala(notasEscala, tonica) {
    const container = document.getElementById("guitarraEscalaContainer");
    if (!container) return;

    const afinacion = ["E", "B", "G", "D", "A", "E"]; // De 1ª a 6ª cuerda
    const totalTrastes = 12;

    let html = `<table style="width: 100%; border-collapse: collapse; background: #0f172a; border-radius: 8px; overflow: hidden; border: 1px solid #475569;">`;
    
    // Encabezado de trastes
    html += `<tr><th style="padding: 6px; font-size: 0.7rem; color: #64748b;">Cuerda</th>`;
    for (let t = 0; t <= totalTrastes; t++) {
        html += `<th style="padding: 6px; font-size: 0.75rem; color: #94a3b8; border-bottom: 2px solid #334155;">${t === 0 ? 'Aire' : t}</th>`;
    }
    html += `</tr>`;

    // Filas de cuerdas
    afinacion.forEach((cuerdaBase) => {
        const idxCuerda = NOTAS_ESCALAS.indexOf(cuerdaBase);
        html += `<tr><td style="padding: 8px; font-weight: bold; color: #38bdf8; text-align: center; border-right: 2px solid #475569;">${cuerdaBase}</td>`;

        for (let traste = 0; traste <= totalTrastes; traste++) {
            const notaTraste = NOTAS_ESCALAS[(idxCuerda + traste) % 12];
            const pertenece = notasEscala.includes(notaTraste);
            const esTonica = notaTraste === tonica;

            let celda = "";
            if (pertenece) {
                const colorBg = esTonica ? "#38bdf8" : "#818cf8";
                celda = `<span style="background: ${colorBg}; color: white; border-radius: 50%; width: 22px; height: 22px; display: inline-flex; align-items: center; justify-content: center; font-size: 0.7rem; font-weight: bold;">${notaTraste}</span>`;
            }

            html += `<td style="text-align: center; border: 1px solid #1e293b; height: 36px; min-width: 32px;">${celda}</td>`;
        }
        html += `</tr>`;
    });

    html += `</table>`;
    container.innerHTML = html;
}