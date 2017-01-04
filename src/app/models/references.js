"use strict";
var Reference = (function () {
    function Reference(value, reference_type, question, id) {
        if (reference_type === void 0) { reference_type = "text"; }
        if (question === void 0) { question = undefined; }
        if (id === void 0) { id = undefined; }
        this.value = value;
        this.reference_type = reference_type;
        this.question = question;
        this.id = id;
    }
    return Reference;
}());
exports.Reference = Reference;
;
//# sourceMappingURL=references.js.map