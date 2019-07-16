const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let hotelsSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} no es un integer value'
        }
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('HotelSchema', hotelsSchema);