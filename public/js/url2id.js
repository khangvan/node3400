// Builds the HTML Table out of myList json data from Ivy restful service.
function buildHtmlTable(url, SharpWID) {
    $(SharpWID).empty();
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
  // alert("my list inside " + JSON.stringify(columns));
  // alert("2" + columns);
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

var tabulate=(data, SharpWID)=> {
//   if ( $.fn.DataTable.isDataTable(SharpWID) ) {
//     $(SharpWID).empty();
//       console.log("It's exist datatable, need detroy it");
//     $(SharpWID).DataTable().destroy();
//     $(SharpWID).empty();
//     console.log("empty");
//   }
  // var Table = document.getElementById(SharpWID);
  // document.getElementById(SharpWID).innerHTML = "";
  $(SharpWID).empty();//ok


  let columns = [];
  columns =prepColName(data);
  
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
  //  tfoot.append('tr')
  //   .selectAll('th')
  //   .data(columns).enter()
  //   .append('th')
  //   .text(function(column) {
  //    return column;
  //   });

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
};
// get all header of first level of JSON
const prepColName=(data)=>{
  let columnSet = [];
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
  console.log('Header name ', columnSet);
  return columnSet;
} 

const buildHtmlTableD3=(urld3, SharpWID)=>{
  console.log('url> ',urld3);
  d3.json(urld3, function(error, data) {
    // let colname=[];
    // colname = prepColName(data);
    tabulate(data, SharpWID);
    $(SharpWID).dataTable();
  })
}
 
function fetchJSONFile(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                var data = JSON.parse(httpRequest.responseText);
                   console.log('ajax data: ',JSON.stringify(data));
                   // alert(JSON.stringify(data));
                   //alert("go ajax");
                if (callback) callback(data);
            }
        }
        };
        httpRequest.open('get', path);
        httpRequest.send(); 
    }
 
function buildHtmlTableRAWfromAjax(urld3, SharpWID) {
  console.log('Ajax Build HTML as raw '+ SharpWID+urld3 );
  $(SharpWID).empty();
  // var path2 = `/sql/vnmsrv601/exec [FFCPACKING]..amevn_TellmeAllPackingPO '${po}','box'`
  
         
         
      //  // this requests the file and executes a callback with the parsed result once
      //  //   it is available
      //  fetchJSONFile(path2, function(data){
      //      // do something with your data
      //      console.log(data);
      //      alert('ajax'+JSON.stringify(data));
      //  });

          fetchJSONFile(urld3, function(data){
           // do something with your data
           //console.log( 'from ajax ',data);
           //alert('ajax'+JSON.stringify(data));
            return JSON.stringify(data);
       });

}

function buildListAjax(urld3, SharpWID) {
    console.log('Ajax Build HTML as raw '+ SharpWID+urld3 );
    $(SharpWID).empty();

            fetchJSONFile(urld3, function(data){
                console.log(JSON.stringify(data));
                    var obj = data.query.results.entry,  // get entry object (array) from JSON data
                        ul = $("<ul>");                    // create a new ul element
                    // iterate over the array and build the list
                    for (var i = 0, l = obj.length; i < l; ++i) {
                        ul.append(`<li><img src="` + obj[i].link.href + `" alt="`+ obj[i].title.content +`"></li>`);
                    }
                    $(SharpWID).append(ul);    // add the list to the DOM
                  
              return JSON.stringify(data);
         });
  
  }


function buildHtmlTableRAW(urld3, SharpWID) {
  //  alert ("start buildHtmlTableRAW");
  console.log('Build HTML as raw BY d3 '+ SharpWID+urld3 );
  $(SharpWID).empty();


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
    // console.log(columnSet);
   // render the table(s)
   tabulate(data, columnSet);
   //$(SharpWID).DataTable();

  });
}


function buildDropDownListSimple(urld3, SharpWID) {
  
  let text = "text";
  let val = "val";
  
  // alert ("start Drop dowwn list ");
  // console.log('now d3 buildDropDownList');
    $.getJSON(urld3, function(json){
    $(SharpWID).empty();
    $(SharpWID).append($('<option>').text("Select"));
    $.each(json, function(i, obj){
            $(SharpWID).append($('<option>').text(obj.text).attr('value', obj.val));
    });
  })
}

function buildDropDownListSelect2(urld3, SharpWID, strHolder) {
  
  let text = "text";
  let val = "val"
  
  $.getJSON(urld3, function(json){
  $(SharpWID).empty();
  $(SharpWID).append($('<option>').text(strHolder));
  $.each(json, function(i, obj){
          $(SharpWID).append($('<option>').text(obj.text).attr('value', obj.val));
  });

  })
  $(SharpWID).select2({});
}

function buildDropDownList(urld3, SharpWID, getname) {

  // let text = "text";
  // let val = "val"

  alert ("start buildDropDownList");
  console.log('now d3 buildDropDownList');

  // $(SharpWID).empty();
  // $(SharpWID).append($('<option>').text("Select"));
  // $.each(json, function(i, obj){
  //         $(SharpWID).append($('<option>').text(obj.text).attr('value', obj.val));
  // });



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





 });}

function createTableView(url,SharpWID) {
  $.ajax({
        type: "GET",
        url: url, 
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: "{}",
        success: function(res) {
            $(SharpWID).append(CreateTableView(res,"CoolTableTheme",true)).fadeIn();
            }
        });
    };

    function createDetailView(url,SharpWID) {
      $.ajax({
            type: "GET",
            url: url, 
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: "{}",
            success: function(res) {
                $(SharpWID).append(CreateDetailView(res,"CoolTableTheme",true)).fadeIn();
                }
            });
        };


// This function creates a standard table with column/rows
// Parameter Information
// objArray = Anytype of object array, like JSON results
// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
// enableHeader (optional) = Controls if you want to hide/show, default is show
function CreateTableView(objArray, theme, enableHeader) {
  // set optional theme parameter
  if (theme === undefined) {
      theme = 'lightPro'; //default theme
  }

  if (enableHeader === undefined) {
      enableHeader = true; //default enable headers
  }

  // If the returned data is an object do nothing, else try to parse
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : new Array(objArray);
  var keys = Object.keys(array[0]);

  var str = '<table class="' + theme + '">';

  // table head
  if (enableHeader) {
      str += '<thead><tr>';
      for (var index in keys) {
          str += '<th scope="col">' + keys[index] + '</th>';
      }
      str += '</tr></thead>';
  }

  // table body
  str += '<tbody>';
  for (var i = 0; i < array.length; i++) {
      str += (i % 2 == 0) ? '<tr class="alt">' : '<tr>';
      for (var index in keys) {
          var objValue = array[i][keys[index]];

          // Support for Nested Tables
          if (typeof objValue === 'object' && objValue !== null) {
              if (Array.isArray(objValue)) {
                  str += '<td>';
                  for (var aindex in objValue) {
                      str += CreateTableView(objValue[aindex], theme, true);
                  }
                  str += '</td>';
              } else {
                  str += '<td>' + CreateTableView(objValue, theme, true) + '</td>';
              }
          } else {
              str += '<td>' + objValue + '</td>';
          }

      }
      str += '</tr>';
  }
  str += '</tbody>'
  str += '</table>';

  return str;
}

// This function creates a details view table with column 1 as the header and column 2 as the details
// Parameter Information
// objArray = Anytype of object array, like JSON results
// theme (optional) = A css class to add to the table (e.g. <table class="<theme>">
// enableHeader (optional) = Controls if you want to hide/show, default is show
function CreateDetailView(objArray, theme, enableHeader) {

  
  // set optional theme parameter
  if (theme === undefined) {
      theme = 'lightPro';  //default theme
  }

  if (enableHeader === undefined) {
      enableHeader = true; //default enable headers
  }

  // If the returned data is an object do nothing, else try to parse
  var array = typeof objArray != 'object' ? JSON.parse(objArray) : new Array(objArray);
  var keys = Object.keys(array[0]);

  var str = '<table class="' + theme + '">';
  str += '<tbody>';


  for (var i = 0; i < array.length; i++) {
      var row = 0;
      for (var index in keys) {
          var objValue = array[i][keys[index]]

          str += (row % 2 == 0) ? '<tr class="alt">' : '<tr>';

          if (enableHeader) {
              str += '<th scope="row">' + keys[index] + '</th>';
          }

          // Support for Nested Tables
          if (typeof objValue === 'object' && objValue !== null) {
              if (Array.isArray(objValue)) {
                  str += '<td>';
                  for (var aindex in objValue) {
                      str += CreateDetailView(objValue[aindex], theme, true);
                  }
                  str += '</td>';
              } else {
                  str += '<td>' + CreateDetailView(objValue, theme, true) + '</td>';
              }
          } else {
              str += '<td>' + objValue + '</td>';
          }

          str += '</tr>';
          row++;
      }
  }
  str += '</tbody>'
  str += '</table>';
  return str;
}