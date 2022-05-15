'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('equipment_progep_sectors', {
      id : {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },

      equipment_id : {
        type : Sequelize.INTEGER,
        references : {
          model : {
            tableName : 'equipments',
            scheme: 'public'
          }, 
          key : 'id'
        }
      },

      progep_sector_id : {
        type : Sequelize.INTEGER,
        references : {
            model : {
              tableName : 'progep_sectors',
              scheme : 'public'
            },
            key : 'id'
        }
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('equipment_progep_sectors');
  }
};
