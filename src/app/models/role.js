"use strict";
var Role = (function () {
    function Role(name) {
        if (name === void 0) { name = null; }
        this.name = name;
    }
    Role.prototype.assignParams = function (params) {
        this.name = params.name;
    };
    return Role;
}());
exports.Role = Role;
//# sourceMappingURL=role.js.map