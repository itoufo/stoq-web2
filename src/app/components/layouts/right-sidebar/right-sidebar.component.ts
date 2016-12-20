import {Component} from '@angular/core';
import { Router } from '@angular/router';
@Component({
    selector: 'right-sidebar',
    templateUrl: './right-sidebar.component.html',
    styleUrls: ['./right-sidebar.component.css'],
})

export class RightSidebarComponent {
    constructor(private _router: Router) { }
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

