const Hotel = require('../models/hotel');
require('../config/config');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

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
                    status: false,
                    err
                })
            }

            res.status(200).json(hoteles);
        })
}

let getHotel = (req,res) => {
    Hotel.findOne({'id': req.params.id}, (err, hotelDB) => {
        if(err) {
            res.status(400).json({
                status: false,
                err
            })
        }

        if(!hotelDB) {
            res.status(400).json({
                status: false,
                message: "Hotel no encontrado"
            })
        }

        res.status(200).json(hotelDB);
    });
};

let addHotel = (params,res) => {
    if(!params.name) {
        res.status(400).json({
            status: false,
            message: "El hotel debe tener un nombre"}
            );
    }

    if(!params.stars) {
        res.status(400).json({
            status: false,
            message: "El hotel debe tener estrellas"}
            );
    }

    if(!params.price) {
        res.status(400).json({
            status: false,
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
                status: false,
                err
            })
        }

        res.status(200).json(hotelDB);
    });
};

let updateHotel = (req,res) => {
    let id = req.params.id;
    let body = req.body;
    
    Hotel.findOneAndUpdate({"id": id}, body, (err, HotelUpdated) => {
        if(err) {
            res.status(400).json({
                status: false,
                err
            })
        }

        res.status(200).json(HotelUpdated);
    });
};

let deleteHotel = (req,res) => {
    Hotel.findOneAndRemove({"id": req.params.id}, (err , hotelDeleted) => {
        if(err) {
            res.status(400).json({
                status: false,
                err
            })
        }
        
        if(!hotelDeleted) {
            res.status(400).json({
                status: false,
                message: "Hotel no encontrado"
            })
        }

        res.status(200).json(hotelDeleted);
    });
};

let getFilteredHotels = (req, res) => {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 20;
    limit = Number(limit);

    let name = req.query.name || "";
    const userRegex = new RegExp(name, 'i');
    
    let stars;

    if(req.query.stars && !req.query.stars.includes(0)) {
        stars = req.query.stars.split(",").map(elem => parseInt(elem.trim()));
    } else {
        stars = [1,2,3,4,5];
    }

    Hotel.find({name: userRegex, stars: stars})
        .skip(from)
        .limit(limit)
        .exec((err, hoteles) => {
            if(err) {
                res.status(400).json({
                    status: false,
                    err
                })
            }
            res.status(200).json(hoteles);
    })
}

module.exports = {
    getFilteredHotels,
    getHotel,
    addHotel,
    updateHotel,
    deleteHotel,
    getAll
}