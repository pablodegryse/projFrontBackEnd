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
var user_model_1 = require("../components/auth/user.model");
var user_service_1 = require("./user.service");
var AuthService = (function () {
    function AuthService(_http, _userService) {
        this._http = _http;
        this._userService = _userService;
    }
    AuthService.prototype.register = function (user) {
        var body = JSON.stringify(user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post('http://localhost:8080/user', body, { headers: headers })
            .map(function (response) { return response.json(); });
    };
    AuthService.prototype.signin = function (user) {
        user.status = 'online';
        console.log('inside signin status : ' + user.status);
        var body = JSON.stringify(user);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        return this._http.post('http://localhost:8080/user/signin', body, { headers: headers })
            .map(function (response) { return response.json(); });
    };
    AuthService.prototype.logout = function () {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.user.status = "offline";
        this._userService.updateUser(this.user).subscribe();
        localStorage.clear();
    };
    AuthService.prototype.isLoggedIn = function () {
        return localStorage.getItem('token') !== null;
    };
    AuthService.prototype.getUserById = function (id) {
        return this._http.get('http://localhost:8080/user/' + id)
            .map(function (response) {
            var result = response.json();
            var user = new user_model_1.User(result.obj.email, result.obj.password, result.obj.nickName, result.obj.firstName, result.obj.lastName, result.obj.roomId);
            return user;
        });
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, user_service_1.UserService])
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map