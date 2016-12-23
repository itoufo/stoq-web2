import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Response } from '@angular/http';

@Injectable()
export class Authentication {
  private uid: string;
  private id: string;
  private accountName: string;
  private client: string;
  private accessToken: string;
  private email: string;
  //private expiry: number;
  private authenticated: boolean = false;

  constructor() {
    this.setCredentials();
  }
  getEmail() {
    return this.email;
  }
  getStatus() {
    return this.authenticated;
  }

  getUid():string {
    return this.uid;
  }

  getId():string {
    return this.id;
  }


  getAccountName():string {
    return this.accountName;
  }

  setStatus(value: boolean) {
    this.authenticated = value;
  }
  saveCredentials(id: string, account_name: string, email: string, uid: string, client: string, accessToken: string) {
    localStorage.setItem('Access-Token', accessToken);
    localStorage.setItem('Client', client);
    localStorage.setItem('Uid', uid);
    localStorage.setItem('id', id);
    localStorage.setItem('email', email);
    localStorage.setItem('account_name', account_name);
    this.setCredentials();
  }

  isCredentialsValid(): boolean {
    this.setCredentials();
    return this._status();
  }


  setCredentials() {
    this.accessToken = localStorage.getItem('Access-Token');
    this.client = localStorage.getItem('Client');
    this.uid = localStorage.getItem('Uid');
    this.id = localStorage.getItem('id');
    this.email = localStorage.getItem('email');
    this.accountName = localStorage.getItem('account_name');
    this.authenticated = this._status();
    return this;
  }

  _status(): boolean {
    return Boolean(this.id && this.uid && this.client && this.accessToken);
  }
}

var AUTH = new Authentication();

@Injectable()
export class AuthService {
  public authenticated: boolean = false;

  constructor(private _api: ApiService, private _router: Router) {
    this.setCredentials();
  }

  // localstrage に記憶する
  rememberCredentials(remember: boolean, email:string, password: string){
    if(remember){
      localStorage.removeItem('remember-name');
      localStorage.removeItem('remember-password');
      localStorage.setItem('remember-name', email);
      localStorage.setItem('remember-password', password);
    }
  }

  setResponse(response: Response){
    var body = response.json().data;
    // なんで forefoxだと小文字で、chromeだと大文字になんねん
    this.saveCredentials(
      body.id,
      body.account_name,
      body.email,
      response.headers.get('uid') || response.headers.get('Uid'),
      response.headers.get('client') || response.headers.get('Client'),
      response.headers.get('access-token') || response.headers.get('Access-Token')
    );
    this.setStatus(true);
  }

  //getStatus() { return AUTH.getStatus(); }
  getAuth(): Authentication {return AUTH;}
  getStatus():boolean { return AUTH.getStatus(); }

  getId():string {return AUTH.getId();}
  getUid():string {return AUTH.getUid();}
  showAccountName(): string{
    return AUTH.getAccountName();
  }
  getEmail(): string {
    return AUTH.getEmail();
  }
  showUid():string {
    return AUTH.getUid().replace(/@.*/, "");
  }
  setStatus(val: boolean) { AUTH.setStatus(val); }
  saveCredentials(id: string, account_name: string, email: string, uid: string, client: string, accessToken: string) {
    AUTH.saveCredentials(id, account_name, email, uid, client, accessToken);
  }
  isCredentialsValid() { return AUTH.isCredentialsValid(); }
  setCredentials() {
    this.authenticated = AUTH.isCredentialsValid();
  }
  check_if_authenticated(callback: any, args: any, force: boolean = false) {
    this.setCredentials();

    this._router.navigateByUrl('/login');

    // localstrageにクレデンシャルが保存されてない場合無効
    if (!this.isCredentialsValid()) {
      this.setStatus(false);
      return false;
    }

    // 認証済みかつ、強制認証フラグが無効の場合有効
    if (!force && this.getStatus()) {
      this.setStatus(true);
      return true;
    }

    console.log("start checking credentials");
    this._api.getValidateToken().subscribe(
      data => {
        var body = data.json();
        var result: boolean = Boolean(body.success);
        this.setStatus(result);
        callback(result, args);
      },
      err => {
        console.log(err);
        this.setStatus(false);
        callback(false, args);
      },
      () => console.log("complete credentials checking")
    );
  }
}
