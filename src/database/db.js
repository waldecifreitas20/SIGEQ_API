const { DATABASE, USER, PASSWORD, HOST, DIALECT } = require('../config/database');

const Sequelize = require('sequelize');
const database = new Sequelize(DATABASE, USER, PASSWORD, {
    HOST, 
    dialect : DIALECT || 'postgres'
});


module.exports = {
    datatype : Sequelize,
    database : database,
    initModels : () => {
        const allModels = require('../api/models');
        
        allModels.forEach(file => {
            require('../api/models/'+file);
        });
    },
    syncDatabase : async () => {
        await database.sync({ force : true });
    }
};