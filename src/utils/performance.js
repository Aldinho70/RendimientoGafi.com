class Perfomance {

    calcularRendimiento(distanciaKm, combustibleLitros) {
        if (combustibleLitros <= 0) {
            return null;
        }
        return distanciaKm / combustibleLitros;
    }

    calcularConsumoReal(combustible) {
        let consumo = 0;

        for (let i = 0; i < combustible.length - 1; i++) {
            let actual = combustible[i].fuel;
            let siguiente = combustible[i + 1].fuel;

            if (siguiente < actual) {
                consumo += (actual - siguiente);
            }
        }

        return consumo;
    }

    suavizarCombustible(data, ventana = 3) {
        const resultado = [];
        const mitad = Math.floor(ventana / 2);

        for (let i = 0; i < data.length; i++) {
            let inicio = Math.max(0, i - mitad);
            let fin = Math.min(data.length, i + mitad + 1);
            let segmento = data.slice(inicio, fin);

            let promedio = segmento.reduce((sum, obj) => sum + obj.fuel, 0) / segmento.length;

            resultado.push({
                ...data[i],
                fuel_suavizado: parseFloat(promedio.toFixed(2))
            });
        }

        return resultado;
    }

    agruparPromediosPorHora(data) {
        const grupos = {};

        data.forEach(entry => {
            // Extrae la hora en formato 'HH' desde '00:04', '01:04', etc.
            let hora = entry.hour.split(':')[0];

            if (!grupos[hora]) grupos[hora] = [];

            grupos[hora].push(entry.fuel);
        });

        const resultado = [];

        for (let hora in grupos) {
            const valores = grupos[hora];
            const promedio = valores.reduce((a, b) => a + b, 0) / valores.length;
            resultado.push({ hora, promedioFuel: promedio });
        }

        return resultado;
    }

    calcularConsumoYCarga(data, umbral = 3) {
        let consumo = 0;
        let carga = 0;

        for (let i = 1; i < data.length; i++) {
            const anterior = data[i - 1].promedioFuel;
            const actual = data[i].promedioFuel;
            const diferencia = actual - anterior;

            if (Math.abs(diferencia) < umbral) continue;

            if (diferencia > 0) {
                carga += diferencia;
            } else {
                consumo += Math.abs(diferencia);
            }
        }

        return {
            consumo: Number(consumo.toFixed(2)),
            carga: Number(carga.toFixed(2))
        };
    }


}

export default new Perfomance();