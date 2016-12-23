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
  PopupService,
  ErrorService,
} from "./../../../services";
import {
  Course,
  PopupBase,
  ErrorMessage,
} from "./../../../models";

@Component({
  selector: 'courses-new',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  inputs: ["selected_question_type"],
  providers: [
    ApiService,
    AuthService,
    LoggerService,
    LoadingService,
    PopupService,
  ],
})

export class CoursesEditComponent implements OnInit, AfterViewInit {
  public course: Course;

  // ポップアップ用
  public loading: Boolean = true;

  //public modal_id: string = "new-course-modal";
  public modal_id: string = "modal3";


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

    // Load開始
    //this.startLoading.emit('event');
    this._loading.startLoading();
    console.log(this._loading.isLoading());

  }


  ngOnInit() {
    this._logger.debug(" ***** OnInit Course Edit ");
    this.loading = true;
    this._loading.startLoading();
    this.route.params.forEach((params: Params) => {
      let id = params['course_id']; // (+) converts string 'id' to a number
      this._api.getCourse(id).subscribe(
        data => {
          var body = data.json();
          this.course = new Course();
          this._logger.debug(" ****** course data fetched ******* ");
          this._logger.debug(data);

          this.course.assignParams(body.data);
          this._logger.debug("****** this course *****");
          this._logger.debug(this.course);
        },
        err => {
          // 共通処理, _error初期化
          this._error.errorInit(err);
          this._error.showError();

          // ロード終了
          this._loading.endLoading();
          this.loading = false;
        },
        () => {
          this._loading.endLoading();
          this.loading = false;
          this._logger.debug('get course success')
        }
      );
    });
  }

  ngAfterViewInit(){
    this._logger.debug(" ***** oninit course AfterViewInit ***** ");
    console.log(this._loading.isLoading());
  }

  postEditCourse(){
    this._logger.debug("***** postEditCourse ******");
    this._logger.debug(this.course);
    this._loading.setCurtain();
    this._courseLoading = true;
    this._api.postEditCourse(this.course).subscribe(
      data => {
        var body = data.json();
        this._logger.debug(body);
        this._router.navigateByUrl('courses/' + body.data.course_id);
      },
      err => {
        this._popup.displayError(err, "コース更新エラー");
        this._loading.endLoading();
        this._courseLoading = false;
      },
      () => {
        this._loading.endLoading();
        this._logger.debug('signup success');
        this._courseLoading = false;
      }
    );
  }
}

