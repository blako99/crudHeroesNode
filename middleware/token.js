const config= require('../config')


function checkToken(req, res, next)
    { 
        //if(!req.authorization) return res.status(401).send({message: 'No tienes autorizacion'})

        if(req.headers.token != config.SECRET_TOKEN) { return res.status(404).send({message:'El token no ha sido encontrado '}) } 

        next()
    }

module.exports = {checkToken};