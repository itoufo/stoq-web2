"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var jquery = require("jquery/dist/jquery.js");
var Chart = require('../../../../js/plugins/chartjs/index');
var core_1 = require('@angular/core');
var services_1 = require("./../../../services");
var UserAnalysisComponent = (function () {
    function UserAnalysisComponent(_router, _api, _auth, _logger, _loading, _err, _http) {
        this._router = _router;
        this._api = _api;
        this._auth = _auth;
        this._logger = _logger;
        this._loading = _loading;
        this._err = _err;
        this._http = _http;
        this.userRank = 0;
        this.userRank = 0;
    }
    UserAnalysisComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._err.hideError();
        this._loading.setCurtain();
        this._api.getUserRanks(this._auth.getId()).subscribe(this.chartDraw.bind(this), function (err) {
            alert(err);
        }, function () {
            _this._loading.endLoading();
        });
    };
    UserAnalysisComponent.prototype.chartDraw = function (data) {
        var _this = this;
        var body = data.json();
        var labels = [];
        var datasets = [];
        this.userRank = 0;
        body.forEach(function (row, i, arr) {
            labels.push('UserRank' + row['rank']);
            datasets.push(row['probability']);
            console.log(_this.userRank);
            _this.userRank = _this.userRank + row['rank'] * row['probability'];
            console.log(row['rank']);
            console.log(row['probability']);
            console.log(_this.userRank);
        });
        var lineChartData = {
            //x軸の情報
            labels: labels,
            //各グラフの情報。複数渡すことができる。
            datasets: [
                {
                    //rgba(220, 220, 220, 1)は、rgbと透過度。
                    borderColor: "rgba(3, 169, 244, 1)",
                    //線の色。ポイントの色を省略すると線の色と同じになる。
                    strokeColor: "rgba(3, 169, 244, 1)",
                    //線の下側の色
                    fillColor: "rgba(3, 169, 244, 0.5)",
                    //ポイントの色
                    pointColor: "rgba(3, 169, 244, 1)",
                    //ポイントの枠の色
                    pointStrokeColor: "rgba(3, 169, 244, 1)",
                    backgroundColor: "rgba(3, 169, 244, 0.1)",
                    //実際のデータ
                    data: datasets,
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
            scaleOverride: true,
            scales: {
                yAxes: [{
                        type: "linear",
                        ticks: {
                            min: 0,
                            max: 1,
                            callback: function (tickValue, index, ticks) {
                                return Math.round(tickValue * 100).toString() + "%";
                            }
                        }
                    }]
            },
            //アニメーション設定
            animation: false,
            //Y軸の表記（単位など）
            scaleLabel: {
                display: true,
                labelString: "Memory Strength[%]"
            },
            //ツールチップ表示設定
            tooltips: {
                enabled: false
            },
            //ドットの表示設定
            pointDot: false,
            //線を曲線にするかどうか。falseで折れ線になる。
            bezierCurve: true,
            //凡例
            legendTemplate: "<% for (var i=0; i<datasets.length; i++){%>" +
                "<span style=\"background-color:<%=datasets[i].strokeColor%>\">" +
                "&nbsp;&nbsp;&nbsp;" +
                "</span>&nbsp;<%if(datasets[i].label){%><%=datasets[i].label%><%}%>" +
                "<br><%}%>"
        };
        jquery('#lineChartCanvas').remove();
        jquery('#chart-container').append('<canvas id="lineChartCanvas" height="450" width="600"></canvas>');
        var canvas = document.getElementById('lineChartCanvas');
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
    };
    UserAnalysisComponent = __decorate([
        core_1.Component({
            templateUrl: './analysis.component.html',
            styleUrls: ['./analysis.component.scss'],
            providers: [
                services_1.ApiService,
                services_1.AuthService,
                services_1.LoggerService,
                services_1.LoadingService,
            ]
        })
    ], UserAnalysisComponent);
    return UserAnalysisComponent;
}());
exports.UserAnalysisComponent = UserAnalysisComponent;
//# sourceMappingURL=analysis.component.js.map