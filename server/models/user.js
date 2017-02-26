"use strict";
var bcrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    userid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING
    },
    {
      hooks: {
        beforeCreate: function(createdUser, options, cb) {
          // hash the password
          var hash = bcrypt.hashSync(createdUser.password, bcrypt.genSaltSync(8), null);
          // store the hash as the user's password
          createdUser.password = hash;
          // continue to save the user, with no errors
          cb(null, createdUser);
        }
      },
    
    classMethods: {
      associate: function(models) {
        User.hasMany(models.Task)
      }
    },
    instanceMethods: {
      generateHash: function(password) {
          this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      },
      validPassword: function(password) {
          return bcrypt.compareSync(password, this.password);
      }
    }
  });



  return User;
};