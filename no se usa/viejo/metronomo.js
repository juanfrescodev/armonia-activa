// ============================================================
// ARMONÍA ACTIVA
// HERRAMIENTA — METRÓNOMO (MEJORADO)
// ============================================================

window.HERRAMIENTAS = window.HERRAMIENTAS || {};

HERRAMIENTAS.metronomo = function(contenedor) {
    contenedor.innerHTML = "";

    // ========================================================
    // ESTADO
    // ========================================================
    let bpm = 100;
    let reproduciendo = false;
    let volumen = 0.8;

    let compasActual = "4/4";
    let agrupacionActual = "4";

    // Variables para el Scheduler de alta precisión
    let audioCtx = null;
    let siguienteNotaTime = 0.0;
    let pasoActual = 0;
    let timerID = null;
    const lookahead = 25.0; // Frecuencia de revisión en ms
    const scheduleAheadTime = 0.1; // Qué tan adelante programar en segundos

    // ========================================================
    // DEFINICIÓN DE COMPASES
    // ========================================================
    const COMPASES = {
        "2/4": { tipo: "simple", agrupaciones: ["2"] },
        "3/4": { tipo: "simple", agrupaciones: ["3"] },
        "4/4": { tipo: "simple", agrupaciones: ["4"] },
        "5/4": { tipo: "irregular", agrupaciones: ["2+3", "3+2"] },
        "6/4": { tipo: "simple", agrupaciones: ["6"] },
        "7/4": { tipo: "irregular", agrupaciones: ["2+2+3", "2+3+2", "3+2+2"] },
        
        // Compuestos (ahora descomponen cada tiempo con sus corcheas/subdivisiones)
        "6/8": { tipo: "compuesto", agrupaciones: ["3+3"] },
        "9/8": { tipo: "compuesto", agrupaciones: ["3+3+3"] },
        "12/8": { tipo: "compuesto", agrupaciones: ["3+3+3+3"] },

        // Irregulares / Dispares en corcheas
        "5/8": { tipo: "irregular", agrupaciones: ["2+3", "3+2"] },
        "7/8": { tipo: "irregular", agrupaciones: ["2+2+3", "2+3+2", "3+2+2"] },
        "11/8": { tipo: "irregular", agrupaciones: ["2+2+2+2+3", "2+2+2+3+2", "2+2+3+2+2", "2+3+2+2+2", "3+2+2+2+2"] }
    };

    function obtenerConfiguracion() {
        return COMPASES[compasActual];
    }

    // Obtiene los números de la agrupación (ej: "3+3" -> [3, 3])
    function obtenerArrayAgrupacion() {
        return agrupacionActual.split("+").map(Number);
    }

    // Obtiene el total de subdivisiones/pulsos reales a marcar en el compás
    function obtenerTotalPasos() {
        return obtenerArrayAgrupacion().reduce((acc, val) => acc + val, 0);
    }

    // Determina si un paso específico es el inicio de un grupo principal (para acentuarlo)
    function esAcentoPrincipal(paso) {
        const agrupacion = obtenerArrayAgrupacion();
        let acumulado = 0;
        for (let i = 0; i < agrupacion.length; i++) {
            if (paso === acumulado) return true;
            acumulado += agrupacion[i];
        }
        return false;
    }

    // ========================================================
    // CREAR PULSOS VISUALES
    // ========================================================
    function crearBeats() {
        const beats = wrapper.querySelector("#beats");
        if (!beats) return;
        beats.innerHTML = "";

        const totalPasos = obtenerTotalPasos();
        const agrupacion = obtenerArrayAgrupacion();

        // Creamos un contenedor visual por cada grupo para que luzca ordenado
        let pasoIndex = 0;
        agrupacion.forEach((tamGrupo, grupoIdx) => {
            const grupoDiv = document.createElement("div");
            grupoDiv.className = "flex gap-1.5 p-1 bg-slate-800/40 rounded-xl border border-white/5";

            for (let i = 0; i < tamGrupo; i++) {
                const beat = document.createElement("div");
                beat.className = "beat transition-all duration-75";
                beat.dataset.index = pasoIndex;
                beat.style.width = "14px";
                beat.style.height = "14px";
                beat.style.borderRadius = "50%";
                beat.style.background = "rgba(100,116,139,0.35)";
                grupoDiv.appendChild(beat);
                pasoIndex++;
            }
            beats.appendChild(grupoDiv);
        });
    }

    // ========================================================
    // INTERFAZ (UI)
    // ========================================================
    const wrapper = document.createElement("div");
    wrapper.className = "max-w-xl mx-auto";
    wrapper.innerHTML = `
        <div class="text-center mb-8">
            <div class="text-4xl mb-4">⏱️</div>
            <h2 class="text-3xl font-black">Metrónomo</h2>
            <p class="text-slate-400 mt-3">Precisión profesional de alta fidelidad para compases complejos.</p>
        </div>

        <div class="bg-slate-900/70 border border-white/10 rounded-3xl p-6 md:p-8">
            <div class="text-center">
                <div class="text-xs uppercase tracking-widest text-slate-500 mb-2">Tempo</div>
                <div id="metronomoBpm" class="text-7xl font-black text-indigo-400">100</div>
                <div class="text-sm text-slate-500 mt-1">BPM</div>
            </div>

            <div class="mt-8">
                <input id="metronomoSlider" type="range" min="40" max="240" value="100" class="w-full accent-indigo-500">
                <div class="flex justify-between text-xs text-slate-500 mt-2">
                    <span>40</span><span>240</span>
                </div>
            </div>

            <div class="grid grid-cols-3 gap-3 mt-6">
                <button id="bpmMenos" class="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold">−5</button>
                <button id="bpmReset" class="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold">100</button>
                <button id="bpmMas" class="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 font-bold">+5</button>
            </div>

            <div class="mt-8">
                <div class="text-xs uppercase tracking-widest text-slate-500 mb-3">Compás</div>
                <select id="metronomoCompas" class="w-full p-4 rounded-xl bg-slate-800 border border-white/10 text-white font-bold">
                    <optgroup label="Compases simples">
                        <option value="2/4">2/4</option>
                        <option value="3/4">3/4</option>
                        <option value="4/4" selected>4/4</option>
                        <option value="5/4">5/4</option>
                        <option value="6/4">6/4</option>
                        <option value="7/4">7/4</option>
                    </optgroup>
                    <optgroup label="Compases compuestos">
                        <option value="6/8">6/8</option>
                        <option value="9/8">9/8</option>
                        <option value="12/8">12/8</option>
                    </optgroup>
                    <optgroup label="Compases irregulares">
                        <option value="5/8">5/8</option>
                        <option value="7/8">7/8</option>
                        <option value="11/8">11/8</option>
                    </optgroup>
                </select>
            </div>

            <div id="agrupacionContainer" class="mt-5">
                <div class="text-xs uppercase tracking-widest text-slate-500 mb-3">Agrupación</div>
                <select id="metronomoAgrupacion" class="w-full p-4 rounded-xl bg-slate-800 border border-white/10 text-white font-bold"></select>
                <p id="descripcionCompas" class="text-xs text-slate-500 mt-3 leading-relaxed"></p>
            </div>

            <!-- PULSO VISUAL AGRUPADO -->
            <div class="flex flex-wrap justify-center items-center gap-3 my-8" id="beats"></div>

            <button id="metronomoPlay" class="w-full p-5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-black text-lg transition">
                ▶ Iniciar
            </button>

            <div class="mt-8">
                <div class="flex justify-between text-xs text-slate-500 mb-2">
                    <span>Volumen</span>
                    <span id="volumenValor">80%</span>
                </div>
                <input id="metronomoVolumen" type="range" min="0" max="100" value="80" class="w-full accent-indigo-500">
            </div>
        </div>
    `;
    contenedor.appendChild(wrapper);

    // ========================================================
    // REFERENCIAS UI
    // ========================================================
    const bpmDisplay = wrapper.querySelector("#metronomoBpm");
    const slider = wrapper.querySelector("#metronomoSlider");
    const botonPlay = wrapper.querySelector("#metronomoPlay");
    const botonMenos = wrapper.querySelector("#bpmMenos");
    const botonMas = wrapper.querySelector("#bpmMas");
    const botonReset = wrapper.querySelector("#bpmReset");
    const volumenSlider = wrapper.querySelector("#metronomoVolumen");
    const volumenValor = wrapper.querySelector("#volumenValor");
    const selectorCompas = wrapper.querySelector("#metronomoCompas");
    const selectorAgrupacion = wrapper.querySelector("#metronomoAgrupacion");
    const descripcionCompas = wrapper.querySelector("#descripcionCompas");

    function actualizarAgrupaciones() {
        const config = obtenerConfiguracion();
        selectorAgrupacion.innerHTML = "";
        config.agrupaciones.forEach(agrupacion => {
            const opcion = document.createElement("option");
            opcion.value = agrupacion;
            opcion.innerText = agrupacion;
            selectorAgrupacion.appendChild(opcion);
        });
        agrupacionActual = config.agrupaciones[0];
        selectorAgrupacion.value = agrupacionActual;
        actualizarDescripcion();
    }

    function actualizarDescripcion() {
        const config = obtenerConfiguracion();
        if (config.tipo === "simple") {
            descripcionCompas.innerText = `Compás simple: ${config.agrupaciones[0]} pulsos marcados por compás.`;
        } else if (config.tipo === "compuesto") {
            descripcionCompas.innerText = `Compás compuesto: Las subdivisiones de corchea marcan ${obtenerTotalPasos()} pulsos totales acentuando cada grupo de 3.`;
        } else {
            descripcionCompas.innerText = `Compás irregular: Estructura de subdivisión dispar ${agrupacionActual}.`;
        }
    }

    // ========================================================
    // MOTOR DE AUDIO DE ALTA PRECISIÓN (SCHEDULER WEB AUDIO API)
    // ========================================================
    function inicializarAudioContext() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }
    }

    function proximoPasoIntervalo() {
        // En compases compuestos o de subdivisión de corchea (ej 6/8), el BPM rige la negra con puntillo o la unidad de tiempo correspondiente, 
        // pero para marcar cada corchea exacta dividimos el pulso de negra acorde a la subdivisión.
        const config = obtenerConfiguracion();
        let segundosPorBeat = 60.0 / bpm;
        
        if (config.tipo === "compuesto") {
            // En 6/8, el BPM suele indicar negras con puntillo o corcheas. Ajuste estándar subdividido:
            // Cada negra con puntillo dura 1 tiempo principal dividido en 3 corcheas.
            segundosPorBeat = (60.0 / bpm) / 1.5; 
        }

        const totalPasos = obtenerTotalPasos();
        siguienteNotaTime += segundosPorBeat;
        pasoActual = (pasoActual + 1) % totalPasos;
    }

    function dispararSonidoYVisual(time, paso) {
        // Generación de audio ultraprecisa con Web Audio API en el tiempo exacto planificado
        if (!audioCtx) return;

        const esAcento = esAcentoPrincipal(paso);
        const freq = esAcento ? 1200 : 800;
        const dur = esAcento ? 0.05 : 0.03;
        const vol = Math.max(0.001, volumen);

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, time);

        gain.gain.setValueAtTime(vol, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(time);
        osc.stop(time + dur);

        // Actualización visual sincronizada mediante requestAnimationFrame o temporizador exacto
        const tiempoRestanteMs = (time - audioCtx.currentTime) * 1000;
        setTimeout(() => {
            if (!reproduciendo) return;
            actualizarUIBeat(paso);
        }, Math.max(0, tiempoRestanteMs));
    }

    function actualizarUIBeat(paso) {
        const beats = wrapper.querySelectorAll(".beat");
        beats.forEach(b => {
            b.style.transform = "scale(1)";
            b.style.background = "rgba(100,116,139,0.35)";
        });

        const beatActualEl = wrapper.querySelector(`.beat[data-index="${paso}"]`);
        if (beatActualEl) {
            const esAcento = esAcentoPrincipal(paso);
            beatActualEl.style.transform = "scale(1.4)";
            beatActualEl.style.background = esAcento ? "#818cf8" : "#64748b";
        }
    }

    function scheduler() {
        while (siguienteNotaTime < audioCtx.currentTime + scheduleAheadTime) {
            dispararSonidoYVisual(siguienteNotaTime, pasoActual);
            proximoPasoIntervalo();
        }
        if (reproduciendo) {
            timerID = window.setTimeout(scheduler, lookahead);
        }
    }

    function iniciarMetronomo() {
        inicializarAudioContext();
        siguienteNotaTime = audioCtx.currentTime + 0.05;
        pasoActual = 0;
        reproduciendo = true;
        scheduler();
    }

    function detenerMetronomo() {
        reproduciendo = false;
        clearTimeout(timerID);
        pasoActual = 0;
        const beats = wrapper.querySelectorAll(".beat");
        beats.forEach(b => {
            b.style.transform = "scale(1)";
            b.style.background = "rgba(100,116,139,0.35)";
        });
    }

    async function alternar() {
        inicializarAudioContext();
        if (reproduciendo) {
            detenerMetronomo();
            botonPlay.innerText = "▶ Iniciar";
        } else {
            iniciarMetronomo();
            botonPlay.innerText = "⏸ Pausar";
        }
    }

    // ========================================================
    // EVENTOS DE CONTROL
    // ========================================================
    selectorCompas.onchange = function() {
        const estabaReproduciendo = reproduciendo;
        if (reproduciendo) detenerMetronomo();
        
        compasActual = this.value;
        actualizarAgrupaciones();
        crearBeats();

        if (estabaReproduciendo) {
            iniciarMetronomo();
            botonPlay.innerText = "⏸ Pausar";
        }
    };

    selectorAgrupacion.onchange = function() {
        const estabaReproduciendo = reproduciendo;
        if (reproduciendo) detenerMetronomo();

        agrupacionActual = this.value;
        actualizarDescripcion();
        crearBeats();

        if (estabaReproduciendo) {
            iniciarMetronomo();
            botonPlay.innerText = "⏸ Pausar";
        }
    };

    function actualizarBPM(nuevoBpm) {
        bpm = Math.max(40, Math.min(240, nuevoBpm));
        bpmDisplay.innerText = bpm;
        slider.value = bpm;
    }

    slider.oninput = function() { actualizarBPM(Number(this.value)); };
    botonMenos.onclick = function() { actualizarBPM(bpm - 5); };
    botonMas.onclick = function() { actualizarBPM(bpm + 5); };
    botonReset.onclick = function() { actualizarBPM(100); };
    botonPlay.onclick = alternar;

    volumenSlider.oninput = function() {
        volumen = Number(this.value) / 100;
        volumenValor.innerText = `${this.value}%`;
    };

    // Inicialización visual inicial
    actualizarAgrupaciones();
    crearBeats();

    contenedor._limpiarHerramienta = function() {
        detenerMetronomo();
        botonPlay.innerText = "▶ Iniciar";
    };
};