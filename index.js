const mongoose = require('mongoose');

const app  = require('./app')

const config =require('./config')



mongoose.connect(config.db,{useNewUrlParser: true, useUnifiedTopology: true}, (err, res) => {
    if (err) {

        return console.log("Error al conectar con la bd")
    }

    console.log("Conexion a la base de datos completada")

    app.listen(config.port, () => {

        console.log(` Api rest funcionando en el puerto ${config.port}`);

    });

})

 









         