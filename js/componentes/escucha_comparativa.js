window.COMPONENTES = window.COMPONENTES || {};


COMPONENTES.escucha_comparativa = function(
    paso,
    contenedor,
    motor,
    render
){

    contenedor.innerHTML = "";


    const card =
    document.createElement("div");


    card.className =
    "space-y-6 bg-slate-800 p-6 rounded-2xl";


    contenedor.appendChild(card);




    // =========================
    // TITULO
    // =========================


    const titulo =
    document.createElement("h2");


    titulo.className =
    "text-2xl font-bold text-indigo-400";


    titulo.innerText =
    paso.titulo ||
    paso.pregunta ||
    "Escuchá y compará";


    card.appendChild(titulo);






    // =========================
    // TEXTO EXPLICATIVO
    // =========================


    if(paso.texto){


        const texto =
        document.createElement("p");


        texto.className =
        "text-slate-300";


        texto.innerText =
        paso.texto;


        card.appendChild(texto);


    }





    // =========================
    // EJEMPLOS DE AUDIO
    // =========================


    const ejemplos =
    document.createElement("div");


    ejemplos.className =
    "space-y-3";


    card.appendChild(ejemplos);





    paso.ejemplos.forEach((ejemplo)=>{


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
        `;



        boton.innerText =
        "🔊 Escuchar " + ejemplo.nombre;




        boton.onclick = ()=>{


            if(ejemplo.melodia){


                reproducirMelodia(
                    ejemplo.melodia
                );


            }


            else if(ejemplo.notas){


                reproducirNotas(
                    ejemplo.notas
                );


            }


        };



        ejemplos.appendChild(
            boton
        );


    });






    // =========================
    // FRASE FINAL
    // =========================


    const ayuda =
    document.createElement("p");


    ayuda.className =
    "text-center italic text-slate-400";


    ayuda.innerText =
    paso.frase ||
    "Escuchá varias veces e intentá descubrir qué cambia entre los ejemplos.";


    card.appendChild(
        ayuda
    );







    // =========================
    // CONTINUAR
    // =========================


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
    `;


    continuar.innerText =
    "Continuar";



    continuar.onclick = ()=>{


        motor.siguientePaso();

        render();


    };



    card.appendChild(
        continuar
    );


};