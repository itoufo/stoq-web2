"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var jquery = require('jquery');
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var models_1 = require("./../../../models");
var SignupComponent = (function () {
    function SignupComponent(_router, _api, _auth, _error, _popup, _loading) {
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this._error = _error;
        this._popup = _popup;
        this._loading = _loading;
    }
    SignupComponent.prototype.navigateToLogin = function () {
        this._router.navigate(['signup']);
    };
    SignupComponent.prototype.ngOnInit = function () {
        var formId = "#signup-form";
        jquery(formId).data('validator', null);
        jquery(formId).unbind('validate');
        jquery(formId).validate({
            debug: true,
            rules: {
                email: {
                    required: true
                },
                password: {
                    required: true
                },
                password_confirmation: {
                    required: true
                }
            },
            messages: {
                email: {
                    required: "メールアドレスを入力して下さい"
                },
                password: {
                    required: "パスワードを入力して下さい"
                },
                password_confirmation: {
                    required: "確認用パスワードを入力して下さい"
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
    SignupComponent.prototype.invalidFunction = function () {
    };
    SignupComponent.prototype.submit = function () {
        var _this = this;
        console.log('submit signup');
        this._loading.startLoading();
        this._api.postSignup({ email: this.email, password: this.password, password_confirmation: this.password_confirmation }).subscribe(function (data) {
            var body = data.json().data;
            console.log(data.headers);
            localStorage.setItem('Access-Token', data.headers.get('Access-Token'));
            localStorage.setItem('Client', data.headers.get('Client'));
            localStorage.setItem('Uid', _this.email);
        }, function (err) {
            console.log(err);
            _this._error.errorInit(err);
            /**
             * Popup 作成処理
             * @type {PopupBase}
             */
            var popup = new models_1.PopupBase();
            popup.id = "#modal3";
            _this._popup.displayError(err, "新規登録エラー");
            _this._loading.endLoading();
        }, function () {
            alert('確認用メールを送信しました！');
        });
    };
    SignupComponent = __decorate([
        core_1.Component({
            selector: 'signup',
            templateUrl: './signup.component.html',
            styleUrls: ['./signup.component.scss'],
            providers: [services_1.ApiService, services_1.AuthService],
            inputs: ['email', 'password', 'password_confirmation']
        })
    ], SignupComponent);
    return SignupComponent;
}());
exports.SignupComponent = SignupComponent;
//# sourceMappingURL=signup.component.js.map