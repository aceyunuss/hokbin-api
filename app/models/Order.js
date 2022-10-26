"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init(
    {
      order_code: DataTypes.STRING,
      order_date: DataTypes.DATE,
      customer_id: DataTypes.INTEGER,
      driver_id: DataTypes.INTEGER,
      discount_id: DataTypes.INTEGER,
      total: DataTypes.FLOAT,
      total_discount: DataTypes.FLOAT,
      status: DataTypes.INTEGER,
      completed_date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );

  Order.associate = function (models) {
    Order.belongsTo(models.Driver, {
      as: "driver",
      foreignKey: "driver_id",
    });
    Order.belongsTo(models.User, {
      as: "customer",
      foreignKey: "customer_id",
    });
  };
  return Order;
};
