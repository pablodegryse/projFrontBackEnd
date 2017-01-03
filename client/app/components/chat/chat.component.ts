import {Component, OnInit, Input} from "@angular/core";
import {ChatService} from "../../services/chat.service";
import {User} from "../auth/user.model";
import {SocketService} from "../../services/socket.service";
import {Message} from "./message.model";

@Component({
    selector: 'pe-chat',
    templateUrl: './views/componentViews/chat.component.html'
})
export class ChatComponent implements OnInit{
    message: string;
    messages: any = [];
    connection:any;
    user:User;
    guess:string;
    wordToGuess:string;
    previousGuessTiming:number;
    currentGuessTiming:number=0;

    chatSocket:any;
    @Input() gameRole:string;

    constructor(private _chatService:ChatService,
                private _socketService:SocketService)
    {}

    ngOnInit(){
        var user=localStorage.getItem('user');
        if(user!=null && !''){
            this.user = JSON.parse(localStorage.getItem('user'));
        }else {
            this.user = new User('','','Guest');
        }
        var self = this;
        this.messages =[];
        this.chatSocket = this._socketService.getSocket();
        this.chatSocket.on("sendChatMessage", function(msg){
            self.messages.push(msg);
        });
        this.chatSocket.on('wordChoiceConfirmed', function(word) {
            self.wordToGuess = word;
        });
        this.chatSocket.off('updateUser');
        this.chatSocket.on('updateUser', function (user) {
            if(localStorage.getItem('user')==null) return;
            var currentUser = JSON.parse(localStorage.getItem('user'));
            if(currentUser.email === user.user.email){
                localStorage.setItem('user', JSON.stringify(user.user));
            }
        });
    }

    sendMessage(){
        if(this.message!=null && this.message!=''){
            let messageToSend = new Message(this.message,this.user.nickName);
            this.messages.push(messageToSend);
            this._chatService.addMessage(messageToSend);
            this.chatSocket.emit("sendChatMessage", messageToSend);
            this.message = '';
        }
    }
    guessWord(){
        if(this.guess!=null && this.guess!=''){
            if(this.previousGuessTiming>0){
                this.currentGuessTiming=new Date().getTime();
                if(this.currentGuessTiming-this.previousGuessTiming>4000){
                    this.previousGuessTiming=this.currentGuessTiming;
                    this.chatSocket.emit("guessedWord", {guess: this.guess, user: this.user});
                    this.chatSocket.on("guessedWord",this.user);
                    this.guess = '';
                }else {
                    let clientNotice = new Message("Please wait before guessing again...","Info");
                    this.messages.push(clientNotice)
                }
            }else {
                let ms=new Date().getTime();
                this.currentGuessTiming=ms;
                this.previousGuessTiming=ms;
                this.chatSocket.emit("guessedWord", {guess: this.guess, user: this.user});
                this.chatSocket.on("guessedWord",this.user);
                this.guess = '';
            }
        }
    }
}