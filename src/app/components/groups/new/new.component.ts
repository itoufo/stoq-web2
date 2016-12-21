var jQuery, $ = require('jquery');

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
  Group,
  PopupBase,
  ErrorMessage,
  Question,
} from "./../../../models";

@Component({
  selector: 'groups-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],
  inputs: ["selected_question_type"],
  providers: [
    PopupService,
    ApiService,
    AuthService,
    LoggerService,
    LoadingService,
  ],
})

export class GroupsNewComponent implements OnInit, AfterViewInit {

  // ポップアップ用
  public popup: PopupBase = new PopupBase();
  public errors: ErrorMessage[];
  public modal_id: string = "modal3";

  public group: Group;
  public parent_id: string;

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

    this.route.params.forEach((params: Params) => {
      this.parent_id = params['parent_id']; // (+) converts string 'id' to a number
    });

    // POPUPのデザインを選択
    this.popup.id = "#modal3";

    jQuery("form").unbind('submit');
    jQuery('.modal-trigger').unbind('click');
    jQuery('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .5, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
      ready: function() {
        //alert('Ready');
      }, // Callback for Modal open
      complete: function() {
        //alert('Closed');
      } // Callback for Modal close
    });
  }

  ngAfterViewInit(){
    this._logger.debug(" ***** oninit course AfterViewInit ***** ");
    console.log(this._loading.isLoading());
    this._loading.endLoading();
  }

}

