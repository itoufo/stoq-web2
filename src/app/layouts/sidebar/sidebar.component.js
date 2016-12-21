System.register(['@angular/core', '@angular/router-deprecated', "../../services/loading.service", "../../services/logger.service", "../../services/error.service", "../../services/auth.service"], function(exports_1, context_1) {
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
    var core_1, router_deprecated_1, loading_service_1, logger_service_1, error_service_1, auth_service_1;
    var SidebarComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_deprecated_1_1) {
                router_deprecated_1 = router_deprecated_1_1;
            },
            function (loading_service_1_1) {
                loading_service_1 = loading_service_1_1;
            },
            function (logger_service_1_1) {
                logger_service_1 = logger_service_1_1;
            },
            function (error_service_1_1) {
                error_service_1 = error_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            }],
        execute: function() {
            SidebarComponent = (function () {
                function SidebarComponent(_router, _loading, _logger, _auth, _err) {
                    this._router = _router;
                    this._loading = _loading;
                    this._logger = _logger;
                    this._auth = _auth;
                    this._err = _err;
                    this._logger.debug("*** About Sidebar ***");
                }
                SidebarComponent.prototype.ngAfterViewInit = function () {
                    //Main Left Sidebar Menu
                    jQuery('.sidebar-collapse').sideNav({
                        edge: 'left',
                    });
                    // FULL SCREEN MENU (Layout 02)
                    jQuery('.menu-sidebar-collapse').sideNav({
                        menuWidth: 240,
                        edge: 'left',
                        //closeOnClick:true, // Set if default menu open is true
                        menuOut: false // Set if default menu open is true
                    });
                };
                SidebarComponent.prototype.courseNew = function () {
                    var premise = this.navigate('CoursesNew');
                    if (premise) {
                        premise.then(this.reload);
                    }
                };
                SidebarComponent.prototype.courseMyIndex = function () {
                    this.navigate('CoursesIndex');
                };
                SidebarComponent.prototype.coursePublicIndex = function () {
                    this.navigate('CoursesPublicIndex');
                };
                SidebarComponent.prototype.entriesIndex = function () {
                    this.navigate('ActivityEntryIndex');
                };
                SidebarComponent.prototype.returnHome = function () {
                    this.navigate('Home');
                };
                SidebarComponent.prototype.reload = function () {
                    this._loading.setCurtain();
                    location.reload();
                };
                SidebarComponent.prototype.navigate = function (to) {
                    this._logger.debug('**** navigate is called ****');
                    this._logger.debug(this._router);
                    this._logger.debug(this._loading.isLoading());
                    this._err.hideError();
                    console.log('星星');
                    console.log(this._router.hostComponent.name);
                    if (this._router.hostComponent.name !== to + 'Component') {
                        this._loading.setCurtain();
                        return this._router.navigate([to, {}]);
                    }
                    return null;
                };
                SidebarComponent = __decorate([
                    core_1.Component({
                        selector: 'sidebar',
                        templateUrl: 'dist/layouts/sidebar/sidebar.component.html',
                        styleUrls: ['dist/layouts/sidebar/sidebar.component.css'],
                    }), 
                    __metadata('design:paramtypes', [router_deprecated_1.Router, loading_service_1.LoadingService, logger_service_1.LoggerService, auth_service_1.AuthService, error_service_1.ErrorService])
                ], SidebarComponent);
                return SidebarComponent;
            }());
            exports_1("SidebarComponent", SidebarComponent);
        }
    }
});
//# sourceMappingURL=sidebar.component.js.map