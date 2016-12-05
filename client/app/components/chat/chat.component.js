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
var message_model_1 = require("./message.model");
var ChatComponent = (function () {
    function ChatComponent(_chatService, _socketService) {
        this._chatService = _chatService;
        this._socketService = _socketService;
        this.messages = [];
    }
    ChatComponent.prototype.ngOnInit = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        var self = this;
        this.messages = [];
        this.chatSocket = this._socketService.getSocket();
        this.chatSocket.on("sendChatMessage", function (msg) {
            console.log("message received :" + msg);
            //this.messages.push(msg);
            console.log("msg array in service: " + self._chatService.getMessages());
            self.messages.push(msg);
        });
        this.chatSocket.on('wordChoiceConfirmed', function (word) {
            console.log("confirmed word :" + word);
            self.wordToGuess = word;
            console.log("word to guess after confirm : " + self.wordToGuess);
        });
    };
    ChatComponent.prototype.ngOnDestroy = function () {
    };
    ChatComponent.prototype.sendMessage = function () {
        var messageToSend = new message_model_1.Message(this.message, this.user.nickName);
        this.messages.push(messageToSend);
        this._chatService.addMessage(messageToSend);
        this.chatSocket.emit("sendChatMessage", messageToSend);
        this.message = '';
    };
    ChatComponent.prototype.guessWord = function () {
        // var self = this;
        // console.log("chatComponent: "+this.guess);
        // console.log("word to guess inside guessword method : " + self.wordToGuess);
        // (this.guess==this.wordToGuess)? console.log("yay, you guessed it"): console.log("better luck next time");
        this.chatSocket.emit("guessedWord", this.guess);
        this.guess = '';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], ChatComponent.prototype, "gameRole", void 0);
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