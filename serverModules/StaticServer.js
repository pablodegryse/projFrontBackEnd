let StaticServer=(function () {
    let port,app,server;
    let express = require("express"),path=require("path"),SocketHandler=require("./SocketHandler")
        ,errorLogger,ApiHandler=require("./ApiHandler"),
        mongoose = require('mongoose');

    let appRoutes = require('../routes/app'),
        userRoutes = require('../routes/user');

    let init=function (myPort,errlogger) {
        errorLogger=errlogger;
        port=myPort;
        app=express();
        mongoose.connect('localhost:27017/pictionar-e');
        setupHttpServer();
        setupExpress();
        SocketHandler.init(server);
    };

    let setupExpress =function () {
        app.use(express.static(path.join(__dirname,'..','client')));
        app.get('/index.html',function (req,res) {
            console.log(req.url);
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

        app.use('/user', userRoutes);
        app.use('/', appRoutes);

        app.get('/client/js/*',function (req,res) {
            console.log(req.url);
            res.sendFile(path.join(__dirname,'..','client','js',req.url));
        });
        app.get('/client/css/*',function (req,res) {
            console.log(req.url);
            res.sendFile(path.join(__dirname,'..','client','css',req.url));
        });

        app.get('/getApiData',function (req,res) {
            ApiHandler.getData(function (err,data) {
                if(!err){
                    res.setHeader('Content-Type', 'application/json');
                    res.send(JSON.stringify(data));
                }else {
                    errorLogger.log(err);
                }
            })
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
