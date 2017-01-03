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
var auth_service_1 = require("../../services/auth.service");
var RankingsItemComponent = (function () {
    function RankingsItemComponent(_userService, _authService) {
        this._userService = _userService;
        this._authService = _authService;
        this.isSelected = false;
    }
    RankingsItemComponent.prototype.ngOnInit = function () {
        var userInStorage = localStorage.getItem('user');
        if (userInStorage != null && !'') {
            this.currentUser = JSON.parse(localStorage.getItem('user'));
        }
        this.isSelected = !this.isSelected;
        if ((!this.isLoggedIn())) {
            this.isFriend = true;
            return;
        }
        this.isFriend = (this.user.userId === this.currentUser._id) ? true : false;
        for (var i = 0; i < this.currentUser.friends.length; i++) {
            if (this.user.userId === this.currentUser.friends[i]) {
                this.isFriend = true;
            }
        }
    };
    RankingsItemComponent.prototype.isLoggedIn = function () {
        return this._authService.isLoggedIn();
    };
    RankingsItemComponent.prototype.onAddFriend = function (user) {
        var _this = this;
        this.currentUser.friends.push(user.userId);
        this.isFriend = !this.isFriend;
        this._userService.updateUser(this.currentUser)
            .subscribe(function (data) {
            return localStorage.setItem('user', JSON.stringify(_this.currentUser));
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_model_1.User)
    ], RankingsItemComponent.prototype, "user", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], RankingsItemComponent.prototype, "i", void 0);
    RankingsItemComponent = __decorate([
        core_1.Component({
            selector: 'pe-rankings-item',
            templateUrl: './views/componentViews/rankings-item.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, auth_service_1.AuthService])
    ], RankingsItemComponent);
    return RankingsItemComponent;
}());
exports.RankingsItemComponent = RankingsItemComponent;
//# sourceMappingURL=rankings-item.component.js.map