var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var models_1 = require("./../models");
var POPUPBASE = new models_1.PopupBase();
var PopupService = (function () {
    function PopupService(_error) {
        this._error = _error;
    }
    PopupService.prototype.currentBase = function () {
        return POPUPBASE;
    };
    PopupService.prototype.closePopup = function () {
        jQuery(POPUPBASE.id).closeModal();
    };
    PopupService.prototype.displayPopup = function (popup) {
        POPUPBASE = popup;
        jQuery(POPUPBASE.id).openModal();
    };
    /**
     * エラーレスポンスをポップアップに表示する
     * @param err エラーレスポンス
     */
    PopupService.prototype.displayError = function (err, headerText, modalId) {
        if (modalId === void 0) { modalId = "#modal3"; }
        if (this._error.errorInit(err)) {
            var popup = new models_1.PopupBase();
            popup.errorMessages = this._error.errors();
            //popup.contentText = this._error.errorText();
            popup.headerText = headerText;
            popup.id = modalId;
            this.displayPopup(popup);
        }
    };
    PopupService = __decorate([
        core_1.Injectable()
    ], PopupService);
    return PopupService;
})();
exports.PopupService = PopupService;
//# sourceMappingURL=popup.service.js.map