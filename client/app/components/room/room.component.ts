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
    wordLetters:string[];
    showLetterBox:boolean=false;
    constructor(private socketService:SocketService){
        this.globalSocket=socketService.getSocket();
        this.setupRoomEvents(this);
    }

    handleRoleChanged(role:string){
        this.gameRole=role;
        this.showHideGameMessage(false,null);
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
                    component.showHideGameMessage(true,"Good job, you guesses the word!");
                }else {
                    component.showHideGameMessage(true,"The word has been guessed by : " + data.socketId);
                }
            }else {
                //gewoon in de chat plaatsen
            }
        });
    }

    showHideGameMessage(isVisible,message){
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
