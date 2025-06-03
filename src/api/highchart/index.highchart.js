// Gráfica con Highcharts
class Highchart {
    // initChart(data) {
    //     Highcharts.chart('graficaConsumo', {
    //         chart: {
    //             type: 'column'
    //         },
    //         title: {
    //             text: 'Carga y descarga de Combustible'
    //         },
    //         xAxis: {
    //             categories: ['Consumo', 'Carga']
    //         },
    //         yAxis: {
    //             title: {
    //                 text: 'Litros (L)'
    //             }
    //         },
    //         series: [{
    //             name: 'Unidad 1',
    //             data: [
    //                 { y: (data.consumo), color: 'red' },
    //                 { y: (data.carga), color: 'green' }
    //             ]
    //         }]
    //     });
    // }

    initChartLine(data) {
        const transformedData = data.map(item => [
            item.timestamp * 1000,  // Convertir timestamp a milisegundos
            item.fuel
        ]);

        Highcharts.chart('graficaComportamiento', {
            chart: {
                zoomType: 'x',  // Habilita zoom horizontal
                backgroundColor: '#ffffff',
                borderRadius: 8,
                spacing: [10, 10, 15, 10],
            },
            title: {
                text: 'Comportamiento de barra de combustible'
            },
            subtitle: {
                text: 'Arrastra en el gráfico para hacer zoom'
            },
            xAxis: {
                type: 'datetime',
                title: {
                    text: 'Hora'
                }
            },
            yAxis: {
                title: {
                    text: 'Cantidad de Combustible (litros)'
                },
                min: 0
            },
            tooltip: {
                xDateFormat: '%H:%M:%S',
                shared: true,
                valueSuffix: ' litros'
            },
            legend: {
                enabled: true
            },
            exporting: {
                enabled: true  // Botón de exportar imagen, PDF, etc.
            },
            credits: {
                enabled: false  // Quitar marca de agua de Highcharts
            },
            plotOptions: {
                series: {
                    marker: {
                        enabled: true,  // Muestra puntos sobre la línea
                        radius: 3
                    }
                }
            },
            series: [{
                name: 'Combustible',
                data: transformedData,
                color: '#007bff',
                lineWidth: 2
            }],
            navigator: {
                enabled: true  // Barra de navegación abajo
            },
            scrollbar: {
                enabled: true  // Scroll horizontal
            },
            rangeSelector: {
                enabled: false  // No se necesita si no usa rangos fijos
            }
        });
    }

    initChart(dataPorDia) {
            let dias = [];
            let cargas = [];
            let descargas = [];

        for (const key in dataPorDia) {
            if (Object.prototype.hasOwnProperty.call(dataPorDia, key)) {
                const element = dataPorDia[key];
                
                if(element.horas){
                    dias.push(key)
                    cargas.push(element.carga)
                    descargas.push(element.descarga)
                }

            }
        }

        console.log( cargas, descargas, dias );

        Highcharts.chart('graficaConsumo', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Carga y Descarga de Combustible por Día'
            },
            xAxis: {
                categories: dias,
                title: { text: 'Fecha' }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Litros'
                }
            },
            tooltip: {
                shared: true,
                valueSuffix: ' L'
            },
            plotOptions: {
                column: {
                    grouping: true,
                    shadow: false
                }
            },
            series: [
                {
                    name: 'Carga',
                    data: cargas,
                    color: '#28a745'
                },
                {
                    name: 'Descarga',
                    data: descargas,
                    color: '#dc3545'
                }
            ]
        });
    }
}
export default new Highchart();
