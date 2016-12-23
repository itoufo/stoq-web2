System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var PopupBase;
    return {
        setters:[],
        execute: function() {
            PopupBase = (function () {
                function PopupBase() {
                    this.contentColor = "teal";
                    this.okFunction = function () { };
                    this.cancelFunction = function () { };
                }
                return PopupBase;
            }());
            exports_1("PopupBase", PopupBase);
        }
    }
});
//# sourceMappingURL=popup.js.map