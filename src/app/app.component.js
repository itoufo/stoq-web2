"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/*
 * Angular 2 decorators and services
 */
var core_1 = require('@angular/core');
var index_1 = require('./services/index');
/*
 * App Component
 * Top Level Component
 */
var AppComponent = (function () {
    function AppComponent(_router, _api, _auth, _title, _logger, _loading, _err, _popup) {
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this._title = _title;
        this._logger = _logger;
        this._loading = _loading;
        this._err = _err;
        this._popup = _popup;
        this.angularclassLogo = 'assets/img/angularclass-avatar.png';
        this.name = 'Angular 2 Webpack Starter';
        this.url = 'https://twitter.com/AngularClass';
        this.authenticated = false;
        // ページ名の配列をつくる。
        this.pageIds = ["Home", "Testimonial", "Faq"];
        // 必要あれば、ベースのタイトルを用意する。
        this.baseTitle = "学習プラットフォーム StoQ";
        // ページタイトルのハッシュを用意する。
        this.pageTitles = {
            home: "Home | " + this.baseTitle,
            testimonial: "Testimonial | " + this.baseTitle,
            faq: "Faq | " + this.baseTitle,
            login: "Login | " + this.baseTitle,
            "courses/index": 'Courses | ' + this.baseTitle,
            "courses/new": 'New Course | ' + this.baseTitle
        };
        this.loading = false;
        this._loading.startLoading();
        this._auth.setCredentials();
        //_router.subscribe( ( path ) => {
        //  this.setSelected( path );
        //});
    }
    AppComponent.prototype.routerOnActivate = function (e) {
        console.log('routerOnActivate');
        console.log(e);
        //this._logger.debug(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`); return new Promise(resolve => {
        //  // The ChildCmp gets instantiated only when the Promise is resolved
        //  setTimeout(() => resolve(null), 1000);
        //});
    };
    AppComponent.prototype.routerOnDeactivate = function (e) {
        console.log('routerOnDeactivate');
        console.log(e);
        //this._logger.debug(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`);
        //return new Promise(resolve => {
        //  // The ChildCmp gets instantiated only when the Promise is resolved
        //  setTimeout(() => resolve(null), 1000);
        //});
    };
    /**
     * 指定のページを選択されている状態にし、ページタイトルをパスに対応するものに変更する。
     * 小文字に統一。
     */
    AppComponent.prototype.setSelected = function (routeObj) {
        // selectedIdを更新。小文字に統一。
        this.selectedId = routeObj.instruction.routeName.toLowerCase();
        // ページタイトルを更新。
        var title = this.pageTitles[this.selectedId];
        this._title.setTitle(title);
    };
    AppComponent.prototype.ngOnInit = function () {
        this._logger.debug("app component oninit");
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
    AppComponent.prototype.startLoading = function () {
        this.loading = true;
    };
    AppComponent.prototype.endLoading = function () {
        this.loading = false;
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app',
            encapsulation: core_1.ViewEncapsulation.None,
            templateUrl: './app.component.html',
            styleUrls: [
                './app.component.scss'
            ],
            providers: [
                Location,
                index_1.PopupService,
                index_1.ApiService,
                index_1.AuthService,
                index_1.ErrorService,
                index_1.LoggerService,
                index_1.LoadingService,
            ]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
//# sourceMappingURL=app.component.js.map