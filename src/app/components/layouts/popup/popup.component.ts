import {
  Component,
  Input,
} from '@angular/core';
import { Router } from '@angular/router';
import {
    ErrorMessage,
    PopupBase
} from '../../../models';

import {
  AuthService,
  ApiService,
  LoadingService,
  LoggerService,
  ErrorService,
  PopupService,
} from "./../../../services";

@Component({
    selector: 'popup',
    templateUrl: './popup.component.html',
    styleUrls: ['./popup.component.scss'],
    inputs: ['popupBase'],
})

export class PopupComponent {

    public popupBase: PopupBase;

    constructor(private _router: Router) {
        console.log("*** About Popup ***");
        //console.log(this._router);
        this.popupBase = new PopupBase();
    }
}

