// エラーメッセージを解釈・整形するサービス
// 個々のエラー描写は各コンポーネントに任せる

import {Injectable} from '@angular/core';
import { Router } from '@angular/router';

import {
  ApiService,
  AuthService,
} from "../services";

import {
  ErrorMessage
} from "../models";

@Injectable()

export class ErrorService {
  public authenticated: boolean = false;
  private _type: string;
  private _err:{
    _body?: string,
    status?: string
  } = {};

  private _errJson: {errors?: Array<any>};

  constructor(
    private _api: ApiService,
    private _auth:  AuthService,
    private _router: Router
  ) {
    showError  = false;
    errorType = null;
  }

  errorInit(err) {
    console.log(err);
    this._err = err;
    var commonError = false;

    if (err.status === 401) {
      this._type = "401";
      console.log("401 Error!");
      localStorage.removeItem('Uid');
      localStorage.removeItem('Client');
      localStorage.removeItem('Acess-token');
      this._auth.setStatus(false);
      this._router.navigateByUrl('/login');
      commonError = true;
    }

    if(err.status === 404){
      this.setErrorType('notFound');
      console.log('Content Not Found!!');
      commonError = true;
    }

    if(err.status === 500){
      this.setErrorType('serverError');
      this.showError();
      console.log('Internal Server Error!!');
      commonError = true;
      //this._router.navigate(['Error404', {}]);
    }

    return !commonError;
    //if(err.status === 404){
    //  console.log('errorcard Error!!');
    //  this._router.navigate(['Error404', {}]);
    //}
  }

  // エラーメッセージの取得
  // params が定義されていない場合に適用
  // 全部単純につないでるだけだから雑だよね...
  // 非推奨！
  errorText(separator: string = ", "): string{
    var text = "";
    this._errJson = JSON.parse(this._err._body);


    this._errJson.errors.forEach(error => {
      text =  text
        + " "
        + error.messages.join(separator);
    });
    return text;
  }


  errorTextLi(separator: string = ", "): string{
    var text = "";
    this._errJson = JSON.parse(this._err._body);

    this._errJson.errors.forEach(error => {
      text =  text
        + "<li>" +  error.messages.join(separator) + "</li>";
    });
    return text;
  }

  // エラーステータスコードの取得
  errorStatus(){
    return this._err.status;
  }

  // エラーメッセージオブジェクトの取得
  errors(): ErrorMessage[] {
    var errors: ErrorMessage[] = [];
    this._errJson = JSON.parse(this._err._body);
    this._errJson.errors.forEach(error => {
      errors.push(new ErrorMessage(error));
    });

    return errors;
  }

  errorType(): string {
    return errorType;
  }

  setErrorType(type: string) {
    errorType = type;
  }

  showError() {
    setTimeout(()=> {showError = true;}, 0);
  }

  hideError() {
    setTimeout(()=> {showError = false;}, 0);
  }
  errorViewStatus(): boolean {
    return showError;
  }

  replaceParam(param: string): string {
    var reg = /\[(\w+)\]/g;
    return param.replace(reg, "_$1");
  }
}

var errorType: string = null;
var showError: boolean;
