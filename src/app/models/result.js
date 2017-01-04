"use strict";
var models_1 = require("./../models");
var Result = (function () {
    function Result() {
    }
    Result.prototype.init = function (targetScore, userScore, userAnswer) {
    };
    Result.prototype.assignParams = function (params) {
        this.completion = params.completion;
        this.duration = params.duration;
        this.success = params.success;
        this.score = new models_1.Score();
        this.score.max = params.score.max;
        this.score.min = params.score.min;
        this.score.raw = params.score.raw;
    };
    return Result;
}());
exports.Result = Result;
//# sourceMappingURL=result.js.map