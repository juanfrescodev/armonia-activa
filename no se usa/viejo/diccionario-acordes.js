// ============================================================
// ARMONÍA ACTIVA
// js/herramientas/diccionario-acordes.js
// ============================================================
//
// DICCIONARIO / BUSCADOR INVERSO DE ACORDES
// - Seleccioná un acorde por su nombre.
// - Muestra sus notas componentes, piano y diapasón de guitarra.
// ============================================================

window.HERRAMIENTAS = window.HERRAMIENTAS || {};

const CLASES_DICCIONARIO = {
    C: 0, "C#": 1, D: 2, "D#": 3, E: 4, F: 5,
    "F#": 6, G: 7, "G#": 8, A: 9, "A#": 10, B: 11
};

const BASE_ACORDES_DICCIONARIO = {
    "C": ["C", "E", "G"],
    "Cm": ["C", "D#", "G"],
    "C7": ["C", "E", "G", "A#"],
    "Cmaj7": ["C", "E", "G", "B"],
    
    "D": ["D", "F#", "A"],
    "Dm": ["D", "F", "A"],
    "D7": ["D", "F#", "A", "C"],
    "Dmaj7": ["D", "F#", "A", "C#"],

    "E": ["E", "G#", "B"],
    "Em": ["E", "G", "B"],
    "E7": ["E", "G#", "B", "D"],
    "Emaj7": ["E", "G#", "B", "D#"],

    "F": ["F", "A", "C"],
    "Fm": ["F", "G#", "C"],
    "F7": ["F", "A", "C", "D#"],
    "Fmaj7": ["F", "A", "C", "E"],

    "G": ["G", "B", "D"],
    "Gm": ["G", "A#", "D"],
    "G7": ["G", "B", "D", "F"],
    "Gmaj7": ["G", "B", "D", "F#"],

    "A": ["A", "C#", "E"],
    "Am": ["A", "C", "E"],
    "A7": ["A", "C#", "E", "G"],
    "Amaj7": ["A", "C#", "E", "G#"],

    "B": ["B", "D#", "F#"],
    "Bm": ["B", "D", "F#"],
    "B7": ["B", "D#", "F#", "A"]
};

const POSICIONES_GUITARRA_DIC = {
    "C": { trastes: [-1, 3, 2, 0, 1, 0], trasteBase: 1 },
    "Cm": { trastes: [-1, 3, 5, 5, 4, 3], trasteBase: 3 },
    "C7": { trastes: [-1, 3, 2, 3, 1, 0], trasteBase: 1 },
    "Cmaj7": { trastes: [-1, 3, 2, 0, 0, 0], trasteBase: 1 },
    
    "D": { trastes: [-1, -1, 0, 2, 3, 2], trasteBase: 1 },
    "Dm": { trastes: [-1, -1, 0, 2, 3, 1], trasteBase: 1 },
    "D7": { trastes: [-1, -1, 0, 2, 1, 2], trasteBase: 1 },
    "Dmaj7": { trastes: [-1, -1, 0, 2, 2, 2], trasteBase: 1 },

    "E": { trastes: [0, 2, 2, 1, 0, 0], trasteBase: 1 },
    "Em": { trastes: [0, 2, 2, 0, 0, 0], trasteBase: 1 },
    "E7": { trastes: [0, 2, 0, 1, 0, 0], trasteBase: 1 },
    "Emaj7": { trastes: [0, 2, 1, 1, 0, -1], trasteBase: 1 },

    "F": { trastes: [1, 3, 3, 2, 1, 1], trasteBase: 1 },
    "Fm": { trastes: [1, 3, 3, 1, 1, 1], trasteBase: 1 },
    "F7": { trastes: [1, 3, 1, 2, 1, 1], trasteBase: 1 },
    "Fmaj7": { trastes: [-1, -1, 3, 2, 1, 0], trasteBase: 1 },

    "G": { trastes: [3, 2, 0, 0, 0, 3], trasteBase: 1 },
    "Gm": { trastes: [3, 5, 5, 3, 3, 3], trasteBase: 3 },
    "G7": { trastes: [3, 2, 0, 0, 0, 1], trasteBase: 1 },
    "Gmaj7": { trastes: [3, 2, 0, 0, 0, 2], trasteBase: 1 },

    "A": { trastes: [-1, 0, 2, 2, 2, 0], trasteBase: 1 },
    "Am": { trastes: [-1, 0, 2, 2, 1, 0], trasteBase: 1 },
    "A7": { trastes: [-1, 0, 2, 0, 2, 0], trasteBase: 1 },
    "Amaj7": { trastes: [-1, 0, 2, 1, 2, 0], trasteBase: 1 },

    "B": { trastes: [-1, 2, 4, 4, 4, 2], trasteBase: 2 },
    "Bm": { trastes: [-1, 2, 4, 4, 3, 2], trasteBase: 2 },
    "B7": { trastes: [-1, 2, 1, 2, 0, 2], trasteBase: 1 }
};

window.HERRAMIENTAS.diccionario = function(panel) {
    if (!panel) return;

    panel.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 24px; max-width: 900px; margin: 0 auto; padding-bottom: 40px;">
            
            <div style="display: flex; flex-direction: column; gap: 12px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 24px; border-radius: 16px; border: 1px solid #334155; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <button type="button" id="volverHerramientas" style="
                        background: rgba(51, 65, 85, 0.6); border: 1px solid #475569; color: #f8fafc; 
                        padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;
                    ">← Volver a Herramientas</button>
                    <span style="font-size: 2rem;">📖</span>
                </div>
                <div>
                    <h2 style="font-size: 1.8rem; font-weight: 800; color: #f8fafc; margin: 0 0 6px 0;">Buscador de Acordes</h2>
                    <p style="color: #94a3b8; margin: 0; font-size: 1rem;">Seleccioná un acorde para ver al instante qué notas lo componen, su representación en el piano y su posición en la guitarra.</p>
                </div>
            </div>

            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                <label style="display: block; font-size: 0.85rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: 10px;">Elegí un acorde:</label>
                <select id="selectAcordeDiccionario" style="width: 100%; padding: 12px 16px; background: #0f172a; border: 1px solid #475569; border-radius: 8px; color: white; font-size: 1rem; cursor: pointer;">
                    ${Object.keys(BASE_ACORDES_DICCIONARIO).map(acorde => `
                        <option value="${acorde}">${acorde}</option>
                    `).join('')}
                </select>
            </div>

            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 20px; border-radius: 14px; border: 1px solid #38bdf844; text-align: center;">
                <span style="font-size: 0.75rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.1em;">Notas que lo componen</span>
                <div id="notasAcordeSeleccionado" style="display: flex; justify-content: center; gap: 10px; margin-top: 12px;"></div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px;">
                <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155; display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 15px; align-self: flex-start;">🎹 Teclado de Piano</span>
                    <div id="pianoDiccionarioContainer" style="display: flex; justify-content: center; height: 130px; width: 100%;"></div>
                </div>

                <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155; display: flex; flex-direction: column; align-items: center;">
                    <span style="font-size: 0.8rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 15px; align-self: flex-start;">🎸 Diapasón de Guitarra</span>
                    <div id="guitarraDiccionarioContainer" style="display: flex; justify-content: center; width: 100%;"></div>
                </div>
            </div>

        </div>
    `;

    const volver = document.getElementById("volverHerramientas");
    if (volver) {
        volver.addEventListener("click", () => {
            if (typeof volverHerramientas === "function") volverHerramientas();
        });
    }

    const select = document.getElementById("selectAcordeDiccionario");
    if (select) {
        select.addEventListener("change", (e) => {
            actualizarVistaDiccionario(e.target.value);
        });
        // Cargar el primer acorde por defecto
        actualizarVistaDiccionario(Object.keys(BASE_ACORDES_DICCIONARIO)[0]);
    }
};

function actualizarVistaDiccionario(nombreAcorde) {
    const notas = BASE_ACORDES_DICCIONARIO[nombreAcorde] || [];
    
    // Renderizar fichas de notas
    const contenedorNotas = document.getElementById("notasAcordeSeleccionado");
    if (contenedorNotas) {
        contenedorNotas.innerHTML = notas.map(nota => `
            <span style="background: #3b82f6; color: white; padding: 6px 14px; border-radius: 6px; font-weight: bold; font-size: 1.1rem;">${nota}</span>
        `).join('');
    }

    renderPianoDiccionario(notas);
    renderGuitarraDiccionario(nombreAcorde);
}

function renderPianoDiccionario(notasActivas) {
    const container = document.getElementById("pianoDiccionarioContainer");
    if (!container) return;

    const secuenciaTeclas = [
        { nota: "C", esNegra: false }, { nota: "C#", esNegra: true },
        { nota: "D", esNegra: false }, { nota: "D#", esNegra: true },
        { nota: "E", esNegra: false }, { nota: "F", esNegra: false },
        { nota: "F#", esNegra: true }, { nota: "G", esNegra: false },
        { nota: "G#", esNegra: true }, { nota: "A", esNegra: false },
        { nota: "A#", esNegra: true }, { nota: "B", esNegra: false }
    ];

    container.innerHTML = `
        <div style="display: flex; height: 115px; background: #0f172a; padding: 6px; border-radius: 8px; border: 1px solid #475569; position: relative; justify-content: center;">
            ${secuenciaTeclas.map(t => {
                const activa = notasActivas.includes(t.nota);
                if (!t.esNegra) {
                    return `<div style="width: 32px; height: 110px; background: ${activa ? '#38bdf8' : '#ffffff'}; border: 1px solid #94a3b8; border-radius: 0 0 6px 6px; z-index: 1;"></div>`;
                } else {
                    return `<div style="width: 20px; height: 68px; background: ${activa ? '#0284c7' : '#0f172a'}; margin-left: -10px; margin-right: -10px; z-index: 2; border-radius: 0 0 4px 4px; border: 1px solid #334155;"></div>`;
                }
            }).join('')}
        </div>
    `;
}

function renderGuitarraDiccionario(nombreAcorde) {
    const container = document.getElementById("guitarraDiccionarioContainer");
    if (!container) return;

    const posicion = POSICIONES_GUITARRA_DIC[nombreAcorde] || { trastes: [-1,-1,-1,-1,-1,-1], trasteBase: 1 };
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
                                    position: absolute; width: 18px; height: 18px; 
                                    background: #38bdf8; border: 2px solid #ffffff; border-radius: 50%; 
                                    top: ${ ((traste - posicion.trasteBase + 0.5) * 100) / numTrastesVisibles }%; 
                                    transform: translateY(-50%); z-index: 3; box-shadow: 0 2px 4px rgba(0,0,0,0.4);
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