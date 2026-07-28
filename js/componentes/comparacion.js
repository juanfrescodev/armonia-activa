COMPONENTES.comparacion = function(
    paso,
    contenedor,
    motor,
    render
){

    contenedor.innerHTML="";


    const titulo =
    document.createElement("h2");


    titulo.className =
    "text-xl font-bold mb-6";


    titulo.innerText =
    paso.pregunta;


    contenedor.appendChild(titulo);



    // =========================
    // EJEMPLOS DE AUDIO
    // =========================

    const ejemplos = paso.ejemplos
        ?? (paso.ejemplo ? [paso.ejemplo] : []);

    ejemplos.forEach(ejemplo=>{

        const boton =
        document.createElement("button");

        boton.className =
        `
        block
        w-full
        mt-4
        p-4
        rounded-xl
        bg-slate-700
        hover:bg-slate-600
        font-bold
        `;

        boton.innerText =
        "🔊 Escuchar " + ejemplo.nombre;

        boton.onclick=()=>{

            if(ejemplo.melodia){

                reproducirMelodia(
                    ejemplo.melodia
                );

            }else{

                reproducirNotas(
                    ejemplo.notas
                );

            }

        };

        contenedor.appendChild(
            boton
        );

    });



    const linea =
    document.createElement("hr");


    linea.className =
    "my-6 border-slate-700";


    contenedor.appendChild(
        linea
    );




    // =========================
    // OPCIONES
    // =========================


    paso.opciones.forEach(
    (opcion,index)=>{


        const boton =
        document.createElement("button");



        boton.className =
        `
        block
        w-full
        mt-3
        p-4
        rounded-xl
        bg-indigo-600
        hover:bg-indigo-500
        font-bold
        `;



        boton.innerText =
        opcion;



        boton.onclick=()=>{


            if(index===paso.correcta){


                boton.classList.remove(
                    "bg-indigo-600"
                );


                boton.classList.add(
                    "bg-emerald-600"
                );


                boton.innerText =
                "✓ Correcto";



                if(paso.explicacion){

                    const texto =
                    document.createElement("div");

                    texto.className =
                    "mt-6 p-4 rounded-xl bg-emerald-900/40 border border-emerald-600 text-emerald-200";

                    texto.innerText =
                    paso.explicacion;

                    contenedor.appendChild(texto);


                    const continuar =
                    document.createElement("button");

                    continuar.className =
                    `
                    w-full
                    mt-4
                    p-4
                    rounded-xl
                    bg-indigo-600
                    hover:bg-indigo-500
                    font-bold
                    `;

                    continuar.innerText =
                    "Continuar";

                    continuar.onclick=()=>{

                        motor.siguientePaso();

                        if(motor.termino()){

                            terminarMision();

                        }else{

                            render();

                        }

                    };

                    contenedor.appendChild(continuar);

                }
                else{

                    setTimeout(()=>{

                        motor.siguientePaso();

                        if(motor.termino()){

                            terminarMision();

                        }else{

                            render();

                        }

                    },1000);

                }



            }else{


                boton.classList.remove(
                    "bg-indigo-600"
                );


                boton.classList.add(
                    "bg-red-600"
                );


                boton.innerText =
                "✗ Incorrecto";



                setTimeout(()=>{


                    boton.classList.remove(
                        "bg-red-600"
                    );


                    boton.classList.add(
                        "bg-indigo-600"
                    );


                    boton.innerText =
                    opcion;



                },800);



            }


        };



        contenedor.appendChild(
            boton
        );


    });



};