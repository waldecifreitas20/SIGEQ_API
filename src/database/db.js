const config = require('../config/database');

const Sequelize = require('sequelize');
const database = new Sequelize(
    config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect || 'postgres',
    logging: false,
    define: {
        timestamps: false,
        underscored: true,
    }
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

const syncDatabase = async () => {
    await database.sync();
}

module.exports = {
    datatype: Sequelize,
    database: database,

    initDatabase: async function () {
        initModels();
        await syncDatabase();
    }
};