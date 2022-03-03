const { DATABASE, USER, PASSWORD, HOST, DIALECT } = require('../config/database');

const Sequelize = require('sequelize');
const database = new Sequelize(DATABASE, USER, PASSWORD, {
    HOST, 
    dialect : DIALECT || 'postgres'
});


module.exports = {
    datatype : Sequelize,
    database : database,
    syncAllModels : async () => {
       require('../api/models').forEach(file => {
           require('../api/models/'+file);
       });

        await database.sync({ force : true });
    }
};