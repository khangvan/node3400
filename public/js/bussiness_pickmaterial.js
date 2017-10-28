function HandleTO(){
    this.checkcount = 3;
    this.activeList='';
    this.activeItem ='';
    this.myTo ="";
    this.checkTOexist= function(){
        alert(this.myTo);
        let url =`/sql/vnmsrv601/exec Pickpack.dbo.[pp010_amevn_LoadTO] '${this.myTo}','1'`; // set 1 for show all aLLow splite
        fetchJSONFile(url, function(data){
              console.log("fetchJSONFile data is: "  +JSON.stringify(data));
              this.activeList = data;
              console.log("this.activeListis: "  +JSON.stringify(data));
               return (data.length>0)?true:false;
              
          }); 
        
    }

    this.firstpullTOlist= function (){

        return activeList;
    }
    this.refreshpullTOlist= function(){
        
                return activeList;
            }
     this.checkMat= function(Mat){

    }

}