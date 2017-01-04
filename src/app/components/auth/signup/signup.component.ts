import * as jquery  from 'jquery';
import {
  Component,
  OnInit,
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

import {
  SelectValue,
  PopupBase
} from "./../../../models";

import {Angulartics2On} from 'angulartics2';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [ApiService, AuthService],
  inputs: ['email', 'password', 'password_confirmation'],
})

export class SignupComponent implements OnInit{
  private email: string;
  private password: string;
  private password_confirmation: string;
  constructor(
    private _router: Router,
    private _api: ApiService,
    private _auth: AuthService,
    private _error: ErrorService,
    private _popup: PopupService,
    private _loading: LoadingService
  ) {

  }


  navigateToLogin() {
    this._router.navigate(['signup']);  }

  ngOnInit() {
    var formId = "#signup-form";

    jquery(formId).data('validator', null);
    jquery(formId).unbind('validate');
    //jquery(formId).validate({
    //  debug: true,
    //  rules: {
    //    email: {
    //      required: true
    //    },
    //    password: {
    //      required: true
    //    },
    //    password_confirmation: {
    //      required: true
    //    }
    //  },
    //  messages: {
    //    email: {
    //      required: "メールアドレスを入力して下さい"
    //    },
    //    password: {
    //      required: "パスワードを入力して下さい"
    //    },
    //    password_confirmation: {
    //      required: "確認用パスワードを入力して下さい"
    //    }
    //  },
    //  errorElement : 'div',
    //  errorPlacement: function(error, element) {
    //    var placement = jQuery(element).data('error');
    //    if (placement) {
    //      jQuery(placement).append(error)
    //    } else {
    //      error.insertAfter(element);
    //    }
    //  },
    //  submitHandler: this.submit.bind(this),
    //  invalidHandler: this.invalidFunction.bind(this)
    //});
  }

  invalidFunction(){

  }

  submit() {
    console.log('submit signup');
    this._loading.startLoading();
    this._api.postSignup({ email: this.email, password: this.password, password_confirmation: this.password_confirmation }).subscribe(
      data => {
        var body = data.json().data;
        console.log(data.headers);

        localStorage.setItem('Access-Token', data.headers.get('Access-Token'));
        localStorage.setItem('Client', data.headers.get('Client'));
        localStorage.setItem('Uid', this.email);
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
          this._popup.displayError(err, "新規登録エラー");
          this._loading.endLoading();
      },
      () => {
        alert('確認用メールを送信しました！');
      }
    );
  }
}

