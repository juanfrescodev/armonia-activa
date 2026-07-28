COMPONENTES.teoria = function(
    paso,
    contenedor,
    motor,
    render
){

    contenedor.innerHTML = "";

    const titulo =
    document.createElement("h2");

    titulo.className =
    "text-2xl font-bold text-indigo-400 mb-4";

    titulo.innerText =
    paso.titulo;

    contenedor.appendChild(titulo);



    const bloque =
    document.createElement("div");

    bloque.className =
    "bg-slate-800 p-6 rounded-2xl space-y-4";

    contenedor.appendChild(bloque);



    const contenido =
    paso.contenido ?? paso.texto;



    if(Array.isArray(contenido)){

        contenido.forEach(parrafo=>{

            const p =
            document.createElement("p");

            p.className =
            "leading-relaxed text-slate-200";

            p.innerText =
            parrafo;

            bloque.appendChild(p);

        });

    }else{

        const p =
        document.createElement("p");

        p.className =
        "leading-relaxed text-slate-200";

        p.innerText =
        contenido;

        bloque.appendChild(p);

    }



    if(paso.ejemplo){

        const boton =
        document.createElement("button");

        boton.className =
        "w-full mt-6 p-4 rounded-xl bg-slate-700 hover:bg-slate-600";

        boton.innerText =
        "🔊 Escuchar ejemplo";

        boton.onclick=()=>{

            if(paso.ejemplo.notas){

                reproducirNotas(
                    paso.ejemplo.notas
                );

            }

            if(paso.ejemplo.melodia){

                reproducirMelodia(
                    paso.ejemplo.melodia
                );

            }

        };

        contenedor.appendChild(boton);

    }



    const continuar =
    document.createElement("button");

    continuar.className =
    "w-full mt-6 p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold";

    continuar.innerText =
    "Continuar";

    continuar.onclick=()=>{

        motor.siguientePaso();

        render();

    };

    contenedor.appendChild(continuar);

};