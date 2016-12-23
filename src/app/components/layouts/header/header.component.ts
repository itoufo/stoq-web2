import {
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

import { Router } from '@angular/router';

import {
  AuthService,
  ApiService,
  LoadingService,
  LoggerService,
  ErrorService,
  PopupService,
} from "./../../../services";

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    providers: [ApiService, AuthService],
})

export class HeaderComponent {
  public title = 'Stoq';
  @Input() authed: boolean;
  @Output() startLoading = new EventEmitter();
  @Output() endLoading = new EventEmitter();


  constructor(
    private _router: Router,
    private _api: ApiService,
    private _auth: AuthService,
    private _loading: LoadingService,
    private _logger: LoggerService,
    private _err: ErrorService
  ) {
    this._logger.debug("***** Header Constructor ****");
    setInterval(() => this.startLoading.emit("event"), 1000);
    setInterval(() => this.endLoading.emit("event"), 5000);
  }


  logout() {

    //
    // ログイン画面でログアウトは無効です。
    if(this._router.url === 'login' || this._router.url === 'signup'){
      return false;
    }

    this._loading.setCurtain();
    this._api.deleteLogout().subscribe(
        data => {
            localStorage.removeItem('Uid');
            localStorage.removeItem('Client');
            localStorage.removeItem('Acess-token');
            this._auth.setCredentials();
            this._auth.setStatus(false);
            this._router.navigate(['login']);
        },
        err => {
          this._logger.error(err);
          this._auth.setStatus(false);
          this._router.navigate(['login']);
        },
        () => this._logger.debug('signup success')
    );
  }

  createCourse() {
    this.navigate('/courses/new');
  }

  courseNew() {
    this.navigate('/courses/new');
  }

  courseMyIndex() {
    this.navigate('/courses');
  }

  coursePublicIndex() {
    this.navigate('/courses/public');
  }

  returnHome() {
    this.navigate('/courses');
  }

  accountInfo() {
    this.navigate('/account');
  }



  navigate(to: string){
    this._logger.debug('**** navigate is called ****');
    this._logger.debug(this._router);
    this._logger.debug(this._loading.isLoading());
    this._err.hideError();

    if(true){ //同ページへの遷移なら false
      this._router.navigateByUrl(to);
      this._loading.startLoading();
    }
  }
}

