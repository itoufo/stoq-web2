import 'jquery';

import {
  Component,
  AfterViewInit,
  OnInit,
  OnChanges,
} from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';

import {
  AuthService,
  ApiService,
  LoadingService,
  LoggerService,
  ErrorService,
  PopupService,
  ActivityService
} from "./../../../services";

import{
  Course,
  Question,
  ActivitySession,
  Result,
  PopupBase,
  Answer,
  UserAnswer,
} from "../../../models"

@Component({
  selector: 'courses-show',
  templateUrl: './training_result.component.html',
  styleUrls: ['./training_result.component.scss'],
  providers: [
    ApiService,
    AuthService,
    ActivityService,
    LoggerService,
    PopupService,
  ],
})

export class TrainingResultComponent implements OnInit {


  activity: ActivitySession;
  user_answers: UserAnswer[] = [];
  training_result: Result = new Result();

  private _entry_id: string;
  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _api: ApiService,
    private _activity: ActivityService,
    private _auth: AuthService,
    private _logger: LoggerService,
    private _error: ErrorService,
    private _loading: LoadingService,
    private _popup: PopupService
  ){
    this._loading.setCurtain();
  }

  ngOnInit() {

    // this._entry_id = this.routeParam.params['entry_id'];
    this.route.params.forEach((params: Params) => {
      this._entry_id = params['entry_id']; // (+) converts string 'id' to a number
    });

    this._loading.setCurtain();
    this._api.getTrainingResults(this._entry_id).subscribe(
      data => {
        var body = data.json();
        this._logger.debug(body);
        this._logger.debug(this.training_result);
        this.training_result.assignParams(body.data.result);
        var answers = body.data.answers;

        answers.sort(function(a,b){
          if(a.question.index < b.question.index) return -1;
          if(a.question.index > b.question.index) return 1;
          return 0;
        });

        answers.forEach(
          answer => {
            var question = new Question();
            question.assignParams(answer.question);

            var ua = new UserAnswer();

            console.log("@@@@@@@@@");
            console.log("@@@@@@@@@");
            console.log(answer);

            ua.assignParams(answer.user_answer);
            ua.question = question;

            this.user_answers.push(ua);
            console.log(this.user_answers);
          }
        );
        // 結果描写画面に移動
      },
      err => {
        this._error.errorInit(err);
        this._popup.displayError(err, "Error!");
      },
      () => {
        setTimeout(
          () => {
            console.log("load Collapsible!!!!");
            jQuery(".collapsible").collapsible({accordion : true});
          }, 0);
        this._loading.endLoading();
      }
    )
  }

  progressBarWidth(): string {
    return "width: " + this.training_result.score.raw/this.training_result.score.max * 100 + "%;";
  }
}
