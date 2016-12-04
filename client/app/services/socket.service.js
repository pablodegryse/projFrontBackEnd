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
var core_1 = require('@angular/core');
var SocketService = (function () {
    function SocketService() {
        this.roomListEventsSet = false;
        this.canvasEventsSet = false;
        this.gameEventsSet = false;
        this.initialLobbyJoin = true;
        this.socket = io("/global");
        this.setMainEvents();
    }
    SocketService.prototype.getSocket = function () {
        return this.socket;
    };
    //zet de client socket events , zodat we acties/berichten van de server kunnen opvangen
    SocketService.prototype.setMainEvents = function () {
        this.socket.on("welcome", function (msg) {
            console.log("SERVER MSG: " + msg.content);
        });
        this.socket.on("info", function (msg) {
            console.log("SERVER INFO: " + msg);
        });
    };
    //vraag aan de server om deze socket naar de lobby group te migreren
    SocketService.prototype.requestLobbyMove = function () {
        this.socket.emit("requestMoveToLobby");
    };
    SocketService.prototype.lobbyJoin = function () {
        this.socket.emit("initJoinLobby");
    };
    SocketService.prototype.requestQueueMove = function () {
        this.socket.emit("requestMoveToQueue");
    };
    SocketService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SocketService);
    return SocketService;
}());
exports.SocketService = SocketService;
//# sourceMappingURL=socket.service.js.map