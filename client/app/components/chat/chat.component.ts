import {Component, OnInit, OnDestroy, Output, EventEmitter} from "@angular/core";
import {ChatService} from "../../services/chat.service";
import {User} from "../auth/user.model";
import {RoomService} from "../../services/room.service";
import {Room} from "../room/room.model";
import {Message} from "./message.model";
import {NgForm} from "@angular/forms";
import {SocketService} from "../../services/socket.service";

@Component({
    selector: 'pe-chat',
    templateUrl: './views/componentViews/chat.component.html'
})
export class ChatComponent implements OnInit, OnDestroy{
    message: Message;
    messages: Message[] =[];
    connection:any;
    user:User;
    room:Room;
    @Output() messageSend = new EventEmitter<string>();

    chatSocket:any;

    constructor(private _chatService:ChatService,
                private _roomService:RoomService,
                private _socketService:SocketService
    ){

    }

    ngOnInit(){
        this.chatSocket = this._socketService.getSocket();
        this.chatSocket.on("sendChatMessageToRoom", function(msg){
            console.log("message received :" + msg);
            this.messages.push(msg);
        });
        // this.user = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')): new User('','','Free User','','','');
        // this._roomService.getRoomById(this.user.roomId)
        //     .subscribe(data => {
        //         this.room = data;
        //         console.log('room id = ' + this.room.roomId);
        //     });
        // this._chatService.getMessages()
        //     .subscribe(
        //         (messages:Message[]) =>{
        //             this.messages = messages;
        //             }
        //     );
    }

    ngOnDestroy(){

    }

    onSubmit(form: NgForm){
        this._socketService.getSocket();
        // const message = new Message(form.value.content, 'Max');
        // this._chatService.addMessage(message)
        //     .subscribe(
        //         data => console.log(data),
        //         error => console.error(error)
        //     );
        // console.log(this.message);
        // //this.messages.push(this.message);
        // this._chatService.addMessage(this.message);
        // this.messageSend.emit(this.message);
        // this.message = '';
        // this.messages = this._chatService.getMessages();
        // console.log("messages : " + this.messages);
    }
    sendMessage(){
        console.log("message : " + this.message);
        this.chatSocket.emit("sendChatMessage", this.message);
    }
}