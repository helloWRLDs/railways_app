'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", 
      [
        {
          id: 0,
          first_name: "Danil",
          last_name: "Li",
          email: "danil.li24x@gmail.com",
          chat_id: 819151572,
          username: "lIlllIIIlIIIlIIIl",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
