COMPONENTES.detras_de_la_musica = function(
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



    // Icono

    const icono =
    document.createElement("div");

    icono.className =
    "text-6xl text-center";

    icono.innerText = "🎼";

    card.appendChild(icono);



    // Título

    const titulo =
    document.createElement("h2");

    titulo.className =
    "text-3xl font-bold text-center text-amber-400";

    titulo.innerText =
    "Detrás de la música";

    card.appendChild(titulo);



    // Subtítulo

    if(paso.titulo){

        const subtitulo =
        document.createElement("h3");

        subtitulo.className =
        "text-xl font-bold text-center text-white";

        subtitulo.innerText =
        paso.titulo;

        card.appendChild(subtitulo);

    }



    // Texto

    paso.texto.forEach(parrafo=>{

        const p =
        document.createElement("p");

        p.className =
        "text-lg leading-relaxed text-slate-300";

        p.innerText =
        parrafo;

        card.appendChild(p);

    });



    // Imagen opcional

    if(paso.imagen){

        const img =
        document.createElement("img");

        img.src =
        paso.imagen;

        img.className =
        "rounded-xl w-full";

        card.appendChild(img);

    }



    // Video de YouTube opcional

    if(paso.youtube){

        const boton =
        document.createElement("a");

        boton.href =
        paso.youtube;

        boton.target =
        "_blank";

        boton.className =
        "block w-full p-4 rounded-xl bg-red-600 hover:bg-red-500 text-center font-bold";

        boton.innerText =
        "▶ Ver en YouTube";

        card.appendChild(boton);

    }


    // =========================
    // VIDEO (opcional)
    // =========================

    if(paso.video){

        const contVideo =
        document.createElement("div");

        contVideo.className =
        "aspect-video rounded-xl overflow-hidden mt-6";

        contVideo.innerHTML = `
            <iframe
                class="w-full h-full"
                src="${paso.video}"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        `;

        card.appendChild(contVideo);

    }


    // Frase final opcional

    if(paso.frase){

        const frase =
        document.createElement("p");

        frase.className =
        "text-center italic text-emerald-400 text-lg";

        frase.innerText =
        paso.frase;

        card.appendChild(frase);

    }



    // Continuar

    const continuar =
    document.createElement("button");

    continuar.className =
    "w-full p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold";

    continuar.innerText =
    "Continuar";

    continuar.onclick = ()=>{

        motor.siguientePaso();

        render();

    };

    card.appendChild(
        continuar
    );

}