COMPONENTES.pentagrama = function(notaActual){


    const svgNS =
    "http://www.w3.org/2000/svg";


    const svg =
    document.createElementNS(
        svgNS,
        "svg"
    );


    svg.setAttribute(
        "viewBox",
        "0 0 420 180"
    );


    svg.className =
    "w-full mt-6";



    // clave de sol

    const clave =
    document.createElementNS(
        svgNS,
        "text"
    );


    clave.setAttribute("x","45");
    clave.setAttribute("y","110");
    clave.setAttribute("font-size","80");
    clave.setAttribute("fill","white");
    clave.textContent="𝄞";


    svg.appendChild(clave);



    // líneas del pentagrama

    [40,60,80,100,120]
    .forEach(y=>{


        const linea =
        document.createElementNS(
            svgNS,
            "line"
        );


        linea.setAttribute("x1",90);
        linea.setAttribute("x2",390);

        linea.setAttribute("y1",y);
        linea.setAttribute("y2",y);


        linea.setAttribute(
            "stroke",
            "white"
        );


        linea.setAttribute(
            "stroke-width",
            "2"
        );


        svg.appendChild(linea);


    });



    const posiciones={

        C4:140,
        D4:130,
        E4:120,
        F4:110,
        G4:100,
        A4:90,
        B4:80,
        C5:70

    };


    const y =
    posiciones[notaActual] ?? 120;



    // línea adicional Do central

    if(notaActual==="C4"){


        const ledger =
        document.createElementNS(
            svgNS,
            "line"
        );


        ledger.setAttribute(
            "x1",
            "210"
        );


        ledger.setAttribute(
            "x2",
            "250"
        );


        ledger.setAttribute(
            "y1",
            "140"
        );


        ledger.setAttribute(
            "y2",
            "140"
        );


        ledger.setAttribute(
            "stroke",
            "white"
        );


        svg.appendChild(
            ledger
        );


    }



    // cabeza de nota


    const cabeza =
    document.createElementNS(
        svgNS,
        "ellipse"
    );


    cabeza.setAttribute(
        "cx",
        "230"
    );


    cabeza.setAttribute(
        "cy",
        y
    );


    cabeza.setAttribute(
        "rx",
        "11"
    );


    cabeza.setAttribute(
        "ry",
        "8"
    );


    cabeza.setAttribute(
        "fill",
        "#6366f1"
    );


    cabeza.setAttribute(
        "transform",
        "rotate(-20 230 "+y+")"
    );


    svg.appendChild(cabeza);



    return svg;


};