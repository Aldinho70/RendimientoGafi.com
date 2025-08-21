export const getSensorByName = ( name, sensors ) => {
    for (const key in sensors) {
        if (Object.prototype.hasOwnProperty.call(sensors, key)) {
            const sensor = sensors[key];
            if( sensor.n == name ){
                return sensor
            }         
        }
    }
}