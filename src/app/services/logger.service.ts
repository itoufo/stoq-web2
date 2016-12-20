import {Injectable} from '@angular/core';

import {
  ApiService,
} from './../services';

@Injectable()
export class LoggerService {
  public authenticated: boolean = false;
  //
  // Loglevel
  //  1: error
  //  2: warn
  //  3: notice
  //  4: info
  //  5: debug
  private _logLevel: number = 5;

  // TODO: logサーバに飛ばすべ

  constructor(
    private _api: ApiService
  ) {

  }

  public debug(arg: any) {
    if(this._logLevel >= 5) {
      this._log(arg);
    }
  }

  public info(arg: any) {
    if(this._logLevel >= 4) {
      this._log(arg);
    }
  }

  public notice(arg: any) {
    if(this._logLevel >= 3) {
      this._log(arg);
    }
  }

  public warn(arg: any) {
    if(this._logLevel >= 2) {
      this._log(arg);
    }
  }

  public error(arg: any) {
    if(this._logLevel >= 1) {
      this._log(arg);
    }
  }

  private _log(arg: any) {
    console.log(arg);
  }
}
