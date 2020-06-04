const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CountrySchema = Schema({
    name: String,
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('Country', CountrySchema)