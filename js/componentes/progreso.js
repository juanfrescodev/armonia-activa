function renderProgreso(mision, mundo){


    const contenedor =
    document.createElement("div");


    contenedor.className =
    "mb-8 space-y-3";


    const esBoss =
    mision.id.startsWith("boss");



    const misiones =
    mundo.misiones.filter(
        m => !m.id.startsWith("boss")
    );



    const posicion =
    misiones.findIndex(
        m => m.id === mision.id
    );


    const actual =
    posicion + 1;


    const total =
    misiones.length;



    let porcentaje;


    if(esBoss){

        porcentaje = 100;

    }else{

        porcentaje =
        Math.round(
            (actual / total) * 100
        );

    }



    if(esBoss){


        contenedor.innerHTML = `


        <div class="text-center space-y-2">


            <p class="text-xl font-bold text-yellow-400">

                👑 DESAFÍO FINAL

            </p>


            <p class="text-indigo-300 font-semibold">

                ${mision.titulo}

            </p>


        </div>



        <div class="w-full h-3 bg-slate-700 rounded-full overflow-hidden">


            <div

            class="h-full bg-yellow-400 transition-all duration-700"

            style="width:100%">

            </div>


        </div>


        <p class="text-xs text-slate-400 text-center">

            Preparación completada. Es hora del desafío.

        </p>


        `;



    }else{


        contenedor.innerHTML = `


        <div class="text-center">

            <p class="text-sm text-indigo-300 font-semibold">

                🌎 ${mundo.titulo}

            </p>

        </div>



        <div class="w-full h-3 bg-slate-700 rounded-full overflow-hidden">


            <div

            class="h-full bg-indigo-500 transition-all duration-700"

            style="width:${porcentaje}%">

            </div>


        </div>



        <div class="flex justify-between text-xs text-slate-400">


            <span>

                Misión ${actual}/${total}

            </span>


            <span>

                ${100-porcentaje}% restante

            </span>


        </div>


        `;

    }



    return contenedor;


}