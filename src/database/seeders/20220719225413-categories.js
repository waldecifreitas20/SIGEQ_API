'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [{
      name: 'Computadores',
    }], {});

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('People', null, {});
  }
};
