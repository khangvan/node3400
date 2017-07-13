$(document).ready(function() {
	
		/*	
		    var request = $.ajax({
			  url: "http://vnmacsrpt2:5000/pmstoday", //"http://vnmltme-vkhang:5000",
			  type: "get", // if post then fail then work as post when change on server
			  dataType: "json",
			  success: function(data){
			  	
			  	alert('sample data here '+JSON.stringify(data));
	  			}
	  			});
	  	
	  			var request2 = $.ajax({
			  url: "http://vnmltme-vkhang:5000",
			  type: "get", // if post then fail then work as post when change on server
			  dataType: "json",
			  success: function(data){
			  	
			  	alert('khang data here '+JSON.stringify(data));
	  			}
	  			});
	  			*/
	
	
	
		
            
	
	
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
	        	
	            "url" : "http://vnmacsrpt2:5000/pmstodaysum",
	            "type": "get",
	            "datatype": "json",
	            dataSrc : ''
	       },  
	        
	        "columns" : [ 
	             

{"data":"Shift"},
{"data":"Linename"},
{"data":"refSum"},
{"data":"refModelCnt"},
{"data":"refPOCnt"},
{"data":"UsingTime"},
{"data":"%UsingTime"},
{"data":"|---------|- isOK410?"},
{"data":"Judgment"},
{"data":"ProductionHistory"}



	        ]
	    });
	    
	    
	    

 
    
});

$("viewdetail").click(function(){
    
    
	
	
	    // for detail
	    
	    $('#rpt-detail').DataTable({
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
	        	
	            "url" : "http://vnmacsrpt2:5000/pmstodaydetail",
	            "type": "get",
	            "datatype": "json",
	            dataSrc : ''
	       },  
	        
	        "columns" : [ 
	             

{"data":"Event_date"},
{"data":"Shift"},
{"data":"Linename"},
{"data":"ProdOrder"},
{"data":"SAP_model"},
{"data":"AssemblyQty"},
{"data":"RefStartDate"},
{"data":"RefEnddate"},
{"data":"RefTotalH"},
{"data":"[Fr-To]"},
{"data":"UnitCycleMin"},
{"data":"UsingTime"}



	        ]
	    });
});

