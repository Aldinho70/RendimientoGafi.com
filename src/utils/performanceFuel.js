export function filtrarCargasValidas(registros, umbralMinLitros = 5) {
    if (!Array.isArray(registros) || registros.length === 0) return [];

    const resultado = [];
    let anterior = registros[0];

    for (let i = 1; i < registros.length; i++) {
        const actual = registros[i];
        const diferencia = actual.fuel - anterior.fuel;

        // Solo considerar como carga válida si el aumento es significativo
        if (diferencia >= umbralMinLitros) {
            resultado.push(actual);
        }

        // Siempre actualizar el anterior
        anterior = actual;
    }

    return resultado;
}

export function eliminarRepetidosConsecutivos(array) {
    if (!Array.isArray(array) || array.length === 0) return [];

    const resultado = [array[0]];

    for (let i = 1; i < array.length; i++) {
        const actual = array[i];
        const anterior = array[i - 1];

        if (actual.fuel !== anterior.fuel) {
            resultado.push(actual);
        }
    }

    return resultado;
}

export function agruparPorHora(array) {
    if (!Array.isArray(array) || array.length === 0) return {};

    const agrupados = {};

    array.forEach(registro => {
        let fecha;

        // Convertir timestamp Unix en segundos a Date
        if (typeof registro.timestamp === 'number') {
            fecha = new Date(registro.timestamp * 1000);
        } else {
            fecha = new Date(registro.timestamp);
        }

        if (isNaN(fecha.getTime())) return; // Ignorar fechas inválidas

        const claveHora = `${fecha.getFullYear()}-${(fecha.getMonth() + 1).toString().padStart(2, '0')}-${fecha.getDate().toString().padStart(2, '0')} ${fecha.getHours().toString().padStart(2, '0')}`;

        if (!agrupados[claveHora]) {
            agrupados[claveHora] = {
                registros: [],
                totalFuel: 0,
                promedioFuel: 0
            };
        }

        agrupados[claveHora].registros.push(registro);
        agrupados[claveHora].totalFuel += registro.fuel;
    });

    // Calcular promedio por hora
    for (const hora in agrupados) {
        const grupo = agrupados[hora];
        const cantidad = grupo.registros.length;
        grupo.promedioFuel = cantidad > 0 ? grupo.totalFuel / cantidad : 0;
        delete grupo.totalFuel; // Limpiamos campo temporal
    }

    return agrupados;
}

export function agruparPorDia(objetoPorHora) {
    const agrupadoPorDia = {};
    let totalCarga = 0;
    let totalDescarga = 0;
    let conteoCargas = 0;

    // Agrupar por día
    for (const claveHora in objetoPorHora) {
        const [fecha] = claveHora.split(' ');

        if (!agrupadoPorDia[fecha]) {
            agrupadoPorDia[fecha] = [];
        }

        agrupadoPorDia[fecha].push({
            hora: claveHora,
            ...objetoPorHora[claveHora]
        });
    }

    // Calcular carga y descarga por día
    const resultadoFinal = {};

    for (const fecha in agrupadoPorDia) {
        const horasDelDia = agrupadoPorDia[fecha];

        // Ordenar por hora
        horasDelDia.sort((a, b) => a.hora.localeCompare(b.hora));

        let carga = 0;
        let descarga = 0;

        for (let i = 1; i < horasDelDia.length; i++) {
            const prev = horasDelDia[i - 1].promedioFuel;
            const actual = horasDelDia[i].promedioFuel;
            const diferencia = actual - prev;
            
            if (diferencia > 10) {
                carga += diferencia;
            } else if (diferencia < 10) {
                descarga += Math.abs(diferencia);
            }
        }

        resultadoFinal[fecha] = {
            horas: horasDelDia,
            carga,
            descarga
        };

        // Sumar al total
        totalCarga += carga;
        totalDescarga += descarga;
        if (carga > 0) conteoCargas++;
    }

    // Agregar resumen general
    resultadoFinal.totalCarga = totalCarga;
    resultadoFinal.totalDescarga = totalDescarga;
    resultadoFinal.conteoCargas = conteoCargas;

    // console.log(resultadoFinal);
    
    return resultadoFinal;
}