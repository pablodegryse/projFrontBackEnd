let SocketHandler=(function () {
    let qManager=require("./QueueManager");
    let rManager=require("./RoomManager");
    let gameManager=require("./GameManager");
    let apiHandler=require("./ApiHandler");
    let io,globalNameSpace;
    let names={
        "namespaces":{
            "global":"/global"
        },
        "rooms":{
            "lobby":"mainLobby",
            "q":"queue"
        },"removeTypes":{"forced":"forced","nav":"navigated"}
    };

    let init=function (server) {
        io=require("socket.io")(server);
        setupGlobalNamespace();
        rManager.init(globalNameSpace,names,3);
        gameManager.init(rManager,apiHandler,globalNameSpace);
        qManager.init(globalNameSpace,3,rManager,names);
    };

    //iedereen zit altijd in de globale namespace
    let setupGlobalNamespace=function () {
        globalNameSpace=io.of(names.namespaces.global);
        globalNameSpace.on('connection',function (socket) {
            socket.emit('serverInit',"connected to Pictionar-E");
            //als er iemand de namespace verlaat: alles groups van de socket worden autmatisch geleaved
            //+ verwijder de socket uit de queue
            socket.on('disconnect',function () {
                rManager.removeFromGameRoom(names.removeTypes.forced,socket);
                qManager.removeFromQueue(socket);
            });


            socket.on('lobbyJoin',function () {
               socket.join(names.rooms.lobby);
            });

            //als er vanuit de client naar de lobby genavigeerd werd: migreer de socket
            socket.on('requestMoveToLobby',function () {
                //only do this when the socket wasnt already in the lobby
                if(socket.rooms[names.rooms.lobby]===undefined){
                    rManager.removeFromGameRoom(names.removeTypes.nav,socket);
                }
                if(socket.rooms[names.rooms.q]!==null){
                    socket.leave(names.rooms.q);
                    qManager.removeFromQueue(socket);
                }
                socket.join(names.rooms.lobby);
            });

            //als er vanuit de client naar de queue genavigeerd werd: migreer de socket
            // en steek hem in de usersToMigrate array !!!
            socket.on('requestMoveToQueue',function () {
                qManager.addToQueue(socket);
                qManager.checkQueue(qManager.migrateCallback);
            });

            //game events hier opvangen -> serversde controle doen + doorsturen naar de juiste room en sockets
            socket.on('drawBegin',function () {
                gameManager.resolveGameAction(socket,gameManager.canvasActionCallBack,"drawBegin",null);
            });

            socket.on('drawEnd',function () {
                gameManager.resolveGameAction(socket,gameManager.canvasActionCallBack,"drawEnd",null);
            });

            socket.on('drawUpdate',function (msgObj) {
                gameManager.resolveGameAction(socket,gameManager.canvasActionCallBack,"drawUpdate",msgObj);
            });

            socket.on('changedColor',function (newColor) {
                gameManager.resolveGameAction(socket,gameManager.canvasActionCallBack,"changedColor",newColor);
            });

            socket.on('canvasClear',function () {
                gameManager.resolveGameAction(socket,gameManager.canvasActionCallBack,"canvasCleared",null);
            });

            socket.on('requestWordBatch',function () {
               gameManager.serveWordBatch(socket);
            });

            socket.on('confirmWordChoice',function (word) { gameManager.confirmWord(socket,word); });

            socket.on('sendChatMessage', function (message) {
                if(message.content!==null && message.content!==' '){
                    gameManager.resolveGameAction(socket,gameManager.messageCallBack,"sendChatMessage",message);
                }
            });

            socket.on('guessedWord', function(guess){
                if(guess.guess!==null && guess.guess!==''){
                    gameManager.checkGuessedWord(socket,guess);
                }
            });

            socket.on('addUserToSocket', function (user) {
                Object.keys(io.sockets.connected).forEach(function (s) {
                    if(socket.conn.id === s){
                        socket.user = user;
                        io.sockets.sockets[s].user = user;
                        if(socket.user !== undefined && socket.user.nickName !=="Guest"){
                            Object.keys(io.sockets.connected).forEach(function (t) {
                                if(io.sockets.connected[t].user !== undefined){
                                    if((socket.user.email === io.sockets.connected[t].user.email)&&socket.conn.id!=t){
                                        socket.disconnect();
                                    }else{
                                        socket.user = user;
                                        io.sockets.sockets[s].user = user;
                                    }
                                }
                            });
                        }else{
                            io.sockets.sockets[s].user = user;
                            socket.user = user;
                        }
                    }
                });
            });

            socket.on('getRoomList',function () { rManager.getRoomList(socket); });

        });
    };

    //public
    return{
        init:init
    };

})();
module.exports=SocketHandler;
