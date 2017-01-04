"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var jquery = require('jquery');
/// <reference path="../../../../../node_modules/@types/jquery.validation/index.d.ts" />
require('jquery-validation');
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var models_1 = require("./../../../models");
var ResetPasswordComponent = (function () {
    function ResetPasswordComponent(_router, _api, _auth, _error, _popup, _loading) {
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this._error = _error;
        this._popup = _popup;
        this._loading = _loading;
    }
    ResetPasswordComponent.prototype.navigateToLogin = function () {
        this._router.navigate(['signup']);
    };
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var formId = "#reset_password-form";
        jquery(formId).data('validator', null);
        jquery(formId).unbind('validate');
        jquery(formId).validate({
            debug: true,
            rules: {
                email: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: "メールアドレスを入力して下さい"
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
            submitHandler: this.submit.bind(this),
            invalidHandler: this.invalidFunction.bind(this)
        });
    };
    ResetPasswordComponent.prototype.invalidFunction = function () {
    };
    ResetPasswordComponent.prototype.submit = function () {
        var _this = this;
        console.log('submit signup');
        this._loading.startLoading();
        this._api.postResetPassword({ email: this.email }).subscribe(function (data) {
            var body = data.json().data;
        }, function (err) {
            console.log(err);
            _this._error.errorInit(err);
            /**
             * Popup 作成処理
             * @type {PopupBase}
             */
            var popup = new models_1.PopupBase();
            popup.id = "#modal3";
            _this._popup.displayError(err, "再設定エラー");
            _this._loading.endLoading();
        }, function () {
            alert('確認用メールを送信しました！');
        });
    };
    ResetPasswordComponent = __decorate([
        core_1.Component({
            selector: 'signup',
            templateUrl: './reset_password.component.html',
            styleUrls: ['./reset_password.component.scss'],
            providers: [services_1.ApiService, services_1.AuthService],
            inputs: ['email', 'password', 'password_confirmation']
        })
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());
exports.ResetPasswordComponent = ResetPasswordComponent;
//# sourceMappingURL=reset_password.component.js.map