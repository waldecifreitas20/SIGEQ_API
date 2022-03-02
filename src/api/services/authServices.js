async function register(userData) {
    if (userData) {
        return { 
            error : 'user is null', 
            status : 401 
        };
    }
}

async function login(userData) {}

async function isValidToken(token) {}



module.exports = {
    register : register,
    login : login,
    isValidToken : isValidToken
}