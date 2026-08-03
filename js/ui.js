// ============================================================
// js/ui.js
//
// Módulo compartido de interfaz para los componentes de misión.
//
// Incluye:
// - Sonido de feedback
// - Feedback visual de acierto/error
// - Animaciones sobrias
// - Transición entre pasos
// - Avance de misión
// - Bloqueo contra doble click
// ============================================================

window.UI = (function () {


    // ========================================================
    // SONIDOS DE FEEDBACK
    // ========================================================

    let sintUI = null;


    function obtenerSintetizadorUI() {

        if (!sintUI) {

            sintUI = new Tone.Synth({

                oscillator: {
                    type: "triangle"
                },

                envelope: {
                    attack: 0.01,
                    decay: 0.15,
                    sustain: 0,
                    release: 0.1
                }

            }).toDestination();


            sintUI.volume.value = -10;

        }


        return sintUI;

    }



    async function sonidoAcierto() {

        try {

            await iniciarAudio();

            const s = obtenerSintetizadorUI();

            const ahora = Tone.now();


            s.triggerAttackRelease(
                "C6",
                "16n",
                ahora
            );


            s.triggerAttackRelease(
                "E6",
                "16n",
                ahora + 0.09
            );

        }

        catch (error) {

            console.warn(
                "No se pudo reproducir el sonido de acierto.",
                error
            );

        }

    }



    async function sonidoError() {

        try {

            await iniciarAudio();

            const s = obtenerSintetizadorUI();


            s.triggerAttackRelease(
                "F3",
                "8n"
            );

        }

        catch (error) {

            console.warn(
                "No se pudo reproducir el sonido de error.",
                error
            );

        }

    }



    // ========================================================
    // ANIMACIÓN DE ENTRADA
    // ========================================================

    function fadeIn(el) {

        if (!el) return;


        el.style.opacity = "0";

        el.style.transform =
            "translateY(12px)";


        el.style.transition =
            "opacity 350ms ease, transform 350ms ease";


        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                el.style.opacity = "1";

                el.style.transform =
                    "translateY(0)";

            });

        });

    }



    // ========================================================
    // ANIMACIÓN DE APARICIÓN CON ESCALA
    // ========================================================

    function aparecer(el) {

        if (!el) return;


        el.style.opacity = "0";

        el.style.transform =
            "scale(0.96)";


        el.style.transition =
            "opacity 250ms ease, transform 250ms ease";


        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                el.style.opacity = "1";

                el.style.transform =
                    "scale(1)";

            });

        });

    }



    // ========================================================
    // PULSO DE ACIERTO
    // ========================================================

    function pulso(el) {

        if (!el) return;


        el.style.transition =
            "transform 150ms ease, box-shadow 150ms ease";


        el.style.transform =
            "scale(1.04)";


        el.style.boxShadow =
            "0 0 0 4px rgba(16, 185, 129, 0.18)";


        setTimeout(() => {

            el.style.transform =
                "scale(1)";


            el.style.boxShadow =
                "";

        }, 180);

    }



    // ========================================================
    // SACUDIDA DE ERROR
    // ========================================================

    function sacudir(el) {

        if (!el) return;


        const posiciones = [
            -7,
            7,
            -5,
            5,
            -2,
            2,
            0
        ];


        let indice = 0;


        el.style.transition =
            "transform 55ms ease";


        function siguiente() {

            el.style.transform =
                "translateX(" +
                posiciones[indice] +
                "px)";


            indice++;


            if (indice < posiciones.length) {

                setTimeout(
                    siguiente,
                    55
                );

            }

            else {

                el.style.transform =
                    "";

            }

        }


        siguiente();

    }



    // ========================================================
    // MARCAR RESPUESTA CORRECTA
    // ========================================================

    function marcarCorrecto(boton) {

        if (!boton) return;


        boton.classList.remove(
            "bg-indigo-600",
            "hover:bg-indigo-500",
            "bg-slate-700",
            "hover:bg-slate-600",
            "bg-red-600"
        );


        boton.classList.add(
            "bg-emerald-600"
        );


        boton.style.transition =
            "transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease";


        boton.style.boxShadow =
            "0 0 0 4px rgba(16, 185, 129, 0.15)";


        pulso(boton);

    }



    // ========================================================
    // MARCAR RESPUESTA INCORRECTA
    // ========================================================

    function marcarIncorrecto(boton) {

        if (!boton) return;


        boton.classList.remove(
            "bg-indigo-600",
            "hover:bg-indigo-500",
            "bg-slate-700",
            "hover:bg-slate-600",
            "bg-emerald-600"
        );


        boton.classList.add(
            "bg-red-600"
        );


        boton.style.boxShadow =
            "0 0 0 4px rgba(239, 68, 68, 0.12)";


        sacudir(boton);


        setTimeout(() => {

            boton.style.boxShadow =
                "";

        }, 450);

    }



    // ========================================================
    // RESTAURAR OPCIÓN
    // ========================================================

    function restaurarOpcion(
        boton,
        texto
    ) {

        if (!boton) return;


        boton.className =
            "w-full p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold transition-all duration-200";


        boton.innerText =
            texto;


        boton.style.transform =
            "";


        boton.style.boxShadow =
            "";

    }



    // ========================================================
    // AVANZAR AL SIGUIENTE PASO
    // ========================================================

    function avanzar(
        motor,
        render,
        terminarMisionFn
    ) {

        motor.siguientePaso();


        if (motor.termino()) {

            terminarMisionFn();

        }

        else {

            render();

        }

    }



    // ========================================================
    // BLOQUEO CONTRA DOBLE CLICK
    //
    // Importante:
    // Esto evita que un mismo botón vuelva a ejecutar su función
    // mientras todavía está reproduciendo audio.
    // ========================================================

    function conBloqueo(
        boton,
        fn,
        msDuracion = 500
    ) {

        if (!boton) return;


        let bloqueado = false;


        boton.onclick = async function () {

            if (bloqueado) {

                return;

            }


            bloqueado = true;


            boton.disabled = true;


            boton.style.opacity =
                "0.65";


            boton.style.transform =
                "scale(0.98)";


            boton.style.cursor =
                "wait";


            try {

                await fn();

            }

            catch (error) {

                console.error(
                    "Error al ejecutar acción del botón:",
                    error
                );

            }


            setTimeout(() => {

                bloqueado = false;

                boton.disabled = false;

                boton.style.opacity =
                    "";

                boton.style.transform =
                    "";

                boton.style.cursor =
                    "";

            }, msDuracion);

        };

    }



    // ========================================================
    // PEQUEÑA ANIMACIÓN DE BOTÓN AL PASAR EL MOUSE
    //
    // No modifica el CSS global.
    // Se aplica directamente al elemento.
    // ========================================================

    function efectoBoton(boton) {

        if (!boton) return;


        boton.style.transition =
            "transform 150ms ease, box-shadow 150ms ease";


        boton.addEventListener(
            "mouseenter",
            () => {

                if (!boton.disabled) {

                    boton.style.transform =
                        "translateY(-1px)";

                    boton.style.boxShadow =
                        "0 4px 12px rgba(0,0,0,0.18)";

                }

            }
        );


        boton.addEventListener(
            "mouseleave",
            () => {

                if (!boton.disabled) {

                    boton.style.transform =
                        "";

                    boton.style.boxShadow =
                        "";

                }

            }
        );

    }



    // ========================================================
    // ANIMACIÓN DE CONTINUAR
    // ========================================================

    function animarContinuar(boton) {

        if (!boton) return;


        boton.style.transition =
            "transform 150ms ease, box-shadow 150ms ease";


        boton.addEventListener(
            "mouseenter",
            () => {

                boton.style.transform =
                    "translateY(-2px)";

                boton.style.boxShadow =
                    "0 6px 18px rgba(0,0,0,0.2)";

            }
        );


        boton.addEventListener(
            "mouseleave",
            () => {

                boton.style.transform =
                    "";

                boton.style.boxShadow =
                    "";

            }
        );

    }



    // ========================================================
    // EXPORTACIÓN
    // ========================================================

    return {

        sonidoAcierto,

        sonidoError,

        marcarCorrecto,

        marcarIncorrecto,

        restaurarOpcion,

        avanzar,

        fadeIn,

        aparecer,

        conBloqueo,

        efectoBoton,

        animarContinuar

    };


})();