import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Router, Routes } from '@angular/router';

import {
  AuthService,
  ApiService,
  LoadingService,
  LoggerService,
  ErrorService,
} from "./../../../services";



@Component({
  selector: "notFound",
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.css'],
  providers: [
    ApiService,
    AuthService,
    LoggerService,
    LoadingService,
  ],
})

export class NotFoundComponent   implements OnInit, AfterViewInit{

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _auth: AuthService,
    private _logger: LoggerService,
    private _loading: LoadingService
  ) {}

  ngOnInit(){
    this._loading.startLoading();
  }

  ngAfterViewInit(){
    this._loading.endLoading();
  }
}
