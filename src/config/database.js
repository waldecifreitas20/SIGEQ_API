require('./dotenv');

module.exports = {
    host: process.env.HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: process.env.DB_DIALECT,
    logging: false,
    define: {
        timestamps: false,
        underscored: true
    }
};
