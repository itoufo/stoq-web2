"use strict";
// var jQuery, $ = require('jquery');
// var moment = require('moment');
var moment = require('moment/moment');
var models_1 = require("./../models");
var Course = (function () {
    function Course(name, description, course_type, questions) {
        if (name === void 0) { name = ""; }
        if (description === void 0) { description = ""; }
        if (course_type === void 0) { course_type = ""; }
        if (questions === void 0) { questions = []; }
        this.questions = [];
        this.config = new models_1.Config();
        this._isValid = false;
        this.name = name;
        this.description = description;
        this.course_type = course_type;
        this.questions = questions;
        this.userData = {};
    }
    Course.prototype.miniId = function () {
        return this.id.replace(/-.*/, "");
    };
    Course.prototype.isValid = function () {
        return (this.id && this.name && this.course_type);
    };
    Course.prototype.createdAt = function () {
        return moment(this.created_at * 1000).format("YYYY.MM.DD");
    };
    Course.prototype.updatedAt = function () {
        return moment(this.updated_at * 1000).format("YYYY.MM.DD");
    };
    Course.prototype.assignParams = function (params) {
        var _this = this;
        /**
         * データ設定
         * @type {string}
         */
        this.id = params.course_id;
        this.name = params.name;
        this.description = params.description;
        this.course_type = params.course_type;
        this.times = params.times;
        this.questions_count = params.questions_count;
        this.updated_at = params.updated_at;
        this.created_at = params.created_at;
        this.userData = {
            memo: params.data.memo,
            permission: params.data.permission
        };
        /**
         * コンフィグ設定
         */
        if (params.config) {
            this.config.copy_forbidden = params.config.copy_forbidden;
            this.config.is_draft = params.config.is_draft;
            this.config.is_private = params.config.is_private;
            this.config.allow_show_answer = params.config.allow_show_answer;
            this.config.allow_show_score = params.config.allow_show_score;
            this.config.auto_weigh = params.config.auto_weigh;
        }
        //this.questions = params.questions;
        /**
         * Question設定
         */
        params.questions.forEach(function (data, index) {
            var question = new models_1.Question(data.question_type, _this);
            question.text = data.text;
            question.id = data.question_id;
            question.hint = data.hint;
            question.difficulty = data.difficulty;
            question.index = data.index;
            question.explanation = data.explanation;
            question.answers_count = data.answers_count;
            question.version = data.version;
            question.weight = data.weight;
            if (data.target_score) {
                question.targetScore = new models_1.Score();
                question.targetScore.max = data.target_score.max;
                question.targetScore.min = data.target_score.min;
                question.targetScore.raw = data.target_score.raw;
            }
            if (data.data) {
                question.memo = data.data.memo;
                question.forgetRate = data.forget_rate;
                question.recommendedScore = data.recommended_score;
            }
            if (data.config) {
                question.config.allow_show_answer = data.config.allow_show_answer;
                question.config.allow_show_score = data.config.allow_show_score;
                question.config.is_draft = data.config.is_draft;
                question.config.is_private = data.config.is_private;
                question.config.copy_forbidden = data.config.copy_forbidden;
                question.config.auto_weigh = data.config.auto_weigh;
            }
            // Answerの初期化
            question.answers = [];
            data.answers.forEach(function (ans, index) {
                var answer = new models_1.Answer(question);
                answer.value = ans.value;
                answer.index = ans.index;
                answer.is_dummy = ans.is_dummy;
                // Answerそれぞれの Scoreの初期化
                answer.score = new models_1.Score();
                answer.score.max = ans.score.max || 100;
                answer.score.min = ans.score.min || 0;
                answer.score.raw = ans.score.raw;
                question.answers.push(answer);
            });
            _this.questions.push(question);
        });
    };
    return Course;
}());
exports.Course = Course;
//# sourceMappingURL=course.js.map