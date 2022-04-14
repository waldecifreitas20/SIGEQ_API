const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const toStablishConnection = require('./database/connection');
const { initDatabase } = require('./database/db')

require('./config/dotenv');
require('./routes')(app);

initDatabase();
toStablishConnection();

module.exports = app;