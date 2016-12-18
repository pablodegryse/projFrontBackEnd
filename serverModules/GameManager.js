//handles all game logic and score distribution for the canvas game
let GameManager=(function () {
    let active;
    let wordApi;
    let globalNS;
    let rManager;
    let User = require('../dbmodels/user');
    let router = require('../routes/user');
    let http = require('http');
    let init=function (roomManager,apiHandler,globalNameSpace) {
        rManager=roomManager;
        active=roomManager.activeRooms;
        wordApi=apiHandler;
        globalNS=globalNameSpace;
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
        room.wordLetterBox=Array.from(word);
        room.checkWordBox=Array.from(word);
        socket.emit("wordChoiceConfirmed",word);
        globalNS.to(room.id).emit("setupLetterBox",word.length);
    };

    let checkGuessedWord = function (socket,guessedWord) {
        findRoom(socket,wordGuessCallback,guessedWord);
    };

    //kijken of geraden woord correct is : zo nee : verhoog gewoon aantal pogingen
    //zo ja : deel punten uit + kijk of er al genoeg geraden zijn en beeindig game indien nodig
    let wordGuessCallback=function (room,socket,guessedWord) {
        console.log("guess = " +guessedWord.guess);
        console.log("user that guessed = " + guessedWord.user.nickName);
        if(room.wordLetterBox.length>0) {
            socket.user = guessedWord.user;
            let guessCorrect = false;
            (guessedWord.guess === room.currentWordToDraw) ? guessCorrect = true : guessCorrect = false;
            socket.to(room.id).emit("wordGuessed", {hasGuessed: guessCorrect, socketId: socket.user.nickName});
            socket.emit("wordGuessed", {hasGuessed: guessCorrect, isme: true});
            room.guessCount++;
            if (guessCorrect) {
                room.wordsGuessed++;
                awardPoints(room, socket);
                if (room.wordsGuessed === room.guessers.length + 1) {
                    concludeGame(room);
                } else {
                    setTimeout(rotateDrawer, 2000, room);
                }
            } else {
                checkToRevealLetter(room, revealLetterCallback);
            }
        }
    };

    //point distrubution according to amount of guesses compared to number of guessers in the room
    let awardPoints=function (room,guesser) {
        switch(true){
            case (room.guessCount<(room.guessers.length)):
                room.drawer.points+=10;
                break;
            case (room.guessCount<(room.guessers.length)*2):
                room.drawer.points+=6;
                break;
            case (room.guessCount<(room.guessers.length)*3):
                room.drawer.points+=3;
                break;
        }
        console.log("drawer points: "+room.drawer.points);
        for(let i=0,len=room.guessers.length;i<len;i++){
            if(room.guessers[i].socket.id===guesser.id){
                room.guessers[i].points+=5;
                console.log("guesser points: "+room.guessers[i].points);
            }
        }
    };
    //check if everyone had a guess this round , if so : reveal a letter
    let checkToRevealLetter=function (room,callback) {
        console.log("checking to reveal a letter....");
        if(room.guessCount%room.guessers.length===0){
            if(room.wordLetterBox.length>0){
                callback(room);
            }
        }
    };

    let revealLetterCallback=function (room) {
        let letterBox=room.wordLetterBox;
        let randomIndex=Math.floor(Math.random()*letterBox.length);
        let randomLetter=letterBox[randomIndex];
        let wordLetterIndex=room.checkWordBox.indexOf(randomLetter);
        //we have to do this because of words with recurring letters ...
        room.checkWordBox[wordLetterIndex]='$';
        room.wordLetterBox.splice(randomIndex,1);
        globalNS.to(room.id).emit("revealLetter",{letter:randomLetter,letterIndex:wordLetterIndex});
        console.log("revealing letter:"+randomLetter+" - "+"at index  in letterbox:"+randomIndex+" - at index in word:"+wordLetterIndex);
    };

    //doordraaien van drawer + room vars resetten
    let rotateDrawer=function (room) {
        room.guessCount=0;
        room.wordRerolls=2;
        room.guessers.push(room.drawer);
        room.drawer=room.guessers[0];
        room.guessers.splice(0,1);
        room.drawer.socket.broadcast.to(room.id).emit("roleChanged",{"content":"guesser"});
        room.drawer.socket.emit("roleChanged",{"content":"drawer"});
    };

    let concludeGame=function (room) {
        savePointsToDb(room.drawer,room.guessers,room.id,concludeGameCallback);
    };

    //de punten uit de drawer en guessers halen en diegenen die ingelogd zijn opslaan
    let savePointsToDb=function (drawer,guessers,roomId,callback) {
        drawer.socket.user.points += drawer.points;
        updateUser(drawer.socket.user);
        globalNS.to(drawer.socket.id).emit("updateUser",{user:drawer.socket.user});
        let winner = drawer;
        for(let i=0,len = guessers.length;i<len;i++){
            guessers[i].socket.user.points += guessers[i].points;
            updateUser(guessers[i].socket.user);
            globalNS.to(guessers[i].socket.id).emit("updateUser",{user:guessers[i].socket.user});
            if (guessers[i].points > winner.points) winner = guessers[i];
        }
        callback(roomId,winner);
    };

    let updateUser = function(user){
      User.updatePoints(user);
    };

    let concludeGameCallback=function (roomId,winnerSocket) {
        winnerSocket.socket.to(roomId).emit("winnerAnnounce",{"isme":false,"winnerName":winnerSocket.socket.user.nickName});
        winnerSocket.socket.emit("winnerAnnounce",{"isme":true});
        setTimeout(closeGameRoom,2500,roomId);
    };

    let closeGameRoom=function (roomId) {
        rManager.removeRoom(roomId)
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
