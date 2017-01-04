"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var FooterComponent = (function () {
    function FooterComponent(_router, _api, _auth) {
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this.title = 'Stoq';
    }
    FooterComponent.prototype.createCourse = function () {
        this._router.navigate(['Courses', {}]);
    };
    FooterComponent.prototype.logout = function () {
        var _this = this;
        this._api.deleteLogout().subscribe(function (data) {
            localStorage.removeItem('Uid');
            localStorage.removeItem('Client');
            localStorage.removeItem('Acess-token');
            _this._router.navigate(['Login', {}]);
        }, function (err) { return console.log(err); }, function () { return console.log('signup success'); });
    };
    FooterComponent.prototype.courseNew = function () {
        this._router.navigate(['CoursesNew', {}]);
    };
    FooterComponent.prototype.courseMyIndex = function () {
        this._router.navigate(['CoursesIndex', {}]);
    };
    FooterComponent.prototype.coursePublicIndex = function () {
        this._router.navigate(['CoursesIndex', {}]);
    };
    FooterComponent.prototype.returnHome = function () {
        this._router.navigate(['Home', {}]);
    };
    FooterComponent = __decorate([
        core_1.Component({
            selector: 'footer',
            templateUrl: './footer.component.html',
            styleUrls: ['./footer.component.scss'],
            providers: [services_1.ApiService, services_1.AuthService]
        })
    ], FooterComponent);
    return FooterComponent;
}());
exports.FooterComponent = FooterComponent;
//# sourceMappingURL=footer.component.js.map