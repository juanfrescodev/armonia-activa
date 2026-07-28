window.COMPONENTES = window.COMPONENTES || {};


COMPONENTES.constructor_intervalo = function(
    paso,
    contenedor,
    motor,
    render
){

    contenedor.innerHTML = "";


    const titulo =
    document.createElement("h2");


    titulo.className =
    "text-2xl font-bold mb-6 text-indigo-400";


    titulo.innerText =
    paso.pregunta;


    contenedor.appendChild(titulo);



    const mensaje =
    document.createElement("div");


    mensaje.className =
    "bg-slate-800 p-6 rounded-2xl text-center";


    mensaje.innerText =
    "Componente constructor intervalo en construcción";


    contenedor.appendChild(mensaje);


};