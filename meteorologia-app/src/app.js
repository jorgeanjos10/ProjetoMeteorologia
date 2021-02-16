const express = require('express');

const logger = require('../utils/logger');

const hbs = require("hbs");
const path = require("path");
const app = express();

const weatherData = require('../utils/weatherData');

const port = process.env.PORT || 3000

const publicStaticDirPath = path.join(__dirname, '../public')

const viewsPath = path.join(__dirname, '../templates/views');

const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));
// app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Aplicação Meteorologia'
    })
})



//localhost:3000/weather?address=lahore
app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }

    weatherData(address, (error, {temperature, description, cityName, pais, amanhecer, anoitecer} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName, pais, amanhecer, anoitecer);
        const temperaturaC = (temperature - 273.5).toFixed(2) + String.fromCharCode(176);
        const respostaCidade = "Cidade: " + cityName + ", Temperatura: " + temperaturaC;
        logger.info(respostaCidade);
        res.send({
            temperature,
            description,
            cityName,
            pais,
            amanhecer,
            anoitecer
        })
    })
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "page not found"
    })
})

app.listen(port, () => {
    logger.info("Server is up and running on port " + port);

})