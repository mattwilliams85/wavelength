var topTen;
var data = {
    datasets: [{
        data: [],
        backgroundColor: [
            "#adff00",
            "#74d600",
            "#028900",
            "#00d27f",
            "#00ff83"
        ],
        label: 'Top 10'
    }],
    labels: []
};

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

$('#get-genres').on('click', function () {
  console.log('hi')
  getData();
  $('#discover').hide();
})

function getData() {
  $.get( "api/genres", function( data ) {
    topTen = JSON.parse(data)
    setData(topTen)
  });
}

function setData(topTen) {
  for (var i = 0; i < topTen.length; i++) {
    data.datasets[0].data[i] = topTen[i].count;
    data.labels[i] = topTen[i].name.capitalize();
  }
  buildChart();
}

function buildChart() {
  var ctx = document.getElementById("myChart");
  var myChart = new Chart(ctx, {
      type: 'polarArea',
      data: data,
      options: {}
  });
}