"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var jQuery = require('jquery');
var jquery = jQuery;
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var models_1 = require("./../../../models");
var CoursesFormComponent = (function () {
    function CoursesFormComponent(el, _logger, _loading, _api, _router, _error, _popup) {
        this.el = el;
        this._logger = _logger;
        this._loading = _loading;
        this._api = _api;
        this._router = _router;
        this._error = _error;
        this._popup = _popup;
        this.courseTypes = [{ value: 'training', name: "トレーニング" }, { value: 'test', name: 'テスト' }];
        this.questionAttributeTypes = [{ value: 'select', name: '選択問題' }, { value: 'input', name: '穴埋め問題' }, { value: 'lecture', name: '講義資料' }];
        this.random = Math.floor(Math.random() * 10000000);
        this.selectedIndex = -1;
        this.showQuestion = true;
        this.questionLoading = false;
        this._logger.debug(" ***** Coustructor courses form component *****");
    }
    //@Output() startLoading = new EventEmitter();
    //@Output() endLoading = new EventEmitter();
    CoursesFormComponent.prototype.questionStartLoading = function () {
        this.questionLoading = true;
    };
    CoursesFormComponent.prototype.questionEndLoading = function () {
        this.questionLoading = false;
    };
    CoursesFormComponent.prototype.courseConfig = function () {
        this.selectedIndex = -1;
        this._tab.tabs('select_tab', 'tab1');
    };
    CoursesFormComponent.prototype.tabQuestions = function () {
        this._tab.tabs('select_tab', 'tab2');
        if (this.selectedIndex == -1) {
            this.selectedIndex = 1;
        }
    };
    CoursesFormComponent.prototype.setCourse = function (course) {
        this.course = course;
    };
    CoursesFormComponent.prototype.createQuestion = function () {
        this._logger.debug("question INDEX = " + this.course.questions.length);
        this.questionStartLoading();
        this.course.questions.push(new models_1.Question("", this.course, this.course.questions.length + 1));
    };
    CoursesFormComponent.prototype.selectQuestionIndex = function (i) {
        this.selectedIndex = i;
    };
    CoursesFormComponent.prototype.selectQuestion = function (e, i) {
        this._tab.tabs('select_tab', 'tab2');
        this.selectedIndex = i;
    };
    CoursesFormComponent.prototype.ngOnDestroy = function () {
    };
    CoursesFormComponent.prototype.ngOnInit = function () {
        this._logger.debug(" ***** ngOnInit courses form component *****");
        //this.startLoading.emit('event');
        //
        this.startValidation();
        // TODO: 発火タイミングをもっといい感じにできる気がする。
        // TODO: と言うか、このタイミングだと発火しそこねる気がする。
        jquery(this.el.nativeElement).find('.collapsible')
            .each(function (i) {
            jQuery(this).collapsible({ accordion: false });
        });
        this._tab = jQuery(this.el.nativeElement).find('ul.tabs').tabs();
        this._tab.tabs('select_tab', 'tab1');
        // エディタの起動を早くするために、最初に一度読み込んでおく
        // 多分..有効だと思う
        //tinymce.init({});
    };
    CoursesFormComponent.prototype.ngAfterViewInit = function () {
        this._logger.debug(" **** course form ng after view init ");
        //this.endLoading.emit('event');
    };
    CoursesFormComponent.prototype.postCreateCourse = function () {
        var _this = this;
        this._logger.debug("***********");
        this._loading.setCurtain();
        this._api.postCreateCourse(this.course).subscribe(function (data) {
            var body = data.json();
            _this._logger.debug(data);
            _this.course = new models_1.Course();
            _this.course.assignParams(body.data);
            //this._router.navigateByUrl('courses/' + data.data.course_id);
        }, function (err) {
            _this._error.errorInit(err);
            /**
             * Popup 作成処理
             * popup.id は親Componentで定義しといてもらう
             * @type {string}
             */
            _this.popup.headerText = "コース作成エラー";
            _this.popup.errorMessages = _this._error.errors();
            //
            //this.popup.errorMessages.forEach( (errorMessage: ErrorMessage) => {
            //  errorMessage.paramsArray().forEach( (param: string) =>{
            //    console.log(param);
            //    console.log(this._error.replaceParam(param))
            //  })
            //});
            _this._popup.displayPopup(_this.popup);
            _this._loading.endLoading();
        }, function () {
            setTimeout(function () {
                jQuery(_this.el.nativeElement).find('ul.tabs').tabs('select_tab', 'tab2');
            }, 0);
            _this._loading.endLoading();
            _this._logger.debug('signup success');
        });
    };
    CoursesFormComponent.prototype.postUpdateCourse = function () {
        var _this = this;
        this._logger.debug("****** postCreateCourse *****");
        this._logger.debug(this.course);
        this._loading.setCurtain();
        this._api.postEditCourse(this.course).subscribe(function (data) {
            var body = data.json();
            _this._logger.debug(data);
            _this._router.navigateByUrl('courses/' + body.data.course_id);
        }, function (err) {
            _this._popup.displayError(err, "コース更新エラー");
            _this._loading.endLoading();
        }, function () {
            _this._loading.endLoading();
            _this._logger.debug('signup success');
        });
    };
    CoursesFormComponent.prototype.startValidation = function () {
        var formId = "#course_form";
        jquery(formId).data('validator', null);
        jquery(formId).unbind('validate');
        jquery(formId).validate({
            rules: {
                name: {
                    required: true
                },
                course_type: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "コース名を入力して下さい"
                },
                course_type: {
                    required: "コース形式を選択して下さい"
                }
            },
            errorElement: 'div',
            errorPlacement: function (error, element) {
                var placement = jQuery(element).data('error');
                if (placement) {
                    jQuery(placement).append(error);
                }
                else {
                    error.insertAfter(element);
                }
            },
            submitHandler: this.submitFunction.bind(this)
        });
    };
    CoursesFormComponent.prototype.submitFunction = function () {
        console.log(this.course);
        if (this.course.id) {
            this.postUpdateCourse();
        }
        else {
            this.postCreateCourse();
        }
    };
    CoursesFormComponent = __decorate([
        core_1.Component({
            selector: 'courses-form',
            templateUrl: './form.component.html',
            styleUrls: ['./form.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.PopupService,
                services_1.LoadingService,
            ],
            inputs: ['course', 'popup', 'showQuestion']
        })
    ], CoursesFormComponent);
    return CoursesFormComponent;
}());
exports.CoursesFormComponent = CoursesFormComponent;
//# sourceMappingURL=form.component.js.map