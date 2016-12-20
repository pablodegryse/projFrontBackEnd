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
var auth_service_1 = require("../../services/auth.service");
var user_service_1 = require("../../services/user.service");
var FriendItemComponent = (function () {
    function FriendItemComponent(_authService, _userService) {
        this._authService = _authService;
        this._userService = _userService;
        this.isSelected = false;
        this.isRemoved = new core_1.EventEmitter();
    }
    FriendItemComponent.prototype.onSelectFriend = function (user) {
        this.isSelected = !this.isSelected;
    };
    FriendItemComponent.prototype.onRemoveFriend = function (user) {
        var _this = this;
        //noinspection TypeScriptUnresolvedVariable
        this.user.friends.splice(this.user.friends.indexOf(user.userId), 1);
        this._userService.updateUser(this.user)
            .subscribe(function (user) {
            localStorage.setItem('user', JSON.stringify(_this.user));
        });
        this.isRemoved.emit(null);
    };
    FriendItemComponent.prototype.isLoggedIn = function () {
        return this._authService.isLoggedIn();
    };
    return FriendItemComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", user_model_1.User)
], FriendItemComponent.prototype, "friend", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], FriendItemComponent.prototype, "i", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", user_model_1.User)
], FriendItemComponent.prototype, "user", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], FriendItemComponent.prototype, "isRemoved", void 0);
FriendItemComponent = __decorate([
    core_1.Component({
        selector: 'pe-friend-item',
        templateUrl: './views/componentViews/friend-item.component.html',
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        user_service_1.UserService])
], FriendItemComponent);
exports.FriendItemComponent = FriendItemComponent;
//# sourceMappingURL=friend-item.component.js.map