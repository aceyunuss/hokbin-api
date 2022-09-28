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
      "promos",
      [
        {
          promo_name: "Grand Opening",
          discount: "50",
          end_date: "2022-09-30 09:13:55",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          promo_name: "Member",
          discount: "15",
          end_date: "2022-12-30 09:13:55",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          promo_name: "Octoberfest",
          discount: "25",
          end_date: "2022-10-31 09:13:55",
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
    await queryInterface.bulkDelete("promos", null, {});
  },
};
