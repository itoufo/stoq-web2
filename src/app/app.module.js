var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var platform_browser_1 = require('@angular/platform-browser');
var forms_1 = require('@angular/forms');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var hmr_1 = require('@angularclass/hmr');
/*
 * Platform and Environment providers/directives/pipes
 */
var environment_1 = require('./environment');
var app_routes_1 = require('./app.routes');
// App is our top level component
var app_component_1 = require('./app.component');
var app_resolver_1 = require('./app.resolver');
var app_service_1 = require('./app.service');
var home_1 = require('./home');
var about_1 = require('./about');
var no_content_1 = require('./no-content');
var x_large_1 = require('./home/x-large');
var components_1 = require('./components');
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
        if (!store || !store.state)
            return;
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
                about_1.AboutComponent,
                home_1.HomeComponent,
                no_content_1.NoContentComponent,
                x_large_1.XLarge,
                components_1.CoursesIndexComponent,
                components_1.LoginComponent,
                components_1.SignupComponent,
                components_1.ConfirmationComponent,
                components_1.CoursesPublicIndexComponent,
                components_1.CoursesNewComponent,
                components_1.CoursesEditComponent,
                components_1.CoursesShowComponent,
                components_1.CoursesAddQuestionComponent,
                components_1.TrainingComponent,
                components_1.TrainingResultComponent,
                components_1.SidebarComponent,
                components_1.RightSidebarComponent,
                components_1.PopupComponent,
                components_1.QuestionsFormComponent,
                components_1.AnswersFormComponent,
                components_1.CoursesFormComponent,
                //LoggedInRouterOutlet,
                components_1.LoginComponent,
                components_1.SignupComponent,
                components_1.HeaderComponent,
                components_1.LoginComponent,
                components_1.ServerErrorComponent,
                components_1.NotFoundComponent,
                components_1.ServerErrorComponent,
                components_1.QuestionAnalyzeComponent,
                components_1.ActivityEntryIndexComponent,
                components_1.CoursesComponent,
                components_1.EntriesComponent,
                components_1.EntryComponent,
                components_1.GroupsEditComponent,
                components_1.GroupsNewComponent,
                components_1.GroupsShowComponent,
                components_1.GroupsFormComponent,
                components_1.GroupsIndexComponent,
                components_1.UserAnalysisComponent,
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
})();
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map