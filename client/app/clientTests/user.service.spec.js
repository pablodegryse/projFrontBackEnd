"use strict";
var _this = this;
var user_service_1 = require("../services/user.service");
var user_model_1 = require("../components/auth/user.model");
var testing_1 = require("@angular/core/testing");
var userMock_service_1 = require("./userMock.service");
describe('UserService test', function () {
    var userService;
    var http;
    var users;
    var user;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: user_service_1.UserService, useClass: userMock_service_1.userMockService }
            ]
        });
    });
    beforeEach(testing_1.inject([user_service_1.UserService], function (userService) {
        _this.userService = userService;
    }));
    it('should should be created', function () {
        expect(_this.userService).toBeTruthy();
    });
    it('should have "getUsers" function', function () {
        expect(_this.userService.getUsers).toBeTruthy();
    });
    it('should return Users', function () {
        _this.users = _this.userService.getUsers();
        expect(_this.users).isPrototypeOf(user_model_1.User);
    });
});
//# sourceMappingURL=user.service.spec.js.map