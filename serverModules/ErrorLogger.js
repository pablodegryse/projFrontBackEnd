let ErrorLogger=(function () {
    let fs=require('fs'),errorFileName="./serverSources/serverErrors.log";
    let log=function (err) {
        let writeBuffer=new Buffer("\n"+new Date().toLocaleString()+"  |  "+err);
        fs.open(errorFileName,'a',function (err,fd) {
            if(err){

            }else {
                fs.write(fd,writeBuffer,0,writeBuffer.length,null,function (err) {
                    if(err){
                        console.log("Couldn't write to log file");
                    }
                    fs.close(fd,function () {
                        console.log("Error logged succesfully");
                    })
                })
            }
        })
    };

    //public
    return{
        log:log
    }

})();
module.exports=ErrorLogger;
