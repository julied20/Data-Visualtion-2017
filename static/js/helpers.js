const ISO = 'BEL'

let iso_geo_coord;

function loadIsoCoord(CSV) {
    iso_geo_coord = CSV;
}

class Country {
    constructor(ISO3, lat, long, is_big_trader, trade_value, trade_weight, geo_feat) {
        this.ISO3 = ISO3;
        this.lat = lat;
        this.long = long;
        this.is_big_trader = is_big_trader;
        this.trade_value = trade_value;
        this.trade_weight = trade_weight;
        this.geo_feat = geo_feat;
    }
}

class Story {
    constructor(country_name, product_name, csv_path, ISO3, color) {
        this.country_name = country_name;
        this.product_name = product_name;
        this.csv_path = csv_path;
        this.ISO3 = ISO3;
        this.color = color;
    }

    set_data(data) {
        this.data = data;
    }
}

function getCoordinates(ISO) {
    const country = iso_geo_coord.filter(x => x.ISO3 == ISO)[0];

    if(typeof country !== "undefined") {
        return {
            latitude: parseFloat(country.Latitude),
            longitude: parseFloat(country.Longitude),
        };
    }
}
