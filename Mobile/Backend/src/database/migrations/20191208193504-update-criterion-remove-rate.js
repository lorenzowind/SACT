'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Criteria',
      'rate',
      
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Criteria',
      'rate',
      Sequelize.DOUBLE
    );
  }
};
