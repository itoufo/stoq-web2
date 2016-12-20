import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {switchMap} from "rxjs/operator/switchMap";

import {
  Course,
  Question,
  ActivitySession,
  ActivityParams,
} from './../models'

import {
  AuthService,
  ApiService,
  LoadingService,
  LoggerService,
  ErrorService,
  PopupService,
} from "./../services";


var CURRENT_ACTIVITY: ActivitySession;

@Injectable()
export class ActivityService {
  constructor(
    private _api: ApiService,
    private _logger: LoggerService,
    private _loading: LoadingService,
    private _error: ErrorService
  ) {

  }

  setActivitySession(activity: ActivitySession){
    CURRENT_ACTIVITY = activity;
    localStorage.setItem('CurrentActivity', CURRENT_ACTIVITY.entry_id);
  }

  setActivity(activity_type: string, activity_params: ActivityParams){
    var session: ActivitySession = new ActivitySession(activity_type, activity_params);
    this.setActivitySession(session);
  }

  getActivity() {
    if(CURRENT_ACTIVITY){
      return CURRENT_ACTIVITY;
    }
    return null;
  }

  removeActivity() {
    localStorage.removeItem('CurrentActivity');
    CURRENT_ACTIVITY = null;
  }
}

/***
export class Authentication {
  private uid: string;
  private client: string;
  private accessToken: string;
  //private expiry: number;
  private authenticated: boolean = false;

  constructor() {
    this.setCredentials();
  }

  getStatus() {
    return this.authenticated;
  }

  setStatus(value: boolean) {
    this.authenticated = value;
  }
  saveCredentials(uid: string, client: string, accessToken: string) {
    localStorage.setItem('Access-Token', accessToken);
    localStorage.setItem('Client', client);
    localStorage.setItem('Uid', uid);
    this.setCredentials();
  }

  isCredentialsValid() {
    this.setCredentials();
    return (this.uid && this.client && this.accessToken);
  }
  setCredentials() {
    this.accessToken = localStorage.getItem('Access-Token');
    this.client = localStorage.getItem('Client');
    this.uid = localStorage.getItem('Uid');
  }
}

var AUTH = new Authentication();

@Injectable()
export class AuthService {
  public authenticated: boolean = false;

  constructor(private _api: ApiService, private _router: Router) {
    this.setCredentials();
  }

  getStatus() { return AUTH.getStatus(); }
  setStatus(val: boolean) { AUTH.setStatus(val); }
  saveCredentials(uid: string, client: string, accessToken: string) {
    AUTH.saveCredentials(uid, client, accessToken);
  }
  isCredentialsValid() { return AUTH.isCredentialsValid(); }
  setCredentials() { AUTH.setCredentials(); }
  check_if_authenticated(callback: any, args: any, force: boolean = false) {
    this.setCredentials();

    this._router.navigate(['Login', {}]);

    // localstrageにクレデンシャルが保存されてない場合無効
    if (!this.isCredentialsValid()) {
      console.log("no credentials found");
      this.setStatus(false);
      return false;
    }

    // 認証済みかつ、強制認証フラグが無効の場合有効
    if (!force && this.getStatus()) {
      console.log("already authenticated");
      this.setStatus(true);
      return true;
    }

    console.log("start checking credentials");
    this._api.getValidateToken().subscribe(
      data => {
        var result: boolean = Boolean(data.success);
        console.log(data);
        console.log(data.success);
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
 ***/
