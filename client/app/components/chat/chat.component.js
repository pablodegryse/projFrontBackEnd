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
var user_model_1 = require("../auth/user.model");
var socket_service_1 = require("../../services/socket.service");
var message_model_1 = require("./message.model");
var ChatComponent = (function () {
    function ChatComponent(_chatService, _socketService) {
        this._chatService = _chatService;
        this._socketService = _socketService;
        this.messages = [];
        this.currentGuessTiming = 0;
    }
    ChatComponent.prototype.ngOnInit = function () {
        var user = localStorage.getItem('user');
        if (user != null && !'') {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        else {
            this.user = new user_model_1.User('', '', 'Guest');
        }
        var self = this;
        this.messages = [];
        this.chatSocket = this._socketService.getSocket();
        this.chatSocket.on("sendChatMessage", function (msg) {
            self.messages.push(msg);
        });
        this.chatSocket.on('wordChoiceConfirmed', function (word) {
            self.wordToGuess = word;
        });
        this.chatSocket.off('updateUser');
        this.chatSocket.on('updateUser', function (user) {
            if (localStorage.getItem('user') == null)
                return;
            var currentUser = JSON.parse(localStorage.getItem('user'));
            if (currentUser.email === user.user.email) {
                localStorage.setItem('user', JSON.stringify(user.user));
            }
        });
    };
    ChatComponent.prototype.sendMessage = function () {
        if (this.message != null && this.message != '') {
            var messageToSend = new message_model_1.Message(this.message, this.user.nickName);
            this.messages.push(messageToSend);
            this._chatService.addMessage(messageToSend);
            this.chatSocket.emit("sendChatMessage", messageToSend);
            this.message = '';
        }
    };
    ChatComponent.prototype.guessWord = function () {
        if (this.guess != null && this.guess != '') {
            if (this.previousGuessTiming > 0) {
                this.currentGuessTiming = new Date().getTime();
                if (this.currentGuessTiming - this.previousGuessTiming > 4000) {
                    this.previousGuessTiming = this.currentGuessTiming;
                    this.chatSocket.emit("guessedWord", { guess: this.guess, user: this.user });
                    this.chatSocket.on("guessedWord", this.user);
                    this.guess = '';
                }
                else {
                    var clientNotice = new message_model_1.Message("Please wait before guessing again...", "Info");
                    this.messages.push(clientNotice);
                }
            }
            else {
                var ms = new Date().getTime();
                this.currentGuessTiming = ms;
                this.previousGuessTiming = ms;
                this.chatSocket.emit("guessedWord", { guess: this.guess, user: this.user });
                this.chatSocket.on("guessedWord", this.user);
                this.guess = '';
            }
        }
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