"use strict";
var _this = this;
var register_component_1 = require("../components/auth/register.component");
var testing_1 = require("@angular/core/testing");
var forms_1 = require("@angular/forms");
var auth_service_1 = require("../services/auth.service");
var authMock_service_1 = require("./authMock.service");
var testing_2 = require("@angular/router/testing");
var user_model_1 = require("../components/auth/user.model");
describe('RegisterComponent', function () {
    var authService;
    var comp;
    var fixture;
    var isLoggedIn;
    var user;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [register_component_1.RegisterComponent],
            imports: [forms_1.ReactiveFormsModule, testing_2.RouterTestingModule],
            providers: [{ provide: auth_service_1.AuthService, useClass: authMock_service_1.authMockService }]
        });
        testing_1.TestBed.compileComponents();
    }));
    beforeEach(testing_1.inject([auth_service_1.AuthService], function (authService) {
        _this.authService = authService;
    }));
    it('should be created', function () {
        fixture = testing_1.TestBed.createComponent(register_component_1.RegisterComponent);
        comp = fixture.componentInstance;
        expect(comp).toBeTruthy();
    });
    it('should login user on signup', function () {
        fixture = testing_1.TestBed.createComponent(register_component_1.RegisterComponent);
        comp = fixture.componentInstance;
        _this.isLoggedIn = _this.authService.signIn('John');
        expect(_this.isLoggedIn).toBeTruthy();
    });
    it('should make a new user when submitting the form', function () {
        _this.user = _this.authService.onSubmit();
        expect(_this.user).isPrototypeOf(user_model_1.User);
    });
    it('user should be "online" when submitting', function () {
        _this.user = _this.authService.onSubmit();
        expect(_this.user.status).toContain('online');
    });
});
//# sourceMappingURL=register.component.spec.js.map