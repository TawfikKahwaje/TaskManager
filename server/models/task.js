"use strict";

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    label: DataTypes.STRING,
    description : DataTypes.TEXT,
    startTime : DataTypes.DATE,
    endTime : DataTypes.DATE,
    accualStartTime : DataTypes.DATE,
    accualEndTime : DataTypes.DATE,
    duration : DataTypes.INTEGER,
    status : DataTypes.ENUM('on-hold', 'start', 'done'),
    date : { type: DataTypes.DATE, defaultValue: new Date() }
  }, {
    classMethods: {
      associate: function(models) {
        Task.belongsTo(models.User, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Task;
};