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

            return res.status(200).json(hoteles);
        })
}

let getHotel = (req,res) => {
    Hotel.findOne({'id': req.params.id}, (err, hotelDB) => {
        if(err) {
            return res.status(400).json({
                status: false,
                err
            })
        }

        if(!hotelDB) {
            return res.status(400).json({
                status: false,
                message: "Hotel no encontrado"
            })
        }

        return res.status(200).json(hotelDB);
    });
};

let addHotel = (req,res) => {
    if(!req.body.name) {
        return res.status(400).json({
            status: false,
            message: "El hotel debe tener un nombre"}
            );
    }

    if(!req.body.stars) {
        return res.status(400).json({
            status: false,
            message: "El hotel debe tener estrellas"}
            );
    }

    if(!req.body.price) {
        return res.status(400).json({
            status: false,
            message: "El hotel debe tener un precio"}
            );
    }

    let hotelParams = {
        "name": req.body.name,
        "stars": req.body.stars,
        "price": req.body.price,
        "image": req.body.image,
        "amenities": req.body.amenities,
        "id": req.body.id
    }

    let hotel = new Hotel(hotelParams);

    hotel.save((err, hotelDB) => {
        if(err) {
            return res.status(400).json({
                status: false,
                err
            })
        }

        return res.status(200).json(hotelDB);
    });
};

let updateHotel = (req,res) => {
    let id = req.params.id;
    let body = req.body;
    
    Hotel.findOneAndUpdate({"id": id}, body, (err, HotelUpdated) => {
        if(err) {
            return res.status(400).json({
                status: false,
                err
            })
        }

        return res.status(200).json(HotelUpdated);
    });
};

let deleteHotel = (req,res) => {
    Hotel.findOneAndRemove({"id": req.params.id}, (err , hotelDeleted) => {
        if(err) {
            return res.status(400).json({
                status: false,
                err
            })
        }
        
        if(!hotelDeleted) {
            return res.status(400).json({
                status: false,
                message: "Hotel no encontrado"
            })
        }

        return res.status(200).json(hotelDeleted);
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
            return res.status(200).json(hoteles);
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