System.register(["./../models"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var models_1;
    var Result;
    return {
        setters:[
            function (models_1_1) {
                models_1 = models_1_1;
            }],
        execute: function() {
            Result = (function () {
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
            exports_1("Result", Result);
        }
    }
});
//# sourceMappingURL=result.js.map