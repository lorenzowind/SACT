'use strict';
module.exports = (sequelize, DataTypes) => {
    const ProjectCriteria = sequelize.define('ProjectCriteria', {
        rate: DataTypes.DOUBLE,
        UserId: DataTypes.INTEGER,
        CriterionId: DataTypes.INTEGER,
        ProjectId: DataTypes.INTEGER
    }, {
        freezeTableName: true
    });

    ProjectCriteria.associate = function (models) {

    };
    return ProjectCriteria;
};