
// ============================================================
// ARMONÍA ACTIVA
// HERRAMIENTA — METRÓNOMO
// ============================================================
//
// Metrónomo con:
//
// • Compases simples
// • Compases compuestos
// • Compases irregulares / de agrupación dispar
// • Agrupaciones 2+3, 3+2, 2+2+3, etc.
// • BPM
// • Volumen
// • Indicador visual de pulsos
//
// ============================================================

window.HERRAMIENTAS =
    window.HERRAMIENTAS || {};


// ============================================================
// METRÓNOMO
// ============================================================

HERRAMIENTAS.metronomo = function(contenedor) {

    contenedor.innerHTML = "";



    // ========================================================
    // ESTADO
    // ========================================================

    let bpm = 100;

    let reproduciendo = false;

    let intervalo = null;

    let beatActual = 0;

    let volumen = 0.8;


    // --------------------------------------------------------
    // CONFIGURACIÓN DEL COMPÁS
    // --------------------------------------------------------

    let compasActual = "4/4";

    let agrupacionActual = "3+2";



    // ========================================================
    // DEFINICIÓN DE COMPASES
    // ========================================================

    const COMPASES = {

        // ----------------------------------------------------
        // SIMPLES
        // ----------------------------------------------------

        "2/4": {

            nombre: "2/4",

            tipo: "simple",

            pulsos: 2,

            subdivisiones: 2,

            agrupaciones: [

                "2"

            ]

        },


        "3/4": {

            nombre: "3/4",

            tipo: "simple",

            pulsos: 3,

            subdivisiones: 2,

            agrupaciones: [

                "3"

            ]

        },


        "4/4": {

            nombre: "4/4",

            tipo: "simple",

            pulsos: 4,

            subdivisiones: 2,

            agrupaciones: [

                "4"

            ]

        },


        "5/4": {

            nombre: "5/4",

            tipo: "irregular",

            pulsos: 5,

            subdivisiones: 2,

            agrupaciones: [

                "2+3",

                "3+2"

            ]

        },


        "6/4": {

            nombre: "6/4",

            tipo: "simple",

            pulsos: 6,

            subdivisiones: 2,

            agrupaciones: [

                "6"

            ]

        },


        "7/4": {

            nombre: "7/4",

            tipo: "irregular",

            pulsos: 7,

            subdivisiones: 2,

            agrupaciones: [

                "2+2+3",

                "2+3+2",

                "3+2+2"

            ]

        },


        // ----------------------------------------------------
        // COMPUESTOS
        // ----------------------------------------------------

        "6/8": {

            nombre: "6/8",

            tipo: "compuesto",

            pulsos: 2,

            subdivisiones: 3,

            agrupaciones: [

                "3+3"

            ]

        },


        "9/8": {

            nombre: "9/8",

            tipo: "compuesto",

            pulsos: 3,

            subdivisiones: 3,

            agrupaciones: [

                "3+3+3"

            ]

        },


        "12/8": {

            nombre: "12/8",

            tipo: "compuesto",

            pulsos: 4,

            subdivisiones: 3,

            agrupaciones: [

                "3+3+3+3"

            ]

        },


        // ----------------------------------------------------
        // IRREGULARES / DISPAR
        // ----------------------------------------------------

        "5/8": {

            nombre: "5/8",

            tipo: "irregular",

            pulsos: 2,

            subdivisiones: 1,

            agrupaciones: [

                "2+3",

                "3+2"

            ]

        },


        "7/8": {

            nombre: "7/8",

            tipo: "irregular",

            pulsos: 3,

            subdivisiones: 1,

            agrupaciones: [

                "2+2+3",

                "2+3+2",

                "3+2+2"

            ]

        },


        "11/8": {

            nombre: "11/8",

            tipo: "irregular",

            pulsos: 5,

            subdivisiones: 1,

            agrupaciones: [

                "2+2+2+2+3",

                "2+2+2+3+2",

                "2+2+3+2+2",

                "2+3+2+2+2",

                "3+2+2+2+2"

            ]

        }

    };



    // ========================================================
    // OBTENER CONFIGURACIÓN
    // ========================================================

    function obtenerConfiguracion() {

        return COMPASES[
            compasActual
        ];

    }



    // ========================================================
    // OBTENER AGRUPACIÓN
    // ========================================================

    function obtenerAgrupacion() {

        const config =
            obtenerConfiguracion();


        return agrupacionActual
            .split("+")
            .map(Number);

    }



    // ========================================================
    // CREAR PULSOS VISUALES
    // ========================================================

    function crearBeats() {

        const beats =
            wrapper.querySelector(
                "#beats"
            );


        if (!beats) {

            return;

        }


        beats.innerHTML = "";


        const config =
            obtenerConfiguracion();


        const cantidad =
            config.pulsos;


        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            const beat =
                document.createElement(
                    "div"
                );


            beat.className =
                "beat";


            beat.style.width =
                "18px";


            beat.style.height =
                "18px";


            beat.style.borderRadius =
                "50%";


            beat.style.background =
                "rgba(100,116,139,0.35)";


            beat.style.transition =
                "all 100ms ease";


            beats.appendChild(
                beat
            );

        }

    }



    // ========================================================
    // INTERFAZ
    // ========================================================

    const wrapper =
        document.createElement("div");


    wrapper.className =
        "max-w-xl mx-auto";


    wrapper.innerHTML = `

        <div class="text-center mb-8">

            <div class="text-4xl mb-4">
                ⏱️
            </div>

            <h2 class="text-3xl font-black">
                Metrónomo
            </h2>

            <p class="text-slate-400 mt-3">
                Un pulso preciso para practicar,
                ensayar y estudiar.
            </p>

        </div>



        <div
            class="
                bg-slate-900/70
                border
                border-white/10
                rounded-3xl
                p-6
                md:p-8
            "
        >


            <!-- ========================================= -->
            <!-- BPM -->
            <!-- ========================================= -->

            <div class="text-center">

                <div
                    class="
                        text-xs
                        uppercase
                        tracking-widest
                        text-slate-500
                        mb-2
                    "
                >
                    Tempo
                </div>


                <div
                    id="metronomoBpm"
                    class="
                        text-7xl
                        font-black
                        text-indigo-400
                    "
                >
                    100
                </div>


                <div
                    class="
                        text-sm
                        text-slate-500
                        mt-1
                    "
                >
                    BPM
                </div>

            </div>



            <!-- ========================================= -->
            <!-- SLIDER BPM -->
            <!-- ========================================= -->

            <div class="mt-8">

                <input
                    id="metronomoSlider"
                    type="range"
                    min="40"
                    max="240"
                    value="100"
                    class="w-full accent-indigo-500"
                >

                <div
                    class="
                        flex
                        justify-between
                        text-xs
                        text-slate-500
                        mt-2
                    "
                >

                    <span>40</span>

                    <span>240</span>

                </div>

            </div>



            <!-- ========================================= -->
            <!-- CONTROLES BPM -->
            <!-- ========================================= -->

            <div
                class="
                    grid
                    grid-cols-3
                    gap-3
                    mt-6
                "
            >

                <button
                    id="bpmMenos"
                    class="
                        p-3
                        rounded-xl
                        bg-slate-800
                        hover:bg-slate-700
                        font-bold
                    "
                >
                    −5
                </button>


                <button
                    id="bpmReset"
                    class="
                        p-3
                        rounded-xl
                        bg-slate-800
                        hover:bg-slate-700
                        font-bold
                    "
                >
                    100
                </button>


                <button
                    id="bpmMas"
                    class="
                        p-3
                        rounded-xl
                        bg-slate-800
                        hover:bg-slate-700
                        font-bold
                    "
                >
                    +5
                </button>

            </div>



            <!-- ========================================= -->
            <!-- COMPÁS -->
            <!-- ========================================= -->

            <div class="mt-8">

                <div
                    class="
                        text-xs
                        uppercase
                        tracking-widest
                        text-slate-500
                        mb-3
                    "
                >
                    Compás
                </div>


                <select
                    id="metronomoCompas"
                    class="
                        w-full
                        p-4
                        rounded-xl
                        bg-slate-800
                        border
                        border-white/10
                        text-white
                        font-bold
                    "
                >

                    <optgroup label="Compases simples">

                        <option value="2/4">
                            2/4
                        </option>

                        <option value="3/4">
                            3/4
                        </option>

                        <option value="4/4" selected>
                            4/4
                        </option>

                        <option value="5/4">
                            5/4
                        </option>

                        <option value="6/4">
                            6/4
                        </option>

                        <option value="7/4">
                            7/4
                        </option>

                    </optgroup>


                    <optgroup label="Compases compuestos">

                        <option value="6/8">
                            6/8
                        </option>

                        <option value="9/8">
                            9/8
                        </option>

                        <option value="12/8">
                            12/8
                        </option>

                    </optgroup>


                    <optgroup label="Compases irregulares">

                        <option value="5/8">
                            5/8
                        </option>

                        <option value="7/8">
                            7/8
                        </option>

                        <option value="11/8">
                            11/8
                        </option>

                    </optgroup>

                </select>

            </div>



            <!-- ========================================= -->
            <!-- AGRUPACIÓN -->
            <!-- ========================================= -->

            <div
                id="agrupacionContainer"
                class="mt-5"
            >

                <div
                    class="
                        text-xs
                        uppercase
                        tracking-widest
                        text-slate-500
                        mb-3
                    "
                >
                    Agrupación
                </div>


                <select
                    id="metronomoAgrupacion"
                    class="
                        w-full
                        p-4
                        rounded-xl
                        bg-slate-800
                        border
                        border-white/10
                        text-white
                        font-bold
                    "
                >
                </select>


                <p
                    id="descripcionCompas"
                    class="
                        text-xs
                        text-slate-500
                        mt-3
                        leading-relaxed
                    "
                ></p>

            </div>



            <!-- ========================================= -->
            <!-- PULSO VISUAL -->
            <!-- ========================================= -->

            <div
                class="
                    flex
                    justify-center
                    gap-3
                    my-8
                "
                id="beats"
            >
            </div>



            <!-- ========================================= -->
            <!-- PLAY -->
            <!-- ========================================= -->

            <button
                id="metronomoPlay"
                class="
                    w-full
                    p-5
                    rounded-2xl
                    bg-indigo-600
                    hover:bg-indigo-500
                    font-black
                    text-lg
                    transition
                "
            >
                ▶ Iniciar
            </button>



            <!-- ========================================= -->
            <!-- VOLUMEN -->
            <!-- ========================================= -->

            <div class="mt-8">

                <div
                    class="
                        flex
                        justify-between
                        text-xs
                        text-slate-500
                        mb-2
                    "
                >

                    <span>
                        Volumen
                    </span>

                    <span id="volumenValor">
                        80%
                    </span>

                </div>


                <input
                    id="metronomoVolumen"
                    type="range"
                    min="0"
                    max="100"
                    value="80"
                    class="w-full accent-indigo-500"
                >

            </div>



        </div>

    `;


    contenedor.appendChild(
        wrapper
    );



    // ========================================================
    // REFERENCIAS
    // ========================================================

    const bpmDisplay =
        wrapper.querySelector(
            "#metronomoBpm"
        );


    const slider =
        wrapper.querySelector(
            "#metronomoSlider"
        );


    const botonPlay =
        wrapper.querySelector(
            "#metronomoPlay"
        );


    const botonMenos =
        wrapper.querySelector(
            "#bpmMenos"
        );


    const botonMas =
        wrapper.querySelector(
            "#bpmMas"
        );


    const botonReset =
        wrapper.querySelector(
            "#bpmReset"
        );


    const volumenSlider =
        wrapper.querySelector(
            "#metronomoVolumen"
        );


    const volumenValor =
        wrapper.querySelector(
            "#volumenValor"
        );


    const selectorCompas =
        wrapper.querySelector(
            "#metronomoCompas"
        );


    const selectorAgrupacion =
        wrapper.querySelector(
            "#metronomoAgrupacion"
        );


    const descripcionCompas =
        wrapper.querySelector(
            "#descripcionCompas"
        );



    // ========================================================
    // ACTUALIZAR AGRUPACIONES
    // ========================================================

    function actualizarAgrupaciones() {

        const config =
            obtenerConfiguracion();


        selectorAgrupacion.innerHTML =
            "";


        config.agrupaciones.forEach(
            agrupacion => {

                const opcion =
                    document.createElement(
                        "option"
                    );


                opcion.value =
                    agrupacion;


                opcion.innerText =
                    agrupacion;


                selectorAgrupacion.appendChild(
                    opcion
                );

            }
        );


        agrupacionActual =
            config.agrupaciones[0];


        selectorAgrupacion.value =
            agrupacionActual;


        actualizarDescripcion();

    }



    // ========================================================
    // DESCRIPCIÓN DEL COMPÁS
    // ========================================================

    function actualizarDescripcion() {

        const config =
            obtenerConfiguracion();


        let texto = "";


        if (
            config.tipo ===
            "simple"
        ) {

            texto =
                `Compás simple: ${config.pulsos} pulsos por compás.`;

        }


        else if (
            config.tipo ===
            "compuesto"
        ) {

            texto =
                `Compás compuesto: ${config.pulsos} pulsos grandes, cada uno dividido en 3.`;

        }


        else {

            texto =
                `Compás irregular: agrupación ${agrupacionActual}.`;

        }


        descripcionCompas.innerText =
            texto;

    }



    // ========================================================
    // ACTUALIZAR BPM
    // ========================================================

    function actualizarBPM(
        nuevoBpm
    ) {

        bpm =
            Math.max(
                40,
                Math.min(
                    240,
                    nuevoBpm
                )
            );


        bpmDisplay.innerText =
            bpm;


        slider.value =
            bpm;


        if (
            reproduciendo
        ) {

            reiniciarIntervalo();

        }

    }



    // ========================================================
    // PULSO
    // ========================================================

    function producirPulso() {

        if (
            !reproduciendo
        ) {

            return;

        }


        const config =
            obtenerConfiguracion();


        const beats =
            wrapper.querySelectorAll(
                ".beat"
            );


        beatActual =
            (
                beatActual + 1
            ) %
            config.pulsos;


        beats.forEach(
            beat => {

                beat.style.transform =
                    "scale(1)";

                beat.style.background =
                    "rgba(100,116,139,0.35)";

            }
        );


        const beat =
            beats[
                beatActual
            ];


        if (
            beat
        ) {

            beat.style.transform =
                "scale(1.45)";


            beat.style.background =
                beatActual === 0
                    ? "#818cf8"
                    : "#64748b";

        }


        reproducirClick(
            beatActual === 0
        );

    }



    // ========================================================
    // CLICK
    // ========================================================

    function reproducirClick(
        acento
    ) {

        const ahora =
            Tone.now();


        const frecuencia =
            acento
                ? 1200
                : 800;


        const duracion =
            acento
                ? 0.06
                : 0.04;


        const volumenFinal =
            Math.max(
                0.001,
                volumen
            );


        const click =
            new Tone.Oscillator(
                frecuencia,
                "sine"
            ).toDestination();


        const envelope =
            new Tone.Gain(
                volumenFinal
            ).toDestination();


        click.disconnect();


        click.connect(
            envelope
        );


        envelope.gain.setValueAtTime(
            volumenFinal,
            ahora
        );


        envelope.gain.exponentialRampToValueAtTime(
            0.001,
            ahora + duracion
        );


        click.start(
            ahora
        );


        click.stop(
            ahora + duracion
        );

    }



    // ========================================================
    // INTERVALO
    // ========================================================

    function iniciarIntervalo() {

        const milisegundos =
            60000 /
            bpm;


        producirPulso();


        intervalo =
            setInterval(
                producirPulso,
                milisegundos
            );

    }



    function detenerIntervalo() {

        if (
            intervalo
        ) {

            clearInterval(
                intervalo
            );


            intervalo =
                null;

        }

    }



    function reiniciarIntervalo() {

        detenerIntervalo();


        iniciarIntervalo();

    }



    // ========================================================
    // PLAY / PAUSA
    // ========================================================

    async function alternar() {

        await iniciarAudio();


        if (
            reproduciendo
        ) {

            reproduciendo =
                false;


            detenerIntervalo();


            botonPlay.innerText =
                "▶ Iniciar";


            const beats =
                wrapper.querySelectorAll(
                    ".beat"
                );


            beats.forEach(
                beat => {

                    beat.style.transform =
                        "scale(1)";

                    beat.style.background =
                        "rgba(100,116,139,0.35)";

                }
            );

        }

        else {

            reproduciendo =
                true;


            beatActual =
                -1;


            botonPlay.innerText =
                "⏸ Pausar";


            iniciarIntervalo();

        }

    }



    // ========================================================
    // CAMBIO DE COMPÁS
    // ========================================================

    selectorCompas.onchange =
        function() {

            const estabaReproduciendo =
                reproduciendo;


            if (
                reproduciendo
            ) {

                detenerIntervalo();

            }


            compasActual =
                this.value;


            beatActual =
                -1;


            actualizarAgrupaciones();


            crearBeats();


            if (
                estabaReproduciendo
            ) {

                iniciarIntervalo();

            }

        };



    // ========================================================
    // CAMBIO DE AGRUPACIÓN
    // ========================================================

    selectorAgrupacion.onchange =
        function() {

            agrupacionActual =
                this.value;


            actualizarDescripcion();

        };



    // ========================================================
    // EVENTOS BPM
    // ========================================================

    slider.oninput =
        function() {

            actualizarBPM(
                Number(
                    this.value
                )
            );

        };


    botonMenos.onclick =
        function() {

            actualizarBPM(
                bpm - 5
            );

        };


    botonMas.onclick =
        function() {

            actualizarBPM(
                bpm + 5
            );

        };


    botonReset.onclick =
        function() {

            actualizarBPM(
                100
            );

        };


    botonPlay.onclick =
        alternar;



    // ========================================================
    // VOLUMEN
    // ========================================================

    volumenSlider.oninput =
        function() {

            volumen =
                Number(
                    this.value
                ) / 100;


            volumenValor.innerText =
                `${this.value}%`;

        };



    // ========================================================
    // INICIALIZAR
    // ========================================================

    actualizarAgrupaciones();

    crearBeats();



    // ========================================================
    // LIMPIEZA
    // ========================================================

    contenedor._limpiarMetronomo =
        function() {

            reproduciendo =
                false;


            detenerIntervalo();

        };

};

