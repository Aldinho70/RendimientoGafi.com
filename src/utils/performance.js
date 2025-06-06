class Perfomance {

    calcularRendimiento(distanciaKm, combustibleLitros) {
        if (combustibleLitros <= 0) {
            return 0;
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
            let hora = entry.hour.split(':')[0];

            if (!grupos[hora]) {
                grupos[hora] = {
                    fuel: [],
                    timestamp: entry.timestamp // primer timestamp que aparece en esa hora
                };
            }

            grupos[hora].fuel.push(entry.fuel);
        });

        const resultado = [];

        for (let hora in grupos) {
            const valores = grupos[hora].fuel;
            const promedio = valores.reduce((a, b) => a + b, 0) / valores.length;
            resultado.push({
                hora,
                promedioFuel: promedio,
                timestamp: grupos[hora].timestamp
            });
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

    // analizarCombustiblePorDia(data) {
    //     const resultado = {};

    //     data.forEach((item, index) => {
    //         const fecha = new Date(item.timestamp * 1000);
    //         const dia = fecha.toISOString().split('T')[0]; // YYYY-MM-DD

    //         if (!resultado[dia]) {
    //             resultado[dia] = {
    //                 fechaLegible: fecha.toDateString(),
    //                 timestamp: item.timestamp,
    //                 carga: [],
    //                 descarga: []
    //             };
    //         }

    //         // Comparar con el punto anterior
    //         if (index > 0) {
    //             const fuelAnterior = data[index - 1].fuel;
    //             const diferencia = item.fuel - fuelAnterior;

    //             if (diferencia > 0) {
    //                 resultado[dia].carga.push({
    //                     de: fuelAnterior,
    //                     a: item.fuel,
    //                     diferencia,
    //                     hora: item.hour
    //                 });
    //             } else if (diferencia < 0) {
    //                 resultado[dia].descarga.push({
    //                     de: fuelAnterior,
    //                     a: item.fuel,
    //                     diferencia,
    //                     hora: item.hour
    //                 });
    //             }
    //         }
    //     });

    //     return resultado;
    // }

    calcularConsumoYCargaPorDia(data, umbral = 3) {
    const gruposPorDia = {};

    // Agrupar por día (UTC)
    data.forEach(entry => {
        const fecha = new Date(entry.timestamp * 1000);
        const dia = fecha.toISOString().split('T')[0]; // YYYY-MM-DD

        if (!gruposPorDia[dia]) gruposPorDia[dia] = [];

        gruposPorDia[dia].push(entry);
    });

    const resultado = [];

    for (let dia in gruposPorDia) {
        const entradas = gruposPorDia[dia];

        // Ordenar por timestamp por si llegan desordenados
        entradas.sort((a, b) => a.timestamp - b.timestamp);

        let consumo = 0;
        let carga = 0;

        for (let i = 1; i < entradas.length; i++) {
            const anterior = entradas[i - 1].promedioFuel;
            const actual = entradas[i].promedioFuel;
            const diferencia = actual - anterior;

            if (Math.abs(diferencia) < umbral) continue;

            if (diferencia > 0) {
                carga += diferencia;
            } else {
                consumo += Math.abs(diferencia);
            }
        }

        resultado.push({
            dia,
            consumo: Number(consumo.toFixed(2)),
            carga: Number(carga.toFixed(2))
        });
    }

    return resultado;
}




}

export default new Perfomance();