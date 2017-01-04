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
var CoursesAddQuestionComponent = (function () {
    //@Output() startLoading = new EventEmitter();
    //@Output() endLoading = new EventEmitter();
    function CoursesAddQuestionComponent(route, _router, _api, _auth, _logger, _loading, _error, _popup) {
        this.route = route;
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this._logger = _logger;
        this._loading = _loading;
        this._error = _error;
        this._popup = _popup;
        //public modal_id: string = "new-course-modal";
        this.modal_id = "modal3";
        // TODO: 共通化
        this.questionAttributeTypes = [{ value: 'select', name: '選択問題' }, { value: 'input', name: '穴埋め問題' }, { value: 'lecture', name: '講義資料' }];
        this._logger.debug(" ***** constructor course new ***** ");
        this.course = new models_1.Course();
        // Load開始
        //this.startLoading.emit('event');
        this._loading.startLoading();
        console.log(this._loading.isLoading());
    }
    CoursesAddQuestionComponent.prototype.courseStartLoading = function () {
        this._logger.debug('course Start Loading called!!! ');
        this._questionLoading = true;
    };
    CoursesAddQuestionComponent.prototype.courseEndLoading = function () {
        this._logger.debug('course End Loading called!!! ');
        this._questionLoading = false;
    };
    CoursesAddQuestionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._logger.debug(" ***** OnInit Course Edit ");
        this._courseLoading = true;
        this._loading.startLoading();
        var course_id = "";
        this.route.params.forEach(function (params) {
            var course_id = +params['course_id']; // (+) converts string 'id' to a number
        });
        this._api.getCourse(course_id).subscribe(function (data) {
            var body = data.json();
            _this.course = new models_1.Course();
            _this.question = new models_1.Question("", _this.course, _this.course.questions.length);
            _this._logger.debug(" ****** course data fetched ******* ");
            _this._logger.debug(data);
            var obj = body.data;
            _this.course.assignParams(body.data);
            _this._logger.debug("****** this course *****");
            _this._logger.debug(_this.course);
        }, function (err) {
            var err_json = JSON.parse(err._body);
            // 共通処理, _error初期化
            _this._error.errorInit(err);
            // ロード終了
            _this._loading.endLoading();
            _this._courseLoading = false;
        }, function () {
            _this._loading.endLoading();
            _this._courseLoading = false;
            _this._logger.debug('get course success');
        });
    };
    CoursesAddQuestionComponent.prototype.ngAfterViewInit = function () {
        this._logger.debug(" ***** oninit course AfterViewInit ***** ");
        console.log(this._loading.isLoading());
        this._loading.endLoading();
    };
    CoursesAddQuestionComponent.prototype.postAddQuestion = function () {
        var _this = this;
        this._logger.debug("***********");
        this._loading.setCurtain();
        this._courseLoading = true;
        this._api.postAddQuestion(this.course, this.question).subscribe(function (data) {
            _this._logger.debug(data);
            _this._router.navigateByUrl('courses/' + _this.course.id);
        }, function (err) {
            _this._error.errorInit(err);
            /**
             * Popup 作成処理
             * @type {PopupBase}
             */
            var popup = new models_1.PopupBase();
            popup.errorMessages = _this._error.errors();
            popup.contentText = _this._error.errorText();
            popup.headerText = "コース作成エラー";
            popup.id = "#modal3";
            _this._popup.displayPopup(popup);
            _this._loading.endLoading();
            _this._courseLoading = false;
        }, function () {
            _this._logger.debug('signup success');
            _this._courseLoading = false;
        });
    };
    CoursesAddQuestionComponent = __decorate([
        core_1.Component({
            selector: 'courses-new',
            templateUrl: './addQuestion.component.html',
            styleUrls: ['./addQuestion.component.scss'],
            inputs: [
                "selected_question_type"
            ],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.LoadingService,
                services_1.PopupService,
            ]
        })
    ], CoursesAddQuestionComponent);
    return CoursesAddQuestionComponent;
}());
exports.CoursesAddQuestionComponent = CoursesAddQuestionComponent;
//# sourceMappingURL=addQuestion.component.js.map