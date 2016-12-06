import {Component, Input} from "@angular/core";
import {SocketService} from "../../services/socket.service";

@Component({
    selector: 'pe-room',
    templateUrl: './views/componentViews/room.component.html'
})
export class RoomComponent {
    @Input() gameRole:string;
    globalSocket:any;
    constructor(private socketService:SocketService){
        this.globalSocket=socketService.getSocket();
        this.setupRoomEvents(this);
    }

    handleRoleChanged(role:string){
        this.gameRole=role;
        console.log("OUTPUT====>"+role);
    }

    setupRoomEvents(component){
        this.globalSocket.off("setupLetterBox");
        this.globalSocket.on("setupLetterBox",function (numberOfLetters) {
            console.log("number of letter is word to guess:"+numberOfLetters);
        });

        this.globalSocket.off("revealLetter");
        this.globalSocket.on("revealLetter",function (msg) {
            console.log("Reaveled letter:"+msg.letter);
            console.log("this is the index in the word:"+msg.letterIndex);
        });
        this.globalSocket.on('wordGuessed',function(data){
            if(data.hasGuessed == true) console.log("The word has been guessed by : " + data.socketId);
        });
    }
}
