"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var models_1 = require("./../../../models");
var CoursesShowComponent = (function () {
    function CoursesShowComponent(route, _router, _api, _activity, _logger, _loading, _auth, _error, _popup) {
        this.route = route;
        this._router = _router;
        this._api = _api;
        this._activity = _activity;
        this._logger = _logger;
        this._loading = _loading;
        this._auth = _auth;
        this._error = _error;
        this._popup = _popup;
        this.loading = true;
        this.loading = true;
    }
    CoursesShowComponent.prototype.AddQuestion = function () {
        this._router.navigate(['add_question'], { relativeTo: this.route });
    };
    CoursesShowComponent.prototype.Edit = function () {
        this._loading.setCurtain();
        this._router.navigate(['edit'], { relativeTo: this.route });
    };
    CoursesShowComponent.prototype.Start = function () {
        var _this = this;
        this._loading.setCurtain();
        this._api.getTrainingStart(this.course.id).subscribe(function (data) {
            var body = data.json();
            _this._logger.debug("response data");
            _this._logger.debug(body.data);
            if (body.data.activity.questions_count <= 0) {
                var popup = new models_1.PopupBase();
                // ヘッダの値を設定
                popup.headerText = "Error!";
                popup.contentText = "Questionが設定されていません";
                popup.id = "#modal3";
                _this._popup.displayPopup(popup);
            }
            else {
                _this._activity.setActivity('training', body.data);
                _this._logger.debug('get training');
                _this._router.navigate(['entry', 'training']);
            }
        }, function (err) {
            // 共通処理, _error初期化
            _this._popup.displayError(err, "Error!");
            //
            // ロード終了
            _this._loading.endLoading();
        }, function () {
            _this._loading.endLoading();
            _this._logger.debug('get start training success');
        });
    };
    CoursesShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._logger.debug(" ***** oninit course detail ***** ");
        this._loading.startLoading();
        var course_id = "";
        this.route.params.forEach(function (params) {
            course_id = params['course_id']; // (+) converts string 'id' to a number
        });
        this._api.getCourse(course_id).subscribe(function (data) {
            var body = data.json();
            _this.course = new models_1.Course();
            _this._logger.debug(" ****** course data fetched ******* ");
            _this._logger.debug(data);
            _this.course.assignParams(body.data);
            _this._logger.debug("****** this course *****");
            _this._logger.debug(_this.course);
        }, function (err) {
            // 共通処理, _error初期化
            _this._error.errorInit(err);
            _this._error.showError();
            _this._popup.displayError(err, "Error!");
            // ロード終了
            _this._loading.endLoading();
            _this.loading = false;
        }, function () {
            _this._loading.endLoading();
            _this._logger.debug('get course success');
            _this.loading = false;
        });
    };
    CoursesShowComponent.prototype.deleteQuestion = function (question) {
        this._selectedQuestion = question;
        var popup = new models_1.PopupBase();
        popup.id = "#modal4";
        popup.contentText = question.text + "を削除してよろしいですか？";
        popup.headerText = "確認";
        popup.okFunction = this._deleteQuestion.bind(this);
        popup.cancelFunction = function () { };
        this._popup.displayPopup(popup);
    };
    CoursesShowComponent.prototype._deleteQuestion = function () {
        var _this = this;
        var index = this.course.questions.indexOf(this._selectedQuestion);
        this._loading.startLoading();
        this._api.deleteCourseQuestion(this.course, this._selectedQuestion).subscribe(function (data) {
            /**
             * TODO: 処理実装
             */
            _this.course.questions.splice(index, 1);
        }, function (err) {
            _this._error.errorInit(err);
            _this._popup.displayError(err, "Error");
        }, function () {
            _this._logger.debug('delete courses success');
            _this._loading.endLoading();
        });
    };
    CoursesShowComponent.prototype.moveAnalyze = function (question_id) {
        this._router.navigate(['question', 'analyze', question_id]);
    };
    CoursesShowComponent = __decorate([
        core_1.Component({
            selector: 'courses-show',
            templateUrl: './show.component.html',
            styleUrls: ['./show.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.ActivityService,
                services_1.LoggerService,
                services_1.PopupService
            ]
        })
    ], CoursesShowComponent);
    return CoursesShowComponent;
}());
exports.CoursesShowComponent = CoursesShowComponent;
//# sourceMappingURL=show.component.js.map