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
  PopupBase,
  ErrorMessage,
} from "./../../../models";

@Component({
  selector: 'courses-new',
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

export class CoursesNewComponent implements OnInit, AfterViewInit {
  public course: Course;

  // ポップアップ用
  public popup: PopupBase = new PopupBase();
  public errors: ErrorMessage[];
  //
  //public modal_id: string = "new-course-modal";
  public modal_id: string = "modal3";
  public parent_id: string;

  private _courseLoading: boolean;

  courseStartLoading(){
    this._logger.debug('course Start Loading called!!! ');
    this._courseLoading = true;
  }

  courseEndLoading(){
    this._logger.debug('course End Loading called!!! ');
    this._courseLoading = false;
  }

  //@Output() startLoading = new EventEmitter();
  //@Output() endLoading = new EventEmitter();

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
    this._logger.debug(" ***** constructor course new ***** ");
    this.course = new Course();
    //this.course.questions.push(new Question("", this.course, 0));

    // Load開始
    //this.startLoading.emit('event');
    this._loading.startLoading();
  }

  ngOnInit(){
    this._logger.debug(" ***** oninit course new ***** ");

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

    this.route.params.forEach((params: Params) => {
      this.parent_id = params['parent_id'];
    });
  }

  ngAfterViewInit(){
    this._logger.debug(" ***** oninit course AfterViewInit ***** ");
    console.log(this._loading.isLoading());
    this._loading.endLoading();
  }

  postCreateCourse(){
    this._logger.debug("***********");
    this._loading.setCurtain();
    this._courseLoading = true;
    this._api.postCreateCourse(this.course).subscribe(
      data => {
        var body = data.json();
        this._logger.debug(data);
        this._router.navigateByUrl('courses/' + body.data.course_id);
      },
      err => {
        this._error.errorInit(err);

        this.popup.contentText = this._error.errorText();
        this.popup.headerText = "コース作成エラー";
        this.popup.errorMessages = this._error.errors();
        this._popup.displayPopup(this.popup);

        this._loading.endLoading();
        this._courseLoading = false;
      },
      () => {
        this._logger.debug('signup success');
        this._courseLoading = false;
      }
    );
  }
}

