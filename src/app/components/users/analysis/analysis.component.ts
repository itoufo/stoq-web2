import 'jquery';
import 'Chart';

import {
  Component,
  OnInit
} from '@angular/core';

import { Router, Routes, RouterModule } from '@angular/router';

import {Http} from "@angular/http";

import {
  AuthService,
  ApiService,
  LoadingService,
  LoggerService,
  ErrorService,
} from "./../../../services";

@Component({
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  providers: [
    ApiService,
    AuthService,
    LoggerService,
    LoadingService,
  ],
})

export class UserAnalysisComponent implements OnInit{

  userRank = 0;

  constructor(
    private _router: Router,
    private _api: ApiService,
    private _auth: AuthService,
    private _logger: LoggerService,
    private _loading: LoadingService,
    private _err: ErrorService,
    private _http: Http
  ) {
    this.userRank = 0;
  }

  ngOnInit(){
    this._err.hideError();
    this._loading.setCurtain();

    this._api.getUserRanks(this._auth.getId()).subscribe(
      this.chartDraw.bind(this),
      err  => {
        alert(err)
      },
      () => {
        this._loading.endLoading();
      }
    );
  }

  chartDraw(data){
    var body: any = data.json();

    var labels = [];
    var datasets = [];

    this.userRank = 0;

    body.forEach(
      (row, i, arr) => {
        labels.push('UserRank' + row['rank']);
        datasets.push(row['probability']);
        console.log(this.userRank);
        this.userRank = this.userRank + row['rank'] * row['probability']
        console.log(row['rank']);
        console.log(row['probability']);
        console.log(this.userRank);
      }
    );

    var lineChartData = {
      //x軸の情報
      labels : labels,
      //各グラフの情報。複数渡すことができる。
      datasets : [
        {
          //rgba(220, 220, 220, 1)は、rgbと透過度。
          borderColor : "rgba(3, 169, 244, 1)",
          //線の色。ポイントの色を省略すると線の色と同じになる。
          strokeColor : "rgba(3, 169, 244, 1)",
          //線の下側の色
          fillColor : "rgba(3, 169, 244, 0.5)",
          //ポイントの色
          pointColor : "rgba(3, 169, 244, 1)",
          //ポイントの枠の色
          pointStrokeColor : "rgba(3, 169, 244, 1)",
          backgroundColor : "rgba(3, 169, 244, 0.1)",
          //実際のデータ
          data : datasets,
          //凡例名
          'label': 'ユーザ学習レベル',
          fill: true,
          lineTension: 0,
          borderDash: [5, 8],
          pointHitRadius: 10,
          pointRadius: 1
        }
      ]
    };

    var option = {
      //縦軸の目盛りの上書き許可。これ設定しないとscale関連の設定が有効にならないので注意。
      scaleOverride : true,

      scales: {
        yAxes: [ {
          type: "linear",
          ticks: {
            min: 0,
            max: 1,
            callback: function(tickValue, index, ticks){
              return Math.round(tickValue * 100).toString() + "%";
            }
          }
        }]
      },

      //アニメーション設定
      animation : false,

      //Y軸の表記（単位など）
      scaleLabel : {
        display: true,
        labelString: "Memory Strength[%]",
      },

      //ツールチップ表示設定
      tooltips: {
        enabled: false
      },

      //ドットの表示設定
      pointDot : false,

      //線を曲線にするかどうか。falseで折れ線になる。
      bezierCurve : true,

      //凡例
      legendTemplate :
      "<% for (var i=0; i<datasets.length; i++){%>" +
      "<span style=\"background-color:<%=datasets[i].strokeColor%>\">" +
      "&nbsp;&nbsp;&nbsp;" +
      "</span>&nbsp;<%if(datasets[i].label){%><%=datasets[i].label%><%}%>" +
      "<br><%}%>"
    };


    $('#lineChartCanvas').remove();
    $('#chart-container').append('<canvas id="lineChartCanvas" height="450" width="600"></canvas>');
    var canvas: HTMLCanvasElement =  <HTMLCanvasElement> document.getElementById('lineChartCanvas');
    var ctx = canvas.getContext("2d");
    //ctx.clearRect(0, 0, canvas.width, canvas.height);

    Chart.defaults.global.title.text = "memory strength";

    //グラフ描画
    var chart = Chart.Line(ctx, {
      data: lineChartData,
      options: option
    });
    //var chart = new Chart(
    //  ctx,
    //  {
    //    type:'line',
    //    data:lineChartData,
    //    options: option
    //  }
    //);
  }
}
