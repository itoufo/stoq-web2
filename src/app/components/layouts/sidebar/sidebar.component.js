"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var jQuery, $ = require('jquery');
require('hammerjs');
require('velocity-animate');
require('materialize-css');
require('../../../../js/materialize-plugins/sideNav.js');
var core_1 = require('@angular/core');
var SidebarComponent = (function () {
    function SidebarComponent(_location, _router, _loading, _logger, _auth, _err) {
        this._location = _location;
        this._router = _router;
        this._loading = _loading;
        this._logger = _logger;
        this._auth = _auth;
        this._err = _err;
        this._logger.debug("*** About Sidebar ***");
    }
    SidebarComponent.prototype.ngAfterViewInit = function () {
        //Main Left Sidebar Menu
        jquery('.sidebar-collapse').sideNav({
            edge: 'left'
        });
        // FULL SCREEN MENU (Layout 02)
        jquery('.menu-sidebar-collapse').sideNav({
            menuWidth: 240,
            edge: 'left'
        });
    };
    SidebarComponent.prototype.courseNew = function () {
        var premise = this.navigate(['courses', 'new']);
        //if(premise){
        //    premise.then(this.reload)
        //}
    };
    SidebarComponent.prototype.groupNew = function () {
        var premise = this.navigate(['groups', 'new']);
        //if(premise){
        //    premise.then(this.reload)
        //}
    };
    SidebarComponent.prototype.groupIndex = function () {
        var premise = this.navigate(['groups', 'index']);
        //if(premise){
        //    premise.then(this.reload)
        //}
    };
    SidebarComponent.prototype.courseMyIndex = function () {
        this.navigate(['courses']);
    };
    SidebarComponent.prototype.coursePublicIndex = function () {
        this.navigate(["courses", "public"]);
    };
    SidebarComponent.prototype.entriesIndex = function () {
        this.navigate(['entries']);
    };
    SidebarComponent.prototype.returnHome = function () {
        this.navigate(["courses"]);
    };
    SidebarComponent.prototype.reload = function () {
        this._loading.setCurtain();
        location.reload();
    };
    SidebarComponent.prototype.navigate = function (to) {
        this._logger.debug('**** navigate is called ****');
        this._logger.debug(this._router);
        this._logger.debug(this._location);
        //this._logger.debug(this._router.url);
        //this._logger.debug(this._location.path());
        //this._logger.debug(this._location.normalize(to.join('/')));
        //this._logger.debug(this._location.isCurrentPathEqualTo(this._router.url));
        var condition = this._location.isCurrentPathEqualTo("/" + this._location.normalize(to.join('/')));
        this._err.hideError();
        if (!condition) {
            this._router.navigate(to);
            this._loading.startLoading();
        }
        return null;
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss']
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
//# sourceMappingURL=sidebar.component.js.map