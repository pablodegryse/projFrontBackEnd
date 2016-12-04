"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var chat_service_1 = require("../../services/chat.service");
var room_service_1 = require("../../services/room.service");
var socket_service_1 = require("../../services/socket.service");
var ChatComponent = (function () {
    function ChatComponent(_chatService, _roomService, _socketService) {
        this._chatService = _chatService;
        this._roomService = _roomService;
        this._socketService = _socketService;
        this.messages = [];
        this.messageSend = new core_1.EventEmitter();
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.chatSocket = this._socketService.getSocket();
        this.chatSocket.on("sendChatMessageToRoom", function (msg) {
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
    };
    ChatComponent.prototype.ngOnDestroy = function () {
    };
    ChatComponent.prototype.onSubmit = function (form) {
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
    };
    ChatComponent.prototype.sendMessage = function () {
        console.log("message : " + this.message);
        this.chatSocket.emit("sendChatMessage", this.message);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ChatComponent.prototype, "messageSend", void 0);
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'pe-chat',
            templateUrl: './views/componentViews/chat.component.html'
        }), 
        __metadata('design:paramtypes', [chat_service_1.ChatService, room_service_1.RoomService, socket_service_1.SocketService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map