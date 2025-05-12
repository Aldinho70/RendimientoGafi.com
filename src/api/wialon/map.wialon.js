class Map {
    constructor(session) {
        this.map;
        this.markers = {};
        this.tile_layer;
        this.layers = {};
        this.session = session;
        this.renderer;
    }

    // async initMap( ) {
    //     this.map = L.map('map').setView([54.68, 25.27], 10);
    //     // add WebGIS tile layer
    //     L.tileLayer(this.session.getBaseGisUrl("render") + "/gis_render/{x}_{y}_{z}/" + this.session.getCurrUser().getId() + "/tile.png", {
    //         zoomReverse: true,
    //         zoomOffset: -1
    //     }).addTo(this.map);
    // }

    async initMap() {
        this.map = L.map('map').setView([54.68, 25.27], 10);
        // add WebGIS tile layer
        L.tileLayer(this.session.getBaseGisUrl("render") + "/gis_render/{x}_{y}_{z}/" + this.session.getCurrUser().getId() + "/tile.png", {
            zoomReverse: true,
            zoomOffset: -1
        }).addTo(this.map);
    }
    init() {
        this.renderer = this.session.getRenderer();
        this.renderer.addListener("changeVersion", this.update_renderer(  ));        
    }

    update_renderer() {
        if (this.tile_layer && this.tile_layer.setUrl) {
            this.tile_layer.setUrl(this.session.getBaseUrl() + "/adfurl" + this.renderer.getVersion() + "/avl_render/{x}_{y}_{z}/" + this.session.getId() + ".png"); // update url-mask in tile-layer
        }
        // console.log( renderer );

    }

    showUnit(idUnit) {
        console.log(this.renderer);
        const cur_day = new Date();
        const from = Math.round(new Date(cur_day.getFullYear(), cur_day.getMonth(), cur_day.getDate()) / 1000); // get begin time - beginning of day
        const to = from + 3600 * 24 - 1; // end of day in seconds
        const unit = this.session.getItem(idUnit);
        const color = "ffffff";

        if (!unit) {
            return;
        }

        const pos = unit.getPosition();

        if (!pos) {
            return;
        }

        const callback = qx.lang.Function.bind((code, layer) => {
            if (code) {
                console.log(wialon.core.Errors.getErrorText(code));
                return;
            }

            if (layer) {
                let layer_bounds = layer.getBounds(); //console.log(layer_bounds);


                if (!layer_bounds || layer_bounds.length != 4 || (!layer_bounds[0] && !layer_bounds[1] && !layer_bounds[2] && !layer_bounds[3])) { // check all bounds terms
                    return;
                }

                if (this.map) {
                    let bounds = new L.LatLngBounds(
                        L.latLng(layer_bounds[0], layer_bounds[1]),
                        L.latLng(layer_bounds[2], layer_bounds[3])
                    );
                    this.map.fitBounds(bounds); // get center and zoom
                    // create tile-layer and specify the tile template
                    if (!this.tile_layer)
                        this.tile_layer = L.tileLayer(this.session.getBaseUrl() + "/adfurl" + renderer.getVersion() + "/avl_render/{x}_{y}_{z}/" + this.session.getId() + ".png", { zoomReverse: true, zoomOffset: -1 }).addTo(this.map);
                    else
                        this.tile_layer.setUrl(this.session.getBaseUrl() + "/adfurl" + this.renderer.getVersion() + "/avl_render/{x}_{y}_{z}/" + this.session.getId() + ".png");
                    // push this layer in global container
                    this.layers[idUnit] = layer;
                    // get icon
                    let icon = L.icon({ iconUrl: unit.getIconUrl(24) });
                    //create or get marker object and add icon in it
                    let marker = L.marker({ lat: pos.y, lng: pos.x }, { icon: icon }).addTo(this.map);

                    marker.setLatLng({ lat: pos.y, lng: pos.x }); // icon position on map
                    marker.setIcon(icon); // set icon object in marker
                    this.markers[idUnit] = marker;
                }
            }
        });

        const params = {
            "layerName": "route_unit_" + idUnit, // layer name
            "itemId": idUnit, // ID of unit which messages will be requested
            "timeFrom": from, //interval beginning
            "timeTo": to, // interval end
            "tripDetector": 0, //use trip detector: 0 - no, 1 - yes
            "trackColor": color, //track color in ARGB format (A - alpha channel or transparency level)
            "trackWidth": 5, // track line width in pixels
            "arrows": 0, //show course of movement arrows: 0 - no, 1 - yes
            "points": 1, // show points at places where messages were received: 0 - no, 1 - yes
            "pointColor": color, // points color
            "annotations": 0 //show annotations for points: 0 - no, 1 - yes
        };

        this.renderer.createMessagesLayer(params, callback);
    }

    // showUnit(idUnit) {
    //     const session = wialon.core.Session.getInstance(); //console.log( session );
    //     const renderer = session.getRenderer(); console.log(renderer);        
    //     const curDay = new Date();
    //     const from = Math.floor(new Date(curDay.getFullYear(), curDay.getMonth(), curDay.getDate()) / 1000); // Inicio del día
    //     const to = from + 3600 * 24 - 1; // Fin del día
    //     const unit = session.getItem(idUnit);
    //     const color = "ffffff";

    //     if (!unit) {
    //         console.error(`Unidad con ID ${idUnit} no encontrada.`);
    //         return;
    //     }

    //     const pos = unit.getPosition

    //     const callback = (code, layer) => {
    //         if (code) {
    //             console.error(`Error: ${wialon.core.Errors.getErrorText(code)}`);
    //             return;
    //         }

    //         if (layer) {
    //             const layerBounds = layer.getBounds();

    //             if (!layerBounds || layerBounds.length !== 4 || layerBounds.every((val) => !val)) {
    //                 console.warn("Los límites del layer no son válidos.");
    //                 return;
    //             }

    //             if (this.map) {
    //                 const bounds = new L.LatLngBounds(
    //                     L.latLng(layerBounds[0], layerBounds[1]),
    //                     L.latLng(layerBounds[2], layerBounds[3])
    //                 );
    //                 this.map.fitBounds(bounds);

    //                 // Crear o actualizar tile layer
    //                 const tileLayerUrl = `${session.getBaseUrl()}/adfurl${renderer.getVersion()}/avl_render/{x}_{y}_{z}/${session.getId()}.png`;
    //                 if (!this.tile_layer) {
    //                     this.tile_layer = L.tileLayer(tileLayerUrl, { zoomReverse: true, zoomOffset: -1 }).addTo(this.map);
    //                 } else {
    //                     this.tile_layer.setUrl(tileLayerUrl);
    //                 }

    //                 // Crear o actualizar marcador
    //                 const pos = unit.getPosition();
    //                 if (!pos) {
    //                     console.warn(`No se encontró posición para la unidad ${idUnit}`);
    //                     return;
    //                 }

    //                 const icon = L.icon({ iconUrl: unit.getIconUrl(24) });
    //                 if (!this.markers[idUnit]) {
    //                     this.markers[idUnit] = L.marker([pos.y, pos.x], { icon }).addTo(this.map);
    //                 } else {
    //                     const marker = this.markers[idUnit];
    //                     marker.setLatLng([pos.y, pos.x]);
    //                     marker.setIcon(icon);
    //                 }
    //             }
    //         }
    //     };

    //     const params = {
    //         layerName: `route_unit_${idUnit}`,
    //         itemId: idUnit,
    //         timeFrom: from,
    //         timeTo: to,
    //         tripDetector: 0,
    //         trackColor: color,
    //         trackWidth: 5,
    //         arrows: 0,
    //         points: 1,
    //         pointColor: color,
    //         annotations: 0,
    //     };

    //     renderer.createMessagesLayer(params, callback);
    // }

}

export default Map;