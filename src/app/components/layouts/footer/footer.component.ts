import {
  Component,
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


@Component({
    selector: 'footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    providers: [ApiService, AuthService],
})

export class FooterComponent {
  public title = 'Stoq';
  constructor(private _router: Router, private _api: ApiService, private _auth: AuthService) { }

  createCourse() {
    this._router.navigate(['Courses', {}]);
  }

  logout() {
    this._api.deleteLogout().subscribe(
        data => {
            localStorage.removeItem('Uid');
            localStorage.removeItem('Client');
            localStorage.removeItem('Acess-token');
            this._router.navigate(['Login', {}]);
        },
        err => console.log(err),
        () => console.log('signup success')
    );
  }

  courseNew() {
    this._router.navigate(['CoursesNew', {}]);
  }

  courseMyIndex() {
    this._router.navigate(['CoursesIndex', {}]);
  }

  coursePublicIndex() {
    this._router.navigate(['CoursesIndex', {}]);
  }
  returnHome() {
    this._router.navigate(['Home', {}]);
  }
}
