"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var ServerErrorComponent = (function () {
    function ServerErrorComponent(_router, _api, _auth, _logger, _loading) {
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this._logger = _logger;
        this._loading = _loading;
    }
    ServerErrorComponent.prototype.ngOnInit = function () {
        this._loading.startLoading();
    };
    ServerErrorComponent.prototype.ngAfterViewInit = function () {
        this._loading.endLoading();
    };
    ServerErrorComponent = __decorate([
        core_1.Component({
            selector: "serverError",
            templateUrl: './serverError.component.html',
            styleUrls: ['./serverError.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.LoadingService,
            ]
        })
    ], ServerErrorComponent);
    return ServerErrorComponent;
}());
exports.ServerErrorComponent = ServerErrorComponent;
//# sourceMappingURL=serverError.component.js.map