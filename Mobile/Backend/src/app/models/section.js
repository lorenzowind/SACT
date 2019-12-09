'use strict';
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    name: DataTypes.STRING
  }, {});
  Section.associate = function (models) {
    Section.belongsToMany(models.Criterion, {
      through: 'SectionCriteria',
      as: 'criteria',
      foreignKey: 'SectionId'
    });

    Section.belongsToMany(models.Project, {
      through: 'ProjectSections',
      as: 'projects',
      foreignKey: 'SectionId'
    })
  };
  return Section;
};