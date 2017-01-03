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
var user_model_1 = require("../auth/user.model");
var user_service_1 = require("../../services/user.service");
var socket_service_1 = require("../../services/socket.service");
var FriendsListComponent = (function () {
    function FriendsListComponent(_userService, _socketService) {
        this._userService = _userService;
        this._socketService = _socketService;
        _socketService.requestLobbyMove();
    }
    FriendsListComponent.prototype.ngOnInit = function () {
        var _this = this;
        var userInStorage = localStorage.getItem('user');
        if (userInStorage != null && !'') {
            this.user = JSON.parse(localStorage.getItem('user'));
        }
        this._userService.getFriends(this.user)
            .subscribe(function (friends) {
            _this.friends = friends;
        });
    };
    FriendsListComponent.prototype.onRemoved = function () {
        var _this = this;
        this._userService.getFriends(this.user)
            .subscribe(function (friends) {
            _this.friends = friends;
        });
    };
    return FriendsListComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", user_model_1.User)
], FriendsListComponent.prototype, "user", void 0);
FriendsListComponent = __decorate([
    core_1.Component({
        selector: 'pe-friends-list',
        templateUrl: './views/componentViews/friends-list.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, socket_service_1.SocketService])
], FriendsListComponent);
exports.FriendsListComponent = FriendsListComponent;
//# sourceMappingURL=friends-list.component.js.map