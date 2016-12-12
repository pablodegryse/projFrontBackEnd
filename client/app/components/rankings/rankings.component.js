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
var user_service_1 = require("../../services/user.service");
var nav_service_1 = require("../../services/nav.service");
var RankingsComponent = (function () {
    function RankingsComponent(_userService, _navService) {
        this._userService = _userService;
        this._navService = _navService;
        _navService.changeNavSelection("Rankings");
    }
    RankingsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._userService.getUsers()
            .subscribe(function (users) {
            _this.users = users.sort(function (a, b) {
                if (a.points > b.points) {
                    return -1;
                }
                else if (a.points < b.points) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            return users;
        });
    };
    RankingsComponent = __decorate([
        core_1.Component({
            selector: 'pe-rankings',
            templateUrl: './views/componentViews/rankings.component.html'
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, nav_service_1.NavService])
    ], RankingsComponent);
    return RankingsComponent;
}());
exports.RankingsComponent = RankingsComponent;
//# sourceMappingURL=rankings.component.js.map