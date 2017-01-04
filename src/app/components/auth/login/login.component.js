"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var jquery = require('jquery');
var Materialize = require('../../../../js/materialize.js');
/// <reference path="../../../../../node_modules/@types/jquery.validation/index.d.ts" />
require('jquery-validation');
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var LoginComponent = (function () {
    function LoginComponent(_router, _api, _auth, _logger, _loading) {
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this._logger = _logger;
        this._loading = _loading;
        this.email = localStorage.getItem('remember-name');
        this.password = localStorage.getItem('remember-password');
        if (this.email || this.password) {
            this.remember = true;
        }
    }
    LoginComponent.prototype.ngOnInit = function () {
        this._loading.startLoading();
        var formId = "#login-form";
        jquery(formId).data('validator', null);
        jquery(formId).unbind('validate');
        jquery(formId).unbind('submit');
        jquery(formId).validate({
            debug: true,
            rules: {
                email: "required",
                password: "required"
            },
            messages: {
                email: {
                    required: "メールアドレスを入力して下さい"
                },
                password: {
                    required: "パスワードを入力して下さい"
                }
            },
            errorElement: 'div',
            errorPlacement: function (error, element) {
                var placement = jquery(element).data('error');
                if (placement) {
                    jquery(placement).append(error);
                }
                else {
                    error.insertAfter(element);
                }
            },
            submitHandler: this.submit.bind(this)
        });
    };
    LoginComponent.prototype.invalidFunction = function () {
    };
    LoginComponent.prototype.ngAfterViewInit = function () {
        this._loading.endLoading();
    };
    LoginComponent.prototype.navigateToSignup = function () {
        this._router.navigate(['signup']);
    };
    LoginComponent.prototype.submit = function () {
        var _this = this;
        console.log("login submit!!");
        this._loading.setCurtain();
        this._api.postLogin({ email: this.email, password: this.password }).subscribe(function (data) {
            _this._auth.setResponse(data);
            _this._auth.rememberCredentials(_this.remember, _this.email, _this.password);
            // ページ遷移
            _this._router.navigate(['courses', 'public']);
        }, function (err) {
            _this._logger.error(err);
            _this._loading.endLoading();
            _this._auth.setStatus(false);
            console.log(Materialize);
            console.log(Materialize.toast);
            Materialize.toast('<span>ログインに失敗しました。</span>', 1500);
        }, function () { return _this._logger.debug('login success'); });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.LoadingService,
            ],
            inputs: ['email', 'password']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map