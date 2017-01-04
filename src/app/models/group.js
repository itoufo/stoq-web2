"use strict";
var models_1 = require("./../models");
var Group = (function () {
    function Group() {
        this.users = [];
    }
    Group.prototype.assignParams = function (params) {
        this.id = params.group_id;
        this.name = params.name;
        this.group_code = params.group_code;
        this.description = params.description;
        this.role_name = params.role.name;
        var that = this;
        params.group_users.forEach(function (user) {
            that.users.push(new models_1.User(user));
        });
    };
    return Group;
}());
exports.Group = Group;
//# sourceMappingURL=group.js.map