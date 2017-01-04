"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var jQuery, $ = require('jquery');
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var models_1 = require("./../../../models");
var GroupsFormComponent = (function () {
    function GroupsFormComponent(el, _logger, _loading, _api, _router, _error, _popup) {
        this.el = el;
        this._logger = _logger;
        this._loading = _loading;
        this._api = _api;
        this._router = _router;
        this._error = _error;
        this._popup = _popup;
        this.parent = null;
        this.showQuestion = true;
        this.questionLoading = false;
        this._logger.debug(" ***** Coustructor courses form component *****");
        this.group = new models_1.Group();
    }
    //@Output() startLoading = new EventEmitter();
    //@Output() endLoading = new EventEmitter();
    GroupsFormComponent.prototype.questionStartLoading = function () {
        this.questionLoading = true;
    };
    GroupsFormComponent.prototype.questionEndLoading = function () {
        this.questionLoading = false;
    };
    GroupsFormComponent.prototype.ngOnDestroy = function () {
    };
    GroupsFormComponent.prototype.ngOnInit = function () {
        this._logger.debug(" ***** ngOnInit courses form component *****");
        //this.startLoading.emit('event');
        this.startValidation();
    };
    GroupsFormComponent.prototype.ngAfterViewInit = function () {
        this._logger.debug(" **** course form ng after view init ");
        //this.endLoading.emit('event');
    };
    GroupsFormComponent.prototype.postCreateGroup = function () {
        var _this = this;
        this._logger.debug("****@@@@@@@@@@*******");
        this._loading.setCurtain();
        this._api.postCreateGroup(this.group, this.parent).subscribe(function (data) {
            var body = data.json();
            _this._logger.debug(data);
            _this._router.navigateByUrl('groups/' + body.data.group_id);
        }, function (err) {
            _this._error.errorInit(err);
            _this.popup.contentText = _this._error.errorText();
            _this.popup.headerText = "コース作成エラー";
            _this.popup.errorMessages = _this._error.errors();
            _this._popup.displayPopup(_this.popup);
            _this._loading.endLoading();
        }, function () {
            _this._logger.debug('create group success');
        });
    };
    GroupsFormComponent.prototype.postUpdateGroup = function () {
        var _this = this;
        this._logger.debug("****** postCreateCourse *****");
        this._logger.debug(this.group);
        this._loading.setCurtain();
        this._api.postEditGroup(this.group).subscribe(function (data) {
            var body = data.json();
            _this._logger.debug(data);
            _this._router.navigateByUrl('groups/' + _this.group.id + '/detail');
        }, function (err) {
            _this._popup.displayError(err, "グループ更新エラー");
            _this._loading.endLoading();
        }, function () {
            _this._loading.endLoading();
            _this._logger.debug('signup success');
        });
    };
    GroupsFormComponent.prototype.startValidation = function () {
        var formId = "#group_form";
        jQuery(formId).data('validator', null);
        jQuery(formId).unbind('validate');
        jQuery(formId).validate({
            rules: {
                name: {
                    required: true
                },
                group_code: {
                    required: true
                }
            },
            messages: {
                name: {
                    required: "グループ名を入力して下さい"
                },
                group_code: {
                    required: "グループコードを入力してください。"
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
    GroupsFormComponent.prototype.submitFunction = function () {
        console.log(this.group);
        if (this.group.id) {
            this.postUpdateGroup();
        }
        else {
            this.postCreateGroup();
        }
    };
    GroupsFormComponent = __decorate([
        core_1.Component({
            selector: 'groups-form',
            templateUrl: './form.component.html',
            styleUrls: ['./form.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.PopupService,
                services_1.LoadingService,
            ],
            inputs: ['parent', 'group', 'popup']
        })
    ], GroupsFormComponent);
    return GroupsFormComponent;
}());
exports.GroupsFormComponent = GroupsFormComponent;
//# sourceMappingURL=form.component.js.map