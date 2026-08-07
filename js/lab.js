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
// LIMPIAR HERRAMIENTA ANTERIOR
// ============================================================
//
// Cada herramienta puede registrar panel._limpiarHerramienta
// (una función) para liberar audio, timers, animaciones, etc.
// antes de que el Laboratorio la reemplace por otra.
//
// Sin esto, por ejemplo, el metrónomo podía quedar sonando
// en segundo plano para siempre después de salir de él,
// y volver a abrirlo apilaba un segundo intervalo encima
// del primero (sonando fuera de sincro).
//
// ============================================================

function limpiarHerramientaActual() {

    if (
        !panel
    ) {

        return;

    }


    if (
        typeof panel._limpiarHerramienta ===
        "function"
    ) {

        try {

            panel._limpiarHerramienta();

        }

        catch (error) {

            console.error(
                "Error al limpiar la herramienta anterior:",
                error
            );

        }

    }


    panel._limpiarHerramienta =
        null;

}



// ============================================================
// MARCAR TARJETA ACTIVA EN EL CATÁLOGO
// ============================================================

function marcarTarjetaActiva(
    id
) {

    document
        .querySelectorAll(
            "[data-herramienta]"
        )
        .forEach(
            boton => {

                boton.classList.toggle(
                    "activa",
                    boton.dataset.herramienta ===
                    id
                );

            }
        );

}



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
            "Tocá con el mouse, el dedo o tu teclado, y mirá en vivo qué acorde estás formando.",

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
            "Un pulso preciso al milisegundo, hasta en compases compuestos e irregulares.",

        render:
            (
                typeof HERRAMIENTAS !== "undefined" &&
                typeof HERRAMIENTAS.metronomo === "function"
            )
                ? HERRAMIENTAS.metronomo
                : null

    },

    intervalos: {
        nombre: "Entrenador de Intervalos",
        icono: "👂",
        descripcion: "Entrená el oído reconociendo distancias entre notas, armónicas o melódicas.",
        render: typeof HERRAMIENTAS !== "undefined" && typeof HERRAMIENTAS.intervalos === "function" ? HERRAMIENTAS.intervalos : null
    },

    acordes: {
        nombre: "Constructor de Acordes",
        icono: "🎼",
        descripcion: "Armá acordes nota por nota y descubrí al instante qué estructura armónica forman.",
        render: typeof HERRAMIENTAS !== "undefined" && typeof HERRAMIENTAS.acordes === "function" ? HERRAMIENTAS.acordes : null
    },

    diccionario: {
        nombre: "Diccionario de Acordes",
        icono: "📖",
        descripcion: "Buscá cualquier acorde por su nombre y mirá sus notas en el piano y en el diapasón de guitarra.",
        render: typeof HERRAMIENTAS !== "undefined" && typeof HERRAMIENTAS.diccionario === "function" ? HERRAMIENTAS.diccionario : null
    },

    afinador: {
        nombre: "Afinador Cromático",
        icono: "🎧",
        descripcion: "Afiná tu instrumento en tiempo real usando el micrófono.",
        render: typeof HERRAMIENTAS !== "undefined" && typeof HERRAMIENTAS.afinador === "function" ? HERRAMIENTAS.afinador : null
    },

    escalas: {
        nombre: "Explorador de Escalas",
        icono: "🎼",
        descripcion: "Mapeá escalas en piano/guitarra, descubrí acordes e improvisá con bases.",
        render: typeof HERRAMIENTAS !== "undefined" && typeof HERRAMIENTAS.escalas === "function" ? HERRAMIENTAS.escalas : null
    },

    circulo: {
            nombre: "Círculo de Quintas",
            icono: "🔄",
            descripcion: "Visualizá relaciones armónicas, armaduras de clave, acordes relativos y progresiones.",
            render: typeof HERRAMIENTAS !== "undefined" && typeof HERRAMIENTAS.circulo === "function" ? HERRAMIENTAS.circulo : null
        },

    rearmonizador: {
            nombre: "Rearmonizador Avanzado",
            icono: "🪄",
            descripcion: "Explorá sustituciones armónicas, dominantes secundarios, tritono y acordes de paso.",
            render: typeof HERRAMIENTAS !== "undefined" && typeof HERRAMIENTAS.rearmonizador === "function" ? HERRAMIENTAS.rearmonizador : null
        },

};



// ============================================================
// MOSTRAR HERRAMIENTAS
// ============================================================

function renderHerramientas() {

    if (!panel) {

        return;

    }


    limpiarHerramientaActual();


    estadoLab.modulo =
        "herramientas";

    estadoLab.herramientaActual =
        null;


    actualizarBotonModulo(
        "herramientas"
    );


    marcarTarjetaActiva(
        null
    );


    // El catálogo de herramientas ya está arriba, en el
    // HTML estático (#herramientasGrid). Antes este panel
    // volvía a dibujar una segunda copia idéntica acá abajo;
    // ahora simplemente mostramos una guía corta.

    panel.innerHTML = `

        <div class="panel-header">

            <h2>
                Elegí una herramienta
            </h2>

            <p>
                Tocá cualquiera de las tarjetas de arriba
                para empezar a practicar.
            </p>

        </div>

    `;

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


    // Si ya estábamos en esta misma herramienta,
    // no hace falta reconstruir nada.

    if (
        estadoLab.herramientaActual === id
    ) {

        return;

    }


    limpiarHerramientaActual();


    estadoLab.modulo =
        "herramientas";


    estadoLab.herramientaActual =
        id;


    actualizarBotonModulo(
        "herramientas"
    );


    marcarTarjetaActiva(
        id
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


    limpiarHerramientaActual();


    estadoLab.herramientaActual =
        null;


    marcarTarjetaActiva(
        null
    );


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


    limpiarHerramientaActual();


    estadoLab.herramientaActual =
        null;


    marcarTarjetaActiva(
        null
    );


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


// Si el usuario se va del Lab (por ejemplo tocando
// "Ruta" o "Perfil" en la navegación inferior), nos
// aseguramos de soltar audio y timers antes de irnos.

window.addEventListener(
    "pagehide",
    limpiarHerramientaActual
);


console.log(
    "🧪 Laboratorio de Armonía Activa iniciado correctamente."
);