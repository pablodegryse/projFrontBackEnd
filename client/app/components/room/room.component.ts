import {Component, Input} from "@angular/core";
import {SocketService} from "../../services/socket.service";

@Component({
    selector: 'pe-room',
    templateUrl: './views/componentViews/room.component.html'
})
export class RoomComponent {
    @Input() gameRole:string;
    globalSocket:any;
    gameMessage:String;
    gameMessageClass:String="gameMessageInvisible";
    messageIconClass:string="icon-happy";
    wordLetters:string[];
    showLetterBox:boolean=false;
    constructor(private socketService:SocketService){
        this.globalSocket=socketService.getSocket();
        this.setupRoomEvents(this);
    }

    handleRoleChanged(role:string){
        this.gameRole=role;
        this.showHideGameMessage(false,false,null);
    }

    setupRoomEvents(component){
        this.globalSocket.off("setupLetterBox");
        this.globalSocket.on("setupLetterBox",function (numberOfLetters) {
            console.log("number of letter in word to guess:"+numberOfLetters);
            component.addLetters(numberOfLetters);
        });

        this.globalSocket.off("revealLetter");
        this.globalSocket.on("revealLetter",function (msg) {
            console.log("Reaveled letter:"+msg.letter);
            console.log("this is the index in the word:"+msg.letterIndex);
            component.showLetter(msg.letter,msg.letterIndex);
        });
        this.globalSocket.on('wordGuessed',function(data){
            if(data.hasGuessed === true){
                if(data.isme===true){
                    component.showHideGameMessage(true,false,"Good job, you guessed the word!");
                }else {
                    component.showHideGameMessage(true,false,"The word has been guessed by : " + data.socketId);
                }
            }
        });

        this.globalSocket.off("winnerAnnounce");
        this.globalSocket.on('winnerAnnounce',function (data) {
            if(data.isme===true){
                component.showHideGameMessage(true,true,"Congratulations, you won the game!");
            }else {
                component.showHideGameMessage(true,true,"The game was won by "+data.winnerName);
            }
        });

    }

    showHideGameMessage(isVisible,isWinnerAnnounce,message){
        if(isWinnerAnnounce){
            this.messageIconClass="icon-trophy";
        }else {
            this.messageIconClass="icon-happy";
        }
        if(isVisible){
            this.gameMessage=message;
            this.gameMessageClass="gameMessageVisible"
        }else{
            this.gameMessageClass="gameMessageInvisible";
        }
    }

    addLetters(boxSize){
        this.wordLetters=[];
        for(var i=0;i<boxSize;i++){
            this.wordLetters.push("_");
        }
        this.showLetterBox=true;
    }

    showLetter(letter,index){
        this.wordLetters[index]=letter;
    }

}
