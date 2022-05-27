import Group from "../db/models/Group.js";
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
    const userRecord = await db.User.findByPk(userId);
    const groupRecord = userRecord.getGroups();
    return groupRecord;
  }
}
