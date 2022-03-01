require('./dotenv');

module.exports = {
    HOST : process.env.HOST,
    DATABASE : process.env.DB_NAME,
    USER :  process.env.DB_USER,
    PASSWORD : process.env.DB_PASS,
    DIALECT : process.env.DB_DIALECT
};
