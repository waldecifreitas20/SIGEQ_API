const { database, username, password, host, dialect } = require('../config/database');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    database, username, password,
    {
        host: host,
        dialect: dialect,
        logging: false,
        define: {
            timestamps: false,
            underscored: false,
            underscoredAll: false,
            freezeTableName: true
        }
    },
);

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
    await sequelize.sync({ force: true })
}

module.exports = {
    datatype: Sequelize,
    database: sequelize,

    initDatabase: async function () {
        initModels();
        await syncDatabase();
    }
};