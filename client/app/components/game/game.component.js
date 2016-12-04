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
var socket_service_1 = require("../../services/socket.service");
var router_1 = require("@angular/router");
var GameComponent = (function () {
    function GameComponent(socketService, gameRouter) {
        this.socketService = socketService;
        this.gameRouter = gameRouter;
        this.isGameReady = false;
        this.localsocketService = socketService;
        this.globalSocket = this.localsocketService.getSocket();
        this.localsocketService.requestQueueMove();
        this.router = gameRouter;
        this.setGameEvents(this);
    }
    GameComponent.prototype.setGameEvents = function (component) {
        this.globalSocket.on("GameReady", function (msg) {
            component.isGameReady = true;
            if (msg.content === "drawer") {
                console.log("I'm drawer");
            }
            else if (msg.content === "guesser") {
                console.log("I'm guesser");
            }
        });
        this.globalSocket.on("GameEnd", function (msg) {
            component.isGameReady = true;
            if (msg.content === "tooFewUsers") {
                component.router.navigateByUrl("/home");
            }
        });
    };
    GameComponent = __decorate([
        core_1.Component({
            selector: "pe-game",
            template: "<div>\n                <pe-queue *ngIf=\"isGameReady===false\"></pe-queue>\n                <pe-room *ngIf=\"isGameReady===true\" ></pe-room>\n              </div>"
        }), 
        __metadata('design:paramtypes', [socket_service_1.SocketService, router_1.Router])
    ], GameComponent);
    return GameComponent;
}());
exports.GameComponent = GameComponent;
//# sourceMappingURL=game.component.js.map