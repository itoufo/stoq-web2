"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var RightSidebarComponent = (function () {
    function RightSidebarComponent(_router) {
        this._router = _router;
    }
    RightSidebarComponent.prototype.courseNew = function () {
        this._router.navigate(['CoursesNew', {}]);
    };
    RightSidebarComponent.prototype.courseMyIndex = function () {
        this._router.navigate(['CoursesIndex', {}]);
    };
    RightSidebarComponent.prototype.coursePublicIndex = function () {
        this._router.navigate(['CoursesIndex', {}]);
    };
    RightSidebarComponent.prototype.returnHome = function () {
        this._router.navigate(['Home', {}]);
    };
    RightSidebarComponent = __decorate([
        core_1.Component({
            selector: 'right-sidebar',
            templateUrl: './right-sidebar.component.html',
            styleUrls: ['./right-sidebar.component.scss']
        })
    ], RightSidebarComponent);
    return RightSidebarComponent;
}());
exports.RightSidebarComponent = RightSidebarComponent;
//# sourceMappingURL=right-sidebar.component.js.map