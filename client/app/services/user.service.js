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
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
    }
    UserService.prototype.getUsers = function () {
        var _this = this;
        this.users = [];
        return this._http.get('http://localhost:8080/user')
            .map(function (response) {
            console.log("response inside getUsers() : " + response);
            var usersReceived = response.json().obj;
            console.log("users inside getUsers(): " + usersReceived);
            for (var _i = 0, usersReceived_1 = usersReceived; _i < usersReceived_1.length; _i++) {
                var user = usersReceived_1[_i];
                _this.users.push(new user_model_1.User(user.email, user.password, user.nickName, user.firstName, user.lastName, user.points));
            }
            return _this.users;
        });
    };
    UserService.prototype.getUserById = function (id) {
        return this._http.get('http://localhost:8080/user/' + id)
            .map(function (response) {
            var result = response.json();
            var user = new user_model_1.User(result.obj.email, result.obj.password, result.obj.nickName, result.obj.firstName, result.obj.lastName, result.obj.roomId);
            return user;
        });
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map