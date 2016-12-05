//handles all game logic and score distribution for the canvas game
let GameManager=(function () {
    let active;
    let wordApi;
    let init=function (activeRooms,apiHandler) {
        active=activeRooms;
        wordApi=apiHandler;
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

    //de room van een socket vinden , data moet niet altijd ingevuld zijn...
    let findRoom=function (socket,callback,data) {
        for(let i=0,len=active.length;i<len;i++){
            let currentId=active[i].id;
            if(socket.rooms[currentId]!=null){
                callback(active[i],socket,data);
                break;
            }
        }
    };

    //random woorden geven aan de drawer als hij nog rerolls over heeft
    //we werken met rerolls om zeker te zijn dat een drawer een deftig woord vindt
    let serveWordsToDraw=function (socket) {
        console.log("words requested");
        findRoom(socket,wordServeCallback);
    };

    //gebruikt de wordAPI module die de data aflevert aan de socket via een callback
    let wordServeCallback=function(room,socket) {
        //enkel doen als er nog rolls over zijn voor de drawer
        if(room.drawer.socket.id===socket.id){
            if(room.wordRerolls>0){
                room.wordRerolls--;
                if(room.wordRerolls===0){
                    wordApi.getWordData(wordResultCallback,socket,false);
                }else {
                    wordApi.getWordData(wordResultCallback,socket,true);
                }
            }
        }
    };

    //uiteindelijke woord callback , zal de data sturen naar de vragen socket
    let wordResultCallback=function (err,data,socket) {
        if(!err){
            socket.emit("deliverWordBatch",data);
        }
    };

    let confirmWordChoice=function (socket,word) {
        findRoom(socket,wordConfirmCallback,word)
    };

    //het woord bevestigen aan de drawer + laten weten aan de guessers + aantal letters meesturen
    let wordConfirmCallback=function (room,socket,word) {
        room.currentWordToDraw=word;
        socket.emit("wordChoiceConfirmed",word);
        socket.broadcast.to(room.id).emit("setupLetterBox",word.length);
    };

    let checkGuessedWord = function (room, socket, action, guessedWord) {
        console.log(guessedWord);
        let hasGuessed = false;
        (guessedWord == room.currentWordToDraw)? hasGuessed = true : hasGuessed = false;
        console.log("guessedWord = " + guessedWord + ", Word to guess = " +room.currentWordToDraw);
        socket.broadcast.to(room.id).emit("wordGuessed",{hasGuessed:hasGuessed, socketId: socket.id});
    };

    //public
    return{
        init:init,
        resolveGameAction:resolveGameAction,
        canvasActionCallBack:canvasActionCallBack,
        messageCallBack:messageCallBack,
        serveWordBatch:serveWordsToDraw,
        confirmWord:confirmWordChoice,
        checkGuessedWord:checkGuessedWord
    };
})();

module.exports=GameManager;
