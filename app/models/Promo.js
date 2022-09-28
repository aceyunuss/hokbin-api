"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Promo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Promo.init(
    {
      promo_name: DataTypes.STRING,
      discount: DataTypes.INTEGER,
      min_order: DataTypes.FLOAT,
      max_discount: DataTypes.FLOAT,
      end_date: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Promo",
      paranoid: true,
      deletedAt: "deletedAt",
      timestamps: true,
    }
  );
  return Promo;
};
