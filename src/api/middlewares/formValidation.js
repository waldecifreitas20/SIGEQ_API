const _hasManyExpectedKeys = (keysExpected, object) => {
    let matchs = 0;

    keysExpected.forEach(key => {
        if (object.hasOwnProperty(key)) {
            ++matchs;
        }
    });

    return matchs;
};

const _invalidsParamsMessageError = (validParamsExpected, validParamsreceived) => {
    return `expected to receive ${validParamsExpected} valid params. But, was given ${validParamsreceived}`;
}

module.exports = {

    register: function (req, res, next) {
        const user = req.body;
        let keysExpected = [
            'first_name',
            'surname',
            'email',
            'password',
            'cpf',
        ];

        let matchs = _hasManyExpectedKeys(keysExpected, user);

        if (matchs != keysExpected.length)
            return res.status(400).send({
                status: 400,
                error: _invalidsParamsMessageError(keysExpected.length, matchs)
            });
        return next();
    },

    login: function (req, res, next) {
        const user = req.body;
        const keysExpected = ['email', 'password'];
        const matchs = _hasManyExpectedKeys(keysExpected, user);

        if (matchs != keysExpected.length)
            return res.status(400).send({
                status: 400,
                error: _invalidsParamsMessageError(keysExpected.length, matchs)
            });
        return next();
    },

    equipment: function (req, res, next) {
        const equipment = req.body;
        const keysExpected = [
            "company",
            "category",
            "model",
            "current_location",
            "status",
        ];
        const matchs = _hasManyExpectedKeys(keysExpected, equipment);

        if (matchs != keysExpected.length) {
            return res.status(400).send({
                status: 400,
                error: _invalidsParamsMessageError(keysExpected.length, matchs)
            });
        }
        return next();
    },

    checkParams: function (req, res, next) {
        const equipmentId = req.params.id;
        try {
            const n = Number.parseInt(equipmentId);
            return next();
        } catch (error) {
            return res.status(400).send({ error: 'TypeError: Id is not a number' });
        }
    }
};