const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('../config/dotenv');

function generateToken(userData) {
    return jwt.sign(userData, process.env.API_SECRET, {
        expiresIn : 3600
    });
}

function checkToken(token) {
    return jwt.verify(token, process.env.API_SECRET);
}

function checkPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}

module.exports = {
    generateToken : generateToken,
    checkToken : checkToken,
    checkPassword : checkPassword
}