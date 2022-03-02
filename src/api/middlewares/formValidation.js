module.exports = (req, res, next) => {
    const user = req.body;
    let paramsReceived = 4;

    if (!user.fullName) {
        --paramsReceived;
    }
    if (!user.email) {
        --paramsReceived;
    }
    if (!user.password) {
        --paramsReceived;
    }
    if (!user.cpf) {
        --paramsReceived;
    }

    if (paramsReceived < 4) {
        return res.status(400).send({ 
            error : true,
            msg : 'expected to receive 4 params. But, was gived '+ paramsReceived
        }); 
    }

    next();
}