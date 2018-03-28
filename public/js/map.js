/**
 * @file: app.js
 * @description : show australia maps
 * @author: yin_gong<max.g.laboratory@gmail.com>
 */

d3.json("/public/data/example.json", jsonHandler);

function jsonHandler(data) {

    /**
     * jobs
     */

    var jobJson = data.job[0];

    var projection = d3
        .geoMercator()
        .scale(700)
        // .rotate([-0.25, 0.25, 0]) 
        .center([130, -25]);

    var path = d3.geoPath().projection(projection);

    var map = d3.select("body")
        .append("svg")
        .attr("width", 960)
        .attr("height", 600);

    var tooltip = d3.select("body").append("div").attr("class", "toolTip");

    d3.json("/public/data/australia.custom.geo.json", drawMaps);

    function drawMaps(geojson) {

        map.selectAll("path")
            .data(geojson.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("fill", function (d, i) {

                var type = whichType(d);

                switch (type) {
                    case "city":
                        return "#003e74";
                        break;
                    case "state":
                        return "#0052a0";
                        break;
                    default:
                        break;
                }

            })
            // .attr("fill-opacity", 0.5)
            .attr("stroke", "white")
            .attr("argsen-type", function (d, i) {

                var type = whichType(d);

                return type;
            })
            .attr("argsen-city", function (d, i) {

                var type = whichType(d);

                switch (type) {
                    case "city":
                        return d.properties.name;
                        break;
                    case "state":
                        return "";
                        break;
                    default:
                        break;
                }

            })
            .on("mouseover", handleMouseOver)
            .on("mouseout", handleMouseOut);

            
        function handleMouseOver() {

            var attr = d3.select(this).attr("argsen-type");
            var city = d3.select(this).attr("argsen-city");

            switch (attr) {
                case "city":

                    d3.select(this)
                        .attr("fill", "#40c1ac")

                    var cityArray = jobJson["job distribution"];
                    var jobNumber = 0;

                    for (var idx in cityArray) {
                        var tempCity = cityArray[idx][0].split('"')[3];

                        if (tempCity === city) {
                            jobNumber = cityArray[idx][1];
                        }
                    }

                    tooltip
                        .style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html(city + " : " + jobNumber);

                    break;

                default:
                    break;
            }


        }

        function handleMouseOut() {

            d3.select(this)
                .attr("fill", function (d) {

                    var type = whichType(d);

                    switch (type) {
                        case "city":
                            return "#003e74";
                            break;
                        case "state":
                            return "#0052a0";
                            break;
                        default:
                            break;
                    }

                })

            tooltip.style("display", "none");
        }

        function whichType(d) {
            if (d.geometry.type && d.geometry.type === "Point") {
                return "city"
            } else {
                return "state"
            }
        }

    }


}

