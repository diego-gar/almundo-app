const dataJson = require("./data/data.json");

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

let capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

let getFilteredHotels = params => {
    return getAllHotels().hotels.filter(hotel => {
        return validateName(hotel, params) && validateStars(hotel, params) && validatePrice(hotel, params);
    });
}

let validateName = (hotel, params) => {
    if(params.name) {
        return hotel.name.includes(params.name) || hotel.name.includes(capitalize(params.name));
    }
    return true;
}

let validateStars = (hotel, params) => {
    if(params.stars) {
        const starsToFilter = params.stars.split(",").map(elem => parseInt(elem.trim()));
        return starsToFilter.includes(0) || starsToFilter.includes(hotel.stars);
    }

    return true;
}

let validatePrice = (hotel, params) => {
    if(params.price) {
        return parseInt(hotel.price) <= parseInt(params.price);
    }
    return true;
}

module.exports = {
    getAllHotels,
    getFilteredHotels,
    getSingleHotel,
    addHotel,
    updateHotel,
    deleteHotel
}