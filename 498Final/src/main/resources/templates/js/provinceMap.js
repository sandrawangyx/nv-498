(function() {
    var container = d3.select('#map-container').node(),
        data = container.dataset,
        census = d3.map(),
        scale,
        populationByProvince;

    var width = 960,
        height = 500;

    var proj = d3.geo.albers(),
        path = d3.geo.path().projection(proj);

    var svg = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height);

    var title = svg.append("text")
        .attr("class", "title")
        .attr("dy", ".71em");

    d3.json(data.provinces, function(canada) {
        d3.csv(data.profile, function(profile) {
            //            populationByProvince = d3.nest().key(function(d) {
            //                return d.provinces;
            //            }).entries(profile);
            //            console.log("cpopulation by province...." + JSON.stringify(populationByProvince));
            profile.forEach(function(d) {
                census.set(d.province, d);
                console.log("census after mapping...." + JSON.stringify(census));
            });

            var extent = d3.extent(profile, function (d) { return +d.Total; });
            console.log("extend...." + extent);
            scale = d3.scale.linear()
                .domain(extent)
                .range([1, 100]);
            ready(canada, profile);
            //ready(canada, populationByProvince);
            //title.text(populationByProvince[0].values[0].year);
        });
    });

    function ready(canada, profile) {

        var carto = d3.cartogram()
            .projection(proj)
            .properties(function(geom, topo) {
                return geom.properties;
            })
            // Morph on the number of characters in province's name.
            .value(function(d) {
                var p = get_population(d);
                s = scale(p);

                return s;
            });

        var no_morph = create_canada(canada);
        no_morph.attr("transform", "translate(0,250)" +
            "scale(0.5,0.5)");
        var provinces = create_canada(canada);
        provinces.attr("transform", "translate(450,250)" +
            "scale(0.5,0.5)");

        var features = carto(canada, canada.objects.provinces.geometries).features;

        provinces.data(features)
            .transition()
            .duration(2000)
            .ease("sin-in-out")
            .attr("d", carto.path);
    }

    function get_population(d) {
        return +census.get(d.properties.PRENAME).Total;
    }

    //
    //    function get_population(d) {
    //        var population;
    //        for (var i = 0; i < populationByProvince.length; i++) {
    //            var prov = populationByProvince[i].key;
    //            if (prov === d.properties.PRENAME) {
    //                console.log("prov...." + prov);
    //                var prov_values = populationByProvince[i].values;
    //                var y;
    //                for (var j = 0; j < prov_values.length; j++) {
    //                    y = prov_values[j].year;
    //                    if (y === year) {
    //                        if (typeof prov_values[j].value !== 'undefined') {
    //                            population = +prov_values[j].value;
    //                            console.log("year..." + y);
    //                            console.log("get population..." + population);
    //                            break;
    //                        }
    //                    }
    //                }
    //            }
    //            if((i== populationByProvince.length -1 ) && (typeof population === 'undefined'))
    //            {
    //            console.log("finish loop undefined " + JSON.stringify(d));
    //            }
    //        }
    //        console.log("out .... get population..." + population);
    //        return population;
    //    }

    function create_canada(canada) {
        var provinces = svg.append("g")
            .attr("class", "provinces")
            .selectAll("path")
            .data(topojson.object(canada, canada.objects.provinces).geometries)
            .enter().append("path")
            .attr("class", "province")
            .attr("d", path);

        provinces.append("title")
            .text(function(d) {
                return d.id + ": " + d3.format(',')(get_population(d));});

        return provinces;
    }
}());