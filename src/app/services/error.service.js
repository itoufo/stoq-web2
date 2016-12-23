// エラーメッセージを解釈・整形するサービス
// 個々のエラー描写は各コンポーネントに任せる
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var models_1 = require("../models");
var ErrorService = (function () {
    function ErrorService(_api, _auth, _router) {
        this._api = _api;
        this._auth = _auth;
        this._router = _router;
        this.authenticated = false;
        this._err = {};
        showError = false;
        errorType = null;
    }
    ErrorService.prototype.errorInit = function (err) {
        console.log(err);
        this._err = err;
        var commonError = false;
        if (err.status === 401) {
            this._type = "401";
            console.log("401 Error!");
            localStorage.removeItem('Uid');
            localStorage.removeItem('Client');
            localStorage.removeItem('Acess-token');
            this._auth.setStatus(false);
            this._router.navigateByUrl('/login');
            commonError = true;
        }
        if (err.status === 404) {
            this.setErrorType('notFound');
            console.log('Content Not Found!!');
            commonError = true;
        }
        if (err.status === 500) {
            this.setErrorType('serverError');
            this.showError();
            console.log('Internal Server Error!!');
            commonError = true;
        }
        return !commonError;
        //if(err.status === 404){
        //  console.log('errorcard Error!!');
        //  this._router.navigate(['Error404', {}]);
        //}
    };
    // エラーメッセージの取得
    // params が定義されていない場合に適用
    // 全部単純につないでるだけだから雑だよね...
    // 非推奨！
    ErrorService.prototype.errorText = function (separator) {
        if (separator === void 0) { separator = ", "; }
        var text = "";
        this._errJson = JSON.parse(this._err._body);
        this._errJson.errors.forEach(function (error) {
            text = text
                + " "
                + error.messages.join(separator);
        });
        return text;
    };
    ErrorService.prototype.errorTextLi = function (separator) {
        if (separator === void 0) { separator = ", "; }
        var text = "";
        this._errJson = JSON.parse(this._err._body);
        this._errJson.errors.forEach(function (error) {
            text = text
                + "<li>" + error.messages.join(separator) + "</li>";
        });
        return text;
    };
    // エラーステータスコードの取得
    ErrorService.prototype.errorStatus = function () {
        return this._err.status;
    };
    // エラーメッセージオブジェクトの取得
    ErrorService.prototype.errors = function () {
        var errors = [];
        this._errJson = JSON.parse(this._err._body);
        this._errJson.errors.forEach(function (error) {
            errors.push(new models_1.ErrorMessage(error));
        });
        return errors;
    };
    ErrorService.prototype.errorType = function () {
        return errorType;
    };
    ErrorService.prototype.setErrorType = function (type) {
        errorType = type;
    };
    ErrorService.prototype.showError = function () {
        setTimeout(function () { showError = true; }, 0);
    };
    ErrorService.prototype.hideError = function () {
        setTimeout(function () { showError = false; }, 0);
    };
    ErrorService.prototype.errorViewStatus = function () {
        return showError;
    };
    ErrorService.prototype.replaceParam = function (param) {
        var reg = /\[(\w+)\]/g;
        return param.replace(reg, "_$1");
    };
    ErrorService = __decorate([
        core_1.Injectable()
    ], ErrorService);
    return ErrorService;
})();
exports.ErrorService = ErrorService;
var errorType = null;
var showError;
//# sourceMappingURL=error.service.js.map