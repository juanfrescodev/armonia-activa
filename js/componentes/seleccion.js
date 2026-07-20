COMPONENTES.seleccion = function (
    paso,
    cont,
    motor,
    render,
    mision
) {

    const titulo = document.createElement("h2");

    titulo.className = "text-xl font-bold";

    titulo.innerText = paso.pregunta;

    cont.appendChild(titulo);

    paso.opciones.forEach((opcion, index) => {

        const boton = document.createElement("button");

        boton.className =
            "block w-full mt-3 p-4 rounded-xl bg-slate-700 hover:bg-slate-600";

        boton.innerText = opcion;

        boton.onclick = () => {

            if (index === paso.correcta) {

                motor.siguientePaso();

                if (motor.termino()) {
                    terminarMision();

                } else {

                    render();

                }

            } else {

                alert("Incorrecto. Probá nuevamente.");

            }

        };

        cont.appendChild(boton);

    });

};