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
var RegisterComponent = (function () {
    function RegisterComponent(_authService, _router) {
        this._authService = _authService;
        this._router = _router;
    }
    RegisterComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = new user_model_1.User(this.myForm.value.email, this.myForm.value.password, this.myForm.value.nickName, this.myForm.value.firstName, this.myForm.value.lastName);
        this._authService.register(user).subscribe(function (data) { return _this.signIn(user); });
        this.myForm.reset();
    };
    RegisterComponent.prototype.signIn = function (user) {
        var _this = this;
        this._authService.signin(user)
            .subscribe(function (data) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            _this._router.navigateByUrl('/');
        });
    };
    RegisterComponent.prototype.ngOnInit = function () {
        this.myForm = new forms_1.FormGroup({
            nickName: new forms_1.FormControl(null, forms_1.Validators.required),
            firstName: new forms_1.FormControl(null, forms_1.Validators.required),
            lastName: new forms_1.FormControl(null, forms_1.Validators.required),
            email: new forms_1.FormControl(null, [
                forms_1.Validators.required,
                forms_1.Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
            ]),
            password: new forms_1.FormControl(null, forms_1.Validators.required)
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    core_1.Component({
        selector: 'pe-register',
        templateUrl: './views/componentViews/register.component.html'
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthService, router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map