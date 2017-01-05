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
  Course,
  PopupBase,
  ErrorMessage,
} from "./../../../models";

@Component({
  selector: 'courses-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [
    ApiService,
    AuthService,
    LoggerService,
    LoadingService,
  ],
})


export class CoursesIndexComponent implements OnInit, AfterContentChecked {
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

  routerOnActivate(e) {
    console.log('routerOnActivate');
    console.log(e);
    //this._logger.debug(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`); return new Promise(resolve => {
    //  // The ChildCmp gets instantiated only when the Promise is resolved
    //  setTimeout(() => resolve(null), 1000);
    //});
  }

  routerOnDeactivate(e: any) {
    console.log('routerOnDeactivate');
    console.log(e);
    //this._logger.debug(`Finished navigating from "${prev ? prev.urlPath : 'null'}" to "${next.urlPath}"`);
    //return new Promise(resolve => {
    //  // The ChildCmp gets instantiated only when the Promise is resolved
    //  setTimeout(() => resolve(null), 1000);
    //});
  }

  ngOnInit(){
    this._logger.debug("oninit course index");
    this.coursesLoading = true;
    this._api.getCourses().subscribe(
      data => {
        var body = data.json();
        body.data.forEach((obj: any) => {

          console.log(obj);

          var course: Course = new Course();
          course.id = obj['course_id'];
          course.course_type = obj['course_type'];
          course.name = obj['name'];
          course.description = obj['description'];
          course.questions_count = obj['questions_count'];
          course.times = obj['times'];
          course.userData = {
            permission: obj['data']['permission'],
            memo: obj['data']['memo']
          };

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
  }

  getDetail(course_id: string) {
    this._logger.debug("****** get Datail *******");
    this._logger.debug(course_id);
    this._router.navigate([course_id], {relativeTo: this.route.parent})
  }

  ngAfterContentChecked() {
    //jQuery(this.el.nativeElement).find('.project-line')
    //  .each(function(i){
    //    //var self = jQuery(this.el.nativeElement).find('.project-line')[i];
    //    jQuery(this).sparkline([9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
    //      type: 'line',
    //      width: '100%',
    //      height: '30',
    //      lineWidth: 2,
    //      lineColor: '#00bcd4',
    //      fillColor: 'rgba(0, 188, 212, 0.5)',
    //    });
    //});
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
