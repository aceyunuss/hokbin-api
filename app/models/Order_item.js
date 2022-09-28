"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order_item.init(
    {
      order_id: DataTypes.INTEGER,
      menu_id: DataTypes.INTEGER,
      menu_name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      qty: DataTypes.INTEGER,
      total: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Order_item",
    }
  );
  return Order_item;
};
