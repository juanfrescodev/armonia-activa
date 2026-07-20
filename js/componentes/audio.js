COMPONENTES.audio = function(paso, contenedor, motor, render){


    const boton = document.createElement("button");


    boton.innerText =
        "🔊 Escuchar";


    boton.className =
        "w-full p-4 rounded-xl bg-slate-700";


    boton.onclick = ()=>{


        if(paso.melodia){

            reproducirMelodia(paso.melodia);

        }
        else{

            reproducirNotas(paso.notas);

        }


    };



    const continuar = document.createElement("button");


    continuar.innerText =
        "Continuar";


    continuar.className =
        "mt-4 w-full p-4 rounded-xl bg-indigo-600";



    continuar.onclick = ()=>{

        motor.siguientePaso();

        render();

    };



    contenedor.appendChild(boton);

    contenedor.appendChild(continuar);


};