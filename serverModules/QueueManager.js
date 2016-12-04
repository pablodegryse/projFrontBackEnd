//manages the queue : adding removing and migrating
let QueueManager=(function () {
    let migrationBatchSize,globalNameSpace,roomManager,names;
    let queue=[];

    let init=function(globalNS,migrateGroupSize,rManager,nameObj) {
        migrationBatchSize=migrateGroupSize;
        globalNameSpace=globalNS;
        roomManager=rManager;
        names=nameObj;
    };

    let addUserToQueue=function (socket) {
        if(socket.rooms[names.rooms.lobby]!=null){
            socket.leave(names.rooms.lobby);
            globalNameSpace.emit("info","You left the lobby room");
        }
        socket.join(names.rooms.q);
        globalNameSpace.to("queue").emit("welcome",{"content":"Someone joined the queue group"});
        queue.push(socket);
    };

    //als er iemand disconnect : kijk of ze in de q zaten en verwijder ze eventueel
    let removeUserFromQueue=function (socket) {
        if(queue.length>0){
            for(let i=0,len=queue.length;i<len;i++){
                let qSocket=queue[i];
                if(qSocket.id==socket.id){
                    queue.splice(i);
                    break;
                }
            }
        }
    };

    //telkens er iemand de q room joined : kijk of we genoeg spelers in de queue hebben om een game te maken
    let checkQueue=function(cb){
        console.log("queue length: "+queue.length);
        if(queue.length===migrationBatchSize){
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
            for(let i=0;i<migrationBatchSize;i++){
                let currentSocket=queue[i];
                //eerste user moet kamer niet joinen: zit er default al in
                if(i===0){
                    roomName=currentSocket.id;
                    drawer={
                        "socket":currentSocket,
                        "points":0
                    }
                }else {
                    currentSocket.join(roomName);
                    guessers.push({"socket":currentSocket,"points":0})
                }
                currentSocket.leave(names.rooms.q);
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
            globalNameSpace.to(roomName).emit("info",msg+"Welcome to room: "+roomName);
            queue.splice(0,migrationBatchSize);
            let newGameRoom={
                "id":roomName,
                "drawer":drawer,
                "guessers":guessers
            };
            roomManager.addActiveRoom(newGameRoom);
            drawer.socket.emit("GameReady",{"content":"drawer"});
            for(let i=0;i<migrationBatchSize-1;i++){
                guessers[i].socket.emit("GameReady",{"content":"guesser"});
            }
            console.log("queue length after splice: "+queue.length);
        }
    };

    //public
    return{
        init:init,
        removeFromQueue:removeUserFromQueue,
        addToQueue:addUserToQueue,
        checkQueue:checkQueue,
        migrateCallback:migrateCallback
    };
})();
module.exports=QueueManager;