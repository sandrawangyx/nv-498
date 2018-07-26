var svg = d3.select("#svg2"),
    margin = {
        top: 15,
        right: 25,
        bottom: 15,
        left: 60
    },
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.2),
    y = d3.scaleLinear().rangeRound([height, 0], 0.1);

var g = svg.append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var title = g.append("text")
    .attr("class", "title")
    .attr("dy", ".71em");

d3.csv("CSV/canPopulationByProvince.csv", function(d) {
    //sort bars based on value

d.NonImmigrants = +d.NonImmigrants;
d.Immigrants = +d.Immigrants;
d.Before2001 = +d.Before2001;
d.y2001to2005 = +d.y2001to2005;
d.y2006to2010  = +d.y2006to2010;
d.y2011to2016 = +d.y2011to2016;
d.NonPermanentResidents = +d.NonPermanentResidents;
return d;
}, function(error, data) {
  if (error) throw error;

//var byProv = d3.nest()
//    .key(function(d) { return d.Prov_Name; })
//    .entries(data);
//    console.log("by prov...." + JSON.stringify(byProv));

//  var currentProv = byProv[0].key;
//  var currentEntry = byProv[0].values;
    x.domain([0, d3.max(currentEntry, function(d) {
        return d.Total
    })]);
    y.domain(data.map(function(d) {
        return d.;
    }));

    //make y axis to show bar names
    var yAxis = d3.svg.axis()
        .scale(y)
        //no tick marks
        .tickSize(0)
        .orient("left");

    var gy = svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    var bars = svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("g")

    //append rects
    bars.append("rect")
        .attr("class", "bar")
        .attr("y", function(d) {
            return y(d.name);
        })
        .attr("height", y.rangeBand())
        .attr("x", 0)
        .attr("width", function(d) {
            return x(d.value);
        });

    //add a value label to the right of each bar
    bars.append("text")
        .attr("class", "label")
        //y position of the label is halfway down the bar
        .attr("y", function(d) {
            return y(d.name) + y.rangeBand() / 2 + 4;
        })
        //x position is 3 pixels to the right of the bar
        .attr("x", function(d) {
            return x(d.value) + 3;
        })
        .text(function(d) {
            return d.value;
        });
});