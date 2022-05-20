import db from "../db/models/index.js";

export default class UserService {
  async updateUser(userId, user) {
    const userRecord = await db.User.update(
      { name: user.name },
      { where: { id: userId } }
    );
    if (!userRecord) {
      throw new Error("User not found!");
    }
    return userRecord;
  }

  async deleteUser(userId) {
    const userRecord = await db.User.destroy({
      where: {
        id: userId,
      },
    });
    if (!userRecord) {
      throw new Error("User not found!");
    }
    return userRecord;
  }

  async deleteAllUsers() {
    await db.User.destroy({
      where: {},
      truncate: false,
    });
  }

  async findGroups(userId) {
    const userGroups = await db.UserGroup.findAll({
      where: { userId: userId },
    });
    const groups = await Promise.all(
      userGroups.map((userGroup) => {
        return new Promise((resolve) => {
          db.Group.findOne({
            where: { id: userGroup.groupId },
          }).then((group) => {
            resolve(group);
          });
        });
      })
    );
    return groups;
  }
}
