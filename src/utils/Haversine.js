class Haversine{
    haversineDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radio de la Tierra en km
        const toRadians = (degrees) => (degrees * Math.PI) / 180;
    
        const dLat = toRadians(lat2 - lat1);
        const dLon = toRadians(lon2 - lon1);
    
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRadians(lat1)) *
                Math.cos(toRadians(lat2)) *
                Math.sin(dLon / 2) ** 2;
    
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        return R * c; // Distancia en kilómetros
    }
    
    calculateDistanceByLatLong = (coordinates) =>{
        let totalDistance = 0;
    
        for (let i = 0; i < coordinates.length - 1; i++) {
            const [lat1, lon1] = coordinates[i];
            const [lat2, lon2] = coordinates[i + 1];
    
            totalDistance += this.haversineDistance(lat1, lon1, lat2, lon2);
        }
    
        return totalDistance.toFixed(2); // Total en kilómetros
    }

}

export default new Haversine();
// // Ejemplo de uso:
// const routeCoordinates = [
//     [25.6866, -100.3161], // Punto A (lat, lon) - Monterrey
//     [25.6872, -100.3180], // Coordenada 1 (lat, lon)
//     [25.6880, -100.3195], // Coordenada 2 (lat, lon)
//     [25.6890, -100.3200]  // Punto B (lat, lon)
// ];

// const totalKm = calculateDistanceByLatLong(routeCoordinates);
// console.log(`Distancia total recorrida: ${totalKm} km`);
