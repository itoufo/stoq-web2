import {
  Component,
  Output,
  EventEmitter,
  AfterViewInit,
  OnInit,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import {
  AuthService,
  ApiService,
  LoadingService,
  LoggerService,
  ErrorService,
  PopupService,
} from "./../../../services";

import {
  Course,
  ErrorMessage,
  Question,
  PopupBase,
  SelectValue,
} from "./../../../models";

@Component({
  selector: 'courses-new',
  templateUrl: './addQuestion.component.html',
  styleUrls: ['./addQuestion.component.scss'],
  inputs: [
    "selected_question_type"
  ],
  providers: [
    ApiService,
    AuthService,
    LoggerService,
    LoadingService,
    PopupService,
  ],
})

export class CoursesAddQuestionComponent implements OnInit, AfterViewInit {
  public course: Course;
  public question: Question;

  //public modal_id: string = "new-course-modal";
  public modal_id: string = "modal3";
  private _courseLoading: boolean;
  private _questionLoading: boolean;

  // TODO: 共通化
  public questionAttributeTypes: SelectValue[] = [{ value: 'select', name: '選択問題' }, { value: 'input', name: '穴埋め問題' }, { value: 'lecture', name: '講義資料' }];

  courseStartLoading(){
    this._logger.debug('course Start Loading called!!! ');
    this._questionLoading = true;
  }

  courseEndLoading(){
    this._logger.debug('course End Loading called!!! ');
    this._questionLoading = false;
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
    this._courseLoading = true;
    this._loading.startLoading();
    var course_id: string = "";

    this.route.params.forEach((params: Params) => {
      let course_id = +params['course_id']; // (+) converts string 'id' to a number
    });

    this._api.getCourse(course_id).subscribe(
      data => {
        var body = data.json();
        this.course = new Course();
        this.question = new Question("", this.course, this.course.questions.length);

        this._logger.debug(" ****** course data fetched ******* ");
        this._logger.debug(data);

        var obj = body.data;

        this.course.assignParams(body.data);

        this._logger.debug("****** this course *****");
        this._logger.debug(this.course);
      },
      err => {
        var err_json: {errors?: Array<any>} = JSON.parse(err._body);

        // 共通処理, _error初期化
        this._error.errorInit(err);

        // ロード終了
        this._loading.endLoading();
        this._courseLoading = false;
      },
      () => {
        this._loading.endLoading();
        this._courseLoading = false;
        this._logger.debug('get course success')
      }
    );
  }

  ngAfterViewInit(){
    this._logger.debug(" ***** oninit course AfterViewInit ***** ");
    console.log(this._loading.isLoading());
    this._loading.endLoading();
  }

  postAddQuestion(){
    this._logger.debug("***********");
    this._loading.setCurtain();
    this._courseLoading = true;
    this._api.postAddQuestion(this.course, this.question).subscribe(
      data => {
        this._logger.debug(data);
        this._router.navigateByUrl('courses/' + this.course.id);
      },
      err => {

        this._error.errorInit(err);

        /**
         * Popup 作成処理
         * @type {PopupBase}
         */
        var popup = new PopupBase();
        popup.errorMessages = this._error.errors();
        popup.contentText = this._error.errorText();
        popup.headerText = "コース作成エラー";
        popup.id = "#modal3";
        this._popup.displayPopup(popup);


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

