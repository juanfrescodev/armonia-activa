// ============================================================
// ARMONÍA ACTIVA
// js/herramientas/escalas.js
// ============================================================

window.HERRAMIENTAS = window.HERRAMIENTAS || {};

const NOTAS_ESCALAS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Mapeo de IDs reales, activos y verificados de YouTube para cada tonalidad
const BACKING_TRACKS_YT = {
    "C":  "BNVbWDIT4eo", // Rock Pop Backing Track C Major (TGuitar)
    "C#": "6Dn6DTE-xlM", // Dreamy Mellow Guitar Backing Track C# Major (Jam'in)
    "D":  "2EoqzNR68pY", // Rock Backing Track D Major (TGuitar)
    "D#": "s7wZ7OGLOSc", // Soul RnB Groove Backing Track Eb/D# Major (Samurai Jam)
    "E":  "a-u6Q4Vzhjg", // Rock Pop Backing Track E Major (TGuitar)
    "F":  "wKbg6iDSXJQ", // Rock Pop Backing Track F Major (TGuitar)
    "F#": "xG48Ziz1IZk", // Delicate Soulful Groove Backing Track F# Major (Elevated Jam)
    "G":  "3stpZKNF_jQ", // Rock Pop Backing Track G Major (TGuitar)
    "G#": "t9Yi2tTeahU", // Gentle Mellow Groove Backing Track G#/Ab Major (Elevated Jam)
    "A":  "78-nA8U6Rj8", // Rock Pop Backing Track A Major (TGuitar)
    "A#": "i4vK-x69AJ8", // Rock Pop Backing Track Bb/A# Major (TGuitar)
    "B":  "o86XsPtpY5I"  // Pop Rock Soul Backing Track B Major (Musician's Guide)
};

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
                    <p style="color: #94a3b8; margin: 0; font-size: 1rem;">Mapeá digitaciones en piano y guitarra con un Backing Track de YouTube verificado para cada tonalidad.</p>
                </div>
            </div>

            <!-- Panel de Controles -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">1. Tónica</label>
                    <select id="selectTonicaEscala" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #475569; border-radius: 8px; color: white; cursor: pointer;">
                        ${NOTAS_ESCALAS.map(n => `<option value="${n}">${n}</option>`).join('')}
                    </select>
                </div>

                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">2. Tipo de Escala</label>
                    <select id="selectTipoEscala" style="width: 100%; padding: 10px; background: #0f172a; border: 1px solid #475569; border-radius: 8px; color: white; cursor: pointer;">
                        ${Object.keys(TIPOS_ESCALAS).map(k => `<option value="${k}">${TIPOS_ESCALAS[k].nombre}</option>`).join('')}
                    </select>
                </div>
            </div>

            <!-- Muestra de Notas de la Escala -->
            <div style="background: #0f172a; padding: 20px; border-radius: 14px; border: 1px solid #334155; text-align: center;">
                <span style="font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase;">Notas de la Escala</span>
                <div id="contenedorNotasEscala" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; margin-top: 10px;"></div>
            </div>

            <!-- Reproductor YouTube Embed Dinámico -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 0.85rem; font-weight: 800; color: #ef4444; text-transform: uppercase;">🎸 Backing Track de Práctica</span>
                    <span id="labelTonalidadTrack" style="font-size: 0.8rem; color: #38bdf8; font-weight: 700;"></span>
                </div>
                <div id="contenedorIframeYT" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 10px; border: 1px solid #334155; background: #0f172a;">
                </div>
            </div>

            <!-- Grados y Acordes Diatónicos -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; display: block; margin-bottom: 6px;">🎼 Acordes para Acompañar</span>
                <div id="contenedorAcordesDiatonicos" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
            </div>

            <!-- Piano -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 12px;">🎹 Mapa en Piano</span>
                <div id="pianoEscalaContainer" style="display: flex; justify-content: center; overflow-x: auto; padding: 10px 0;"></div>
            </div>

            <!-- Guitarra -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; display: block; margin-bottom: 12px;">🎸 Diapasón de Guitarra</span>
                <div id="guitarraEscalaContainer" style="overflow-x: auto;"></div>
            </div>

        </div>
    `;

    const volver = document.getElementById("volverHerramientas");
    if (volver) {
        volver.addEventListener("click", () => {
            if (typeof volverHerramientas === "function") volverHerramientas();
        });
    }

    const selTonica = document.getElementById("selectTonicaEscala");
    const selTipo = document.getElementById("selectTipoEscala");

    selTonica.addEventListener("change", actualizarEscala);
    selTipo.addEventListener("change", actualizarEscala);

    actualizarEscala();

    function actualizarEscala() {
        const tonica = selTonica.value;
        const tipoKey = selTipo.value;
        const estructura = TIPOS_ESCALAS[tipoKey];

        const idxBase = NOTAS_ESCALAS.indexOf(tonica);
        const notasEscala = estructura.patron.map(st => NOTAS_ESCALAS[(idxBase + st) % 12]);

        // Cargar iframe con el ID verificado de la tónica seleccionada
        const contIframe = document.getElementById("contenedorIframeYT");
        const labelTrack = document.getElementById("labelTonalidadTrack");
        const videoId = BACKING_TRACKS_YT[tonica] || "BNVbWDIT4eo";
        
        labelTrack.innerText = `Pista sugerida para Tónica ${tonica}`;

        // Re-inyección limpia del iframe para forzar el cambio de video en tiempo real sin bloqueo 153
        contIframe.innerHTML = `
            <iframe 
                style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0;"
                src="https://www.youtube-nocookie.com/embed/${videoId}?enablejsapi=1&rel=0&modestbranding=1" 
                title="YouTube Backing Track ${tonica}" 
                referrerpolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
            </iframe>
        `;

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
            contAcordes.innerHTML = `<span style="color: #64748b; font-size: 0.85rem; font-style: italic;">Improvisá sobre la tónica ${tonica}.</span>`;
        }

        renderPianoEscala(notasEscala, tonica);
        renderGuitarraEscala(notasEscala, tonica);
    }
};

function renderPianoEscala(notasEscala, tonica) {
    const container = document.getElementById("pianoEscalaContainer");
    if (!container) return;

    const secuencia = [
        { n: "C", t: false }, { n: "C#", t: true }, { n: "D", t: false }, { n: "D#", t: true },
        { n: "E", t: false }, { n: "F", t: false }, { n: "F#", t: true }, { n: "G", t: false },
        { n: "G#", t: true }, { n: "A", t: false }, { n: "A#", t: true }, { n: "B", t: false }
    ];

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

    const afinacion = ["E", "B", "G", "D", "A", "E"];
    const totalTrastes = 12;

    let html = `<table style="width: 100%; border-collapse: collapse; background: #0f172a; border-radius: 8px; overflow: hidden; border: 1px solid #475569;">`;
    
    html += `<tr><th style="padding: 6px; font-size: 0.7rem; color: #64748b;">Cuerda</th>`;
    for (let t = 0; t <= totalTrastes; t++) {
        html += `<th style="padding: 6px; font-size: 0.75rem; color: #94a3b8; border-bottom: 2px solid #334155;">${t === 0 ? 'Aire' : t}</th>`;
    }
    html += `</tr>`;

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