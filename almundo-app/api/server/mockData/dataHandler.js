const dataJson = require("./data/data.json");
const { validateName, validatePrice, validateStars} = require("./validator");

let getAllHotels = () => {
    return {
        "hotels" : dataJson
    }
}

let getSingleHotel = id => {
    return getAllHotels().hotels.filter(hotel => {
        return id === hotel.id;
    });
};

let addHotel = params => {
    if(!params.name) {
        return {"Error": "El hotel debe tener un nombre"};
    }

    if(!params.stars) {
        return {"Error": "El hotel debe tener estrellas"};
    }

    if(!params.price) {
        return {"Error": "El hotel debe tener un precio"};
    }

    let hotel = {
        "name": params.name,
        "stars": params.stars,
        "price": params.price,
    }

    //TODO
    //Insertar registro a la coleccion de hoteles

    return hotel;
};

let updateHotel = params => {
    let hotel = getSingleHotel(params.id);
    
    if(!hotel.id) {
        return {"Error": "Hotel inválido"};
    }

    //TODO
    //Actualizar registro de la coleccion de hoteles

    return {"Status": `Hotel ${params.id} actualizado correctamente`};
};

let deleteHotel = id => {
    let hotel = this.getSingleHotel(id);

    if(!hotel.id) {
        return {"Error": "Hotel inválido"};
    }

    //TODO
    //Elimimnar registro de la coleccion de hoteles

    return {"Status": `Hotel ${id} eliminado correctamente`};
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

let validateLimit = cantidadHoteles => {
    const limit = 20;
    return cantidadHoteles < limit;
};

module.exports = {
    getAllHotels,
    getFilteredHotels,
    getSingleHotel,
    addHotel,
    updateHotel,
    deleteHotel
}