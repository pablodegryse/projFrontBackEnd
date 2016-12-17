import {Component, OnInit, Input} from "@angular/core";
import {ChatService} from "../../services/chat.service";
import {User} from "../auth/user.model";
import {Room} from "../room/room.model";
import {SocketService} from "../../services/socket.service";
import {Message} from "./message.model";
import {UserService} from "../../services/user.service";

@Component({
    selector: 'pe-chat',
    templateUrl: './views/componentViews/chat.component.html'
})
export class ChatComponent implements OnInit{
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
                private _socketService:SocketService,
                private _userService:UserService)
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
            if(self.user.email===user.user.email){
                self.user = user.user;
                self._userService.updateUser(self.user)
                    .subscribe((data)=>{
                        localStorage.setItem('user', JSON.stringify(self.user));
                    });
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
        this.chatSocket.emit("guessedWord", {guess: this.guess, user: this.user});
        this.chatSocket.on("guessedWord",this.user);
        this.guess = '';
    }
}