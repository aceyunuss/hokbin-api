"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      type: DataTypes.INTEGER,
      address: DataTypes.TEXT,
      bod: DataTypes.DATE,
      deletedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      deletedAt: "deletedAt",
      timestamps: true,
    }
  );

  User.hola = function (models) {
    return 99;
  };

  User.insertData = async (data_ins) => {
    try {
      const stat_ins = await User.create(data_ins);
      const stat_res = stat_ins.toJSON();
      return { msg: "success", data: stat_res };
    } catch (error) {
      return { msg: error };
    }
  };

  User.getData = async (cond = {}) => {
    try {
      const stat_find = await User.findAll({ where: cond });
      return {
        msg: "success",
        count: stat_find.length,
        data: stat_find,
      };
    } catch (error) {
      return { msg: error };
    }
  };

  User.updateData = async (id, data = {}) => {
    try {
      await User.update(data, {
        where: { id: id },
      });
      const data_ret = await getData({ id: id });
      const stat_res = data_ret.data;
      return { msg: "success", data: stat_res };
    } catch (error) {
      return { msg: error };
    }
  };

  User.deleteData = async (id) => {
    try {
      const stat_res = await User.destroy({
        where: { id: id },
      });
      return { msg: "success", data: stat_res };
    } catch (error) {
      return { msg: error };
    }
  };

  return User;
};
