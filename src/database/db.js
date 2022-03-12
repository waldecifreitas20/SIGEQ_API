const { DATABASE, USER, PASSWORD, HOST, DIALECT } = require('../config/database');

const Sequelize = require('sequelize');
const database = new Sequelize(DATABASE, USER, PASSWORD, {
    HOST, 
    dialect : DIALECT || 'postgres',
    logging : false
});

const initModels = () => { 
    const { models } = require('../utils/paths');
    const modelFolders = ['user', 'equipment'];

    modelFolders.forEach(folder => {
        require(models.index)(folder)
        .forEach(file => {
            require(`${models.index}/${folder}/${file}`);
        })
    });
}

const syncDatabase = async (clearDatabase={force : false}) => {
    await database.sync(clearDatabase);
}

module.exports = {
    datatype : Sequelize,
    database : database,
    initDatabase : async () => {
        initModels();
        await syncDatabase();
    },
    initDatabaseInTestMode : async () => {
        initModels();
        await syncDatabase({force : true});
        await syncDatabase();
    }
};