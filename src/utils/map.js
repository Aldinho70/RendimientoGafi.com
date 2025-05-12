class Map {
    map;

    initMap() {
        if (!this.map) {
            this.map = L.map('map').setView([23.6345, -102.5528], 5); // Centro de México con nivel de zoom 5

            // Agregar capa base (OpenStreetMap)
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© Mapa diseñado por @JMBobadilla para uso exclusivo de Jornada Digital'
            }).addTo(this.map);
        } else {
            console.warn("El mapa ya está inicializado.");
        }
    }

    dibujarRecorrido(coordenadas) {
        if (this.map) {
            this.map.remove(); // Eliminar el mapa anterior
            this.map = null; // Resetear el mapa
            document.getElementById('map').innerHTML = ""; // Limpiar el contenedor
        }

        // Inicializar el mapa y asignarlo a la propiedad de clase
        this.map = L.map('map').setView(coordenadas[0], 13);

        // Agregar capa base (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© Mapa diseñado por @JMBobadilla para uso exclusivo de Jornada Digital'
        }).addTo(this.map);

        // Dibujar la línea del recorrido
        const ruta = L.polyline(coordenadas, { color: 'blue' }).addTo(this.map);

        // Ajustar el mapa al recorrido
        this.map.fitBounds(ruta.getBounds());
    }
}

export default new Map();
