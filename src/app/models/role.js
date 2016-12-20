System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Role;
    return {
        setters:[],
        execute: function() {
            Role = (function () {
                function Role(name) {
                    if (name === void 0) { name = null; }
                    this.name = name;
                }
                Role.prototype.assignParams = function (params) {
                    this.name = params.name;
                };
                return Role;
            }());
            exports_1("Role", Role);
        }
    }
});
//# sourceMappingURL=role.js.map