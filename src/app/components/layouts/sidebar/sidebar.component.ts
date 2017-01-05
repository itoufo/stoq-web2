import {
  Component,
  AfterViewInit,
  Input,
} from '@angular/core';
import {Location} from '@angular/common';
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
    selector: 'sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements AfterViewInit{

  constructor(
      private _location: Location,
      private _router: Router,
      private _loading: LoadingService,
      private _logger: LoggerService,
      private _auth: AuthService,
      private _err: ErrorService
    ) {
        this._logger.debug("*** About Sidebar ***");
    }
    ngAfterViewInit() {
        //Main Left Sidebar Menu
        jQuery('.sidebar-collapse').sideNav({
            edge: 'left', // Choose the horizontal origin
        });

        // FULL SCREEN MENU (Layout 02)
        jQuery('.menu-sidebar-collapse').sideNav({
            menuWidth: 240,
            edge: 'left', // Choose the horizontal origin
            // closeOnClick:true, // Set if default menu open is true
            // menuOut:false // Set if default menu open is true
        });
    }

    courseNew() {
        var premise = this.navigate(['courses', 'new']);
        //if(premise){
        //    premise.then(this.reload)
        //}
    }

    groupNew() {
        var premise = this.navigate(['groups', 'new']);
        //if(premise){
        //    premise.then(this.reload)
        //}
    }
    groupIndex() {
        var premise = this.navigate(['groups', 'index']);
        //if(premise){
        //    premise.then(this.reload)
        //}
    }


    courseMyIndex() {
        this.navigate(['courses']);
    }

    coursePublicIndex() {
        this.navigate(["courses", "public"]);
    }

    entriesIndex() {
        this.navigate(['entries']);
    }

    returnHome() {
        this.navigate(["courses"]);
    }

    reload(){
        this._loading.setCurtain();
        location.reload()
    }

    navigate(to: string[]){
        this._logger.debug('**** navigate is called ****');
        this._logger.debug(this._router);
        this._logger.debug(this._location);
        //this._logger.debug(this._router.url);
        //this._logger.debug(this._location.path());
        //this._logger.debug(this._location.normalize(to.join('/')));
        //this._logger.debug(this._location.isCurrentPathEqualTo(this._router.url));
        var condition = this._location.isCurrentPathEqualTo("/" + this._location.normalize(to.join('/')));


        this._err.hideError();

        if(!condition){ //同ページへの遷移なら false
            this._router.navigate(to);
            this._loading.startLoading();
        }

        return null;
    }
}

