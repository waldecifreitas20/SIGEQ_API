'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('status', [{
      name: 'Indisponivel',
      description: 'Sem HD',
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('status', null, {});
  }
};
