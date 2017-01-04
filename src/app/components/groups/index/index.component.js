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
var GroupsIndexComponent = (function () {
    function GroupsIndexComponent(el, _logger, _loading, _api, _router, _error, _popup) {
        this.el = el;
        this._logger = _logger;
        this._loading = _loading;
        this._api = _api;
        this._router = _router;
        this._error = _error;
        this._popup = _popup;
        this.groups = [];
        this.managedGroups = [];
        this.showQuestion = true;
        this.groupsLoading = false;
        this._logger.debug(" ***** Coustructor courses form component *****");
    }
    //@Output() startLoading = new EventEmitter();
    //@Output() endLoading = new EventEmitter();
    GroupsIndexComponent.prototype.groupStartLoading = function () {
        this.groupsLoading = true;
    };
    GroupsIndexComponent.prototype.groupEndLoading = function () {
        this.groupsLoading = false;
    };
    GroupsIndexComponent.prototype.ngOnDestroy = function () {
    };
    GroupsIndexComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._logger.debug("oninit group index");
        this.groupsLoading = true;
        this._api.getGroups().subscribe(function (data) {
            var body = data.json();
            console.log(body);
            body.data.forEach(function (obj) {
                _this._setGroup(obj);
            });
        }, function (err) {
            _this._error.errorInit(err);
            _this._popup.displayError(err, "Error");
        }, function () {
            _this._logger.debug('get courses success');
            _this._loading.endLoading();
        });
    };
    GroupsIndexComponent.prototype.addQuestion = function () {
        this._router.navigate(['groups', 'new']);
    };
    GroupsIndexComponent.prototype.getDetail = function (group_id) {
        this._router.navigate(['groups', group_id, 'detail']);
    };
    GroupsIndexComponent.prototype._setGroup = function (obj) {
        var group = new models_1.Group();
        var is_managed = obj['role']['name'] == "manager";
        group.id = obj['group_id'];
        group.name = obj['name'];
        group.group_code = obj['group_code'];
        group.description = obj['description'];
        this.groups.push(group);
        if (is_managed) {
            this.managedGroups.push(group);
        }
    };
    GroupsIndexComponent.prototype.ngAfterViewInit = function () {
        this._logger.debug(" **** course form ng after view init ");
        //this.endLoading.emit('event');
    };
    GroupsIndexComponent = __decorate([
        core_1.Component({
            selector: 'groups-index',
            templateUrl: './index.component.html',
            styleUrls: ['./index.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.PopupService,
                services_1.LoadingService,
            ],
            inputs: ['group', 'popup']
        })
    ], GroupsIndexComponent);
    return GroupsIndexComponent;
}());
exports.GroupsIndexComponent = GroupsIndexComponent;
//# sourceMappingURL=index.component.js.map