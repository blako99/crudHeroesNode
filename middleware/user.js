const config = require('../config')


function checkUser(req, res, next) {
    //if(!req.authorization) return res.status(401).send({message: 'No tienes autorizacion'})

    if (req.headers.password != config.password) { return res.status(404).send({ message: 'La contraseña es incorrecta ' }) }

    next()
}

module.exports = { checkUser };