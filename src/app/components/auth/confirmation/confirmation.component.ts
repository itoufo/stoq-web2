import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  AuthService,
  ApiService,
  LoadingService,
  LoggerService,
  ErrorService,
} from "./../../../services";


@Component({
  selector: 'login',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
  providers: [
    ApiService,
    AuthService,
    LoggerService,
    LoadingService,
  ],
  inputs: ['email', 'password'],
})
export class ConfirmationComponent implements OnInit, AfterViewInit{

  private email;
  private password;

  constructor(
    private _api: ApiService,
    private _auth: AuthService,
    private _logger: LoggerService,
    private _loading: LoadingService
  ) {

  }

  ngOnInit(){
    this._loading.startLoading();
  }

  ngAfterViewInit(){
    this._loading.endLoading();
  }
}



