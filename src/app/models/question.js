"use strict";
var moment = require('moment/moment');
var jquery = require("jquery/dist/jquery.js");
var models_1 = require("./../models");
var Question = (function () {
    // この引数順序は絶対間違っていると思うｗ
    function Question(type, course, index) {
        if (type === void 0) { type = ""; }
        if (course === void 0) { course = undefined; }
        if (index === void 0) { index = undefined; }
        this.answers = [];
        this.references = [];
        this.config = new models_1.Config();
        this.type = type;
        this.course = course;
        this.index = index;
        this.answers = [];
        //this.answers.push(new Answer(this));
    }
    Question.prototype.textHtml = function () {
        return jquery(this.text).html();
    };
    Question.prototype.createdAt = function () {
        return moment(this.created_at * 1000).format("YYYY-MM-DD");
    };
    Question.prototype.updatedAt = function () {
        return moment(this.updated_at * 1000).format("YYYY-MM-DD");
    };
    Question.prototype.assignParams = function (params) {
        /**
         * データ設定
         * @type {string}
         */
        //this.id = params.course_id;
        //this.created_at = params.created_at;
        //this.updated_at = params.updated_at;
        var _this = this;
        /**
         * コンフィグ設定
         */
        if (params.config) {
            this.config.copy_forbidden = params.config.copy_forbidden;
            this.config.is_draft = params.config.is_draft;
            this.config.is_private = params.config.is_private;
        }
        //this.questions = params.questions;
        /**
         * Question設定
         */
        this.text = params.text;
        this.id = params.question_id;
        this.hint = params.hint;
        this.difficulty = params.difficulty;
        this.index = params.index;
        this.explanation = params.explanation;
        this.answers_count = params.answers_count;
        this.version = params.version;
        this.weight = params.weight;
        if (params.target_score) {
            this.targetScore = new models_1.Score();
            this.targetScore.max = params.target_score.max;
            this.targetScore.min = params.target_score.min;
            this.targetScore.raw = params.target_score.raw;
        }
        if (params.data) {
            this.memo = params.data.memo;
            this.forgetRate = params.data.forget_rate;
            this.recommendedScore = params.data.recommended_score;
        }
        if (params.config) {
            this.config.is_draft = params.config.is_draft;
            this.config.is_private = params.config.is_private;
            this.config.copy_forbidden = params.config.copy_forbidden;
        }
        // Answerの初期化
        this.answers = [];
        params.answers.forEach(function (ans, index) {
            var answer = new models_1.Answer(_this);
            answer.value = ans.value;
            answer.index = ans.index;
            answer.is_dummy = ans.is_dummy;
            // Answerそれぞれの Scoreの初期化
            answer.score = new models_1.Score();
            answer.score.max = ans.score.max || 100;
            answer.score.min = ans.score.min || 0;
            answer.score.raw = ans.score.raw;
            _this.answers.push(answer);
        });
        this.references = [];
        params.references.forEach(function (ref_params, index) {
            var reference = new models_1.Reference(ref_params.value, ref_params.reference_type, _this);
            _this.references.push(reference);
        });
    };
    return Question;
}());
exports.Question = Question;
//# sourceMappingURL=question.js.map