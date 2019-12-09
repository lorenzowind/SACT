'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Projects',
      'available',
      
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Projects',
      'available',
      Sequelize.BOOLEAN
    );
  }
};
