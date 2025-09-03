import Map from './src/utils/map.js';
import WialonSDK from './src/api/wialon/wialon.js';
import index_helper from './src/helpers/index.helper.js';
import Highchart from './src/api/highchart/index.highchart.js';
// import MainLoanding from './src/utils/mainLoanding.js';
import { TOKEN, CDN } from './src/config/config.js';
import timestamp from './src/utils/timestamp.js';


$(document).ready(async () => {
  // MainLoanding.initMainLoanding('#loadingScreen');
  /**
   * load all units
  */
  
  const sdk = new WialonSDK(CDN, TOKEN);
  index_helper.getUnits(sdk);

  Map.initMap();
  // Highchart.initChart({ start_combustible: 1, end_combustible: 1 });

  const params = new URLSearchParams(window.location.search);

  const idUnit = params.get("idUnit"); 
  const nameUnit = params.get("name"); 

  if( idUnit ){

    const now = new Date();
    const endDate = new Date(now);
    endDate.setHours(23, 59, 0, 0);
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - 15);
    startDate.setHours(0, 0, 0, 0);

    const startDateStr = timestamp.formatLocalDate(startDate);
    const endDateStr = timestamp.formatLocalDate(endDate);

    $(`#startDate`).val(startDateStr);
    $(`#endDate`).val(endDateStr);
    // $("#unitsSelect").val(idUnit);
    // $("#unitsSelect").prop("disabled", true);

    // $("#unitsSelect").append(
    //   $("<option>", {
    //     value: idUnit,     // value del option
    //     text: nameUnit // texto visible
    //   })
    // );

    // ⏳ esperar 10 segundos antes de ejecutar la petición
    setTimeout(() => {
      index_helper.getMessagesLoader(idUnit, startDateStr, endDateStr);
    }, 3000); // 10000 ms = 10s
  }

  $(`#searchButton`).button().click( () => {
    const startDate = $(`#startDate`).val();    
    const endDate = $(`#endDate`).val();      
    // const startDate = '2025-08-19T23:59'
    // const endDate = '2025-08-20T23:59';      

    if( startDate && endDate ){
      if( startDate == endDate ){
        
        alert("Las fechas de inicio y fin no deben ser iguales.");
        return;
      }else{
        const idUnit = $("#unitsSelect").val();
        try {
          index_helper.getMessagesLoader(idUnit, startDate, endDate);          
        } catch (error) {
          alert("Error");
        }
      }
    }else{
      alert("Debe seleccionar fechas de inicio y fin.");
    }

  });
});