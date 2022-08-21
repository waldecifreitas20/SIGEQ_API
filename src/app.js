const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const HTTP_METHOD_CHECKER = require('./api/middlewares/http_method');
const UNKNOWN_ROUTES = require('./api/middlewares/unkowns');
const initApiRoutes = require('./routes');

const connectDatabase = require('./database/connection');
const { initDatabase } = require('./database/db')

app.use(HTTP_METHOD_CHECKER);

initApiRoutes(app);
initDatabase();
connectDatabase();

app.use(UNKNOWN_ROUTES);


module.exports = app;