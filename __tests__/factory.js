const faker = require('faker-br');
const services = require('../src/api/services/equipmentServices');

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
    generateUser: function () {
        return {
            firstName: faker.name.firstName(),
            surname: faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            cpf: faker.br.cpf(),
        };
    },

    generateEquipment: function () {
        return {
            title: "Computador HP",
            manufacturerId: _getRandomInt(1).toString(),
            categoryId: _getRandomInt(1).toString(),
            model: "15-cdf",
            heritage: _getRandomInt(9999999999).toString(),
            locationId: _getRandomInt(1).toString(),
            statusId: _getRandomInt(1).toString(),
            warrantyExpiresAt: Date.now(),
            image: "454-6-564-654"
        }
    },

    generatePermissions: function ({ read = true, create = true, update = true, remove = true }) {
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
    },

    generateEquipmentId: async function () {
        const equipment = this.generateEquipment();
        const response = await services.createEquipment(equipment);

        return response.equipment_id;
    },

    generateUserId: async function () {
        const { body: response } = await request.post({
            route: authe.register,
            headers: { authorization: validToken },
            body: this.generateUser()
        });

        return response;
    },
}