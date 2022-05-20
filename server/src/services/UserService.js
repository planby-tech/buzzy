import db from "../db/models/index.js";

export default class UserService {
  async updateUser(id, user) {
    const userRecord = await db.User.update(
      { name: user.name },
      { where: { id: id } }
    );
    if (!userRecord) {
      throw new Error("User not found!");
    }
    return { user: userRecord };
  }

  async deleteUser(id) {
    const userRecord = await db.User.destroy({
      where: {
        id: id,
      },
    });
    if (!userRecord) {
      throw new Error("User not found!");
    }
    return { user: userRecord };
  }

  async deleteAllUsers() {
    await db.User.destroy({
      where: {},
      truncate: false,
    });
  }

  async findGroups(id) {
    const userGroups = await db.UserGroup.findAll({
      where: { userId: id },
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
