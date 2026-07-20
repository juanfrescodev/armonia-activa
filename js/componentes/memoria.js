COMPONENTES.memoria = function (paso, cont, motor, render) {

    const modo = paso.modo || "practica";

    let seleccion = null;
    let referenciaEscuchada = false;

    cont.innerHTML = "";

    const card = document.createElement("div");
    card.className = "space-y-6";

    card.innerHTML = `
        <h2 class="text-xl font-bold">
            ${paso.pregunta}
        </h2>

        <div id="referencia" class="p-5 rounded-xl bg-slate-800 space-y-4">

            <p class="font-semibold">
                Melodía de referencia
            </p>

            <div
            id="estadoEscucha"
            class="text-center text-slate-400 text-sm">
            </div>

            <button
                id="btnReferencia"
                class="w-full p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500">
                ▶ Escuchar
            </button>

        </div>


        <div
            id="opciones"
            class="space-y-4 hidden">
        </div>


        <button
            id="btnComprobar"
            class="hidden w-full p-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-bold">
            Comprobar respuesta
        </button>


        <div
            id="mensaje"
            class="text-center font-bold">
        </div>
    `;

    cont.appendChild(card);

    const btnReferencia = document.getElementById("btnReferencia");
    const opcionesDiv = document.getElementById("opciones");
    const btnComprobar = document.getElementById("btnComprobar");
    const mensaje = document.getElementById("mensaje");
    const estadoEscucha =
    document.getElementById("estadoEscucha");



    async function escucharReferencia() {

        if (modo === "examen" && referenciaEscuchada) return;

        referenciaEscuchada = true;

        btnReferencia.disabled = true;


        btnReferencia.innerText =
            "🎵 Escuchando...";


        btnReferencia.classList.remove(
            "bg-indigo-600",
            "hover:bg-indigo-500"
        );


        btnReferencia.classList.add(
            "bg-slate-700"
        );


        estadoEscucha.innerText =
            "Prestá atención a la melodía.";


        await reproducirMelodia(
            paso.referencia.melodia
        );


        estadoEscucha.className =
            "text-center text-emerald-400 font-bold";


        estadoEscucha.innerText =
            "✓ Memorizá la melodía. Ahora elegí la opción correcta.";


        if (modo === "practica") {

            btnReferencia.disabled = false;

            btnReferencia.innerText =
                "🔄 Escuchar nuevamente";


            btnReferencia.classList.remove(
                "bg-slate-700"
            );


            btnReferencia.classList.add(
                "bg-indigo-600",
                "hover:bg-indigo-500"
            );


        } else {


            btnReferencia.innerText =
                "✔ Ya escuchada";


        }


        opcionesDiv.classList.remove("hidden");

        btnComprobar.classList.remove("hidden");

    }



    btnReferencia.onclick = escucharReferencia;



    paso.opciones.forEach((opcion, index) => {

        const bloque =
        document.createElement("div");

        bloque.className =
            "p-4 rounded-xl bg-slate-800 space-y-3";

        bloque.innerHTML = `

            <div class="font-semibold">
                Opción ${opcion.nombre}
            </div>

            <button
                class="escuchar w-full p-3 rounded-xl bg-slate-700 hover:bg-slate-600">
                ▶ Escuchar
            </button>

            <label class="flex items-center gap-3 cursor-pointer">

                <input
                    type="radio"
                    name="respuesta"
                    value="${index}">

                Seleccionar

            </label>

        `;

        opcionesDiv.appendChild(bloque);

        bloque
            .querySelector(".escuchar")
            .onclick = () => {

                reproducirMelodia(
                    opcion.melodia
                );

            };

        bloque
            .querySelector("input")
            .onchange = (e) => {

                seleccion =
                Number(e.target.value);

            };

    });



    btnComprobar.onclick = () => {

        if (seleccion === null) {

            mensaje.className =
                "text-yellow-400 font-bold text-center";

            mensaje.innerText =
                "Seleccioná una opción.";

            return;

        }

        if (seleccion === paso.correcta) {

            mensaje.className =
                "text-emerald-400 font-bold text-center";

            mensaje.innerText =
                "¡Correcto!";

            btnComprobar.disabled = true;

            setTimeout(() => {

                motor.siguientePaso();

                if (motor.termino()) {

                    terminarMision();

                } else {

                    render();

                }

            }, 1000);

        } else {

            mensaje.className =
                "text-red-400 font-bold text-center";

            mensaje.innerText =
                "Incorrecto. Escuchá nuevamente e intentá otra vez.";

        }

    };

};