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
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();})
}

$('#get-genres').on('click', function () {
  getData();
  
})

function getData() {
  $.get( "api/genres", function( data ) {
    $('.btn span').fadeOut('fast')
    $('#discover').addClass('hidden')
    setTimeout(function() {
      $('#discover').hide()
      topTen = JSON.parse(data)
      setData(topTen)
    }, 500)
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
      options: { 
        scale: { 
          ticks: { display: false } 
        },
        tooltips: {
           callbacks: {
             label: function(tooltipItem, data) {
               var value = data.datasets[0].data[tooltipItem.index];
               var label = data.labels[tooltipItem.index];
               return value + ' Artists in ' + label;
             }
           }
         }, 
      }
  });
}