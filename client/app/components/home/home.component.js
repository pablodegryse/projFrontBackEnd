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
var auth_service_1 = require("../../services/auth.service");
var nav_service_1 = require("../../services/nav.service");
var HomeComponent = (function () {
    function HomeComponent(_socketService, _authService, _navService) {
        this._socketService = _socketService;
        this._authService = _authService;
        this._navService = _navService;
        if (_socketService.initialLobbyJoin) {
            this._socketService.lobbyJoin();
            _socketService.initialLobbyJoin = false;
        }
        else {
            this._socketService.requestLobbyMove();
        }
        _navService.changeNavSelection("Home");
    }
    HomeComponent.prototype.isLoggedIn = function () {
        return this._authService.isLoggedIn();
    };
    HomeComponent = __decorate([
        core_1.Component({
            selector: 'pe-home',
            templateUrl: './views/componentViews/home.component.html'
        }), 
        __metadata('design:paramtypes', [socket_service_1.SocketService, auth_service_1.AuthService, nav_service_1.NavService])
    ], HomeComponent);
    return HomeComponent;
}());
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map