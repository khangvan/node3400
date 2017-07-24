


var myList=[{"name" : "abc", "age" : 50},
            {"name" : "25", "age" : 20},
            {"name" : "xyz", "hobby" : "programming"},
            {"name" : "khang", "hobby" : "programming", age:40},
            {"name" : "myteam", "hobby" : "process enginering", age:25}
            ];

// Builds the HTML Table out of myList json data from Ivy restful service.
 function buildHtmlTable() {
     var columns = addAllColumnHeaders(myList);

     for (var i = 0 ; i < myList.length ; i++) {
         var row$ = $('<tr/>');
         for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
             var cellValue = myList[i][columns[colIndex]];

             if (cellValue == null) { cellValue = ""; }

             row$.append($('<td/>').html(cellValue));
         }
         $("#excelDataTable1").append(row$);
     }
 }

 // Adds a header row to the table and returns the set of columns.
 // Need to do union of keys from all records as some records may not contain
 // all records
 function addAllColumnHeaders(myList)
 {
     var columnSet = [];
     var headerTr$ = $('<tr/>');

     for (var i = 0 ; i < myList.length ; i++) {
         var rowHash = myList[i];
         for (var key in rowHash) {
             if ($.inArray(key, columnSet) == -1){
                 columnSet.push(key);
                 headerTr$.append($('<th/>').html(key));
             }
         }
     }
     $("#excelDataTable1").append(headerTr$);

     return columnSet;
 }
