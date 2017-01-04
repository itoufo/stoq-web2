"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var models_1 = require("../../../models");
var ActivityEntryIndexComponent = (function () {
    function ActivityEntryIndexComponent(_router, _api, _activity, _auth, _logger, _error, _loading, _popup) {
        this._router = _router;
        this._api = _api;
        this._activity = _activity;
        this._auth = _auth;
        this._logger = _logger;
        this._error = _error;
        this._loading = _loading;
        this._popup = _popup;
        this.activitys = [];
        this._loading.setCurtain();
    }
    ActivityEntryIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._loading.setCurtain();
        this._api.getEntries().subscribe(function (data) {
            var body = data.json();
            _this._logger.debug("Data of get Entries");
            _this._logger.debug(data);
            body.data.forEach(function (entry) {
                var activityEntry = new models_1.ActivityEntry();
                activityEntry.assignParams(entry);
                _this.activitys.push(activityEntry);
            });
        }, function (err) {
            _this._error.errorInit(err);
            _this._popup.displayError(err, "Error!");
        }, function () {
            _this._loading.endLoading();
        });
    };
    ActivityEntryIndexComponent.prototype.showResult = function (entry_id) {
        this._loading.setCurtain();
        this._router.navigate(['entries', 'results', entry_id]);
    };
    ActivityEntryIndexComponent.prototype.startEntry = function (entry_id) {
        this._loading.setCurtain();
        localStorage.setItem('CurrentActivity', entry_id);
        this._router.navigate(['entry', 'training', {}]);
    };
    ActivityEntryIndexComponent.prototype.ngAfterViewInit = function () {
    };
    ActivityEntryIndexComponent = __decorate([
        core_1.Component({
            selector: 'courses-show',
            templateUrl: './activity_entry_index.component.html',
            styleUrls: ['./activity_entry_index.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.ActivityService,
                services_1.LoggerService,
                services_1.PopupService,
            ]
        })
    ], ActivityEntryIndexComponent);
    return ActivityEntryIndexComponent;
}());
exports.ActivityEntryIndexComponent = ActivityEntryIndexComponent;
//# sourceMappingURL=activity_entry_index.component.js.map