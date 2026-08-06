// ============================================================
// ARMONÍA ACTIVA
// HERRAMIENTA — ENTRENADOR DE INTERVALOS
// ============================================================

window.HERRAMIENTAS = window.HERRAMIENTAS || {};

HERRAMIENTAS.intervalos = function(contenedor) {
    contenedor.innerHTML = "";

    // ========================================================
    // ESTADO
    // ========================================================
    let synthBase = null;
    let synthSegunda = null;
    let notaBase = "C4";
    let intervaloActual = null;
    let segundaNotaActual = null;
    let modoReproduccion = "armonico"; // "armonico", "ascendente", "descendente"
    let racha = 0;
    let totalIntentos = 0;
    let aciertos = 0;

    const INTERVALOS_DATA = [
        { semitonos: 1, nombre: "Segunda menor (m2)", abreviatura: "2m" },
        { semitonos: 2, nombre: "Segunda mayor (M2)", abreviatura: "2M" },
        { semitonos: 3, nombre: "Tercera menor (m3)", abreviatura: "3m" },
        { semitonos: 4, nombre: "Tercera mayor (M3)", abreviatura: "3M" },
        { semitonos: 5, nombre: "Cuarta justa (J4)", abreviatura: "4J" },
        { semitonos: 6, nombre: "Tritono / 4ta aumentada", abreviatura: "TT" },
        { semitonos: 7, nombre: "Quinta justa (J5)", abreviatura: "5J" },
        { semitonos: 8, nombre: "Sexta menor (m6)", abreviatura: "6m" },
        { semitonos: 9, nombre: "Sexta mayor (M6)", abreviatura: "6M" },
        { semitonos: 10, nombre: "Séptima menor (m7)", abreviatura: "7m" },
        { semitonos: 11, nombre: "Séptima mayor (M7)", abreviatura: "7M" },
        { semitonos: 12, nombre: "Octava justa (J8)", abreviatura: "8J" }
    ];

    // ========================================================
    // INICIALIZACIÓN DE SYNTHS (DOS TIMBRES DISTINTOS)
    // ========================================================
    function inicializarSynth() {
        if (!synthBase || !synthSegunda) {
            // Nota base: onda triangular (más redonda y cálida)
            synthBase = new Tone.Synth({
                oscillator: { type: "triangle" },
                envelope: { attack: 0.05, decay: 0.1, sustain: 0.4, release: 1.2 }
            }).toDestination();

            // Segunda nota: onda de sierra (con más brillo para distinguirla)
            synthSegunda = new Tone.Synth({
                oscillator: { type: "sawtooth" },
                envelope: { attack: 0.05, decay: 0.1, sustain: 0.4, release: 1.2 }
            }).toDestination();
        }
        if (Tone.context.state !== "running") {
            Tone.start();
        }
    }

    // ========================================================
    // INTERFAZ (UI)
    // ========================================================
    const wrapper = document.createElement("div");
    wrapper.className = "max-w-xl mx-auto aparecer";
    wrapper.innerHTML = `
        <div class="text-center mb-6">
            <div class="text-4xl mb-3">👂</div>
            <h2 class="text-3xl font-black">Entrenador de Intervalos</h2>
            <p class="text-slate-400 mt-2 text-sm">Entrená tu oído absoluto y relativo reconociendo distancias melódicas y armónicas.</p>
        </div>

        <div class="bg-slate-900/70 border border-white/10 rounded-3xl p-6 md:p-8">
            <!-- PANEL DE ESTADÍSTICAS -->
            <div class="grid grid-cols-3 gap-3 mb-6 text-center">
                <div class="bg-slate-800/50 p-3 rounded-xl border border-white/5">
                    <div class="text-xs uppercase text-slate-500 font-bold">Aciertos</div>
                    <div id="statAciertos" class="text-xl font-black text-indigo-400 mt-1">0 / 0</div>
                </div>
                <div class="bg-slate-800/50 p-3 rounded-xl border border-white/5">
                    <div class="text-xs uppercase text-slate-500 font-bold">Precisión</div>
                    <div id="statPrecision" class="text-xl font-black text-indigo-400 mt-1">0%</div>
                </div>
                <div class="bg-slate-800/50 p-3 rounded-xl border border-white/5">
                    <div class="text-xs uppercase text-slate-500 font-bold">Racha</div>
                    <div id="statRacha" class="text-xl font-black text-emerald-400 mt-1">0 🔥</div>
                </div>
            </div>

            <!-- CONTROLES DE MODO -->
            <div class="grid grid-cols-3 gap-2 mb-6">
                <button data-modo="armonico" class="modo-btn p-3 rounded-xl bg-indigo-600 text-xs font-bold transition text-white">Armónico</button>
                <button data-modo="ascendente" class="modo-btn p-3 rounded-xl bg-slate-800 text-xs font-bold text-slate-400 hover:text-white transition">Ascendente</button>
                <button data-modo="descendente" class="modo-btn p-3 rounded-xl bg-slate-800 text-xs font-bold text-slate-400 hover:text-white transition">Descendente</button>
            </div>

            <!-- BOTONES DE REPRODUCCIÓN -->
            <div class="flex gap-3 mb-6">
                <button id="btnReproducir" class="flex-1 p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-black text-base transition shadow-lg shadow-indigo-600/20">
                    🔊 Escuchar Intervalo
                </button>
                <button id="btnRepetir" class="px-5 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 font-bold text-sm transition" title="Repetir">
                    🔄
                </button>
            </div>

            <!-- GRILLA DE OPCIONES DE RESPUESTA -->
            <div class="text-xs uppercase tracking-widest text-slate-500 mb-3 font-bold">Seleccioná el intervalo:</div>
            <div id="grillaOpciones" class="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6"></div>

            <!-- RETROALIMENTACIÓN -->
            <div id="feedbackContainer" class="hidden p-4 rounded-2xl text-center font-bold text-sm"></div>
        </div>
    `;
    contenedor.appendChild(wrapper);

    // ========================================================
    // LÓGICA DE JUEGO Y AUDIO
    // ========================================================
    const notasPosibles = ["C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3", "C4", "C#4", "D4", "D#4", "E4", "F4"];

    function generarNuevoIntervalo() {
        inicializarSynth();
        notaBase = notasPosibles[Math.floor(Math.random() * notasPosibles.length)];
        intervaloActual = INTERVALOS_DATA[Math.floor(Math.random() * INTERVALOS_DATA.length)];

        const freqBase = Tone.Frequency(notaBase).toFrequency();
        const freqSegunda = freqBase * Math.pow(2, intervaloActual.semitonos / 12);
        segundaNotaActual = freqSegunda;

        reproducirActual();
    }

    function reproducirActual() {
        inicializarSynth();

        if (modoReproduccion === "armonico") {
            // Disparamos ambas notas en simultáneo usando timbres diferentes
            synthBase.triggerAttackRelease(notaBase, "1n");
            synthSegunda.triggerAttackRelease(segundaNotaActual, "1n");
        } else if (modoReproduccion === "ascendente") {
            synthBase.triggerAttackRelease(notaBase, "4n", Tone.now());
            synthBase.triggerAttackRelease(segundaNotaActual, "4n", Tone.now() + 0.6);
        } else if (modoReproduccion === "descendente") {
            synthBase.triggerAttackRelease(segundaNotaActual, "4n", Tone.now());
            synthBase.triggerAttackRelease(notaBase, "4n", Tone.now() + 0.6);
        }
    }

    function verificarRespuesta(semitonosSeleccionados, botonElemento) {
        if (!intervaloActual) return;
        totalIntentos++;

        const grilla = wrapper.querySelector("#grillaOpciones");
        const botones = grilla.querySelectorAll("button");
        botones.forEach(b => b.disabled = true);

        const feedback = wrapper.querySelector("#feedbackContainer");
        feedback.classList.remove("hidden");

        if (semitonosSeleccionados === intervaloActual.semitonos) {
            aciertos++;
            racha++;
            botonElemento.className = "p-3 rounded-xl bg-emerald-600 text-white font-bold text-xs transition border border-emerald-400";
            feedback.className = "p-4 rounded-2xl text-center font-bold text-sm bg-emerald-950/80 border border-emerald-500/30 text-emerald-300";
            feedback.innerText = `¡Correcto! Era una ${intervaloActual.nombre}. 🎉`;
        } else {
            racha = 0;
            botonElemento.className = "p-3 rounded-xl bg-rose-600 text-white font-bold text-xs transition border border-rose-400";
            feedback.className = "p-4 rounded-2xl text-center font-bold text-sm bg-rose-950/80 border border-rose-500/30 text-rose-300";
            feedback.innerText = `Incorrecto. Era una ${intervaloActual.nombre}. ❌`;
        }

        actualizarEstadisticas();

        setTimeout(() => {
            feedback.classList.add("hidden");
            construirGrillaOpciones();
            generarNuevoIntervalo();
        }, 1600);
    }

    function actualizarEstadisticas() {
        wrapper.querySelector("#statAciertos").innerText = `${aciertos} / ${totalIntentos}`;
        const porcentaje = totalIntentos > 0 ? Math.round((aciertos / totalIntentos) * 100) : 0;
        wrapper.querySelector("#statPrecision").innerText = `${porcentaje}%`;
        wrapper.querySelector("#statRacha").innerText = `${racha} 🔥`;
    }

    function construirGrillaOpciones() {
        const grilla = wrapper.querySelector("#grillaOpciones");
        grilla.innerHTML = "";

        INTERVALOS_DATA.forEach(item => {
            const btn = document.createElement("button");
            btn.className = "p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition border border-white/5 hover:border-indigo-500/40 text-center";
            btn.innerText = item.nombre;
            btn.onclick = () => verificarRespuesta(item.semitonos, btn);
            grilla.appendChild(btn);
        });
    }

    // ========================================================
    // EVENTOS DE UI
    // ========================================================
    wrapper.querySelector("#btnReproducir").onclick = () => {
        if (!intervaloActual) generarNuevoIntervalo();
        else reproducirActual();
    };

    wrapper.querySelector("#btnRepetir").onclick = () => {
        if (intervaloActual) reproducirActual();
    };

    wrapper.querySelectorAll(".modo-btn").forEach(btn => {
        btn.onclick = (e) => {
            wrapper.querySelectorAll(".modo-btn").forEach(b => {
                b.className = "modo-btn p-3 rounded-xl bg-slate-800 text-xs font-bold text-slate-400 hover:text-white transition";
            });
            e.target.className = "modo-btn p-3 rounded-xl bg-indigo-600 text-xs font-bold transition text-white";
            modoReproduccion = e.target.dataset.modo;
            if (intervaloActual) reproducirActual();
        };
    });

    // Iniciar juego por primera vez
    construirGrillaOpciones();
    generarNuevoIntervalo();

    // Limpieza al salir de la herramienta
    contenedor._limpiarHerramienta = function() {
        if (synthBase) {
            synthBase.dispose();
            synthBase = null;
        }
        if (synthSegunda) {
            synthSegunda.dispose();
            synthSegunda = null;
        }
    };
};