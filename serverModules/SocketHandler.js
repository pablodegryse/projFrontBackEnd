let SocketHandler=(function () {
    let server,io,nsp,globalNameSpace;
    let usersToMigrate=[];  //queue om sockets te matchen in een game van 4
    let activeRooms=[];     //alle rooms die actief aan het spelen zijn (zolang er ng 2 users zijn in de room en spel niet ten einde is)
    let pendingRooms=[];    //alle rooms die nog niet beginnen spelen zijn en waar er nog plaats is
    let names={
        "namespaces":{
            "global":"/global"
        },
        "rooms":{
            "lobby":"mainLobby",
            "q":"queue"
        }
    };

    let init=function (server) {
        io=require("socket.io")(server);
        setupGlobalNamespace();
    };

    /*let setupNameSpace=function(){
        //TODO: maaak lobby namespace die users in groepen van 4 verdeelt en in een nieuwe namespace steekn , waar ze dan het spel kunnen spelen
        nsp =io.of('/canvasDrawing');
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
    };*/

    //iedereen zit altijd in de globale namespace
    let setupGlobalNamespace=function () {
        globalNameSpace=io.of(names.namespaces.global);
        globalNameSpace.on('connection',function (socket) {
            //als er iemand joint in de namespace : zeg welkom !
            console.log("Someone joined the global namespace!");
            socket.emit('welcome',{
                'content':'Welcome to the global namespace!'
            });
            //als er iemand de namespace verlaat: alles groups van de socket worden autmatisch geleaved
            //+ verwijder de socket uit de queue
            socket.on('disconnect',function () {
                console.log(socket.id+" left the global namespace");
                removeUserFromQueue(socket.id);
            });

            //als er vanuit de client naar de lobby genavigeerd werd: migreer de socket
            socket.on('requestMoveToLobby',function () {
                if(socket.rooms[names.rooms.q]!=null){
                    socket.leave(names.rooms.q);
                    globalNameSpace.emit("info","You left the queue room");
                    let index=usersToMigrate.indexOf(usersToMigrate[socket.id]);
                    usersToMigrate.splice(index);
                }
                removeUserFromGameRoom(socket);
                socket.join(names.rooms.lobby);
                globalNameSpace.to("mainLobby").emit("welcome",{"content":"Someone joined the lobby group"})
            });

            //als er vanuit de client naar de queue genavigeerd werd: migreer de socket
            // en steek hem in de usersToMigrate array !!!
            socket.on('requestMoveToQueue',function () {
                if(socket.rooms[names.rooms.lobby]!=null){
                    socket.leave(names.rooms.lobby);
                    globalNameSpace.to("mainLobby").emit("info","why are you still seeing this when you left the lobby ? dafuq");
                    globalNameSpace.emit("info","You left the lobby room");
                }
                socket.join(names.rooms.q);
                globalNameSpace.to("queue").emit("welcome",{"content":"Someone joined the queue group"})
                usersToMigrate.push(socket);
                checkQueue(migrateCallback);
            });

        });
    };

    //als er iemand disconnect : kijk of ze in de q zaten en verwijder ze eventueel
    let removeUserFromQueue=function (id) {
        for(let i=0,len=usersToMigrate.length;i<len;i++){
            if(usersToMigrate[i].id==id){
                usersToMigrate.splice(i);
            }
        }
    };

    //telkens er iemand de q room joined : kijk of we genoeg spelers in de queue hebben om een game te maken
    let checkQueue=function(cb){
        console.log("queue length: "+usersToMigrate.length);
        if(usersToMigrate.length===4){
            cb(true,migrateResultCallback);
        }else {
            cb(false,migrateResultCallback);
        }
    };

    //als er genoeg spelers zijn : migreer ze naar een room onder naam van de oudste socket in de queue
    let migrateCallback=function (check,cb) {
        if(check){
            let roomName;
            for(let i=0;i<4;i++){
                let currentSocket=usersToMigrate[i];
                //eerste user moet kamer niet joinen: zit er default al in
                if(i===0){
                    roomName=currentSocket.id;
                }else {
                    currentSocket.join(roomName);
                    currentSocket.leave(names.rooms.q);
                }
            }
            cb("Game ready! ",roomName);
        }else {
            cb("Not enough users to make game yet...",null);
        }
    };

    //als de sockets gemigreerd zijn: stuur een notificatie naar de clients dat ze in een game zijn
    // --> de game kan nu beginnen...
    let migrateResultCallback=function (msg,roomName) {
        if(roomName!=null){
            globalNameSpace.to(roomName).emit("GameReady",{"content":"guesser"});
            globalNameSpace.to(roomName).emit("info",msg+"Welcome to room: "+roomName);
            usersToMigrate.splice(0,4);
            activeRooms.push(roomName);
            console.log("queue length after splice: "+usersToMigrate.length);
        }
    };

    //a socket is max in 2 rooms at same time : own room and queue or own room and game room (under someone else's socket id)
    let removeUserFromGameRoom=function(socket){
        let numberOfRooms=Object.keys(socket.rooms).length;
        if(numberOfRooms>=2){
            console.log("The socket was in this many other rooms:"+numberOfRooms);
            for(let i=0,len=activeRooms.length;i<len;i++){
                let currentId=activeRooms[i];
                if(socket.rooms[currentId]!=null && socket.id!==currentId){
                    socket.leave(currentId);
                    console.log("this socket:"+socket.id+" left the room: "+currentId);
                    if(io.nsps[names.namespaces.global].adapter.rooms[currentId].length==1){
                        globalNameSpace.to(currentId).emit("GameEnd",{"content":"tooFewUsers"});
                        console.log("game abandoned");
                    }
                    break;
                }
            }
        }
    };


    //public
    return{
        init:init
    };

})();
module.exports=SocketHandler;
