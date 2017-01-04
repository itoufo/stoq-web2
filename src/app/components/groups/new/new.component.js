"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var jquery = require("jquery");
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var models_1 = require("./../../../models");
var GroupsNewComponent = (function () {
    function GroupsNewComponent(route, _router, _api, _auth, _logger, _loading, _error, _popup) {
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
        this.modal_id = "modal3";
        this._logger.debug(" ***** constructor Groups new ***** ");
        this.group = new models_1.Group();
        // Load開始
        //this.startLoading.emit('event');
        this._loading.startLoading();
        console.log(this._loading.isLoading());
    }
    GroupsNewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._logger.debug(" ***** oninit course new ***** ");
        this.route.params.forEach(function (params) {
            _this.parent_id = params['parent_id']; // (+) converts string 'id' to a number
        });
        // POPUPのデザインを選択
        this.popup.id = "#modal3";
        jquery("form").unbind('submit');
        jquery('.modal-trigger').unbind('click');
        jquery('.modal-trigger').leanModal({
            dismissible: true,
            opacity: .5,
            in_duration: 300,
            out_duration: 200,
            ready: function () {
                //alert('Ready');
            },
            complete: function () {
                //alert('Closed');
            } // Callback for Modal close
        });
    };
    GroupsNewComponent.prototype.ngAfterViewInit = function () {
        this._logger.debug(" ***** oninit course AfterViewInit ***** ");
        console.log(this._loading.isLoading());
        this._loading.endLoading();
    };
    GroupsNewComponent = __decorate([
        core_1.Component({
            selector: 'groups-new',
            templateUrl: './new.component.html',
            styleUrls: ['./new.component.scss'],
            inputs: ["selected_question_type"],
            providers: [
                services_1.PopupService,
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.LoadingService,
            ]
        })
    ], GroupsNewComponent);
    return GroupsNewComponent;
}());
exports.GroupsNewComponent = GroupsNewComponent;
//# sourceMappingURL=new.component.js.map