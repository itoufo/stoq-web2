import {
  Component,
  OnInit,
} from '@angular/core';
import {
  Title
} from '@angular/platform-browser';
import { Router } from '@angular/router';

import {
  LoggerService,
  LoadingService,
  ApiService,
  AuthService,
  ErrorService,
  PopupService,
} from "./../../services";

import {
  ErrorMessage,
} from "./../../models";

@Component({
  selector: 'courses',
  templateUrl: './courses.component.html',
  providers: [
    PopupService,
    ApiService,
    AuthService,
    ErrorService,
    Title,
    LoggerService,
    LoadingService,
  ],
})


export class CoursesComponent implements OnInit {
  public authenticated:boolean = false;

  // 選択されているページを覚えておくための変数。
  private selectedId:string;

  // ページ名の配列をつくる。
  private pageIds:string[] = ["Home", "Testimonial", "Faq"];

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

  routerOnActivate(e) {
    console.log('routerOnActivate');
    console.log(e);
    console.log("aaaaaaaaaaaaa");
    console.log(process.env);
    //this._logger.debug(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`); return new Promise(resolve => {
    //  // The ChildCmp gets instantiated only when the Promise is resolved
    //  setTimeout(() => resolve(null), 1000);
    //});
  }

  routerOnDeactivate(e:any) {
    console.log('routerOnDeactivate     aa');
    console.log(e);
    //this._logger.debug(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`);
    //return new Promise(resolve => {
    //  // The ChildCmp gets instantiated only when the Promise is resolved
    //  setTimeout(() => resolve(null), 1000);
    //});
  }
  ngOnInit() {
    this._logger.debug("courses component oninit");
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
}
