"use strict";
const { Model } = require("sequelize");
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
  Cart_item.init(
    {
      menu_id: DataTypes.INTEGER,
      menu_name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      qty: DataTypes.INTEGER,
      total: DataTypes.FLOAT,
      customer_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart_item",
    }
  );

  Cart_item.insertData = async (data_ins) => {
    try {
      const stat_ins = await Cart_item.create(data_ins);
      const stat_res = stat_ins.toJSON();
      return { msg: "success", data: stat_res };
    } catch (error) {
      return { msg: error };
    }
  };

  Cart_item.getData = async (cond = {}) => {
    try {
      const stat_find = await Cart_item.findAll({ where: cond });
      return {
        msg: "success",
        count: stat_find.length,
        data: stat_find,
      };
    } catch (error) {
      return { msg: error };
    }
  };

  Cart_item.updateData = async (id, data = {}) => {
    try {
      await Cart.update(data, {
        where: { id: id },
      });
      const data_ret = await Cart_item.getData({ id: id });
      const stat_res = data_ret.data;
      return { msg: "success", data: stat_res };
    } catch (error) {
      return { msg: error };
    }
  };

  Cart_item.deleteData = async (id) => {
    try {
      const stat_res = await Cart_item.destroy({
        where: { id: id },
      });
      return { msg: "success", data: stat_res };
    } catch (error) {
      return { msg: error };
    }
  };

  return Cart_item;
};
