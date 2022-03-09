const jwt = require('jsonwebtoken');
require('../config/dotenv');

function genetateToken(userData) {
    return jwt.sign(userData, process.env.API_SECRET, {
        expiresIn : 3600
    });
}

function checkToken(token) {
    return jwt.verify(token, process.env.API_SECRET);
}

module.exports = {
    genetateToken : genetateToken,
    checkToken : checkToken,
}