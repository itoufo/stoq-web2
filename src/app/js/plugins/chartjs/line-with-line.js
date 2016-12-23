var helpers = Chart.helpers;

function lineEnabled(dataset, options) {
  return helpers.getValueOrDefault(dataset.showLine, options.showLines);
}

Chart.defaults.lineWithLine = {
  showLines: true,
  showVertical: true,
  VerticalLineIndexes: [],
  VerticalLineStyles: [],
  hover: {
    mode: "label"
  },
  scales: {
    xAxes: [{
      type: "category",
      id: 'x-axis-0'
    }],
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
  }
};

Chart.lineWithLine = function(context, config) {
  config.type = 'lineWithLine';
  return new Chart(context, config);
};

Chart.controllers.lineWithLine = Chart.controllers.line.extend({
  name: "lineWithLine",
  draw: function (ease) {
    var vIndexes = this.chart.options.VerticalLineIndexes;
    var vStyles = this.chart.options.VerticalLineStyles;
    var me = this;
    var meta = me.getMeta();
    var dataset = me.getDataset();
    var points = meta.data || [];
    var easingDecimal = ease || 1;
    var i, ilen;

    var yScale = this.getScaleForId(meta.yAxisID);
    var xScale = this.getScaleForId(meta.xAxisID);

    // Transition Point Locations
    for (i=0, ilen=points.length; i<ilen; ++i) {
      points[i].transition(easingDecimal);
    }

    if (lineEnabled(me.getDataset(), me.chart.options)) {
      meta.dataset.transition(easingDecimal).draw();
    }

    var j = 0;

    //Draw the points
    for (i=0, ilen=points.length; i<ilen; ++i) {
      points[i].draw();

      console.log(vIndexes);
      console.log(vIndexes.includes(points[i]._index));
      if(vIndexes.includes(points[i]._index) && this.chart.options.showVertical){
        var ctx = this.chart.chart.ctx;
        ctx.save();
        ctx.strokeStyle = vStyles[j];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(points[i]._view.x, yScale.top);
        ctx.lineTo(points[i]._view.x, yScale.bottom);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
        j++;
      }
    }
  }
});
