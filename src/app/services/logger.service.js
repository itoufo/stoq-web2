"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var LoggerService = (function () {
    // TODO: logサーバに飛ばすべ
    function LoggerService(_api) {
        this._api = _api;
        this.authenticated = false;
        //
        // Loglevel
        //  1: error
        //  2: warn
        //  3: notice
        //  4: info
        //  5: debug
        this._logLevel = 5;
    }
    LoggerService.prototype.debug = function (arg) {
        if (this._logLevel >= 5) {
            this._log(arg);
        }
    };
    LoggerService.prototype.info = function (arg) {
        if (this._logLevel >= 4) {
            this._log(arg);
        }
    };
    LoggerService.prototype.notice = function (arg) {
        if (this._logLevel >= 3) {
            this._log(arg);
        }
    };
    LoggerService.prototype.warn = function (arg) {
        if (this._logLevel >= 2) {
            this._log(arg);
        }
    };
    LoggerService.prototype.error = function (arg) {
        if (this._logLevel >= 1) {
            this._log(arg);
        }
    };
    LoggerService.prototype._log = function (arg) {
        console.log(arg);
    };
    LoggerService = __decorate([
        core_1.Injectable()
    ], LoggerService);
    return LoggerService;
}());
exports.LoggerService = LoggerService;
//# sourceMappingURL=logger.service.js.map