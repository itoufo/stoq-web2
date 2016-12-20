var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var LoadingService = (function () {
    function LoadingService() {
    }
    LoadingService.prototype.startLoading = function () {
        var _this = this;
        console.log('@@@ startLoading Called');
        setTimeout(function () { return _this.updateStatus(true); }, 0);
    };
    LoadingService.prototype.endLoading = function () {
        var _this = this;
        console.log('@@@ endLoading Called');
        setTimeout(function () { return _this.updateStatus(false); }, 0);
    };
    LoadingService.prototype.updateStatus = function (status) {
        console.log('@@@ updateLoading Called');
        if (loadingStatus !== status) {
            loadingStatus = status;
        }
        if (!loadingStatus) {
            this.unsetCurtain();
        }
    };
    LoadingService.prototype.setCurtain = function () {
        this.startLoading();
        loadingCurtain = true;
        this.no_scroll();
    };
    LoadingService.prototype.unsetCurtain = function () {
        loadingCurtain = false;
        this.return_scroll();
    };
    LoadingService.prototype.isSetCurtain = function () {
        return loadingStatus && loadingCurtain;
    };
    LoadingService.prototype.isLoading = function () {
        return loadingStatus;
    };
    LoadingService.prototype.no_scroll = function () {
        //PC用
        var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        jQuery(document).on(scroll_event, function (e) { e.preventDefault(); });
        //SP用
        jQuery(document).on('touchmove.noScroll', function (e) { e.preventDefault(); });
    };
    //スクロール復活用関数
    LoadingService.prototype.return_scroll = function () {
        //PC用
        var scroll_event = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
        jQuery(document).off(scroll_event);
        //SP用
        jQuery(document).off('.noScroll');
    };
    LoadingService = __decorate([
        core_1.Injectable()
    ], LoadingService);
    return LoadingService;
})();
exports.LoadingService = LoadingService;
var loadingStatus;
var loadingCurtain;
//# sourceMappingURL=loading.service.js.map