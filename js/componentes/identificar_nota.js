COMPONENTES.identificar_nota = function(
    paso,
    contenedor,
    motor,
    render,
    mision
){


    contenedor.innerHTML = "";


    const card =
    document.createElement("div");


    card.className =
    "space-y-6 bg-slate-800 p-6 rounded-2xl";


    contenedor.appendChild(card);



    const titulo =
    document.createElement("h2");


    titulo.className =
    "text-2xl font-bold text-indigo-400";


    titulo.innerText =
    paso.pregunta;


    card.appendChild(titulo);



    // =========================
    // VISUALIZACIÓN
    // =========================


    const textoVisual =
    document.createElement("p");


    textoVisual.className =
    "text-center text-slate-300";


    textoVisual.innerText =
    "Observá la nota:";


    card.appendChild(textoVisual);



    if(paso.modo === "piano"){


        card.appendChild(

            COMPONENTES.teclado(
                paso.nota,
                mision.id.startsWith("boss")
            )

        );


    }
    else{


        card.appendChild(

            COMPONENTES.pentagramaVisual(
                paso.nota
            )

        );


    }



    // =========================
    // AUDIO
    // =========================


    const escuchar =
    document.createElement("button");


    escuchar.className =
    `
    w-full
    p-4
    rounded-xl
    bg-indigo-600
    hover:bg-indigo-500
    font-bold
    `;


    escuchar.innerText =
    "🔊 Escuchar nota";


    card.appendChild(
        escuchar
    );



    escuchar.onclick = ()=>{


        reproducirNotas(
            [paso.nota]
        );


    };



    // =========================
    // OPCIONES
    // =========================


    const opciones =
    document.createElement("div");


    opciones.className =
    "grid gap-3";


    card.appendChild(
        opciones
    );



    const resultado =
    document.createElement("div");


    resultado.className =
    "text-center text-xl font-bold";


    card.appendChild(
        resultado
    );



    paso.opciones.forEach(
        (opcion,index)=>{


        const boton =
        document.createElement("button");


        boton.className =
        `
        p-4
        rounded-xl
        bg-slate-700
        hover:bg-slate-600
        font-bold
        `;


        boton.innerText =
        opcion;



        boton.onclick = ()=>{


            if(index === paso.correcta){


                boton.className =
                `
                p-4
                rounded-xl
                bg-emerald-600
                font-bold
                `;


                resultado.innerText =
                "✅ Correcto";


                setTimeout(()=>{


                    motor.siguientePaso();

                    render();


                },800);



            }else{


                boton.className =
                `
                p-4
                rounded-xl
                bg-red-600
                font-bold
                `;


                resultado.innerText =
                "❌ Probá otra vez";


            }



        };



        opciones.appendChild(
            boton
        );


    });



};