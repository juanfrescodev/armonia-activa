// ============================================================
// ARMONÍA ACTIVA
// js/herramientas/acordes.js
// ============================================================
//
// CONSTRUCTOR Y RECONOCEDOR DE ACORDES
// - Interfaz moderna y estilizada.
// - Reproductor de audio y enlaces interactivos.
// - Piano y diapasón de guitarra detallados con generador automático.
// ============================================================

window.HERRAMIENTAS = window.HERRAMIENTAS || {};

const CLASES_ACORDES = {
    C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5,
    "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11
};

// Afinación estándar de la guitarra por cuerdas (6ta a 1ra: E, A, D, G, B, e)
const NOTAS_CUERDAS_GUITARRA = [4, 9, 2, 7, 11, 4]; // Clases de nota correspondientes

const PATRONES_ACORDES = [
    { intervalos: [0, 4, 7], nombre: "mayor", sufijo: "" },
    { intervalos: [0, 3, 7], nombre: "menor", sufijo: "m" },
    { intervalos: [0, 3, 6], nombre: "disminuido", sufijo: "dim" },
    { intervalos: [0, 4, 8], nombre: "aumentado", sufijo: "aug" },
    { intervalos: [0, 4, 7, 10], nombre: "séptima dominante", sufijo: "7" },
    { intervalos: [0, 4, 7, 11], nombre: "séptima mayor", sufijo: "maj7" },
    { intervalos: [0, 3, 7, 10], nombre: "séptima menor", sufijo: "m7" },
    { intervalos: [0, 3, 6, 10], nombre: "semidisminuido", sufijo: "m7b5" }
];

// Posiciones frecuentes predefinidas
const POSICIONES_GUITARRA = {
    "C": { trastes: [-1, 3, 2, 0, 1, 0], trasteBase: 1 },
    "Cm": { trastes: [-1, 3, 5, 5, 4, 3], trasteBase: 3 },
    "C7": { trastes: [-1, 3, 2, 3, 1, 0], trasteBase: 1 },
    "Cmaj7": { trastes: [-1, 3, 2, 0, 0, 0], trasteBase: 1 },
    "Cm7": { trastes: [-1, 3, 5, 3, 4, 3], trasteBase: 3 },
    
    "D": { trastes: [-1, -1, 0, 2, 3, 2], trasteBase: 1 },
    "Dm": { trastes: [-1, -1, 0, 2, 3, 1], trasteBase: 1 },
    "D7": { trastes: [-1, -1, 0, 2, 1, 2], trasteBase: 1 },
    "Dmaj7": { trastes: [-1, -1, 0, 2, 2, 2], trasteBase: 1 },
    "Dm7": { trastes: [-1, -1, 0, 2, 1, 1], trasteBase: 1 },

    "E": { trastes: [0, 2, 2, 1, 0, 0], trasteBase: 1 },
    "Em": { trastes: [0, 2, 2, 0, 0, 0], trasteBase: 1 },
    "E7": { trastes: [0, 2, 0, 1, 0, 0], trasteBase: 1 },
    "Emaj7": { trastes: [0, 2, 1, 1, 0, -1], trasteBase: 1 },
    "Em7": { trastes: [0, 2, 2, 0, 3, 0], trasteBase: 1 },

    "F": { trastes: [1, 3, 3, 2, 1, 1], trasteBase: 1 },
    "Fm": { trastes: [1, 3, 3, 1, 1, 1], trasteBase: 1 },
    "F7": { trastes: [1, 3, 1, 2, 1, 1], trasteBase: 1 },
    "Fmaj7": { trastes: [-1, -1, 3, 2, 1, 0], trasteBase: 1 },
    "Fm7": { trastes: [1, 3, 1, 1, 1, 1], trasteBase: 1 },

    "G": { trastes: [3, 2, 0, 0, 0, 3], trasteBase: 1 },
    "Gm": { trastes: [3, 5, 5, 3, 3, 3], trasteBase: 3 },
    "G7": { trastes: [3, 2, 0, 0, 0, 1], trasteBase: 1 },
    "Gmaj7": { trastes: [3, 2, 0, 0, 0, 2], trasteBase: 1 },
    "Gm7": { trastes: [3, 5, 3, 3, 3, 3], trasteBase: 3 },

    "A": { trastes: [-1, 0, 2, 2, 2, 0], trasteBase: 1 },
    "Am": { trastes: [-1, 0, 2, 2, 1, 0], trasteBase: 1 },
    "A7": { trastes: [-1, 0, 2, 0, 2, 0], trasteBase: 1 },
    "Amaj7": { trastes: [-1, 0, 2, 1, 2, 0], trasteBase: 1 },
    "Am7": { trastes: [-1, 0, 2, 0, 1, 0], trasteBase: 1 },

    "B": { trastes: [-1, 2, 4, 4, 4, 2], trasteBase: 2 },
    "Bm": { trastes: [-1, 2, 4, 4, 3, 2], trasteBase: 2 },
    "B7": { trastes: [-1, 2, 1, 2, 0, 2], trasteBase: 1 },
    "Bmaj7": { trastes: [-1, 2, 4, 3, 4, 2], trasteBase: 2 },
    "Bm7": { trastes: [-1, 2, 4, 2, 3, 2], trasteBase: 2 }
};

let notasSeleccionadasAcorde = [];

// Convierte una lista de notas sin octava (ej. ["C","E","G"]) en notas
// con octava, apilando hacia arriba cada vez que la clase de nota no
// sube respecto de la anterior. Así el acorde suena "abierto" y
// prolijo en vez de amontonado todo en la misma octava.
function asignarOctavasAcorde(notasLimpias) {
    let octava = 4;
    let anterior = -1;
    return notasLimpias
        .map(n => {
            const clase = CLASES_ACORDES[n];
            if (clase === undefined) return null;
            if (clase <= anterior) octava++;
            anterior = clase;
            return `${n}${octava}`;
        })
        .filter(Boolean);
}

window.HERRAMIENTAS.acordes = function(panel) {
    if (!panel) return;
    notasSeleccionadasAcorde = [];

    panel.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 24px; max-width: 900px; margin: 0 auto; padding-bottom: 40px;">
            
            <div style="display: flex; flex-direction: column; gap: 12px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 24px; border-radius: 16px; border: 1px solid #334155; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <button type="button" id="volverHerramientas" style="
                        background: rgba(51, 65, 85, 0.6); border: 1px solid #475569; color: #f8fafc; 
                        padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;
                        display: flex; align-items: center; gap: 6px; transition: all 0.2s ease;
                    ">← Volver a Herramientas</button>
                    <span style="font-size: 2rem;">🎸</span>
                </div>
                <div>
                    <h2 style="font-size: 1.8rem; font-weight: 800; color: #f8fafc; margin: 0 0 6px 0; letter-spacing: -0.025em;">Constructor y Analizador de Acordes</h2>
                    <p style="color: #94a3b8; margin: 0; font-size: 1rem;">Construí acordes, escuchalos al instante, analizá sus inversiones y visualizalos en piano y guitarra con total claridad.</p>
                </div>
            </div>

            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155; display: flex; flex-direction: column; gap: 16px;">
                <div>
                    <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 10px;">Seleccioná las notas:</label>
                    <div id="botonesNotasAcorde" style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${Object.keys(CLASES_ACORDES).map(nota => `
                            <button type="button" class="btn-nota-acorde" data-nota="${nota}" style="
                                background: #0f172a; border: 1px solid #475569; color: #f8fafc; 
                                padding: 10px 16px; border-radius: 8px; cursor: pointer; font-weight: 700; font-size: 0.95rem;
                                transition: all 0.2s ease;
                            ">${nota}</button>
                        `).join('')}
                    </div>
                </div>

                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; padding-top: 10px; border-top: 1px solid #334155;">
                    <input type="text" id="entradaAcorde" placeholder="Ej. C E G o C E G B" class="input-estandar" style="flex: 1; min-width: 200px; padding: 12px 16px; background: #0f172a; border: 1px solid #475569; border-radius: 8px; color: white; font-size: 1rem;" />
                    <button type="button" id="btnEscucharAcorde" style="background: #0284c7; border: none; color: white; padding: 12px 20px; border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 0.95rem;">🔊 Escuchar</button>
                    <button type="button" id="btnLimpiarAcorde" style="background: #334155; border: none; color: #cbd5e1; padding: 12px 18px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.95rem;">Limpiar</button>
                </div>
            </div>

            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 20px; border-radius: 14px; border: 1px solid #38bdf844; text-align: center;">
                <span style="font-size: 0.75rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.1em;">Acorde Detectado</span>
                <div id="resultadoAcordeNombre" style="font-size: 2.2rem; font-weight: 800; color: #38bdf8; margin-top: 6px;">—</div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
                <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155; display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; align-self: flex-start; margin-bottom: 15px;">🎹 Teclado de Piano</span>
                    <div id="miniPianoContainer" style="display: flex; justify-content: center; height: 130px; width: 100%; position: relative;"></div>
                </div>

                <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155; display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; align-self: flex-start; margin-bottom: 15px;">🎸 Diapasón de Guitarra</span>
                    <div id="miniGuitarraContainer" style="display: flex; justify-content: center; width: 100%;"></div>
                </div>
            </div>

            <div id="panelSustitutosAcordes" style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155; display: none;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em;">💡 Sugerencias y Alternativas Armónicas</span>
                <div id="listaSustitutosAcordes" style="margin-top: 12px; font-size: 1rem; color: #e2e8f0; line-height: 1.8;">—</div>
            </div>

        </div>
    `;

    // El sonido lo maneja el sintetizador compartido de audio.js
    // (mismo Tone.PolySynth que usa el resto del Lab), así que no
    // hay un AudioContext propio que cerrar acá. Igual soltamos
    // cualquier nota que haya quedado sonando al salir.
    panel._limpiarHerramienta = () => {
        if (typeof window.detenerAudio === "function") {
            window.detenerAudio();
        }
    };

    const volver = document.getElementById("volverHerramientas");
    if (volver) {
        volver.addEventListener("click", () => {
            if (typeof volverHerramientas === "function") volverHerramientas();
        });
    }

    const botonesNotas = panel.querySelectorAll(".btn-nota-acorde");
    botonesNotas.forEach(btn => {
        btn.addEventListener("click", () => {
            const nota = btn.dataset.nota;
            const index = notasSeleccionadasAcorde.indexOf(nota);
            
            if (index > -1) {
                notasSeleccionadasAcorde.splice(index, 1);
                marcarBotonVisual(btn, false);
            } else {
                notasSeleccionadasAcorde.push(nota);
                marcarBotonVisual(btn, true);
            }

            actualizarTextoInputYProcesar(botonesNotas);
        });
    });

    const input = document.getElementById("entradaAcorde");
    if (input) {
        input.addEventListener("input", (e) => {
            notasSeleccionadasAcorde = e.target.value.toUpperCase().trim().split(/[\s,\-]+/).filter(Boolean);
            
            botonesNotas.forEach(btn => {
                const nota = btn.dataset.nota;
                marcarBotonVisual(btn, notasSeleccionadasAcorde.includes(nota));
            });

            procesarAcordeActual();
        });
    }

    const btnEscuchar = document.getElementById("btnEscucharAcorde");
    if (btnEscuchar) {
        btnEscuchar.addEventListener("click", () => reproducirAcordeActual(btnEscuchar));
    }

    const btnLimpiar = document.getElementById("btnLimpiarAcorde");
    if (btnLimpiar) {
        btnLimpiar.addEventListener("click", () => {
            notasSeleccionadasAcorde = [];
            if (input) input.value = "";
            botonesNotas.forEach(btn => marcarBotonVisual(btn, false));
            procesarAcordeActual();
        });
    }

    renderMiniPiano([]);
    renderMiniGuitarra(null, []);
};

function actualizarTextoInputYProcesar(botonesNotas) {
    const inputTexto = document.getElementById("entradaAcorde");
    if (inputTexto) inputTexto.value = notasSeleccionadasAcorde.join(" ");
    
    if (botonesNotas) {
        botonesNotas.forEach(btn => {
            const nota = btn.dataset.nota;
            marcarBotonVisual(btn, notasSeleccionadasAcorde.includes(nota));
        });
    }

    procesarAcordeActual();
}

window.cargarAcordeSugerido = function(nombreAcordeLimpio) {
    const match = nombreAcordeLimpio.match(/^([A-G]#?)(.*)$/);
    if (!match) return;

    const fundamental = match[1];
    let sufijo = match[2].trim();
    if (sufijo.includes("m") && !sufijo.includes("maj") && !sufijo.includes("dim")) {
        if (sufijo === "m") sufijo = "menor";
    }

    let patronEncontrado = PATRONES_ACORDES.find(p => p.sufijo === sufijo);
    if (!patronEncontrado && sufijo === "") patronEncontrado = PATRONES_ACORDES[0];
    if (!patronEncontrado && sufijo === "m") patronEncontrado = PATRONES_ACORDES[1];

    if (patronEncontrado) {
        const idxBase = CLASES_ACORDES[fundamental];
        const notasFormadas = patronEncontrado.intervalos.map(intervalo => {
            const realIdx = (idxBase + intervalo) % 12;
            return Object.keys(CLASES_ACORDES).find(k => CLASES_ACORDES[k] === realIdx);
        });

        notasSeleccionadasAcorde = notasFormadas;
        const botonesNotas = document.querySelectorAll(".btn-nota-acorde");
        actualizarTextoInputYProcesar(botonesNotas);
    }
};

function marcarBotonVisual(btn, activo) {
    if (activo) {
        btn.style.background = "#3b82f6";
        btn.style.borderColor = "#60a5fa";
        btn.style.color = "#ffffff";
        btn.style.boxShadow = "0 0 10px rgba(59, 130, 246, 0.4)";
    } else {
        btn.style.background = "#0f172a";
        btn.style.borderColor = "#475569";
        btn.style.color = "#f8fafc";
        btn.style.boxShadow = "none";
    }
}

function procesarAcordeActual() {
    const nombreResultado = document.getElementById("resultadoAcordeNombre");
    const panelSustitutos = document.getElementById("panelSustitutosAcordes");
    const listaSustitutos = document.getElementById("listaSustitutosAcordes");

    if (!nombreResultado) return;

    if (notasSeleccionadasAcorde.length === 0) {
        nombreResultado.innerText = "—";
        renderMiniPiano([]);
        renderMiniGuitarra(null, []);
        if (panelSustitutos) panelSustitutos.style.display = "none";
        return;
    }

    if (notasSeleccionadasAcorde.length < 3) {
        nombreResultado.innerText = "Ingresá al menos 3 notas";
        renderMiniPiano(notasSeleccionadasAcorde);
        renderMiniGuitarra(null, []);
        if (panelSustitutos) panelSustitutos.style.display = "none";
        return;
    }

    const resultado = reconocerAcorde(notasSeleccionadasAcorde);

    if (resultado) {
        nombreResultado.innerText = resultado.nombreCompleto;
        renderMiniPiano(notasSeleccionadasAcorde);
        renderMiniGuitarra(resultado.fundamental + resultado.sufijo, notasSeleccionadasAcorde);
        
        const sustitutos = obtenerSustitutosAcorde(resultado);
        if (sustitutos.length > 0 && panelSustitutos && listaSustitutos) {
            panelSustitutos.style.display = "block";
            listaSustitutos.innerHTML = sustitutos.join("<br>");
        } else if (panelSustitutos) {
            panelSustitutos.style.display = "none";
        }
    } else {
        nombreResultado.innerText = "No reconocido";
        renderMiniPiano(notasSeleccionadasAcorde);
        renderMiniGuitarra(null, notasSeleccionadasAcorde);
        if (panelSustitutos) panelSustitutos.style.display = "none";
    }
}

async function reproducirAcordeActual(boton = null) {
    const notasLimpias = notasSeleccionadasAcorde.map(n => n.replace(/[0-9]/g, ""));
    if (notasLimpias.length === 0) return;

    const notasConOctava = asignarOctavasAcorde(notasLimpias);
    if (notasConOctava.length === 0) return;

    // Usamos el mismo sintetizador (Tone.js) que el resto del Lab,
    // así el acorde suena con el mismo timbre cálido que el piano
    // en vez de un pitido de oscilador crudo.
    if (typeof window.reproducirNotas === "function") {
        await window.reproducirNotas(notasConOctava, "1n", boton);
    }
}

function reconocerAcorde(notas) {
    const notasLimpias = notas.map(n => n.replace(/[0-9]/g, ""));
    const clasesUnicas = [...new Set(notasLimpias.map(n => CLASES_ACORDES[n]))];
    
    if (clasesUnicas.length < 3 || clasesUnicas.includes(undefined)) return null;

    const notaBajo = CLASES_ACORDES[notasLimpias[0]];

    for (const patron of PATRONES_ACORDES) {
        for (let i = 0; i < patron.intervalos.length; i++) {
            const fundamentalIndex = patron.intervalos[i];
            const fundamentalReal = (notaBajo - fundamentalIndex + 12) % 12;

            const intervalosCalculados = clasesUnicas
                .map(clase => (clase - fundamentalReal + 12) % 12)
                .sort((a, b) => a - b);

            const patronOrdenado = [...patron.intervalos].sort((a, b) => a - b);

            if (
                intervalosCalculados.length === patronOrdenado.length &&
                intervalosCalculados.every((val, idx) => val === patronOrdenado[idx])
            ) {
                const nombreFundamental = Object.keys(CLASES_ACORDES).find(k => CLASES_ACORDES[k] === fundamentalReal);
                let inversionTexto = "";
                
                if (i > 0) {
                    const nombreBajo = Object.keys(CLASES_ACORDES).find(k => CLASES_ACORDES[k] === notaBajo);
                    inversionTexto = ` (Inversión ${i} - Bajo en ${nombreBajo})`;
                }

                return {
                    fundamental: nombreFundamental,
                    tipo: patron.nombre,
                    sufijo: patron.sufijo,
                    nombreCompleto: `${nombreFundamental}${patron.sufijo}${inversionTexto}`,
                    bajo: notaBajo
                };
            }
        }
    }
    return null;
}

function renderMiniPiano(notasActivas) {
    const container = document.getElementById("miniPianoContainer");
    if (!container) return;

    const notasLimpias = notasActivas.map(n => n.replace(/[0-9]/g, ""));
    const secuenciaTeclas = [
        { nota: "C", esNegra: false },
        { nota: "C#", esNegra: true },
        { nota: "D", esNegra: false },
        { nota: "D#", esNegra: true },
        { nota: "E", esNegra: false },
        { nota: "F", esNegra: false },
        { nota: "F#", esNegra: true },
        { nota: "G", esNegra: false },
        { nota: "G#", esNegra: true },
        { nota: "A", esNegra: false },
        { nota: "A#", esNegra: true },
        { nota: "B", esNegra: false }
    ];

    container.innerHTML = `
        <div style="display: flex; height: 115px; background: #0f172a; padding: 6px; border-radius: 8px; border: 1px solid #475569; position: relative; box-sizing: content-box; justify-content: center;">
            ${secuenciaTeclas.map(t => {
                const activa = notasLimpias.includes(t.nota);
                if (!t.esNegra) {
                    return `<div style="width: 32px; height: 110px; background: ${activa ? '#38bdf8' : '#ffffff'}; border: 1px solid #94a3b8; border-radius: 0 0 6px 6px; z-index: 1;"></div>`;
                } else {
                    return `<div style="width: 20px; height: 68px; background: ${activa ? '#0284c7' : '#0f172a'}; margin-left: -10px; margin-right: -10px; z-index: 2; border-radius: 0 0 4px 4px; border: 1px solid #334155;"></div>`;
                }
            }).join('')}
        </div>
    `;
}

// Generador inteligente de posición de guitarra si no está en el diccionario predefinido
function calcularPosicionDinamicaGuitarra(notasActivas) {
    const notasClases = notasActivas.map(n => CLASES_ACORDES[n.replace(/[0-9]/g, "")]);
    if (notasClases.length === 0) return { trastes: [-1,-1,-1,-1,-1,-1], trasteBase: 1 };

    const trastes = [];
    for (let c = 0; c < 6; c++) {
        const notaCuerdaAlAire = NOTAS_CUERDAS_GUITARRA[c];
        let mejorTraste = -1;
        let menorDistancia = 99;

        // Buscar en los primeros 4 trastes una nota que pertenezca al acorde
        for (let t = 0; t <= 4; t++) {
            const notaActual = (notaCuerdaAlAire + t) % 12;
            if (notasClases.includes(notaActual)) {
                if (t < menorDistancia) {
                    menorDistancia = t;
                    mejorTraste = t;
                }
            }
        }
        trastes.push(mejorTraste);
    }
    return { trastes, trasteBase: 1 };
}

function renderMiniGuitarra(nombreAcorde, notasActivas) {
    const container = document.getElementById("miniGuitarraContainer");
    if (!container) return;

    let posicion = POSICIONES_GUITARRA[nombreAcorde];
    if (!posicion) {
        posicion = calcularPosicionDinamicaGuitarra(notasActivas);
    }
    const numTrastesVisibles = 4;
    
    container.innerHTML = `
        <div style="background: #0f172a; padding: 14px 18px; border-radius: 10px; border: 1px solid #475569; display: inline-block; width: 100%; max-width: 280px; box-sizing: border-box;">
            <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 8px; font-weight: 600; text-align: center;">Traste base: ${posicion.trasteBase}</div>
            
            <div style="display: flex; justify-content: space-around; margin-bottom: 4px; padding: 0 8px;">
                ${posicion.trastes.map(traste => {
                    let simbolo = "";
                    let color = "#38bdf8";
                    if (traste === -1) { simbolo = "×"; color = "#64748b"; }
                    else if (traste === 0) { simbolo = "○"; color = "#38bdf8"; }
                    return `<span style="font-size: 0.95rem; font-weight: bold; color: ${color}; width: 20px; text-align: center;">${simbolo}</span>`;
                }).join('')}
            </div>

            <div style="position: relative; background: #262626; border: 2px solid #525252; border-radius: 4px; height: 120px; margin: 0 auto; display: flex; justify-content: space-around; padding: 0 8px;">
                
                ${Array.from({ length: numTrastesVisibles - 1 }).map((_, idx) => `
                    <div style="position: absolute; left: 0; right: 0; top: ${((idx + 1) * 100) / numTrastesVisibles}%; height: 2px; background: #737373; z-index: 1;"></div>
                `).join('')}

                ${posicion.trastes.map((traste) => {
                    return `
                        <div style="position: relative; width: 2px; height: 100%; background: #d4d4d4; z-index: 2; display: flex; justify-content: center;">
                            ${traste > 0 && traste >= posicion.trasteBase && traste < posicion.trasteBase + numTrastesVisibles ? `
                                <div style="
                                    position: absolute; 
                                    width: 18px; height: 18px; 
                                    background: #38bdf8; 
                                    border: 2px solid #ffffff;
                                    border-radius: 50%; 
                                    top: ${ ((traste - posicion.trasteBase + 0.5) * 100) / numTrastesVisibles }%; 
                                    transform: translateY(-50%);
                                    z-index: 3;
                                    box-shadow: 0 2px 4px rgba(0,0,0,0.4);
                                "></div>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>

            <div style="font-size: 0.75rem; color: #94a3b8; display: flex; justify-content: space-around; margin-top: 8px; font-weight: 700; padding: 0 8px;">
                <span>E</span><span>A</span><span>D</span><span>G</span><span>B</span><span>e</span>
            </div>
        </div>
    `;
}

function obtenerSustitutosAcorde(acorde) {
    const sugerencias = [];
    if (!acorde) return sugerencias;

    const linkAcorde = (nombre) => `<a href="javascript:void(0);" onclick="window.cargarAcordeSugerido('${nombre}')" style="color: #38bdf8; text-decoration: underline; font-weight: bold; cursor: pointer;">${nombre}</a>`;

    if (acorde.tipo === "mayor" && acorde.sufijo === "") {
        const relMenor = obtenerNotaRelativaAcorde(acorde.fundamental, 9) + "m";
        const susModal = acorde.fundamental + "maj7";
        sugerencias.push(`• Relativo menor: ${linkAcorde(relMenor)}`);
        sugerencias.push(`• Sustituto modal: ${linkAcorde(susModal)}`);
    } else if (acorde.tipo === "menor") {
        const relMayor = obtenerNotaRelativaAcorde(acorde.fundamental, 3);
        const ext = acorde.fundamental + "m7";
        sugerencias.push(`• Relativo mayor: ${linkAcorde(relMayor)}`);
        sugerencias.push(`• Versión extendida: ${linkAcorde(ext)}`);
    } else if (acorde.tipo === "disminuido") {
        const dom = obtenerNotaRelativaAcorde(acorde.fundamental, 1) + "7";
        sugerencias.push(`• Dominante sin fundamental: ${linkAcorde(dom)}`);
    } else if (acorde.tipo === "aumentado") {
        const paso = obtenerNotaRelativaAcorde(acorde.fundamental, 5);
        sugerencias.push(`• Paso cromático hacia: ${linkAcorde(paso)}`);
    }

    return sugerencias;
}

function obtenerNotaRelativaAcorde(notaBase, semitonos) {
    const idx = CLASES_ACORDES[notaBase];
    const nuevoIdx = (idx + semitonos) % 12;
    return Object.keys(CLASES_ACORDES).find(k => CLASES_ACORDES[k] === nuevoIdx);
}