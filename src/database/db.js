const { DATABASE, USER, PASSWORD, HOST, DIALECT } = require('../config/database');

const Sequelize = require('sequelize');
const database = new Sequelize(DATABASE, USER, PASSWORD, {
    HOST, 
    dialect : DIALECT || 'postgres',
    logging : false
});


module.exports = {
    datatype : Sequelize,
    database : database,
    initModels : () => {
        const { resolve : getPath } = require('path')
        const { models } = require(getPath('src', 'utils', 'paths'));
        
        const userModels = require(models.index)('user');
        const equimentModels = require(models.index)('equipment');
        
        userModels.forEach(file => {
            require(`${models.user}/${file}`);
        });
        equimentModels.forEach(file => {
            require(`${models.equipment}/${file}`);
        });
    },  
    syncDatabase : async () => {
        await database.sync();
    }
};