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
var socket_service_1 = require("../../services/socket.service");
var RoomComponent = (function () {
    function RoomComponent(socketService) {
        this.socketService = socketService;
        this.gameMessageClass = "gameMessageInvisible";
        this.showLetterBox = false;
        this.globalSocket = socketService.getSocket();
        this.setupRoomEvents(this);
    }
    RoomComponent.prototype.handleRoleChanged = function (role) {
        this.gameRole = role;
        this.showHideGameMessage(false, null);
    };
    RoomComponent.prototype.setupRoomEvents = function (component) {
        this.globalSocket.off("setupLetterBox");
        this.globalSocket.on("setupLetterBox", function (numberOfLetters) {
            console.log("number of letter in word to guess:" + numberOfLetters);
            component.addLetters(numberOfLetters);
        });
        this.globalSocket.off("revealLetter");
        this.globalSocket.on("revealLetter", function (msg) {
            console.log("Reaveled letter:" + msg.letter);
            console.log("this is the index in the word:" + msg.letterIndex);
            component.showLetter(msg.letter, msg.letterIndex);
        });
        this.globalSocket.on('wordGuessed', function (data) {
            if (data.hasGuessed === true) {
                if (data.isme === true) {
                    component.showHideGameMessage(true, "Good job, you guessed the word!");
                }
                else {
                    component.showHideGameMessage(true, "The word has been guessed by : " + data.socketId);
                }
            }
            else {
            }
        });
    };
    RoomComponent.prototype.showHideGameMessage = function (isVisible, message) {
        if (isVisible) {
            this.gameMessage = message;
            this.gameMessageClass = "gameMessageVisible";
        }
        else {
            this.gameMessageClass = "gameMessageInvisible";
        }
    };
    RoomComponent.prototype.addLetters = function (boxSize) {
        this.wordLetters = [];
        for (var i = 0; i < boxSize; i++) {
            this.wordLetters.push("_");
        }
        this.showLetterBox = true;
    };
    RoomComponent.prototype.showLetter = function (letter, index) {
        this.wordLetters[index] = letter;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], RoomComponent.prototype, "gameRole", void 0);
    RoomComponent = __decorate([
        core_1.Component({
            selector: 'pe-room',
            templateUrl: './views/componentViews/room.component.html'
        }), 
        __metadata('design:paramtypes', [socket_service_1.SocketService])
    ], RoomComponent);
    return RoomComponent;
}());
exports.RoomComponent = RoomComponent;
//# sourceMappingURL=room.component.js.map