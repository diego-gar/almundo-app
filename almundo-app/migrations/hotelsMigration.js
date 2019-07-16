const dataJson = require("../api/server/mockData/data/data.json");
const Hotel = require('../api/server/models/hotel');
require('../api/server/config/config');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

let migrateHotels = () => {
    dataJson.forEach(hotelParams => {
        let hotel = new Hotel(hotelParams);

        hotel.save((err, hotelDB) => {
            if(err) {
                console.log(err);
            }

            console.log(hotelDB);
        });
    });
};

migrateHotels();