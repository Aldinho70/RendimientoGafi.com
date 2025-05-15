import Map from './src/utils/map.js';
import WialonSDK from './src/api/wialon/wialon.js';
import index_helper from './src/helpers/index.helper.js';
import Highchart from './src/api/highchart/index.highchart.js';
// import MainLoanding from './src/utils/mainLoanding.js';
import { TOKEN, CDN } from './src/config/config.js';


$(document).ready(() => {
  // MainLoanding.initMainLoanding('#loadingScreen');
  /**
   * load all units
  */
  
  const sdk = new WialonSDK(CDN, TOKEN);
  index_helper.getUnits(sdk);

  Map.initMap();
  Highchart.initChart({ start_combustible: 1, end_combustible: 1 });

  $(`#searchButton`).button().click( () => {
    const startDate = $(`#startDate`).val();    
    const endDate = $(`#endDate`).val();      
    // const startDate = '2025-05-13T23:59'
    // const endDate = '2025-05-14T23:59';      

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