import {Component, OnInit, OnDestroy, Input} from "@angular/core";
import {ChatService} from "../../services/chat.service";
import {User} from "../auth/user.model";
import {Room} from "../room/room.model";
import {SocketService} from "../../services/socket.service";
import {Message} from "./message.model";

@Component({
    selector: 'pe-chat',
    templateUrl: './views/componentViews/chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy{
    message: string;
    messages: any = [];
    connection:any;
    user:User;
    room:Room;
    guess:string;
    wordToGuess:string;

    chatSocket:any;
    @Input() gameRole:string;

    constructor(private _chatService:ChatService,
                private _socketService:SocketService)
    {}

    ngOnInit(){
        /*-------------------------FIX DIS PLS -----------------------------------*/
        /*var user=localStorage.getItem('user');
        console.log(user);
        if(user!=null && !''){
            this.user = JSON.parse(localStorage.getItem('user'));
        }else {
            this.user.nickName="Guest"
        }*/
        /*-------------------------FIX DIS PLS -----------------------------------*/
        var self = this;
        this.messages =[];
        this.chatSocket = this._socketService.getSocket();
        this.chatSocket.on("sendChatMessage", function(msg){
            console.log("message received :" + msg);
            //this.messages.push(msg);
            console.log("msg array in service: " + self._chatService.getMessages());
            self.messages.push(msg);
        });
        this.chatSocket.on('wordChoiceConfirmed', function(word) {
            console.log("confirmed word :" + word);
            self.wordToGuess = word;
            console.log("word to guess after confirm : "+self.wordToGuess);
        });
    }


    ngOnDestroy(){
    }

    sendMessage(){
        let messageToSend = new Message(this.message,this.user.nickName);
        this.messages.push(messageToSend);
        this._chatService.addMessage(messageToSend);
        this.chatSocket.emit("sendChatMessage", messageToSend);
        this.message = '';
    }
    guessWord(){
        // var self = this;
        // console.log("chatComponent: "+this.guess);
        // console.log("word to guess inside guessword method : " + self.wordToGuess);
        // (this.guess==this.wordToGuess)? console.log("yay, you guessed it"): console.log("better luck next time");
        this.chatSocket.emit("guessedWord", this.guess);
        this.guess = '';
    }
}