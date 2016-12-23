import {Component} from '@angular/core';
import { Router } from '@angular/router';

import {
  LoggerService,
  LoadingService,
  ApiService,
  AuthService,
  ErrorService,
  PopupService,
} from "./../../../services";

import {
  Question,
  SelectValue,
  PopupBase,
  ErrorMessage,
} from "./../../../models";


@Component({
  selector: 'courses-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss'],
  providers: [ApiService, AuthService],
})

export class QuestionsNewComponent {
  public question: Question;
  constructor(private _router: Router, private _api: ApiService, private _auth: AuthService) { }
}

