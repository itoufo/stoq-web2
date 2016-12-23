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
  ActivityService,
  PopupService,
} from "./../../../services";

import {
  Course,
  Question,
  ErrorMessage,
  ActivitySession,
  PopupBase,
} from "./../../../models";

@Component({
  selector: 'courses-show',
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

export class CoursesShowComponent implements OnInit {
  public course: Course;
  public loading: Boolean = true;

  private _selectedQuestion: Question;

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _api: ApiService,
    private _activity: ActivityService,
    private _logger: LoggerService,
    private _loading: LoadingService,
    private _auth: AuthService,
    private _error: ErrorService,
    private _popup: PopupService
  ){
    this.loading = true;
  }


  AddQuestion(){
    this._router.navigate(['add_question'], {relativeTo: this.route});
  }

  Edit(){
    this._loading.setCurtain();
    this._router.navigate(['edit'], {relativeTo: this.route});
  }

  Start(){
    this._loading.setCurtain();

    this._api.getTrainingStart(this.course.id).subscribe(
      data => {
        var body = data.json();
        this._logger.debug("response data");
        this._logger.debug(body.data);

        if(body.data.activity.questions_count <= 0) {

          var popup = new PopupBase();

          // ヘッダの値を設定
          popup.headerText = "Error!";
          popup.contentText = "Questionが設定されていません";

          popup.id = "#modal3";
          this._popup.displayPopup(popup);
        } else {
          this._activity.setActivity('training', body.data);
          this._logger.debug('get training');
          this._router.navigate(['entry', 'training'])
        }

      },
      err => {
        // 共通処理, _error初期化
        this._popup.displayError(err, "Error!");

        //
        // ロード終了
        this._loading.endLoading();

      },
      () => {
        this._loading.endLoading();
        this._logger.debug('get start training success')
      }
    )
  }

  ngOnInit() {
    this._logger.debug(" ***** oninit course detail ***** ");
    this._loading.startLoading();
    var course_id = "";

    this.route.params.forEach((params: Params) => {
      course_id = params['course_id']; // (+) converts string 'id' to a number
    });

    this._api.getCourse(course_id).subscribe(
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
        this._popup.displayError(err, "Error!");
        // ロード終了
        this._loading.endLoading();
        this.loading = false
      },
      () => {
        this._loading.endLoading();
        this._logger.debug('get course success');
        this.loading = false
      }
    );
  }

  deleteQuestion(question: Question) {
    this._selectedQuestion = question;
    var popup = new PopupBase();

    popup.id = "#modal4";
    popup.contentText = question.text + "を削除してよろしいですか？";
    popup.headerText = "確認";

    popup.okFunction = this._deleteQuestion.bind(this);
    popup.cancelFunction = function() {};

    this._popup.displayPopup(popup);


  }

  private _deleteQuestion() {
    var index = this.course.questions.indexOf(this._selectedQuestion);
    this._loading.startLoading();
    this._api.deleteCourseQuestion(this.course, this._selectedQuestion).subscribe(
      data => {
        /**
         * TODO: 処理実装
         */
        this.course.questions.splice(index, 1);
      },
      err => {
        this._error.errorInit(err);
        this._popup.displayError(err, "Error");
      },
      () => {
        this._logger.debug('delete courses success');
        this._loading.endLoading();
      }
    )
  }

  moveAnalyze(question_id) {
    this._router.navigate(['question', 'analyze', question_id])
  }

}
