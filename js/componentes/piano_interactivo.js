COMPONENTES.piano_interactivo = function (
    paso,
    contenedor,
    motor,
    render
) {


    let bloqueado = false;


    contenedor.innerHTML = "";



    const titulo =
    document.createElement("h2");


    titulo.className =
    "text-2xl font-bold mb-4";


    titulo.innerText =
    paso.pregunta;


    contenedor.appendChild(
        titulo
    );




    const piano =
    document.createElement("div");


    piano.className =
    "relative flex w-fit mx-auto mt-8 mb-8";


    contenedor.appendChild(
        piano
    );




    const teclasCreadas = {};



    const blancas = [

        "C",
        "D",
        "E",
        "F",
        "G",
        "A",
        "B"

    ];



    const negras = [

        {
            nota:"C#",
            pos:0
        },

        {
            nota:"D#",
            pos:1
        },

        null,

        {
            nota:"F#",
            pos:3
        },

        {
            nota:"G#",
            pos:4
        },

        {
            nota:"A#",
            pos:5
        }

    ];





    blancas.forEach((nota)=>{


        const tecla =
        document.createElement("div");


        const notaCompleta =
        nota+"4";



        tecla.dataset.nota =
        notaCompleta;



        tecla.className =
        `
        w-14
        h-48
        border
        border-black
        bg-white
        hover:bg-yellow-100
        cursor-pointer
        flex
        items-end
        justify-center
        pb-2
        text-black
        font-bold
        `;



        tecla.innerText =
        nota;



        teclasCreadas[notaCompleta] =
        tecla;



        tecla.onclick = ()=>{


            if(bloqueado)return;


            if(
                paso.modo === "exploracion"
            ){


                reproducirNotas(
                    [notaCompleta]
                );


                tecla.classList.add(
                    "ring-4",
                    "ring-indigo-400"
                );


                setTimeout(()=>{


                    tecla.classList.remove(
                        "ring-4",
                        "ring-indigo-400"
                    );


                },500);



            }

            else{


                responder(
                    notaCompleta,
                    tecla
                );


            }


        };



        piano.appendChild(
            tecla
        );



    });





    negras.forEach((n)=>{


        if(!n)return;



        const tecla =
        document.createElement("div");



        const notaCompleta =
        n.nota+"4";



        tecla.dataset.nota =
        notaCompleta;



        tecla.className =
        `
        absolute
        w-8
        h-28
        bg-black
        rounded-b
        z-10
        cursor-pointer
        hover:bg-neutral-700
        `;



        tecla.style.left =
        (n.pos*56)+40+"px";



        teclasCreadas[notaCompleta] =
        tecla;




        tecla.onclick = ()=>{


            if(bloqueado)return;



            if(
                paso.modo === "exploracion"
            ){


                reproducirNotas(
                    [notaCompleta]
                );


                tecla.classList.add(
                    "ring-4",
                    "ring-indigo-400"
                );



                setTimeout(()=>{


                    tecla.classList.remove(
                        "ring-4",
                        "ring-indigo-400"
                    );


                },500);



            }

            else{


                responder(
                    notaCompleta,
                    tecla
                );


            }


        };



        piano.appendChild(
            tecla
        );



    });






    // ==========================
    // RESALTAR NOTAS
    // ==========================


    if(paso.notasResaltadas){


        paso.notasResaltadas.forEach(nota=>{


            const tecla =
            teclasCreadas[nota];



            if(tecla){


                tecla.classList.add(
                    "ring-4",
                    "ring-indigo-400"
                );


            }


        });


    }







    const mensaje =
    document.createElement("div");


    mensaje.className =
    "text-center text-xl font-bold mt-6";


    contenedor.appendChild(
        mensaje
    );





    function responder(nota,tecla){


        bloqueado=true;



        if(nota===paso.correcta){


            tecla.classList.add(
                "ring-4",
                "ring-green-400"
            );


            mensaje.className =
            "text-center text-emerald-400 text-xl font-bold mt-6";


            mensaje.innerText =
            "¡Correcto!";



            setTimeout(()=>{


                motor.siguientePaso();

                render();



            },1200);



        }


        else{


            tecla.classList.add(
                "ring-4",
                "ring-red-400"
            );


            mensaje.className =
            "text-center text-red-400 text-xl font-bold mt-6";


            mensaje.innerText =
            "Intentá nuevamente";



            setTimeout(()=>{


                tecla.classList.remove(
                    "ring-4",
                    "ring-red-400"
                );


                mensaje.innerText="";


                bloqueado=false;



            },900);



        }


    }

// ==========================
// CONTINUAR EXPLORACIÓN
// ==========================

if(paso.modo==="exploracion"){


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
    mt-6
    `;


    continuar.innerText =
    "Continuar";


    continuar.onclick = ()=>{

        motor.siguientePaso();

        render();

    };


    contenedor.appendChild(
        continuar
    );


}

};