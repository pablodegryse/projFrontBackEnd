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
var nav_service_1 = require("../../services/nav.service");
var LobbyoverviewComponent = (function () {
    function LobbyoverviewComponent(socketService, _navService) {
        this.socketService = socketService;
        this._navService = _navService;
        this.roomsAvailable = false;
        this.localSocket = socketService.getSocket();
        socketService.requestLobbyMove();
        this.localSocket.emit("getRoomList");
        this.setRoomListEvents(this);
        _navService.changeNavSelection("Room List");
    }
    LobbyoverviewComponent.prototype.setRoomListEvents = function (component) {
        if (this.socketService.roomListEventsSet) {
            this.localSocket.off("roomListResult");
        }
        else {
            this.socketService.roomListEventsSet = true;
        }
        this.localSocket.on("roomListResult", function (result) {
            if (result.length > 0) {
                component.roomsAvailable = true;
                component.roomList = result;
            }
        });
        component.socketService.roomListEventsSet = true;
    };
    return LobbyoverviewComponent;
}());
LobbyoverviewComponent = __decorate([
    core_1.Component({
        selector: 'pe-lobbyoverview',
        templateUrl: './views/componentViews/lobbyoverview.component.html'
    }),
    __metadata("design:paramtypes", [socket_service_1.SocketService, nav_service_1.NavService])
], LobbyoverviewComponent);
exports.LobbyoverviewComponent = LobbyoverviewComponent;
//# sourceMappingURL=lobbyoverview.component.js.map