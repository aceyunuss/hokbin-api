'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart_item.init({
    cart_id: DataTypes.INTEGER,
    menu_id: DataTypes.INTEGER,
    menu_name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    qty: DataTypes.INTEGER,
    total: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Cart_item',
  });
  return Cart_item;
};