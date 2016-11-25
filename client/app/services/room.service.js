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
var http_1 = require("@angular/http");
require('rxjs/Rx');
require('rxjs/add/operator/map');
var room_model_1 = require("../components/room/room.model");
var RoomService = (function () {
    function RoomService(http) {
        this.http = http;
        this.rooms = [];
        this.roomIsUpdated = new core_1.EventEmitter();
    }
    RoomService.prototype.createRoom = function (room) {
        var body = JSON.stringify(room);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';
        return this.http.post('http://localhost:8080/room' + token, body, { headers: headers })
            .map(function (response) {
            var result = response.json();
            var room = new room_model_1.Room(result.obj.name, result.obj.users, result.obj._id);
            return room;
        });
    };
    RoomService.prototype.getRooms = function () {
        var _this = this;
        this.rooms = [];
        return this.http.get('http://localhost:8080/room')
            .map(function (response) {
            console.log(response);
            var rooms = response.json().obj;
            for (var _i = 0, rooms_1 = rooms; _i < rooms_1.length; _i++) {
                var room = rooms_1[_i];
                _this.rooms.push(new room_model_1.Room(room.name, room.users, room._id));
            }
            return _this.rooms;
        });
    };
    RoomService.prototype.editRoom = function (room) {
        console.log("emmit room edit");
        this.roomIsUpdated.emit(room);
    };
    RoomService.prototype.updateRoom = function (room) {
        var body = JSON.stringify(room);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var user = localStorage.getItem('userId') ? '?user=' + localStorage.getItem('userId') : '';
        return this.http.patch('http://localhost:8080/room/' + room.roomId + user, body, { headers: headers })
            .map(function (response) { return response.json(); });
    };
    RoomService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], RoomService);
    return RoomService;
}());
exports.RoomService = RoomService;
//# sourceMappingURL=room.service.js.map