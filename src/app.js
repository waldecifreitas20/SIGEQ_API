const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : false}));

require('./config/dotenv');

require('./api/controllers')(app);

require('./database/connection');
require('./database/db').initDatabase();

module.exports = app;