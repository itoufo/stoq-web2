System.register(["./../models"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var models_1;
    var UserAnswer;
    return {
        setters:[
            function (models_1_1) {
                models_1 = models_1_1;
            }],
        execute: function() {
            UserAnswer = (function () {
                function UserAnswer() {
                }
                UserAnswer.prototype.assignParams = function (params) {
                    if (params.answered_time) {
                        this.answered_time = params.answered_time;
                    }
                    if (params.relative_score) {
                        this.relative_score = params.relative_score;
                    }
                    if (params.result) {
                        this.result = new models_1.Result();
                        this.result.assignParams(params.result);
                    }
                    if (params.value) {
                        this.value = params.value;
                    }
                };
                return UserAnswer;
            }());
            exports_1("UserAnswer", UserAnswer);
        }
    }
});
//# sourceMappingURL=user_answer.js.map