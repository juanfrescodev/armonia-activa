// ============================================================
// ARMONÍA ACTIVA
// js/herramientas/piano.js
// ============================================================
//
// PIANO INTERACTIVO
//
// Herramienta independiente del Laboratorio.
//
// ============================================================



// ============================================================
// REGISTRO DE HERRAMIENTAS
// ============================================================

window.HERRAMIENTAS =
    window.HERRAMIENTAS ||
    {};



// ============================================================
// DATOS DEL PIANO
// ============================================================

const NOTAS_PIANO = [

    {
        id: "C4",
        nombre: "DO",
        tecla: "A",
        blanca: true,
        frecuencia: 261.63,
        midi: 60,
        color: "#818cf8"
    },

    {
        id: "C#4",
        nombre: "DO♯",
        tecla: "W",
        blanca: false,
        frecuencia: 277.18,
        midi: 61,
        color: "#a78bfa"
    },

    {
        id: "D4",
        nombre: "RE",
        tecla: "S",
        blanca: true,
        frecuencia: 293.66,
        midi: 62,
        color: "#c084fc"
    },

    {
        id: "D#4",
        nombre: "RE♯",
        tecla: "E",
        blanca: false,
        frecuencia: 311.13,
        midi: 63,
        color: "#e879f9"
    },

    {
        id: "E4",
        nombre: "MI",
        tecla: "D",
        blanca: true,
        frecuencia: 329.63,
        midi: 64,
        color: "#f472b6"
    },

    {
        id: "F4",
        nombre: "FA",
        tecla: "F",
        blanca: true,
        frecuencia: 349.23,
        midi: 65,
        color: "#fb7185"
    },

    {
        id: "F#4",
        nombre: "FA♯",
        tecla: "T",
        blanca: false,
        frecuencia: 369.99,
        midi: 66,
        color: "#fb7185"
    },

    {
        id: "G4",
        nombre: "SOL",
        tecla: "G",
        blanca: true,
        frecuencia: 392.00,
        midi: 67,
        color: "#fb923c"
    },

    {
        id: "G#4",
        nombre: "SOL♯",
        tecla: "Y",
        blanca: false,
        frecuencia: 415.30,
        midi: 68,
        color: "#fbbf24"
    },

    {
        id: "A4",
        nombre: "LA",
        tecla: "H",
        blanca: true,
        frecuencia: 440.00,
        midi: 69,
        color: "#facc15"
    },

    {
        id: "A#4",
        nombre: "LA♯",
        tecla: "U",
        blanca: false,
        frecuencia: 466.16,
        midi: 70,
        color: "#a3e635"
    },

    {
        id: "B4",
        nombre: "SI",
        tecla: "J",
        blanca: true,
        frecuencia: 493.88,
        midi: 71,
        color: "#4ade80"
    },

    {
        id: "C5",
        nombre: "DO",
        tecla: "K",
        blanca: true,
        frecuencia: 523.25,
        midi: 72,
        color: "#34d399"
    }

];



// ============================================================
// ESTADO DEL PIANO
// ============================================================

const estadoPiano = {

    panel: null,

    synth: null,

    audioIniciado: false,

    teclasPresionadas:
        new Set(),

    elementos: {},

    canvas: null,

    contexto: null

};



// ============================================================
// INICIAR AUDIO
// ============================================================

async function iniciarAudioPiano() {

    if (
        estadoPiano.audioIniciado
    ) {

        return;

    }


    await Tone.start();


    estadoPiano.synth =
        new Tone.PolySynth(
            Tone.Synth,
            {

                oscillator: {

                    type: "triangle"

                },

                envelope: {

                    attack: 0.01,

                    decay: 0.2,

                    sustain: 0.6,

                    release: 1.2

                }

            }
        );


    estadoPiano.synth.volume.value =
        -8;


    estadoPiano.synth.toDestination();


    estadoPiano.audioIniciado =
        true;

}



// ============================================================
// RENDER
// ============================================================

function renderPiano(
    panel
) {

    if (!panel) {

        return;

    }


    estadoPiano.panel =
        panel;


    estadoPiano.teclasPresionadas.clear();

    estadoPiano.elementos = {};


    panel.innerHTML = `

        <div class="herramienta-header">

            <button
                type="button"
                class="boton-volver"
                id="volverHerramientas">

                ← Herramientas

            </button>


            <div>

                <div class="herramienta-titulo">

                    <span>
                        🎹
                    </span>

                    <h2>
                        Piano interactivo
                    </h2>

                </div>


                <p>

                    Explorá notas, alturas y acordes.
                    Tocá directamente el teclado o usá
                    las teclas de tu computadora.

                </p>

            </div>

        </div>


        <div class="piano-herramienta">


            <!-- ========================================= -->
            <!-- PIANO -->
            <!-- ========================================= -->

            <div class="piano-wrapper">

                <div
                    id="pianoHerramienta"
                    class="piano">

                </div>

            </div>


            <!-- ========================================= -->
            <!-- INFORMACIÓN -->
            <!-- ========================================= -->

            <div class="informacion-musical">


                <div class="nota-actual">

                    <span>
                        Nota actual
                    </span>

                    <strong
                        id="pianoNotaActual">

                        —

                    </strong>

                </div>


                <div
                    id="pianoAcordeActual"
                    class="acorde-actual">

                    <span class="armonia-label">
                        ACORDE
                    </span>

                    <strong>
                        —
                    </strong>

                </div>


            </div>


            <!-- ========================================= -->
            <!-- VISUALIZADOR -->
            <!-- ========================================= -->

            <div
                id="visualizadorPiano"
                class="visualizador">


                <div class="visualizador-grid"></div>


                <!-- ESCALA MUSICAL -->

                <div
                    id="escalaAlturaPiano"
                    class="escala-altura">

                    <span data-midi="72">
                        C5
                    </span>

                    <span data-midi="71">
                        B4
                    </span>

                    <span data-midi="69">
                        A4
                    </span>

                    <span data-midi="67">
                        G4
                    </span>

                    <span data-midi="65">
                        F4
                    </span>

                    <span data-midi="64">
                        E4
                    </span>

                    <span data-midi="62">
                        D4
                    </span>

                    <span data-midi="60">
                        C4
                    </span>

                </div>


                <canvas
                    id="ondaCanvasPiano"
                    class="onda-canvas">
                </canvas>


                <div
                    id="visualizadorNucleoPiano"
                    class="visualizador-nucleo">

                    <div class="nucleo-brillo"></div>

                </div>


                <div class="visualizador-centro">

                    <div
                        id="visualizadorValorPiano"
                        class="visualizador-valor">

                        silencio

                    </div>

                </div>


                <div class="visualizador-glow"></div>


            </div>


            <!-- ========================================= -->
            <!-- SONIDOS ACTIVOS -->
            <!-- ========================================= -->

            <div
                class="acorde-actual sonidos-activos">

                <span class="acorde-label">

                    SONIDOS ACTIVOS

                </span>


                <div
                    id="pianoNotasActivas"
                    class="acorde-notas">

                    —

                </div>

            </div>


            <!-- ========================================= -->
            <!-- AYUDA -->
            <!-- ========================================= -->

            <div class="mensaje-lab">

                Usá las teclas

                <strong>
                    A W S E D F T G Y H U J K
                </strong>

                o tocá directamente el piano.

            </div>


        </div>

    `;


    const volver =
        document.getElementById(
            "volverHerramientas"
        );


    if (volver) {

        volver.addEventListener(
            "click",
            () => {

                if (
                    typeof volverHerramientas ===
                    "function"
                ) {

                    volverHerramientas();

                }

            }
        );

    }


    construirPiano();


    prepararVisualizadorPiano();


    posicionarEscalaPiano();


    iniciarVisualizacionPiano();


    // ========================================================
    // LIMPIEZA
    // ========================================================
    //
    // El Laboratorio llama a esto antes de mostrar otra
    // herramienta. Sin esto, si te vas con una nota
    // presionada (o el finger drag falló), la nota queda
    // sonando en segundo plano para siempre.
    //
    // ========================================================

    panel._limpiarHerramienta =
        function() {

            soltarTodasLasNotasPiano();


            if (
                animacionPiano
            ) {

                cancelAnimationFrame(
                    animacionPiano
                );


                animacionPiano =
                    null;

            }

        };

}



// ============================================================
// CONSTRUIR PIANO
// ============================================================

function construirPiano() {

    const piano =
        document.getElementById(
            "pianoHerramienta"
        );


    if (!piano) {

        return;

    }


    NOTAS_PIANO.forEach(
        (
            nota,
            index
        ) => {

            if (
                !nota.blanca
            ) {

                return;

            }


            const tecla =
                document.createElement(
                    "div"
                );


            tecla.className =
                "tecla-blanca";


            tecla.dataset.nota =
                nota.id;


            tecla.innerHTML = `

                <span class="tecla-nombre">

                    ${nota.nombre}

                </span>

                <span class="tecla-computadora">

                    ${nota.tecla}

                </span>

            `;


            estadoPiano.elementos[
                nota.id
            ] = {

                elemento: tecla

            };


            tecla.addEventListener(
                "pointerdown",
                event => {

                    event.preventDefault();


                    // Capturamos el puntero: así, aunque el dedo
                    // se deslice fuera de la tecla, el pointerup
                    // sigue llegando a ESTA tecla y no se pierde.

                    if (
                        tecla.setPointerCapture
                    ) {

                        try {

                            tecla.setPointerCapture(
                                event.pointerId
                            );

                        } catch (error) {}

                    }


                    tocarNotaPiano(
                        nota.id
                    );

                }
            );


            tecla.addEventListener(
                "pointerup",
                event => {

                    event.preventDefault();

                    soltarNotaPiano(
                        nota.id
                    );

                }
            );


            // pointercancel: el navegador cancela el gesto
            // (scroll, gesto del sistema, multitouch, etc).
            // Sin esto, la nota queda sonando para siempre.

            tecla.addEventListener(
                "pointercancel",
                () => {

                    soltarNotaPiano(
                        nota.id
                    );

                }
            );


            tecla.addEventListener(
                "pointerleave",
                () => {

                    soltarNotaPiano(
                        nota.id
                    );

                }
            );


            const siguiente =
                NOTAS_PIANO[
                    index + 1
                ];


            if (
                siguiente &&
                !siguiente.blanca
            ) {

                const negra =
                    document.createElement(
                        "div"
                    );


                negra.className =
                    "tecla-negra";


                negra.dataset.nota =
                    siguiente.id;


                negra.innerHTML = `

                    <span>
                        ${siguiente.nombre}
                    </span>

                    <small>
                        ${siguiente.tecla}
                    </small>

                `;


                estadoPiano.elementos[
                    siguiente.id
                ] = {

                    elemento: negra

                };


                negra.addEventListener(
                    "pointerdown",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();


                        if (
                            negra.setPointerCapture
                        ) {

                            try {

                                negra.setPointerCapture(
                                    event.pointerId
                                );

                            } catch (error) {}

                        }


                        tocarNotaPiano(
                            siguiente.id
                        );

                    }
                );


                negra.addEventListener(
                    "pointerup",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();

                        soltarNotaPiano(
                            siguiente.id
                        );

                    }
                );


                negra.addEventListener(
                    "pointercancel",
                    event => {

                        event.stopPropagation();

                        soltarNotaPiano(
                            siguiente.id
                        );

                    }
                );


                negra.addEventListener(
                    "pointerleave",
                    event => {

                        event.stopPropagation();

                        soltarNotaPiano(
                            siguiente.id
                        );

                    }
                );


                tecla.appendChild(
                    negra
                );

            }


            piano.appendChild(
                tecla
            );

        }
    );

}



// ============================================================
// TOCAR NOTA
// ============================================================

async function tocarNotaPiano(
    notaID
) {

    if (
        estadoPiano.teclasPresionadas.has(
            notaID
        )
    ) {

        return;

    }


    // Marcamos la tecla como presionada y la
    // pintamos YA MISMO, sin esperar al audio.
    // Así la interfaz responde al instante en mobile,
    // aunque el sonido tarde unos milisegundos más.

    estadoPiano.teclasPresionadas.add(
        notaID
    );


    activarTeclaPiano(
        notaID
    );


    actualizarInterfazPiano();


    try {

        await iniciarAudioPiano();

    }

    catch (error) {

        console.error(
            "Error de audio:",
            error
        );


        estadoPiano.teclasPresionadas.delete(
            notaID
        );


        apagarTeclaPiano(
            notaID
        );


        actualizarInterfazPiano();


        return;

    }


    // --------------------------------------------
    // PUNTO CRÍTICO (mobile):
    //
    // Mientras esperábamos a que el audio esté listo,
    // pudo haber pasado que el usuario ya soltó la
    // tecla (toque rápido). Si no controlamos esto acá,
    // el ataque se dispara igual y la nota queda sonando
    // para siempre, porque el "soltar" ya pasó y no
    // encontró el synth creado.
    // --------------------------------------------

    const seguiaPresionada =
        estadoPiano.teclasPresionadas.has(
            notaID
        );


    estadoPiano.synth.triggerAttack(
        notaID
    );


    if (
        !seguiaPresionada
    ) {

        estadoPiano.synth.triggerRelease(
            notaID
        );

    }

}



// ============================================================
// SOLTAR NOTA
// ============================================================

function soltarNotaPiano(
    notaID
) {

    if (
        !estadoPiano.teclasPresionadas.has(
            notaID
        )
    ) {

        return;

    }


    estadoPiano.teclasPresionadas.delete(
        notaID
    );


    apagarTeclaPiano(
        notaID
    );


    actualizarInterfazPiano();


    // Si el synth ya existe, soltamos el sonido ahora.
    // Si todavía se está inicializando, no hacemos nada:
    // tocarNotaPiano() se encarga de soltarla apenas
    // termine de atacarla (ver "seguiaPresionada" arriba).

    if (
        estadoPiano.synth &&
        estadoPiano.audioIniciado
    ) {

        estadoPiano.synth.triggerRelease(
            notaID
        );

    }

}



// ============================================================
// SOLTAR TODAS LAS NOTAS (red de seguridad)
// ============================================================
//
// Se usa al salir de la herramienta, al perder el foco
// de la pestaña, o al navegar a otra sección: evita que
// alguna nota quede sonando sola por un evento táctil
// que el navegador nunca terminó de disparar
// (típico en mobile: pointercancel, cambio de pestaña,
// gesto de scroll interrumpido, etc).
//
// ============================================================

function soltarTodasLasNotasPiano() {

    Array.from(
        estadoPiano.teclasPresionadas
    ).forEach(
        notaID => {

            soltarNotaPiano(
                notaID
            );

        }
    );


    if (
        estadoPiano.synth
    ) {

        estadoPiano.synth.releaseAll();

    }

}



document.addEventListener(
    "visibilitychange",
    () => {

        if (
            document.hidden
        ) {

            soltarTodasLasNotasPiano();

        }

    }
);


window.addEventListener(
    "pagehide",
    soltarTodasLasNotasPiano
);


window.addEventListener(
    "blur",
    soltarTodasLasNotasPiano
);



// ============================================================
// ACTIVAR TECLA
// ============================================================

function activarTeclaPiano(
    notaID
) {

    const data =
        estadoPiano.elementos[
            notaID
        ];


    if (!data) {

        return;

    }


    data.elemento.classList.add(
        "activa"
    );

}



// ============================================================
// APAGAR TECLA
// ============================================================

function apagarTeclaPiano(
    notaID
) {

    const data =
        estadoPiano.elementos[
            notaID
        ];


    if (!data) {

        return;

    }


    data.elemento.classList.remove(
        "activa"
    );

}



// ============================================================
// ACTUALIZAR INTERFAZ
// ============================================================

function actualizarInterfazPiano() {

    const notas =
        Array.from(
            estadoPiano.teclasPresionadas
        );


    const notaActual =
        document.getElementById(
            "pianoNotaActual"
        );


    const acorde =
        document.getElementById(
            "pianoAcordeActual"
        );


    const notasActivas =
        document.getElementById(
            "pianoNotasActivas"
        );


    const visualizador =
        document.getElementById(
            "visualizadorPiano"
        );


    const valor =
        document.getElementById(
            "visualizadorValorPiano"
        );


    // --------------------------------------------
    // NOTA ACTUAL
    // --------------------------------------------

    if (notaActual) {

        if (
            notas.length === 0
        ) {

            notaActual.innerText =
                "—";

        }

        else {

            const ultima =
                notas[
                    notas.length - 1
                ];


            const datos =
                obtenerNotaPiano(
                    ultima
                );


            notaActual.innerText =
                datos
                    ? datos.nombre
                    : "—";

        }

    }


    // --------------------------------------------
    // NOTAS ACTIVAS
    // --------------------------------------------

    if (notasActivas) {

        if (
            notas.length === 0
        ) {

            notasActivas.innerHTML =
                "—";

        }

        else {

            notasActivas.innerHTML =
                notas
                    .map(
                        id => {

                            const datos =
                                obtenerNotaPiano(
                                    id
                                );


                            return `

                                <span
                                    class="nota-chip"
                                    style="
                                        --nota-color:${datos.color}
                                    "
                                >

                                    ${datos.nombre}

                                </span>

                            `;

                        }
                    )
                    .join("");

        }

    }


    // --------------------------------------------
    // ACORDE
    // --------------------------------------------

    if (acorde) {

        if (
            notas.length < 3
        ) {

            acorde.innerHTML = `

                <span class="armonia-label">

                    ACORDE

                </span>

                <strong>

                    —

                </strong>

            `;

        }

        else {

            const nombre =
                reconocerAcordePiano(
                    notas
                );


            acorde.innerHTML = `

                <span class="armonia-label">

                    ACORDE

                </span>

                <strong>

                    ${nombre || "No identificado"}

                </strong>

            `;

        }

    }


    // --------------------------------------------
    // VISUALIZADOR
    // --------------------------------------------

    if (visualizador) {

        visualizador.classList.toggle(
            "activo",
            notas.length > 0
        );

    }


    if (valor) {

        valor.innerText =
            notas.length > 0
                ? "sonando"
                : "silencio";

    }


    actualizarNucleoVisualizador();

}



// ============================================================
// OBTENER NOTA
// ============================================================

function obtenerNotaPiano(
    id
) {

    return NOTAS_PIANO.find(
        nota =>
            nota.id === id
    );

}



// ============================================================
// RECONOCIMIENTO DE ACORDES
// ============================================================

const CLASES_PIANO = {

    C: 0,
    "C#": 1,
    D: 2,
    "D#": 3,
    E: 4,
    F: 5,
    "F#": 6,
    G: 7,
    "G#": 8,
    A: 9,
    "A#": 10,
    B: 11

};


const PATRONES_PIANO = [

    {
        intervalos: [0, 4, 7],
        nombre: "mayor"
    },

    {
        intervalos: [0, 3, 7],
        nombre: "menor"
    },

    {
        intervalos: [0, 3, 6],
        nombre: "disminuido"
    },

    {
        intervalos: [0, 4, 8],
        nombre: "aumentado"
    },

    {
        intervalos: [0, 4, 7, 10],
        nombre: "7"
    },

    {
        intervalos: [0, 4, 7, 11],
        nombre: "maj7"
    },

    {
        intervalos: [0, 3, 7, 10],
        nombre: "m7"
    }

];



function reconocerAcordePiano(
    notas
) {

    const clases =
        [
            ...new Set(
                notas.map(
                    nota => {

                        const nombre =
                            nota.replace(
                                /[0-9]/g,
                                ""
                            );


                        return CLASES_PIANO[
                            nombre
                        ];

                    }
                )
            )
        ];


    for (
        const fundamental
        of clases
    ) {

        const intervalos =
            clases
                .map(
                    clase =>
                        (
                            clase -
                            fundamental +
                            12
                        ) % 12
                )
                .sort(
                    (
                        a,
                        b
                    ) =>
                        a - b
                );


        for (
            const patron
            of PATRONES_PIANO
        ) {

            if (
                intervalos.length !==
                patron.intervalos.length
            ) {

                continue;

            }


            const coincide =
                intervalos.every(
                    (
                        valor,
                        index
                    ) =>
                        valor ===
                        patron.intervalos[index]
                );


            if (!coincide) {

                continue;

            }


            const fundamentalNombre =
                Object.keys(
                    CLASES_PIANO
                ).find(
                    nombre =>
                        CLASES_PIANO[
                            nombre
                        ] ===
                        fundamental
                );


            return (
                fundamentalNombre +
                " " +
                patron.nombre
            );

        }

    }


    return null;

}



// ============================================================
// POSICIONAMIENTO DE LA ESCALA
// ============================================================
//
// IMPORTANTE:
//
// Las ondas usan MIDI 60 → 72.
//
// Las etiquetas ahora usan exactamente
// la misma escala vertical.
//
// De esta manera:
//
// C5  → misma altura que onda C5
// B4  → misma altura que onda B4
// A4  → misma altura que onda A4
// ...
// C4  → misma altura que onda C4
//
// ============================================================

function posicionarEscalaPiano() {

    const visualizador =
        document.getElementById(
            "visualizadorPiano"
        );


    const escala =
        document.getElementById(
            "escalaAlturaPiano"
        );


    if (
        !visualizador ||
        !escala
    ) {

        return;

    }


    const margen =
        32;


    const altura =
        visualizador.clientHeight;


    const alturaUtil =
        altura -
        margen * 2;


    const minimoMidi =
        60;


    const maximoMidi =
        72;


    const etiquetas =
        escala.querySelectorAll(
            "[data-midi]"
        );


    etiquetas.forEach(
        etiqueta => {

            const midi =
                Number(
                    etiqueta.dataset.midi
                );


            const proporcion =
                (
                    midi -
                    minimoMidi
                ) /
                (
                    maximoMidi -
                    minimoMidi
                );


            const y =
                altura -
                margen -
                proporcion *
                alturaUtil;


            etiqueta.style.position =
                "absolute";


            etiqueta.style.left =
                "0px";


            etiqueta.style.top =
                `${y}px`;


            etiqueta.style.transform =
                "translateY(-50%)";

        }
    );

}



// ============================================================
// REDIMENSIONAR ESCALA
// ============================================================

window.addEventListener(
    "resize",
    () => {

        if (
            document.getElementById(
                "visualizadorPiano"
            )
        ) {

            posicionarEscalaPiano();

            prepararVisualizadorPiano();

        }

    }
);



// ============================================================
// PREPARAR CANVAS
// ============================================================

function prepararVisualizadorPiano() {

    const canvas =
        document.getElementById(
            "ondaCanvasPiano"
        );


    const visualizador =
        document.getElementById(
            "visualizadorPiano"
        );


    if (
        !canvas ||
        !visualizador
    ) {

        return;

    }


    const rect =
        visualizador.getBoundingClientRect();


    const dpr =
        window.devicePixelRatio ||
        1;


    canvas.width =
        rect.width * dpr;


    canvas.height =
        rect.height * dpr;


    canvas.style.width =
        `${rect.width}px`;


    canvas.style.height =
        `${rect.height}px`;


    const contexto =
        canvas.getContext(
            "2d"
        );


    contexto.setTransform(
        dpr,
        0,
        0,
        dpr,
        0,
        0
    );


    estadoPiano.canvas =
        canvas;


    estadoPiano.contexto =
        contexto;

}



// ============================================================
// INICIAR VISUALIZACIÓN
// ============================================================

let animacionPiano =
    null;


function iniciarVisualizacionPiano() {

    if (
        animacionPiano
    ) {

        return;

    }


    function dibujar() {

        animacionPiano =
            requestAnimationFrame(
                dibujar
            );


        const visualizador =
            document.getElementById(
                "visualizadorPiano"
            );


        if (!visualizador) {

            return;

        }


        actualizarVisualizadorPiano(
            visualizador
        );


        dibujarOndasPiano();

    }


    dibujar();

}



// ============================================================
// ACTUALIZAR VISUALIZADOR
// ============================================================

function actualizarVisualizadorPiano(
    visualizador
) {

    const cantidad =
        estadoPiano.teclasPresionadas.size;


    const activo =
        cantidad > 0;


    const intensidad =
        activo
            ? Math.min(
                1,
                0.35 +
                cantidad * 0.18
            )
            : 0;


    visualizador.style.setProperty(
        "--energia",
        intensidad
    );


    if (activo) {

        visualizador.classList.add(
            "activo"
        );

    }

    else {

        visualizador.classList.remove(
            "activo"
        );

    }


    const valor =
        document.getElementById(
            "visualizadorValorPiano"
        );


    if (valor) {

        valor.innerText =
            activo
                ? "sonando"
                : "silencio";

    }

}



// ============================================================
// NÚCLEO DEL VISUALIZADOR
// ============================================================

function actualizarNucleoVisualizador() {

    const nucleo =
        document.getElementById(
            "visualizadorNucleoPiano"
        );


    if (!nucleo) {

        return;

    }


    const cantidad =
        estadoPiano.teclasPresionadas.size;


    const intensidad =
        cantidad > 0
            ? Math.min(
                1,
                0.35 +
                cantidad * 0.18
            )
            : 0;


    const escala =
        cantidad > 0
            ? 0.9 +
              intensidad * 0.45
            : 0.72;


    nucleo.style.transform =
        `
        translate(-50%, -50%)
        scale(${escala})
        `;

}



// ============================================================
// DIBUJAR ONDAS
// ============================================================

function dibujarOndasPiano() {

    const canvas =
        estadoPiano.canvas;


    const ctx =
        estadoPiano.contexto;


    if (
        !canvas ||
        !ctx
    ) {

        return;

    }


    const visualizador =
        document.getElementById(
            "visualizadorPiano"
        );


    if (!visualizador) {

        return;

    }


    const width =
        visualizador.clientWidth;


    const height =
        visualizador.clientHeight;


    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    const notas =
        Array.from(
            estadoPiano.teclasPresionadas
        );


    if (
        notas.length === 0
    ) {

        return;

    }


    const ahora =
        performance.now();


    notas.forEach(
        (
            notaID,
            indice
        ) => {

            const nota =
                NOTAS_PIANO.find(
                    item =>
                        item.id ===
                        notaID
                );


            if (!nota) {

                return;

            }


            dibujarOndaNotaPiano(
                ctx,
                width,
                height,
                nota,
                indice,
                notas.length,
                ahora
            );

        }
    );

}



// ============================================================
// DIBUJAR ONDA INDIVIDUAL
// ============================================================

function dibujarOndaNotaPiano(
    ctx,
    width,
    height,
    nota,
    indice,
    cantidad,
    tiempo
) {

    const margen =
        32;


    const alturaUtil =
        height -
        margen * 2;


    const minimoMidi =
        60;


    const maximoMidi =
        72;


    // ============================================
    // MISMA FÓRMULA QUE LAS ETIQUETAS
    // ============================================

    const proporcion =
        (
            nota.midi -
            minimoMidi
        ) /
        (
            maximoMidi -
            minimoMidi
        );


    const posicionBase =
        height -
        margen -
        proporcion *
        alturaUtil;


    // ============================================
    // SEPARACIÓN CUANDO SUENAN VARIAS NOTAS
    // ============================================

    let desplazamiento =
        0;


    if (
        cantidad > 1
    ) {

        desplazamiento =
            (
                indice -
                (cantidad - 1) / 2
            ) *
            10;

    }


    const y =
        posicionBase +
        desplazamiento;


    // ============================================
    // AMPLITUD
    // ============================================

    const amplitud =
        Math.min(
            22,
            10 +
            nota.midi -
            60
        );


    // ============================================
    // CICLOS
    // ============================================

    const ciclos =
        2.5 +
        (
            nota.frecuencia -
            261.63
        ) /
        (
            523.25 -
            261.63
        ) *
        2;


    // ============================================
    // MOVIMIENTO
    // ============================================

    const fase =
        tiempo *
        nota.frecuencia *
        0.00035;


    const color =
        nota.color;


    ctx.save();


    ctx.beginPath();


    for (
        let x = 0;
        x <= width;
        x += 2
    ) {

        const progreso =
            x / width;


        const angulo =
            progreso *
            Math.PI *
            2 *
            ciclos +
            fase;


        const onda =
            Math.sin(
                angulo
            );


        const yy =
            y +
            onda *
            amplitud;


        if (
            x === 0
        ) {

            ctx.moveTo(
                x,
                yy
            );

        }

        else {

            ctx.lineTo(
                x,
                yy
            );

        }

    }


    // ============================================
    // GLOW GRANDE
    // ============================================

    ctx.strokeStyle =
        color;


    ctx.lineWidth =
        8;


    ctx.globalAlpha =
        0.08;


    ctx.shadowBlur =
        25;


    ctx.shadowColor =
        color;


    ctx.stroke();


    // ============================================
    // GLOW MEDIO
    // ============================================

    ctx.lineWidth =
        4;


    ctx.globalAlpha =
        0.16;


    ctx.shadowBlur =
        14;


    ctx.stroke();


    // ============================================
    // ONDA PRINCIPAL
    // ============================================

    ctx.lineWidth =
        1.8;


    ctx.globalAlpha =
        0.9;


    ctx.shadowBlur =
        8;


    ctx.stroke();


    // ============================================
    // LÍNEA NÍTIDA
    // ============================================

    ctx.lineWidth =
        1;


    ctx.globalAlpha =
        1;


    ctx.shadowBlur =
        4;


    ctx.stroke();


    ctx.restore();


    dibujarEtiquetaNotaPiano(
        ctx,
        y,
        nota
    );

}



// ============================================================
// ETIQUETA DE NOTA
// ============================================================

function dibujarEtiquetaNotaPiano(
    ctx,
    y,
    nota
) {

    const x =
        24;


    ctx.save();


    ctx.font =
        "700 11px Inter, system-ui, sans-serif";


    ctx.textBaseline =
        "middle";


    ctx.fillStyle =
        nota.color;


    ctx.globalAlpha =
        0.9;


    ctx.fillText(
        nota.nombre,
        x,
        y
    );


    ctx.restore();

}



// ============================================================
// TECLADO DE COMPUTADORA
// ============================================================

window.addEventListener(
    "keydown",
    event => {

        if (
            event.repeat
        ) {

            return;

        }


        const tecla =
            event.key.toUpperCase();


        const nota =
            NOTAS_PIANO.find(
                item =>
                    item.tecla ===
                    tecla
            );


        if (!nota) {

            return;

        }


        /*
           Solamente respondemos al teclado
           cuando el piano está abierto.
        */

        if (
            !document.getElementById(
                "pianoHerramienta"
            )
        ) {

            return;

        }


        event.preventDefault();


        tocarNotaPiano(
            nota.id
        );

    }
);



window.addEventListener(
    "keyup",
    event => {

        const tecla =
            event.key.toUpperCase();


        const nota =
            NOTAS_PIANO.find(
                item =>
                    item.tecla ===
                    tecla
            );


        if (!nota) {

            return;

        }


        if (
            !document.getElementById(
                "pianoHerramienta"
            )
        ) {

            return;

        }


        event.preventDefault();


        soltarNotaPiano(
            nota.id
        );

    }
);



// ============================================================
// REGISTRAR HERRAMIENTA
// ============================================================

HERRAMIENTAS.piano =
    renderPiano;


console.log(
    "🎹 Herramienta Piano cargada correctamente."
);