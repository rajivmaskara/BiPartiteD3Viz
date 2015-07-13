define(["jquery", "text!./bipartite.css","./d3.min","./bipartited3"], 
function($, cssContent) 
	{'use strict';
	$("<style>").html(cssContent).appendTo("head");
	return {
		initialProperties : {
			version: 1.0,
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 4,
					qHeight : 1000
				}]
			}
		},
		definition : {
			type : "items",
			component : "accordion",
			items : {
				dimensions : {
					uses : "dimensions",
					min : 2,
					max : 2
				},
				measures : {
					uses : "measures",
					min : 2,
					max : 2
				},
				sorting : {
					uses : "sorting"
				},
				settings : {
					uses : "settings"
					
				}
			}
		},
		snapshot : {
			canTakeSnapshot : true
		},
		paint : function($element,layout) 
		{
			// get qMatrix data array
			var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
			// create a new array that contains the measure labels
			var measureLabels = layout.qHyperCube.qMeasureInfo.map(function(d) {
			return d.qFallbackTitle;
			});
			
			var dimensionLabels = layout.qHyperCube.qDimensionInfo.map(function(d) {
			return d.qFallbackTitle;
			});
			
			// Create a new array for our extension with a row for each row in the qMatrix
			var data = qMatrix.map(function(d) {
			// for each element in the matrix, create a new object that has a property
			// for the grouping dimension, the first metric, and the second metric
			return {
				"Dim1":d[0].qText,
				"Dim2" :d[1].qText,
				"Metric1":d[2].qNum,
				"Metric2":d[3].qNum
				}
			});	
			
			// Chart object width
			var width = $element.width();
			// Chart object height
			var height = $element.height();
			// Chart object id
			var id = "container_" + layout.qInfo.qId;
 
			// Check to see if the chart element has already been created
			if (document.getElementById(id)) {
			// if it has been created, empty it's contents so we can redraw it
			$("#" + id).empty();
			}
			else {
			// if it hasn't been created, create it with the appropiate id and size
			$element.append($('<div />;').attr("id", id).width(width).height(height));
			}
 
			vizinbipartite(data,measureLabels,dimensionLabels,width,height,id);
			//console.log("MEASURELABLES:",measureLabels);
			//console.log("Element",$element);
			//console.log(layout);
			}
		};
	});

var vizinbipartite = function(data,labels,dimLabels,width,height,id) 
	{
	
	var margin = {top: 40, right: 10, bottom: 20, left: 150},
    width = width - margin.left - margin.right,
    height = height - margin.top - margin.bottom;
    //console.log("LABLES:",labels[0]);
    
	var svg = d3.select("#"+id)
		.append("svg")
		.attr('width',width)
		//.attr('height',(height+margin.bottom+margin.top))
		.attr('height',height)
		.append("g")
		.attr("transform","translate("+ margin.left+","+margin.top+")");
		//console.log("Data when called");
		//console.log(data);
var data1 = [ 
	{data:bP.partData(data,1), id:"Salestomorrow", header:[dimLabels[0],dimLabels[1], labels[0]]},
	{data:bP.partData1(data,2), id:"today", header:[dimLabels[0],dimLabels[1], labels[1]]}
];
//console.log("datainmain",data1);
//console.log("datainmainagain",data1[0].header[2]);
bP.draw(data1, svg); 
};
