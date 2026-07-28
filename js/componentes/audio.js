window.COMPONENTES = window.COMPONENTES || {};

COMPONENTES.audio = function(
    paso,
    contenedor,
    motor,
    render
){

    contenedor.innerHTML = "";


    // =========================
    // Título (opcional)
    // =========================

    if(paso.pregunta){

        const titulo =
        document.createElement("h2");

        titulo.className =
        "text-2xl font-bold text-indigo-400 mb-6";

        titulo.innerText =
        paso.pregunta;

        contenedor.appendChild(titulo);

    }


    // =========================
    // Texto (opcional)
    // =========================

    if(paso.texto){

        const texto =
        document.createElement("p");

        texto.className =
        "mb-6 text-slate-300 leading-relaxed";

        texto.innerText =
        paso.texto;

        contenedor.appendChild(texto);

    }


    // =========================
    // Escuchar
    // =========================

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
    "🔊 Escuchar";


    boton.onclick = ()=>{

        if(paso.melodia){

            reproducirMelodia(
                paso.melodia
            );

        }
        else{

            reproducirNotas(
                paso.notas
            );

        }

    };


    contenedor.appendChild(boton);


    // =========================
    // Explicación (opcional)
    // =========================

    if(paso.explicacion){

        const info =
        document.createElement("div");

        info.className =
        "mt-6 bg-slate-800 rounded-2xl p-5 text-slate-300";

        info.innerText =
        paso.explicacion;

        contenedor.appendChild(info);

    }


    // =========================
    // Continuar
    // =========================

    const continuar =
    document.createElement("button");

    continuar.className =
    `
    w-full
    mt-6
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

    contenedor.appendChild(
        continuar
    );

};