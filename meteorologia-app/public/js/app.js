var fetchWeather = "/weather";

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');

const tempElement = document.querySelector('.temperature span');

const locationElement = document.querySelector('.place');

const tabelabodyElement = document.querySelector('.tabelabody');

const dateElement = document.querySelector('.date');

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

dateElement.textContent = new Date().getDate() + ", " + monthNames[new Date().getMonth()].substring(0, 3);






var t = $('#example').DataTable();
    


function calcularHora(dados) {

    //let unix_timestamp = 1549312452
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    var date = new Date(dados * 1000);
    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    //console.log(formattedTime);

    return formattedTime;   // The function returns the product of p1 and p2
  }


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent = "Loading...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error) {
                locationElement.textContent = data.error;
                tempElement.textContent = "";
                weatherCondition.textContent = "";
            } else {
                console.log()
                if(data.description === "rain" || data.description === "fog") {
                    weatherIcon.className = "wi wi-day-" + data.description
                } else {
                    weatherIcon.className = "wi wi-day-cloudy"
                }


                


                locationElement.textContent = data.cityName;
                tempElement.textContent = (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent = data.description.toUpperCase();
                locationElement.textContent = data.cityName;

                //adicionar cidade à tabela
                
                t.row.add( [
                    data.cityName,
                    (data.temperature - 273.5).toFixed(2) + String.fromCharCode(176),
                    calcularHora(data.amanhecer),
                    calcularHora(data.anoitecer),
                    data.pais
                ] ).draw( false );
                

                var tempCelcius = (data.temperature - 273.5).toFixed(2);

                console.log(tempCelcius);

                var color3 = random_rgba();

                // adicionar cidade ao gráfico

                var newDataset = {
                    label: data.cityName,
                    backgroundColor: color3,
                    borderColor: color3,
                    borderWidth: 1,
                    data: [tempCelcius],
                }
            
                // You add the newly created dataset to the list of `data`
                dataColunas.datasets.push(newDataset);
            
                // You update the chart to take into account the new dataset
                chartColunas.update();

            }
        }) 
    });
})


