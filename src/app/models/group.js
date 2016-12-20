System.register(["./../models"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var models_1;
    var Group;
    return {
        setters:[
            function (models_1_1) {
                models_1 = models_1_1;
            }],
        execute: function() {
            Group = (function () {
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
            exports_1("Group", Group);
        }
    }
});
//# sourceMappingURL=group.js.map