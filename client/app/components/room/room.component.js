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
        this.globalSocket = socketService.getSocket();
        this.setupRoomEvents(this);
    }
    RoomComponent.prototype.setupRoomEvents = function (component) {
        this.globalSocket.off("setupLetterBox");
        this.globalSocket.on("setupLetterBox", function (numberOfLetters) {
            console.log("number of letter is word to guess:" + numberOfLetters);
        });
        this.globalSocket.off("revealLetter");
        this.globalSocket.on("revealLetter", function (msg) {
            console.log("Reaveled letter:" + msg.letter);
            console.log("this is the index in the word:" + msg.letterIndex);
        });
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