const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const UNKNOWN_ROUTES_CHECKER = require('./api/middlewares/notFound.js');
const initApiRoutes = require('./routes');

const connectDatabase = require('./database/connection');
const { initDatabase } = require('./database/db')

app.use(UNKNOWN_ROUTES_CHECKER);

initApiRoutes(app);
initDatabase();
connectDatabase();

module.exports = app;