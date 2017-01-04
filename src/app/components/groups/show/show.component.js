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
var GroupsShowComponent = (function () {
    function GroupsShowComponent(route, _router, _api, _logger, _loading, _error, _popup) {
        this.route = route;
        this._router = _router;
        this._api = _api;
        this._logger = _logger;
        this._loading = _loading;
        this._error = _error;
        this._popup = _popup;
        this.loading = true;
        this.loading = true;
    }
    GroupsShowComponent.prototype.AddGroup = function () {
        sessionStorage.setItem('selectedGroup', this.group.id);
        this._router.navigate(['groups', 'new', 'parent', this.group.id]);
    };
    GroupsShowComponent.prototype.AddCourse = function () {
        this._router.navigate(['courses', 'new', 'parent', this.group.id]);
    };
    GroupsShowComponent.prototype.Edit = function () {
        this._loading.setCurtain();
        this._router.navigate(['groups', this.group.id, 'edit']);
    };
    GroupsShowComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._loading.startLoading();
        var group_id = "";
        this.route.params.forEach(function (params) {
            group_id = params['group_id']; // (+) converts string 'id' to a number
        });
        this._api.getGroup(group_id).subscribe(function (data) {
            var body = data.json();
            console.log(body);
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
    GroupsShowComponent.prototype.authGroup = function () {
        if (this.group.role_name == "manager") {
            return true;
        }
        else {
            return false;
        }
    };
    GroupsShowComponent.prototype.delete = function () {
        var popup = new models_1.PopupBase();
        popup.id = "#modal4";
        popup.contentText = this.group.name + "を削除してよろしいですか？";
        popup.headerText = "確認";
        popup.okFunction = this._delete.bind(this);
        popup.cancelFunction = function () { };
        this._popup.displayPopup(popup);
    };
    GroupsShowComponent.prototype._delete = function () {
    };
    GroupsShowComponent = __decorate([
        core_1.Component({
            selector: 'group-show',
            templateUrl: './show.component.html',
            styleUrls: ['./show.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.ActivityService,
                services_1.LoggerService,
                services_1.PopupService
            ]
        })
    ], GroupsShowComponent);
    return GroupsShowComponent;
}());
exports.GroupsShowComponent = GroupsShowComponent;
//# sourceMappingURL=show.component.js.map