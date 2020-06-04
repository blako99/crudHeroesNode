var express = require('express')

var paisesController = require('../controller/paises')

const Country = require('../models/paises')

var api = express.Router()

const md_token = require('../middleware/token')

const md_user = require('../middleware/user')


/* api.get('/countries', (req, res, next) => {

    //controlador de paises

    //solo devolver paises

    let perPage = 2;

    let page = req.params.page || 1;

    Country
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec((err, countries) => {

            if (err) console.log(err);

            else {
                console.log(countries);

                res.send(countries)
            }
        })
}) */

api.get('/countries', paisesController.getCountries)

api.get('/country/:countryId', md_user.checkUser, md_token.checkToken, paisesController.getCountry)

api.get('/countries/:countryId', md_user.checkUser, md_token.checkToken, paisesController.getSuperheroesPerCountry)

api.post('/pais', md_token.checkToken, paisesController.saveCountry)

api.delete('/pais/:paisId', md_token.checkToken, paisesController.deleteCountry)


//faltaria el update,pero para que quieres modificar el nombre del pais?


module.exports = api