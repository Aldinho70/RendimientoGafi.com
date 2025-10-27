import { updateUnitStats } from "../../../../components/Main/Main.js";

export const ejecutarReporte = async (resources, reportName, objectName, days) => {
  const now = Math.floor(Date.now() / 1000);
  const weekAgo = now - days * 24 * 60 * 60;
  const session = wialon.core.Session.getInstance();

  const resource = resources.find(r => r.getName() === "CUENTA_DEMO");
  if (!resource) {
    console.error("Recurso no encontrado");
    return;
  }

  const report = Object.values(resource.getReports()).find(r => r.n === reportName);
  if (!report) {
    console.error("Reporte no encontrado");
    return;
  }

  let target = session.getItems("avl_unit_group").find(g => g.getName() === objectName) || session.getItems("avl_unit").find(u => u.getName() === objectName);

  if (!target) {
    console.error("Grupo o unidad no encontrado");
    return;
  }

  const interval = {
    from: weekAgo,
    to: now,
    flags: wialon.item.MReport.intervalFlag.absolute
  };

  resource.execReport( report, target.getId(), 0, interval,
    async (code, data) => {
      if ( code || !data.getTables().length ) {
        // console.error(`${target.getName()} Error:`, wialon.core.Errors.getErrorText(code));
        return
      }else{
        updateUnitStats( arrayToObject(data.getStatistics()) )
        // console.log( data.getStatistics() );
        // console.log( arrayToObject(data.getStatistics()) );

      }
      
    }
  );
};


const arrayToObject = (data) => {
  if (!Array.isArray(data)) return {};

  return data.reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
};