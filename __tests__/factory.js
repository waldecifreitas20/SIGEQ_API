const faker = require('faker-br');

const _getRandomInt = (number) => {
    return Math.floor(Math.random() * number) + 1;
}

const setPermission = (name) => {
    return {
        name,
        description: '---'
    };
}

module.exports = {
    generateUser: () => {
        return {
            firstName: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            cpf: faker.br.cpf(),
        };
    },

    generateEquipment: () => {
        return {
            title: "Computador HP",
            manufacturerId: _getRandomInt(1).toString(),
            categoryId: _getRandomInt(1).toString(),
            model: "15-cdf",
            heritage : _getRandomInt(9999999999).toString(),
            locationId: _getRandomInt(1).toString(),
            statusId: _getRandomInt(1).toString(),
            warrantyExpiresAt: Date.now(),
            image: "454-6-564-654"
        }
    },

    generatePermissions: ({ read = true, create = true, update = true, remove = true }) => {
        let permissions = [];
        if (read) {
            permissions.push(setPermission('read'));
        }
        if (create) {
            permissions.push(setPermission('create'));
        }
        if (update) {
            permissions.push(setPermission('update'));
        }
        if (remove) {
            permissions.push(setPermission('delete'));
        }

        return permissions;
    }
}