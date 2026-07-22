//teclado.js


COMPONENTES.teclado = function(notaActual){


    const contenedor =
    document.createElement("div");


    contenedor.className =
    `
    relative
    flex
    justify-center
    mt-8
    h-36
    `;



    const teclado =
    document.createElement("div");


    teclado.className =
    `
    relative
    flex
    h-32
    `;



    const teclasBlancas =
    DATOS_NOTAS.teclado.map(nota=>[
        nota.nota,
        nota.nombre
    ]);



    teclasBlancas.forEach(item=>{


        const tecla =
        document.createElement("div");


        tecla.innerText =
        item[1];


        tecla.dataset.nota =
        item[0];



        tecla.className =
        `
        w-12
        h-32
        bg-white
        border
        border-slate-400
        rounded-b-lg
        text-black
        flex
        items-end
        justify-center
        pb-2
        font-bold
        `;



        if(item[0].trim() === notaActual.trim()){

            tecla.classList.remove(
                "bg-white"
            );

            tecla.classList.add(
                "bg-indigo-400"
            );

        }


        teclado.appendChild(tecla);


    });



    const teclasNegras = [

        {
            nota:"C#4",
            izquierda:34
        },

        {
            nota:"D#4",
            izquierda:82
        },

        {
            nota:"F#4",
            izquierda:178
        },

        {
            nota:"G#4",
            izquierda:226
        },

        {
            nota:"A#4",
            izquierda:274
        }

    ];



    teclasNegras.forEach(item=>{


        const tecla =
        document.createElement("div");



        tecla.dataset.nota =
        item.nota;



        tecla.className =
        `
        absolute
        top-0
        w-7
        h-20
        bg-black
        rounded-b-lg
        z-10
        `;



        tecla.style.left =
        item.izquierda+"px";


        if(item.nota.trim() === notaActual.trim()){


            tecla.classList.remove(
                "bg-black"
            );


            tecla.classList.add(
                "bg-indigo-500"
            );


        }



        teclado.appendChild(tecla);


    });



    contenedor.appendChild(teclado);



    return contenedor;


};