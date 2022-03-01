const { sequelize } = require('./sequelize');

module.exports = sequelize.authenticate()
.then(() => {
    console.log('DATABASE CONNECTED WITH SUCCESS');
})
.catch(() => {
    console.log('DATABASE CONNECT ATTEMPT FAILED');
});