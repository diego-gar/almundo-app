const dataJson = require("./data/data.json");
const { validateName, validatePrice, validateStars, validateLimit} = require("./validator");
const Hotel = require('../models/hotel');
require('../config/config');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });


let getAllHotels = (res) => {
    return {
        "hotels" : dataJson
    };
}

let getAll = (req, res) => {

    let from = req.query.from || 0;
    from = Number(from);
    let limit = req.query.limit || 20;
    limit = Number(limit);

    Hotel.find({})
        .skip(from)
        .limit(limit)
        .exec((err, hoteles) => {
            if(err) {
                res.status(400).json({
                    ok: false,
                    err
                })
            }

            res.status(200).json(hoteles);
        })
}

let getSingleHotel = id => {
    return getAllHotels().hotels.filter(hotel => {
        return id === hotel.id;
    });
};

let getHotel = (req,res) => {
    Hotel.findById(req.params.id, (err, hotelDB) => {
        if(err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(200).json(hotelDB);
    });
};

let addHotel = (params,res) => {
    if(!params.name) {
        res.status(400).json({
            ok: false,
            message: "El hotel debe tener un nombre"}
            );
    }

    if(!params.stars) {
        res.status(400).json({
            ok: false,
            message: "El hotel debe tener estrellas"}
            );
    }

    if(!params.price) {
        res.status(400).json({
            ok: false,
            message: "El hotel debe tener un precio"}
            );
    }

    let hotelParams = {
        "name": params.name,
        "stars": params.stars,
        "price": params.price,
    }

    let hotel = new Hotel(hotelParams);

    hotel.save((err, hotelDB) => {
        if(err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(200).json(hotelDB);
    });
};

let updateHotel = (req,res) => {
    let id = req.params.id;
    let body = req.body;
    
    Hotel.findByIdAndUpdate(id, body, (err, HotelUpdated) => {
        if(err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(200).json(HotelUpdated);
    });

    // let hotel = getSingleHotel(params.id);
    
    // if((hotel.length === 0) || !hotel[0].id) {
    //     res.status(400).json({"Error": "Hotel inválido"});
    // }

    // res.status(200).json({"Status": `Hotel ${params.id} actualizado correctamente`});
};

let deleteHotel = (req,res) => {
    Hotel.findByIdAndRemove(req.params.id, (err , hotelDeleted) => {
        if(err) {
            res.status(400).json({
                ok: false,
                err
            })
        }

        if(!hotelDeleted) {
            res.status(400).json({
                ok: false,
                message: "Hotel no encontrado"
            })
        }

        res.status(200).json(hotelDeleted);
    });
};

let getFilteredHotels = params => {
    let cantidadHoteles = 0;
    
    return getAllHotels().hotels.filter(hotel => {
        if(
            validateName(hotel, params) && 
            validateStars(hotel, params) && 
            validatePrice(hotel, params) &&
            validateLimit(cantidadHoteles)
        ) {
            cantidadHoteles++;
            return true;
        }

        return false;
    });
}

module.exports = {
    getAllHotels,
    getFilteredHotels,
    getHotel,
    addHotel,
    updateHotel,
    deleteHotel,
    getAll
}