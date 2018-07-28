var svg = d3.select("#svg3"),
    margin = {top: 20, right: 20, bottom: 50, left: 70},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.2),
    y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var title = g.append("text")
     .attr("class", "title")
     .attr("dy", ".71em");

d3.csv("../CSV/sexageGroup_bothsexes.csv", function(d) {

  d.value = +d.value;
  d.AgeGroup = d.AgeGroup.substring(0, d.AgeGroup.length - 6);
  return d;
}, function(error, data) {
  if (error) throw error;

var populationByYear = d3.nest()
    .key(function(d) { return d.year; })
    .entries(data);

//console.log("json: " + JSON.stringify(populationByYear));
  x.domain(data.map(function(d) { return d.AgeGroup; }));
  y.domain([0, d3.max(data, function(d) { return d.value; }) + 5000]);



  g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  g.append("text")
   .attr("transform","translate(" + (width/2) + " ," + (height + margin.top + 10) + ")")
            .style("text-anchor", "middle")
            .text("Age Group");


  g.append("g")
      .attr("class", "axis axis--y")
      //.attr("transform", "translate(" + x(0) + ",0)")
      .call(d3.axisLeft(y).ticks(13).tickFormat(d3.format(".0f")));
    g.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 10 - margin.left)
      .attr("x",0 - (height / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle").text("Population");
//----slide
var barnumber = 20;
var page = 1;


var viewYearData = populationByYear[page-1].key;
var viewdata = populationByYear[page-1].values;

//console.log("view data....." + JSON.stringify(viewdata));
  g.selectAll(".bar")
      .data(viewdata)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.AgeGroup); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.value); });

title.text(viewYearData);



 $('#next').click(function() {
          page++;
          viewYearData = populationByYear[page-1].key;
          viewdata = populationByYear[page-1].values;
          updateView(viewdata);
           title.text(viewYearData);
          //console.log("view data....." + JSON.stringify(viewdata));
      });

      $('#last').click(function() {
          page--;
          viewYearData = populationByYear[page-1].key;
         viewdata = populationByYear[page-1].values;
          redraw(viewdata);
          title.text(viewYearData);
          //console.log("view data....." + JSON.stringify(viewdata));

      });

      function updateView(viewdata) {
      //console.log("in upateView"  + JSON.stringify(viewdata));
      g.selectAll(".bar")
      .data(viewdata)
          .transition()
          .duration(500)
          .attr("x", function(d) { return x(d.AgeGroup); })
                  .attr("y", function(d) { return y(d.value); })
         .attr("width", x.bandwidth())
                 .attr("height", function(d) { return height - y(d.value); });

       }




//----slide

});

