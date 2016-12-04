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
var socket_service_1 = require("../../services/socket.service");
var ChatComponent = (function () {
    function ChatComponent(_chatService, _socketService) {
        this._chatService = _chatService;
        this._socketService = _socketService;
        this.messages = [];
    }
    ChatComponent.prototype.ngOnInit = function () {
        var self = this;
        this.messages = [];
        this.chatSocket = this._socketService.getSocket();
        this.chatSocket.on("sendChatMessage", function (msg) {
            console.log("message received :" + msg);
            //this.messages.push(msg);
            console.log("msg array in service: " + self._chatService.getMessages());
            self.messages.push(msg);
        });
    };
    ChatComponent.prototype.ngOnDestroy = function () {
    };
    ChatComponent.prototype.sendMessage = function () {
        this.messages.push(this.message);
        this._chatService.addMessage(this.message);
        this.chatSocket.emit("sendChatMessage", this.message);
        this.message = '';
    };
    ChatComponent = __decorate([
        core_1.Component({
            selector: 'pe-chat',
            templateUrl: './views/componentViews/chat.component.html'
        }), 
        __metadata('design:paramtypes', [chat_service_1.ChatService, socket_service_1.SocketService])
    ], ChatComponent);
    return ChatComponent;
}());
exports.ChatComponent = ChatComponent;
//# sourceMappingURL=chat.component.js.map