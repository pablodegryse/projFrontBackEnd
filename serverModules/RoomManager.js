//manages the room collections : active and pending rooms
// adding, removing , migrating users
let RoomManager=(function () {
    let active=[],names,maxRoomSize;
    let globalNameSpace;
    let breakForceSearch=false;

    let init=function (globalNS,nameObj,roomSize) {
      globalNameSpace=globalNS;
      names=nameObj;
      maxRoomSize=roomSize;
    };

    let addActiveRoom=function (room) {
        active.push(room);
    };

    //kijken of er nog genoeg spelers zijn om de room in de 'active' lijst te houden
    let checkRoomState=function (roomId,guessers,activeRoomListIndex){
        if(guessers===0){
            globalNameSpace.to(roomId).emit("GameEnd",{"content":"tooFewUsers"});
            active.splice(activeRoomListIndex);
        }
    };

    let removeUserFromGameRoom=function(removeType,socket){
        let socketId=socket.id;
        //user forced disconnection -> browser closed and io auto left all rooms : so iterratively search rooms and remove user
        if(removeType===names.removeTypes.forced){
            forceRemoveFromRoom(socket);
        }
        //a user navigated out of the game , so we still have the sooms
        else {
            navRemoveFromRoom(socket);
        }
    };

    let forceRemoveFromRoom=function (leavingSocket) {
        for(let i=0,len=active.length;i<len;i++){
            let room=active[i];
            removeFromRoom(room,i,leavingSocket);
            //om te stoppen met zoeken want socket is weg
            if(breakForceSearch){
                breakForceSearch=false;
                break;
            }
        }
    };

    //user navigated from a game
    //look at the room he's in that matches with a room in the active room list
    let navRemoveFromRoom=function (leavingSocket) {
        for(let i=0,len=active.length;i<len;i++){
            let currentId=active[i].id;
            //we got a match + stop after the match was handled
            if(leavingSocket.rooms[currentId]!==null){
                removeFromRoom(active[i],i,leavingSocket);
                break;
            }
        }
    };

    //actual removal from a matched room
    let removeFromRoom=function (room,roomListIndex,leavingSocket) {
        let socketId=leavingSocket.id;
        //the host left: remove the game from active list and let all participants know
        if(room.id===socketId){
            globalNameSpace.to(socketId).emit("GameEnd",{"content":"tooFewUsers"});
            active.splice(roomListIndex,1);
            breakForceSearch=true;
        }
        else{
            //the drawer left: appoint new drawer
            if(room.drawer.socket.id===socketId){
                room.drawer.socket.leave(room.id);
                room.drawer=room.guessers[0];
                room.guessers.splice(0,1);
                room.wordRerolls=2;
                //de nieuwe drawer van rol laten wisselen
                room.drawer.socket.emit("roleChanged",{"content":"drawer"});
                checkRoomState(room.id,room.guessers.length,roomListIndex);
                breakForceSearch=true;
            }
            //a guesser left:
            else {
                for(let i=0,len=room.guessers.length;i<len;i++){
                    if(room.guessers[i].socket.id===socketId){
                        room.guessers[i].socket.leave(room.id);
                        room.guessers.splice(i,1);
                        checkRoomState(room.id,room.guessers.length,roomListIndex);
                        breakForceSearch=true;
                        break;
                    }
                }
            }
        }
    };

    //on disconnect : if the socket was a host of an active game room :
    // disbandon the game in that room and remove it from the active list
    let removeHostRoom=function (socket) {
        for(let i=0,len=active.length;i<len;i++){
            let currentId=active[i].id;
            if(socket.id==currentId){
                globalNameSpace.to(currentId).emit("GameEnd",{"content":"tooFewUsers"});
                active.splice(i,1);
                break;
            }
        }
    };

    let removeRoom=function (roomId) {
        for(let i=0,len=active.length;i<len;i++){
            let currentId=active[i].id;
            if(roomId==currentId){
                globalNameSpace.to(currentId).emit("GameEnd",{"content":"tooFewUsers"});
                active.splice(i,1);
                break;
            }
        }
    };

    let getRoomList=function(socket){
        let list=[];
        for(let i=0,len=active.length;i<len;i++){
            let roomOjb={
                "id":active[i].id,
                "status":"active",
                "players":active[i].guessers.length+1,
                "maxPlayers":maxRoomSize
            };
            list.push(roomOjb);
        }
        roomListCallback(socket,list);
    };

    let roomListCallback=function (socket,list) {
        socket.emit("roomListResult",list);
    };

    //public
    return{
        init:init,
        addActiveRoom:addActiveRoom,
        removeFromGameRoom:removeUserFromGameRoom,
        removeHostRoom:removeHostRoom,
        activeRooms:active,
        getRoomList:getRoomList,
        removeRoom:removeRoom
    };
})();
module.exports=RoomManager;
