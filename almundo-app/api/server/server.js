require('./config/config');
const { getAllHotels, getFilteredHotels, getHotel, addHotel, updateHotel, deleteHotel } = require('./mockData/dataHandler');
const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors())
app.use(express.static(__dirname + '/../../public'));

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.get('/hotels/all', function(req, res) {
    res.json(getAllHotels(res));
});

app.get('/hotels/search', function(req, res) {
    getFilteredHotels(req.query);
});

app.get('/hotels/hotel', function(req, res) {
    getHotel(req.query.id, res);
});

app.put('/hotels/hotel', function(req, res) {
    updateHotel(req.query, res);
});

app.delete('/hotels/hotel', function(req, res) {
    deleteHotel(req.query.id, res);
});

app.post('/hotels/hotel', function(req, res) {
    addHotel(req.query, res);
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});