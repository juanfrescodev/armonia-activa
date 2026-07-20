COMPONENTES.texto = function(paso, contenedor, motor, render) {


    const bloque = document.createElement("div");

    bloque.className =
        "bg-slate-800 p-6 rounded-2xl text-slate-200";

    bloque.innerText = paso.texto;



    const boton = document.createElement("button");

    boton.innerText = "Continuar";

    boton.className =
        "w-full mt-6 p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold";


    boton.onclick = () => {

        motor.siguientePaso();

        render();

    };


    contenedor.appendChild(bloque);

    contenedor.appendChild(boton);


};