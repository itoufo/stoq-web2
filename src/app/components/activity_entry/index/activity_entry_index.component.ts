import {
  Component,
  AfterViewInit,
  OnInit,
  OnChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import {
  ActivityService,
  AuthService,
  ApiService,
  LoadingService,
  LoggerService,
  ErrorService,
  PopupService,
} from "./../../../services";

import {
  Course,
  Question,
  ErrorMessage,
  Answer,
  Result,
  PopupBase,
  ActivitySession,
  ActivityEntry,
} from "../../../models";


@Component({
  selector: 'courses-show',
  templateUrl: './activity_entry_index.component.html',
  styleUrls: ['./activity_entry_index.component.css'],
  providers: [
    ApiService,
    AuthService,
    ActivityService,
    LoggerService,
    PopupService,
  ],
})

export class  ActivityEntryIndexComponent implements OnInit, AfterViewInit {


  activitys: ActivityEntry[] = [];
  constructor(
    private _router: Router,
    private _api: ApiService,
    private _activity: ActivityService,
    private _auth: AuthService,
    private _logger: LoggerService,
    private _error: ErrorService,
    private _loading: LoadingService,
    private _popup: PopupService
  ) {
    this._loading.setCurtain();
  }

  ngOnInit() {
    this._loading.setCurtain();
    this._api.getEntries().subscribe(
      data => {
        var body = data.json();
        this._logger.debug("Data of get Entries");
        this._logger.debug(data);
        body.data.forEach(
          entry => {
            var activityEntry = new ActivityEntry();
            activityEntry.assignParams(entry);
            this.activitys.push(activityEntry);
          }
        )
      },
      err => {
        this._error.errorInit(err);
        this._popup.displayError(err, "Error!");
      },
      () => {
        this._loading.endLoading();
      }
    )
  }

  showResult(entry_id: string) {
    this._loading.setCurtain();
    this._router.navigate([ 'entries', 'results', entry_id])
  }

  startEntry(entry_id: string) {
    this._loading.setCurtain();
    localStorage.setItem('CurrentActivity', entry_id);
    this._router.navigate(['entry', 'training', {}]);
  }

  ngAfterViewInit() {

  }

}
