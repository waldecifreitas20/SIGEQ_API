const { database } = require('./db');

module.exports = async function () {
    return await database.authenticate()
        .then(() => {
            console.log('DATABASE CONNECTED WITH SUCCESS');
            return 0;
        })
        .catch(() => {
            console.log('DATABASE CONNECT ATTEMPT FAILED');
            return -1;
        });
}
