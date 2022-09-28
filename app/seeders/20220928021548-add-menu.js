"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "menus",
      [
        {
          menu_name: "Beef Teriyaki",
          category_id: "1",
          price: "41000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Chicken Steak",
          category_id: "1",
          price: "35000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Chicken Teriyaki",
          category_id: "1",
          price: "31000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Beef Yakiniku",
          category_id: "1",
          price: "41000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Chicken Yakiniku",
          category_id: "1",
          price: "31000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Beef Teriyaki",
          category_id: "1",
          price: "41000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Chicken Karage",
          category_id: "2",
          price: "28000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Chicken Katsu",
          category_id: "2",
          price: "31000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Ekkado",
          category_id: "2",
          price: "41000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Ebi Furai",
          category_id: "2",
          price: "38000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Shirataki",
          category_id: "3",
          price: "16000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Clear Soup",
          category_id: "3",
          price: "9000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Chiscken Tofu",
          category_id: "3",
          price: "20000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Shrimp Ball",
          category_id: "3",
          price: "23000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Red Velvet Puding",
          category_id: "4",
          price: "18000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Bubble Gum Puding",
          category_id: "4",
          price: "18000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Green Tea Puding",
          category_id: "4",
          price: "18000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Coklat Puding",
          category_id: "4",
          price: "2000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Red Velvet Puding",
          category_id: "4",
          price: "18000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Shumai Steam",
          category_id: "5",
          price: "15000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Shumai Fried",
          category_id: "5",
          price: "15000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Tori Popcorn",
          category_id: "5",
          price: "12000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Aqua",
          category_id: "6",
          price: "9000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Coca Cola",
          category_id: "6",
          price: "11000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Teh Kotak",
          category_id: "6",
          price: "10000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Lemon Tea",
          category_id: "6",
          price: "11000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Milo",
          category_id: "6",
          price: "10000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Rice",
          category_id: "7",
          price: "8500",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Salad",
          category_id: "7",
          price: "15000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          menu_name: "Saus Sambal",
          category_id: "7",
          price: "13000",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      );
      {}
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("menus", null, {});
  },
};
