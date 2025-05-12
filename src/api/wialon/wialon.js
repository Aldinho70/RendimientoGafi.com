import { all_avl } from './spec.wialon.js';
import { loadLibraries } from './libraries.wialon.js';
// import Map from './map.wialon.js';
import Map from './map.wialon.js';

class WialonSDK {
  constructor(apiUrl, token) {
    this.apiUrl = apiUrl;
    this.token = token;
    this.session = wialon.core.Session.getInstance();
  }
  
  // map;

  // Initialize the session and log units
  async init() {
    return new Promise((resolve, reject) => {
      this.session.initSession(this.apiUrl);
      loadLibraries(this.session);
      this.session.loginToken(this.token, "", async (code) => {
        if (code) {
          console.error(wialon.core.Errors.getErrorText(code));
          reject(wialon.core.Errors.getErrorText(code));
          return;
        }
        console.log("Session init ");

        try {
          const units = await this.loadUnits();
          resolve(units);
        } catch (err) {
          reject(err);
        }
      });
    });
  }

  // Return all units
  loadUnits() {
    return new Promise((resolve, reject) => {
      this.session.updateDataFlags(all_avl, (code) => {
        if (code) {
          console.error(wialon.core.Errors.getErrorText(code));
          reject(wialon.core.Errors.getErrorText(code));
          return;
        }

        const units = this.session.getItems("avl_unit");
        if (!units || !units.length) {
          console.log("No units found");
          resolve([]);
          return;
        }

        // this.map = new Map(this.session);
        // this.map.init();
        // this.map.initMap()

        resolve(units);
      });
    });
  }
}

export default WialonSDK;
