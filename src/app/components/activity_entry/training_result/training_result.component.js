"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('jquery');
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var models_1 = require("../../../models");
var TrainingResultComponent = (function () {
    function TrainingResultComponent(route, _router, _api, _activity, _auth, _logger, _error, _loading, _popup) {
        this.route = route;
        this._router = _router;
        this._api = _api;
        this._activity = _activity;
        this._auth = _auth;
        this._logger = _logger;
        this._error = _error;
        this._loading = _loading;
        this._popup = _popup;
        this.user_answers = [];
        this.training_result = new models_1.Result();
        this._loading.setCurtain();
    }
    TrainingResultComponent.prototype.ngOnInit = function () {
        var _this = this;
        // this._entry_id = this.routeParam.params['entry_id'];
        this.route.params.forEach(function (params) {
            _this._entry_id = params['entry_id']; // (+) converts string 'id' to a number
        });
        this._loading.setCurtain();
        this._api.getTrainingResults(this._entry_id).subscribe(function (data) {
            var body = data.json();
            _this._logger.debug(body);
            _this._logger.debug(_this.training_result);
            _this.training_result.assignParams(body.data.result);
            var answers = body.data.answers;
            answers.sort(function (a, b) {
                if (a.question.index < b.question.index)
                    return -1;
                if (a.question.index > b.question.index)
                    return 1;
                return 0;
            });
            answers.forEach(function (answer) {
                var question = new models_1.Question();
                question.assignParams(answer.question);
                var ua = new models_1.UserAnswer();
                console.log("@@@@@@@@@");
                console.log("@@@@@@@@@");
                console.log(answer);
                ua.assignParams(answer.user_answer);
                ua.question = question;
                _this.user_answers.push(ua);
                console.log(_this.user_answers);
            });
            // 結果描写画面に移動
        }, function (err) {
            _this._error.errorInit(err);
            _this._popup.displayError(err, "Error!");
        }, function () {
            setTimeout(function () {
                console.log("load Collapsible!!!!");
                jQuery(".collapsible").collapsible({ accordion: true });
            }, 0);
            _this._loading.endLoading();
        });
    };
    TrainingResultComponent.prototype.progressBarWidth = function () {
        return "width: " + this.training_result.score.raw / this.training_result.score.max * 100 + "%;";
    };
    TrainingResultComponent = __decorate([
        core_1.Component({
            selector: 'courses-show',
            templateUrl: './training_result.component.html',
            styleUrls: ['./training_result.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.ActivityService,
                services_1.LoggerService,
                services_1.PopupService,
            ]
        })
    ], TrainingResultComponent);
    return TrainingResultComponent;
}());
exports.TrainingResultComponent = TrainingResultComponent;
//# sourceMappingURL=training_result.component.js.map