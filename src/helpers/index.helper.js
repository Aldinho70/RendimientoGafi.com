import Map from '../utils/map.js';
import Speed from '../utils/speed.js';
import Utils from '../utils/utils.js';
import { params } from '../config/config.js';
import Haversine from '../utils/Haversine.js';
import Timestamp from '../utils/timestamp.js';
import Performance from '../utils/performance.js';
import Highcharts from '../api/highchart/index.highchart.js';
import MessagesService from '../api/wialon/messages.wialon.js';
import { getSensorByName } from '../api/wialon/utils/sensors/utils.js';
import { agruparPorDia, agruparPorHora, eliminarRepetidosConsecutivos, filtrarCargasValidas } from '../utils/performanceFuel.js';
import timestamp from '../utils/timestamp.js';

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

        /* Quitar esta baina de aqui, se puso de emergencia */
        const params = new URLSearchParams(window.location.search);
        const idUnit = params.get("idUnit"); 
        
        if( idUnit ){
            $("#unitsSelect").empty();
            $("#unitsSelect").append(
                $("<option>", {
                    value: idUnit,  // value del option
                    text: name,    // texto visible
                    selected: true
                })
            );

            $("#unitsSelect").prop("disabled", true);
        }
        /* Quitar esta baina de aqui, se puso de emergencia */

        const sensor_fuel = getSensorByName('COMBUSTIBLE DASHBOARD', sensors)?.id
            ? unit_data.getSensor(getSensorByName('COMBUSTIBLE DASHBOARD', sensors).id)
            : 0;

        const { messages, count } = unit_messages;

        if (messages.length > 0) {
            // console.log('mensaje: ',messages);

            const coordinates = [];
            const speeds = [];
            let combustibles = [];
            let combustiblesPruebas = [];
            
            messages.map(element => {
                const { pos: posicion = {}, } = element;

                const {
                    x: longitud = 0,
                    y: latitud = 0,
                    s: speed = 0
                } = posicion || {};

                /* array de velocidades registradas */
                    if( element.pos ){
                        speeds.push(element.pos.s);
                    }

                /* array de posiciones registradas */
                    if (latitud && longitud) {
                        coordinates.push([latitud, longitud]);
                    }
                
                /* array de combutible */
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
                        'fuel': Math.round(combustible),
                        'speed': (element.pos) ? element.pos.s : 0,
                        'mov': element.p.movement_sens
                    })
                    
                    if( element.pos ){
                        if (element.pos.s == 0 ) {
                            if( timestamp.isQuarterHour(time, 0) ){
                                combustiblesPruebas.push({
                                    'timestamp': element.t,
                                    'hour': time,
                                    'fuel': Math.round(combustible),
                                    'speed': element.pos.s,
                                    'mov': element.p.movement_sens
                                })
                            }
                        }
                    }
                }
            });
            
            /* Dibujar recorrido de la unidad */
            Map.dibujarRecorrido(coordinates);
            
            if (sensor_fuel === 0) {
                Utils.showToast("Unidad sin datos de combustible", "Error", "danger");
                this.generateHTMLInfo(`Sin datos`, '.kpis');
                Highcharts.initChartLine([]);
                Highcharts.initChart([]);
            } else {
                /* Filtrado y limpeza del array de combustible*/
                const combustibleLimpio = eliminarRepetidosConsecutivos(combustiblesPruebas)
                
                const combustiblePorHora = agruparPorHora(combustibleLimpio);
                
                const combustiblePorDia = agruparPorDia(combustiblePorHora);

                this.generateHTMLInfo( Math.round((combustiblesPruebas.length * 15) / 60) , '#tiempoViaje');

                if (combustibles.length) {
                    /* Graficas de combustible */
                    Highcharts.initChart(combustiblePorDia);
                    Highcharts.initChartLine(combustibleLimpio);
                    
                    /* Datos de carga y descarga de combustible */
                    this.generateHTMLInfo(`${Math.round(combustiblePorDia.totalCarga)}`, '#cargaTotal');
                    this.generateHTMLInfo(`${Math.round(combustiblePorDia.conteoCargas)}`, '#cargas_totales');
                    this.generateHTMLInfo(`${Math.round(combustiblePorDia.totalDescarga)}`, '#descargaTotal');

                    /* combustible inicial */
                    const start_combustible = combustibles[0].fuel;
                    this.generateHTMLInfo(`${(start_combustible)}`, '#consumoInicial');
                    
                    /* combustible final */
                    const end_combustible = combustibles[combustibles.length - 1].fuel;
                    this.generateHTMLInfo(`${(end_combustible)}`, '#consumoFinal');
                    
                    /* Kilometros totales */
                    const totalKm = Haversine.calculateDistanceByLatLong(coordinates);
                    this.generateHTMLInfo(`${Math.round(totalKm)}`, '#kmRecorridos');
                    
                    /* Rendimiento de combustible y kilometros*/
                    const rendimiento = Performance.calcularRendimiento(Math.round(totalKm), Math.round(combustiblePorDia.totalDescarga));
                    this.generateHTMLInfo(`${rendimiento.toFixed(2)}`, '#rendimiento');
                } else {
                    Utils.showToast(`Error de lectura de sensor ${sensor_fuel.n}`, "Error", "danger");
                    this.generateHTMLInfo(`Sin datos`, '.kpis');
                    Highcharts.initChartLine([]);
                    Highcharts.initChart([]);
                }

                const totalStop = Speed.totalStops(speeds);
                this.generateHTMLInfo(`${totalStop} paradas`, '#paradas');

                const promedio = Speed.calcularPromedioVelocidad(speeds);
                this.generateHTMLInfo(`${promedio.toFixed(2)}`, '#velocidadPromedio');
            }
        } else {
            Utils.showToast("No hay mensajes", "Error", "info");
        }
    }
    /* --------------------------------------------------- */
}
export default new index_helper();