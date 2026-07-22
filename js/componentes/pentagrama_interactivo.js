COMPONENTES.pentagrama_interactivo = function(
    paso,
    contenedor,
    motor,
    render
){

    let bloqueado = false;

    contenedor.innerHTML = "";


    const titulo =
    document.createElement("h2");

    titulo.className =
    "text-2xl font-bold mb-6";

    titulo.innerText =
    paso.pregunta;

    contenedor.appendChild(titulo);



    const wrapper =
    document.createElement("div");

    wrapper.className =
    "relative flex justify-center";

    contenedor.appendChild(wrapper);



    const svg =
    COMPONENTES.pentagramaVisual(paso.correcta);


    wrapper.appendChild(svg);



    const posiciones = {

        C4:140,
        D4:130,
        E4:120,
        F4:110,
        G4:100,
        A4:90,
        B4:80,
        C5:70

    };



    Object.entries(posiciones)
    .forEach(([nota,y])=>{


        const punto =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "ellipse"
        );


        punto.setAttribute(
            "cx",
            "230"
        );


        punto.setAttribute(
            "cy",
            y
        );


        punto.setAttribute(
            "rx",
            "11"
        );


        punto.setAttribute(
            "ry",
            "8"
        );


        punto.setAttribute(
            "fill",
            "white"
        );


        punto.style.cursor =
        "pointer";



        punto.onclick = ()=>{


            if(bloqueado)
            return;


            responder(
                nota,
                punto
            );


        };


        svg.appendChild(punto);


    });



    const mensaje =
    document.createElement("div");


    mensaje.className =
    "text-center font-bold mt-6";


    contenedor.appendChild(
        mensaje
    );



    function responder(nota,punto){


        if(nota === paso.correcta){


            bloqueado=true;


            punto.setAttribute(
                "fill",
                "#22c55e"
            );


            mensaje.className =
            "text-center text-emerald-400 text-xl font-bold mt-6";


            mensaje.innerText =
            "¡Correcto!";


            setTimeout(()=>{


                motor.siguientePaso();

                render();


            },1500);



        }else{


            punto.setAttribute(
                "fill",
                "#ef4444"
            );


            mensaje.className =
            "text-center text-red-400 text-xl font-bold mt-6";


            mensaje.innerText =
            "Intentá nuevamente.";



            setTimeout(()=>{


                punto.setAttribute(
                    "fill",
                    "white"
                );


                mensaje.innerText="";


            },1000);


        }


    }


};