"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var jquery = require("jquery/dist/jquery.js");
var wysihtml5 = require('../../../../js/wysihtml5/dist/wysihtml5-0.4.0pre');
var wysihtml5ParserRules = require('../../../../js/wysihtml5/dist/advanced');
var core_1 = require('@angular/core');
var index_1 = require("./../../../services/index");
var models_1 = require("./../../../models");
var QuestionsFormComponent = (function () {
    function QuestionsFormComponent(el, _logger, _loading, _error, _api, _auth, _popup, _router) {
        this.el = el;
        this._logger = _logger;
        this._loading = _loading;
        this._error = _error;
        this._api = _api;
        this._auth = _auth;
        this._popup = _popup;
        this._router = _router;
        this.questionAttributeTypes = [{ value: 'select', name: '選択問題' }, { value: 'input', name: '穴埋め問題' }, { value: 'lecture', name: '講義資料' }];
        this.startLoading = new core_1.EventEmitter();
        this.endLoading = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.random = Math.floor(Math.random() * 10000000);
        this._loaded = false;
        this._editorFocused = false;
        this._logger.debug("***** question component init ******");
        this._logger.debug(this.question);
    }
    QuestionsFormComponent.prototype.chengeType = function (type) {
    };
    QuestionsFormComponent.prototype.setQuestion = function (question) {
        this.question = question;
    };
    QuestionsFormComponent.prototype.createAnswer = function () {
        var answer = new models_1.Answer(this.question);
        this.question.answers.push(answer);
    };
    QuestionsFormComponent.prototype.ngOnDestroy = function () {
        this._editor.disable();
    };
    QuestionsFormComponent.prototype.ngOnInit = function () {
        this.startLoading.emit('event');
        this._loaded = false;
    };
    QuestionsFormComponent.prototype.ngAfterViewInit = function () {
        //this.activate.emit('event');
        this.endLoading.emit('event');
        this.startValidation();
        jquery(this.el.nativeElement)
            .find("#" + this.editorContainerId() + ' iframe.wysihtml5-sandbox, input[name="_wysihtml5_mode"]').remove();
        var $editor = jquery(this.el.nativeElement).find("#" + this.editorId());
        $editor.css("display", "block");
        this._editor = new wysihtml5.Editor(this.editorId(), {
            toolbar: this.toolbarId(),
            parserRules: wysihtml5ParserRules,
            stylesheets: ["dist/css/wysihtml5.css"]
        });
        this._editor.on("change", this.setQuestionText.bind(this));
        this._editor.on("focus", this.focusEditor.bind(this));
        jquery(document).ready(function () {
            jquery('.tooltipped').tooltip({ delay: 50 });
        });
        this._loading.endLoading();
    };
    QuestionsFormComponent.prototype.uploadfile = function (file) {
        var _this = this;
        this._api.getImageSignature().subscribe(function (data) {
            var jsonData = data.json();
            jsonData["file"] = _this.file;
            jsonData["acl"] = "public-read";
        }, function (err) {
            _this._popup.displayError(err, "Question 更新エラー");
            _this._loading.endLoading();
        }, function () {
            _this._loading.endLoading();
            _this._logger.debug('update question success');
        });
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
    };
    QuestionsFormComponent.prototype.s3UpCallback = function (err, data) {
        this._editor.focus();
        console.log(err, data);
        if (err) {
            console.log('uploadに失敗しました。');
        }
        else {
            //selection = wysihtml5.Selection(this._editor);
            //console.log(selection.selectNode);
            wysihtml5.commands.insertImage.exec(this._editor.composer, "insertImage", { src: data.Location });
        }
    };
    QuestionsFormComponent.prototype.fileEvent = function (fileInput) {
        var files = fileInput.target.files;
        var file = files[0];
        this.file = file;
    };
    QuestionsFormComponent.prototype.focusEditor = function () {
        this._editorFocused = true;
    };
    QuestionsFormComponent.prototype.ngOnChanges = function () {
        this._logger.debug("Question form ngOnChanges");
    };
    QuestionsFormComponent.prototype.formId = function () {
        return 'question-form-' + this.random;
    };
    QuestionsFormComponent.prototype.editorId = function () {
        return 'issue-editor-' + this.random;
    };
    QuestionsFormComponent.prototype.editorContainerId = function () {
        return 'issue-editor-container-' + this.random;
    };
    QuestionsFormComponent.prototype.toolbarId = function () {
        return 'wysihtml5-toolbar-' + this.random;
    };
    QuestionsFormComponent.prototype.setQuestionText = function () {
        if (this.question && this._editor) {
            this._logger.debug(this._editor.getValue());
            this.question.text = this._editor.getValue();
        }
    };
    QuestionsFormComponent.prototype.startValidation = function () {
        var formId = "#" + this.formId();
        jquery(formId).data('validator', null);
        jquery(formId).unbind('validate');
        jquery(formId).validate({
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
            errorElement: 'div',
            errorPlacement: function (error, element) {
                var placement = jquery(element).data('error');
                if (placement) {
                    jquery(placement).append(error);
                }
                else {
                    error.insertAfter(element);
                }
            },
            submitHandler: this.submitFunction.bind(this),
            invalidHandler: this.invalidFunction.bind(this)
        });
    };
    QuestionsFormComponent.prototype.submitFunction = function () {
        this._logger.debug(" *** Question Submit Function *** ");
        if (this.question.id) {
            this.postUpdateQuestion();
        }
        else if (this.question.course) {
            this.postAddQuestion();
        }
        else {
            this.postCreateQuestion();
        }
    };
    QuestionsFormComponent.prototype.postCreateQuestion = function () {
        alert("まだ作ってないよ");
    };
    QuestionsFormComponent.prototype.postAddQuestion = function () {
        var _this = this;
        this._loading.setCurtain();
        this._api.postAddQuestion(this.question.course, this.question).subscribe(function (data) {
            var jsonData = data.json();
            _this._logger.debug(data);
            _this.question.id = jsonData.data['inserted_question']['question_id'];
            //this._router.navigateByUrl('courses/' + this.question.course.id);
            //location.reload();
        }, function (err) {
            _this._error.errorInit(err);
            /**
             * Popup 作成処理
             * @type {PopupBase}
             */
            var popup = new models_1.PopupBase();
            popup.errorMessages = _this._error.errors();
            popup.contentText = _this._error.errorText();
            popup.headerText = "コース作成エラー";
            popup.id = "#modal3";
            _this._popup.displayPopup(popup);
        }, function () {
            _this._loading.endLoading();
            _this._logger.debug('signup success');
        });
    };
    QuestionsFormComponent.prototype.postUpdateQuestion = function () {
        var _this = this;
        this._logger.debug("****  postUpdateQuestion *******");
        this._loading.setCurtain();
        console.log(this.question);
        this._api.postEditQuestion(this.question.course, this.question).subscribe(function (data) {
            var jsonData = data.json();
            var base_index = _this.question.index;
            _this._logger.debug(data);
            _this._logger.debug(jsonData.data);
            _this.question.assignParams(jsonData.data.edited_question);
            _this.question.index = base_index;
        }, function (err) {
            _this._popup.displayError(err, "Question 更新エラー");
            _this._loading.endLoading();
        }, function () {
            _this._loading.endLoading();
            _this._logger.debug('update question success');
        });
    };
    QuestionsFormComponent.prototype.addReference = function () {
        console.log("**** add Reference ****");
        this.question.references.push(new models_1.Reference(""));
    };
    QuestionsFormComponent.prototype.invalidFunction = function (event, validator) {
        var form = jquery("#" + this.formId());
        var errorDescription = jquery("#" + this.formId() + " div.error");
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
        }
        else {
            form.children('div.error').hide();
        }
    };
    __decorate([
        core_1.Output()
    ], QuestionsFormComponent.prototype, "startLoading");
    __decorate([
        core_1.Output()
    ], QuestionsFormComponent.prototype, "endLoading");
    __decorate([
        core_1.Output()
    ], QuestionsFormComponent.prototype, "activate");
    QuestionsFormComponent = __decorate([
        core_1.Component({
            selector: 'question-form',
            templateUrl: './form.component.html',
            styleUrls: ['./form.component.scss'],
            providers: [index_1.ApiService],
            inputs: ['question']
        })
    ], QuestionsFormComponent);
    return QuestionsFormComponent;
}());
exports.QuestionsFormComponent = QuestionsFormComponent;
//# sourceMappingURL=form.component.js.map