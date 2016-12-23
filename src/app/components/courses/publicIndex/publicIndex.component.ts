import {
  Component,
  OnInit,
  ElementRef,
  AfterContentChecked,
  Output,
  EventEmitter,
} from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import {
  LoggerService,
  LoadingService,
  ApiService,
  AuthService,
  ErrorService,
  PopupService,
} from "./../../../services";
import {
  PopupBase,
  Course,
  ErrorMessage,
} from "./../../../models";


@Component({
  selector: 'courses-index',
  templateUrl: './publicIndex.component.html',
  styleUrls: ['./publicIndex.component.scss'],
  providers: [
    ApiService,
    AuthService,
    LoggerService,
    LoadingService,
  ],
})

export class CoursesPublicIndexComponent implements OnInit, AfterContentChecked {
  public courses: Course[] = [];
  public coursesLoading: Boolean;

  private _selectedCourse: Course;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _api: ApiService,
    private el: ElementRef,
    private _auth: AuthService,
    private _err: ErrorService,
    private _logger: LoggerService,
    private _loading: LoadingService,
    private _popup: PopupService
  ){
    // Load開始
    this._loading.startLoading();
  }

  ngOnInit(){
    this._logger.debug("oninit course index");
    this.coursesLoading = true;
    this._api.getPublicCourses().subscribe(
      data => {
        var body = data.json();
        body.data.forEach((obj: any) => {

          var course: Course = new Course();
          course.id = obj['course_id'];
          course.course_type = obj['course_type'];
          course.name = obj['name'];
          course.description = obj['description'];
          course.questions_count = obj['questions_count'];
          course.times = obj['times'];

          this.courses.push(course);
          this._logger.debug(this.courses);
          this.coursesLoading = false;
        } );
      },
      err => {
        this._err.errorInit(err);
        this._popup.displayError(err, "Error");
      },
      () => {
        this._logger.debug('get courses success');
        this._loading.endLoading();
      }
    );
    console.log('@@@@@@@@@@@@@@@');
  }


  getDetail(course_id: string) {
    this._logger.debug("****** get Datail *******");
    this._logger.debug(course_id);
    this._router.navigate([course_id], {relativeTo: this.route.parent})
  }

  ngAfterContentChecked() {
  }

  deleteCourse(course: Course) {
    this._selectedCourse = course;
    var popup = new PopupBase();
    popup.id = "#modal4";
    popup.contentText = course.name + "を削除してよろしいですか？";
    popup.headerText = "確認";

    popup.okFunction = this._deleteCourse.bind(this);
    popup.cancelFunction = function() {};

    this._popup.displayPopup(popup);
  }

  private _deleteCourse() {
    var index = this.courses.indexOf(this._selectedCourse);
    this._loading.startLoading();
    this._api.deleteCourse(this._selectedCourse.id).subscribe(
      data => {
        /**
         * TODO: 処理実装
         */
        this.courses.splice(index, 1);
      },
      err => {
        this._err.errorInit(err);
        this._popup.displayError(err, "Error");
      },
      () => {
        this._logger.debug('delete courses success');
        this._loading.endLoading();
      }
    )
  }
}
