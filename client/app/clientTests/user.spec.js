"use strict";
var user_model_1 = require('../components/auth/user.model');
describe('UserModel testing', function () {
    var user;
    beforeEach(function () {
        user = new user_model_1.User('test@test.test', 'test', 'test1', 'test1Fn', 'test1Ln', 0, '', 'online', [], '');
    });
    it('should have an email property', function () {
        expect(user.email).toBeTruthy();
    });
    it('should take atleast 2 properties', function () {
        expect(user.constructor.length).toBeGreaterThan(2);
    });
});
//# sourceMappingURL=user.spec.js.map