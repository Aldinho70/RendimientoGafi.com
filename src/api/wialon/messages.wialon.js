
class MessagesService {
    constructor(unit, from, to){
        this.session = wialon.core.Session.getInstance();
        this.unit = unit;
        this.from = from;
        this.to = to;
    }

    async loadMessages() {
        return new Promise((resolve, reject) => {
            const ml = this.session.getMessagesLoader();
            if (!ml) {
                reject("MessagesLoader not available");
                return;
            }
    
            // const to = this.session.getServerTime();
            // const from = to - (3600 * 24);  // Últimas 24 horas

            // console.log( to, from );
            
            // Usando flags y flagsMask para cargar toda la información disponible
            const flags = 0x0000;
            const flagsMask = 0xFF00;
    
            ml.loadInterval(this.unit, this.from, this.to, flags, flagsMask, 10000, (code, data) => {
                if (code) {
                    reject(wialon.core.Errors.getErrorText(code));
                    return;
                }
    
                if (!data) {
                    reject("No data returned");
                    return;
                }
    
                resolve(data);
            });
        });
    }

    async getInfoUnit( id_unit ){
        return new Promise((resolve, reject) => {
            const unit = this.session.getItem(id_unit);
            resolve( unit )
        })
    }
     
}

export default MessagesService;