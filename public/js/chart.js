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

var selectProgram = null;
var selectSkill = null;
var selectSub = null;

$("#show-details-chart").on("click", function () {

    var selectProgram = $('#select-program').find(":selected").val();
    var path ='';

    switch (selectProgram) {
        case 'p-1':
            path = '/public/data/data/Bachelor of Information Technology (Software Development) -summary.json';
            break;
        case 'p-2':
            path = '/public/data/data/Bachelor of Education (Early Childhood) - summary.json';
            break;
        case 'p-3':
            path = '/public/data/data/Bachelor of Nursing (Mount Gambier) - summary.json';
            break;
        case 'p-4':
            path = '/public/data/data/Bachelor of Commerce (Accounting) - summary.json';
            break;
        default:
            break;
    }
    
    d3.json(path, jsonHandler);

});

function jsonHandler(data) {

    $("#data-analysis").empty();

    var selectSkill = $('#select-skill').find(":selected").val();
    var selectSub = $('#select-sub').find(":selected").val();

    if(selectSkill === 'h'){

        switch (selectSub) {
            case 's-1':
                var treeData = dataRestructureMHSO(data["Matching"][0]["Hard skills"]);
                break;
            case 's-2':
                var treeData = dataRestructureMHSC(data["Matching"][0]["Hard skills"]);
                break;
            case 's-3':
                var treeData = dataRestructureMHSS(data["Matching"][0]["Hard skills"]);
                break;
            case 's-4':
                var treeData = dataRestructureUMHSO(data["Matching"][0]["Hard skills"]);
                break;
            case 's-5':
                var treeData = dataRestructureUMHSC(data["Matching"][0]["Hard skills"]);
                break;
            case 's-6':
                var treeData = dataRestructureUMHSS(data["Matching"][0]["Hard skills"]);
                break;
            default:
                break;
        }

    }else{

        switch (selectSub) {
            case 's-1':
                var treeData = dataRestructureMSSO(data["Matching"][0]["Soft skills"]);
                break;
            case 's-2':
                var treeData = dataRestructureMSSC(data["Matching"][0]["Soft skills"]);
                break;
            case 's-3':
                var treeData = dataRestructureMSSS(data["Matching"][0]["Soft skills"]);
                break;
            case 's-4':
                var treeData = dataRestructureUMSSO(data["Matching"][0]["Soft skills"]);
                break;
            case 's-5':
                var treeData = dataRestructureUMSSC(data["Matching"][0]["Soft skills"]);
                break;
            case 's-6':
                var treeData = dataRestructureUMSSS(data["Matching"][0]["Soft skills"]);
                break;
            default:
                break;
        }

    }







    /**
     *@description: todo : use different method to restructure data
     */

    // var treeData = dataRestructureMHSS(data["Matching"][0]["Hard skills"]);

    // var treeData = dataRestructureMHSO(data["Matching"][0]["Hard skills"]);

    // var treeData = dataRestructureMHSC(data["Matching"][0]["Hard skills"]);

    // var treeData = dataRestructureUMHSO(data["Matching"][0]["Hard skills"]);

    // var treeData = dataRestructureUMHSS(data["Matching"][0]["Hard skills"]);

    // var treeData = dataRestructureUMHSC(data["Matching"][0]["Hard skills"]);

    // var treeData = dataRestructureMSSO(data["Matching"][0]["Soft skills"]);

    // var treeData = dataRestructureMSSS(data["Matching"][0]["Soft skills"]);

    // var treeData = dataRestructureMSSC(data["Matching"][0]["Soft skills"]);
    
    // var treeData = dataRestructureUMSSO(data["Matching"][0]["Soft skills"]);

    // var treeData = dataRestructureUMSSS(data["Matching"][0]["Soft skills"]);

    // var treeData = dataRestructureUMHSC(data["Matching"][0]["Soft skills"]);

    /**
     *@description: Generate the tree diagram
     */ 
    var margin = { top: 20, right: 100, bottom: 20, left: 200 },
        width = 2000 - margin.right - margin.left,
        height = 860 - margin.top - margin.bottom;

    var i = 0,
        duration = 750,
        root;

    var tree = d3.layout.tree()
        .size([height, width]);

    var diagonal = d3.svg.diagonal()
        .projection(function (d) {
            return [d.y, d.x];
        });

    var svg = d3.select("#data-analysis").append("svg")
        .attr("width", width + margin.right + margin.left)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    root = treeData[0];
    root.x0 = height / 2;
    root.y0 = 0;

    update(root);

    toggle(root);

    d3.select(self.frameElement).style("height", "400px");

    /**
     * @description: toogle children node by click or default 
     */
    function update(source) {

        // Compute the new tree layout.
        var nodes = tree.nodes(root).reverse(),
            links = tree.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) { d.y = d.depth * 300; });

        // Update the nodes…
        var node = svg.selectAll("g.node")
            .data(nodes, function (d) { return d.id || (d.id = ++i); });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("argsen-depth", function (d) {
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
                var o = { x: source.x0, y: source.y0 };
                return diagonal({ source: o, target: o });
            })
            .style("stroke-linecap", "round")
            .style("stroke", function (d) {
                return d.source.color;
            })
            .style("stroke-opacity", "0.35")
            .style("stroke-width", function (d) {
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

    function toggle(d){

        for(var idx in d.children){
            if(idx != 0){
                d.children[idx]._children = d.children[idx].children;
                d.children[idx].children = null;
            }
        }
        update(d);

    }

    /**
     *@description: Matching-> Hard skills -> Matched hard skills (Overall) 
     */
    function dataRestructureMHSO(data){

        var returnData = [{
            "name": "Matched hard skills",
            "parent": "null",
            "color": "rgb(" +  Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
            "children": []
        }];

        var unstructuredDataMHSO = data["Matched hard skills (Overall)"];

        for (var idx in unstructuredDataMHSO) {
            var pushData = {
                "name": unstructuredDataMHSO[idx][0],
                "parent": "Matched hard skills",
                "color": "rgb(" +  Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                "size": Number(unstructuredDataMHSO[idx][1])%20 + 1,
            }

            returnData[0].children.push(pushData);
        }

        return returnData;


    }

    /**
     *@description: Matching-> Hard skills -> Matched hard skills (by states of jobs) 
     */
    function dataRestructureMHSS(data) {

        var returnData = [{
            "name": "Matched hard skills",
            "parent": "null",
            "color": "rgb(" +  Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
            "children": []
        }];

        var unstructuredDataMHSS = data["Matched hard skills (by states of jobs)"];

        for (var idx in unstructuredDataMHSS) {
            var pushData = {
                "name": unstructuredDataMHSS[idx][0],
                "parent": "Matched hard skills",
                "color": "rgb(" +  Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                "children": []
            }

            for(var idy in unstructuredDataMHSS[idx][1]){
                var pushDataY = {
                    "name": unstructuredDataMHSS[idx][1][idy][0],
                    "parent":unstructuredDataMHSS[idx][0],
                    "color": "rgb(" +  Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                    "size": Number(unstructuredDataMHSS[idx][1][idy][1])%20 + 1,
                };

                pushData.children.push(pushDataY);
            }

            returnData[0].children.push(pushData);
        }

        return returnData;

    };

    /**
     *@description: Matching-> Hard skills -> Matched hard skills (by classification of jobs) 
     */
    function dataRestructureMHSC(data) {

        var returnData = [{
            "name": "Matched hard skills",
            "parent": "null",
            "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
            "children": []
        }];

        var unstructuredDataMHSC = data["Matched hard skills (by classification of jobs)"];

        for (var idx in unstructuredDataMHSC) {
            var pushData = {
                "name": unstructuredDataMHSC[idx][0],
                "parent": "Matched hard skills",
                "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                "children": []
            }

            for (var idy in unstructuredDataMHSC[idx][1]) {
                var pushDataY = {
                    "name": unstructuredDataMHSC[idx][1][idy][0],
                    "parent": unstructuredDataMHSC[idx][0],
                    "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                    "size": Number(unstructuredDataMHSC[idx][1][idy][1]) % 20 + 1,
                };

                pushData.children.push(pushDataY);
            }

            returnData[0].children.push(pushData);
        }

        return returnData;

    }

    /**
     *@description: Matching-> Hard skills -> Unmatched hard skills (Overall) 
     */
    function dataRestructureUMHSO(data){

        var returnData = [{
            "name": "Unmatched hard skills",
            "parent": "null",
            "color": "rgb(" +  Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
            "children": []
        }];

        var unstructuredDataUMHSO = data["Unmatched hard skills (Overall)"];

        for (var idx in unstructuredDataUMHSO) {
            var pushData = {
                "name": unstructuredDataUMHSO[idx],
                "parent": "Unmatched hard skills",
                "color": "rgb(" +  Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                "size": 4,
            }

            returnData[0].children.push(pushData);
        }

        return returnData;

    }

    /**
     *@description: Matching-> Hard skills -> Unmatched hard skills (by states of jobs)
     */
    function dataRestructureUMHSS(data) {

        var returnData = [{
            "name": "Unmatched hard skills",
            "parent": "null",
            "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + 1 + ")",
            "children": []
        }];

        var unstructuredDataUMHSS = data["Unmatched hard skills (by states of jobs)"];

        for (var idx in unstructuredDataUMHSS) {
            var pushData = {
                "name": unstructuredDataUMHSS[idx][0],
                "parent": "Unmatched hard skills",
                "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + "," + Math.floor(Math.random() * 255) +  ", " + Math.floor(Math.random() * 255) + 1 + ")",
                "children": []
            }

            for (var idy in unstructuredDataUMHSS[idx][1]) {
                var pushDataY = {
                    "name": unstructuredDataUMHSS[idx][1][idy],
                    "parent": unstructuredDataUMHSS[idx][0],
                    "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + 1 + ")",
                    "size": 5,
                };

                pushData.children.push(pushDataY);
            }

            returnData[0].children.push(pushData);
        }

        return returnData;

    };

    /**
     *@description: Matching-> Hard skills -> Unmatched hard skills (by classification of jobs)
     */
    function dataRestructureUMHSC(data) {

        var returnData = [{
            "name": "Unmatched hard skills",
            "parent": "null",
            "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
            "children": []
        }];

        var unstructuredDataUMHSC = data["Unmatched hard skills (by classification of jobs)"];

        for (var idx in unstructuredDataUMHSC) {
            var pushData = {
                "name": unstructuredDataUMHSC[idx][0],
                "parent": "Unmatched hard skills",
                "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                "children": []
            }

            for (var idy in unstructuredDataUMHSC[idx][1]) {
                var pushDataY = {
                    "name": unstructuredDataUMHSC[idx][1][idy],
                    "parent": unstructuredDataUMHSC[idx][0],
                    "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                    "size": 4,
                };

                pushData.children.push(pushDataY);
            }

            returnData[0].children.push(pushData);
        }

        return returnData;

    }

    /**
     *@description: Matching-> Soft skills -> Matched soft skills (Overall)
     */
    function dataRestructureMSSO(data){

        var returnData = [{
            "name": "Matched soft skills",
            "parent": "null",
            "color": "rgb(" +  Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
            "children": []
        }];

        var unstructuredDataMSSO = data["Matched soft skills (Overall)"];

        for (var idx in unstructuredDataMSSO) {
            var pushData = {
                "name": unstructuredDataMSSO[idx][0],
                "parent": "Matched soft skills",
                "color": "rgb(" +  Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                "size": Number(unstructuredDataMSSO[idx][1])%20 + 1,
            }

            returnData[0].children.push(pushData);
        }

        return returnData;


    }

    /**
     *@description: Matching-> Soft skills -> Matched Soft skills (by states of jobs) 
     */
    function dataRestructureMSSS(data) {

        var returnData = [{
            "name": "Matched soft skills",
            "parent": "null",
            "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
            "children": []
        }];

        var unstructuredDataMSSS = data["Matched soft skills (by states of jobs)"];

        for (var idx in unstructuredDataMSSS) {
            var pushData = {
                "name": unstructuredDataMSSS[idx][0],
                "parent": "Matched soft skills",
                "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                "children": []
            }

            for (var idy in unstructuredDataMSSS[idx][1]) {
                var pushDataY = {
                    "name": unstructuredDataMSSS[idx][1][idy][0],
                    "parent": unstructuredDataMSSS[idx][0],
                    "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                    "size": Number(unstructuredDataMSSS[idx][1][idy][1]) % 20 + 1,
                };

                pushData.children.push(pushDataY);
            }

            returnData[0].children.push(pushData);
        }

        return returnData;

    }

    /**
     *@description: Matching-> Soft skills -> Matched Soft skills (by classification of jobs) 
     */
    function dataRestructureMSSC(data) {

        var returnData = [{
            "name": "Matched soft skills",
            "parent": "null",
            "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
            "children": []
        }];

        var unstructuredDataMSSC = data["Matched soft skills (by classification of jobs)"];

        for (var idx in unstructuredDataMSSC) {
            var pushData = {
                "name": unstructuredDataMSSC[idx][0],
                "parent": "Matched soft skills",
                "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                "children": []
            }

            for (var idy in unstructuredDataMSSC[idx][1]) {
                var pushDataY = {
                    "name": unstructuredDataMSSC[idx][1][idy][0],
                    "parent": unstructuredDataMSSC[idx][0],
                    "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                    "size": Number(unstructuredDataMSSC[idx][1][idy][1]) % 20 + 1,
                };

                pushData.children.push(pushDataY);
            }

            returnData[0].children.push(pushData);
        }

        return returnData;

    }

    /**
     *@description: Matching-> Soft skills -> Unmatched soft skills (Overall)
     */
    function dataRestructureUMSSO(data){

        var returnData = [{
            "name": "Unmatched soft skills",
            "parent": "null",
            "color": "rgb(" +  Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
            "children": []
        }];

        var unstructuredDataUMSSO = data["Unmatched soft skills (Overall)"];

        for (var idx in unstructuredDataUMSSO) {
            var pushData = {
                "name": unstructuredDataUMSSO[idx],
                "parent": "Unmatched soft skills",
                "color": "rgb(" +  Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                "size": 4,
            }

            returnData[0].children.push(pushData);
        }

        return returnData;

    }

    /**
     *@description: Matching-> Soft skills -> Unmatched soft skills (by states of jobs)
     */
    function dataRestructureUMSSS(data) {

        var returnData = [{
            "name": "Unmatched soft skills",
            "parent": "null",
            "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + 1 + ")",
            "children": []
        }];

        var unstructuredDataUMSSS = data["Unmatched soft skills (by states of jobs)"];

        for (var idx in unstructuredDataUMSSS) {
            var pushData = {
                "name": unstructuredDataUMSSS[idx][0],
                "parent": "Unmatched soft skills",
                "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + "," + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + 1 + ")",
                "children": []
            }

            for (var idy in unstructuredDataUMSSS[idx][1]) {
                var pushDataY = {
                    "name": unstructuredDataUMSSS[idx][1][idy],
                    "parent": unstructuredDataUMSSS[idx][0],
                    "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", " + Math.floor(Math.random() * 255) + ", " + Math.floor(Math.random() * 255) + 1 + ")",
                    "size": 5,
                };

                pushData.children.push(pushDataY);
            }

            returnData[0].children.push(pushData);
        }

        return returnData;

    };

    /**
     *@description: Matching-> Hard skills -> Unmatched soft skills (by classification of jobs)
     */
    function dataRestructureUMHSC(data) {

        var returnData = [{
            "name": "Unmatched soft skills",
            "parent": "null",
            "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
            "children": []
        }];

        var unstructuredDataUMSSC = data["Unmatched soft skills (by classification of jobs)"];

        for (var idx in unstructuredDataUMSSC) {
            var pushData = {
                "name": unstructuredDataUMSSC[idx][0],
                "parent": "Unmatched soft skills",
                "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                "children": []
            }

            for (var idy in unstructuredDataUMSSC[idx][1]) {
                var pushDataY = {
                    "name": unstructuredDataUMSSC[idx][1][idy],
                    "parent": unstructuredDataUMSSC[idx][0],
                    "color": "rgb(" + Math.floor(Math.random() * 255) + 1 + ", 45, " + Math.floor(Math.random() * 255) + 1 + ")",
                    "size": 4,
                };

                pushData.children.push(pushDataY);
            }

            returnData[0].children.push(pushData);
        }

        return returnData;

    }

}








