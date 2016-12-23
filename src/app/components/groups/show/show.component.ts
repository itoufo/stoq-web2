import {
  Component,
  OnInit
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {
  LoggerService,
  LoadingService,
  ApiService,
  AuthService,
  ErrorService,
  PopupService,
  ActivityService,
} from "./../../../services";

import {
  Course,
  Group,
  PopupBase,
  ErrorMessage,
  Question,
} from "./../../../models";

import {Angulartics2On} from 'angulartics2';

@Component({
  selector: 'group-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss'],
  providers: [
    ApiService,
    AuthService,
    ActivityService,
    LoggerService,
    PopupService
  ],
})

export class GroupsShowComponent implements OnInit {
  public group: Group;
  public loading: Boolean = true;

  private _selectedQuestion: Question;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _api: ApiService,
    private _logger: LoggerService,
    private _loading: LoadingService,
    private _error: ErrorService,
    private _popup: PopupService
  ){
    this.loading = true;
  }


  AddGroup(){
    sessionStorage.setItem('selectedGroup', this.group.id);
    this._router.navigate(['groups', 'new', 'parent', this.group.id]);
  }

  AddCourse(){
    this._router.navigate(['courses', 'new', 'parent', this.group.id]);
  }

  Edit(){
    this._loading.setCurtain();
    this._router.navigate(['groups', this.group.id,'edit']);
  }

  ngOnInit() {
    this._loading.startLoading();
    var group_id = "";

    this.route.params.forEach((params: Params) => {
      group_id = params['group_id']; // (+) converts string 'id' to a number
    });

    this._api.getGroup(group_id).subscribe(
      data => {
        var body = data.json();
        console.log(body);
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

  authGroup(){
    if(this.group.role_name == "manager"){
      return true;
    }else{
      return false;
    }
  }

  delete() {
    var popup = new PopupBase();

    popup.id = "#modal4";
    popup.contentText = this.group.name + "を削除してよろしいですか？";
    popup.headerText = "確認";

    popup.okFunction = this._delete.bind(this);
    popup.cancelFunction = function() {};

    this._popup.displayPopup(popup);
  }

  private _delete() {

  }

}
