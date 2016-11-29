//manages the room collections : active and pending rooms
// adding, removing , migrating users
let RoomManager=(function () {
    let active=[],pending=[],names;
    let globalNameSpace;

    let init=function (globalNS,nameObj) {
      globalNameSpace=globalNS;
      names=nameObj;
    };

    let addActiveRoom=function (room) {
        active.push(room);
    };

    //kijken of er nog genoeg spelers zijn om de room in de 'active' lijst te houden
    let checkRoomState=function (roomId,guessers,activeRoomListIndex){
        if(guessers==0){
            globalNameSpace.to(roomId).emit("GameEnd",{"content":"tooFewUsers"});
            active.splice(activeRoomListIndex);
            console.log("game abandoned and removed from active list");
        }
    };

    let removeUserFromGameRoom=function(removeType,socket){
        let socketId=socket.id;
        //user forced disconnection -> brower closed and io auto left all rooms : so iterratively search rooms and remove user
        if(removeType===names.removeTypes.forced){
            for(let i=0,len=active.length;i<len;i++){
                let room=active[i];
                removeFromActiveRoom(socketId,room);
            }
        }
        //a user navigated out of the game , so we still have the sooms
        else {
            //if the navigation was from queue : dont look through the game rooms
            if(socket.rooms[names.rooms.q]==null){
            for(let i=0,len=active.length;i<len;i++){
                let currentId=active[i].id;
                if(socket.rooms[currentId]!=null){
                    if(socket.id!==currentId){
                        removeFromActiveRoom(socket.id,active[i]);
                        console.log("this socket:"+socket.id+" nav left the room: "+currentId);
                    }else {
                        removeHostRoom(socket);
                    }
                    break;
                }
            }
            }
        }

    };

    let removeFromActiveRoom=function (socketId,room,parentLoopIndex) {
        //is the user leaving is the host : stop the game immediately
        if(socketId===room.id){
            globalNameSpace.to(socketId).emit("GameEnd",{"content":"tooFewUsers"});
            active.splice(parentLoopIndex);
            console.log("Host left; game abandoned and removed from active list");
        }else {
            //check to remove the drawer if id's match , and appoint new drawer + let everyone now
            //else : just remove from guesser list
            if(socketId===room.drawer.socket.id){
                room.drawer.socket.leave(room.id);
                room.drawer=room.guessers[0];
                room.guessers.splice(0);
                console.log("this socket:"+socketId+" force left the room: "+room.id);
                checkRoomState(room.id,room.guessers.length,parentLoopIndex);
                parentLoopIndex=-1;
            }else {
                for(let i=0,len=room.guessers.length;i<len;i++){
                    if(room.guessers[i].socket.id===socketId){
                        room.guessers.splice(i);
                        console.log("this socket:"+socketId+" force left the room: "+room.id);
                        console.log("guessers length after splice : "+room.guessers.length);
                        checkRoomState(room.id,room.guessers.length,parentLoopIndex);
                        parentLoopIndex=-1;
                        break;
                    }
                }
            }
            room.drawer.socket.emit("RoleInit","drawer");
        }
    };

    //on disconnect : if the socket was a host of an active game room :
    // disbandon the game in that room and remove it from the active list
    let removeHostRoom=function (socket) {
        for(let i=0,len=active.length;i<len;i++){
            let currentId=active[i].id;
            if(socket.id==currentId){
                globalNameSpace.to(currentId).emit("GameEnd",{"content":"tooFewUsers"});
                active.splice(i);
                console.log("Host left; game abandoned and removed from active list");
                break;
            }
        }
    };

    //public
    return{
        init:init,
        addActiveRoom:addActiveRoom,
        removeFromGameRoom:removeUserFromGameRoom,
        removeHostRoom:removeHostRoom,
        activeRooms:active
    };
})();
module.exports=RoomManager;
