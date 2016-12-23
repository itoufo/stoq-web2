import {
  Component,
  Output,
  EventEmitter,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {
  LoggerService,
  LoadingService,
  ApiService,
  AuthService,
  ErrorService,
  PopupService,
} from "./../../../services";
import {
  Course,
  Question,
  ErrorMessage,
  PopupBase,
  Group,
} from "./../../../models";

@Component({
  selector: 'groups-new',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  inputs: ["selected_question_type"],
  providers: [
    PopupService,
    ApiService,
    AuthService,
    LoggerService,
    LoadingService,
  ],
})

export class GroupsEditComponent implements OnInit, AfterViewInit {

  // ポップアップ用
  public popup: PopupBase = new PopupBase();
  public errors: ErrorMessage[];
  //
  //public modal_id: string = "new-course-modal";
  public modal_id: string = "modal3";

  public group: Group;
  public loading: boolean;

  private _courseLoading: boolean;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private  _api: ApiService,
    private _auth: AuthService,
    private _logger: LoggerService,
    private _loading: LoadingService,
    private _error: ErrorService,
    private _popup: PopupService
  ) {
    this._logger.debug(" ***** constructor Groups new ***** ");
    this.group = new Group();

    // Load開始
    //this.startLoading.emit('event');
    this._loading.startLoading();
    console.log(this._loading.isLoading());

  }

  ngOnInit(){
    this._logger.debug(" ***** oninit course new ***** ");

    var group_id = "";

    this.route.params.forEach((params: Params) => {
      group_id = params['group_id']; // (+) converts string 'id' to a number
    });


    this._api.getGroup(group_id).subscribe(
      data => {
        var body = data.json();
        this.group = new Group();
        this.group.assignParams(body.data);
      },
      err => {
        // 共通処理, _error初期化
        this._error.errorInit(err);
        this._error.showError();
        this._popup.displayError(err, "Error!");
        // ロード終了
        this._loading.endLoading();
        this.loading = false
      },
      () => {
        this._loading.endLoading();
        this.loading = false
      }
    );

  }

  ngAfterViewInit(){
    this._logger.debug(" ***** oninit course AfterViewInit ***** ");
    console.log(this._loading.isLoading());
    this._loading.endLoading();
  }
}

