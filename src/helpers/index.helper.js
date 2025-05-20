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
            // console.log(messages);

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
                    const time = new Date(element.t * 1000).toLocaleTimeString('es-MX', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                    })
                    combustibles.push({
                            'timestamp': element.t,
                            'hour': time,
                            'fuel':Math.round(combustible)
                        }
                    )
                }

                // combustible_usage = (unit_data.calculateSensorValue(sensor_fuel_usage, element) != -348201.3876) && unit_data.calculateSensorValue(sensor_fuel_usage, element);

                if (latitud && longitud) {
                    coordinates.push([latitud, longitud]);
                }

                speeds.push(speed);

                const fecha = Timestamp.getTimeByTimestamp(timestamp);
            });

            Map.dibujarRecorrido(coordinates);

            if (sensor_fuel === 0) {
                Utils.showToast("Unidad sin datos de combustible", "Error", "danger");
                this.generateHTMLInfo(`N/D`, '.kpis');
                Highcharts.initChartLine([]);
                Highcharts.initChart([]);
            } else {
                // if( !combustible_usage ){
                    const combustiblesRegulados = Performance.suavizarCombustible( combustibles );
                    // combustible_usage = (Performance.calcularConsumoReal(combustiblesRegulados));
                    const promediocombustibles = Performance.agruparPromediosPorHora(combustibles);
                    const combustible_usage = Performance.calcularConsumoYCarga(promediocombustibles);
                    const combustible_usage_dias =  Performance.calcularConsumoYCargaPorDia(promediocombustibles);
                // }

                const {
                    t: start,
                } = messages[0];
                const {
                    t: end,
                } = messages[messages.length - 1];
                const elapsedTime = Timestamp.getElapsedTime(start, end);
                this.generateHTMLInfo(elapsedTime.formatted, '#tiempoViaje');
                
                if( combustibles.length ){
                    
                    const start_combustible = combustibles[0].fuel;
                    this.generateHTMLInfo(`${(start_combustible)} Litros`, '#consumoInicial');
                    
                    const end_combustible = combustibles[combustibles.length - 1].fuel;
                    this.generateHTMLInfo(`${(end_combustible)} Litros`, '#consumoFinal');
    
                    Highcharts.initChartLine(combustiblesRegulados);
                    Highcharts.initChart(combustible_usage_dias);

                    this.generateHTMLInfo(`${Math.round(combustible_usage.consumo)} Litros`, '#descargaTotal');
                    this.generateHTMLInfo(`${Math.round(combustible_usage.carga)} Litros`, '#cargaTotal');

                    this.generateHTMLInfo(`${Math.round(combustible_usage.consumo)} Litros`, '#combustible_consumido');
    
                    const totalKm = Haversine.calculateDistanceByLatLong(coordinates);                
                    this.generateHTMLInfo(`${Math.round(totalKm)}KM`, '#kmRecorridos');

                    const rendimiento = Performance.calcularRendimiento(Math.round(totalKm), Math.round(combustible_usage.consumo));
                    this.generateHTMLInfo(`${rendimiento.toFixed(2)} km/l`, '#rendimiento');
                }else{
                    Utils.showToast(`Error de lectura de sensor ${sensor_fuel.n}`, "Error", "danger");
                    this.generateHTMLInfo(`N/D`, '.kpis');
                    Highcharts.initChartLine([]);
                    Highcharts.initChart([]);
                }

                const totalStop = Speed.totalStops(speeds);
                this.generateHTMLInfo(`${totalStop} paradas`, '#paradas');

                const promedio = Speed.calcularPromedioVelocidad(speeds);
                this.generateHTMLInfo(`${promedio.toFixed(2)} Km/h`, '#velocidadPromedio');
            }
        } else {
            Utils.showToast("No hay mensajes", "Error", "info");
        }
    }
    /* --------------------------------------------------- */

}
export default new index_helper();