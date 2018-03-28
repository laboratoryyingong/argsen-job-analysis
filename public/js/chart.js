// var treeData = [
//     {
//       "name": "Skill Matching",
//       "parent": "null",
//       "children": [
//         {
//           "name": "overall matched hard skills",
//           "parent": "Skill Matching",
//           "children": [
//             {
//               "name": "Son of A",
//               "parent": "Level 2: A"
//             },
//             {
//               "name": "Daughter of A",
//               "parent": "Level 2: A"
//             }
//           ]
//         },
//         {
//           "name": "course level matched soft skills",
//           "parent": "Skill Matching"
//         }
//       ]
//     }
//   ];

// ************** re-structure tree data from example.json *****************

d3.json("/public/data/example.json", jsonHandler);

function jsonHandler(data) {

    var treeData = dataRestructure(data["matching"]);

    // ************** Generate the tree diagram	 *****************
    var margin = { top: 20, right: 120, bottom: 20, left: 200 },
        width = 3000 - margin.right - margin.left,
        height = 960 - margin.top - margin.bottom;

    var i = 0,
        duration = 750,
        root;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function (d) { 
            return [d.y, d.x]; });

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.right + margin.left )
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    root = treeData[0];
    root.x0 = height / 2;
    root.y0 = 0;

    update(root);
    
    //TODO:

    d3.select(self.frameElement).style("height", "500px");

    function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) { d.y = d.depth * 450; });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) { return d.id || (d.id = ++i); });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("argsen-depth", function(d){
                return d.depth;
            })
            .attr("transform", function (d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
            .on("click", click);

        nodeEnter.append("circle")
            .attr("r", 1e-6)
            .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeEnter.append("text")
            .attr("x", function (d) { return d.children || d._children ? -13 : 13; })
            .attr("dy", ".35em")
            .attr("text-anchor", function (d) { return d.children || d._children ? "end" : "start"; })
            .text(function (d) { return d.name; })
            .style("fill-opacity", 1e-6);

        // Transition nodes to their new position.
        var nodeUpdate = node.transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; });

        nodeUpdate.select("circle")
            .attr("r", 10)
            .style("fill", function (d) { return d._children ? "lightsteelblue" : "#fff"; });

        nodeUpdate.select("text")
            .style("fill-opacity", 1);

        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) { return "translate(" + source.y + "," + source.x + ")"; })
            .remove();

        nodeExit.select("circle")
            .attr("r", 1e-6);

        nodeExit.select("text")
            .style("fill-opacity", 1e-6);

        // Update the links…
        var link = svg.selectAll("path.link")
            .data(links, function (d) { return d.target.id; });

        // Enter any new links at the parent's previous position.
        link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = { x: source.x0, y: source.y0};
                return diagonal({ source: o, target: o });
            })
            .style("stroke-linecap", "round")
            .style("stroke", function(d){
                return d.source.color;
            })
            .style("stroke-opacity", "0.35")
            .style("stroke-width", function(d){
                return d.target.size
            })
            .attr("fill", "none");


        // Transition links to their new position.
        link.transition()
            .duration(duration)
            .attr("d", diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration)
            .attr("d", function (d) {
                var o = { x: source.x, y: source.y };
                return diagonal({ source: o, target: o });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });
    }

    // Toggle children on click.
    function click(d) {

        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        update(d);
    }

    function dataRestructure(data) {

        var returnData = [{
            "name": "Skill Matching",
            "parent": "null",
            "color": "rgb(90, 12, 122)",
            "children": []
        }];

        //for overall matched hard skills

        returnData[0].children.push({
            "name": "overall matched hard skills",
            "parent": "Skill Matching",
            "color": "rgb(152, 43, 154)",
            "children": [
            ]
        });

        var unstructuredDataOMHS = data[0]["overall matched hard skills"];

        for (var idx in unstructuredDataOMHS) {
            var pushData = {
                "name": unstructuredDataOMHS[idx][0],
                "parent": "overall matched hard skills",
                "size": unstructuredDataOMHS[idx][1]
            }
            returnData[0].children[0].children.push(pushData);
        }

        //for overall unmatched hard skills

        returnData[0].children.push({
            "name": "overall unmatched hard skills",
            "parent": "Skill Matching",
            "color": "rgb(214, 45, 63)",
            "children": [
            ]
        });

        var unstructuredDataOUHS = data[0]["overall unmatched hard skills"];

        for (var idx in unstructuredDataOUHS) {

            var pushData = {
                "name": unstructuredDataOUHS[idx],
                "parent": "overall unmatched hard skills",
                "size": 2
            }

            returnData[0].children[1].children.push(pushData);
        }

        //for overall matched soft skills

        returnData[0].children.push({
            "name": "overall matched soft skills",
            "parent": "Skill Matching",
            "color": "rgb(176, 45, 93)",
            "children": [
            ]
        });

        var unstructuredDataOMSS = data[0]["overall matched soft skills"];

        for (var idx in unstructuredDataOMSS) {
            var pushData = {
                "name": unstructuredDataOMSS[idx][0],
                "parent": "overall matched soft skills",
                "size": unstructuredDataOMSS[idx][1]
            }
            returnData[0].children[2].children.push(pushData);
        }

        //for overall unmatched soft skills

        returnData[0].children.push({
            "name": "overall unmatched soft skills",
            "parent": "Skill Matching",
            "color": "rgb(191, 45, 78)",
            "children": [
            ]
        });

        var unstructuredDataOUSS = data[0]["overall unmatched soft skills"];

        for (var idx in unstructuredDataOUSS) {

            var pushData = {
                "name": unstructuredDataOUSS[idx],
                "parent": "overall unmatched soft skills",
                "size": 2
            }

            returnData[0].children[3].children.push(pushData);
        }

        //for course level matched soft skills

        returnData[0].children.push({
            "name": "course level matched soft skills",
            "parent": "Skill Matching",
            "color": "rgb(215, 45, 63)",
            "children": [
            ]
        });

        var unstructuredDataCLMSS = data[0]["course level matched soft skills"];

        for (var idx in unstructuredDataCLMSS){

            var pushDataX = {
                "name": unstructuredDataCLMSS[idx][0],
                "parent": "course level matched soft skills",
                "color": "rgb(225, 45, 50)",
                "size": 2,
                "children": [
                ]
            };

            for(var y = 0; y < unstructuredDataCLMSS[idx][1].length; y++){
                var pushDataY = {
                    "name": unstructuredDataCLMSS[idx][1][y],
                    "parent": unstructuredDataCLMSS[idx],
                    "color": "rgb(230, 45, 40)",
                    "size": unstructuredDataCLMSS[idx][2][y],
                };

                pushDataX.children.push(pushDataY);

            }

            returnData[0].children[4].children.push(pushDataX);

        }

        //for course level matched hard skills

        returnData[0].children.push({
            "name": "course level matched hard skills",
            "parent": "Skill Matching",
            "color": "rgb(165, 45, 195)",
            "children": [
            ]
        });

        var unstructuredDataCLMHS = data[0]["course level matched hard skills"];

        for (var idx in unstructuredDataCLMHS){

            var pushDataX = {
                "name": unstructuredDataCLMHS[idx][0],
                "parent": "course level matched soft skills",
                "color": "rgb(145, 45, 215)",
                "size": 2,
                "children": [
                ]
            };

            for(var y = 0; y < unstructuredDataCLMHS[idx][1].length; y++){
                var pushDataY = {
                    "name": unstructuredDataCLMHS[idx][1][y],
                    "parent": unstructuredDataCLMHS[idx],
                    "color": "rgb(130, 45, 225)",
                    "size": unstructuredDataCLMHS[idx][2][y],
                };

                pushDataX.children.push(pushDataY);

            }

            returnData[0].children[5].children.push(pushDataX);

        }


        return returnData;

    };

}








