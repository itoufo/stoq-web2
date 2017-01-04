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
var CoursesEditComponent = (function () {
    //@Output() startLoading = new EventEmitter();
    //@Output() endLoading = new EventEmitter();
    function CoursesEditComponent(route, _router, _api, _auth, _logger, _loading, _error, _popup) {
        this.route = route;
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this._logger = _logger;
        this._loading = _loading;
        this._error = _error;
        this._popup = _popup;
        // ポップアップ用
        this.loading = true;
        //public modal_id: string = "new-course-modal";
        this.modal_id = "modal3";
        this._logger.debug(" ***** constructor course new ***** ");
        this.course = new models_1.Course();
        // Load開始
        //this.startLoading.emit('event');
        this._loading.startLoading();
        console.log(this._loading.isLoading());
    }
    CoursesEditComponent.prototype.courseStartLoading = function () {
        this._logger.debug('course Start Loading called!!! ');
        this._courseLoading = true;
    };
    CoursesEditComponent.prototype.courseEndLoading = function () {
        this._logger.debug('course End Loading called!!! ');
        this._courseLoading = false;
    };
    CoursesEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._logger.debug(" ***** OnInit Course Edit ");
        this.loading = true;
        this._loading.startLoading();
        this.route.params.forEach(function (params) {
            var id = params['course_id']; // (+) converts string 'id' to a number
            _this._api.getCourse(id).subscribe(function (data) {
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
                // ロード終了
                _this._loading.endLoading();
                _this.loading = false;
            }, function () {
                _this._loading.endLoading();
                _this.loading = false;
                _this._logger.debug('get course success');
            });
        });
    };
    CoursesEditComponent.prototype.ngAfterViewInit = function () {
        this._logger.debug(" ***** oninit course AfterViewInit ***** ");
        console.log(this._loading.isLoading());
    };
    CoursesEditComponent.prototype.postEditCourse = function () {
        var _this = this;
        this._logger.debug("***** postEditCourse ******");
        this._logger.debug(this.course);
        this._loading.setCurtain();
        this._courseLoading = true;
        this._api.postEditCourse(this.course).subscribe(function (data) {
            var body = data.json();
            _this._logger.debug(body);
            _this._router.navigateByUrl('courses/' + body.data.course_id);
        }, function (err) {
            _this._popup.displayError(err, "コース更新エラー");
            _this._loading.endLoading();
            _this._courseLoading = false;
        }, function () {
            _this._loading.endLoading();
            _this._logger.debug('signup success');
            _this._courseLoading = false;
        });
    };
    CoursesEditComponent = __decorate([
        core_1.Component({
            selector: 'courses-new',
            templateUrl: './edit.component.html',
            styleUrls: ['./edit.component.scss'],
            inputs: ["selected_question_type"],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.LoadingService,
                services_1.PopupService,
            ]
        })
    ], CoursesEditComponent);
    return CoursesEditComponent;
}());
exports.CoursesEditComponent = CoursesEditComponent;
//# sourceMappingURL=edit.component.js.map