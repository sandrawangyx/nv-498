var svg = d3.select("#svg1"),
 margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;


var projection = d3.geoAzimuthalEqualArea()
.rotate([100, -45])
.center([5, 20])
.scale(800)
.translate([width/2, height/2]);

d3.json("js/canada.json", function(ca) {
console.log(ca);
svg.selectAll(“path”)
.data(topojson.feature(ca, ca.objects.counties).features)
.enter()
.append(“path”)
.attr(“d”, path);

var immByProv = d3.map();
});



