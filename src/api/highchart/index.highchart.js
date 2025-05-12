// Gráfica con Highcharts
class Highchart {
    initChart(data) {
        Highcharts.chart('graficaConsumo', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Consumo de Combustible'
            },
            xAxis: {
                categories: ['Inicio', 'Fin']
            },
            yAxis: {
                title: {
                    text: 'Litros (L)'
                }
            },
            series: [{
                name: 'Unidad 1',
                data: [
                    { y: (data.start_combustible), color: 'green' },
                    { y: (data.end_combustible), color: 'red' }
                ]
            }]
        });
    }
}

    // initChartLine(data){
    //     Highcharts.chart('container', {
    //         chart: {
    //             type: 'line'
    //         },
    //         title: {
    //             text: 'Nivel Neto de Combustible en un Día Específico'
    //         },
    //         xAxis: {
    //             type: 'datetime',
    //             title: {
    //                 text: 'Hora'
    //             }
    //         },
    //         yAxis: {
    //             title: {
    //                 text: 'Nivel Neto (litros)'
    //             }
    //         },
    //         series: [{
    //             name: 'Nivel Neto',
    //             data: [
    //                 [Date.UTC(2023, 4, 12, 0, 0), 200],
    //                 [Date.UTC(2023, 4, 12, 1, 0), 500],
    //                 [Date.UTC(2023, 4, 12, 2, 0), 600],
    //                 [Date.UTC(2023, 4, 12, 3, 0), 800],
    //                 [Date.UTC(2023, 4, 12, 4, 0), 1100],
    //                 [Date.UTC(2023, 4, 12, 5, 0), 1300],
    //                 [Date.UTC(2023, 4, 12, 6, 0), 1400]
    //             ]
    //         }]
    //     });

    // }

export default new Highchart();
