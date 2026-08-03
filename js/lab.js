/* =========================================================
   ARMONÍA ACTIVA
   LABORATORIO
   js/lab.js

   Piano + visualizador musical polifónico
   ========================================================= */


/* =========================================================
   AUDIO
   ========================================================= */

let synthLab = null;

let analizadorLab = null;

let audioLabIniciado = false;

let animacionVisualizacion = null;


/* =========================================================
   DATOS MUSICALES
   ========================================================= */

const NOTAS_LAB = [

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


/* =========================================================
   ESTADO
   ========================================================= */

const estadoLab = {

    modulo: "piano",

    notaActual: null,

    teclasPresionadas:
        new Set(),

    elementos: {},

    canvas: null,

    contexto: null

};

/* =========================================================
   RECONOCIMIENTO DE ACORDES
   ========================================================= */

/*
   Cada nota tiene una clase de altura:

   C  = 0
   C# = 1
   D  = 2
   D# = 3
   E  = 4
   F  = 5
   F# = 6
   G  = 7
   G# = 8
   A  = 9
   A# = 10
   B  = 11
*/

const CLASES_NOTAS = {

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


/*
   Patrones de acordes.

   Los números representan
   distancias desde la fundamental.
*/

const PATRONES_ACORDES = [

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
        intervalos: [0, 2, 7],
        nombre: "sus2"
    },

    {
        intervalos: [0, 5, 7],
        nombre: "sus4"
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
    },

    {
        intervalos: [0, 3, 6, 10],
        nombre: "m7♭5"
    },

    {
        intervalos: [0, 3, 6, 9],
        nombre: "disminuido 7"
    }

];


/* =========================================================
   OBTENER NOMBRE DE NOTA
   ========================================================= */

function obtenerNombreNota(
    nota
) {

    /*
       C4  → C
       F#4 → F#
    */

    return nota.replace(
        /[0-9]/g,
        ""
    );

}


/* =========================================================
   OBTENER CLASE DE ALTURA
   ========================================================= */

function obtenerClaseNota(
    nota
) {

    const nombre =
        obtenerNombreNota(
            nota
        );


    return CLASES_NOTAS[
        nombre
    ];

}


/* =========================================================
   NORMALIZAR INTERVALOS
   ========================================================= */

function normalizarIntervalos(
    notas,
    fundamental
) {

    return notas
        .map(
            nota => {

                const clase =
                    obtenerClaseNota(
                        nota
                    );


                return (
                    clase -
                    fundamental +
                    12
                ) % 12;

            }
        )
        .sort(
            (
                a,
                b
            ) =>
                a - b
        );

}


/* =========================================================
   COMPARAR ARRAYS
   ========================================================= */

function arraysIguales(
    a,
    b
) {

    if (
        a.length !==
        b.length
    ) {

        return false;

    }


    for (
        let i = 0;
        i < a.length;
        i++
    ) {

        if (
            a[i] !== b[i]
        ) {

            return false;

        }

    }


    return true;

}


/* =========================================================
   RECONOCER ACORDE
   ========================================================= */

function reconocerAcorde(
    notas
) {

    /*
       Necesitamos al menos
       tres notas para hablar
       de un acorde.
    */

    if (
        notas.length < 3
    ) {

        return null;

    }


    /*
       Eliminamos notas repetidas
       de la misma clase.

       Ejemplo:

       C4 + C5 + E4 + G4

       se convierte en:

       C E G
    */

    const clasesUnicas =
        [
            ...new Set(
                notas.map(
                    obtenerClaseNota
                )
            )
        ];


    /*
       Ordenamos las clases.
    */

    clasesUnicas.sort(
        (
            a,
            b
        ) =>
            a - b
    );


    /*
       Probamos cada nota como
       posible fundamental.

       Esto permite detectar
       inversiones.
    */

    for (
        const fundamental
        of clasesUnicas
    ) {

        const intervalos =
            normalizarIntervalos(
                clasesUnicas.map(
                    clase =>
                        Object.keys(
                            CLASES_NOTAS
                        ).find(
                            nombre =>
                                CLASES_NOTAS[
                                    nombre
                                ] === clase
                        )
                ),
                fundamental
            );


        for (
            const patron
            of PATRONES_ACORDES
        ) {

            if (
                arraysIguales(
                    intervalos,
                    patron.intervalos
                )
            ) {

                const nombreFundamental =
                    Object.keys(
                        CLASES_NOTAS
                    ).find(
                        nombre =>
                            CLASES_NOTAS[
                                nombre
                            ] === fundamental
                    );


                /*
                   Determinar bajo real.

                   Si la nota más grave
                   no es la fundamental,
                   estamos ante una inversión.
                */

                const notasOrdenadas =
                    [...notas].sort(
                        (
                            a,
                            b
                        ) => {

                            const octavaA =
                                parseInt(
                                    a.match(
                                        /\d+/
                                    )[0]
                                );

                            const octavaB =
                                parseInt(
                                    b.match(
                                        /\d+/
                                    )[0]
                                );


                            if (
                                octavaA !==
                                octavaB
                            ) {

                                return (
                                    octavaA -
                                    octavaB
                                );

                            }


                            return (
                                obtenerClaseNota(a) -
                                obtenerClaseNota(b)
                            );

                        }
                    );


                const bajo =
                    obtenerNombreNota(
                        notasOrdenadas[0]
                    );


                let nombreAcorde =
                    nombreFundamental +
                    " " +
                    patron.nombre;


                if (
                    bajo !==
                    nombreFundamental
                ) {

                    nombreAcorde +=
                        " / " +
                        bajo;

                }


                return {

                    fundamental:
                        nombreFundamental,

                    tipo:
                        patron.nombre,

                    bajo:
                        bajo,

                    nombre:
                        nombreAcorde

                };

            }

        }

    }


    return null;

}


/* =========================================================
   ACTUALIZAR INFORMACIÓN ARMÓNICA
   ========================================================= */

function actualizarArmonia() {

    const elemento =
        document.getElementById(
            "acordeActual"
        );


    if (!elemento) {

        return;

    }


    const notas =
        [
            ...estadoLab.teclasPresionadas
        ];


    /*
       Ninguna nota.
    */

    if (
        notas.length === 0
    ) {

        elemento.innerHTML = `

            <span class="armonia-label">
                ACORDE
            </span>

            <strong>
                —
            </strong>

        `;

        elemento.classList.remove(
            "detectado"
        );

        return;

    }


    /*
       Una sola nota.
    */

    if (
        notas.length === 1
    ) {

        elemento.innerHTML = `

            <span class="armonia-label">
                NOTA
            </span>

            <strong>
                ${obtenerNombreNota(notas[0])}
            </strong>

        `;

        elemento.classList.remove(
            "detectado"
        );

        return;

    }


    /*
       Dos notas.

       Por ahora mostramos
       las notas simultáneas.
       Más adelante podemos
       convertir esto en detector
       de intervalos.
    */

    if (
        notas.length === 2
    ) {

        elemento.innerHTML = `

            <span class="armonia-label">
                DOS NOTAS
            </span>

            <strong>
                ${notas
                    .map(
                        obtenerNombreNota
                    )
                    .join(" · ")
                }
            </strong>

        `;

        elemento.classList.remove(
            "detectado"
        );

        return;

    }


    /*
       Tres o más notas:
       intentamos reconocer acorde.
    */

    const acorde =
        reconocerAcorde(
            notas
        );


    if (
        acorde
    ) {

        elemento.innerHTML = `

            <span class="armonia-label">
                ACORDE DETECTADO
            </span>

            <strong>
                ${acorde.nombre}
            </strong>

        `;

        elemento.classList.add(
            "detectado"
        );

    }

    else {

        elemento.innerHTML = `

            <span class="armonia-label">
                ACORDE
            </span>

            <strong>
                Combinación no identificada
            </strong>

        `;

        elemento.classList.remove(
            "detectado"
        );

    }

}


/* =========================================================
   AUDIO
   ========================================================= */

async function iniciarAudioLab() {

    if (audioLabIniciado) {

        return;

    }


    await Tone.start();


    synthLab =
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


    synthLab.volume.value = -8;


    analizadorLab =
        new Tone.Analyser(
            "fft",
            64
        );


    synthLab.connect(
        analizadorLab
    );


    analizadorLab.toDestination();


    audioLabIniciado = true;


    iniciarBucleVisualizacion();

}


/* =========================================================
   ELEMENTOS PRINCIPALES
   ========================================================= */

const panel =
    document.getElementById(
        "labPanel"
    );


const botonesModulo =
    document.querySelectorAll(
        ".modulo"
    );


/* =========================================================
   CAMBIO DE MÓDULO
   ========================================================= */

botonesModulo.forEach(
    boton => {

        boton.addEventListener(
            "click",
            () => {

                cambiarModulo(
                    boton.dataset.modulo
                );

            }
        );

    }
);


function cambiarModulo(
    modulo
) {

    estadoLab.modulo =
        modulo;


    botonesModulo.forEach(
        boton => {

            boton.classList.toggle(
                "activo",
                boton.dataset.modulo === modulo
            );

        }
    );


    if (
        modulo === "piano"
    ) {

        renderPiano();

    }


    else if (
        modulo === "sonido"
    ) {

        renderSonido();

    }


    else if (
        modulo === "experimentos"
    ) {

        renderExperimentos();

    }

}


/* =========================================================
   PIANO
   ========================================================= */

function renderPiano() {

    if (!panel) {

        return;

    }


    panel.innerHTML = `

        <div class="panel-header">

            <h2>
                Tocá una nota
            </h2>

            <p>
                Explorá libremente. Escuchá qué cambia
                cuando subís o bajás de altura.
            </p>

        </div>


        <div class="piano-wrapper">

            <div
                id="piano"
                class="piano">

            </div>

        </div>


        <div class="informacion-musical">

            <div class="nota-actual">

                <span>
                    Nota actual
                </span>

                <strong id="notaActual">
                    —
                </strong>

            </div>


            <div
                id="acordeActual"
                class="acorde-actual">

                <span class="armonia-label">
                    ACORDE
                </span>

                <strong>
                    —
                </strong>

            </div>

        </div>


        <div
            id="visualizador"
            class="visualizador">

            <div class="visualizador-grid"></div>


            <div class="escala-altura">

                <span>C5</span>

                <span>B4</span>

                <span>A4</span>

                <span>G4</span>

                <span>F4</span>

                <span>E4</span>

                <span>D4</span>

                <span>C4</span>

            </div>


            <canvas
                id="ondaCanvas"
                class="onda-canvas">
            </canvas>


            <div
                id="visualizadorNucleo"
                class="visualizador-nucleo">

                <div class="nucleo-brillo"></div>

            </div>


            <div class="visualizador-centro">

                <div
                    id="visualizadorValor"
                    class="visualizador-valor">

                    silencio

                </div>

            </div>


            <div
                id="notasVisuales"
                class="notas-visuales">
            </div>


            <div class="visualizador-glow"></div>

        </div>


        <div
            id="acordeActual"
            class="acorde-actual">

            <span class="acorde-label">
                SONIDOS ACTIVOS
            </span>

            <div
                id="acordeNotas"
                class="acorde-notas">

                —

            </div>

        </div>


        <div class="mensaje-lab">

            Usá las teclas

            <strong>
                A W S E D F T G Y H U J K
            </strong>

            o tocá directamente el piano.

        </div>

    `;


    construirPiano();


    prepararCanvas();


    iniciarBucleVisualizacion();

}


/* =========================================================
   CONSTRUIR PIANO
   ========================================================= */

function construirPiano() {

    const piano =
        document.getElementById(
            "piano"
        );


    if (!piano) {

        return;

    }


    estadoLab.elementos = {};


    NOTAS_LAB.forEach(
        (
            nota,
            index
        ) => {

            if (!nota.blanca) {

                return;

            }


            const tecla =
                document.createElement(
                    "div"
                );


            tecla.className =
                "tecla-blanca";


            tecla.innerText =
                nota.tecla;


            tecla.dataset.nota =
                nota.id;


            tecla.style.setProperty(
                "--nota-color",
                nota.color
            );


            estadoLab.elementos[
                nota.id
            ] = {

                elemento: tecla,

                blanca: true

            };


            /* -----------------------------------------
               TECLA BLANCA
               ----------------------------------------- */

            tecla.addEventListener(
                "pointerdown",
                event => {

                    event.preventDefault();

                    tocarNota(
                        nota.id
                    );

                }
            );


            tecla.addEventListener(
                "pointerup",
                () => {

                    soltarNota(
                        nota.id
                    );

                }
            );


            tecla.addEventListener(
                "pointerleave",
                () => {

                    soltarNota(
                        nota.id
                    );

                }
            );


            /* -----------------------------------------
               TECLA NEGRA
               ----------------------------------------- */

            const siguiente =
                NOTAS_LAB[
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


                negra.innerText =
                    siguiente.tecla;


                negra.dataset.nota =
                    siguiente.id;


                negra.style.setProperty(
                    "--nota-color",
                    siguiente.color
                );


                estadoLab.elementos[
                    siguiente.id
                ] = {

                    elemento: negra,

                    blanca: false

                };


                negra.addEventListener(
                    "pointerdown",
                    event => {

                        event.preventDefault();

                        event.stopPropagation();


                        tocarNota(
                            siguiente.id
                        );

                    }
                );


                negra.addEventListener(
                    "pointerup",
                    event => {

                        event.stopPropagation();


                        soltarNota(
                            siguiente.id
                        );

                    }
                );


                negra.addEventListener(
                    "pointerleave",
                    event => {

                        event.stopPropagation();


                        soltarNota(
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


/* =========================================================
   TOCAR NOTA
   ========================================================= */

async function tocarNota(
    nota
) {

    if (
        estadoLab.teclasPresionadas.has(
            nota
        )
    ) {

        return;

    }


    estadoLab.teclasPresionadas.add(
        nota
    );


    try {

        await iniciarAudioLab();


        synthLab.triggerAttack(
            nota
        );

    }

    catch (error) {

        console.error(
            "Error al iniciar audio:",
            error
        );


        estadoLab.teclasPresionadas.delete(
            nota
        );


        return;

    }


    estadoLab.notaActual =
        nota;


    actualizarNota(
        nota
    );


    activarTecla(
        nota
    );

    actualizarArmonia();


    actualizarAcorde();


    actualizarColorVisualizador();

}


/* =========================================================
   SOLTAR NOTA
   ========================================================= */

function soltarNota(
    nota
) {

    if (
        !estadoLab.teclasPresionadas.has(
            nota
        )
    ) {

        return;

    }


    estadoLab.teclasPresionadas.delete(
        nota
    );


    if (synthLab) {

        synthLab.triggerRelease(
            nota
        );

    }


    apagarTecla(
        nota
    );


    actualizarAcorde();

    actualizarArmonia();


    actualizarColorVisualizador();

}


/* =========================================================
   ACTUALIZAR NOTA
   ========================================================= */

function actualizarNota(
    nota
) {

    const datos =
        NOTAS_LAB.find(
            item =>
                item.id === nota
        );


    if (!datos) {

        return;

    }


    const elemento =
        document.getElementById(
            "notaActual"
        );


    const frecuencia =
        document.getElementById(
            "frecuenciaActual"
        );


    if (elemento) {

        elemento.innerText =
            datos.nombre;


        elemento.style.setProperty(
            "--nota-color",
            datos.color
        );


        elemento.classList.remove(
            "nota-cambio"
        );


        void elemento.offsetWidth;


        elemento.classList.add(
            "nota-cambio"
        );

    }


    if (frecuencia) {

        frecuencia.innerText =
            `${datos.id} · ${datos.frecuencia.toFixed(2)} Hz`;

    }

}


/* =========================================================
   ACTUALIZAR ACORDE
   ========================================================= */

function actualizarAcorde() {

    const contenedor =
        document.getElementById(
            "acordeNotas"
        );


    if (!contenedor) {

        return;

    }


    const notas =
        Array.from(
            estadoLab.teclasPresionadas
        );


    if (
        notas.length === 0
    ) {

        contenedor.innerHTML =
            "—";

        return;

    }


    contenedor.innerHTML =
        notas
            .map(
                notaID => {

                    const nota =
                        NOTAS_LAB.find(
                            item =>
                                item.id === notaID
                        );


                    if (!nota) {

                        return "";

                    }


                    return `

                        <span
                            class="nota-chip"
                            style="
                                --nota-color:${nota.color}
                            "
                        >

                            ${nota.nombre}

                        </span>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   ACTIVAR TECLA
   ========================================================= */

function activarTecla(
    nota
) {

    const data =
        estadoLab.elementos[
            nota
        ];


    if (!data) {

        return;

    }


    data.elemento.classList.add(
        "activa"
    );

}


/* =========================================================
   APAGAR TECLA
   ========================================================= */

function apagarTecla(
    nota
) {

    const data =
        estadoLab.elementos[
            nota
        ];


    if (!data) {

        return;

    }


    data.elemento.classList.remove(
        "activa"
    );

}


/* =========================================================
   CANVAS
   ========================================================= */

function prepararCanvas() {

    const canvas =
        document.getElementById(
            "ondaCanvas"
        );


    if (!canvas) {

        return;

    }


    const visualizador =
        document.getElementById(
            "visualizador"
        );


    if (!visualizador) {

        return;

    }


    const rect =
        visualizador.getBoundingClientRect();


    const dpr =
        window.devicePixelRatio || 1;


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


    estadoLab.canvas =
        canvas;


    estadoLab.contexto =
        contexto;

}


/* =========================================================
   REDIMENSIONAR CANVAS
   ========================================================= */

window.addEventListener(
    "resize",
    () => {

        if (
            estadoLab.modulo === "piano"
        ) {

            prepararCanvas();

        }

    }
);


/* =========================================================
   BUCLE DE VISUALIZACIÓN
   ========================================================= */

function iniciarBucleVisualizacion() {

    if (
        animacionVisualizacion
    ) {

        return;

    }


    function dibujar() {

        animacionVisualizacion =
            requestAnimationFrame(
                dibujar
            );


        const visualizador =
            document.getElementById(
                "visualizador"
            );


        if (!visualizador) {

            return;

        }


        actualizarVisualizador(
            visualizador
        );


        dibujarOndas();

    }


    dibujar();

}


/* =========================================================
   VISUALIZADOR GENERAL
   ========================================================= */

function actualizarVisualizador(
    visualizador
) {

    const cantidad =
        estadoLab.teclasPresionadas.size;


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
            "visualizadorValor"
        );


    if (valor) {

        valor.innerText =
            activo
                ? "sonando"
                : "silencio";

    }


    const nucleo =
        document.getElementById(
            "visualizadorNucleo"
        );


    if (nucleo) {

        const escala =
            activo
                ? 0.9 +
                  intensidad * 0.45
                : 0.72;


        nucleo.style.transform =
            `
            translate(-50%, -50%)
            scale(${escala})
            `;

    }

}


/* =========================================================
   ONDAS
   ========================================================= */

function dibujarOndas() {

    const canvas =
        estadoLab.canvas;


    const ctx =
        estadoLab.contexto;


    if (
        !canvas ||
        !ctx
    ) {

        return;

    }


    const visualizador =
        document.getElementById(
            "visualizador"
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
            estadoLab.teclasPresionadas
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
                NOTAS_LAB.find(
                    item =>
                        item.id === notaID
                );


            if (!nota) {

                return;

            }


            dibujarOndaNota(
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


/* =========================================================
   DIBUJAR ONDA INDIVIDUAL
   ========================================================= */

function dibujarOndaNota(
    ctx,
    width,
    height,
    nota,
    indice,
    cantidad,
    tiempo
) {

    /*
       Margen vertical.

       Esto evita que C4 y C5 queden
       pegados a los bordes.
    */

    const margen =
        32;


    const alturaUtil =
        height -
        margen * 2;


    /*
       MIDI 60 = C4
       MIDI 72 = C5

       Convertimos la nota en una posición
       vertical dentro del visualizador.
    */

    const minimoMidi =
        60;


    const maximoMidi =
        72;


    const proporcion =
        (
            nota.midi -
            minimoMidi
        ) /
        (
            maximoMidi -
            minimoMidi
        );


    /*
       En canvas Y crece hacia abajo,
       por eso invertimos.
    */

    const posicionBase =
        height -
        margen -
        proporcion *
        alturaUtil;


    /*
       Si hay varias notas muy cercanas,
       las desplazamos mínimamente para
       que no se tapen completamente.
    */

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


    /*
       Amplitud visual.
    */

    const amplitud =
        Math.min(
            22,
            10 +
            nota.midi -
            60
        );


    /*
       Frecuencia visual.

       Usamos la frecuencia musical real,
       pero reducimos la cantidad de ciclos
       para que la onda sea legible.
    */

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


    /*
       Fase animada.
    */

    const fase =
        tiempo *
        nota.frecuencia *
        0.00035;


    /*
       Color de la nota.
    */

    const color =
        nota.color;


    /*
       Halo.
    */

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


    /*
       Segunda capa de glow.
    */

    ctx.lineWidth =
        4;


    ctx.globalAlpha =
        0.16;


    ctx.shadowBlur =
        14;


    ctx.stroke();


    /*
       Línea principal.
    */

    ctx.lineWidth =
        1.8;


    ctx.globalAlpha =
        0.9;


    ctx.shadowBlur =
        8;


    ctx.stroke();


    /*
       Núcleo brillante.
    */

    ctx.lineWidth =
        1;


    ctx.globalAlpha =
        1;


    ctx.shadowBlur =
        4;


    ctx.stroke();


    ctx.restore();


    /*
       Etiqueta flotante de la nota.

       Solamente la dibujamos desde JS
       si el visualizador está activo.
    */

    dibujarEtiquetaNota(
        ctx,
        width,
        y,
        nota,
        indice
    );

}


/* =========================================================
   ETIQUETA DE NOTA
   ========================================================= */

function dibujarEtiquetaNota(
    ctx,
    width,
    y,
    nota,
    indice
) {

    const x =
        24;


    const texto =
        nota.nombre;


    ctx.save();


    ctx.font =
        "700 11px Inter, system-ui, sans-serif";


    ctx.textBaseline =
        "middle";


    ctx.fillStyle =
        nota.color;


    ctx.globalAlpha =
        0.85;


    ctx.fillText(
        texto,
        x,
        y
    );


    ctx.restore();

}


/* =========================================================
   COLOR GENERAL
   ========================================================= */

function actualizarColorVisualizador() {

    const visualizador =
        document.getElementById(
            "visualizador"
        );


    if (!visualizador) {

        return;

    }


    const notas =
        Array.from(
            estadoLab.teclasPresionadas
        );


    if (
        notas.length === 0
    ) {

        visualizador.style
            .setProperty(
                "--nota-color",
                "#818cf8"
            );

        return;

    }


    const primeraNota =
        NOTAS_LAB.find(
            nota =>
                nota.id === notas[0]
        );


    if (primeraNota) {

        visualizador.style
            .setProperty(
                "--nota-color",
                primeraNota.color
            );

    }

}


/* =========================================================
   TECLADO DE LA COMPUTADORA
   ========================================================= */

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
            NOTAS_LAB.find(
                nota =>
                    nota.tecla === tecla
            );


        if (!nota) {

            return;

        }


        event.preventDefault();


        tocarNota(
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
            NOTAS_LAB.find(
                nota =>
                    nota.tecla === tecla
            );


        if (!nota) {

            return;

        }


        event.preventDefault();


        soltarNota(
            nota.id
        );

    }
);


/* =========================================================
   MÓDULO SONIDO
   ========================================================= */

function renderSonido() {

    if (!panel) {

        return;

    }


    panel.innerHTML = `

        <div class="panel-header">

            <h2>
                Mirá el sonido
            </h2>

            <p>
                Acá vamos a experimentar con frecuencia,
                amplitud, ondas y otras propiedades del sonido.
            </p>

        </div>


        <div
            class="visualizador"
            id="visualizadorSonido">

            <div class="visualizador-centro">

                <div class="visualizador-valor">

                    Escuchá

                </div>

            </div>

        </div>


        <div class="experimento">

            <h3>
                Frecuencia
            </h3>

            <p>
                Una nota más aguda tiene una frecuencia mayor.
                Una nota más grave tiene una frecuencia menor.
            </p>

        </div>


        <div class="mensaje-lab">

            Próximamente vamos a convertir estas propiedades
            en visualizaciones interactivas.

        </div>

    `;

}


/* =========================================================
   MÓDULO EXPERIMENTOS
   ========================================================= */

function renderExperimentos() {

    if (!panel) {

        return;

    }


    panel.innerHTML = `

        <div class="panel-header">

            <h2>
                Experimentos
            </h2>

            <p>
                Herramientas para jugar con conceptos musicales
                y descubrir qué sucede cuando modificamos
                sus elementos.
            </p>

        </div>


        <div class="experimento">

            <h3>
                ✦ Sonido → imagen
            </h3>

            <p>
                Visualizaciones de frecuencia, amplitud,
                movimiento melódico y relaciones entre sonidos.
            </p>

        </div>


        <div class="experimento">

            <h3>
                🎹 Constructor
            </h3>

            <p>
                Construcción interactiva de intervalos,
                acordes y progresiones.
            </p>

        </div>


        <div class="experimento">

            <h3>
                🧪 Laboratorio de percepción
            </h3>

            <p>
                Experimentos para descubrir cómo percibimos
                altura, distancia, tensión y resolución.
            </p>

        </div>


        <div class="mensaje-lab">

            Este espacio va a crecer junto con el curso.

        </div>

    `;

}


/* =========================================================
   INICIO
   ========================================================= */

renderPiano();