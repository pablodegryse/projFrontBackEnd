//handles all game logic and score distribution for the canvas game
let GameManager=(function () {
    let active;
    let init=function (activeRooms) {
        active=activeRooms;
    };

    //de gameroom van een socket vinden die een event afvuurt
    let resolveGameAction=function (socket,callback,action,content) {
        for(let i=0,len=active.length;i<len;i++){
            let currentId=active[i].id;
            if(socket.rooms[currentId]!=null){
                if(active[i].drawer.socket.id===socket.id){
                    callback(active[i],action,content);
                }
                else{
                    callback(active[i], socket, action, content);
                }
                break;
            }
        }
    };

    let canvasActionCallBack=function (room,action,actionContent) {
        room.drawer.socket.broadcast.to(room.id).emit(action,actionContent);
    };

    let messageCallBack=function (room, socket, action, actionContent) {
        console.log("room: " +room.id);
        console.log('socket: ' + socket.id);
        for(let i =0; i < room.guessers.length;i++){
            if(room.guessers[i].socket.id === socket.id){
                room.guessers[i].socket.broadcast.to(room.id).emit(action, actionContent);
            }
        }

    };



    //public
    return{
        init:init,
        resolveGameAction:resolveGameAction,
        canvasActionCallBack:canvasActionCallBack,
        messageCallBack:messageCallBack
    };
})();

module.exports=GameManager;
