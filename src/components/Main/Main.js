import { Main } from '../../config/config.js';

$(document).ready(() => {
    $(`#Main_root`).html(`
        <div class="position-fixed bottom-0 end-0 p-3" style="z-index: 1100" id="toast-container"></div>

        <center>
            <div id="loading" class="p-5">
            <img src="./src/img/logojd.png" alt="Cargando..." /><br>
            <h1 class="text-dark">Cargando informacion...</h1>
            </div>
        </center>
        <div class="container-fluid bg-light px-4 pb-4 h-100" style="border-radius: 30px">
            <!-- Filtros -->
            <div class="row g-3 mb-4">
                <div class="col-md-3">
                    <label for="unitsSelect" class="form-label">Unidad:</label>
                    <select id="unitsSelect" class="form-select"></select>
                </div>
                <div class="col-md-3">
                    <label for="startDate" class="form-label">Fecha de Inicio:</label>
                    <input type="datetime-local" id="startDate" class="form-control">
                </div>
                <div class="col-md-3">
                    <label for="endDate" class="form-label">Fecha de Fin:</label>
                    <input type="datetime-local" id="endDate" class="form-control">
                </div>
                <div class="col-md-3 d-grid">
                    <button id="searchButton" type="button" class="btn btn-warning ">Buscar</button>
                </div>
            </div>

            <!-- Tarjetas de métricas -->
            <div class="row text-center mb-4">
                <div class="col-md-4">
                    <div class="card shadow border-0 text-bg-light">
                        <h6 class="card-header">Tanque al inicio</h6>
                        <div class="card-body">
                            <h4 class="fw-bold" ><span class="kpis" id="consumoInicial" >0</span> Litros</h4>
                        </div>
                        <div class="card shadow border-0 text-bg-light">
                            <h6 class="card-header">Tanque al final</h6>
                            <div class="card-body">
                                <h4 class="fw-bold" ><span class="kpis" id="consumoFinal" >0</span> Litros</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card shadow border-0 text-bg-light">
                        <h6 class="card-header">Rendimiento</h6>
                        <div class="card-body">
                            <h4 class="fw-bold text-success" ><span class="kpis" id="rendimiento" >0</span> KM/Litros</h4>
                        </div>
                    </div>
                    <div class="card shadow border-0 text-bg-light">
                    <h6 class="card-header" >Kilómetros Recorridos</h6>
                        <div class="card-body">
                            <h4 class="fw-bold text-info"><span class="kpis" id="kmRecorridos">0</span> KM</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card shadow border-0 text-bg-light">
                        <h6 class="card-header">Cargado total</h6>
                        <div class="card-body">
                            <h4 class="fw-bold" ><span class="kpis" id="cargaTotal" >0</span> Litros</h4>
                        </div>
                        <div class="card shadow border-0 text-bg-light">
                            <h6 class="card-header">Descarga total</h6>
                            <div class="card-body">
                                <h4 class="fw-bold" ><span class="kpis" id="descargaTotal" >0</span> Litros</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Gráfica y Mapa -->
            <div class="row">
                <div class="col-lg-6">

                    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div class="card shadow border-0 p-3">
                                    <h5 class="card-header">Gráfica de comportamiento de barras.</h5>
                                    <div id="graficaComportamiento" style="height: 350px;"></div>
                                </div>
                                </div>
                                <div class="carousel-item">
                                <div class="card shadow border-0 p-3">
                                    <h5 class="card-header">Gráfica de carga y descarga total.</h5>
                                    <div id="graficaConsumo" style="height: 350px;"></div>
                                </div>
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>                    
                </div>
                <div class="col-lg-6">
                    <div class="card shadow border-0 p-3">
                        <h5 class="card-header">Mapa del Recorrido</h5>
                        <div id="map" style="height: 350px;"></div>
                    </div>
                </div>
            </div>
            
            <!-- Detalles Adicionales -->
            <div class="row text-center mt-4">
                <div class="col-md-4">
                    <div class="card shadow border-0 ">
                        <h6 class="card-header">Tiempo de Viaje</h6>
                        <div class="card-body">
                            <h4 class="fw-bold" ><span class="kpis" id="tiempoViaje">0</span> Horas</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card shadow border-0">
                        <h6 class="card-header">Velocidad Promedio</h6>
                        <div class="card-body">
                            <h4 class="fw-bold text-warning" ><span class="kpis" id="velocidadPromedio">0</span> KM/H</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card shadow border-0">
                        <h6 class="card-header">Cargas totales</h6>
                        <div class="card-body">
                            <h4 class="fw-bold text-danger" ><span class="kpis" id="cargas_totales">0</span> Cargas</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>`);
    getLoading('#loading');
});

function getLoading(tag) {
    $(tag).fadeIn();
    setTimeout(() => {
        $(tag).fadeOut();
    }, 1000);
}