"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var models_1 = require('../../../models');
var PopupComponent = (function () {
    function PopupComponent(_router) {
        this._router = _router;
        console.log("*** About Popup ***");
        //console.log(this._router);
        this.popupBase = new models_1.PopupBase();
    }
    PopupComponent = __decorate([
        core_1.Component({
            selector: 'popup',
            templateUrl: './popup.component.html',
            styleUrls: ['./popup.component.scss'],
            inputs: ['popupBase']
        })
    ], PopupComponent);
    return PopupComponent;
}());
exports.PopupComponent = PopupComponent;
//# sourceMappingURL=popup.component.js.map