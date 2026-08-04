
// ============================================================
// ARMONÍA ACTIVA — LABORATORIO
// js/lab.js
// ============================================================
//
// Laboratorio principal
//
// El Laboratorio funciona como una caja de herramientas.
// Cada herramienta se registra mediante HERRAMIENTAS.
//
// Piano, metrónomo, afinador, etc. son herramientas
// independientes.
//
// ============================================================



// ============================================================
// ELEMENTOS PRINCIPALES
// ============================================================

const panel =
    document.getElementById("labPanel");

const botonesModulo =
    document.querySelectorAll(".modulo");



// ============================================================
// ESTADO GENERAL
// ============================================================

const estadoLab = {

    modulo: "herramientas",

    herramientaActual: null

};



// ============================================================
// HERRAMIENTAS
// ============================================================
//
// Cada herramienta puede estar definida en otro archivo.
//
// Ejemplo:
//
// HERRAMIENTAS.piano
// HERRAMIENTAS.metronomo
//
// ============================================================

const herramientasDisponibles = {

    piano: {

        nombre:
            "Piano interactivo",

        icono:
            "🎹",

        descripcion:
            "Explorá notas, alturas y identificación automática de acordes.",

        render:
            (
                typeof HERRAMIENTAS !== "undefined" &&
                typeof HERRAMIENTAS.piano === "function"
            )
                ? HERRAMIENTAS.piano
                : null

    },


    metronomo: {

        nombre:
            "Metrónomo",

        icono:
            "⏱️",

        descripcion:
            "Un pulso preciso para practicar y estudiar.",

        render:
            (
                typeof HERRAMIENTAS !== "undefined" &&
                typeof HERRAMIENTAS.metronomo === "function"
            )
                ? HERRAMIENTAS.metronomo
                : null

    }

};



// ============================================================
// MOSTRAR HERRAMIENTAS
// ============================================================

function renderHerramientas() {

    if (!panel) {

        return;

    }


    estadoLab.modulo =
        "herramientas";

    estadoLab.herramientaActual =
        null;


    actualizarBotonModulo(
        "herramientas"
    );


    panel.innerHTML = `

        <div class="panel-header">

            <h2>
                Herramientas
            </h2>

            <p>
                Una caja de herramientas para practicar,
                experimentar y analizar música.
            </p>

        </div>


        <div
            class="herramientas-grid"
            id="herramientasGrid">

        </div>

    `;


    const grid =
        document.getElementById(
            "herramientasGrid"
        );


    if (!grid) {

        return;

    }


    Object.entries(
        herramientasDisponibles
    ).forEach(
        (
            [id, herramienta]
        ) => {

            const boton =
                document.createElement(
                    "button"
                );


            boton.type =
                "button";


            boton.className =
                "herramienta-card";


            boton.dataset.herramienta =
                id;


            boton.innerHTML = `

                <span class="herramienta-icono">

                    ${herramienta.icono}

                </span>


                <span class="herramienta-contenido">

                    <strong>
                        ${herramienta.nombre}
                    </strong>

                    <small>
                        ${herramienta.descripcion}
                    </small>

                </span>

            `;


            grid.appendChild(
                boton
            );

        }
    );

}



// ============================================================
// ABRIR HERRAMIENTA
// ============================================================

function abrirHerramienta(
    id
) {

    const herramienta =
        herramientasDisponibles[id];


    if (!herramienta) {

        console.warn(
            "Herramienta no encontrada:",
            id
        );

        return;

    }


    estadoLab.modulo =
        "herramientas";


    estadoLab.herramientaActual =
        id;


    actualizarBotonModulo(
        "herramientas"
    );


    if (
        typeof herramienta.render ===
        "function"
    ) {

        herramienta.render(
            panel
        );

        return;

    }


    mostrarHerramientaNoDisponible(
        herramienta
    );

}



// ============================================================
// HERRAMIENTA NO DISPONIBLE
// ============================================================

function mostrarHerramientaNoDisponible(
    herramienta
) {

    if (!panel) {

        return;

    }


    panel.innerHTML = `

        <div class="panel-header">

            <h2>

                ${herramienta.icono}
                ${herramienta.nombre}

            </h2>

            <p>

                ${herramienta.descripcion}

            </p>

        </div>


        <div class="mensaje-lab">

            Esta herramienta está registrada,
            pero su módulo todavía no fue cargado.

            <br><br>

            Revisá que el archivo correspondiente
            esté incluido antes de <strong>lab.js</strong>.

        </div>

    `;

}



// ============================================================
// VOLVER A HERRAMIENTAS
// ============================================================

function volverHerramientas() {

    renderHerramientas();

}



// ============================================================
// ACTUALIZAR BOTÓN DE MÓDULO
// ============================================================

function actualizarBotonModulo(
    modulo
) {

    botonesModulo.forEach(
        boton => {

            boton.classList.toggle(
                "activo",
                boton.dataset.modulo ===
                modulo
            );

        }
    );

}



// ============================================================
// EVENTOS DE MÓDULOS
// ============================================================

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



// ============================================================
// CAMBIAR MÓDULO
// ============================================================

function cambiarModulo(
    modulo
) {

    estadoLab.modulo =
        modulo;


    actualizarBotonModulo(
        modulo
    );


    if (
        modulo === "herramientas"
    ) {

        renderHerramientas();

        return;

    }


    if (
        modulo === "sonido"
    ) {

        renderSonido();

        return;

    }


    if (
        modulo === "experimentos"
    ) {

        renderExperimentos();

        return;

    }


    console.warn(
        "Módulo desconocido:",
        modulo
    );

}



// ============================================================
// EVENTOS DE HERRAMIENTAS
// ============================================================

document.addEventListener(
    "click",
    event => {

        const boton =
            event.target.closest(
                "[data-herramienta]"
            );


        if (!boton) {

            return;

        }


        abrirHerramienta(
            boton.dataset.herramienta
        );

    }
);



// ============================================================
// SONIDO
// ============================================================

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

    `;

}



// ============================================================
// EXPERIMENTOS
// ============================================================

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

    `;

}



// ============================================================
// INICIO
// ============================================================
//
// Importante:
//
// El laboratorio YA NO ARRANCA EN EL PIANO.
//
// Arranca mostrando la caja de herramientas.
//
// ============================================================

if (panel) {

    renderHerramientas();

}


console.log(
    "🧪 Laboratorio de Armonía Activa iniciado correctamente."
);

