import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  NgModule,
  ApplicationRef
} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { HomeComponent } from './home/index';
import { AboutComponent } from './about/index';
import { NoContentComponent } from './no-content';
import { XLargeDirective } from './home/x-large';

import {
  CoursesNewComponent,
  CoursesEditComponent,
  ConfirmationComponent,
  CoursesIndexComponent,
  CoursesPublicIndexComponent,
  CoursesShowComponent,
  CoursesFormComponent,
  ActivityEntryIndexComponent,
  QuestionAnalyzeComponent,
  QuestionsFormComponent,
  QuestionsNewComponent,
  CoursesAddQuestionComponent,
  TrainingComponent,
  TrainingResultComponent,
  UserAnalysisComponent,
  SignupComponent,
  LoginComponent,
  EntriesComponent,
  EntryComponent,
  GroupsNewComponent,
  GroupsShowComponent,
  GroupsIndexComponent,
  GroupsEditComponent,
  ServerErrorComponent,
  SidebarComponent,
  RightSidebarComponent,
  AnswersFormComponent,
  GroupsFormComponent,
  HeaderComponent,
  FooterComponent,
  PopupComponent,
  NotFoundComponent,
} from './components/index'

import {
  AuthService,
  ApiService,
  LoadingService,
  LoggerService,
  PopupService,
  ErrorService,
} from "./services/index";
import {CoursesComponent} from "./components/courses/courses.component";

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent,
    NoContentComponent,
    XLarge,
    CoursesIndexComponent,
    LoginComponent,
    SignupComponent,
    ConfirmationComponent,
    CoursesPublicIndexComponent,
    CoursesNewComponent,
    CoursesEditComponent,
    CoursesShowComponent,
    CoursesAddQuestionComponent,
    TrainingComponent,
    TrainingResultComponent,
    SidebarComponent,
    RightSidebarComponent,
    PopupComponent,
    QuestionsFormComponent,
    AnswersFormComponent,
    CoursesFormComponent,
    //LoggedInRouterOutlet,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    LoginComponent,
    ServerErrorComponent,
    NotFoundComponent,
    ServerErrorComponent,
    QuestionAnalyzeComponent,
    ActivityEntryIndexComponent,
    CoursesComponent,
    EntriesComponent,
    EntryComponent,
    GroupsEditComponent,
    GroupsNewComponent,
    GroupsShowComponent,
    GroupsFormComponent,
    GroupsIndexComponent,
    UserAnalysisComponent,
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS
  ]
})
export class AppModule {

  constructor(
    public appRef: ApplicationRef,
    public appState: AppState
  ) {}

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}
