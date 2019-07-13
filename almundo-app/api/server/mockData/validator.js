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

let validateLimit = cantidadHoteles => {
    const limit = 20;
    return cantidadHoteles < limit;
};

let capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

module.exports = {
    validateName,
    validatePrice,
    validateStars,
    validateLimit
}