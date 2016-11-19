"use strict";
var User = (function () {
    function User(email, password, nickName, firstName, lastName, roomId) {
        this.email = email;
        this.password = password;
        this.nickName = nickName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roomId = roomId;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map