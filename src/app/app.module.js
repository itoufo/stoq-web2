"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var hmr_1 = require('@angularclass/hmr');
var router_1 = require('@angular/router');
/*
 * Platform and Environment providers/directives/pipes
 */
var environment_1 = require('./environment');
var app_routes_1 = require('./app.routes');
// App is our top level component
var app_component_1 = require('./app.component');
var app_resolver_1 = require('./app.resolver');
var app_service_1 = require('./app.service');
var index_1 = require('./home/index');
var index_2 = require('./about/index');
var no_content_1 = require('./no-content');
var index_3 = require('./components/index');
var courses_component_1 = require("./components/courses/courses.component");
// Application wide providers
var APP_PROVIDERS = app_resolver_1.APP_RESOLVER_PROVIDERS.concat([
    app_service_1.AppState
]);
/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
var AppModule = (function () {
    function AppModule(appRef, appState) {
        this.appRef = appRef;
        this.appState = appState;
    }
    AppModule.prototype.hmrOnInit = function (store) {
        if (!store || !store.state) {
            return;
        }
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            var restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        // save state
        var state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = hmr_1.createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = hmr_1.createInputTransfer();
        // remove styles
        hmr_1.removeNgStyles();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.AppComponent],
            declarations: [
                app_component_1.AppComponent,
                index_2.AboutComponent,
                index_1.HomeComponent,
                no_content_1.NoContentComponent,
                index_3.CoursesIndexComponent,
                index_3.LoginComponent,
                index_3.SignupComponent,
                index_3.ConfirmationComponent,
                index_3.CoursesPublicIndexComponent,
                index_3.CoursesNewComponent,
                index_3.CoursesEditComponent,
                index_3.CoursesShowComponent,
                index_3.CoursesAddQuestionComponent,
                index_3.TrainingComponent,
                index_3.TrainingResultComponent,
                index_3.SidebarComponent,
                index_3.RightSidebarComponent,
                index_3.PopupComponent,
                index_3.QuestionsFormComponent,
                index_3.AnswersFormComponent,
                index_3.CoursesFormComponent,
                //LoggedInRouterOutlet,
                index_3.LoginComponent,
                index_3.SignupComponent,
                index_3.HeaderComponent,
                index_3.LoginComponent,
                index_3.ServerErrorComponent,
                index_3.NotFoundComponent,
                index_3.ServerErrorComponent,
                index_3.QuestionAnalyzeComponent,
                index_3.ActivityEntryIndexComponent,
                courses_component_1.CoursesComponent,
                index_3.EntriesComponent,
                index_3.EntryComponent,
                index_3.GroupsEditComponent,
                index_3.GroupsNewComponent,
                index_3.GroupsShowComponent,
                index_3.GroupsFormComponent,
                index_3.GroupsIndexComponent,
                index_3.UserAnalysisComponent,
                index_3.ResetPasswordComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                http_1.HttpModule,
                router_1.RouterModule.forRoot(app_routes_1.ROUTES, { useHash: true, preloadingStrategy: router_1.PreloadAllModules })
            ],
            providers: [
                environment_1.ENV_PROVIDERS,
                APP_PROVIDERS
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map