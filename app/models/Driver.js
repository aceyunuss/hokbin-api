"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Driver.init(
    {
      driver_name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      address: DataTypes.TEXT,
      bod: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
      license_number: DataTypes.STRING,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Driver",
      paranoid: true,
      deletedAt: "deletedAt",
      timestamps: true,
    }
  );

  Driver.associate = function (models) {
    Driver.hasOne(models.Order, {
      as: "order",
      foreignKey: "driver_id",
    });
  };

  return Driver;
};
