"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Promos", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      promo_name: {
        type: Sequelize.STRING,
      },
      discount: {
        type: Sequelize.INTEGER,
      },
      min_order: {
        type: Sequelize.FLOAT,
      },
      max_discount: {
        type: Sequelize.FLOAT,
      },
      end_date: {
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
    await queryInterface.dropTable("Promos");
  },
};
