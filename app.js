const express = require('express'); //importamos express

//middlewares =>capa que se añade,cada peticion http pasa por aqui 
const bodyParser = require('body-parser'); //para manejar las solicitudes GET Y POST al servidor y para recibir los datos en JSON

const app = express(); //arrancamos el servidor


//cargar rutas


const paises_routes = require('./routes/paises')


const heroes_routes = require('./routes/supeheroes')

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


app.use('/api', [paises_routes, heroes_routes])


module.exports = app