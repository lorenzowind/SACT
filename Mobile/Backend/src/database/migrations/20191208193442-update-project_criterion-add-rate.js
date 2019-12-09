'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'ProjectCriteria',
      'rate',
      Sequelize.DOUBLE
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'ProjectCriteria',
      'rate',
    );
  }
};
