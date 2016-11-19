let StaticServer=(function () {
    let port,app,server;
    let express = require("express"),path = require("path"),SocketHandler=require("./SocketHandler"),errorLogger;

    let init=function (myPort,errlogger) {
        errorLogger=errlogger;
        port=myPort;
        app=express();
        setupHttpServer();
        setupExpress();
        SocketHandler.init(server);
    };

    let setupExpress =function () {
        app.get('/',function (req,res) {
            res.sendFile(path.join(__dirname,'..','client','views','index.html'),function (err) {
                if(err){
                    errorLogger.log(err);
                }
            });
        });
        app.use(express.static(path.join(__dirname,'..','client')));
    };
    let setupHttpServer=function () {
        server=require("http").Server(app);
        server.listen(port,function () {
            console.log("Server started at port: "+port);
        });
    };

    //public
    return{
      init:init
    };

})();
module.exports=StaticServer;
