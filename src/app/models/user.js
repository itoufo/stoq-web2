"use strict";
var User = (function () {
    function User(params) {
        if (params) {
            this.id = params.id;
            this.uid = params.uid;
            this.email = params.email;
            this.role = params.role;
        }
    }
    User.prototype.assignParams = function (params) {
        this.id = params.id;
        this.uid = params.uid;
        this.email = params.email;
    };
    return User;
}());
exports.User = User;
//# sourceMappingURL=user.js.map