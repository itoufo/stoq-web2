import 'jquery';
import 'wysihtml5';
import 'wysihtml5ParserRules';

import {
  Component,
  Input,
  AfterViewChecked,
  OnInit,
  AfterViewInit,
  OnChanges,
  Output,
  EventEmitter,
  ElementRef,
  Injector,
  Inject
} from '@angular/core';
import { Router } from '@angular/router';
import {OnDestroy} from "@angular/core";

import {
  LoggerService,
  LoadingService,
  ApiService,
  AuthService,
  ErrorService,
  PopupService,
} from "./../../../services/index";

import {
  Question,
  Answer,
  PopupBase,
  ErrorMessage,
  Reference,
  SelectValue,
} from "./../../../models";

//import * as AWS from 'aws-sdk';

declare const AWS: any;

@Component({
  selector: 'question-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers: [ApiService],
  inputs: ['question'],
})
export class QuestionsFormComponent implements OnChanges, OnInit, AfterViewInit, OnDestroy {
  public question: Question;
  public questionAttributeTypes: SelectValue[] = [{ value: 'select', name: '選択問題' }, { value: 'input', name: '穴埋め問題' }, { value: 'lecture', name: '講義資料' }];
  @Output() startLoading = new EventEmitter();
  @Output() endLoading = new EventEmitter();
  @Output() activate = new EventEmitter();
  public random = Math.floor( Math.random() * 10000000 );

  private _loaded: boolean = false;
  private _editor: any;
  private _editorFocused: boolean = false;

  private file: File;
  private tmpData: any;


  constructor(
    private el: ElementRef,
    private _logger: LoggerService,
    private _loading: LoadingService,
    private _error: ErrorService,
    private _api: ApiService,
    private _auth: AuthService,
    private _popup: PopupService,
    private _router: Router
  ) {
    this._logger.debug("***** question component init ******");
    this._logger.debug(this.question);
  }

  chengeType(type: string){

  }

  setQuestion(question: Question) {
    this.question = question;
  }

  createAnswer() {
    var answer = new Answer(this.question);
    this.question.answers.push(answer);
  }

  ngOnDestroy(){
    this._editor.disable();
  }

  ngOnInit() {
    this.startLoading.emit('event');
    this._loaded = false;
  }

  ngAfterViewInit() {
    //this.activate.emit('event');
    this.endLoading.emit('event');

    this.startValidation();

    jQuery(this.el.nativeElement)
      .find("#" + this.editorContainerId() + ' iframe.wysihtml5-sandbox, input[name="_wysihtml5_mode"]').remove();

    var $editor = jQuery(this.el.nativeElement).find("#" + this.editorId());
    $editor.css("display", "block");

    this._editor = new wysihtml5.Editor( this.editorId(), { // id of textarea element
      toolbar: this.toolbarId(), // id of toolbar element
      parserRules: wysihtml5ParserRules, // defined in parser rules set
      stylesheets: ["dist/css/wysihtml5.css"]
    });

    this._editor.on("change", this.setQuestionText.bind(this));
    this._editor.on("focus", this.focusEditor.bind(this));

    $(document).ready(function(){
      $('.tooltipped').tooltip({delay: 50});
    });

    this._loading.endLoading();
  }

  uploadfile(file) {
    this._api.getImageSignature().subscribe(
      data => {
        var jsonData: {data: any} = data.json();
        jsonData["file"] = this.file;
        jsonData["acl"] = "public-read";
      },
      err => {
        this._popup.displayError(err, "Question 更新エラー");
        this._loading.endLoading();
      },
      () => {
        this._loading.endLoading();
        this._logger.debug('update question success');
      }
    );

    //var accessKeyId = 'AKIAIMW6QLXASWKZZGNQ';
    //var secretAccessKey = '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';
    //
    //var region = 'ap-northeast-1';
    //var credentials = {accessKeyId: accessKeyId, secretAccessKey: secretAccessKey};
    //var fileName =  this._auth.getId() + '/' + new Date().getTime().toString() + this.file.name;
    //
    //AWS.config.update(credentials);
    //AWS.config.region = region;
    //
    //var s3 = new AWS.S3({params: {Bucket: 'stoq-material'}});
    //var params = {Key: fileName, Body: this.file, ACL: "public-read"};
    //s3.upload(params, this.s3UpCallback.bind(this));
  }

  s3UpCallback(err, data){
    this._editor.focus();
    console.log(err, data);
    if(err){
      console.log('uploadに失敗しました。');
    }else{
      //selection = wysihtml5.Selection(this._editor);
      //console.log(selection.selectNode);
      wysihtml5.commands.insertImage.exec(this._editor.composer, "insertImage",
        { src: data.Location }
      );
    }
  }

  fileEvent(fileInput: any){
    var files = fileInput.target.files;
    var file = files[0];
    this.file = file;
  }


  focusEditor(){
    this._editorFocused = true;
  }

  ngOnChanges() {
    this._logger.debug("Question form ngOnChanges");
  }

  formId(){
    return 'question-form-' + this.random;
  }

  editorId() {
    return 'issue-editor-' + this.random;
  }

  editorContainerId() {
    return 'issue-editor-container-' + this.random;
  }

  toolbarId() {
    return 'wysihtml5-toolbar-' + this.random;
  }

  setQuestionText() {
    if(this.question && this._editor) {
      this._logger.debug(this._editor.getValue());
      this.question.text = this._editor.getValue();
    }
  }

  startValidation() {
    var formId = "#" + this.formId();
    jQuery(formId).data('validator', null);
    jQuery(formId).unbind('validate');

    jQuery(formId).validate({
      ignore: ":hidden:not(textarea)",
      debug: true,
      rules: {
        text: "required",
        question_type: "required"
      },
      messages: {
        text: "テキストを入力して下さい！",
        question_type: {
          required: "問題形式を選択して下さい."
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
      submitHandler: this.submitFunction.bind(this),
      invalidHandler: this.invalidFunction.bind(this)
    });
  }

  submitFunction() {
    this._logger.debug(" *** Question Submit Function *** ");
    if(this.question.id){
      this.postUpdateQuestion();
    } else if(this.question.course) {
      this.postAddQuestion();
    } else {
      this.postCreateQuestion();
    }
  }

  postCreateQuestion(){
    alert("まだ作ってないよ")
  }

  postAddQuestion(){
    this._loading.setCurtain();
    this._api.postAddQuestion(this.question.course, this.question).subscribe(
      data => {
        var jsonData: {data: any} = data.json();
        this._logger.debug(data);
        this.question.id = jsonData.data['inserted_question']['question_id'];
        //this._router.navigateByUrl('courses/' + this.question.course.id);
        //location.reload();

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
      },
      () => {
        this._loading.endLoading();
        this._logger.debug('signup success');
      }
    );
  }

  postUpdateQuestion() {
    this._logger.debug("****  postUpdateQuestion *******");
    this._loading.setCurtain();

    console.log(this.question);
    this._api.postEditQuestion(this.question.course, this.question).subscribe(
      data => {
        var jsonData: {data: any} = data.json();
        var base_index = this.question.index;
        this._logger.debug(data);
        this._logger.debug(jsonData.data);
        this.question.assignParams(jsonData.data.edited_question);
        this.question.index = base_index;
      },
      err => {
        this._popup.displayError(err, "Question 更新エラー");
        this._loading.endLoading();
      },
      () => {
        this._loading.endLoading();
        this._logger.debug('update question success');
      }
    );
  }

  addReference() {
    console.log("**** add Reference ****");
    this.question.references.push(new Reference(""));
  }

  invalidFunction(event, validator) {

    var form = jQuery("#" + this.formId());
    var errorDescription = jQuery("#" + this.formId() + " div.error");

    form.addClass("invalid");

    /**
     * 下記エラー内容表示は上手く動いておらず
     */
    var errors = validator.numberOfInvalids();
    if (errors) {
      var message = errors == 1
        ? 'You missed 1 field. It has been highlighted'
        : 'You missed ' + errors + ' fields. They have been highlighted';

      errorDescription.append(message);
      errorDescription.show();
    } else {
      form.children('div.error').hide();
    }
  }
}


