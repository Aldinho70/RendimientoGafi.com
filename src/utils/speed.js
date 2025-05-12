class Speed {
     calcularPromedioVelocidad(velocidades) {
        if (!velocidades.length) {
            throw new Error("El array de velocidades está vacío.");
        }
    
        const sumaVelocidades = velocidades.reduce((acumulador, velocidad) => acumulador + velocidad, 0);
        const promedio = sumaVelocidades / velocidades.length;
    
        return promedio; // Promedio en la misma unidad que las velocidades

        // Ejemplo de uso:
        // const velocidades = [60, 70, 80, 90, 100]; // Velocidades en km/h
        // const promedio = calcularPromedioVelocidad(velocidades);
        // console.log(`Promedio de velocidad: ${promedio.toFixed(2)} km/h`);
    } 
    
    totalStops( speeds ){
        let cont = 0;
        speeds.map( speed => {
            if(speed = 0){
                cont += 1;
            }
        })

        return cont;
    }
}
export default new Speed();