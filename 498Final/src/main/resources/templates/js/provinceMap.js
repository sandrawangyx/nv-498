(function () {
        var container = d3.select('#provinceMap').node(),
            data = container.dataset,
            census,// = d3.map(),
            scale;

        var width = 960,
            height = 500;

            var proj = d3.geoAlbers(),
                path = d3.geoPath().projection(proj);

//                var projection = d3.geoAzimuthalEqualArea()
//                .rotate([100, -45])
//                .center([5, 20])
//                .scale(800)
//                .translate([width/2, height/2]);



        var svg = d3.select(container).append("svg")
                .attr("width", width)
                .attr("height", height);

        d3.json(data.provinces, function (canada) {

            d3.csv(data.profile, function (profile) {

            census = d3.nest().key(function(d) { return d.provinces; }).entries(profile);
                //profile.forEach(function (d) {
                //populationByProvince.forEach(function(d){
                   // census.set(d.provinces, d);
               // });
    console.log(census);
                var extent = d3.extent(profile, function (d) { return +d.value; });
                scale = d3.scaleLinear()
                    .domain(extent)
                    .range([1, 100]);

                ready(canada, profile);
            });
        });

        function ready(canada, profile) {

            var carto = d3.cartogram()
                .projection(proj)
                .properties(function (geom, topo) {
                    return geom.properties;
                })
                // Morph on the number of characters in province's name.
                .value(function (d) {
                    var p = 6000,//get_population(d),
                        s = scale(p);
                    return s;
                });

            var no_morph = create_canada(canada);
            no_morph.attr("transform", "translate(0,250)" +
                           "scale(0.5,0.5)");
            var provinces = create_canada(canada);
            provinces.attr("transform", "translate(450,250)" +
                           "scale(0.5,0.5)");
console.log("carto..." + JSON.stringify(canada.objects.provinces.geometries));
            var features = carto(canada, canada.objects.provinces.geometries).features;

            provinces.data(features)
                .transition()
                .duration(2000)
                .ease("easeSin")
                .attr("d", carto.path);
        }

        function get_population(year, province) {
          //return +census.get(d.properties.PRENAME).value;
          var population = +census[0].values[0].value;
          console.log("get population..." + population);
          return population;
        }

        function get_populationByYear(d, year)
        {

        }


        function create_canada(canada) {

        //console.log("canada object " + JSON.stringify(canada.objects));
            var provinces = svg.append("g")
                            .attr("class", "provinces")
                            .selectAll("path")
                            .data(topojson.feature(canada, canada.objects.provinces))//.geometries)
                            .enter().append("path")
                            .attr("class", "province")
                            .attr("d", path);
            provinces.append("title")
                .text(function(d) { return d.id + ": " + d3.format(',')(get_population(d)); });

            return provinces;
        }
      }());