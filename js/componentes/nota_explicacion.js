COMPONENTES.nota_explicacion = function(
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



    const titulo =
    document.createElement("h2");


    titulo.className =
    "text-2xl font-bold text-indigo-400";


    titulo.innerText =
    "Conociendo " + paso.nombre;


    card.appendChild(titulo);



    const texto =
    document.createElement("p");


    texto.className =
    "text-lg text-slate-300";


    texto.innerText =
    paso.texto;


    card.appendChild(texto);




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
    "🔊 Escuchar";


    card.appendChild(escuchar);




    const resultado =
    document.createElement("div");


    resultado.className =
    "hidden space-y-6";


    card.appendChild(resultado);




    escuchar.onclick = ()=>{


        reproducirNotas(
            [paso.nota]
        );


        resultado.classList.remove(
            "hidden"
        );


        resultado.innerHTML = "";


        const nombre =
        document.createElement("h3");


        nombre.className =
        "text-4xl font-bold text-center text-emerald-400";


        nombre.innerText =
        paso.nombre;


        resultado.appendChild(nombre);



        const descripcion =
        document.createElement("p");


        descripcion.className =
        "text-center text-xl";


        descripcion.innerText =
        paso.nota;


        resultado.appendChild(descripcion);




        // =========================
        // TECLADO
        // =========================


        const tituloPiano =
        document.createElement("p");


        tituloPiano.className =
        "text-center text-slate-300";


        tituloPiano.innerText =
        "En el piano está acá:";


        resultado.appendChild(tituloPiano);



        resultado.appendChild(
            COMPONENTES.teclado(
                paso.nota
            )
        );




        // =========================
        // PENTAGRAMA
        // =========================


        const tituloPentagrama =
        document.createElement("p");


        tituloPentagrama.className =
        "text-center text-slate-300 mt-6";


        tituloPentagrama.innerText =
        "En el pentagrama aparece " + paso.nombre + ":";


        resultado.appendChild(
            tituloPentagrama
        );



        resultado.appendChild(
            COMPONENTES.pentagramaVisual(
                paso.nota
            )
        );



        continuar.classList.remove(
            "hidden"
        );

    };




    const continuar =
    document.createElement("button");


    continuar.className =
    `
    hidden
    w-full
    p-4
    rounded-xl
    bg-emerald-600
    hover:bg-emerald-500
    font-bold
    `;


    continuar.innerText =
    "Continuar";


    card.appendChild(
        continuar
    );



    continuar.onclick = ()=>{


        motor.siguientePaso();


        if(motor.termino()){

            terminarMision();

        }else{

            render();

        }


    };


};