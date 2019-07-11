require('./config/config');
const { getAllHotels, getFilteredHotels } = require('./mockData/dataHandler');
const express = require('express');
const app = express();
var cors = require('cors')

app.use(cors())
app.use(express.static(__dirname + '/../../public'));

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/hotel/all', function(req, res) {
    res.json(getAllHotels());
});

app.get('/hotels/search', function(req, res) {
    res.json(getFilteredHotels(req.query));
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});