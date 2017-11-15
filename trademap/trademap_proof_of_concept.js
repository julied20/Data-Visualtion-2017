const container = document.getElementById('map_container');

const trademap = new Datamap(
    {
        element: container,
        projection: 'mercator',
    }
);

let iso_geo_coord;
d3.csv('datasets/countries_codes_and_coordinates.csv', loadIsoCoord);

d3.csv('datasets/belgium_beers_all_clean.csv', createMap);


const BEL_ISO = 'BEL';

function createMap(data) {
    data = data.filter(x => x.Year == "2015")
    const arcs = [];

    data.forEach(function(trade) {
        partnerISO = getCoordinates(trade.PartnerISO);

        const valueMagic = Math.log(trade.Value) / 20;

        if(typeof partnerISO !== 'undefined') {
            arcs.push({
                origin: getCoordinates(BEL_ISO),
                destination: partnerISO,
                options: {
                    strokeWidth: valueMagic,
                    strokeColor: 'rgba(50, 0, 200, 0.3)'
                }
            });
        } else {
            console.log("Undefined " + trade.PartnerISO);
        }
    });

    trademap.arc(
    arcs,
    {strokeWidth: 1, arcSharpness: 1.4});
}


function loadIsoCoord(CSV) {
    iso_geo_coord = CSV;
}

function getCoordinates(ISO) {
    const country = iso_geo_coord.filter(x => x.ISO3 == ISO)[0];

    if(typeof country !== "undefined") {

        const obj = {
            latitude: parseFloat(country.Latitude),
            longitude: parseFloat(country.Longitude),
        };

        return obj;
    }
}