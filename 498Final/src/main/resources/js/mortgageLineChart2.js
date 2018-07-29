function chart2(){
var svg = d3.select("#chart2"),
    margin = {
        top: 40,
        right: 250,
        bottom: 30,
        left: 50
    },
   width = 960 - margin.left - margin.right,
               height = 500 - margin.top - margin.bottom;
       var g = svg.append("svg")
                   .attr("width", width + margin.left + margin.right)
                   .attr("height", height + margin.top + margin.bottom)
                   .append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var parseTime = d3.timeParse("%Y-%m");
var rateType;

var x = d3.scaleTime().range([0, width]),
    y = d3.scaleLinear().range([height, 0]),
    z = d3.scaleOrdinal(d3.schemeCategory10);


var line = d3.line()
    .curve(d3.curveBasisOpen)
   // .interpolate("basis")
    .x(function(d) {
        return x(d.date);
    })
    .y(function(d) {
        return y(d.amount);
    });

d3.csv("CSV/MortgageCanada_part.csv", function(d) {
            //d.VALUE = +d.VALUE;
            return d;
        }, function(error, data) {
            if (error) throw error;
            var mt = d3.nest().key(function(d){return d.TypeOfMortgage;}).entries(data);
            //console.log("mt..." + JSON.stringify(mt));
            mortgageType = mt.map(function(d) {
                    return {
                        id: d.key,
                        values: d.values.map(function(r) {
                                return {
                                    date: parseTime(r.REF_DATE),
                                    amount: +r.VALUE
                                };
                            })

                        };
                    });

                //console.log("mortgageType map..." + JSON.stringify(mortgageType));

                x.domain(d3.extent(data, function(d) {
                    return parseTime(d.REF_DATE);
                }));

                y.domain([
                    d3.min(mortgageType, function(r) {
                        return d3.min(r.values, function(d) {
                            return d.amount;
                        });
                    }),
                    d3.max(mortgageType, function(r) {
                        return d3.max(r.values, function(d) {
                            return d.amount - 5000;
                        });
                    })
                ]);

                z.domain(mortgageType.map(function(r){return r.id}));

//stack.keys(mortgageType.map(function(r){return r.id}));


                g.append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .append("text")
                .attr("class", "x label")
                    .attr("text-anchor", "end")
                    .attr("x", width)
                    .attr("y", height - 6)
                .attr("fill", "#000")
                .text("year-month");

                g.append("g")
                .attr("class", "axis axis--y")
                .call(d3.axisLeft(y))
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", "0.71em")
                .attr("fill", "#000")
                .text("Mortgage Amount in Million, $M");

                var mortgages = g.selectAll(".mortgages")
                    .data(mortgageType)
                    .enter().append("g")
                    .attr("class", "mortgages");

                mortgages.append("path")
                .attr("class", "line")
                .attr("d", function(d) {
                //console.log("d.values....." + JSON.stringify(d.values));
                    return line(d.values); })
                .style("stroke", function(d) {
                    return z(d.id);
                });


                mortgages.append("text")
                .datum(function(d) {
                //console.log("datum...." + JSON.stringify(d));

                return {
                        id: d.id,
                        value: d.values[d.values.length - 1]
                    };

                })
                .attr("transform", function(d) {
                if(d.id.includes("Total"))
                {
                       var yvalue =  y(d.value.amount) -25;
                    return "translate(" + x(d.value.date) + "," + yvalue + ")";
                }
                else
                {
                    return "translate(" + x(d.value.date) + "," + y(d.value.amount) + ")";
                    }
                })
                .attr("x", 3)
                .attr("dy", "-1.5em")
                .style("font", "12px sans-serif")
                .style("display", "inline-block")
                .text(function(d) {
                    return d.id;
                });
            });

        function type(d, _, columns) {
            d.date = parseTime(d.date);
            for (var i = 1, n = columns.length, c; i < n; ++i) d[c = columns[i]] = +d[c];
            return d;
        }

        }
        chart2();