class Perfomance {

    calcularRendimiento(distanciaKm, combustibleLitros) {
        if (combustibleLitros <= 0) {
            return null; // Evita división entre 0 o valores inválidos
        }
        return distanciaKm / combustibleLitros;
    }

}

export default new Perfomance();