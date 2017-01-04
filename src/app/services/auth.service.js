"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var Authentication = (function () {
    function Authentication() {
        //private expiry: number;
        this.authenticated = false;
        this.setCredentials();
    }
    Authentication.prototype.getEmail = function () {
        return this.email;
    };
    Authentication.prototype.getStatus = function () {
        return this.authenticated;
    };
    Authentication.prototype.getUid = function () {
        return this.uid;
    };
    Authentication.prototype.getId = function () {
        return this.id;
    };
    Authentication.prototype.getAccountName = function () {
        return this.accountName;
    };
    Authentication.prototype.setStatus = function (value) {
        this.authenticated = value;
    };
    Authentication.prototype.saveCredentials = function (id, account_name, email, uid, client, accessToken) {
        localStorage.setItem('Access-Token', accessToken);
        localStorage.setItem('Client', client);
        localStorage.setItem('Uid', uid);
        localStorage.setItem('id', id);
        localStorage.setItem('email', email);
        localStorage.setItem('account_name', account_name);
        this.setCredentials();
    };
    Authentication.prototype.isCredentialsValid = function () {
        this.setCredentials();
        return this._status();
    };
    Authentication.prototype.setCredentials = function () {
        this.accessToken = localStorage.getItem('Access-Token');
        this.client = localStorage.getItem('Client');
        this.uid = localStorage.getItem('Uid');
        this.id = localStorage.getItem('id');
        this.email = localStorage.getItem('email');
        this.accountName = localStorage.getItem('account_name');
        this.authenticated = this._status();
        return this;
    };
    Authentication.prototype._status = function () {
        return Boolean(this.id && this.uid && this.client && this.accessToken);
    };
    Authentication = __decorate([
        core_1.Injectable()
    ], Authentication);
    return Authentication;
}());
exports.Authentication = Authentication;
var AUTH = new Authentication();
var AuthService = (function () {
    function AuthService(_api, _router) {
        this._api = _api;
        this._router = _router;
        this.authenticated = false;
        this.setCredentials();
    }
    // localstrage に記憶する
    AuthService.prototype.rememberCredentials = function (remember, email, password) {
        if (remember) {
            localStorage.removeItem('remember-name');
            localStorage.removeItem('remember-password');
            localStorage.setItem('remember-name', email);
            localStorage.setItem('remember-password', password);
        }
    };
    AuthService.prototype.setResponse = function (response) {
        var body = response.json().data;
        // なんで forefoxだと小文字で、chromeだと大文字になんねん
        this.saveCredentials(body.id, body.account_name, body.email, response.headers.get('uid') || response.headers.get('Uid'), response.headers.get('client') || response.headers.get('Client'), response.headers.get('access-token') || response.headers.get('Access-Token'));
        this.setStatus(true);
    };
    //getStatus() { return AUTH.getStatus(); }
    AuthService.prototype.getAuth = function () { return AUTH; };
    AuthService.prototype.getStatus = function () { return AUTH.getStatus(); };
    AuthService.prototype.getId = function () { return AUTH.getId(); };
    AuthService.prototype.getUid = function () { return AUTH.getUid(); };
    AuthService.prototype.showAccountName = function () {
        return AUTH.getAccountName();
    };
    AuthService.prototype.getEmail = function () {
        return AUTH.getEmail();
    };
    AuthService.prototype.showUid = function () {
        return AUTH.getUid().replace(/@.*/, "");
    };
    AuthService.prototype.setStatus = function (val) { AUTH.setStatus(val); };
    AuthService.prototype.saveCredentials = function (id, account_name, email, uid, client, accessToken) {
        AUTH.saveCredentials(id, account_name, email, uid, client, accessToken);
    };
    AuthService.prototype.isCredentialsValid = function () { return AUTH.isCredentialsValid(); };
    AuthService.prototype.setCredentials = function () {
        this.authenticated = AUTH.isCredentialsValid();
    };
    AuthService.prototype.check_if_authenticated = function (callback, args, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        this.setCredentials();
        this._router.navigateByUrl('/login');
        // localstrageにクレデンシャルが保存されてない場合無効
        if (!this.isCredentialsValid()) {
            this.setStatus(false);
            return false;
        }
        // 認証済みかつ、強制認証フラグが無効の場合有効
        if (!force && this.getStatus()) {
            this.setStatus(true);
            return true;
        }
        console.log("start checking credentials");
        this._api.getValidateToken().subscribe(function (data) {
            var body = data.json();
            var result = Boolean(body.success);
            _this.setStatus(result);
            callback(result, args);
        }, function (err) {
            console.log(err);
            _this.setStatus(false);
            callback(false, args);
        }, function () { return console.log("complete credentials checking"); });
    };
    AuthService = __decorate([
        core_1.Injectable()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map