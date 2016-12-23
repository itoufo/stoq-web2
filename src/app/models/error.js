System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ErrorMessage;
    return {
        setters:[],
        execute: function() {
            // バリデーション関連 errorMessage
            ErrorMessage = (function () {
                function ErrorMessage(error) {
                    this._params = error.params;
                    this._message = error.messages;
                    this._code = error.code;
                }
                ErrorMessage.prototype.params = function (separator) {
                    if (separator === void 0) { separator = ", "; }
                    if (this._params == null) {
                        return null;
                    }
                    return this._params.join(separator);
                };
                ErrorMessage.prototype.paramsArray = function () {
                    return this._params;
                };
                ErrorMessage.prototype.messagesArray = function () {
                    return this._message;
                };
                ErrorMessage.prototype.messages = function (separator) {
                    if (separator === void 0) { separator = ", "; }
                    if (this._message == null) {
                        return null;
                    }
                    return this._message.join(separator);
                };
                return ErrorMessage;
            }());
            exports_1("ErrorMessage", ErrorMessage);
        }
    }
});
//# sourceMappingURL=error.js.map