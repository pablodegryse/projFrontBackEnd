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
var room_model_1 = require("./room.model");
var room_service_1 = require("../../services/room.service");
var router_1 = require("@angular/router");
var RoomItemComponent = (function () {
    function RoomItemComponent(_roomService, _router) {
        this._roomService = _roomService;
        this._router = _router;
    }
    RoomItemComponent.prototype.ngOnInit = function () {
        console.log('room-item created');
    };
    RoomItemComponent.prototype.isFull = function (room) {
        return (room.users.length == 4) ? true : false;
    };
    RoomItemComponent.prototype.onEditRoom = function () {
        console.log("room edited");
    };
    RoomItemComponent.prototype.onJoinRoom = function (room) {
        this.user = JSON.parse(localStorage.getItem('user'));
        room.users.push(this.user);
        this._roomService.updateRoom(room)
            .subscribe(function (data) { return console.log(data); }, function (error) { return console.error(error); });
    };
    RoomItemComponent.prototype.ngOnDestroy = function () {
        //this._roomService.roomIsUpdated.unsubscribe();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', room_model_1.Room)
    ], RoomItemComponent.prototype, "room", void 0);
    RoomItemComponent = __decorate([
        core_1.Component({
            selector: 'pe-room-item',
            templateUrl: './views/componentViews/room-item.component.html'
        }), 
        __metadata('design:paramtypes', [room_service_1.RoomService, router_1.Router])
    ], RoomItemComponent);
    return RoomItemComponent;
}());
exports.RoomItemComponent = RoomItemComponent;
//# sourceMappingURL=room-item.component.js.map