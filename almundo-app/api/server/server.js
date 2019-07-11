require('./config/config');
const { getAllHotels, getFilteredHotels, getSingleHotel, addHotel, updateHotel, deleteHotel } = require('./mockData/dataHandler');
const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors())
app.use(express.static(__dirname + '/../../public'));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/hotels/all', function(req, res) {
    res.json(getAllHotels());
});

app.get('/hotels/search', function(req, res) {
    res.json(getFilteredHotels(req.query));
});

app.get('/hotels/hotel_id', function(req, res) {
    res.json(getSingleHotel(req.query.id));
});

app.put('/hotels/hotel_id', function(req, res) {
    res.json(updateHotel(req.query));
});

app.delete('/hotels/hotel_id', function(req, res) {
    res.json(deleteHotel(req.query.id));
});

app.post('/hotels/hotel_id', function(req, res) {
    res.json(addHotel(req.query));
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});