
// ============================================================
// js/componentes/comparacion.js
//
// Componente principal de comparación.
//
// Usa:
// - UI.fadeIn()
// - UI.conBloqueo()
// - UI.marcarCorrecto()
// - UI.marcarIncorrecto()
// - UI.sonidoAcierto()
// - UI.sonidoError()
// - UI.avanzar()
//
// Compatible con la estructura actual de misiones.
// ============================================================

window.COMPONENTES = window.COMPONENTES || {};


COMPONENTES.comparacion = function (
    paso,
    contenedor,
    motor,
    render
) {


    // ========================================================
    // LIMPIAR CONTENEDOR
    // ========================================================

    contenedor.innerHTML = "";


    let respondido = false;


    // ========================================================
    // CARD PRINCIPAL
    // ========================================================

    const card =
        document.createElement("div");


    card.className =
        "space-y-6";


    contenedor.appendChild(card);


    UI.fadeIn(card);



    // ========================================================
    // PREGUNTA
    // ========================================================

    const titulo =
        document.createElement("h2");


    titulo.className =
        "text-xl font-bold text-indigo-400";


    titulo.innerText =
        paso.pregunta;


    card.appendChild(titulo);



    // ========================================================
    // EJEMPLOS
    // ========================================================

    const ejemplos =
        paso.ejemplos ??
        (paso.ejemplo
            ? [paso.ejemplo]
            : []);


    const bloqueEjemplos =
        document.createElement("div");


    bloqueEjemplos.className =
        "space-y-3";


    card.appendChild(
        bloqueEjemplos
    );



    ejemplos.forEach(
        (ejemplo) => {


            const boton =
                document.createElement("button");


            boton.className =
                `
                w-full
                p-4
                rounded-xl
                bg-slate-700
                hover:bg-slate-600
                font-bold
                transition-all
                duration-200
                `;


            boton.innerText =
                "🔊 Escuchar " +
                ejemplo.nombre;


            // ------------------------------------------------
            // Animación sutil al pasar el mouse
            // ------------------------------------------------

            UI.efectoBoton(
                boton
            );


            // ------------------------------------------------
            // Bloqueo contra doble click
            // ------------------------------------------------

            UI.conBloqueo(
                boton,
                async () => {


                    if (
                        ejemplo.melodia
                    ) {

                        await reproducirMelodia(
                            ejemplo.melodia
                        );

                    }

                    else if (
                        ejemplo.notas
                    ) {

                        await reproducirNotas(
                            ejemplo.notas
                        );

                    }

                },

                // La melodía ya tiene su propia duración.
                // Este margen evita reactivaciones inmediatas.

                250

            );


            bloqueEjemplos.appendChild(
                boton
            );

        }
    );



    // ========================================================
    // SEPARADOR
    // ========================================================

    const linea =
        document.createElement("hr");


    linea.className =
        "border-slate-700";


    card.appendChild(
        linea
    );



    // ========================================================
    // BLOQUE DE OPCIONES
    // ========================================================

    const bloqueOpciones =
        document.createElement("div");


    bloqueOpciones.className =
        "space-y-3";


    card.appendChild(
        bloqueOpciones
    );



    // ========================================================
    // MENSAJE DE FEEDBACK
    // ========================================================

    const mensaje =
        document.createElement("p");


    mensaje.className =
        "text-center text-sm min-h-[1.5rem]";


    card.appendChild(
        mensaje
    );



    // ========================================================
    // CREAR OPCIONES
    // ========================================================

    paso.opciones.forEach(
        (opcion, index) => {


            const boton =
                document.createElement("button");


            boton.className =
                `
                w-full
                p-4
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-500
                font-bold
                transition-all
                duration-200
                `;


            boton.innerText =
                opcion;


            UI.efectoBoton(
                boton
            );



            // =================================================
            // RESPUESTA
            // =================================================

            boton.onclick = () => {


                // ---------------------------------------------
                // Si ya respondió, no hacer nada.
                // ---------------------------------------------

                if (
                    respondido
                ) {

                    return;

                }



                // =============================================
                // RESPUESTA CORRECTA
                // =============================================

                if (
                    index === paso.correcta
                ) {


                    respondido = true;


                    // -----------------------------------------
                    // Desactivar todas las opciones
                    // -----------------------------------------

                    const botones =
                        bloqueOpciones.querySelectorAll(
                            "button"
                        );


                    botones.forEach(
                        (otroBoton) => {

                            otroBoton.disabled =
                                true;

                            otroBoton.style.cursor =
                                "default";

                        }
                    );



                    // -----------------------------------------
                    // Feedback visual
                    // -----------------------------------------

                    UI.marcarCorrecto(
                        boton
                    );


                    boton.innerText =
                        "✓ " + opcion;



                    // -----------------------------------------
                    // Sonido
                    // -----------------------------------------

                    UI.sonidoAcierto();



                    // -----------------------------------------
                    // Mensaje
                    // -----------------------------------------

                    mensaje.className =
                        `
                        text-center
                        text-sm
                        text-emerald-400
                        font-semibold
                        min-h-[1.5rem]
                        `;


                    mensaje.innerText =
                        "¡Correcto!";



                    // =========================================
                    // EXPLICACIÓN OPCIONAL
                    // =========================================

                    if (
                        paso.explicacion
                    ) {


                        const explicacion =
                            document.createElement("div");


                        explicacion.className =
                            `
                            p-4
                            rounded-xl
                            bg-emerald-900/40
                            border
                            border-emerald-600
                            text-emerald-200
                            `;


                        explicacion.innerText =
                            paso.explicacion;


                        card.appendChild(
                            explicacion
                        );


                        UI.fadeIn(
                            explicacion
                        );



                        // -------------------------------------
                        // Botón continuar
                        // -------------------------------------

                        const continuar =
                            document.createElement("button");


                        continuar.className =
                            `
                            w-full
                            p-4
                            rounded-xl
                            bg-indigo-600
                            hover:bg-indigo-500
                            font-bold
                            transition-all
                            duration-200
                            `;


                        continuar.innerText =
                            "Continuar";


                        UI.animarContinuar(
                            continuar
                        );


                        continuar.onclick =
                            () => {


                                if (
                                    continuar.disabled
                                ) {

                                    return;

                                }


                                continuar.disabled =
                                    true;


                                UI.avanzar(
                                    motor,
                                    render,
                                    terminarMision
                                );

                            };


                        card.appendChild(
                            continuar
                        );


                        UI.fadeIn(
                            continuar
                        );

                    }

                    else {


                        // -------------------------------------
                        // Sin explicación:
                        // avanzar automáticamente.
                        // -------------------------------------

                        setTimeout(
                            () => {


                                UI.avanzar(
                                    motor,
                                    render,
                                    terminarMision
                                );


                            },

                            900
                        );

                    }


                }



                // =============================================
                // RESPUESTA INCORRECTA
                // =============================================

                else {


                    UI.marcarIncorrecto(
                        boton
                    );


                    UI.sonidoError();



                    mensaje.className =
                        `
                        text-center
                        text-sm
                        text-red-400
                        font-semibold
                        min-h-[1.5rem]
                        `;


                    mensaje.innerText =
                        paso.explicacionError ||
                        "No es esa. Volvé a escuchar y prestá atención a la diferencia.";



                    // -----------------------------------------
                    // Recuperar botón después de la animación
                    // -----------------------------------------

                    setTimeout(
                        () => {


                            if (
                                respondido
                            ) {

                                return;

                            }


                            UI.restaurarOpcion(
                                boton,
                                opcion
                            );


                            UI.efectoBoton(
                                boton
                            );


                            mensaje.innerText =
                                "";


                        },

                        700
                    );

                }

            };


            bloqueOpciones.appendChild(
                boton
            );

        }
    );


};

