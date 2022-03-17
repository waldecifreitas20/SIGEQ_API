const faker = require('faker-br');

const PROGEP_SECTORS = [
    'CSA', 
    'ATI', 
    'CAP', 
    'CRMP', 
    'CATEC', 
    'CRCAP',
    'GESTAO',
    'SECRETARIA', 
];


const setPermission = (name) => {
    return {
        name,
        description : '---'
    };
}

module.exports = {
    generateUser : () => {
        return {
            full_name : faker.name.findName(),
            email : faker.internet.email(),
            password : faker.internet.password(),
            cpf : faker.br.cpf()
        };
    },

    generateEquipment : () => {
        return {
            company : faker.company.companyName(),
            category : faker.commerce.product(),
            model : faker.commerce.product(),
            heritage : faker.br.cpf(),
            current_location : PROGEP_SECTORS[0],
            status : 'it is avaiable',
            warrantyExpireAt : Date.now(),
            image : faker.random.image()
        }
    },

    generatePermissions : (read=true, create=true, update=true, remove=true) => {
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
            permissions.push(setPermission('remove'));
        }

        return permissions;
    }
}