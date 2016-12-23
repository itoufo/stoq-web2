System.register(["./../models"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var models_1;
    var Answer;
    return {
        setters:[
            function (models_1_1) {
                models_1 = models_1_1;
            }],
        execute: function() {
            Answer = (function () {
                //public is_new: boolean = false;
                function Answer(question) {
                    this.delete_flag = false;
                    this.question = question;
                    this.score = new models_1.Score;
                    this.index = null;
                }
                return Answer;
            }());
            exports_1("Answer", Answer);
        }
    }
});
//# sourceMappingURL=answer.js.map