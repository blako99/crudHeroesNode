const mongoose = require('mongoose')


var express = require('express')


var heroeController = require('../controller/superheroes')


const md_token = require('../middleware/token')

const md_user = require('../middleware/user')

var api = express.Router()

// const token = require('../middleware')


api.get('/heroes', heroeController.getHeroes)

api.get('/heroe/:heroeId', heroeController.getHeroe)

api.put('/heroe/:heroeId', md_token.checkToken, heroeController.updateHeroe)

api.post('/heroe', md_user.checkUser, md_token.checkToken, heroeController.saveHeroe)

api.delete('/heroe/:heroeId', md_token.checkToken, heroeController.deleteHeroe)

module.exports = api