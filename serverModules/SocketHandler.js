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
                removeHostRoom(socket);
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

            //game events hier opvangen -> serversde controle doen + doorsturen naar de juiste room en sockets
            socket.on('drawBegin',function () {
                resolveGameAction(socket,canvasActionCallBack,"drawBegin",null);
            });

            socket.on('drawEnd',function () {
                resolveGameAction(socket,canvasActionCallBack,"drawEnd",null);
            });

            socket.on('drawUpdate',function (msgObj) {
                resolveGameAction(socket,canvasActionCallBack,"drawUpdate",msgObj);
            });

            socket.on('changedColor',function (newColor) {
                resolveGameAction(socket,canvasActionCallBack,"changedColor",newColor);
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
            let roomName,drawer;
            let guessers=[];
            for(let i=0;i<4;i++){
                let currentSocket=usersToMigrate[i];
                //eerste user moet kamer niet joinen: zit er default al in
                if(i===0){
                    roomName=currentSocket.id;
                    drawer={
                        "socket":currentSocket,
                        "points":0
                    }
                }else {
                    currentSocket.join(roomName);
                    currentSocket.leave(names.rooms.q);
                    guessers.push({"socket":currentSocket,"points":0})
                }
            }
            cb("Game ready! ",roomName,drawer,guessers);
        }else {
            cb("Not enough users to make game yet...",null,null);
        }
    };

    //als de sockets gemigreerd zijn: stuur een notificatie naar de clients dat ze in een game zijn
    // --> de game kan nu beginnen...
    //---> sla de nieuwe room op in een lijst (met id , de id van de drawer en alle sockets in de room)
    let migrateResultCallback=function (msg,roomName,drawer,guessers) {
        if(roomName!=null){
            globalNameSpace.to(roomName).emit("GameReady",{"content":"guesser"});
            globalNameSpace.to(roomName).emit("info",msg+"Welcome to room: "+roomName);
            usersToMigrate.splice(0,4);
            let newGameRoom={
                "id":roomName,
                "drawer":drawer,
                "guessers":guessers
            };
            activeRooms.push(newGameRoom);
            drawer.socket.emit("RoleInit","drawer");
            for(let i=0;i<3;i++){
                guessers[i].socket.emit("RoleInit","guesser");
            }
            console.log("queue length after splice: "+usersToMigrate.length);
        }
    };

    //a socket is max in 2 rooms at same time : own room and queue or own room and game room (under someone else's socket id)
    let removeUserFromGameRoom=function(socket){
        //let numberOfRooms=Object.keys(socket.rooms).length;
        for(let i=0,len=activeRooms.length;i<len;i++){
            let currentId=activeRooms[i].id;
            if(socket.rooms[currentId]!=null){
                if(socket.id!==currentId){
                    socket.leave(currentId);
                    console.log("this socket:"+socket.id+" left the room: "+currentId);
                }
                checkRoomState(currentId,i);
                break;
            }
        }
    };

    //on disconnect : if the socket was a host of an active game room :
    // disbandon the game in that room and remove it from the active list
    let removeHostRoom=function (socket) {
        for(let i=0,len=activeRooms.length;i<len;i++){
            let currentId=activeRooms[i].id;
            if(socket.id==currentId){
                globalNameSpace.to(currentId).emit("GameEnd",{"content":"tooFewUsers"});
                activeRooms.splice(i);
                console.log("Host left; game abandoned and removed from active list");
                break;
            }
        }
    };

    //de gameroom van een socket vinden die een event afvuurt
    let resolveGameAction=function (socket,callback,action,content) {
        for(let i=0,len=activeRooms.length;i<len;i++){
            let currentId=activeRooms[i].id;
            if(socket.rooms[currentId]!=null){
                if(activeRooms[i].drawer.socket.id===socket.id){
                    callback(activeRooms[i],action,content);
                }
                break;
            }
        }
    };

    let canvasActionCallBack=function (room,action,actionContent) {
        room.drawer.socket.broadcast.to(room.id).emit(action,actionContent);
    };

    //kijken of er nog genoeg spelers zijn om de room in de 'active' lijst te houden
    let checkRoomState=function (roomId,activeRoomListIndex){
        if(io.nsps[names.namespaces.global].adapter.rooms[roomId].length==1){
            globalNameSpace.to(roomId).emit("GameEnd",{"content":"tooFewUsers"});
            activeRooms.splice(activeRoomListIndex);
            console.log("game abandoned and removed from active list");
        }
    };


    //public
    return{
        init:init
    };

})();
module.exports=SocketHandler;
