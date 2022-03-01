const { DATABASE, USER, PASSWORD, HOST, DIALECT } = require('../config/database');

const Sequelize = require('sequelize');
const database = new Sequelize(DATABASE, USER, PASSWORD, {
    HOST, 
    dialect : DIALECT || 'postgres'
});

module.exports = {
    datatype : Sequelize,
    sequelize : database,
};