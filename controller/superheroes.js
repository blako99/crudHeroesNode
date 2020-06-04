const Heroe = require("../models/superheroes");

const Country = require("../models/paises");

//listar todos los heroes

function getHeroes(req, res) {
    let dbcriteria = {};

    if (req.query.name) {
        dbcriteria.nombre = req.query.name;
    }

    if (req.query.tipo) {
        dbcriteria.tipo = req.query.tipo;
    }

    const page = parseInt(req.query.page);

    const perPage = parseInt(req.query.perPage);

    const conditions = {};

    if (req.query.name && req.query.tipo) {
        conditions.$or = [
            { nombre: { $regex: req.query.name, $options: "i" } },
            { tipo: { $regex: req.query.tipo, $options: "i" } },
        ];
    } else if (req.query.name) {
        conditions.nombre = { $regex: req.query.name, $options: "i" };
    } else if (req.query.tipo) {
        conditions.tipo = { $regex: req.query.tipo, $options: "i" };
    }

    //O nombre o tipo

    //mar y que me salgan todas

    //paginacion a mar que me salgan 2 y despues 1

    //db.getCollection('superheroes').find({ $or: [{nombre:"Alex"} , {tipo:"fuego"}]})

    // db.getCollection('superheroes').find({tipo:{$regex:"a"}})

    //db . superheroes . find (  {  $or :  [  {  nombre :  {  $regex :  "A"  }  } ,  {  tipo : {$regex:  "f"  }}  ]  }  )

    Heroe.find(conditions, (err, heroes) => {
            Country.populate(heroes, { path: "pais" }, function(err, heroes) {
                if (err) return res.status(500).send({ message: "Error" });

                if (!heroes) return res.status(404).send({ message: "No hay heroes" });

                res.status(200).send(heroes);
            });
        })
        .skip(perPage * page - perPage)
        .limit(perPage);
}

//listar heroe por id
function getHeroe(req, res) {
    let heroeId = req.params.heroeId;

    Heroe.findById(heroeId, (err, heroe) => {
        if (err)
            return res.status(500).send({ message: "error al realizar la peticion" });

        if (!heroe) return res.status(404).send({ message: "el heroe no existe" });

        res.status(200).send({ heroe });
    });
}
//listar los heroes de un pais
//MIRAR
function getHeroeCountry(req, res) {
    let pais = req.params.pais;

    Heroe.find(pais, (err, heroe) => {
        if (err)
            return res.status(500).send({ message: "error al realizar la peticion" });

        if (!heroe) return res.status(404).send({ message: "el heroe no existe" });

        res.status(200).send({ heroe });
    });
}

//actualizar un heroe

function updateHeroe(req, res) {
    let heroeId = req.params.heroeId;

    let update = req.body;

    Heroe.findByIdAndUpdate(
        heroeId,
        update, { new: true },
        (err, heroeUpdated) => {
            console.log("err ", err);

            if (err)
                return res
                    .status(500)
                    .send({ message: "Error al actualizar el heroe" });

            res.status(200).send({ heroeUpdated });
        }
    );
}

//borrar supeheroe
function deleteHeroe(req, res) {
    let heroeId = req.params.heroeId;

    Heroe.findById(heroeId, (err, heroe) => {
        if (err)
            return res.status(500).send({ message: "error al realizar la peticion" });

        heroe.remove((err) => {
            if (err)
                return res
                    .status(500)
                    .send({ message: "error al realizar la peticion" });

            res.status(200).send({ message: "EL héroe SE HA BORRADO CORRECTAMENTE" });
        });
    });
}

//guardar un heroe

function saveHeroe(req, res) {
    let heroe = new Heroe();

    heroe.nombre = req.body.nombre;

    heroe.tipo = req.body.tipo;

    heroe.pais = req.body.pais;

    heroe.rol = req.body.rol;

    heroe.save((err, heroeStored) => {
        if (err)
            res
            .status(500)
            .send({ message: `Error al salvar en la base de datos : ${err}` });

        res.status(200).send({ data: heroeStored });
    });
}
//funcion listar heroes por TIPO

function searchHeroe(req, res) {
    nombreheroe = req.params.nombreheroe;

    console.log(nombreheroe);

    Heroe.findOne({ nombre: nombreheroe }, (err, heroe) => {
        if (err) {
            console.log(err);
        } else {
            if (heroe.rol === "ADMIN") {
                console.log("Eres admin y puedes actualizar");

                let heroe = new Heroe();

                heroe.nombre = req.body.nombre;

                heroe.tipo = req.body.tipo;

                heroe.pais = req.body.pais;

                heroe.rol = req.body.rol;

                heroe.save((err, heroeStored) => {
                    if (err)
                        res
                        .status(500)
                        .send({
                            message: `Error al salvar en la base de datos : ${err}`,
                        });

                    //Mostrar mensaje:Formulario fallido

                    console.log(heroeStored);

                    res.status(200).send({ data: heroeStored });
                });
            } else res.send("No eres admin y no puedes insertar heroes");
        }
    });
}

//exportacion de funciones
module.exports = {
    getHeroes,
    getHeroe,
    getHeroeCountry,
    deleteHeroe,
    updateHeroe,
    searchHeroe,
    saveHeroe,
};