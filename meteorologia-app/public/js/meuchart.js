// var t = "";

// $(document).ready(function() {
//     var t = $('#example').DataTable();
    
// } );

var meses = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

            var dataAtual = new Date().getDate() + " " + meses[new Date().getMonth()].substring(0, 3);

            function random_rgba() {
                var o = Math.round, r = Math.random, s = 255;
                return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
            }

            var color1 = random_rgba();
            var color2 = random_rgba();


    var dataColunas = {
            labels: [ dataAtual ],
            datasets: [
                        
                        ]
        };

            //bar chart
    var ctx = document.getElementById( "colunas" );
        ctx.height = 200;
        ctx.width = 600;
    var chartColunas = new Chart( ctx, {
        type: 'bar',
        data: dataColunas,

        options: {
                scales: {

                    yAxes: [{
                            

                            ticks: {
                                // Include a dollar sign in the ticks
                                beginAtZero: true,
                                callback: function(value, index, values) {
                                    return value + ' ºC';
                                }
                            }
                            }]
                    
                },
                responsive: true,
                tooltips: {
                    mode: 'nearest',
                    intersect: false
                }
                
            }

        
        } );

        addData(chartColunas, label, data);