"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Menu_category.init(
    {
      category_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Menu_category",
      paranoid: true,
      deletedAt: "deletedAt",
      timestamps: true,
    }
  );

  Menu_category.associate = function (models) {
    // associations can be defined here
    Menu_category.hasOne(models.Menu, {
      as : "category",
      foreignKey: "category_id",
      // onDelete: "CASCADE"
    });
  };

  return Menu_category;
};
