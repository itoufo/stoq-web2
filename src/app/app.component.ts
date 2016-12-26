/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';

import {
  ApiService,
  ActivityService,
  AuthService,
  ErrorService,
  LoadingService,
  LoggerService,
  PopupService,
} from './services/index';

import {
  ServerErrorComponent,
  NotFoundComponent,
} from "./components/index";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ],
  providers: [
    Location,
    PopupService,
    ApiService,
    AuthService,
    ErrorService,
    LoggerService,
    LoadingService,
  ]
})
export class AppComponent {
  angularclassLogo = 'assets/img/angularclass-avatar.png';
  name = 'Angular 2 Webpack Starter';
  url = 'https://twitter.com/AngularClass';
  public authenticated: boolean = false;

  // 選択されているページを覚えておくための変数。
  private selectedId: string;

  // ページ名の配列をつくる。
  private pageIds: string[]    = [ "Home", "Testimonial", "Faq" ];

  public routerOnActivate(e) {
    console.log('routerOnActivate');
    console.log(e);
    //this._logger.debug(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`); return new Promise(resolve => {
    //  // The ChildCmp gets instantiated only when the Promise is resolved
    //  setTimeout(() => resolve(null), 1000);
    //});
  }

  public routerOnDeactivate(e: any) {
    console.log('routerOnDeactivate');
    console.log(e);
    //this._logger.debug(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`);
    //return new Promise(resolve => {
    //  // The ChildCmp gets instantiated only when the Promise is resolved
    //  setTimeout(() => resolve(null), 1000);
    //});
  }



  constructor(
    private _router: Router,
    private _api: ApiService,
    private _auth: AuthService,
    private _title: Title,
    private _logger: LoggerService,
    private _loading: LoadingService,
    private _err: ErrorService,
    private _popup: PopupService
  ) {
    this._loading.startLoading();
    this._auth.setCredentials();
    //_router.subscribe( ( path ) => {
    //  this.setSelected( path );
    //});
  }


  // 必要あれば、ベースのタイトルを用意する。
  private baseTitle: string = "学習プラットフォーム StoQ";

  // ページタイトルのハッシュを用意する。
  private pageTitles: Object = {
    home:        "Home | "        + this.baseTitle,
    testimonial: "Testimonial | " + this.baseTitle,
    faq:         "Faq | "         + this.baseTitle,
    login:       "Login | " + this.baseTitle,
    "courses/index": 'Courses | ' + this.baseTitle,
    "courses/new": 'New Course | ' + this.baseTitle,
  };

  private loading: boolean = false;

  /**
   * 指定のページを選択されている状態にし、ページタイトルをパスに対応するものに変更する。
   * 小文字に統一。
   */
  private setSelected( routeObj: {
    status: string,
    instruction: any
  }) {

    // selectedIdを更新。小文字に統一。
    this.selectedId = routeObj.instruction.routeName.toLowerCase();

    // ページタイトルを更新。
    let title = this.pageTitles[ this.selectedId ];
    this._title.setTitle( title );

  }

  ngOnInit() {
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
  }

  startLoading(){
    this.loading = true;
  }

  endLoading(){
    this.loading = false;
  }
}

/*
 * Please review the https://github.com/AngularClass/angular2-examples/ repo for
 * more angular app examples that you may copy/paste
 * (The examples may not be updated as quickly. Please open an issue on github for us to update it)
 * For help or questions please contact us at @AngularClass on twitter
 * or our chat on Slack at https://AngularClass.com/slack-join
 */
