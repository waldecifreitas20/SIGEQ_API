'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipments', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      model: {
        type: Sequelize.STRING,
        allowNull: false
      },
      heritage: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true
      },
      warranty_expires_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      image: {
        type: Sequelize.BLOB,
        allowNull: true
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('equipments');
  }
};