const { database } = require('./db');

module.exports = database.authenticate()
.then(() => {
    console.log('DATABASE CONNECTED WITH SUCCESS');
})
.catch(() => {
    console.log('DATABASE CONNECT ATTEMPT FAILED');
});