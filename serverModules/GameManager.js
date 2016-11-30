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
                break;
            }
        }
    };

    let canvasActionCallBack=function (room,action,actionContent) {
        room.drawer.socket.broadcast.to(room.id).emit(action,actionContent);
    };




    //public
    return{
        init:init,
        resolveGameAction:resolveGameAction,
        canvasActionCallBack:canvasActionCallBack
    };
})();

module.exports=GameManager;
