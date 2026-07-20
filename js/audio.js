const synth = new Tone.PolySynth(Tone.Synth).toDestination();

let audioInicializado = false;


async function iniciarAudio() {

    if (!audioInicializado) {

        await Tone.start();

        audioInicializado = true;

    }

}



async function reproducirNotas(notas, duracion = "1n") {

    await iniciarAudio();

    synth.triggerAttackRelease(
        notas,
        duracion
    );

}



async function reproducirMelodia(notas){

    await iniciarAudio();

    return new Promise(resolve=>{

        notas.forEach((nota,index)=>{

            setTimeout(()=>{

                synth.triggerAttackRelease(
                    nota,
                    "8n"
                );

            },index*500);

        });

        setTimeout(resolve, notas.length*500);

    });

}