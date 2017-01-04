"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var index_1 = require('./../models/index');
var CURRENT_ACTIVITY;
var ActivityService = (function () {
    function ActivityService(_api, _logger, _loading, _error) {
        this._api = _api;
        this._logger = _logger;
        this._loading = _loading;
        this._error = _error;
    }
    ActivityService.prototype.setActivitySession = function (activity) {
        CURRENT_ACTIVITY = activity;
        localStorage.setItem('CurrentActivity', CURRENT_ACTIVITY.entry_id);
    };
    ActivityService.prototype.setActivity = function (activity_type, activity_params) {
        var session = new index_1.ActivitySession(activity_type, activity_params);
        this.setActivitySession(session);
    };
    ActivityService.prototype.getActivity = function () {
        if (CURRENT_ACTIVITY) {
            return CURRENT_ACTIVITY;
        }
        return null;
    };
    ActivityService.prototype.removeActivity = function () {
        localStorage.removeItem('CurrentActivity');
        CURRENT_ACTIVITY = null;
    };
    ActivityService = __decorate([
        core_1.Injectable()
    ], ActivityService);
    return ActivityService;
}());
exports.ActivityService = ActivityService;
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
//# sourceMappingURL=activity.service.js.map