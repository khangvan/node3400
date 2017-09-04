// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTable(url, SharpWID) {
 var myList;
 console.log("go convert" + SharpWID);
 $.getJSON(url, function(data) {
  //if (status === 200) {
  //Do stuff with the JSON data
  console.log(url);
  myList = data;
  // Adds a header row to the table and returns the set of columns.
  // Need to do union of keys from all records as some records may not contain
  // all records
  function addAllColumnHeaders(myList) {
   var columnSet = [];
   var headerTr$ = $('<tr/>');
   var headerThead$ = $('</thead>');
   for (var i = 0; i < myList.length; i++) {
    var rowHash = myList[i];
    for (var key in rowHash) {
     if ($.inArray(key, columnSet) == -1) {
      columnSet.push(key);
      headerTr$.append($('<th/>').html(key));
     }
    }
   }

   $(SharpWID).append(headerTr$).append(headerThead$);
   //$(SharpWID).append(headerThead$);
   return columnSet;
  }


  var columns = addAllColumnHeaders(myList);
  alert("my list inside " + JSON.stringify(columns));
  alert("2" + columns);
  for (var i = 0; i < myList.length; i++) {
   var row$ = $('<tr/>');

   for (var colIndex = 0; colIndex < columns.length; colIndex++) {
    var cellValue = myList[i][columns[colIndex]];

    if (cellValue == null) {
     cellValue = "";
    }

    row$.append($('<td/>').html(cellValue));
   }
   $(SharpWID).append(row$);

  }

 });

}

function buildHtmlTableD3(urld3, SharpWID) {

 if ( $.fn.DataTable.isDataTable(SharpWID) ) {
  $(SharpWID).empty();
  console.log("It's exist datatable, need detroy it");
   $(SharpWID).DataTable().destroy();

$(SharpWID).empty();
console.log("empty");
 }




 //return;
 // ... skipped ...

 // $(SharpWID).dataTable({
 //       "autoWidth":false
 //     , "info":false
 //     , "JQueryUI":true
 //     , "ordering":true
 //     , "paging":false
 //     , "scrollY":"500px"
 //     , "scrollCollapse":true
 // });


console.log('now d3');



 d3.json(urld3, function(error, data) {

  var columnSet = [];
   // var headerTr$ = $('<tr/>');
   // var headerThead$ = $('</thead>');
   for (var i = 0; i < data.length; i++) {
    var rowHash = data[i];
    for (var key in rowHash) {
     if ($.inArray(key, columnSet) == -1) {
      columnSet.push(key);

     }
    }
   }
//console.log(columnSet);

console.log("d3 running w data", JSON.stringify(data));
  function tabulate(data, columns) {
   var table = d3.select(SharpWID)//.append('table')
   var thead = table.append('thead')
   var tfoot = table.append('tfoot')
   var tbody = table.append('tbody');

   // append the header row
   thead.append('tr')
    .selectAll('th')
    .data(columns).enter()
    .append('th')
    .text(function(column) {
     return column;
    });
    // append the foot row
    tfoot.append('tr')
     .selectAll('th')
     .data(columns).enter()
     .append('th')
     .text(function(column) {
      return column;
     });

   // create a row for each object in the data
   var rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr');

   // create a cell in each row for each column
   var cells = rows.selectAll('td')
    .data(function(row) {
     return columns.map(function(column) {
      return {
       column: column,
       value: row[column]
      };
     });
    })
    .enter()
    .append('td')
    .text(function(d) {
     return d.value;
    });

   return table;
  }
console.log(columnSet);
  // render the table(s)

  tabulate(data, columnSet);



  $(SharpWID).dataTable();








 });
}


function buildHtmlTableRAW(urld3, SharpWID) {

 alert ("start buildHtmlTableRAW");
 console.log('now d3');



  d3.json(urld3, function(error, data) {
 alert (JSON.stringify(data));
   var columnSet = [];
    // var headerTr$ = $('<tr/>');
    // var headerThead$ = $('</thead>');
    for (var i = 0; i < data.length; i++) {
     var rowHash = data[i];
     for (var key in rowHash) {
      if ($.inArray(key, columnSet) == -1) {
       columnSet.push(key);

      }
     }
    }
 console.log(columnSet);

 console.log("d3 running w data", JSON.stringify(data));
   function tabulate(data, columns) {
    var table = d3.select(SharpWID)//.append('table')
    var thead = table.append('thead')
    var tfoot = table.append('tfoot')
    var tbody = table.append('tbody');

    // append the header row
    thead.append('tr')
     .selectAll('th')
     .data(columns).enter()
     .append('th')
     .text(function(column) {
      return column;
     });
     // append the foot row
     tfoot.append('tr')
      .selectAll('th')
      .data(columns).enter()
      .append('th')
      .text(function(column) {
       return column;
      });

    // create a row for each object in the data
    var rows = tbody.selectAll('tr')
     .data(data)
     .enter()
     .append('tr');

    // create a cell in each row for each column
    var cells = rows.selectAll('td')
     .data(function(row) {
      return columns.map(function(column) {
       return {
        column: column,
        value: row[column]
       };
      });
     })
     .enter()
     .append('td')
     .text(function(d) {
      return d.value;
     });

    return table;
   }
 console.log(columnSet);
   // render the table(s)
   tabulate(data, columnSet);
   //$(SharpWID).DataTable();





  });
}



function buildDropDownList(urld3, SharpWID, getname) {

alert ("start buildDropDownList");
console.log('now d3 buildDropDownList');



 d3.json(urld3, function(error, data) {


alert (JSON.stringify(data));
for(var i=0; i< data.length; i++)
{
    $(SharpWID).append(
        $('<option>').text(data[i].ProductModel).val(data[i].ProductModel)
    );
}

return;
$.each(data, function (index, item) {
         $(SharpWID).append(
              $('<option></option>').val(item).html(item)
          );
     });
     return;

  var columnSet = [];
   // var headerTr$ = $('<tr/>');
   // var headerThead$ = $('</thead>');
   for (var i = 0; i < data.length; i++) {
    var rowHash = data[i];
    for (var key in rowHash) {
     if ($.inArray(key, columnSet) == -1) {
      columnSet.push(key);

     }
    }
   }
console.log(columnSet);

console.log("d3 running w data", JSON.stringify(data));
  function tabulate(data, columns) {
   var table = d3.select(SharpWID)//.append('table')
   var thead = table.append('thead')
   var tfoot = table.append('tfoot')
   var tbody = table.append('tbody');

   // append the header row
   thead.append('tr')
    .selectAll('th')
    .data(columns).enter()
    .append('th')
    .text(function(column) {
     return column;
    });
    // append the foot row
    tfoot.append('tr')
     .selectAll('th')
     .data(columns).enter()
     .append('th')
     .text(function(column) {
      return column;
     });

   // create a row for each object in the data
   var rows = tbody.selectAll('tr')
    .data(data)
    .enter()
    .append('tr');

   // create a cell in each row for each column
   var cells = rows.selectAll('td')
    .data(function(row) {
     return columns.map(function(column) {
      return {
       column: column,
       value: row[column]
      };
     });
    })
    .enter()
    .append('td')
    .text(function(d) {
     return d.value;
    });

   return table;
  }
console.log(columnSet);
  // render the table(s)
  tabulate(data, columnSet);
  //$(SharpWID).DataTable();





 });
}
