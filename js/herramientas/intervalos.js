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
    let pannerBase = null;
    let pannerSegunda = null;
    let notaBase = "C4";
    let intervaloActual = null;
    let segundaNotaActual = null;
    let modoReproduccion = "armonico"; // "armonico", "ascendente", "descendente"
    let racha = 0;
    let totalIntentos = 0;
    let aciertos = 0;

    // La herramienta puede cerrarse (el usuario se va a otra
    // pestaña del Lab) mientras hay un setTimeout de auto-avance
    // pendiente. Sin esta bandera, ese timeout intentaría sonar
    // sobre sintetizadores ya destruidos.
    let activo = true;

    // Evita que se disparen sonidos superpuestos si el usuario
    // toca "Escuchar" o "Repetir" varias veces seguidas.
    let sonidoEnCurso = false;
    let idAvanceAutomatico = null;

    // true entre el momento en que se responde una ronda y el
    // momento en que efectivamente arranca la siguiente. Si en ese
    // lapso el usuario vuelve a tocar "Escuchar"/"Repetir" (típico:
    // quiere re-escuchar el intervalo para entender en qué se
    // equivocó), pateamos el avance automático en vez de dejar que
    // se dispare encima de esa reproducción manual.
    let esperandoSiguienteRonda = false;
    let ultimaDuracionMs = 0;

    // Duraciones fijas en segundos (no dependen del tempo del
    // Transport de Tone.js, así siempre suenan igual de claras).
    const DURACION_ARMONICO = 1.1;
    const DURACION_SECUENCIAL = 0.55;
    const SEPARACION_SECUENCIAL = 0.62;
    const COLCHON_ENTRE_RONDAS = 900; // ms extra tras el release

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
            // Nota base: onda triangular (más redonda y cálida),
            // levemente panorámica a la izquierda.
            pannerBase = new Tone.Panner(-0.25).toDestination();
            synthBase = new Tone.Synth({
                oscillator: { type: "triangle" },
                envelope: { attack: 0.02, decay: 0.12, sustain: 0.35, release: 0.35 }
            }).connect(pannerBase);
            synthBase.volume.value = -4;

            // Segunda nota: onda de sierra (con más brillo para
            // distinguirla), levemente panorámica a la derecha.
            // La separación estéreo, junto con el timbre distinto,
            // hace mucho más fácil escuchar las dos notas como
            // sonidos independientes en vez de una mezcla confusa.
            pannerSegunda = new Tone.Panner(0.25).toDestination();
            synthSegunda = new Tone.Synth({
                oscillator: { type: "sawtooth" },
                envelope: { attack: 0.02, decay: 0.12, sustain: 0.35, release: 0.35 }
            }).connect(pannerSegunda);
            synthSegunda.volume.value = -8; // el sawtooth es más brillante/fuerte al oído
        }
        if (Tone.context.state !== "running") {
            Tone.start();
        }
    }

    // ========================================================
    // SILENCIAR AL SALIR DE LA HERRAMIENTA
    // ========================================================
    //
    // Ojo: esto es solo para cuando el usuario cierra la
    // herramienta con una nota sonando. NO se debe llamar antes de
    // cada reproducción normal: Tone.js ya cancela y reencadena el
    // envelope automáticamente cuando volvés a llamar
    // triggerAttackRelease sobre el mismo synth, así que forzar un
    // triggerRelease manual justo antes de la nota siguiente
    // generaba un pequeño "pico" audible extra (un tercer sonido
    // fantasma) en vez de evitar la superposición.
    function silenciarAlSalir() {
        const ahora = Tone.now();
        try { if (synthBase) synthBase.triggerRelease(ahora); } catch (error) {}
        try { if (synthSegunda) synthSegunda.triggerRelease(ahora); } catch (error) {}
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
            <p class="text-slate-400 mt-2 text-sm">Entrená tu oído reconociendo distancias entre notas. Tocá "Escuchar Intervalo" cuando estés listo/a para empezar.</p>
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
                <button id="btnReproducir" class="flex-1 p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-black text-base transition shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600">
                    🔊 Escuchar Intervalo
                </button>
                <button id="btnRepetir" class="px-5 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 font-bold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-slate-800" title="Repetir">
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

    // Elige al azar la nota base y el intervalo, pero NO reproduce
    // nada. Separar "elegir" de "sonar" es lo que nos permite abrir
    // la herramienta sin que dispare audio de sorpresa.
    function prepararNuevoIntervalo() {
        inicializarSynth();
        notaBase = notasPosibles[Math.floor(Math.random() * notasPosibles.length)];
        intervaloActual = INTERVALOS_DATA[Math.floor(Math.random() * INTERVALOS_DATA.length)];

        const freqBase = Tone.Frequency(notaBase).toFrequency();
        const freqSegunda = freqBase * Math.pow(2, intervaloActual.semitonos / 12);
        segundaNotaActual = freqSegunda;
    }

    function reproducirActual() {
        if (!activo || !intervaloActual) return;

        inicializarSynth();

        // No hace falta cortar nada a mano acá: Tone.js ya cancela
        // y reencadena limpiamente el envelope de cada synth cuando
        // volvemos a llamar triggerAttackRelease (incluso si el
        // usuario cambia de modo con una nota todavía sonando). Un
        // triggerRelease manual justo antes generaba un pico
        // audible extra, que es lo que sonaba como "un tercer
        // sonido".
        const inicio = Tone.now();

        let duracionTotalMs;

        if (modoReproduccion === "armonico") {
            // Disparamos ambas notas en simultáneo usando timbres diferentes
            synthBase.triggerAttackRelease(notaBase, DURACION_ARMONICO, inicio);
            synthSegunda.triggerAttackRelease(segundaNotaActual, DURACION_ARMONICO, inicio);
            duracionTotalMs = DURACION_ARMONICO * 1000;
        } else if (modoReproduccion === "ascendente") {
            synthBase.triggerAttackRelease(notaBase, DURACION_SECUENCIAL, inicio);
            synthBase.triggerAttackRelease(segundaNotaActual, DURACION_SECUENCIAL, inicio + SEPARACION_SECUENCIAL);
            duracionTotalMs = (SEPARACION_SECUENCIAL + DURACION_SECUENCIAL) * 1000;
        } else {
            synthBase.triggerAttackRelease(segundaNotaActual, DURACION_SECUENCIAL, inicio);
            synthBase.triggerAttackRelease(notaBase, DURACION_SECUENCIAL, inicio + SEPARACION_SECUENCIAL);
            duracionTotalMs = (SEPARACION_SECUENCIAL + DURACION_SECUENCIAL) * 1000;
        }

        // Mientras la nota suena, deshabilitamos "Escuchar"/"Repetir"
        // para que no se puedan disparar dos reproducciones pisándose.
        ultimaDuracionMs = duracionTotalMs;
        sonidoEnCurso = true;
        actualizarEstadoBotonesReproduccion();
        setTimeout(() => {
            sonidoEnCurso = false;
            actualizarEstadoBotonesReproduccion();
        }, duracionTotalMs + 400);
    }

    function actualizarEstadoBotonesReproduccion() {
        const btnReproducir = wrapper.querySelector("#btnReproducir");
        const btnRepetir = wrapper.querySelector("#btnRepetir");
        if (btnReproducir) btnReproducir.disabled = sonidoEnCurso;
        if (btnRepetir) btnRepetir.disabled = sonidoEnCurso;
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

        esperandoSiguienteRonda = true;
        programarAvance(feedback, 1800);
    }

    // Programa (o reprograma) el paso a la siguiente ronda. Se usa
    // tanto para el avance normal tras responder como para
    // "correrlo" cuando el usuario vuelve a escuchar el intervalo
    // mientras espera — así nunca se pisan.
    function programarAvance(feedback, delayMs) {
        if (idAvanceAutomatico) {
            clearTimeout(idAvanceAutomatico);
        }
        idAvanceAutomatico = setTimeout(() => {
            idAvanceAutomatico = null;
            esperandoSiguienteRonda = false;
            if (!activo) return;
            feedback.classList.add("hidden");
            construirGrillaOpciones();
            prepararNuevoIntervalo();
            reproducirActual();
        }, delayMs);
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
        if (sonidoEnCurso) return;
        if (!intervaloActual) prepararNuevoIntervalo();
        reproducirActual();
        // Si estábamos por pasar de ronda automáticamente y el
        // usuario quiso re-escuchar el intervalo (por ejemplo, para
        // entender en qué se equivocó), corremos el avance para que
        // no se dispare mientras esto todavía está sonando.
        if (esperandoSiguienteRonda) {
            const feedback = wrapper.querySelector("#feedbackContainer");
            programarAvance(feedback, ultimaDuracionMs + 900);
        }
    };

    wrapper.querySelector("#btnRepetir").onclick = () => {
        if (sonidoEnCurso) return;
        if (!intervaloActual) return;
        reproducirActual();
        if (esperandoSiguienteRonda) {
            const feedback = wrapper.querySelector("#feedbackContainer");
            programarAvance(feedback, ultimaDuracionMs + 900);
        }
    };

    wrapper.querySelectorAll(".modo-btn").forEach(btn => {
        btn.onclick = (e) => {
            wrapper.querySelectorAll(".modo-btn").forEach(b => {
                b.className = "modo-btn p-3 rounded-xl bg-slate-800 text-xs font-bold text-slate-400 hover:text-white transition";
            });
            e.target.className = "modo-btn p-3 rounded-xl bg-indigo-600 text-xs font-bold transition text-white";
            modoReproduccion = e.target.dataset.modo;
            // Cambiar de modo puede interrumpir una reproducción en
            // curso: el usuario quiere escuchar el nuevo modo ya.
            if (intervaloActual) {
                reproducirActual();
                if (esperandoSiguienteRonda) {
                    const feedback = wrapper.querySelector("#feedbackContainer");
                    programarAvance(feedback, ultimaDuracionMs + 900);
                }
            }
        };
    });

    // Iniciar juego por primera vez: armamos la grilla y elegimos
    // el primer intervalo, pero NO lo reproducimos todavía. El
    // usuario necesita un momento para prepararse antes de que
    // suene el primer intervalo; que empiece a sonar apenas se abre
    // la herramienta era justamente parte del problema.
    construirGrillaOpciones();
    prepararNuevoIntervalo();

    // Limpieza al salir de la herramienta
    contenedor._limpiarHerramienta = function() {
        activo = false;

        if (idAvanceAutomatico) {
            clearTimeout(idAvanceAutomatico);
            idAvanceAutomatico = null;
        }

        silenciarAlSalir();

        if (synthBase) {
            synthBase.dispose();
            synthBase = null;
        }
        if (synthSegunda) {
            synthSegunda.dispose();
            synthSegunda = null;
        }
        if (pannerBase) {
            pannerBase.dispose();
            pannerBase = null;
        }
        if (pannerSegunda) {
            pannerSegunda.dispose();
            pannerSegunda = null;
        }
    };
};