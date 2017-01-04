import * as jquery from 'jquery';
/// <reference path="../../../../../node_modules/@types/jquery.validation/index.d.ts" />
import 'jquery-validation';

import {
  Component,
  OnInit,
  AfterViewInit,
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

import { Response } from '@angular/http';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [
    ApiService,
    AuthService,
    LoggerService,
    LoadingService,
  ],
  inputs: ['email', 'password'],
})
export class LoginComponent implements OnInit, AfterViewInit{

  email;
  password;
  remember;

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _auth: AuthService,
    private _logger: LoggerService,
    private _loading: LoadingService
  ) {
    this.email = localStorage.getItem('remember-name');
    this.password = localStorage.getItem('remember-password');
    if(this.email || this.password){
      this.remember = true;
    }
  }

  ngOnInit(){
    this._loading.startLoading();

    var formId = "#login-form";

    jquery(formId).data('validator', null);
    jquery(formId).unbind('validate');
    jquery(formId).unbind('submit');

    jquery(formId).validate({
      debug: true,
      rules: {
        email: "required",
        password: "required"
      },
      messages: {
        email: {
          required: "メールアドレスを入力して下さい"
        },
        password: {
          required: "パスワードを入力して下さい"
        },
      },
      errorElement : 'div',
      errorPlacement: function(error, element) {
        var placement = jquery(element).data('error');
        if (placement) {
          jquery(placement).append(error)
        } else {
          error.insertAfter(element);
        }
      },
      submitHandler: this.submit.bind(this),
    });
  }

  invalidFunction() {

  }

  ngAfterViewInit(){
    this._loading.endLoading();
  }

  navigateToSignup() {
    this._router.navigate(['signup']);
  }

  submit() {
    console.log("login submit!!");
    this._loading.setCurtain();
    this._api.postLogin({ email: this.email, password: this.password }).subscribe(
      (data: Response) => {
        this._auth.setResponse(data);
        this._auth.rememberCredentials(this.remember, this.email, this.password);
        // ページ遷移
        this._router.navigate(['courses', 'public']);
      },
      (err) => {
        this._logger.error(err);
        this._loading.endLoading();
        this._auth.setStatus(false);
        console.log(Materialize);
        console.log(Materialize.toast);
        Materialize.toast('<span>ログインに失敗しました。</span>', 1500)
      },
      () => this._logger.debug('login success')
    );
  }
}



