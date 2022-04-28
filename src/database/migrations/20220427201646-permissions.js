'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('permissions', {
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false
      }

    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('permissions');
  }
};
