'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('status', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(20),
        unique: true,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('status');
  }
};
