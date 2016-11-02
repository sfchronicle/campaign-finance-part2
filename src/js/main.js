//require("./lib/social"); //Do not delete
var d3 = require('d3');
var Sankey = require('./lib/d3.chart.sankey');

// -----------------------------------------------------------------------------
// reload page if the reader re-orients their device ---------------------------
// -----------------------------------------------------------------------------

window.addEventListener("orientationchange", function() {
  window.location.reload();
}, false);

// -----------------------------------------------------------------------------
// build Sankey graph ---------------------------
// -----------------------------------------------------------------------------

var colors = {

      'progresssanfrancisco': '#6C85A5',
      'sanfranciscansforacitythatworks': '#D13D59',
      // //'alamedacounty': '#D04B61',
      'sfforacitythatworks': '#889C6B',
      //
      'rfkdemocraticclub': '#996B7D',
      'rfkdemocraticclubsupportingphilhourandsafaiforsupervisor': '#996B7D',
      'facebookinc': '#A89170',
      // 'apple': '#61988E',
      // 'cisco': '#6E7B8E',
      // 'deloitte': '#80A9D0',
      // 'facebook': '#FFE599',
      // 'google': '#FFCC32',
      // 'hclamerica': '#99B4CF',
      // 'hclglobal': '#99B4CF',
      // 'infosys': '#E89EAC',
      // 'intuit': '#9FA7B3',
      // 'juniper': '#E59FA6',
      // 'mindtree': '#61988E',
      // 'mphasis': '#846A6A',
      // 'oracle': '#EB8F6A',
      // 'pwc': '#6F7D8C',
      // 'synopsys': '#DE8067',
      // 'tata': '#667A96',
      // 'uber': '#FFE599',
      // 'wipro': '#9C8B9E',
      // 'zensar': '#D04B61',
      // 'nvidia': '#996B7D',
      // 'samsung': '#DE8067',
      //
      // '<$50k': '#493843',
      // '$50-100k': '#80A9D0',
      // '$100-150k': '#DE8067',
      // '>$150k': '#FFE599',

      'fallback': '#696969'

    };

//set up graph in same style as original example but empty
var graph = {"nodes" : [], "links" : []};

sankeyData.forEach(function (d) {
  graph.nodes.push({ "name": d.source });
  graph.nodes.push({ "name": d.target });
  // graph.nodes.push({ "name": d.pay_category });

  graph.links.push({ "source": d.source,
                     "target": d.target,
                     "value": +d.value });
  //  graph.links.push({ "source": d.target,
  //                     "target": d.pay_category,
  //                     "value": +d.value });
 });

 // return only the distinct / unique nodes
 graph.nodes = d3.keys(d3.nest()
   .key(function (d) { return d.name; })
   .map(graph.nodes));

 // loop through each link replacing the text with its index from node
 graph.links.forEach(function (d, i) {
   graph.links[i].source = graph.nodes.indexOf(graph.links[i].source);
   graph.links[i].target = graph.nodes.indexOf(graph.links[i].target);
 });

 //now loop through each nodes to make nodes an array of objects
 // rather than an array of strings
 graph.nodes.forEach(function (d, i) {
   graph.nodes[i] = { "name": d };
 });

var chart = d3.select("#sankey-graph").append("svg").chart("Sankey.Path");
chart
  .name(label)
  .colorNodes(function(name, node) {
    return color(node, 1) || colors.fallback;
  })
  .colorLinks(function(link) {
    return color(link.source, 4) || color(link.target, 1) || colors.fallback;
  })
  .nodeWidth(20)
  .nodePadding(20)
  .spread(true)
  .iterations(0)
  .draw(graph);

function label(node) {
  // if (node.name == "San Francisco") {
  //   return node.name + " (11K)";
  // } else if (node.name == "Santa Clara") {
  //   return node.name + " (46K)"
  // } else if (node.name == "San Mateo") {
  //   return node.name + " (6K)"
  // } else {
    return node.name;
  // }
}

function color(node, depth) {
  var id = node.name.toLowerCase().split(" ").join("").replace(",","").replace(".","");
  if (colors[id]) {
    return colors[id];
  } else if (depth > 0 && node.targetLinks && node.targetLinks.length == 1) {
    return color(node.targetLinks[0].source, depth-1);
  } else {
    return null;
  }
}


// -----------------------------------------------------------------------------
// build flow chart with nodes and connections ---------------------------
// -----------------------------------------------------------------------------

// // var formatthousands = d3.format("0,000");
// var formatthousands = d3.format(",d");
//
// var horiz_spacing = {
//   left: 100,
//   right: -45
// }
//
// var left_alignment = 40;
// var margin = {
//   x: 200,
//   y: 50 }
// if (screen.width > 1024) {
//   var W = 850;
//   var H = 900;
//   var left_alignment = 40;
// } else if (screen.width <= 1024 && screen.width > 667) {
//   var W = 750;
//   var H = 800;
//   var horiz_spacing = {
//     left: 100,
//     right: 0
//   }
//   var left_alignment = 35;
// } else if (screen.width <= 667 && screen.width > 480) {
//   var W = 525;
//   var H = 600;
//   var horiz_spacing = {
//     left: 50,
//     right: -12
//   }
//   var left_alignment = 40;
// } else if (screen.width <= 480) {
//   var W = 300;
//   var H = 600;
//   var margin = {
//     x: 110,
//     y: 0 };
//   var horiz_spacing = {
//     left: 0,
//     right: -35
//   };
//   console.log(horiz_spacing);
//   var left_alignment = 40;
// }
//
// function color_function(d) {
//   return '#A2B685';
//   // if (d == "Doris Fisher"){
//   //   return '#A2B685';
//   // } else if (d == "Ron Conway") {
//   //   return '#869FBF';
//   // } else if (d == "California Charter Schools Assoc") {
//   //   return '#FFE64C';
//   // } else {
//   //   return "#D13D59";
//   // }
// }
//
// function linewidth(d) {
//   if (screen.width <= 480) {
//     var result = d/1.5e5+8;
//   } else {
//     var result = d/0.7e5+6;
//   }
//   return result;
// }
//
// d3.select("#node-graph").append("svg")
//   .attr("width",W)
//   .attr("height",H);
//
// var svg = d3.select("svg"),
//     width = +svg.attr("width"),
//     height = +svg.attr("height"),
//     g = svg.append("g")
//       // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//       .attr("transform", "translate("+left_alignment+",0)");
//
// var tree = d3.tree()
//   .size([H-margin.y,W-margin.x]);
//
// // var diagonal = d3.diagonal()
// //  .projection(function(d) { return [d.x, d.y]; });
//
// // console.log(diagonal);
//
// var stratify = d3.stratify()
//   .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });
//
// var root = stratify(campaignData)
//     .sort(function(a, b) {
//       return (a.height - b.height) || a.id.localeCompare(b.id);
//     });
//
// var link = g.selectAll(".link")
//   .data(tree(root).descendants().slice(1))
//   .enter().append("path")
//     .attr("class", "link")
//       .attr("stroke-width",function(d) {
//         return linewidth(d.data.value);
//       })
//       .attr("stroke",function(d){
//         var result = color_function(d.id.substring(d.id.lastIndexOf(".") + 1));
//         return result;
//       })
//     // .attr("d", diagonal)
//     .attr("d", function(d) {
//       return "M" + d.y + "," + d.x
//           + "C" + (d.y + d.parent.y) / 2 + "," + d.x
//           + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
//           + " " + d.parent.y + "," + d.parent.x;
//     })
//     .on("mouseover", function(d) {
//       var split_str = d.id.split(".");
//       var donor = d.id.substring(d.id.lastIndexOf(".") + 1);
//       var recipient = split_str[ split_str.length - 2 ];
//       tooltip.html(`
//         <div><span class="bold">Donor</span>: ${donor}</div>
//         <div><span class="bold">Recipient</span>: ${recipient}</div>
//         <div><span class="bold">Amount</span>: $${formatthousands(d.data.value)}</div>
//       `);
//       tooltip.style("visibility", "visible");
//   })
//   .on("mousemove", function() {
//     if (screen.width <= 480) {
//       return tooltip
//         .style("top",(d3.event.pageY+40)+"px")//(d3.event.pageY+40)+"px")
//         .style("left",10+"px");
//     } else {
//       return tooltip
//         .style("top", (d3.event.pageY+20)+"px")
//         .style("left",((2*d3.event.pageX/3)+50)+"px");
//     }
//   })
//   .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
//
// var node = g.selectAll(".node")
//   .data(root.descendants())
//   .enter().append("g")
//     .attr("class", function(d) {
//       return "node" + (d.children ? " node--internal" : " node--leaf");
//     })
//       .attr("fill",function(d){
//         var result = color_function(d.id.substring(d.id.lastIndexOf(".") + 1));
//         return result;
//       })
//     .attr("transform", function(d) {
//       return "translate(" + d.y + "," + d.x + ")";
//       // return "translate(" + (W-d.y) + "," + d.x + ")";
//     })
//     .on("mouseover", function(d) {
//       var split_str = d.id.split(".");
//       if (split_str[ split_str.length - 2 ]) {
//         var donor = d.id.substring(d.id.lastIndexOf(".") + 1);
//         var recipient = split_str[ split_str.length - 2 ];
//         tooltip.html(`
//           <div><span class="bold">Donor</span>: ${donor}</div>
//           <div><span class="bold">Recipient</span>: ${recipient}</div>
//           <div><span class="bold">Amount</span>: $${formatthousands(d.data.value)}</div>
//         `);
//       } else {
//         var donor = d.id.substring(d.id.lastIndexOf(".") + 1);
//         tooltip.html(`
//           <div><span class="bold">Candidate</span>: ${donor}</div>
//           <div><span class="bold">Amount</span>: $${formatthousands(d.data.value)}</div>
//         `);
//       }
//       tooltip.style("visibility", "visible");
//   })
//   .on("mousemove", function() {
//     if (screen.width <= 480) {
//       return tooltip
//         .style("top",(d3.event.pageY+40)+"px")//(d3.event.pageY+40)+"px")
//         .style("left",10+"px");
//     } else {
//       return tooltip
//         .style("top", (d3.event.pageY+20)+"px")
//         .style("left",((2*d3.event.pageX/3)+50)+"px");
//     }
//   })
//   .on("mouseout", function(){return tooltip.style("visibility", "hidden");});
//
// // show tooltip
// var tooltip = d3.select("#node-graph")
//     .append("div")
//     .attr("class","tooltip")
//     .style("position", "absolute")
//     .style("z-index", "10")
//     .style("visibility", "hidden")
//
// node.append("circle")
//     .attr("r", function(d){
//         return (linewidth(d.data.value)/2);
//     });
//
// if (screen.width <= 480) {
//   node.append("text")
//       // how far the text is spaced from the nodes vertically
//       .attr("dy", function(d) {
//         return 18;
//       })
//       .attr("x", function(d) {
//         var res = d.children ? horiz_spacing.left : horiz_spacing.right;
//         return res;
//       })
//       .style("text-anchor", function(d) {
//         return d.children ? "end" : "start";
//       })
//       .text(function(d) {
//         var text_str = d.id.substring(d.id.lastIndexOf(".") + 1);
//         return text_str;
//       })
// } else if (screen.width <= 568 && screen.width > 480) {
//   node.append("text")
//       // how far the text is spaced from the nodes vertically
//       .attr("dy", function(d) {
//         return 25;
//       })
//       .attr("x", function(d) {
//         var res = d.children ? horiz_spacing.left : horiz_spacing.right;
//         return res;
//       })
//       .style("text-anchor", function(d) {
//         return d.children ? "end" : "start";
//       })
//       .text(function(d) {
//         var text_str = d.id.substring(d.id.lastIndexOf(".") + 1);
//         return text_str;
//       })
// } else {
//   node.append("text")
//       // how far the text is spaced from the nodes vertically
//       .attr("dy", function(d) {
//         return 20;
//       })
//       .attr("x", function(d) {
//         // how far the text is spaced from the nodes horizonally
//         return d.children ? horiz_spacing.left : horiz_spacing.right;
//       })
//       .style("text-anchor", function(d) {
//         return d.children ? "end" : "start";
//       })
//       .text(function(d) {
//         var text_str = d.id.substring(d.id.lastIndexOf(".") + 1);
//         return text_str;
//       })
// }
