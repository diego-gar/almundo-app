const dataJson = require("./data/data.json");

let getAllHotels = () => {
    return {
        "hotels" : dataJson
    }
}

let capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

let getFilteredHotels = (params) => {
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
    getFilteredHotels
}