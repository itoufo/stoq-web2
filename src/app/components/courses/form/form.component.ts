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
  PopupService,
  ErrorService,
} from "./../../../services";

import {
  Course,
  Question,
  ErrorMessage,
  PopupBase,
  SelectValue,
} from "./../../../models";

@Component({
  selector: 'courses-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [
    ApiService,
    AuthService,
    LoggerService,
    PopupService,
    LoadingService,
  ],
  inputs: ['course', 'popup', 'showQuestion'],
})

export class CoursesFormComponent implements OnInit, OnDestroy {
  public course: Course;
  public courseTypes: SelectValue[] = [{ value: 'training', name: "トレーニング" }, { value: 'test', name: 'テスト' }];
  public questionAttributeTypes: SelectValue[] = [{ value: 'select', name: '選択問題' }, { value: 'input', name: '穴埋め問題' }, { value: 'lecture', name: '講義資料' }];
  public popup: PopupBase;
  public random = Math.floor( Math.random() * 10000000 );
  public selectedIndex: number = -1;
  public showQuestion: boolean = true;

  public popup_text: string;
  public popup_header: string;

  public errors: ErrorMessage[];

  private _tab: any;
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
  }

  courseConfig(){
    this.selectedIndex = -1;
    this._tab.tabs('select_tab', 'tab1');
  }
  tabQuestions(){
    this._tab.tabs('select_tab', 'tab2');
    if(this.selectedIndex == -1){
      this.selectedIndex = 1;
    }
  }

  setCourse(course: Course) {
    this.course = course;
  }

  createQuestion() {
    this._logger.debug("question INDEX = " + this.course.questions.length);
    this.questionStartLoading();
    this.course.questions.push(new Question("", this.course, this.course.questions.length+1));
  }

  selectQuestionIndex(i: number){
    this.selectedIndex = i;
  }

  selectQuestion(e, i) {
    this._tab.tabs('select_tab', 'tab2');
    this.selectedIndex = i;
  }

  ngOnDestroy(){

  }

  ngOnInit() {
    this._logger.debug(" ***** ngOnInit courses form component *****");
    //this.startLoading.emit('event');
    //


    this.startValidation();

    // TODO: 発火タイミングをもっといい感じにできる気がする。
    // TODO: と言うか、このタイミングだと発火しそこねる気がする。
    jQuery(this.el.nativeElement).find('.collapsible')
      .each(function(i) {
        jQuery(this).collapsible({accordion: false});
      });

    this._tab = jQuery(this.el.nativeElement).find('ul.tabs').tabs();
    this._tab.tabs('select_tab', 'tab1');

    // エディタの起動を早くするために、最初に一度読み込んでおく
    // 多分..有効だと思う
    //tinymce.init({});
  }

  ngAfterViewInit(){
    this._logger.debug(" **** course form ng after view init ");
    //this.endLoading.emit('event');
  }

  postCreateCourse(){
    this._logger.debug("***********");
    this._loading.setCurtain();
    this._api.postCreateCourse(this.course).subscribe(
      data => {
        var body = data.json();
        this._logger.debug(data);
        this.course = new Course();
        this.course.assignParams(body.data);
        //this._router.navigateByUrl('courses/' + data.data.course_id);
      },
      err => {
        this._error.errorInit(err);

        /**
         * Popup 作成処理
         * popup.id は親Componentで定義しといてもらう
         * @type {string}
         */
        this.popup.headerText = "コース作成エラー";
        this.popup.errorMessages = this._error.errors();

        //
        //this.popup.errorMessages.forEach( (errorMessage: ErrorMessage) => {
        //  errorMessage.paramsArray().forEach( (param: string) =>{
        //    console.log(param);
        //    console.log(this._error.replaceParam(param))
        //  })
        //});

        this._popup.displayPopup(this.popup);

        this._loading.endLoading();
      },
      () => {
        setTimeout(
          ()=>{
            jQuery(this.el.nativeElement).find('ul.tabs').tabs('select_tab', 'tab2');
          },0
        );
        this._loading.endLoading();
        this._logger.debug('signup success')
      }
    );
  }

  postUpdateCourse(){
    this._logger.debug("****** postCreateCourse *****");
    this._logger.debug(this.course);
    this._loading.setCurtain();
    this._api.postEditCourse(this.course).subscribe(
      data => {
        var body = data.json();
        this._logger.debug(data);
        this._router.navigateByUrl('courses/' + body.data.course_id);
      },
      err => {
        this._popup.displayError(err, "コース更新エラー");
        this._loading.endLoading();
      },
      () => {
        this._loading.endLoading();
        this._logger.debug('signup success');
      }
    );
  }

  startValidation() {
    var formId = "#course_form";

    jQuery(formId).data('validator', null);
    jQuery(formId).unbind('validate');

    jQuery(formId).validate({
      rules: {
        name: {
          required: true
        },
        course_type: {
          required: true
        }
      },
      messages: {
        name: {
          required: "コース名を入力して下さい",
        },
        course_type: {
          required: "コース形式を選択して下さい"
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
    console.log(this.course);
    if(this.course.id) {
      this.postUpdateCourse();
    } else {
      this.postCreateCourse();
    }
  }

}

