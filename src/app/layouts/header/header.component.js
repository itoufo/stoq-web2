System.register(['@angular/core', '@angular/router-deprecated', '../../services/api.service', '../../services/auth.service', "../../services/loading.service", "../../services/logger.service", "../../services/error.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_deprecated_1, api_service_1, auth_service_1, loading_service_1, logger_service_1, error_service_1;
    var HeaderComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (loading_service_1_1) {
                loading_service_1 = loading_service_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (error_service_1_1) {
                error_service_1 = error_service_1_1;
            }],
        execute: function() {
            HeaderComponent = (function () {
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
                    if (this._router.hostComponent.name == 'LoginComponent') {
                        return false;
                    }
                    this._loading.setCurtain();
                    this._api.deleteLogout().subscribe(function (data) {
                        localStorage.removeItem('Uid');
                        localStorage.removeItem('Client');
                        localStorage.removeItem('Acess-token');
                        _this._auth.setCredentials();
                        _this._auth.setStatus(false);
                        _this._router.navigate(['Login', {}]);
                    }, function (err) {
                        _this._logger.error(err);
                        _this._auth.setStatus(false);
                        _this._router.navigate(['Login', {}]);
                    }, function () { return _this._logger.debug('signup success'); });
                };
                HeaderComponent.prototype.createCourse = function () {
                    this.navigate('Courses');
                };
                HeaderComponent.prototype.courseNew = function () {
                    this.navigate('CoursesNew');
                };
                HeaderComponent.prototype.courseMyIndex = function () {
                    this.navigate('CoursesIndex');
                };
                HeaderComponent.prototype.coursePublicIndex = function () {
                    this.navigate('CoursesIndex');
                };
                HeaderComponent.prototype.returnHome = function () {
                    this.navigate('Home');
                };
                HeaderComponent.prototype.accountInfo = function () {
                    this.navigate('Account');
                };
                HeaderComponent.prototype.navigate = function (to) {
                    this._logger.debug('**** navigate is called ****');
                    this._logger.debug(this._router);
                    this._logger.debug(this._loading.isLoading());
                    this._err.hideError();
                    if (this._router.hostComponent.name !== to + 'Component') {
                        this._router.navigate([to, {}]);
                        this._loading.startLoading();
                    }
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], HeaderComponent.prototype, "authed", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], HeaderComponent.prototype, "startLoading", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], HeaderComponent.prototype, "endLoading", void 0);
                HeaderComponent = __decorate([
                    core_1.Component({
                        selector: 'header',
                        templateUrl: 'dist/layouts/header/header.component.html',
                        styleUrls: ['dist/layouts/header/header.component.css'],
                        providers: [api_service_1.ApiService, auth_service_1.AuthService],
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, api_service_1.ApiService, auth_service_1.AuthService, loading_service_1.LoadingService, logger_service_1.LoggerService, error_service_1.ErrorService])
                ], HeaderComponent);
                return HeaderComponent;
            }());
            exports_1("HeaderComponent", HeaderComponent);
        }
    }
});
//# sourceMappingURL=header.component.js.map