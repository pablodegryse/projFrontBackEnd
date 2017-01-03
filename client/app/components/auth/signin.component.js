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
var forms_1 = require("@angular/forms");
var user_model_1 = require("./user.model");
var auth_service_1 = require("../../services/auth.service");
var router_1 = require("@angular/router");
var user_service_1 = require("../../services/user.service");
var SigninComponent = (function () {
    function SigninComponent(_authService, _router, _userService) {
        this._authService = _authService;
        this._router = _router;
        this._userService = _userService;
    }
    SigninComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new user_model_1.User(this.myForm.value.email, this.myForm.value.password);
        this._authService.signin(user)
            .subscribe(function (data) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            _this._userService.updateUser(data.user).subscribe();
            _this._router.navigateByUrl('/');
        }, function (error) { return console.error(error); });
        this.myForm.reset();
    };
    SigninComponent.prototype.ngOnInit = function () {
        this.myForm = new forms_1.FormGroup({
            email: new forms_1.FormControl(null, [
                forms_1.Validators.required,
                forms_1.Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new forms_1.FormControl(null, forms_1.Validators.required)
        });
    };
    SigninComponent = __decorate([
        core_1.Component({
            selector: 'pe-signin',
            templateUrl: './views/componentViews/signin.component.html'
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, user_service_1.UserService])
    ], SigninComponent);
    return SigninComponent;
}());
exports.SigninComponent = SigninComponent;
//# sourceMappingURL=signin.component.js.map