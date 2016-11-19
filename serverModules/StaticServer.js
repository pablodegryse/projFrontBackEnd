let StaticServer=(function () {
    let port,app,server;
    let express = require("express"),path=require("path"),SocketHandler=require("./SocketHandler"),errorLogger;

    let init=function (myPort,errlogger) {
        errorLogger=errlogger;
        port=myPort;
        app=express();
        setupHttpServer();
        setupExpress();
        SocketHandler.init(server);
    };

    let setupExpress =function () {
        //TODO: router middelware hier gebruiken om de requests goed af te handelen ipv hier ze allemaal te stacken
        app.use(express.static(path.join(__dirname,'..','client')));
        app.get('/index.html',function (req,res) {
            res.sendFile(path.join(__dirname,'..','client','views','index.html'),function (err) {
                if(err){
                    errorLogger.log(err);
                }
            });
        });
        app.get('/',function (req,res) {
            res.sendFile(path.join(__dirname,'..','client','views','index.html'),function (err) {
                if(err){
                    errorLogger.log(err);
                }
            });
        });
        app.get('/client/js/*',function (req,res) {
            console.log(req.url);
            res.sendFile(path.join(__dirname,'..','client','js',req.url));
        });
        app.get('/client/css/*',function (req,res) {
            console.log(req.url);
            res.sendFile(path.join(__dirname,'..','client','css',req.url));
        });
        //als een request niet voldoet aan een van de bovenste , toon dan een 404 pagina
        app.get('*',function (req,res) {
            res.sendFile(path.join(__dirname,'..','client','views','error.html'))
        });
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
