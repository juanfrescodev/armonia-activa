COMPONENTES.nota = function(
    paso,
    cont,
    motor,
    render
){

    cont.innerHTML="";


    const card =
    document.createElement("div");


    card.className =
    "space-y-6";


    cont.appendChild(card);



    // =========================
    // MODO TEORIA
    // =========================


    if(paso.modo === "teoria"){


        card.innerHTML = `

        <h2 class="text-2xl font-bold text-indigo-400">
            ${paso.titulo}
        </h2>


        <div class="bg-slate-800 p-6 rounded-xl">

            <p class="mb-4">
            Escuchá este sonido.
            </p>


            <button
            id="escuchar"
            class="
            w-full
            p-4
            rounded-xl
            bg-indigo-600
            hover:bg-indigo-500">

            🔊 Escuchar

            </button>


        </div>


        <div
        id="resultado"
        class="hidden bg-slate-800 p-6 rounded-xl text-center">

        </div>


        <button
        id="continuar"
        class="
        hidden
        w-full
        p-4
        rounded-xl
        bg-emerald-600
        hover:bg-emerald-500
        font-bold">

        Continuar

        </button>

        `;



        const escuchar =
        card.querySelector("#escuchar");


        const resultado =
        card.querySelector("#resultado");


        const continuar =
        card.querySelector("#continuar");



        escuchar.onclick = ()=>{


            reproducirNotas(
                [paso.nota]
            );



            resultado.classList.remove(
                "hidden"
            );


            resultado.innerHTML = `

            <p class="text-lg">
            Este sonido se llama:
            </p>


            <p class="text-4xl font-bold text-indigo-400 mt-3">

            ${paso.nombre}

            </p>


            <p class="text-xl mt-2">

            ${paso.nota.replace("4","")}

            </p>


            `;



            const piano =
            COMPONENTES.teclado(
                paso.nota
            );


            resultado.appendChild(
                piano
            );



            continuar.classList.remove(
                "hidden"
            );


        };



        continuar.onclick = ()=>{


            motor.siguientePaso();

            if(motor.termino()){

                terminarMision();

            }else{

                render();

            }


        };


        return;


    }



    // =========================
    // MODO EJERCICIO
    // =========================


    card.innerHTML = `


    <h2 class="text-xl font-bold">

    ${paso.pregunta}

    </h2>



    <button
    id="escuchar"
    class="
    w-full
    p-4
    rounded-xl
    bg-indigo-600
    hover:bg-indigo-500">

    🔊 Escuchar nota

    </button>



    <div
    id="opciones"
    class="grid grid-cols-2 gap-3">

    </div>



    <div
    id="resultado"
    class="text-center font-bold">

    </div>



    <button
    id="continuar"
    class="
    hidden
    w-full
    p-4
    rounded-xl
    bg-emerald-600
    hover:bg-emerald-500">

    Continuar

    </button>


    `;



    const escuchar =
    card.querySelector("#escuchar");


    const opciones =
    card.querySelector("#opciones");


    const resultado =
    card.querySelector("#resultado");


    const continuar =
    card.querySelector("#continuar");



    escuchar.onclick = ()=>{


        reproducirNotas(
            [paso.nota]
        );


    };



    paso.opciones.forEach(
        (opcion,index)=>{


        const boton =
        document.createElement("button");


        boton.innerText =
        opcion;


        boton.className =
        `
        p-4
        rounded-xl
        bg-slate-700
        hover:bg-slate-600
        font-bold
        `;



        boton.onclick = ()=>{


            [...opciones.children]
            .forEach(b=>{

                b.classList.remove(
                    "ring-4",
                    "ring-indigo-400"
                );

            });



            boton.classList.add(
                "ring-4",
                "ring-indigo-400"
            );



            if(index === paso.correcta){


                resultado.className =
                "text-center text-emerald-400 font-bold";


                resultado.innerHTML =
                `

                ✓ Correcto

                <br><br>

                Esta nota es:

                <br>

                <span class="text-3xl">

                ${paso.nombre}

                </span>

                `;


                resultado.appendChild(
                    COMPONENTES.teclado(
                        paso.nota
                    )
                );



                continuar.classList.remove(
                    "hidden"
                );


            }else{


                resultado.className =
                "text-center text-red-400 font-bold";


                resultado.innerText =
                "Incorrecto. Escuchá otra vez.";

            }


        };


        opciones.appendChild(boton);


    });



    continuar.onclick = ()=>{


        motor.siguientePaso();


        if(motor.termino()){

            terminarMision();

        }else{

            render();

        }


    };


};