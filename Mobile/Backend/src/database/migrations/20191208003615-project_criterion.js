'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ProjectCriteria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      CriterionId: {
        type: Sequelize.INTEGER,
        references: { model: 'Criteria', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      ProjectId: {
        type: Sequelize.INTEGER,
        references: { model: 'Projects', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ProjectCriteria');
  }
};