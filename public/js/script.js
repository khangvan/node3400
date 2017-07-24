var data = {"name":"here show mean js working"};

var srvrunon = 'localhost';
var srvpointo = 'localhostz';
var url = `http://${srvrunon}/sql/${srvpointo}/`;


function logSerial()
{
    // Thuộc tính
    this.serial = '';
    this.po = '';
this.line = '';
this.opcode = '';
     
    // Phương thức
    this.setInfo = function(serial, po, line, opcode){
 // Thuộc tính
     this.serial = serial;
     this.po = po;
 this.line = line;
 this.opcode = opcode;
    };
     
    this.log = function(){
       // do something here

        return "ok";
    }
}
