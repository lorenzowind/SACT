'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    occupationArea: DataTypes.STRING,
    evaluatedPrjs: DataTypes.STRING,
    institution: DataTypes.STRING,
    status: DataTypes.STRING
  }, {});

  User.associate = function (models) {
    User.belongsToMany(models.Project, {
      through: 'user_projects',
      as: 'projects',
      foreignKey: 'userId'
    })
  };
  return User;
};