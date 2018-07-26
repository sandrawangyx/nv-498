function updateSVG()
{
d3.select("svg").remove();
}


function provB(columnName) {
console.log("passing in  column name...." + columnName);;
    var svg = d3.select("#bar-container"),
        margin = {
            top: 30,
            right: 25,
            bottom: 15,
            left: 200
        },
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        var g = svg.append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


    var title = g.append("text")
        .attr("class", "title")
        .attr("dy", ".71em");

    function mapColumnName(d, columnName) {

        var returnColumnName;
        if (columnName === "Total") {
            returnColumnName = d.Total;
        } else if (columnName === "NonImmigrants") {
            returnColumnName = d.NonImmigrants;
        } else if (columnName === "Immigrants") {
            returnColumnName = d.Immigrants;
        } else if (columnName === "Before2001") {
            returnColumnName = d.Before2001;
        } else if (columnName === "y2001to2005") {
            returnColumnName = d.y2001to2005;
        } else if (columnName === "y2006to2010") {
            returnColumnName = d.y2006to2010;
        } else if (columnName === "y2011to2016") {
            returnColumnName = d.y2011to2016;
        } else if (columnName === "NonPermanentResidents") {
            returnColumnName = d.NonPermanentResidents;
        }
        //console.log("return column name..... " + returnColumnName);
        return returnColumnName;
    }

    function mapDisplayName(d, columnName)
    {
    var returnColumnName;
            if (columnName === "Total") {
                returnColumnName = "Total population";
            } else if (columnName === "NonImmigrants") {
                returnColumnName = "Non Immigrants";
            } else if (columnName === "Immigrants") {
                returnColumnName = "Immigrants";
            } else if (columnName === "Before2001") {
                returnColumnName = "Before 2001";
            } else if (columnName === "y2001to2005") {
                returnColumnName = "From 2001 to 2005";
            } else if (columnName === "y2006to2010") {
                returnColumnName = "From 2006 to 2010";
            } else if (columnName === "y2011to2016") {
                returnColumnName = "From 2011 to 2016";
            } else if (columnName === "NonPermanentResidents") {
                returnColumnName = "Non Permanent Residents";
            }
            //console.log("return column name..... " + returnColumnName);
            return returnColumnName;
    }

    d3.csv("CSV/canPopulationByProvince.csv", function(d) {
        //sort bars based on value
        d.Total = +d.Total;
        d.NonImmigrants = +d.NonImmigrants;
        d.Immigrants = +d.Immigrants;
        d.Before2001 = +d.Before2001;
        d.y2001to2005 = +d.y2001to2005;
        d.y2006to2010 = +d.y2006to2010;
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
        //mapColumnName(d, columnName);
        var x = d3.scaleLinear().range([0, width]).domain([0, d3.max(data, function(d) {
            return mapColumnName(d, columnName);
        })]);
        var y = d3.scaleBand().rangeRound([height, 0], 0.1).domain(data.map(function(d) {
            return d.Prov_Name;
        }));


        //make y axis to show bar names
        var yAxis = d3.axisLeft()
            .scale(y)
            //no tick marks
            .tickSize(0);

        var gy = g.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        var bars = g.selectAll(".bar")
            .data(data)
            .enter()
            .append("g");

        //append rects
        bars.append("rect")
            .attr("class", "bar")
            .attr("y", function(d) {
                return y(d.Prov_Name);
            })
            .attr("height", y.bandwidth() / 2 + 4)
            .attr("x", 0)
            .attr("width", function(d) {
                return x(mapColumnName(d, columnName));
            });

        //add a value label to the right of each bar
        bars.append("text")
            .attr("class", "label")
            //y position of the label is halfway down the bar
            .attr("y", function(d) {
                return y(d.Prov_Name) + y.bandwidth() / 2;
            })
            //x position is 3 pixels to the right of the bar
            .attr("x", function(d) {
                return x(mapColumnName(d, columnName)) + 3;
            })
            .text(function(d) {
                return mapColumnName(d, columnName);
            });

       // title.text(function(d){return mapDisplayName(d, columnName)});

    });
    document.getElementById("bar-container").style.display= "block";
}