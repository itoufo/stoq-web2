import {
  Component,
  AfterViewInit,
  OnInit,
  OnChanges,
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Http } from "@angular/http";

import {
  ActivityService,
  AuthService,
  ApiService,
  LoadingService,
  LoggerService,
  ErrorService,
  PopupService,
} from "./../../../services";

import {
  Course,
  Question,
  ErrorMessage,
  Answer,
  Result,
  PopupBase,
  ActivitySession
} from "./../../../models";
import { Response } from '@angular/http';



@Component({
  selector: 'courses-show',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css'],
  providers: [
    ApiService,
    AuthService,
    ActivityService,
    LoggerService,
    PopupService,
  ],
})

export class TrainingComponent implements OnInit, AfterViewInit, OnChanges {
  //public currentIndex = 0;
  public activity: ActivitySession;
  public questions: Question[] = [];
  public imageSrc = "";
  public contentColor;


  constructor(
    private _router: Router,
    private _api: ApiService,
    private _activity: ActivityService,
    private _auth: AuthService,
    private _logger: LoggerService,
    private _error: ErrorService,
    private _loading: LoadingService,
    private _popup: PopupService,
    private _http: Http
  ){
    this._loading.setCurtain();
  }

  // Trainingの各種Action

  /**
     Action: Answer
   * 選択問題用解答メソッド
   * @param answerIndex
   */
  selectAnswer(answer: Answer){
    this._logger.debug(answer);
    this._loading.setCurtain();

    /**
     * スコアがクライアントに飛んできてるなら、
     * 採点の"表示"はクライアントで勝手にやっちゃう
     * もちろん結果は非同期でサーバに
     */
    if(answer.score && answer.question.targetScore) {
      this.evalResult(answer.question.id, answer.score.raw >= answer.question.targetScore.raw);
      this._loading.endLoading();
      this.postTrainingAnswerWithoutEval(answer);
    }else{
      this.postTrainingAnswerWithEval(answer);
    }

  }

  /**
    Action: Suspend
   *
   */
  suspendTraining() {
    var popup = new PopupBase();
    popup.id = "#modal4";
    popup.contentText = "トレーニングを中断してよろしいですか？";
    popup.headerText = "確認";
    popup.okFunction = this._suspendTraining.bind(this);
    popup.cancelFunction = function() {};
    this._popup.displayPopup(popup);
  }
  private _suspendTraining() {
    this._loading.setCurtain();
    this._api.postTrainingSuspend(this.activity.entry_id, this.activity.currentIndex).subscribe(
      data => {
        this._logger.debug(data);
        this._activity.removeActivity();
        this._router.navigate(['']);
      },
      err => {
        this._error.errorInit(err);
      },
      () => {}
    );
  }

  /**
   Action: End
   */
  endTraining() {
    var popup = new PopupBase();
    popup.id = "#modal4";
    popup.contentText = "トレーニングを終了してよろしいですか？";
    popup.headerText = "確認";

    popup.okFunction = this._endTraining.bind(this);
    popup.cancelFunction = function() {};
    this._popup.displayPopup(popup);
  }
  private _endTraining() {
    this._loading.setCurtain();
    this._api.postTrainingEnd(this.activity.entry_id).subscribe(
      data => {
        this._logger.debug(data);
        // 結果描写画面に移動
        this._activity.removeActivity();
        //this._router.navigate(['TrainingResult', {}]);
        this._router.navigate([ 'entries', 'results', this.activity.entry_id])
      },
      err => {
        this._error.errorInit(err);
        this._popup.displayError(err, "Error!");
      }
    )
  }

  /**
   * 採点無しで回答をサーバに投げる
   */
  postTrainingAnswerWithoutEval(answer: Answer){
    this._api.postTrainingAnswer(
      this.activity.entry_id,
      answer.question.id,
      answer.value,
      answer.question.memo
    ).subscribe(
      data => {
        this._logger.debug(data);
      },
      err => {
        // 共通処理, _error初期化
        this._error.errorInit(err);
      },
      () => {
        this._logger.debug('post Training Answer Success')
      }
    );
  }

  /**
   * 採点付きで回答をサーバに投げる
   */
  postTrainingAnswerWithEval(answer:Answer) {
    this._api.postTrainingAnswer(
      this.activity.entry_id,
      answer.question.id,
      answer.value,
      answer.question.memo
    ).retry(5).map((res: Response) => res.json()).subscribe(
      data => {
        this._logger.debug(data);
        this.evalResult(answer.question.id, data.data.result.success);
        this._loading.endLoading();
      },
      err => {
        // 共通処理, _error初期化
        this._error.errorInit(err);

        // ロード終了
        this._loading.endLoading();
      },
      () => {
        this._loading.endLoading();
        this._logger.debug('post Training Answer Success');
      }
    );
  }

  /**
   * 入力問題用解答メソッド
   */
  submitInput() {
    this._loading.setCurtain();
    this._api.postTrainingAnswer(
      this.activity.entry_id,
      this.currentQuestion().id || "",
      this.currentQuestion().userAnswer || "",
      this.currentQuestion().memo || ""
    ).subscribe(
      (data: Response) => {
        this._logger.debug(data);
        var body = data.json();
        this.evalResult(this.currentQuestion().id, body.data.result.success);
        this._loading.endLoading();
      },
      err => {
        // 共通処理, _error初期化
        this._error.errorInit(err);
        // ロード終了
        this._loading.endLoading();
      },
      () => {
        this._loading.endLoading();
        this._logger.debug('get course success')
      }
    );
  }

  /**
   *
   */
  ngOnInit() {
    this._loading.setCurtain();
    this._logger.debug("***** OnInit Training Component *****");
    this.activity = this._activity.getActivity();

    if(!this.activity) {
      this.requestActivity();
    } else {
      this.setQuestions();
      this._loading.endLoading();
    }
  }

  ngOnChanges() {

  }

  ngAfterViewInit() {

  }

  requestActivity() {
    var entryId = localStorage.getItem('CurrentActivity');

    if(!entryId){
      // ローカルにエントリー情報がない場合
      setTimeout(()=>{
        var popup = new PopupBase();
        popup.id = "#modal3";
        popup.contentText = "エントリー情報が存在しません。 (３秒後にホーム画面に移動いたします。)";
        this._popup.displayPopup(popup);
        setTimeout(
          () => {
            this._activity.removeActivity();
            this._router.navigate(['']).then(this._popup.closePopup)
          }, 3000);
      },0);
      return;
    }

    this._logger.debug(entryId);
    this._loading.setCurtain();
    this._api.postResumeActivity(entryId).subscribe(
      data => {
        var body = data.json();
        this._logger.debug("response data");
        this._logger.debug(body.data);
        this._activity.setActivity('training', body.data);
        setTimeout(()=> {
          this._logger.debug('set training');
          this.activity = this._activity.getActivity();
          this.setQuestions();
        }, 0)
      },
      err => {
        // 共通処理, _error初期化
        this._error.errorInit(err);
        var errors: ErrorMessage[] = this._error.errors();
        if(errors[0].messagesArray()[0] == "This Entry is Already Finished.") {
          var popup = new PopupBase();
          popup.id = "#modal3";
          popup.contentText = "このエントリーは既に終了しております (３秒後にホーム画面に移動いたします。)";
          this._popup.displayPopup(popup);
          setTimeout(
            () => {
              this._activity.removeActivity();
              this._router.navigate(['H']).then(this._popup.closePopup)
            }, 3000
          );
        } else {
          this._popup.displayError(err, "Error!")
        }
      },
      () => {

        // ロード終了
        this._loading.endLoading();
        this._logger.debug('get start training success')
      }
    );
    return false;
  }

  setQuestions() {
    this.questions = this.activity.course.questions;
  }

  select(index: number) {
    this.closeHint();
    if(index !== this.activity.currentIndex) {
      this.activity.currentIndex = index;
    }
  }

  hasQuestion(){
    if(this.activity && this.questions) {
      return true;
    }else{
      return false;
    }
  }

  currentQuestion() : Question{
    if(this.activity && this.questions){
      return this.questions[this.activity.currentIndex] || this.questions[0]
    }
    return null; // まだsetQuestionされてない
  }

  closeHint() {
    //jQuery( ".card-title" ).trigger( "click" );
    jQuery( ".card-reveal").css({display: 'none'});
  }

  isLast(): boolean {
    return (this.activity.currentIndex > this.questions.length - 1);
  }

  isFirst(): boolean {
    return (this.activity.currentIndex <= 1);
  }

  selectPrev() {
    this._popup.closePopup();
    if(this.activity.currentIndex > 1){
      this.activity.currentIndex = this.activity.currentIndex - 1;
    } else {
      var popup = new PopupBase();
      popup.contentText = "最初のQuestionです。";
      popup.contentColor = "teal";
      popup.id = "#modal3";
      this._popup.displayPopup(popup);
    }
  }

  selectNext() {
    this._popup.closePopup();
    if(this.questions.length > this.activity.currentIndex){
      this.activity.currentIndex = this.activity.currentIndex + 1;
    }
  }

  evalResult(question_id: string, result: boolean){
    var popup = new PopupBase();
    if(result){
      popup.contentText = "正解！";
      popup.contentColor = "teal";
      popup.imageSrc  = "images/result-success.png";
      setTimeout(this.selectNext.bind(this), 1000);
    }else{
      popup.contentText = "不正解...！";
      popup.contentColor = "red";
      popup.imageSrc  = "images/result-fault.png";
      setTimeout(this.selectNext.bind(this), 1000);
    }
    popup.id = "#modal5";
    this._popup.displayPopup(popup);
    this.calcUserRank(question_id, result);
  }

  calcUserRank(question_id: string, result: boolean){
    var resultNum: number = (result === true) ? 1 : 0;


    this._api.postCalcUserRank(this._auth.getId(), question_id, resultNum).subscribe(
      data => {
        console.log('user_ranks updated');
      },
      err  => {
        console.log('user_ranks failed');
      },
      () => {
        this._loading.endLoading();
      }
    );
  }
}
