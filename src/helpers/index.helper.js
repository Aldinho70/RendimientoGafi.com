import Map from '../utils/map.js';
import Speed from '../utils/speed.js';
import Utils from '../utils/utils.js';
import { params } from '../config/config.js';
import Haversine from '../utils/Haversine.js';
import Timestamp from '../utils/timestamp.js';
import Performance from '../utils/performance.js';
import Highcharts from '../api/highchart/index.highchart.js';
import MessagesService from '../api/wialon/messages.wialon.js';
class index_helper {

    /**
     * Funcion para cargar las unidades disponibles
     */
    getUnits = async (sdk) => {
        const units = await sdk.init();

        this.generateHTMLSelect(units, '#unitsSelect');
    }
    /* ------------------------------------------- */

    /**
     * Funcion para generar el HTML del Select, se muestran todas las unidades
     */
    generateHTMLSelect = (units, id) => {
        $('#unitsSelect').select2();
        units.forEach(unit => {
            // console.log( unit.getId(), unit.getName() );      
            $(id).append(`<option value="${unit.getId()}">${unit.getName()}</option>`);
        });
    }
    /* --------------------------------------------------------------------- */

    /**
     * Funcion para generar el HTML del Select, se muestran todas las unidades
     */
    generateHTMLInfo = (data, id) => {
        $(id).html(`${data}`);
    }
    /* --------------------------------------------------------------------- */

    /**
     * Funcion para cargar los mensajes totales de una unidad
     */
    getMessagesLoader = async (unit, from, to) => {
        const _from = Timestamp.toUnixTimestamp(from);
        const _to = Timestamp.toUnixTimestamp(to);

        const messageService = new MessagesService(unit, _from, _to);
        const unit_messages = await messageService.loadMessages();
        const unit_data = await messageService.getInfoUnit(unit);

        const name = unit_data.getName();
        const sensors = unit_data.getSensors();

        const sensor_fuel = params.combustible?.[name]?.id
            ? unit_data.getSensor(params.combustible[name].id)
            : 0;
        
        const sensor_fuel_usage = params.combustible_usado?.[name]?.id
            ? unit_data.getSensor(params.combustible_usado[name].id)
            : 0;

        const { messages, count } = unit_messages;

        if (messages.length > 0) {
            const coordinates = [];
            const speeds = [];
            const combustibles = [];
            let combustible_usage;

            messages.map(element => {

                const {
                    t: timestamp = 0,
                    pos: posicion = {},
                    p: parametros = {}
                } = element;

                const {
                    x: longitud = 0,
                    y: latitud = 0,
                    s: speed = 0
                } = posicion || {};

                const combustible = unit_data.calculateSensorValue(sensor_fuel, element);                

                if (combustible != -348201.3876) {
                    combustibles.push(Math.round(combustible))
                }

                combustible_usage = (unit_data.calculateSensorValue(sensor_fuel_usage, element) != -348201.3876) && unit_data.calculateSensorValue(sensor_fuel_usage, element);

                if (latitud && longitud) {
                    coordinates.push([latitud, longitud]);
                }

                speeds.push(speed);

                const fecha = Timestamp.getTimeByTimestamp(timestamp);
            });
            
            Map.dibujarRecorrido(coordinates);

            const totalStop = Speed.totalStops(speeds);
            this.generateHTMLInfo(`${totalStop} paradas`, '#paradas');

            const promedio = Speed.calcularPromedioVelocidad(speeds);
            // console.log(`Promedio de velocidad: ${promedio.toFixed(2)} km/h`);
            this.generateHTMLInfo(`${promedio.toFixed(2)} Km/h`, '#velocidadPromedio');

            const start_combustible = combustibles[0];
            const end_combustible = combustibles[combustibles.length - 1];

            const {
                t: start,
            } = messages[0];
            const {
                t: end,
            } = messages[messages.length - 1];

            Highcharts.initChart({ start_combustible, end_combustible });

            this.generateHTMLInfo(`${(start_combustible)} Litros`, '#consumoInicial');
            this.generateHTMLInfo(`${(end_combustible)} Litros`, '#consumoFinal');

            const elapsedTime = Timestamp.getElapsedTime(start, end);
            this.generateHTMLInfo(elapsedTime.formatted, '#tiempoViaje');

            const totalKm = Haversine.calculateDistanceByLatLong(coordinates);
            this.generateHTMLInfo(`${totalKm}KM`, '#kmRecorridos');

            this.generateHTMLInfo(`${combustible_usage} Litros`, '#combustible_consumido');

            const rendimiento = Performance.calcularRendimiento(totalKm, combustible_usage);

            this.generateHTMLInfo(`${rendimiento} km/l`, '#rendimiento');

        } else {
            console.log('No hay mensajes');
        }
    }
    /* --------------------------------------------------- */

}
export default new index_helper();