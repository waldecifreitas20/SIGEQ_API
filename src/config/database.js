require('./dotenv');

module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    
    seederStorage: "sequelize",
    seederStorageTableName: "__SeederHistory__",
    migrationStorage: "sequelize",
    migrationStorageTableName: "__MigrationsHistory__",
};
