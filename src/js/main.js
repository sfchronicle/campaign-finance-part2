//require("./lib/social"); //Do not delete
var d3 = require('d3');
var Sankey = require('./lib/d3.chart.sankey');

if (screen.width > 480) {
  var node_width = 20;
  var node_padding = 20;
  var iter_num = 0;
} else {
  var node_width = 10;
  var node_padding = 20;
  var iter_num = 5;
}

// -----------------------------------------------------------------------------
// reload page if the reader re-orients their device ---------------------------
// -----------------------------------------------------------------------------

window.addEventListener("orientationchange", function() {
  window.location.reload();
}, false);

// -----------------------------------------------------------------------------
// build Sankey graph ---------------------------
// -----------------------------------------------------------------------------

function label(node) {
  if (screen.width > 480) {
    return node.name+" ("+Math.round(node.value/1000)+" K)";
  } else {
    if (node.name == "Protect SF, A Committee Supporting Safai For Supervisor") {
      return "Protect SF";
    } else if (node.name == "Committee To Expand The Middle Class (Airbnb)") {
      return "Airbnb";
    } else {
      return node.name;
    }
  }
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


var colors = {

      'progresssf': '#6C85A5',
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

  graph.links.push({ "source": d.source,
                     "target": d.target,
                     "value": +d.value });
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
  .nodeWidth(node_width)
  .nodePadding(node_padding)
  .spread(true)
  .iterations(iter_num)
  .draw(graph);
