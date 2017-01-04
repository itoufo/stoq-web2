"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var jquery = require('jquery');
require('../../../../js/materialize-plugins/leanModal.js');
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var models_1 = require("./../../../models");
var CoursesNewComponent = (function () {
    //@Output() startLoading = new EventEmitter();
    //@Output() endLoading = new EventEmitter();
    function CoursesNewComponent(route, _router, _api, _auth, _logger, _loading, _error, _popup) {
        this.route = route;
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this._logger = _logger;
        this._loading = _loading;
        this._error = _error;
        this._popup = _popup;
        // ポップアップ用
        this.popup = new models_1.PopupBase();
        //
        //public modal_id: string = "new-course-modal";
        this.modal_id = "modal3";
        this._logger.debug(" ***** constructor course new ***** ");
        this.course = new models_1.Course();
        //this.course.questions.push(new Question("", this.course, 0));
        // Load開始
        //this.startLoading.emit('event');
        this._loading.startLoading();
    }
    CoursesNewComponent.prototype.courseStartLoading = function () {
        this._logger.debug('course Start Loading called!!! ');
        this._courseLoading = true;
    };
    CoursesNewComponent.prototype.courseEndLoading = function () {
        this._logger.debug('course End Loading called!!! ');
        this._courseLoading = false;
    };
    CoursesNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._logger.debug(" ***** oninit course new ***** ");
        // POPUPのデザインを選択
        this.popup.id = "#modal3";
        jquery("form").unbind('submit');
        jquery('.modal-trigger').unbind('click');
        jquery('.modal-trigger').leanModal({
            dismissible: true,
            opacity: .5,
            in_duration: 300,
            out_duration: 200,
            ready: function () {
                //alert('Ready');
            },
            complete: function () {
                //alert('Closed');
            } // Callback for Modal close
        });
        this.route.params.forEach(function (params) {
            _this.parent_id = params['parent_id'];
        });
    };
    CoursesNewComponent.prototype.ngAfterViewInit = function () {
        this._logger.debug(" ***** oninit course AfterViewInit ***** ");
        console.log(this._loading.isLoading());
        this._loading.endLoading();
    };
    CoursesNewComponent.prototype.postCreateCourse = function () {
        var _this = this;
        this._logger.debug("***********");
        this._loading.setCurtain();
        this._courseLoading = true;
        this._api.postCreateCourse(this.course).subscribe(function (data) {
            var body = data.json();
            _this._logger.debug(data);
            _this._router.navigateByUrl('courses/' + body.data.course_id);
        }, function (err) {
            _this._error.errorInit(err);
            _this.popup.contentText = _this._error.errorText();
            _this.popup.headerText = "コース作成エラー";
            _this.popup.errorMessages = _this._error.errors();
            _this._popup.displayPopup(_this.popup);
            _this._loading.endLoading();
            _this._courseLoading = false;
        }, function () {
            _this._logger.debug('signup success');
            _this._courseLoading = false;
        });
    };
    CoursesNewComponent = __decorate([
        core_1.Component({
            selector: 'courses-new',
            templateUrl: './new.component.html',
            styleUrls: ['./new.component.scss'],
            inputs: ["selected_question_type"],
            providers: [
                services_1.PopupService,
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.LoadingService,
            ]
        })
    ], CoursesNewComponent);
    return CoursesNewComponent;
}());
exports.CoursesNewComponent = CoursesNewComponent;
//# sourceMappingURL=new.component.js.map