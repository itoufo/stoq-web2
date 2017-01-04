"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var jQuery, $ = require('jquery');
var core_1 = require('@angular/core');
require('rxjs/add/operator/retry');
require('rxjs/add/operator/map');
var services_1 = require("./../../../services");
var models_1 = require("./../../../models");
var TrainingComponent = (function () {
    function TrainingComponent(_router, _api, _activity, _auth, _logger, _error, _loading, _popup, _http) {
        this._router = _router;
        this._api = _api;
        this._activity = _activity;
        this._auth = _auth;
        this._logger = _logger;
        this._error = _error;
        this._loading = _loading;
        this._popup = _popup;
        this._http = _http;
        this.questions = [];
        this.imageSrc = "";
        this._loading.setCurtain();
    }
    // Trainingの各種Action
    /**
       Action: Answer
     * 選択問題用解答メソッド
     * @param answerIndex
     */
    TrainingComponent.prototype.selectAnswer = function (answer) {
        this._logger.debug(answer);
        this._loading.setCurtain();
        /**
         * スコアがクライアントに飛んできてるなら、
         * 採点の"表示"はクライアントで勝手にやっちゃう
         * もちろん結果は非同期でサーバに
         */
        if (answer.score && answer.question.targetScore) {
            this.evalResult(answer.question.id, answer.score.raw >= answer.question.targetScore.raw);
            this._loading.endLoading();
            this.postTrainingAnswerWithoutEval(answer);
        }
        else {
            this.postTrainingAnswerWithEval(answer);
        }
    };
    /**
      Action: Suspend
     *
     */
    TrainingComponent.prototype.suspendTraining = function () {
        var popup = new models_1.PopupBase();
        popup.id = "#modal4";
        popup.contentText = "トレーニングを中断してよろしいですか？";
        popup.headerText = "確認";
        popup.okFunction = this._suspendTraining.bind(this);
        popup.cancelFunction = function () { };
        this._popup.displayPopup(popup);
    };
    TrainingComponent.prototype._suspendTraining = function () {
        var _this = this;
        this._loading.setCurtain();
        this._api.postTrainingSuspend(this.activity.entry_id, this.activity.currentIndex).subscribe(function (data) {
            _this._logger.debug(data);
            _this._activity.removeActivity();
            _this._router.navigate(['']);
        }, function (err) {
            _this._error.errorInit(err);
        }, function () { });
    };
    /**
     Action: End
     */
    TrainingComponent.prototype.endTraining = function () {
        var popup = new models_1.PopupBase();
        popup.id = "#modal4";
        popup.contentText = "トレーニングを終了してよろしいですか？";
        popup.headerText = "確認";
        popup.okFunction = this._endTraining.bind(this);
        popup.cancelFunction = function () { };
        this._popup.displayPopup(popup);
    };
    TrainingComponent.prototype._endTraining = function () {
        var _this = this;
        this._loading.setCurtain();
        this._api.postTrainingEnd(this.activity.entry_id).subscribe(function (data) {
            _this._logger.debug(data);
            // 結果描写画面に移動
            _this._activity.removeActivity();
            //this._router.navigate(['TrainingResult', {}]);
            _this._router.navigate(['entries', 'results', _this.activity.entry_id]);
        }, function (err) {
            _this._error.errorInit(err);
            _this._popup.displayError(err, "Error!");
        });
    };
    /**
     * 採点無しで回答をサーバに投げる
     */
    TrainingComponent.prototype.postTrainingAnswerWithoutEval = function (answer) {
        var _this = this;
        this._api.postTrainingAnswer(this.activity.entry_id, answer.question.id, answer.value, answer.question.memo).subscribe(function (data) {
            _this._logger.debug(data);
        }, function (err) {
            // 共通処理, _error初期化
            _this._error.errorInit(err);
        }, function () {
            _this._logger.debug('post Training Answer Success');
        });
    };
    /**
     * 採点付きで回答をサーバに投げる
     */
    TrainingComponent.prototype.postTrainingAnswerWithEval = function (answer) {
        var _this = this;
        this._api.postTrainingAnswer(this.activity.entry_id, answer.question.id, answer.value, answer.question.memo).retry(5).map(function (res) { return res.json(); }).subscribe(function (data) {
            _this._logger.debug(data);
            _this.evalResult(answer.question.id, data.data.result.success);
            _this._loading.endLoading();
        }, function (err) {
            // 共通処理, _error初期化
            _this._error.errorInit(err);
            // ロード終了
            _this._loading.endLoading();
        }, function () {
            _this._loading.endLoading();
            _this._logger.debug('post Training Answer Success');
        });
    };
    /**
     * 入力問題用解答メソッド
     */
    TrainingComponent.prototype.submitInput = function () {
        var _this = this;
        this._loading.setCurtain();
        this._api.postTrainingAnswer(this.activity.entry_id, this.currentQuestion().id || "", this.currentQuestion().userAnswer || "", this.currentQuestion().memo || "").subscribe(function (data) {
            _this._logger.debug(data);
            var body = data.json();
            _this.evalResult(_this.currentQuestion().id, body.data.result.success);
            _this._loading.endLoading();
        }, function (err) {
            // 共通処理, _error初期化
            _this._error.errorInit(err);
            // ロード終了
            _this._loading.endLoading();
        }, function () {
            _this._loading.endLoading();
            _this._logger.debug('get course success');
        });
    };
    /**
     *
     */
    TrainingComponent.prototype.ngOnInit = function () {
        this._loading.setCurtain();
        this._logger.debug("***** OnInit Training Component *****");
        this.activity = this._activity.getActivity();
        if (!this.activity) {
            this.requestActivity();
        }
        else {
            this.setQuestions();
            this._loading.endLoading();
        }
    };
    TrainingComponent.prototype.ngOnChanges = function () {
    };
    TrainingComponent.prototype.ngAfterViewInit = function () {
    };
    TrainingComponent.prototype.requestActivity = function () {
        var _this = this;
        var entryId = localStorage.getItem('CurrentActivity');
        if (!entryId) {
            // ローカルにエントリー情報がない場合
            setTimeout(function () {
                var popup = new models_1.PopupBase();
                popup.id = "#modal3";
                popup.contentText = "エントリー情報が存在しません。 (３秒後にホーム画面に移動いたします。)";
                _this._popup.displayPopup(popup);
                setTimeout(function () {
                    _this._activity.removeActivity();
                    _this._router.navigate(['']).then(_this._popup.closePopup);
                }, 3000);
            }, 0);
            return;
        }
        this._logger.debug(entryId);
        this._loading.setCurtain();
        this._api.postResumeActivity(entryId).subscribe(function (data) {
            var body = data.json();
            _this._logger.debug("response data");
            _this._logger.debug(body.data);
            _this._activity.setActivity('training', body.data);
            setTimeout(function () {
                _this._logger.debug('set training');
                _this.activity = _this._activity.getActivity();
                _this.setQuestions();
            }, 0);
        }, function (err) {
            // 共通処理, _error初期化
            _this._error.errorInit(err);
            var errors = _this._error.errors();
            if (errors[0].messagesArray()[0] == "This Entry is Already Finished.") {
                var popup = new models_1.PopupBase();
                popup.id = "#modal3";
                popup.contentText = "このエントリーは既に終了しております (３秒後にホーム画面に移動いたします。)";
                _this._popup.displayPopup(popup);
                setTimeout(function () {
                    _this._activity.removeActivity();
                    _this._router.navigate(['H']).then(_this._popup.closePopup);
                }, 3000);
            }
            else {
                _this._popup.displayError(err, "Error!");
            }
        }, function () {
            // ロード終了
            _this._loading.endLoading();
            _this._logger.debug('get start training success');
        });
        return false;
    };
    TrainingComponent.prototype.setQuestions = function () {
        this.questions = this.activity.course.questions;
    };
    TrainingComponent.prototype.select = function (index) {
        this.closeHint();
        if (index !== this.activity.currentIndex) {
            this.activity.currentIndex = index;
        }
    };
    TrainingComponent.prototype.hasQuestion = function () {
        if (this.activity && this.questions) {
            return true;
        }
        else {
            return false;
        }
    };
    TrainingComponent.prototype.currentQuestion = function () {
        if (this.activity && this.questions) {
            return this.questions[this.activity.currentIndex] || this.questions[0];
        }
        return null; // まだsetQuestionされてない
    };
    TrainingComponent.prototype.closeHint = function () {
        //jQuery( ".card-title" ).trigger( "click" );
        jQuery(".card-reveal").css({ display: 'none' });
    };
    TrainingComponent.prototype.isLast = function () {
        return (this.activity.currentIndex > this.questions.length - 1);
    };
    TrainingComponent.prototype.isFirst = function () {
        return (this.activity.currentIndex <= 1);
    };
    TrainingComponent.prototype.selectPrev = function () {
        this._popup.closePopup();
        if (this.activity.currentIndex > 1) {
            this.activity.currentIndex = this.activity.currentIndex - 1;
        }
        else {
            var popup = new models_1.PopupBase();
            popup.contentText = "最初のQuestionです。";
            popup.contentColor = "teal";
            popup.id = "#modal3";
            this._popup.displayPopup(popup);
        }
    };
    TrainingComponent.prototype.selectNext = function () {
        this._popup.closePopup();
        if (this.questions.length > this.activity.currentIndex) {
            this.activity.currentIndex = this.activity.currentIndex + 1;
        }
    };
    TrainingComponent.prototype.evalResult = function (question_id, result) {
        var popup = new models_1.PopupBase();
        if (result) {
            popup.contentText = "正解！";
            popup.contentColor = "teal";
            popup.imageSrc = "images/result-success.png";
            setTimeout(this.selectNext.bind(this), 1000);
        }
        else {
            popup.contentText = "不正解...！";
            popup.contentColor = "red";
            popup.imageSrc = "images/result-fault.png";
            setTimeout(this.selectNext.bind(this), 1000);
        }
        popup.id = "#modal5";
        this._popup.displayPopup(popup);
        this.calcUserRank(question_id, result);
    };
    TrainingComponent.prototype.calcUserRank = function (question_id, result) {
        var _this = this;
        var resultNum = (result === true) ? 1 : 0;
        this._api.postCalcUserRank(this._auth.getId(), question_id, resultNum).subscribe(function (data) {
            console.log('user_ranks updated');
        }, function (err) {
            console.log('user_ranks failed');
        }, function () {
            _this._loading.endLoading();
        });
    };
    TrainingComponent = __decorate([
        core_1.Component({
            selector: 'courses-show',
            templateUrl: './training.component.html',
            styleUrls: ['./training.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.ActivityService,
                services_1.LoggerService,
                services_1.PopupService,
            ]
        })
    ], TrainingComponent);
    return TrainingComponent;
}());
exports.TrainingComponent = TrainingComponent;
//# sourceMappingURL=training.component.js.map