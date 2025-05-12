// import { Main } from '../../config/config.js';
// $(document).ready(() => {
//     $(`#Main_root`).html(`
//         <!-- <h1 class="text-center mb-4">Dashboard de Consumo y Rendimiento</h1> -->

//         <!-- Filtros -->
//         <!-- <div class="mb-4">
//             <label for="unidadSelect" class="form-label">Seleccionar Unidad:</label>
//             <select id="unitsSelect" class="form-select" style="width: 100%;"></select>
//         </div> -->

//         <div class="row g-3 align-items-end mb-4">
//             <div class="col-md-3">
//                 <label for="unidadSelect" class="form-label">Seleccionar Unidad:</label>
//                 <select id="unitsSelect" class="form-select"></select>
//             </div>
//             <div class="col-md-3">
//                 <label for="startDate" class="form-label">Fecha de Inicio:</label>
//                 <input type="datetime-local" id="startDate" class="form-control">
//             </div>
//             <div class="col-md-3">
//                 <label for="endDate" class="form-label">Fecha de Fin:</label>
//                 <input type="datetime-local" id="endDate" class="form-control">
//             </div>
//             <div class="col-md-3 d-grid">
//                 <button id="searchButton" class="btn btn-${Main.class_bootstrap}">Buscar</button>
//             </div>
//         </div>

//         <!-- Tarjetas de resumen -->
//         <div class="row text-center mb-4">
//             <div class="col-md-3">
//                 <div class="card bg-light">
//                     <div class="card-body">
//                         <h5 class="card-title text-${Main.class_bootstrap}">Tanque al inicio</h5>
//                         <p class="card-text" id="consumoInicial">0 L</p>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-md-3">
//                 <div class="card bg-light">
//                     <div class="card-body">
//                         <h5 class="card-title text-${Main.class_bootstrap}">Tanque al final</h5>
//                         <p class="card-text" id="consumoFinal">0 L</p>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-md-3">
//                 <div class="card bg-light">
//                     <div class="card-body">
//                         <h5 class="card-title text-${Main.class_bootstrap}">Rendimiento</h5>
//                         <p class="card-text" id="rendimiento">0 km/L</p>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-md-3">
//                 <div class="card bg-light">
//                     <div class="card-body">
//                         <h5 class="card-title text-${Main.class_bootstrap}">Kilómetros Recorridos</h5>
//                         <p class="card-text" id="kmRecorridos">0 km</p>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <div class="row">
//             <!-- Gráfica de consumo -->
//             <div id="graficaConsumo" class="mb-4 col-6" style="height: 400px;"></div>

//             <!-- Mapa del recorrido -->
//             <div class="mb-4 col-6">
//                 <h5>Mapa del Recorrido</h5>
//                 <!-- <iframe
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.928498107311!2d105.82199801540699!3d21.03028529330057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab43c5f5b8ff%3A0xa5a8c3b39b20ec10!2sHoan%20Kiem%20Lake!5e0!3m2!1sen!2s!4v1607014388111!5m2!1sen!2s"
//                 width="100%" height="400" allowfullscreen="" loading="lazy">
//             </iframe> -->
//             <div id="map"></div>
//         </div>

//         <!-- Modulo adicional de detalles -->
//         <div class="row text-center mb-4">
//             <div class="col-md-4">
//                 <div class="card bg-light">
//                     <div class="card-body">
//                         <h5 class="card-title text-${Main.class_bootstrap}">Tiempo de Viaje</h5>
//                         <p class="card-text" id="tiempoViaje">0 horas</p>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-md-4">
//                 <div class="card bg-light">
//                     <div class="card-body">
//                         <h5 class="card-title text-${Main.class_bootstrap}">Velocidad Promedio</h5>
//                         <p class="card-text" id="velocidadPromedio">0 km/h</p>
//                     </div>
//                 </div>
//             </div>
//             <div class="col-md-4">
//                 <div class="card bg-light">
//                     <div class="card-body">
//                         <h5 class="card-title text-${Main.class_bootstrap}">Paradas Realizadas</h5>
//                         <p class="card-text" id="paradas">0 paradas</p>
//                     </div>
//                 </div>
//             </div>
//         </div>

//         <!-- Tabla de detalle -->
//         <!-- <table class="table table-striped table-bordered">
//             <thead class="table-dark">
//                 <tr>
//                     <th>Unidad</th>
//                     <th>Inicio</th>
//                     <th>Fin</th>
//                     <th>Consumo (L)</th>
//                     <th>Rendimiento (km/L)</th>
//                 </tr>
//             </thead>
//             <tbody>
//                 <tr>
//                     <td>Unidad 1</td>
//                     <td>50 L</td>
//                     <td>30 L</td>
//                     <td>20 L</td>
//                     <td>15 km/L</td>
//                 </tr>
//             </tbody>
//         </table> -->`);
// });

import { Main } from '../../config/config.js';
$(document).ready(() => {
    
    $(`#Main_root`).html(`
        <center>
            <div id="loading" class="p-5">
            <img src="./src/img/logojd.png" alt="Cargando..." /><br>
            <h1 class="text-dark">Cargando informacion...</h1>
            </div>
        </center>
    <div class="container-fluid bg-light px-4">
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
                <button id="searchButton" class="btn btn-primary">Buscar</button>
            </div>
        </div>

        <!-- Tarjetas de métricas -->
        <div class="row text-center mb-4">
            <div class="col-md-3">
                <div class="card shadow border-0">
                    <div class="card-body">
                        <h6 class="text-muted">Tanque al inicio</h6>
                        <h4 class="fw-bold" id="consumoInicial">0 L</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow border-0">
                    <div class="card-body">
                        <h6 class="text-muted">Tanque al final</h6>
                        <h4 class="fw-bold" id="consumoFinal">0 L</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow border-0">
                    <div class="card-body">
                        <h6 class="text-muted">Rendimiento</h6>
                        <h4 class="fw-bold text-success" id="rendimiento">0 km/L</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card shadow border-0">
                    <div class="card-body">
                        <h6 class="text-muted">Kilómetros Recorridos</h6>
                        <h4 class="fw-bold text-info" id="kmRecorridos">0 km</h4>
                    </div>
                </div>
            </div>
        </div>

        <!-- Gráfica y Mapa -->
        <div class="row">
            <div class="col-lg-6">
                <div class="card shadow border-0 p-3">
                    <h5 class="fw-bold">Gráfica de Consumo</h5>
                    <div id="graficaConsumo" style="height: 350px;"></div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card shadow border-0 p-3">
                    <h5 class="fw-bold">Mapa del Recorrido</h5>
                    <div id="map" style="height: 350px;"></div>
                </div>
            </div>
        </div>
        
        <!-- Detalles Adicionales -->
        <div class="row text-center mt-4">
            <div class="col-md-4">
                <div class="card shadow border-0">
                    <div class="card-body">
                        <h6 class="text-muted">Tiempo de Viaje</h6>
                        <h4 class="fw-bold" id="tiempoViaje">0 horas</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card shadow border-0">
                    <div class="card-body">
                        <h6 class="text-muted">Velocidad Promedio</h6>
                        <h4 class="fw-bold text-warning" id="velocidadPromedio">0 km/h</h4>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card shadow border-0">
                    <div class="card-body">
                        <h6 class="text-muted">Combustible consumido</h6>
                        <h4 class="fw-bold text-danger" id="combustible_consumido">0 L</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>`);
    getLoading('#loading');
});

// function getLoading(tag) {
//     $(tag).css('display', 'flex');
//     setTimeout(function() {
//         $(tag).css('display', 'none');
//     }, 10000);
// }

// Función para mostrar y ocultar el loader con fondo borroso
function getLoading(tag) {
    $(tag).fadeIn();
    setTimeout(() => {
        $(tag).fadeOut();
    }, 5000);
}