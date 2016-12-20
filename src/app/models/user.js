System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var User;
    return {
        setters:[],
        execute: function() {
            User = (function () {
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
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map