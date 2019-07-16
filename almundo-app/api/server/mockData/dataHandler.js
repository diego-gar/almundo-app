const dataJson = require("./data/data.json");
const { validateName, validatePrice, validateStars, validateLimit} = require("./validator");
const Hotel = require('../models/hotel');

let getAllHotels = (res) => {
    res.status(200).json({
        "hotels" : dataJson
    });
}

let getSingleHotel = id => {
    return getAllHotels().hotels.filter(hotel => {
        return id === hotel.id;
    });
};

let getHotel = (id,res) => {
    let hotel = getSingleHotel(id);

    if((hotel.length === 0) || !hotel[0].id) {
        res.status(400).josn({"Error": "Hotel inválido"});
    }

    res.status(200).json(hotel);
};

let addHotel = (params,res) => {
    if(!params.name) {
        res.status(400).json({"Error": "El hotel debe tener un nombre"});
    }

    if(!params.stars) {
        res.status(400).json({"Error": "El hotel debe tener estrellas"});
    }

    if(!params.price) {
        res.status(400).json({"Error": "El hotel debe tener un precio"});
    }

    let hotelParams = {
        "name": params.name,
        "stars": params.stars,
        "price": params.price,
    }

    let hotel = new Hotel(hotelParams);

    hotel.save((err, hotelDB) => {

    });
    //TODO
    //Insertar registro a la coleccion de hoteles

    return res.status(200).json(hotelParams);
};

let updateHotel = (params,res) => {
    let hotel = getSingleHotel(params.id);
    
    if((hotel.length === 0) || !hotel[0].id) {
        res.status(400).json({"Error": "Hotel inválido"});
    }

    //TODO
    //Actualizar registro de la coleccion de hoteles

    res.status(200).json({"Status": `Hotel ${params.id} actualizado correctamente`});
};

let deleteHotel = (id,res) => {
    let hotel = getSingleHotel(id);

    if((hotel.length === 0) || !hotel[0].id) {
        res.status(400).json({"Error": "Hotel inválido"});
    }

    //TODO
    //Elimimnar registro de la coleccion de hoteles

    res.status(200).json({"Status": `Hotel ${id} eliminado correctamente`});
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
    deleteHotel
}