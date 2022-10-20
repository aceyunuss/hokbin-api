"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Menu.init(
    {
      menu_name: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Menu",
      paranoid: true,
      deletedAt: "deletedAt",
      timestamps: true,
    }
  );

  Menu.associate = function (models) {
    // associations can be defined here
    Menu.belongsTo(models.Menu_category, {
      as: "category",
      foreignKey: "category_id",
      // onDelete: "CASCADE",
    });
  };
  return Menu;
};
