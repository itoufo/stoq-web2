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
  PopupBase,
  ErrorMessage,
  Group,
} from "./../../../models";


import {Angulartics2On} from 'angulartics2';

@Component({
  selector: 'groups-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [
    ApiService,
    AuthService,
    LoggerService,
    PopupService,
    LoadingService,
  ],
  inputs: ['group', 'popup'],
})

export class GroupsIndexComponent implements OnInit, OnDestroy {
  public groups: Group[] = [];
  public managedGroups: Group[] = [];
  public popup: PopupBase;
  public selectedIndex: number;
  public showQuestion: boolean = true;


  public errors: ErrorMessage[];

  private groupsLoading: boolean = false;

  //@Output() startLoading = new EventEmitter();
  //@Output() endLoading = new EventEmitter();

  groupStartLoading(){
    this.groupsLoading = true;
  }

  groupEndLoading(){
    this.groupsLoading = false;
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
  }

  ngOnDestroy(){

  }

  ngOnInit(){
    this._logger.debug("oninit group index");
    this.groupsLoading = true;
    this._api.getGroups().subscribe(
      data => {
        var body = data.json();
        console.log(body);
        body.data.forEach((obj: any) => {
          this._setGroup(obj)
        } );
      },
      err => {
        this._error.errorInit(err);
        this._popup.displayError(err, "Error");
      },
      () => {
        this._logger.debug('get courses success');
        this._loading.endLoading();
      }
    );
  }

  addQuestion(){
    this._router.navigate(['groups', 'new']);
  }

  getDetail(group_id){
    this._router.navigate(['groups', group_id, 'detail']);
  }

  private _setGroup(obj: {
    group_id: string, name: string, group_code: string, description: string
  }){
    var group: Group = new Group();
    var is_managed = obj['role']['name'] == "manager";
    group.id = obj['group_id'];
    group.name = obj['name'];
    group.group_code = obj['group_code'];
    group.description = obj['description'];
    this.groups.push(group);
    if(is_managed){
      this.managedGroups.push(group)
    }
  }

  ngAfterViewInit(){
    this._logger.debug(" **** course form ng after view init ");
    //this.endLoading.emit('event');
  }
}

