"use strict";
var Message = (function () {
    function Message(content, username, messageId, userId) {
        this.content = content;
        this.username = username;
        this.messageId = messageId;
        this.userId = userId;
    }
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message.model.js.map