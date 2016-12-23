System.register(['@angular/core', '@angular/router-deprecated', '../../services/api.service', '../../services/auth.service'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_deprecated_1, api_service_1, auth_service_1;
    var FooterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (api_service_1_1) {
                api_service_1 = api_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            FooterComponent = (function () {
                function FooterComponent(_router, _api, _auth) {
                    this._router = _router;
                    this._api = _api;
                    this._auth = _auth;
                    this.title = 'Stoq';
                }
                FooterComponent.prototype.createCourse = function () {
                    this._router.parent.navigate(['Courses', {}]);
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
                        templateUrl: 'dist/layouts/footer/footer.component.html',
                        styleUrls: ['dist/layouts/footer/footer.component.css'],
                        providers: [api_service_1.ApiService, auth_service_1.AuthService],
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, api_service_1.ApiService, auth_service_1.AuthService])
                ], FooterComponent);
                return FooterComponent;
            }());
            exports_1("FooterComponent", FooterComponent);
        }
    }
});
//# sourceMappingURL=footer.component.js.map