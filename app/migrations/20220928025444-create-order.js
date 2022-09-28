"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      order_code: {
        type: Sequelize.STRING,
      },
      order_date: {
        type: Sequelize.DATE,
      },
      customer_id: {
        type: Sequelize.INTEGER,
      },
      driver_id: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.INTEGER,
      },
      discount_id: {
        type: Sequelize.INTEGER,
      },
      total: {
        type: Sequelize.FLOAT,
      },
      total_discount: {
        type: Sequelize.FLOAT,
      },
      completed_date: {
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Orders");
  },
};
