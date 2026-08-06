// ============================================================
// ARMONÍA ACTIVA
// js/herramientas/diccionario-acordes.js
// ============================================================
// DICCIONARIO GENERATIVO Y DINÁMICO DE ACORDES
// - Genera matemáticamente cualquier combinación armónica.
// - Soporta Tónica, Calidad, Extensiones/Alteraciones e Inversiones.
// - Calcula y sugiere acordes sustitutos y equivalentes.
// ============================================================

window.HERRAMIENTAS = window.HERRAMIENTAS || {};

const NOTAS_DICCIONARIO = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Fórmulas expresadas en semitonos desde la tónica (0)
const TIPOS_ACORDES_DIC = {
    "mayor": { nombre: "Mayor", intervalos: [0, 4, 7] },
    "menor": { nombre: "Menor", intervalos: [0, 3, 7] },
    "sus2": { nombre: "Suspendido 2 (sus2)", intervalos: [0, 2, 7] },
    "sus4": { nombre: "Suspendido 4 (sus4)", intervalos: [0, 5, 7] },
    "dim": { nombre: "Disminuido (dim)", intervalos: [0, 3, 6] },
    "aug": { nombre: "Aumentado (aug)", intervalos: [0, 4, 8] }
};

// Alteraciones y extensiones
const EXTENSIONES_ACORDES_DIC = {
    "ninguna": { nombre: "Triada base (sin extensión)", intervalos: [] },
    "7": { nombre: "Séptima Menor (7)", intervalos: [10] },
    "maj7": { nombre: "Séptima Mayor (maj7)", intervalos: [11] },
    "6": { nombre: "Sexta Mayor (6)", intervalos: [9] },
    "m6": { nombre: "Sexta Menor (m6)", intervalos: [8] },
    "dim7": { nombre: "Séptima Disminuida (dim7)", intervalos: [9] },
    "m7b5": { nombre: "Semidisminuido (m7b5)", intervalos: [10] },
    "9": { nombre: "Novena (9)", intervalos: [10, 14] },
    "maj9": { nombre: "Novena Mayor (maj9)", intervalos: [11, 14] },
    "add9": { nombre: "Añadida Novena (add9)", intervalos: [14] },
    "b9": { nombre: "Novena Menor (b9)", intervalos: [10, 13] },
    "sharp9": { nombre: "Novena Aumentada (#9)", intervalos: [10, 15] },
    "11": { nombre: "Onceava (11)", intervalos: [10, 14, 17] },
    "sharp11": { nombre: "Onceava Aumentada (#11)", intervalos: [11, 18] },
    "13": { nombre: "Treceava (13)", intervalos: [10, 14, 21] },
    "b13": { nombre: "Treceava Menor (b13)", intervalos: [10, 20] }
};

window.HERRAMIENTAS.diccionario = function(panel) {
    if (!panel) return;

    panel.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 24px; max-width: 900px; margin: 0 auto; padding-bottom: 40px;">
            
            <!-- Encabezado -->
            <div style="display: flex; flex-direction: column; gap: 12px; background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); padding: 24px; border-radius: 16px; border: 1px solid #334155; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.3);">
                <div style="display: flex; align-items: center; justify-content: space-between;">
                    <button type="button" id="volverHerramientas" style="
                        background: rgba(51, 65, 85, 0.6); border: 1px solid #475569; color: #f8fafc; 
                        padding: 8px 16px; border-radius: 8px; cursor: pointer; font-weight: 600; font-size: 0.9rem;
                    ">← Volver a Herramientas</button>
                    <span style="font-size: 2rem;">📖</span>
                </div>
                <div>
                    <h2 style="font-size: 1.8rem; font-weight: 800; color: #f8fafc; margin: 0 0 6px 0;">Diccionario Completo de Acordes</h2>
                    <p style="color: #94a3b8; margin: 0; font-size: 1rem;">Construí libremente cualquier acorde. Explorá sus notas, posiciones en piano/guitarra y acordes equivalentes para reemplazarlos en tus canciones.</p>
                </div>
            </div>

            <!-- Panel de Controles Desplegables -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155; display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 15px;">
                
                <!-- 1. Tónica -->
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">1. Tónica (Base)</label>
                    <select id="selectTonicaDic" style="width: 100%; padding: 10px 12px; background: #0f172a; border: 1px solid #475569; border-radius: 8px; color: white; font-size: 0.95rem; cursor: pointer;">
                        ${NOTAS_DICCIONARIO.map(n => `<option value="${n}">${n}</option>`).join('')}
                    </select>
                </div>

                <!-- 2. Tipo / Calidad -->
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">2. Tipo / Calidad</label>
                    <select id="selectTipoDic" style="width: 100%; padding: 10px 12px; background: #0f172a; border: 1px solid #475569; border-radius: 8px; color: white; font-size: 0.95rem; cursor: pointer;">
                        ${Object.keys(TIPOS_ACORDES_DIC).map(k => `<option value="${k}">${TIPOS_ACORDES_DIC[k].nombre}</option>`).join('')}
                    </select>
                </div>

                <!-- 3. Extensión / Alteración -->
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">3. Extensión / Séptima</label>
                    <select id="selectExtDic" style="width: 100%; padding: 10px 12px; background: #0f172a; border: 1px solid #475569; border-radius: 8px; color: white; font-size: 0.95rem; cursor: pointer;">
                        ${Object.keys(EXTENSIONES_ACORDES_DIC).map(k => `<option value="${k}">${EXTENSIONES_ACORDES_DIC[k].nombre}</option>`).join('')}
                    </select>
                </div>

                <!-- 4. Inversión -->
                <div>
                    <label style="display: block; font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; margin-bottom: 6px;">4. Inversión</label>
                    <select id="selectInversionDic" style="width: 100%; padding: 10px 12px; background: #0f172a; border: 1px solid #475569; border-radius: 8px; color: white; font-size: 0.95rem; cursor: pointer;">
                        <option value="0">Estado Fundamental</option>
                        <option value="1">1ª Inversión (Bajo en 3ª)</option>
                        <option value="2">2ª Inversión (Bajo en 5ª)</option>
                        <option value="3">3ª Inversión (Bajo en 7ª/Ext)</option>
                    </select>
                </div>

            </div>

            <!-- Visor de Nombre de Acorde y Notas Resultantes -->
            <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 20px; border-radius: 14px; border: 1px solid #38bdf844; text-align: center;">
                <h3 id="nombreAcordeCalculado" style="margin: 0 0 8px 0; font-size: 1.6rem; color: #38bdf8; font-weight: 800;">---</h3>
                <span style="font-size: 0.75rem; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em;">Notas componentes (en orden)</span>
                <div id="notasAcordeSeleccionado" style="display: flex; justify-content: center; flex-wrap: wrap; gap: 10px; margin-top: 12px;"></div>
            </div>

            <!-- Paneles de Instrumentos -->
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

            <!-- Sección de Acordes Sustitutos / Equivalentes -->
            <div style="background: #1e293b; padding: 20px; border-radius: 14px; border: 1px solid #334155;">
                <span style="font-size: 0.8rem; font-weight: 800; color: #38bdf8; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 6px;">🔄 Acordes Reemplazantes / Sustitutos</span>
                <p style="font-size: 0.85rem; color: #94a3b8; margin: 0 0 12px 0;">Acordes que comparten notas clave o función armónica. Podés tocar cualquiera de estos para reemplazar el acorde actual:</p>
                <div id="contenedorSustitutosDic" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
            </div>

        </div>
    `;

    const volver = document.getElementById("volverHerramientas");
    if (volver) {
        volver.addEventListener("click", () => {
            if (typeof volverHerramientas === "function") volverHerramientas();
        });
    }

    const idsSelects = ["selectTonicaDic", "selectTipoDic", "selectExtDic", "selectInversionDic"];
    idsSelects.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("change", procesarYActualizarDiccionario);
    });

    procesarYActualizarDiccionario();

    panel._limpiarHerramienta = function() {
        idsSelects.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.removeEventListener("change", procesarYActualizarDiccionario);
        });
    };
};

// ============================================================
// LÓGICA ARMÓNICA Y GENERACIÓN MATEMÁTICA
// ============================================================
function procesarYActualizarDiccionario() {
    const tonica = document.getElementById("selectTonicaDic").value;
    const tipo = document.getElementById("selectTipoDic").value;
    const extension = document.getElementById("selectExtDic").value;
    const inversionIndex = parseInt(document.getElementById("selectInversionDic").value, 10);

    const result = calcularEstructuraAcorde(tonica, tipo, extension, inversionIndex);

    const elemNombre = document.getElementById("nombreAcordeCalculado");
    if (elemNombre) elemNombre.textContent = result.nombreCifrado;

    const contenedorNotas = document.getElementById("notasAcordeSeleccionado");
    if (contenedorNotas) {
        contenedorNotas.innerHTML = result.notas.map((nota, idx) => `
            <span style="background: ${idx === 0 ? '#38bdf8' : '#3b82f6'}; color: white; padding: 6px 14px; border-radius: 6px; font-weight: bold; font-size: 1.1rem; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                ${nota} ${idx === 0 && result.notas.length > 1 && inversionIndex > 0 ? '<small style="font-size: 0.65rem; opacity: 0.8; display: block;">(Bajo)</small>' : ''}
            </span>
        `).join('');
    }

    renderPianoDiccionario(result.notas);
    renderGuitarraDiccionario(tonica, tipo, result.notas);
    renderSustitutos(tonica, tipo, extension, result.notas);
}

function calcularEstructuraAcorde(tonica, tipoKey, extKey, numInversion) {
    const indiceBase = NOTAS_DICCIONARIO.indexOf(tonica);
    if (indiceBase === -1) return { notas: [], nombreCifrado: tonica };

    let semitonos = [...TIPOS_ACORDES_DIC[tipoKey].intervalos];

    if (extKey !== "ninguna" && EXTENSIONES_ACORDES_DIC[extKey]) {
        const extIntervalos = EXTENSIONES_ACORDES_DIC[extKey].intervalos;
        extIntervalos.forEach(st => {
            if (!semitonos.includes(st % 12)) semitonos.push(st);
        });
    }

    let semitonosUnicos = Array.from(new Set(semitonos.map(s => s % 12)));

    let notasCalculadas = semitonosUnicos.map(st => {
        return NOTAS_DICCIONARIO[(indiceBase + st) % 12];
    });

    if (numInversion > 0 && numInversion < notasCalculadas.length) {
        for (let i = 0; i < numInversion; i++) {
            const primera = notasCalculadas.shift();
            notasCalculadas.push(primera);
        }
    }

    let sufijo = "";
    if (tipoKey === "menor") sufijo = "m";
    else if (tipoKey === "sus2") sufijo = "sus2";
    else if (tipoKey === "sus4") sufijo = "sus4";
    else if (tipoKey === "dim") sufijo = "dim";
    else if (tipoKey === "aug") sufijo = "aug";

    if (extKey !== "ninguna") {
        if (sufijo === "m" && extKey === "maj7") sufijo = "m(maj7)";
        else if (sufijo === "m" && extKey === "7") sufijo = "m7";
        else sufijo += extKey;
    }

    let bajocifrado = numInversion > 0 ? ` / ${notasCalculadas[0]}` : "";

    return {
        notas: notasCalculadas,
        nombreCifrado: `${tonica}${sufijo}${bajocifrado}`
    };
}

// Genera acordes equivalentes según reglas de teoría armónica
function renderSustitutos(tonica, tipo, extension, notas) {
    const contenedor = document.getElementById("contenedorSustitutosDic");
    if (!contenedor) return;

    const idxTonica = NOTAS_DICCIONARIO.indexOf(tonica);
    let sustitutos = [];

    // 1. Relativo Menor / Mayor
    if (tipo === "mayor" && extension === "ninguna") {
        const relativoM = NOTAS_DICCIONARIO[(idxTonica + 9) % 12];
        sustitutos.push({ label: `${relativoM}m7`, tonica: relativoM, tipo: "menor", ext: "7", desc: "Relativo menor" });
    } else if (tipo === "menor" && extension === "ninguna") {
        const relativoMay = NOTAS_DICCIONARIO[(idxTonica + 3) % 12];
        sustitutos.push({ label: `${relativoMay}maj7`, tonica: relativoMay, tipo: "mayor", ext: "maj7", desc: "Relativo mayor" });
    }

    // 2. Sus2 / Sus4 interconectados
    if (tipo === "sus2") {
        const quinta = NOTAS_DICCIONARIO[(idxTonica + 7) % 12];
        sustitutos.push({ label: `${quinta}sus4`, tonica: quinta, tipo: "sus4", ext: "ninguna", desc: "Inversión sus4" });
    } else if (tipo === "sus4") {
        const quinta = NOTAS_DICCIONARIO[(idxTonica + 7) % 12];
        sustitutos.push({ label: `${quinta}sus2`, tonica: quinta, tipo: "sus2", ext: "ninguna", desc: "Inversión sus2" });
    }

    // 3. Sustituto Tritonal para Dominantes (7)
    if (extension === "7") {
        const tritono = NOTAS_DICCIONARIO[(idxTonica + 6) % 12];
        sustitutos.push({ label: `${tritono}7`, tonica: tritono, tipo: "mayor", ext: "7", desc: "Sustituto Tritonal" });
    }

    // 4. Equivalente Semidisminuido / Menor 6
    if (tipo === "menor" && extension === "6") {
        const sexta = NOTAS_DICCIONARIO[(idxTonica + 9) % 12];
        sustitutos.push({ label: `${sexta}m7b5`, tonica: sexta, tipo: "dim", ext: "m7b5", desc: "Inversión m7b5" });
    }

    // Fallback: Acorde sin extensión o con séptima simple
    if (extension !== "ninguna") {
        sustitutos.push({ label: `${tonica} (Triada base)`, tonica: tonica, tipo: tipo, ext: "ninguna", desc: "Simplificación" });
    }

    if (sustitutos.length === 0) {
        contenedor.innerHTML = `<span style="color: #64748b; font-size: 0.85rem; font-style: italic;">No hay sustitutos inmediatos para esta combinación exacta.</span>`;
        return;
    }

    contenedor.innerHTML = sustitutos.map((s, i) => `
        <button type="button" class="btn-sustituto-dic" data-index="${i}" style="
            background: #0f172a; border: 1px solid #38bdf866; color: #38bdf8; 
            padding: 8px 12px; border-radius: 8px; cursor: pointer; text-align: left;
            transition: all 0.2s ease; font-size: 0.85rem;
        ">
            <strong>${s.label}</strong>
            <small style="display: block; color: #94a3b8; font-size: 0.7rem;">${s.desc}</small>
        </button>
    `).join('');

    // Listener para cargar el sustituto al hacer click
    contenedor.querySelectorAll(".btn-sustituto-dic").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const idx = parseInt(e.currentTarget.getAttribute("data-index"), 10);
            const item = sustitutos[idx];
            if (!item) return;

            document.getElementById("selectTonicaDic").value = item.tonica;
            document.getElementById("selectTipoDic").value = item.tipo;
            document.getElementById("selectExtDic").value = item.ext;
            document.getElementById("selectInversionDic").value = "0";

            procesarYActualizarDiccionario();
        });
    });
}

// ============================================================
// RENDERS VISUALES (PIANO & GUITARRA)
// ============================================================
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
                const esBajo = notasActivas[0] === t.nota;
                let colorBlanca = activa ? (esBajo ? '#38bdf8' : '#818cf8') : '#ffffff';
                let colorNegra = activa ? (esBajo ? '#0284c7' : '#6366f1') : '#0f172a';

                if (!t.esNegra) {
                    return `<div style="width: 32px; height: 110px; background: ${colorBlanca}; border: 1px solid #94a3b8; border-radius: 0 0 6px 6px; z-index: 1;"></div>`;
                } else {
                    return `<div style="width: 20px; height: 68px; background: ${colorNegra}; margin-left: -10px; margin-right: -10px; z-index: 2; border-radius: 0 0 4px 4px; border: 1px solid #334155;"></div>`;
                }
            }).join('')}
        </div>
    `;
}

function renderGuitarraDiccionario(tonica, tipo, notas) {
    const container = document.getElementById("guitarraDiccionarioContainer");
    if (!container) return;

    const offsetTonica = NOTAS_DICCIONARIO.indexOf(tonica);
    let trasteBase = (offsetTonica % 12) + 1;
    if (trasteBase > 9) trasteBase = (trasteBase % 6) + 1;

    const trastesEjemplo = [
        trasteBase, 
        trasteBase + 2, 
        trasteBase + 2, 
        tipo === "menor" ? trasteBase + 1 : trasteBase + 2, 
        trasteBase, 
        trasteBase
    ];

    const numTrastesVisibles = 4;
    
    container.innerHTML = `
        <div style="background: #0f172a; padding: 14px 18px; border-radius: 10px; border: 1px solid #475569; display: inline-block; width: 100%; max-width: 280px; box-sizing: border-box;">
            <div style="font-size: 0.8rem; color: #94a3b8; margin-bottom: 8px; font-weight: 600; text-align: center;">Traste de posición: ${trasteBase}</div>
            
            <div style="display: flex; justify-content: space-around; margin-bottom: 4px; padding: 0 8px;">
                ${trastesEjemplo.map((traste, i) => {
                    let simbolo = "○";
                    let color = "#38bdf8";
                    if (i === 0 && traste > 1) simbolo = "●";
                    return `<span style="font-size: 0.85rem; font-weight: bold; color: ${color}; width: 20px; text-align: center;">${simbolo}</span>`;
                }).join('')}
            </div>

            <div style="position: relative; background: #262626; border: 2px solid #525252; border-radius: 4px; height: 120px; margin: 0 auto; display: flex; justify-content: space-around; padding: 0 8px;">
                ${Array.from({ length: numTrastesVisibles - 1 }).map((_, idx) => `
                    <div style="position: absolute; left: 0; right: 0; top: ${((idx + 1) * 100) / numTrastesVisibles}%; height: 2px; background: #737373; z-index: 1;"></div>
                `).join('')}

                ${trastesEjemplo.map((traste) => {
                    const relTraste = (traste - trasteBase) + 1;
                    return `
                        <div style="position: relative; width: 2px; height: 100%; background: #d4d4d4; z-index: 2; display: flex; justify-content: center;">
                            ${relTraste > 0 && relTraste <= numTrastesVisibles ? `
                                <div style="
                                    position: absolute; width: 16px; height: 16px; 
                                    background: #38bdf8; border: 2px solid #ffffff; border-radius: 50%; 
                                    top: ${ ((relTraste - 0.5) * 100) / numTrastesVisibles }%; 
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