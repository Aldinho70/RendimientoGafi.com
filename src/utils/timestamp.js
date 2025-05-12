class Timestamp {
    getTimeByTimestamp = ( timestamp ) => {
        const date = new Date(timestamp * 1000);
        const formattedDate = date.toLocaleString();
        return formattedDate;
    }

    getElapsedTime = (startTimestamp, endTimestamp) => {
        // Convertir a milisegundos si los timestamps están en segundos
        const startMs = startTimestamp * 1000;
        const endMs = endTimestamp * 1000;
    
        const elapsedMs = endMs - startMs; // Diferencia en milisegundos
    
        if (elapsedMs < 0) {
            throw new Error("El timestamp final debe ser mayor que el inicial.");
        }
    
        const seconds = Math.floor(elapsedMs / 1000) % 60;
        const minutes = Math.floor(elapsedMs / (1000 * 60)) % 60;
        const hours = Math.floor(elapsedMs / (1000 * 60 * 60)) % 24;
        const days = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
    
        return {
            days,
            hours,
            minutes,
            seconds,
            formatted: `${days}d ${hours}h ${minutes}m ${seconds}s`,
        };

        // // Ejemplo de uso:
        // const startTimestamp = 1672531200000; // Lunes, 1 de enero de 2023, 00:00:00 UTC
        // const endTimestamp = 1672617600000;   // Martes, 2 de enero de 2023, 00:00:00 UTC
        
        // const elapsedTime = getElapsedTime(startTimestamp, endTimestamp);
        // console.log(`Tiempo transcurrido: ${elapsedTime.formatted}`);
    }

    toUnixTimestamp(datetime) {
        // Convertimos el string a un objeto Date
        const date = new Date(datetime);
    
        // Retornamos el timestamp en segundos
        return Math.floor(date.getTime() / 1000);

        // Ejemplo de uso
        // const datetime = "2025-01-23T11:11";
        // const unixTimestamp = toUnixTimestamp(datetime);
    }
    
}

export default new Timestamp()