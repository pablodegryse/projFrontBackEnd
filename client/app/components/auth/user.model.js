"use strict";
var User = (function () {
    function User(email, password, nickName, firstName, lastName, points, userId, friends, roomId) {
        this.email = email;
        this.password = password;
        this.nickName = nickName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.points = points;
        this.userId = userId;
        this.friends = friends;
        this.roomId = roomId;
    }
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.model.js.map