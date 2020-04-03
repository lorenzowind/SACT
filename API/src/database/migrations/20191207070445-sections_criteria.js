'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SectionCriteria', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      SectionId: {
        type: Sequelize.INTEGER,
        references: { model: 'Sections', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false
      },
      CriterionId: {
        type: Sequelize.INTEGER,
        references: { model: 'Criteria', key: 'id' },
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
    return queryInterface.dropTable('SectionCriteria');
  }
};