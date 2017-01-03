let StaticServer=(function () {
    let port,app,server, dbOptions, dbUri;
    let express = require("express"),path=require("path"),SocketHandler=require("./SocketHandler"),
        errorLogger,mongoose = require('mongoose'),bodyParser = require('body-parser'),rootRouter=require("../routes/RootRouter"),
        userRoutes = require('../routes/user'), roomRoutes = require('../routes/room'), appRoutes=require('../routes/app');

    let init=function (myPort,errlogger) {
        errorLogger=errlogger;
        port=myPort;
        app=express();
        dbOptions ={
          server:{
              socketOptions:{
                  auto_reconnect:true
              },
              reconnectTries: Number.MAX_VALUE,
          }
        };

        //DB uri --> comment/uncomment voor offline testing  -- dbUri = 'localhost:27017/pictionar-e';
        dbUri = 'mongodb://testUser:testuser@ds159387.mlab.com:59387/pictionar-e';
        mongoose.connect(dbUri,dbOptions);
        mongoose.connection.on("error",function (error) {
            console.log("connection error: " + error.message);
        });
        mongoose.connection.on('disconnected', function () {
            mongoose.connect(dbUri,dbOptions);
        });

        setupHttpServer();
        setupExpress();
        SocketHandler.init(server);
    };

    let setupExpress =function () {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended:false}));
        app.use(express.static(path.join(__dirname,'..','client')));
        app.use('/user', userRoutes);
        app.use('/room',roomRoutes);
        app.use(rootRouter);
        app.use('/', appRoutes);
    };
    let setupHttpServer=function () {
        server=require("http").Server(app);
        server.listen(port,function () {
            console.log("Server started at port: "+port);
        });
    };

    //public
    return{
        init:init,
        serverSocketHandler:SocketHandler
    };

})();
module.exports=StaticServer;
