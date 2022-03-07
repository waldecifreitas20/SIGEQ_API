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
        const { models } = require('../utils/paths');
        const modelFolders = ['user', 'equipment'];

        modelFolders.forEach(folder => {
            require(models.index)(folder)
            .forEach(file => {
                require(`${models.index}/${folder}/${file}`);
            })
        });
    },  
    syncDatabase : async () => {
        await database.sync({ force : true});
    }
};