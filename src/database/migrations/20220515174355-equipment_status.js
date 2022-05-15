'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('equipment_status', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      equipment_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'equipments',
            scheme: 'public'
          },
          key: 'id'
        }
      },
      status_id : {
        type : Sequelize.INTEGER,
        references : {
          model: {
            tableName : 'status',
            scheme : 'public'
          },
          key : 'id'
        }
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('equipment_status');
  }
};
