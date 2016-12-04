import {Component, OnInit, OnDestroy} from "@angular/core";
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

    chatSocket:any;

    constructor(private _chatService:ChatService,
                private _socketService:SocketService)
    {}

    ngOnInit(){
        this.user = JSON.parse(localStorage.getItem('user'));
        var self = this;
        this.messages =[];
        this.chatSocket = this._socketService.getSocket();
        this.chatSocket.on("sendChatMessage", function(msg){
            console.log("message received :" + msg);
            //this.messages.push(msg);
            console.log("msg array in service: " + self._chatService.getMessages());
            self.messages.push(msg);
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
}