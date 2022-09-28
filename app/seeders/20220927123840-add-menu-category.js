"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   category_name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "menu_categories",
      [
        {
          category_name: "Main",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: "Fried",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: "Soup",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: "Dessert",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: "Snack",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: "Beverage",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          category_name: "Side dish",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("menu_categories", null, {});
  },
};
