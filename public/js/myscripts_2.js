$(document).ready(function() {
	
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
        
               $.getJSON("http://vnmacsrpt2:5000/sumhour", function(mps) {
            $("#output").pivotUI(mps, {
           	 cols: ["Event_date", "Shift", "Event_Hour"],
    rows: [ "Linename", "ProdOrder", "SAP_model", "TGHOUR","ManPower"],
    vals: ["AssemblyQty"], 
    aggregatorName: "Integer Sum",
    rendererName: "Heatmap"
    
             
            });
        });
        
        
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
	
	
	    $('#example').DataTable({
	    	    dom: 'Bfrtip',
        buttons: [
            {
                extend: 'copyHtml5',
                exportOptions: {
                 columns: ':contains("Office")'
                }
            },
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],
	        "processing" : true,
	        "ajax" : {
	        	
	            "url" : "http://vnmltme-vkhang:5000",
	            "type": "get",
	            "datatype": "json",
	            dataSrc : ''
	       },  
	        
	        "columns" : [ {
	            "data" : "Material"},
	            {"data" : "Description"},
	            {"data" : "L"},
	           {"data" : "W"},
	           {"data" : "H"}
	        ]
	    });
	    

*/
    
});