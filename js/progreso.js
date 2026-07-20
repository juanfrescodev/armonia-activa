function obtenerProgreso() {

    return JSON.parse(
        localStorage.getItem("misionesCompletadas") || "[]"
    );

}



function completarMision(id) {

    const progreso = obtenerProgreso();

    if (!progreso.includes(id)) {

        progreso.push(id);

        localStorage.setItem(
            "misionesCompletadas",
            JSON.stringify(progreso)
        );

    }

}





function obtenerMundosCompletados(){

    return JSON.parse(
        localStorage.getItem("mundosCompletados") || "[]"
    );

}




function completarMundo(id){

    const mundos =
    obtenerMundosCompletados();

    if(!mundos.includes(id)){

        mundos.push(id);

        localStorage.setItem(
            "mundosCompletados",
            JSON.stringify(mundos)
        );

    }

}





// ----------------------------
// PERFIL DEL JUGADOR
// ----------------------------

function obtenerXP(){

    return Number(
        localStorage.getItem("xp") || 0
    );

}



function agregarXP(cantidad){

    const xp =
    obtenerXP() + cantidad;

    localStorage.setItem(
        "xp",
        xp
    );

}



function obtenerNivel(){

    const xp =
    obtenerXP();

    let nivel = 1;

    let requerido = 100;

    let acumulado = 0;

    while(xp >= acumulado + requerido){

        acumulado += requerido;

        nivel++;

        requerido += 50;

    }

    return nivel;

}



function obtenerXPNivel(){

    const xp =
    obtenerXP();

    let nivel = 1;

    let requerido = 100;

    let acumulado = 0;

    while(xp >= acumulado + requerido){

        acumulado += requerido;

        nivel++;

        requerido += 50;

    }

    return {

        nivel,

        actual:
        xp - acumulado,

        necesario:
        requerido,

        porcentaje:
        Math.min(
            ((xp - acumulado) / requerido) * 100,
            100
        )

    };

}





// ----------------------------
// CONSULTAS DEL CURSO
// ----------------------------

function obtenerTodasLasMisiones(){

    return Object.values(DB_MUNDOS)
        .flatMap(
            mundo => mundo.misiones
        );

}



function obtenerCantidadMisiones(){

    return obtenerTodasLasMisiones().length;

}



function obtenerCantidadMundos(){

    return Object.keys(DB_MUNDOS).length;

}