class utils {
    getValueParams(parametros, params, name) {
        for (const key in parametros) {
            if (parametros.hasOwnProperty(key)) {
                const value = parametros[key];
    
                if (params.combustible[key] && Array.isArray(params.combustible[key].units)) { 
                    let combustibleObj = params.combustible[key];
    
                    if (combustibleObj.units.includes(name)) { 
                        return combustibleObj.equation(value); // Retorna el resultado
                    }
                }
            }
        }
        return null;
    }

    encontrarPrimerYUltimo(datos, params) {
        let resultados = {};
    
        // Recorremos los datos una sola vez
        datos.forEach((obj, index) => {
            for (const key in params.combustible) {
                if (obj.hasOwnProperty(key)) {
                    // Si es la primera vez que lo encontramos, lo guardamos
                    if (!resultados[key]) {
                        resultados[key] = { primero: index, ultimo: index };
                    } else {
                        // Si ya existía, solo actualizamos el último
                        resultados[key].ultimo = index;
                    }
                }
            }
        });
    
        return resultados;
    }
    
    
}

export default new utils();