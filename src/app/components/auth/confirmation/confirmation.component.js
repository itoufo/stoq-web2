"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var ConfirmationComponent = (function () {
    function ConfirmationComponent(_api, _auth, _logger, _loading) {
        this._api = _api;
        this._auth = _auth;
        this._logger = _logger;
        this._loading = _loading;
    }
    ConfirmationComponent.prototype.ngOnInit = function () {
        this._loading.startLoading();
    };
    ConfirmationComponent.prototype.ngAfterViewInit = function () {
        this._loading.endLoading();
    };
    ConfirmationComponent = __decorate([
        core_1.Component({
            selector: 'login',
            templateUrl: './confirmation.component.html',
            styleUrls: ['./confirmation.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.LoadingService,
            ],
            inputs: ['email', 'password']
        })
    ], ConfirmationComponent);
    return ConfirmationComponent;
}());
exports.ConfirmationComponent = ConfirmationComponent;
//# sourceMappingURL=confirmation.component.js.map