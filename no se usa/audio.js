// ============================================================
// js/audio.js
//
// Sistema central de reproducción de audio.
// Evita superposición de sonidos y permite que los componentes
// sepan cuándo terminó una reproducción.
// ============================================================


const synth =
    new Tone.PolySynth(Tone.Synth).toDestination();


let audioInicializado = false;


// Botón actualmente reproduciendo
let botonAudioActivo = null;


// Identificador de reproducción actual
let reproduccionActual = 0;



// ============================================================
// INICIALIZAR AUDIO
// ============================================================

async function iniciarAudio() {

    if (!audioInicializado) {

        await Tone.start();

        audioInicializado = true;

    }

}



// ============================================================
// DETENER CUALQUIER REPRODUCCIÓN ACTIVA
// ============================================================

function detenerAudio() {

    reproduccionActual++;

    synth.releaseAll();

    if (botonAudioActivo) {

        botonAudioActivo.classList.remove(
            "bg-indigo-600",
            "ring-2",
            "ring-indigo-400"
        );

        botonAudioActivo.classList.add(
            "bg-slate-700"
        );

        botonAudioActivo.innerText =
            botonAudioActivo.dataset.textoOriginal ||
            "🔊 Escuchar";

        botonAudioActivo =
            null;

    }

}



// ============================================================
// CONFIGURAR BOTÓN DE AUDIO
// ============================================================

function marcarBotonReproduciendo(boton) {

    if (!boton) return;


    // Si había otro botón activo, lo restauramos

    if (
        botonAudioActivo &&
        botonAudioActivo !== boton
    ) {

        botonAudioActivo.classList.remove(
            "bg-indigo-600",
            "ring-2",
            "ring-indigo-400"
        );

        botonAudioActivo.classList.add(
            "bg-slate-700"
        );

        botonAudioActivo.innerText =
            botonAudioActivo.dataset.textoOriginal ||
            "🔊 Escuchar";

    }


    botonAudioActivo =
        boton;


    if (!boton.dataset.textoOriginal) {

        boton.dataset.textoOriginal =
            boton.innerText;

    }


    boton.classList.remove(
        "bg-slate-700"
    );

    boton.classList.add(
        "bg-indigo-600",
        "ring-2",
        "ring-indigo-400"
    );

    boton.innerText =
        "🔊 Reproduciendo…";

}



// ============================================================
// RESTAURAR BOTÓN
// ============================================================

function restaurarBotonAudio(boton) {

    if (!boton) return;


    boton.classList.remove(
        "bg-indigo-600",
        "ring-2",
        "ring-indigo-400"
    );

    boton.classList.add(
        "bg-slate-700"
    );


    boton.innerText =
        boton.dataset.textoOriginal ||
        "🔊 Escuchar";


    if (botonAudioActivo === boton) {

        botonAudioActivo =
            null;

    }

}



// ============================================================
// REPRODUCIR NOTAS
// ============================================================

async function reproducirNotas(
    notas,
    duracion = "1n",
    boton = null
) {

    await iniciarAudio();


    // Cancelamos cualquier reproducción anterior

    detenerAudio();


    const id =
        reproduccionActual;


    if (boton) {

        marcarBotonReproduciendo(
            boton
        );

    }


    synth.triggerAttackRelease(
        notas,
        duracion
    );


    // Duración aproximada del intervalo

    const segundos =
        Tone.Time(duracion).toSeconds();


    await new Promise(resolve => {

        setTimeout(
            resolve,
            segundos * 1000
        );

    });


    // Si durante este tiempo empezó otra reproducción,
    // no tocamos el botón actual.

    if (
        id === reproduccionActual
    ) {

        if (boton) {

            restaurarBotonAudio(
                boton
            );

        }

    }

}



// ============================================================
// REPRODUCIR MELODÍA
// ============================================================

async function reproducirMelodia(
    notas,
    boton = null
) {

    await iniciarAudio();


    // Cancelar reproducción anterior

    detenerAudio();


    reproduccionActual++;

    const id =
        reproduccionActual;


    if (boton) {

        marcarBotonReproduciendo(
            boton
        );

    }


    return new Promise(resolve => {


        notas.forEach(
            (nota, index) => {


                setTimeout(() => {


                    // Si ya comenzó otra reproducción,
                    // esta melodía queda cancelada.

                    if (
                        id !== reproduccionActual
                    ) {

                        return;

                    }


                    synth.triggerAttackRelease(
                        nota,
                        "8n"
                    );


                }, index * 500);


            }
        );



        setTimeout(() => {


            if (
                id === reproduccionActual
            ) {


                if (boton) {

                    restaurarBotonAudio(
                        boton
                    );

                }


                resolve();


            } else {

                resolve();

            }


        }, notas.length * 500 + 100);


    });

}



// ============================================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================================

window.detenerAudio =
    detenerAudio;

window.reproducirNotas =
    reproducirNotas;

window.reproducirMelodia =
    reproducirMelodia;