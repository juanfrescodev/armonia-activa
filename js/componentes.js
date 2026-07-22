window.COMPONENTES = window.COMPONENTES || {};

COMPONENTES.nota = function(paso, contenedor, motor, render){

    contenedor.innerHTML = "";

    const card = document.createElement("div");

    card.className =
    "space-y-6";


    card.innerHTML = `

        <h2 class="text-2xl font-bold text-indigo-400">
            ${paso.titulo}
        </h2>


        <div class="bg-slate-800 p-6 rounded-2xl text-center">

            <p class="text-xl mb-4">
                Escuchá este sonido
            </p>


            <button
            id="escucharNota"
            class="w-full p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500">

            🔊 Escuchar

            </button>


            <div
            id="resultadoNota"
            class="mt-6 text-3xl font-bold hidden">

            </div>

        </div>


        <button
        id="continuarNota"
        class="w-full p-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold">

        Continuar

        </button>

    `;


    contenedor.appendChild(card);


    const boton =
    document.getElementById("escucharNota");


    const resultado =
    document.getElementById("resultadoNota");


    boton.onclick = ()=>{

        reproducirNotas(
            paso.nota
        );


        resultado.classList.remove("hidden");


        resultado.innerHTML =
        `
        ${paso.nombre}
        <br>
        <span class="text-lg">
        ${paso.nombreInternacional}
        </span>
        `;

    };


    document
    .getElementById("continuarNota")
    .onclick = ()=>{

        motor.siguientePaso();

        render();

    };

};