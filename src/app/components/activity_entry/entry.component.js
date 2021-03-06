"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var services_1 = require("./../../services");
var EntryComponent = (function () {
    function EntryComponent(_router, _api, _auth, _title, _logger, _loading, _err, _popup) {
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this._title = _title;
        this._logger = _logger;
        this._loading = _loading;
        this._err = _err;
        this._popup = _popup;
        this.authenticated = false;
        // ページ名の配列をつくる。
        this.pageIds = ["Home", "Testimonial", "Faq"];
        this._loading.startLoading();
        this._auth.setCredentials();
        //_router.subscribe( ( path ) => {
        //  this.setSelected( path );
        //});
    }
    EntryComponent.prototype.routerOnActivate = function (e) {
        console.log('routerOnActivate');
        console.log(e);
        //this._logger.debug(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`); return new Promise(resolve => {
        //  // The ChildCmp gets instantiated only when the Promise is resolved
        //  setTimeout(() => resolve(null), 1000);
        //});
    };
    EntryComponent.prototype.routerOnDeactivate = function (e) {
        console.log('routerOnDeactivate');
        console.log(e);
        //this._logger.debug(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`);
        //return new Promise(resolve => {
        //  // The ChildCmp gets instantiated only when the Promise is resolved
        //  setTimeout(() => resolve(null), 1000);
        //});
    };
    EntryComponent.prototype.ngOnInit = function () {
        this._logger.debug("courses component oninit");
        this._loading.endLoading();
        //this._auth.check_if_authenticated(function(result: boolean, self: AppComponent){
        //  self.authenticated = true;
        //  console.log(result);
        //  console.log(self._auth.getStatus());
        //  if (self._auth.getStatus()) {
        //    self._router.navigate(['Home', {}]);
        //  }else{
        //    self._router.navigate(['Login', {}]);
        //  }
        //}, this, true);
        // this._router.navigate(['Home', {}])
    };
    EntryComponent = __decorate([
        core_1.Component({
            selector: 'courses',
            templateUrl: './entry.component.html',
            providers: [
                services_1.PopupService,
                services_1.ApiService,
                services_1.AuthService,
                services_1.ErrorService,
                platform_browser_1.Title,
                services_1.LoggerService,
                services_1.LoadingService,
            ]
        })
    ], EntryComponent);
    return EntryComponent;
}());
exports.EntryComponent = EntryComponent;
//# sourceMappingURL=entry.component.js.map