let current_story = 0;
let stories_data = [];

let show_quinoa_weight = false;

class StoryAnimation {
    constructor(steps) {
        this.current_step = 0;
        this.steps = steps;
    }

    reset() {
        this.current_step = 0;
    }

    launch_next() {
        this.steps[this.current_step]();
        this.current_step += 1;

        if (this.current_step >= this.steps.length) {
            end_of_story();
        }
    }
}

class Story {
    constructor(country_name, product_name, csv_path, ISO3, color,
                big_traders_number, more_data_bool, intro_text, img_url) {
        this.country_name = country_name;
        this.product_name = product_name;
        this.csv_path = csv_path;
        this.ISO3 = ISO3;
        this.color = color;
        this.big_traders_number = big_traders_number;
        this.more_data_bool = more_data_bool;
        this.intro_text = intro_text;
        this.img_url = img_url;
    }

    set_data(data) {
        this.data = data;
    }
}

let point_id_zoom = 1;

const france_world_boundaries = [[-25, 150], [68, -125]];
const france_europe_boundaries = [[57, -15], [40, 18]];
const france_asia_boundaries = [[58, 0], [-6, 141]];

const peru_world_boundaries = [[-50, 180], [68, -125]];
const peru_europe_boundaries = [[-22, -90], [58, 31]];
const peru_us_boundaries = [[63, -165], [-20, 0]];

const indonesia_world_boundaries = [[62, -108], [-11, 149]];
const indonesia_europe_boundaries = [[61, -30], [-6, 125]];


const stories_animations = [
    // France
    new StoryAnimation([
        () => { zoom_to_coords(...france_world_boundaries); },
        () => { zoom_to_coords(...france_europe_boundaries); },
        () => { show_popover('FRA', 'fr_popover_1', 'Europe is the continent were people drink the most wine. French wine is clearly being exported all around Europe. Among its importers, England was the 2nd largest one, but got caught up by the USA in 2015', 'Europe import', 'bottom'); },
        () => {
            hide_popover('fr_popover_1');
            roll_years(300, null, null, true, function () {
                show_popover('FRA', 'fr_popover_2', 'A we can see, the import of French wine in Europe is quite stable from 1994 to 2016', 'Europe french wine import', 'bottom');
            });
        },
        () => {
            zoom_to_coords(...france_asia_boundaries);
            change_year(1994);
            show_popover_html('#timeline', 'fr_popover_2_1', 'Back to 1994, looking at Asia imports', '', 'top');
            hide_popover('fr_popover_2');
        },
        () => {
            hide_popover('fr_popover_2_1');
            roll_years(300, null, 1998, true, function () {
                activate_country_card();
                update_country_card(get_country('JPN'));
                show_popover('JPN', 'fr_popover_3', 'The wine import from Japan said to have peaked in 1998. The fact is that in 1998, too much wine was imported and some was carried over to the next year. That caused a slight decline in the consumption figures.', 'Japan french wine import', 'left');
            });
        },
        () => {
            desactivate_country_card();
            hide_popover('fr_popover_3');
            roll_years(300, 1998, 2011, true, function () {
                activate_country_card();
                update_country_card(get_country('CHN'));
                show_popover('CHN', 'fr_popover_4', 'Text about China.', 'China wine import', 'left');
            });
        },
        () => {
            update_country_card(get_country('HKG'));
            hide_popover('fr_popover_4');
            show_popover('HKG', 'fr_popover_5', 'Text about HK.', 'Hong Kong wine import', 'left');
        },
        () => {
            desactivate_country_card();
            hide_popover('fr_popover_5');
            zoom_to_coords(...france_world_boundaries);
            show_popover('USA', 'fr_popover_6', 'Throughout all these years, USA is among the biggest french wine importers.', 'USA wine import', 'bottom');
            roll_years(300, 2011, null, true, function() {
                setTimeout(() => {
                    show_popover_html('#next_story_button', 'fr_popover_6', 'Go see the next story about Peruvian Quinoa!', title='', placement='left');
                }, 800);
            });
        },
    ]),
    new StoryAnimation([
        () => { zoom_to_coords(...peru_world_boundaries); },
        () => {
            zoom_to_coords(...peru_us_boundaries);
            activate_country_card();
            update_country_card(get_country('USA'));
            show_popover('USA', 'per_popover_1', 'Text about USA.', 'USA quinoa import', 'top');
        },
        () => {
            desactivate_country_card()
            hide_popover('per_popover_1');
            zoom_to_coords(...peru_europe_boundaries);
            roll_years(300, null, 2014, true, function() {
                activate_country_card()
                update_country_card(get_country('NLD'));
                show_popover('NLD', 'per_popover_2', 'Text about Netherlands.', 'Netherlands quinoa import', 'right');
            });
         },
         () => {
             desactivate_country_card();
             hide_popover('per_popover_2');
             zoom_to_coords(...peru_world_boundaries);
             roll_years(300, null, null, true, function() {
                 show_quinoa_weight = true;
                 activate_country_card();
                 update_country_card(get_country('USA'));
                 show_popover_html('#country_card_canvas', 'per_popover_3', 'Text about Quinoa weight/price comparison', '', 'left');
               });
         },
         () => {
             desactivate_country_card();
             show_quinoa_weight = false;
             hide_popover('per_popover_3');
             zoom_to_coords(...peru_europe_boundaries);
         },


    ]),
    new StoryAnimation([
        () => { zoom_to_coords(...indonesia_world_boundaries); },
        () => {
            zoom_to_coords(...indonesia_europe_boundaries);
            roll_years(300, null, 2008, true, function() {
                show_popover('FRA', 'indo_popover_1', 'Text about Europe imports (Italia / Netherland).', 'Europe palm oil import', 'left');
                show_popover('IND', 'indo_popover_2', 'Text about Indian imports.', 'India palm oil import', 'left');
            });
        },
        () => {
            hide_popover('indo_popover_1');
            hide_popover('indo_popover_2');
            activate_country_card();
            update_country_card(get_country('NLD'));
            show_popover('NLD', 'indo_popover_3', 'Text about Dutch imports, #1 trader 1989-99', 'Dutch palm oil import', 'right');

        },
        () => {
            hide_popover('indo_popover_3');
            update_country_card(get_country('ITA'));
            show_popover('ITA', 'indo_popover_4', 'Text about Italian imports, nutella, article?', 'Italian palm oil import', 'right');
        },
        () => {
            hide_popover('indo_popover_4');
            update_country_card(get_country('IND'));
            show_popover('IND', 'indo_popover_5', 'Text about Indian imports', 'Indian palm oil import', 'left');
        },
        () => {
            hide_popover('indo_popover_5');
            desactivate_country_card();
            zoom_to_coords(...indonesia_world_boundaries);
            roll_years(300, 2008, null, true, function () {
                show_popover('MAR', 'indo_popover_6', 'Text about Global palm oil imports. Orangutans. All that', 'Global palm oil import', 'left');
                setTimeout(() => {
                    show_popover_html('#explore_data_button', 'indo_popover_7', 'Go explore the data!', title='', placement='left');
                }, 800);
            });
        },
    ]),
];



const stories = [
    new Story(
        "France",
        "Wine",
        "datasets/france_wine_clean.csv",
        "FRA",
        "rgba(203, 56, 85, 1)",
        10,
        false,
        "<p> France has historically produced some of the finest vintages around, and its regions have lent their names to some of the world's most famous grapes. </p> <p> Although France is only the third wine exporter, behind Spain and Italy, it goes first place in terms of market values. Among their importer, Europe is leading the market with England, Germany and Belgium being respectively the second, third and fifth importer. The biggest importer of french wine is the USA, with a percentage of 16.92% in 2016. French wine consumption has been growing in Asia for the past few year. In 1998, Japan got a high peak in trade value, buying 531.21 M. Can it be the influence of the ‘French Paradox’? </p> <p> China french wine import exploded in 2011, making it the fourth importer of french wine in 2016. </p> <p> Hong-Kong and Singapore have a percentage of import of 8.96% making them respectively the sixth and eleventh importers of french wine.</p>",
        "static/img/wine.jpeg"
    ),
    new Story(
        "Peru",
        "Quinoa",
        "datasets/peru_quinoa_clean.csv",
        "PER",
        "rgba(147, 159, 92, 1)",
        10,
        false,
        "<p> Some text </p>",
        "static/img/quinoa.jpg"
    ),
    new Story(
        "Indonesia",
        "Palm Oil",
        "datasets/indonesia_palm_clean.csv",
        "IDN",
        "rgba(63, 191, 63, 1)",
        8,
        false,
        "<p> Some text </p>",
        "static/img/palm.jpeg"
    ),
    new Story(
        "Bolivia",
        "Quinoa",
        "datasets/bolivia_quinoa_clean.csv",
        "BOL",
        "rgba(147, 159, 92, 1)",
        10, true, "", ""
        ),
    new Story(
        "Belgium",
        "Beer",
        "datasets/belgium_beer_clean.csv",
        "BEL",
        "rgba(255, 206, 86, 1)",
        10, true, "", ""
    ),
    new Story(
        "France",
        "Cheese",
        "datasets/france_cheese_clean.csv",
        "FRA",
        "rgba(14, 119, 225, 1)",
        10, true, "", ""
    ),
    new Story(
        "Switzerland",
        "Chocolate",
        "datasets/switzerland_chocolate_clean.csv",
        "CHE",
        "rgba(112, 74, 44, 1)",
        7, true, "", ""
    ),
    new Story(
        "China",
        "Tea",
        "datasets/china_tea_clean.csv",
        "CHN",
        "rgba(63, 191, 63, 1)",
        7, true, "", ""
    ),
];

function zoom_to_location(points, duration, delay) {
    let prev_pos = cy.pan();
    let prev_zoom = cy.zoom();

    cy.fit(cy.$(points));

    let step_x = (cy.pan().x - prev_pos.x) / duration;
    let step_y = (cy.pan().y - prev_pos.y) / duration;
    let step_k = (cy.zoom() - prev_zoom) / duration;

    for (let i = 0; i < duration; i+=10) {
        let t = d3.zoomIdentity
            .translate(prev_pos.x + step_x * i, prev_pos.y + step_y * i)
            .scale(prev_zoom + step_k * i);
        setTimeout(function(){ zoom_step(t); }, delay + i);
    }
}

function zoom_to_coords(coord1, coord2) {

    let point1 = projection([coord1[1], coord1[0]]);
    let point2 = projection([coord2[1], coord2[0]]);

    cy.add({
        data: { id: 'point_zoom_manual_' + point_id_zoom },
        position: {x: point1[0], y: point1[1] }
    });

    cy.add({
        data: { id: 'point_zoom_manual_' + (point_id_zoom + 1) },
        position: {x: point2[0], y: point2[1] },
    });

    cy.fit(cy.$('#point_zoom_manual_' + point_id_zoom + ', #point_zoom_manual_' + (point_id_zoom+1)));

    let t = d3.zoomIdentity
        .translate(cy.pan().x, cy.pan().y)
        .scale(cy.zoom());

    zoom_step(t);

    point_id_zoom += 2;

}

function zoom_step(transformation) {
    // let transformation = d3.zoomIdentity.translate(-16300, -8666).scale(28);
    // Changes the zoom_level
    zoom_level = transformation.k;
    map_group.attr("transform", transformation);

    // Updates the graph especially for the edges shapes
    update_edges_zoom();

    // Changes the zoom level and the pan parameters to keep the correspondance
    // between the map and the graph
    cy.viewport({
        zoom: zoom_level,
        pan: {
            x: transformation.x,
            y: transformation.y,
        }
    });
}

let year_interval;

function roll_years(duration=300, first_year=null, last_year=null, hide_control_buttons=true, last_year_callback=null) {
    // Hide control buttons if asked
    if (hide_control_buttons) {
        d3.select('#control_buttons_div').attr('class', 'invisible');
    }

    clearInterval(year_interval);
    year_interval = setInterval(next_year_callback, duration);
    let year_i = 0;

    function next_year_callback() {
        if (first_year == null) {
            first_year = parseInt(years[0]);
        }

        if (last_year == null) {
            last_year = parseInt(years[years.length - 1]);
        }

        year_i += 1;
        change_year(first_year + year_i);

        if (first_year + year_i == last_year) {
            clearInterval(year_interval);

            // Run callback if provided
            if (last_year_callback != null) {
                last_year_callback();
            }

            // Show control buttons if they were hidden
            if (hide_control_buttons) {
                d3.select('#control_buttons_div').attr('class', '');
            }
        }
    }

}
