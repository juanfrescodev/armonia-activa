window.COMPONENTES = window.COMPONENTES || {};


COMPONENTES.intervalo_visual = function(
    paso,
    contenedor,
    motor,
    render
){

    contenedor.innerHTML = "";

    let respondido = false;


    // Título

    const titulo =
    document.createElement("h2");

    titulo.className =
    "text-2xl font-bold mb-6 text-indigo-400";

    titulo.innerText =
    paso.pregunta;

    contenedor.appendChild(titulo);



    // Ejemplos de audio

    const bloqueAudio =
    document.createElement("div");

    bloqueAudio.className =
    "space-y-3";


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

            }else{

                reproducirNotas(
                    ejemplo.notas
                );

            }


        };


        bloqueAudio.appendChild(boton);


    });


    contenedor.appendChild(bloqueAudio);



    // Separador

    const linea =
    document.createElement("hr");

    linea.className =
    "my-6 border-slate-700";

    contenedor.appendChild(linea);



    // Opciones

    const opciones =
    document.createElement("div");


    opciones.className =
    "space-y-3";


    paso.opciones.forEach(
    (opcion,index)=>{


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
        `;


        boton.innerText =
        opcion;



        boton.onclick = ()=>{


            if(respondido)return;


            if(index===paso.correcta){


                respondido=true;


                boton.classList.remove(
                    "bg-indigo-600"
                );


                boton.classList.add(
                    "bg-emerald-600"
                );


                boton.innerText =
                "✓ Correcto";


                mostrarVisual(
                    paso,
                    contenedor
                );


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


        opciones.appendChild(boton);


    });


    contenedor.appendChild(opciones);





    function mostrarVisual(
        paso,
        contenedor
    ){


        const bloque =
        document.createElement("div");


        bloque.className =
        `
        mt-8
        bg-slate-800
        rounded-2xl
        p-6
        space-y-8
        `;



        const titulo =
        document.createElement("h3");


        titulo.className =
        "text-xl font-bold text-center text-amber-400";


        titulo.innerText =
        paso.tituloVisual ??
        "Mirá la distancia entre los sonidos";


        bloque.appendChild(titulo);



        paso.ejemplos.forEach(ejemplo=>{


            const fila =
            document.createElement("div");


            fila.className =
            "text-center";



            const nombre =
            document.createElement("p");


            nombre.className =
            "font-bold mb-3";


            nombre.innerText =
            ejemplo.nombre;


            fila.appendChild(nombre);



            const distancia =
            document.createElement("div");


            distancia.className =
            "flex items-center justify-center text-2xl";



            const espacio =
            ejemplo.distancia * 10;



            distancia.innerHTML = `

                <span>●</span>

                <div
                style="
                width:${espacio}px;
                border-top:3px solid white;
                margin:0 8px;
                ">
                </div>

                <span>●</span>

            `;



            fila.appendChild(
                distancia
            );


            bloque.appendChild(
                fila
            );


        });



        const frase =
        document.createElement("p");


        frase.className =
        "text-center text-slate-300 italic";


        frase.innerText =
        paso.explicacion ??
        "Las notas pueden estar más cerca o más lejos. La música también tiene distancias.";


        bloque.appendChild(frase);



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


        bloque.appendChild(
            continuar
        );



        contenedor.appendChild(
            bloque
        );

    }


};