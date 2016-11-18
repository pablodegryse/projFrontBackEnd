var express = require("express");
var path = require("path");
var port=8080;
var usersToMigrate=[];
var app=express();
var server=require("http").Server(app);
var io = require("socket.io")(server);

app.get('/',function (req,res) {
    res.sendFile(path.join(__dirname,'client','views','index.html'),function (err) {
        if(err){
            console.log("de error is ..... : "+err);
        }
    });
});

app.use(express.static(path.join(__dirname,'client')));
server.listen(port,function () {
    console.log("Server started at port: "+port);
});

//namespace setup
//TODO: maaak lobby namespace die users in groepen van 4 verdeelt en in een nieuwe namespace steekn , waar ze dan het spel kunnen spelen
var nsp =io.of('/canvasDrawing');
nsp.on('connection',function (socket) {
    console.log("new connection made");
    //algemene boodschap voor iedereen in de namespace
    var d = new Date();
    nsp.emit('serverWelcome',{
        'time':d.getHours()+':'+d.getMinutes(),
        'msg': socket.id+' joined the room!'
    });

    //als de client de eerste in de namespace is --> maak hem drawer en steek hem in de drawer room
    //zo niet : maak hem observer
    usersToMigrate.push(socket);
    if(usersToMigrate.length>1){
        console.log("derp");
        socket.join("observer");
        nsp.to("observer").emit("observerRoomMessage","You are an observer now");
        nsp.to("observer").emit("serverAllowDraw","false");
    }else {
        console.log("herp");
        socket.join("drawer");
        nsp.to("drawer").emit("drawerRoomMessage","You are the drawer now");
        nsp.to("drawer").emit("serverAllowDraw","true");
    }

    //events die de drawer kan sturen naar server
    //server stuurt dit dan door naar observers
    socket.on('drawBegin',function () {
        nsp.to("observer").emit("drawBegin");
    });

    socket.on('drawEnd',function () {
        nsp.to("observer").emit("drawEnd");
    });

    socket.on('drawUpdate',function (msgObj) {
        nsp.to("observer").emit("drawUpdate",msgObj);
    });

    socket.on('changedColor',function (newColor) {
        nsp.to("observer").emit("changedColor",newColor);
    });

    //als er iemand de namespace verlaat , maak de eerst volgende persoon de drawer
    //TODO: Fix wanneer iemand de room verlaat ==> observer word nu ook "drawer"
    socket.on('disconnect',function () {
        console.log(socket.id+" left :(");
        for(var i=0,len=usersToMigrate.length;i<len;i++){
            if(usersToMigrate[i].id=socket.id){
                usersToMigrate.slice(i);
                if(usersToMigrate.length>0){
                    usersToMigrate[1].leave("observer");
                    usersToMigrate[1].join("drawer");
                    nsp.to("drawer").emit("drawerRoomMessage","You are the drawer now");
                    nsp.to("drawer").emit("serverAllowDraw","true");
                }
                break;
            }
        }
    });

});