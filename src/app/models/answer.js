"use strict";
var models_1 = require("./../models");
var Answer = (function () {
    //public is_new: boolean = false;
    function Answer(question) {
        this.delete_flag = false;
        this.question = question;
        this.score = new models_1.Score;
        this.index = null;
    }
    return Answer;
}());
exports.Answer = Answer;
//# sourceMappingURL=answer.js.map