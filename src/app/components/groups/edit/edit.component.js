"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var models_1 = require("./../../../models");
var GroupsEditComponent = (function () {
    function GroupsEditComponent(route, _router, _api, _auth, _logger, _loading, _error, _popup) {
        this.route = route;
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this._logger = _logger;
        this._loading = _loading;
        this._error = _error;
        this._popup = _popup;
        // ポップアップ用
        this.popup = new models_1.PopupBase();
        //
        //public modal_id: string = "new-course-modal";
        this.modal_id = "modal3";
        this._logger.debug(" ***** constructor Groups new ***** ");
        this.group = new models_1.Group();
        // Load開始
        //this.startLoading.emit('event');
        this._loading.startLoading();
        console.log(this._loading.isLoading());
    }
    GroupsEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._logger.debug(" ***** oninit course new ***** ");
        var group_id = "";
        this.route.params.forEach(function (params) {
            group_id = params['group_id']; // (+) converts string 'id' to a number
        });
        this._api.getGroup(group_id).subscribe(function (data) {
            var body = data.json();
            _this.group = new models_1.Group();
            _this.group.assignParams(body.data);
        }, function (err) {
            // 共通処理, _error初期化
            _this._error.errorInit(err);
            _this._error.showError();
            _this._popup.displayError(err, "Error!");
            // ロード終了
            _this._loading.endLoading();
            _this.loading = false;
        }, function () {
            _this._loading.endLoading();
            _this.loading = false;
        });
    };
    GroupsEditComponent.prototype.ngAfterViewInit = function () {
        this._logger.debug(" ***** oninit course AfterViewInit ***** ");
        console.log(this._loading.isLoading());
        this._loading.endLoading();
    };
    GroupsEditComponent = __decorate([
        core_1.Component({
            selector: 'groups-new',
            templateUrl: './edit.component.html',
            styleUrls: ['./edit.component.scss'],
            inputs: ["selected_question_type"],
            providers: [
                services_1.PopupService,
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.LoadingService,
            ]
        })
    ], GroupsEditComponent);
    return GroupsEditComponent;
}());
exports.GroupsEditComponent = GroupsEditComponent;
//# sourceMappingURL=edit.component.js.map