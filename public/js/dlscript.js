$(document).ready(function() {

console.log("do load jsonresponse");

console.log("done load jsonresponse");
	jsFunction(1);
	/*
			var request = $.ajax({
			  url: "https://api.myjson.com/bins/14t4g", //"http://vnmltme-vkhang:5000",
			  type: "get", // if post then fail then work as post when change on server
			  dataType: "json",
			  success: function(data){

				alert('sample data here '+JSON.stringify(data));
				}
				});

				var request1 = $.ajax({
			  url: "http://vnmltme-vkhang:5000",
			  type: "get", // if post then fail then work as post when change on server
			  dataType: "json",
			  success: function(data){

				alert('request1 khang data here '+JSON.stringify(data));


				}
				});
				*/
				/*
	//alert('now start d3');

	var url ="http://vnmltme-vkhang:5000"

	d3.json(url, function (error,data) {
  function tabulate(data, columns) {
	 var table = d3.select("#d3tb").append("table")
	//var table = d3.select('body').append('table')
		var thead = table.append('thead')
		var	tbody = table.append('tbody');

		// append the header row
		thead.append('tr')
		  .selectAll('th')
		  .data(columns).enter()
		  .append('th')
			.text(function (column) { return column; });

		// create a row for each object in the data
		var rows = tbody.selectAll('tr')
		  .data(data)
		  .enter()
		  .append('tr');

		// create a cell in each row for each column
		var cells = rows.selectAll('td')
		  .data(function (row) {
			return columns.map(function (column) {
			  return {column: column, value: row[column]};
			});
		  })
		  .enter()
		  .append('td')
			.text(function (d) { return d.value; });
			 return table;


	}

	// render the table(s)
tabulate(data, ['Material','Description', 'L','W','H']); // 2 column table


});

console.log('done render, then dynatable');

return;
*/

/*
		var request1 = $.ajax({
			  url: "http://vnmltme-vkhang:5000/html",
			  type: "get", // if post then fail then work as post when change on server
			  dataType: "json",
				success: function(jsonA){

					//alert('request1 khang data here '+JSON.stringify(json1));
					//console.log(JSON.stringify(json1))  	;
					var jsonB=jsonA[0];
					//alert(JSON.stringify(dlist1)); // bo 1 square bracket
					var json=jsonB[0];
					//alert(JSON.stringify(json));// bo 2 square bracket
					for(var key in json){
						 var keyjson = json[key];
					  //   alert('Khang-inside->'+JSON.stringify(keyjson))// ok
						 $("#tableDiv").append((keyjson));

					}
					 $('#tableDiv').dynatable();
				}
		});
	  */
	  // done

 /* goood sample for pivotable
		$.getJSON("http://nicolas.kruchten.com/pivottable/examples/mps.json", function(mps) {
			$("#output").pivotUI(mps, {
				 rows: ["Province"],
	cols: [ "Party"],
	vals: ["Age"],
	aggregatorName: "Sum",
	rendererName: "Heatmap"


			});
		});

		*/

	//var e = document.getElementById("ddlViewBy");
	//var strUser = e.options[e.selectedIndex].value;


		/*
$.getJSON("http://vnmacsrpt2:5000/pmstodaysum", function(mps) {
			$("#outputdetail").pivotUI(mps, {
			cols: [],
	rows: ["Linename","refPOCnt","|---------|- isOK410","UsingTime","%UsingTime","ProductionHistory","refSum", "Judgment" ],
	vals:[],

	aggregatorName: "Integer Sum",
	rendererName: "Heatmap"


			});
		});

		*/
	  //--
	  /*
	  $(function(){
		var derivers = $.pivotUtilities.derivers;

		$.getJSON("mps.json", function(mps) {
			$("#output").pivotUI(mps, {
				derivedAttributes: {
					"Age Bin": derivers.bin("Age", 10),
					"Gender Imbalance": function(mp) {
						return mp["Gender"] == "Male" ? 1 : -1;
					}
				}
			});
		});
	 });

$("#output").pivotUI(
  $.pivotUtilities.tipsData, {
	rows: ["sex"],
	cols: ["smoker"],
	vals: ["tip", "total_bill"],
	aggregatorName: "Sum over Sum",
	rendererName: "Bar Chart",
	renderers: $.extend(
		$.pivotUtilities.renderers,
	  $.pivotUtilities.c3_renderers
	)
  });
	*/

   /*
	alert('now start');



		var request1 = $.ajax({
			  url: "http://vnmltme-vkhang:5000/html",
			  type: "get", // if post then fail then work as post when change on server
			  dataType: "json",
				  success: function(jsonA){

						//alert('request1 khang data here '+JSON.stringify(json1));
//console.log(JSON.stringify(json1))  	;
var jsonB=jsonA[0];
//alert(JSON.stringify(dlist1)); // bo 1 square bracket
var json=jsonB[0];
alert(JSON.stringify(json));// bo 2 square bracket



for(var key in json){
	 var keyjson = json[key];
	 alert('Khang-inside->'+JSON.stringify(keyjson))// ok

	 $("#tableDiv").append((keyjson));
		$('#tableDiv').dynatable();
   }


				}
		});




//endup


*/

});




function jsFunction(value) {
	//alert(value);
	//refresh();
	var dateFormat = $.pivotUtilities.derivers.dateFormat;
	var sortAs = $.pivotUtilities.sortAs;
	var tpl = $.pivotUtilities.aggregatorTemplates;


	var type = value;
	if (type==0) type =1;

 	if (type ==1)
 	{



 		$.getJSON("/sumhour", function (mps) {
 			$("#output").pivotUI(mps, {

 				cols: ["Event_date", "Shift", "Event_Hour"],
 				rows: ["Linename", "ProdOrder", "SAP_model", "TGHOUR"],
 			    //"TGSHIFT", "ManPower","UnitCycleMin"
 				vals: ["AssemblyQty"],
 				aggregatorName: "Integer Sum",
 				rendererName: "Heatmap"
 				,
 				renderers: $.extend(
 						$.pivotUtilities.renderers,
 						$.pivotUtilities.c3_renderers,
 						$.pivotUtilities.export_renderers
 						),



 				rendererOptions: {
 					heatmap: {
 						colorScaleGenerator: function (values) {
 							return d3.scale.linear()
 								.domain([0 ,90,  95])
 								.range(["#F77", "#F77", "#77F"])

 						}
 					}
 				}




 			}
 			);

 		});
 	}
//
// 	if (type ==1)
// 	{
//
//
// let  url =`http://hunsmt-leonardo:5000/sql/leonardo/exec PMS.dbo.[ame_Report_client]`;
// 		$.getJSON(url, function (mps) {
//
//
// 			$("#output").pivotUI(mps, {
// 				cols: ["EventDate",  "EventHour"],
// 				rows: ["Machine" , "Recipe"],
// 			    //"TGSHIFT", "ManPower","UnitCycleMin"
// 				vals: ["lBoardNumber"],
// 				aggregatorName: "Count",
// 				rendererName: "Heatmap"
// 			,
// 				renderers: $.extend(
// 						$.pivotUtilities.renderers,
// 						$.pivotUtilities.c3_renderers,
// 						$.pivotUtilities.export_renderers
// 						)
//    //
//    //
//    //
// 			// 	,rendererOptions: {
// 			// 		heatmap: {
// 			// 			colorScaleGenerator: function (values) {
// 			// 				return d3.scale.linear()
// 			// 					.domain([0 ,90,  95])
// 			// 					.range(["#F77", "#F77", "#77F"])
//    //
// 			// 			}
// 			// 		}
// 			// 	}
//
//
//
//
//
// 			}
// 			);
//
// 		});
// 	}


	if (type == 7) { //y today



	    $.getJSON("http://vnmacsrpt2:5000/yield/today", function (mps) {
	        $("#output").pivotUI(mps, {

	            cols: ["Eventdate",  "Event_Hour"],
	            rows: ["Station", "Sap_Model"],
	            //"TGSHIFT", "ManPower","UnitCycleMin"
	            vals: ["TotalPasss"],
	            aggregatorName: "Integer Sum",
	            rendererName: "Heatmap"
				,
	            renderers: $.extend(
						$.pivotUtilities.renderers,
						$.pivotUtilities.c3_renderers,
						$.pivotUtilities.export_renderers
						),



	            rendererOptions: {
	                heatmap: {
	                    colorScaleGenerator: function (values) {
	                        return d3.scale.linear()
								.domain([0, 90, 95])
								.range(["#F77", "#FFF", "#77F"])

	                    }
	                }
	            }




	        }
			);

	    });
	}

	if (type == 8) { //y serial



	    $.getJSON("http://vnmacsrpt2:5000/yield/serial", function (mps) {
	        $("#output").pivotUI(mps, {

	            cols: ["Event_date", "Shift", "Event_Hour"],
	            rows: ["Linename", "ProdOrder", "SAP_model", "TGHOUR"],
	            //"TGSHIFT", "ManPower","UnitCycleMin"
	            vals: ["AssemblyQty"],
	            aggregatorName: "Integer Sum",
	            rendererName: "Heatmap"
				,
	            renderers: $.extend(
						$.pivotUtilities.renderers,
						$.pivotUtilities.c3_renderers,
						$.pivotUtilities.export_renderers
						),



	            rendererOptions: {
	                heatmap: {
	                    colorScaleGenerator: function (values) {
	                        return d3.scale.linear()
								.domain([0, 90, 95])
								.range(["#F77", "#F77", "#77F"])

	                    }
	                }
	            }




	        }
			);

	    });
	}


	if (type == 2) // change over time
	{
let  url =`http://hunsmt-leonardo:5000/sql/leonardo/exec PMS.dbo.reportChangeOver`;
		$.getJSON(url, function (mps) {
			$("#output").pivotUI(mps, {
				cols: ["dtTime"],
				rows: ["Machine","WhatChange"],
				vals: ["RunningTimeMin"],
				aggregatorName: "Integer Sum",
				rendererName: "Table"
			});
		});
	}
	if (type == 3) // history
	{

		//alert(value);
		$.getJSON("http://vnmacsrpt2:5000/pmstodaysum", function (mps) {
			$("#output").pivotUI(mps, {
				cols: ["Event_date", "Shift", "Event_Hour"],
				rows: ["Linename", "refPOCnt", "|---------|- isOK410", "UsingTime", "%UsingTime", "ProductionHistory", "refSum", "Judgment"],
				vals: [""],

				aggregatorName: "Integer Sum",
				rendererName: "Heatmap"


			});
		});
	}

	if (type == 4) // Capacity
	{

		//alert(value);
		$.getJSON("http://vnmacsrpt2:5000/jascapacity", function (mps) {
			$("#output").pivotUI(mps, {
				cols: ["Event_date", "Shift", "Event_Hour"],
				rows: ["Linename", "refPOCnt", "|---------|- isOK410", "UsingTime", "%UsingTime", "ProductionHistory", "refSum", "Judgment"],
				vals: [""],

				aggregatorName: "Integer Sum",
				rendererName: "Heatmap"


			});
		});
	}
	if (type == 5) {

		var dataClass = $.pivotUtilities.SubtotalPivotData;
		var derivers = $.pivotUtilities.derivers;
		var renderers = $.pivotUtilities.subtotal_renderers;

		$.getJSON("http://vnmacsrpt2:5000/sumhour", function (mps) {
			$("#output").pivotUI(mps, {
				dataClass: dataClass,
				cols: ["Event_date", "Shift", "Event_Hour"],
				rows: ["Linename", "ProdOrder", "SAP_model", "TGHOUR", "TGSHIFT", "ManPower", "UnitCycleMin"],
				vals: ["AssemblyQty"],
				aggregatorName: "Integer Sum",
				rendererName: "Heatmap"

				,
				renderers: renderers,
				derivedAttributes: {
					"AssemblyQty Bin": derivers.bin("AssemblyQty", 10)

				},
				rendererName: "Table With Subtotal",
				rendererOptions: {
					collapseRowsAt: 1,
					collapseColsAt: 1
				}


			}
			);

		});
	}



}


function loadJSON(callback) {

	var xhr = new XMLHttpRequest();
	xhr.open("GET", "js/dlconfig.json", true);
	xhr.onreadystatechange = function() {
	  if (xhr.readyState == 4) {
	    // JSON.parse does not evaluate the attacker's scripts.
	    var resp = JSON.parse(xhr.responseText);
	  }
	}
	xhr.send();



}
