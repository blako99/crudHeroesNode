const Country = require('../models/paises')

const SuperHeroe = require('../models/superheroes')



//superheroe.findbyID=

//En el for llamo and un find byID


//Dame un pais

//de ese pais obten los superheroes


function getCountries(req, res) {

    const conditions = {}

    if (req.query.key && req.query.tipo) {

        conditions.query = conditions.$sort = {
            [req.query.key]: parseInt(req.query.tipo)
        }
    }
    // console.log("conditions", conditions);

    console.log(conditions);
    Country.find({}, (err, paises) => {

        if (err) res.send(err)

        if (!paises) res.send("No hay paises")

        else {

            res.send(paises)

        }
    }).sort(conditions.query)

}

function getSuperheroesPerCountry(req, res) {


    Country.findById(req.params.countryId, (err, country) => {

        if (err) {
            res.send(err)
        } else {

            SuperHeroe.find({ pais: country._id }, { pais: 0 }, { versionKey: 0 }, (err, superheroes) => {
                if (err) res.send(err)
                else {
                    console.log(superheroes);
                    country.sp = superheroes;

                    res.send({ country })
                }
            }).lean()
        }
    }).lean()
}






function getCountry(req, res) {

    Country.findById(req.params.countryId, (err, country) => {

        if (err) return res.status(500).send({ message: 'error al realizar la peticion' })

        if (!country) return res.status(404).send({ message: 'el país no existe' })

        res.status(200).send({ country })

    })

}


function saveCountry(req, res) {

    let country = new Country()

    country.name = req.body.name

    country.save((err, countryStored) => {

        if (err) res.status(500).send({ message: `Error al salvar en la base de datos : ${err}` })

        res.status(200).send({ countryStored })

    })

}


function updateCountry(req, res) {

    let productId = req.params.productId

    let update = req.body

    Product.findByIdAndUpdate(productId, update, { new: true }, (err, productUpdated) => {

        console.log("err ", err);

        if (err) return res.status(500).send({ message: 'Error al actualizar el producto' })


        res.status(200).send({ data: productUpdated })
    })

}



function deleteCountry(req, res) {
    var countryId = req.params.id;

    Country.findOneAndRemove(countryId, (error, countryRemoved) => {
        if (error) {
            res.status(500).send({ message: "Error del servidor" })
        } else {
            if (!countryRemoved) {
                res.status(404).send({ message: "No existe la canción con id " + songId });
            } else {
                res.status(200).send({ song: countryRemoved });
            }
        }
    })
};




module.exports = {
    getSuperheroesPerCountry,
    getCountry,
    getCountries,
    deleteCountry,
    updateCountry,
    saveCountry
}