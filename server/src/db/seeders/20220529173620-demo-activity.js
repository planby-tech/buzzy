"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Activities",
      [
        { category: "식사", createdAt: new Date(), updatedAt: new Date() },
        { category: "영화", createdAt: new Date(), updatedAt: new Date() },
        { category: "쇼핑", createdAt: new Date(), updatedAt: new Date() },
        { category: "여행", createdAt: new Date(), updatedAt: new Date() },
        { category: "독서", createdAt: new Date(), updatedAt: new Date() },
        { category: "미용", createdAt: new Date(), updatedAt: new Date() },
        { category: "드라이브", createdAt: new Date(), updatedAt: new Date() },
        { category: "피크닉", createdAt: new Date(), updatedAt: new Date() },
        { category: "캠핑", createdAt: new Date(), updatedAt: new Date() },
        { category: "게임", createdAt: new Date(), updatedAt: new Date() },
        { category: "전시회", createdAt: new Date(), updatedAt: new Date() },
        { category: "기타", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Activities", null, {});
  },
};
