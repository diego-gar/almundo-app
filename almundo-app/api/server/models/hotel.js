const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let hotelsSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    amenities: {
        type: [String],
        required: true,
    },
    id: {
        type: String,
    }
});

module.exports = mongoose.model('HotelSchema', hotelsSchema);