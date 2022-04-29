module.exports = require('dotenv').config({
    path: process.env.NODE_ENV == 'deveplompent' ? '.env' : '.env.test'
});