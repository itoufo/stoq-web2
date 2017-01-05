import * as jquery from 'jquery';
/// <reference path="../../../../../node_modules/@types/jquery.validation/index.d.ts" />
import 'jquery-validation';

import {
  Component,
  OnInit,
} from '@angular/core';
import {Router, Params} from '@angular/router';


import {
  AuthService,
  ApiService,
  LoadingService,
  LoggerService,
  ErrorService,
  PopupService,
} from "./../../../services";

import {
  SelectValue,
  PopupBase
} from "./../../../models";

import {Angulartics2On} from 'angulartics2';

@Component({
  selector: 'signup',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
  providers: [ApiService, AuthService],
  inputs: ['email', 'password', 'password_confirmation'],
})

export class PasswordResetComponent implements OnInit{
  private email: string;
  private password: string;
  private password_confirmation: string;

  private authParams: Params;

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _auth: AuthService,
    private _error: ErrorService,
    private _popup: PopupService,
    private _loading: LoadingService
  ) {
    var params = _router.parseUrl(_router.url).queryParams;

    console.log(_router.url);
    console.log(params);

    this.authParams = {};
    this.authParams['token'] = params['token'];
    this.authParams['uid'] = params['uid'];
    this.authParams['client'] = params['client_id'];
  }


  navigateToLogin() {
    this._router.navigate(['signup']);  }

  ngOnInit() {
    var formId = "#reset_password-form";

    jquery(formId).data('validator', null);
    jquery(formId).unbind('validate');
    jquery(formId).validate({
      debug: true,
      rules: {
        password: {
          required: true
        },
        password_confirmation: {
          required: true,
          equalTo: "#password"
        }
      },
      messages: {
        password: {
          required: "パスワードを入力して下さい"
        },
        password_confirmation: {
          required: "確認用パスワードを入力して下さい"
        }
      },
      errorElement : 'div',
      errorPlacement: function(error, element) {
        var placement = jQuery(element).data('error');
        if (placement) {
          jQuery(placement).append(error)
        } else {
          error.insertAfter(element);
        }
      },
      submitHandler: this.submit.bind(this),
      invalidHandler: this.invalidFunction.bind(this)
    });
  }

  invalidFunction(){

  }

  submit() {
    console.log('submit signup');
    this._loading.startLoading();
    this._api.putEditPassword(
      {
        password: this.password,
        password_confirmation: this.password_confirmation
      }, this.authParams).subscribe(
      data => {
        var body = data.json().data;
      },
      err => {
        console.log(err);
        this._error.errorInit(err);

          /**
           * Popup 作成処理
           * @type {PopupBase}
           */
          var popup = new PopupBase();
          popup.id = "#modal3";
          this._popup.displayError(err, "再設定エラー");
          this._loading.endLoading();
      },
      () => {
        alert('パスワードを更新しました');
      }
    );
  }
}

