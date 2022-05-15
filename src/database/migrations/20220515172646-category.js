'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable('categories', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable('categories');
  }
};
