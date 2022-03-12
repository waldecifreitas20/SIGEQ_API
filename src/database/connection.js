const { database } = require('./db');

module.exports = async () => await database.authenticate()
.then(() => {
    console.log('DATABASE CONNECTED WITH SUCCESS');
})
.catch(() => {
    console.log('DATABASE CONNECT ATTEMPT FAILED');
});