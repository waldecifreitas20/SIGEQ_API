const faker = require('faker-br');

const generateUser = () => {
    return {
        full_name : faker.name.findName(),
        email : faker.internet.email(),
        password : faker.internet.password(),
        cpf : faker.br.cpf()
    };
}

module.exports = {
    generateUser : generateUser
}