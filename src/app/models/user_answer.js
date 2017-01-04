"use strict";
var models_1 = require("./../models");
var UserAnswer = (function () {
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
exports.UserAnswer = UserAnswer;
//# sourceMappingURL=user_answer.js.map