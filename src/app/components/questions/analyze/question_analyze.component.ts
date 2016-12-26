import 'jquery';
var Chart = require('../../../../js/plugins/chartjs/index');

import {
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  Http
} from '@angular/http';

import {
  LoggerService,
  LoadingService,
  ApiService,
  AuthService,
  ErrorService,
  PopupService,
  ActivityService,
} from "./../../../services";

import {
  Course,
  Question,
  PopupBase,
  ErrorMessage,
} from "./../../../models";

@Component({
  templateUrl: './question_analyze.component.html',
  styleUrls: ['./question_analyze.component.scss'],
  providers: [
    ApiService,
    AuthService,
    LoggerService,
    LoadingService,
  ],
})

export class QuestionAnalyzeComponent implements OnInit, AfterViewInit{

  difficulty: number = 0;
  currentMemory: number = 0;
  targetDate: Date = new Date();

  constructor(
    private route: ActivatedRoute,
    private _router: Router,
    private _api: ApiService,
    private _auth: AuthService,
    private _logger: LoggerService,
    private _loading: LoadingService,
    private _err: ErrorService,
    private _http: Http
  ) {
    this.difficulty = 0;
    this.currentMemory = 0;
  }

  /**
   * 日付をフォーマットする
   * @param  {Date}   date     日付
   * @param  {String} [format] フォーマット
   * @return {String}          フォーマット済み日付
   */
  formatDate(date, format) {
    if (!format) format = 'YYYY-MM-DD hh:mm:ss.SSS';
    format = format.replace(/YYYY/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/M/g, ((date.getMonth() + 1)));
    format = format.replace(/DD/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/hh/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    if (format.match(/S/g)) {
      var milliSeconds = ('00' + date.getMilliseconds()).slice(-3);
      var length = format.match(/S/g).length;
      for (var i = 0; i < length; i++) format = format.replace(/S/, milliSeconds.substring(i, i + 1));
    }
    return format;
  };


  currentMemoryRate(){
    return (this.currentMemory * 100).toPrecision(3);
  }

  getDifficulty(){
    return (this.difficulty).toPrecision(3);
  }

  ngOnInit(){
    this._err.hideError();
    this._loading.setCurtain();
    this.route.params.forEach((params: Params) => {
      let id = params['question_id']; // (+) converts string 'id' to a number

      this._api.getQuestionDataset(this._auth.getId(), id).subscribe(
        this.chartDraw.bind(this),
        err  => {alert(err)},
        () => {
          this._loading.endLoading();
        }
      );
    });


  }
  ngAfterViewInit(){

  }

  difficultyStr(): string{
    return this.difficulty.toPrecision(3);
  }


  chartDraw(data){
    var dt = new Date();
    var body = data.json();
    var pastLength = body['past_dataset'].length;
    var todayIndex = pastLength - 1;
    var labels: Array<string> = body['past_labels'].concat(body['future_labels']);
    var noact_data = body['past_dataset'].concat(body['noact_dataset']);
    var ifact_data = body['past_dataset'].concat(body['ifact_dataset']);
    var rres: Array<any> = body['rres'];
    var rreLabels: Array<any> = [];
    var rreData: Array<any> = [];
    var dt = new Date();
    dt.setDate(dt.getDate() + body['target_index']);

    this.targetDate = dt;

    var labelsCount = 10;
    var labelsInterval = Math.round(pastLength/labelsCount);


    labels.forEach(
      (label, i, arr) => {
        var date = new Date();
        date.setDate(date.getDate() + parseInt(labels[i]));
        labels[i] = this.formatDate(date, 'M/DD')
      }
    );

    var difficulty = 0;
    rres.forEach(
      (rre, i, arr) => {
        rreLabels.push('UserRank' + rre['rank']);
        rreData.push(rre['value']);
        difficulty += (1 - rre['value']) * rre['rank']
      }
    );


    this.difficulty = difficulty / 3;
    this.currentMemory = body['before_strength'];

    var lineOption = this.memoryOption(todayIndex, body['target_index'])
    var rreOption = this.rreOption();
    var lineChartData = this.memoryData(labels, ifact_data, noact_data);
    var rreChartData = this.rreData(rreLabels, rreData);


    $('#lineChartCanvas').remove();
    $('#chart-container').append('<canvas id="lineChartCanvas" height="450" width="600"></canvas>');
    var canvas: HTMLCanvasElement =   <HTMLCanvasElement>document.querySelector('#lineChartCanvas');
    var ctx = canvas.getContext("2d");
    Chart.defaults.global.title.text = "memory strength";
    var lineChart = Chart.lineWithLine(ctx, {
      data: lineChartData,
      options: lineOption
    });

    console.log(lineChart);

    $('#RresChartCanvas').remove();
    $('#rres-chart-container').append('<canvas id="RresChartCanvas" height="450" width="600"></canvas>');
    var rreCanvas: HTMLCanvasElement =  <HTMLCanvasElement>document.querySelector('#RresChartCanvas');
    var rreCtx = rreCanvas.getContext("2d");
    Chart.defaults.global.title.text = "memory strength";
    var rreChart = Chart.Line(rreCtx, {
      data: rreChartData,
      options: rreOption
    });

  }

  ticksCallback(tickValue, index, ticks){
    return Math.round(tickValue * 100).toString() + "%";
  }


  rreOption(){
    return {
      scaleOverride : true,
      scales: {
        yAxes: [ {
          type: "linear",
          ticks: {
            min: 0, max: 1,
            callback: this.ticksCallback
          },
          scaleLabel : {
            display: true,
            labelString: "ユーザのレベル毎の正解確率 [%]",
          },
        }],
        xAxes: [ {
          position: "bottom",
          ticks: {
            display: true,
            autoSkipPadding: "10px"
          },
          scaleLabel : {
            display: true,
            labelString: "ユーザのレベル",
          },
        }]
      },
      animation : false,
      tooltips: { enabled: false },
      pointDot : false,
      bezierCurve : true,

      //凡例
      legend: {
        display: true,
      },
    };
  }

  memoryOption(index, targetIndex){
    return {
      responsive : true,
      scaleOverride : true,
      scales: {
        yAxes: [ {
          type: "linear",
          ticks: { min: 0,  max: 1,
            callback: this.ticksCallback
          },
          scaleLabel : {
            display: true,
            labelString: "記憶の強さ [%]",
          },
        }],
        xAxes: [ {
          position: "bottom",
          ticks: {
            display: true,
            autoSkipPadding: 10
          },
        }]
      },

      animation : false,
      tooltips: { enabled: false },
      pointDot : false,
      bezierCurve : true,
      legend: {
        display: true,
      },
      showVertical: true,
      VerticalLineIndexes: [
        index,
        targetIndex + index
      ],
      VerticalLineStyles: [
        'rgba(00,00,255, 0.2)',
        'rgba(00,255,00, 0.2)'
      ]
    };
  }

  rreData(labels, data){
    return {
      //x軸の情報
      labels : labels,
      //各グラフの情報。複数渡すことができる。
      datasets : [
        {
          borderColor: "rgba(3, 169, 244, 1)",
          strokeColor: "rgba(3, 169, 244, 1)",
          fillColor: "rgba(3, 169, 244, 0.5)",
          pointColor: "rgba(3, 169, 244, 1)",
          pointStrokeColor: "rgba(3, 169, 244, 1)",
          backgroundColor: "rgba(3, 169, 244, 0.1)",
          data: data,
          'label': '学習者レベルごとの正解確率',
          fill: true,
          lineTension: 0,
          borderDash: [5, 8],
          pointHitRadius: 10,
          pointRadius: 1
        }
      ]
    };
  }


  memoryData(labels, actData, noActData){
    return {
      //x軸の情報
      labels : labels,

      //各グラフの情報。複数渡すことができる。
      datasets : [
        {
          borderColor : "rgba(3, 169, 244, 1)",
          strokeColor : "rgba(3, 169, 244, 1)",
          fillColor : "rgba(3, 169, 244, 0.5)",
          pointColor : "rgba(3, 169, 244, 1)",
          backgroundColor : "rgba(3, 169, 244, 0.1)",
          data : actData,
          'label': '復習後',
          fill: true,
          lineTension: 0,
          //borderDash: [5, 8],
          pointHitRadius: 10,
          pointRadius: 1
        },
        {
          borderColor : "rgba(255, 0, 0, 0.5)",
          fillColor : "rgba(255, 255, 255, 0.5)",
          strokeColor : "rgba(255, 0, 0, 1)",
          pointColor : "rgba(255, 0, 0, 1)",
          backgroundColor : "rgba(255, 0, 0, 0.1)",
          data : noActData,
          'label': '復習しないと',
          fill: true,
          lineTension: 0,
          pointHitRadius: 30,
          pointRadius: 1
        },
        {
          fill:false,
          borderWidth: 0,
          borderColor : "rgba(0, 0, 255, 0)",
          pointColor : "rgba(0, 0, 0, 0)",
          backgroundColor : "rgba(0, 0, 0, 1)",
          pointBorderColor: "rgba(0, 0, 0, 0)",
          data: [
            //NaN, 0.9, 0.9, 0.9, NaN , 0.9, 0.9,
            //NaN, NaN, NaN, NaN, NaN , 0.9, 0.9,
            //0.8, 0.8, 0.8, 0.8, 0.3 , 0.9, 0.9,
          ],
          lineTension: 1,
          'label': '勉強した日',
          pointHitRadius: 30,
          pointRadius: 5
        },
        {
          borderColor : "rgba(0, 0, 0, 0)",
          backgroundColor : "rgba(0, 0, 255, 0.5)",
          data: [],
          'label': 'Today',
          lineTension: 0,
          pointHitRadius: 30,
          pointRadius: 1
        },
        {
          borderWidth: 1,
          borderColor : "rgba(0, 255, 0, 0)",
          backgroundColor : "rgba(00,255,00, 0.2)",
          data: [],
          pointStrokeColor : "#fff",
          'label': '理想的な復習タイミング',
          lineTension: 0,
          pointHitRadius: 30,
          pointRadius: 1
        }
      ]
    };
  }
}
