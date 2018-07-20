var margin = {top: 20, right: 40, bottom: 30, left: 20},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom,
    barWidth = Math.floor(width / 19) - 1;

var x = d3.scale.linear()
    .rangeRound([barWidth / 2, width - barWidth / 2]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis().scale(x).orient("bottom")
.ticks(d3.timeYear)
.tickFormat(d3.format("d"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("right")
    .tickSize(-width)
    .tickFormat(function(d) {
    var formatSuffixDecimal2 = d3.format(".2s");
    return formatSuffixDecimal2(d); });

// An SVG element with a bottom-right origin.
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// A sliding container to hold the bars by year.
var years = svg.append("g")
    .attr("class", "years");

// A label for the current year.
var title = svg.append("text")
    .attr("class", "title")
    .attr("dy", ".71em")
    .text("Population by Age Group");

 var dateFormat = d3.time.format("%Y");

d3.csv("CSV/sexageGroup_part.csv", function(data) {
  // Convert strings to numbers.
    //data.year= parse(data.year);
    data.year = +data.year;
    data.value= +data.value;

  // Compute the extent of the data set in age and years.
  var year0 = d3.min(data, function(d) { return d.year; }),
      year1 = d3.max(data, function(d) { return d.year; }),
      year = year1;

   var minValue = d3.min(data, function(d) {return d.value}),
   maxValue= d3.max(data, function(d){return d.value});

  // Update the scale domains.
  x.domain([year0, year1]);
  console.log(maxValue);
  y.domain([0, maxValue]);//(data, function(d) { return d.value; })]);


  // Produce a map from year and value to different age group.
  data = d3.nest()
      .key(function(d) { return d.year; })
      .key(function(d) { return d.AgeGroup; })
      .rollup(function(v) { return v.map(function(d) { return d.value; }); })
      .map(data);
svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);

  // Add an axis to show the population values.
  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + width + ",0)")
      .call(yAxis)
    .selectAll("g")
    .filter(function(value) { return !value; })
      .classed("zero", true);

  // Add labeled rects for each year (so that no enter or exit is required).
  var dataYear = years.selectAll(".dataYear")
  .data(d3.range(year0, year1, 1)).enter().append("g").attr("class","dataYear")
  .attr("transform", function(dataYear){return "translate(" +x(dataYear) + ",0)";});

  // Add labels to show age (separate; not animated).
  /*svg.selectAll(".age")
      .data(d3.range(0, year + 1, 5))
    .enter().append("text")
      .attr("class", "age")
      .attr("x", function(age) { return x(year - age); })
      .attr("y", height + 4)
      .attr("dy", ".71em")
      .text(function(age) { return age; });
*/
  // Allow the arrow keys to change the displayed year.
  window.focus();
  d3.select(window).on("keydown", function() {
    switch (d3.event.keyCode) {
      case 37: year = Math.max(year0, year - 10); break;
      case 39: year = Math.min(year1, year + 10); break;
    }
    update();
  });

  function update() {
    if (!(year in data)) return;
    title.text(year);


  }
  });