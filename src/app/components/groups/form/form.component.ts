var jQuery, $ = require('jquery');
import {
  Component,
  ElementRef,
  OnInit,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
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
  Course,
  ErrorMessage,
  PopupBase,
  Group,
} from "./../../../models";

import {Angulartics2On} from 'angulartics2';

export interface SelectValue {
  value: string;
  name: string;
}

@Component({
  selector: 'groups-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [
    ApiService,
    AuthService,
    LoggerService,
    PopupService,
    LoadingService,
  ],
  inputs: ['parent', 'group', 'popup'],
})

export class GroupsFormComponent implements OnInit, OnDestroy {
  public group: Group;
  public popup: PopupBase;
  public parent: string = null;
  public selectedIndex: number;
  public showQuestion: boolean = true;


  public errors: ErrorMessage[];

  private questionLoading: boolean = false;

  //@Output() startLoading = new EventEmitter();
  //@Output() endLoading = new EventEmitter();

  questionStartLoading(){
    this.questionLoading = true;
  }

  questionEndLoading(){
    this.questionLoading = false;
  }


  constructor(
    private el: ElementRef,
    private _logger: LoggerService,
    private _loading: LoadingService,
    private _api: ApiService,
    private _router: Router,
    private _error: ErrorService,
    private _popup: PopupService
  ) {
    this._logger.debug(" ***** Coustructor courses form component *****");
    this.group = new Group();
  }

  ngOnDestroy(){

  }

  ngOnInit() {
    this._logger.debug(" ***** ngOnInit courses form component *****");
    //this.startLoading.emit('event');
    this.startValidation();
  }

  ngAfterViewInit(){
    this._logger.debug(" **** course form ng after view init ");
    //this.endLoading.emit('event');
  }
  postCreateGroup(){
    this._logger.debug("****@@@@@@@@@@*******");
    this._loading.setCurtain();
    this._api.postCreateGroup(this.group, this.parent).subscribe(
      data => {
        var body = data.json();
        this._logger.debug(data);
        this._router.navigateByUrl('groups/' + body.data.group_id);
      },
      err => {
        this._error.errorInit(err);

        this.popup.contentText = this._error.errorText();
        this.popup.headerText = "コース作成エラー";
        this.popup.errorMessages = this._error.errors();
        this._popup.displayPopup(this.popup);

        this._loading.endLoading();
      },
      () => {
        this._logger.debug('create group success');
      }
    );
  }

  postUpdateGroup(){
    this._logger.debug("****** postCreateCourse *****");
    this._logger.debug(this.group);
    this._loading.setCurtain();
    this._api.postEditGroup(this.group).subscribe(
      data => {
        var body = data.json();
        this._logger.debug(data);
        this._router.navigateByUrl('groups/' + this.group.id + '/detail');
      },
      err => {
        this._popup.displayError(err, "グループ更新エラー");
        this._loading.endLoading();
      },
      () => {
        this._loading.endLoading();
        this._logger.debug('signup success');
      }
    );
  }

  startValidation() {
    var formId = "#group_form";

    jQuery(formId).data('validator', null);
    jQuery(formId).unbind('validate');

    jQuery(formId).validate({
      rules: {
        name: {
          required: true
        },
        group_code: {
          required: true
        }
      },
      messages: {
        name: {
          required: "グループ名を入力して下さい",
        },
        group_code: {
          required: "グループコードを入力してください。"
        }
      },
      errorElement : 'div',
      errorPlacement: function(error, element) {
        var placement = jQuery(element).data('error');
        if (placement) {
          jQuery(placement).append(error)
        } else {
          error.insertAfter(element);
        }
      },
      submitHandler: this.submitFunction.bind(this)
    });
  }

  submitFunction() {
    console.log(this.group);
    if(this.group.id) {
      this.postUpdateGroup();
    } else {
      this.postCreateGroup();
    }
  }

}

