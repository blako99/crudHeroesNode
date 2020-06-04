const mongoose = require('mongoose')

const Schema = mongoose.Schema



const SuperheroeSchema = Schema({

        nombre: String,
        tipo: { type: String, enum: ['aire', 'fuego', 'agua', 'tierra'] },
        pais: { type: Schema.ObjectId, ref: "Pais" },
        rol: String,
    }, {
        versionKey: false
    }

)


module.exports = mongoose.model('Superheroe', SuperheroeSchema)


//req.name
//find name