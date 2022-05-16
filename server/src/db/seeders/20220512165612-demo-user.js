"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "heonsub6558@gmail.com",
          password:
            "$2a$08$rvjsysvidIGNK5zHM44y7us3bHqBL2N4L22eA4DPXEBdEWw4beK0e",
          name: "Hyeonseop Noh",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          email: "daehan1028@gmail.com",
          password:
            "$2a$08$1dcN8c9D2vBsHgagtNQ99O77UdKgRgYWR9pHRAGhpV4dkjV8gFYlC",
          name: "Daehan Lee",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
