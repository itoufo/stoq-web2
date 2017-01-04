"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var HeaderComponent = (function () {
    function HeaderComponent(_router, _api, _auth, _loading, _logger, _err) {
        var _this = this;
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this._loading = _loading;
        this._logger = _logger;
        this._err = _err;
        this.title = 'Stoq';
        this.startLoading = new core_1.EventEmitter();
        this.endLoading = new core_1.EventEmitter();
        this._logger.debug("***** Header Constructor ****");
        setInterval(function () { return _this.startLoading.emit("event"); }, 1000);
        setInterval(function () { return _this.endLoading.emit("event"); }, 5000);
    }
    HeaderComponent.prototype.logout = function () {
        var _this = this;
        //
        // ログイン画面でログアウトは無効です。
        if (this._router.url === 'login' || this._router.url === 'signup') {
            return false;
        }
        this._loading.setCurtain();
        this._api.deleteLogout().subscribe(function (data) {
            localStorage.removeItem('Uid');
            localStorage.removeItem('Client');
            localStorage.removeItem('Acess-token');
            _this._auth.setCredentials();
            _this._auth.setStatus(false);
            _this._router.navigate(['login']);
        }, function (err) {
            _this._logger.error(err);
            _this._auth.setStatus(false);
            _this._router.navigate(['login']);
        }, function () { return _this._logger.debug('signup success'); });
    };
    HeaderComponent.prototype.createCourse = function () {
        this.navigate('/courses/new');
    };
    HeaderComponent.prototype.courseNew = function () {
        this.navigate('/courses/new');
    };
    HeaderComponent.prototype.courseMyIndex = function () {
        this.navigate('/courses');
    };
    HeaderComponent.prototype.coursePublicIndex = function () {
        this.navigate('/courses/public');
    };
    HeaderComponent.prototype.returnHome = function () {
        this.navigate('/courses');
    };
    HeaderComponent.prototype.accountInfo = function () {
        this.navigate('/account');
    };
    HeaderComponent.prototype.navigate = function (to) {
        this._logger.debug('**** navigate is called ****');
        this._logger.debug(this._router);
        this._logger.debug(this._loading.isLoading());
        this._err.hideError();
        if (true) {
            this._router.navigateByUrl(to);
            this._loading.startLoading();
        }
    };
    __decorate([
        core_1.Input()
    ], HeaderComponent.prototype, "authed");
    __decorate([
        core_1.Output()
    ], HeaderComponent.prototype, "startLoading");
    __decorate([
        core_1.Output()
    ], HeaderComponent.prototype, "endLoading");
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'header',
            templateUrl: './header.component.html',
            styleUrls: ['./header.component.scss'],
            providers: [services_1.ApiService, services_1.AuthService]
        })
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map