class Motor {

    constructor(mision) {

        this.mision = mision;
        this.pasoActual = 0;

    }

    get paso() {

        return this.mision.pasos[this.pasoActual];

    }

    siguientePaso() {

        this.pasoActual++;

        return this.paso;

    }

    termino() {

        return this.pasoActual >= this.mision.pasos.length;

    }

}