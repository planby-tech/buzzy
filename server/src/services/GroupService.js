import crypto from "crypto";
import db from "../db/models/index.js";

export default class GroupService {
  async createGroup(userId, group) {
    const Group = db.Group;
    const User = db.User;
    const groupRecord = await Group.create({
      name: group.name,
      description: group.description,
      userNumber: 1,
      groupCode: crypto.randomUUID().substring(0, 6).toUpperCase(),
    });

    const userRecord = await User.findByPk(userId);
    await groupRecord.addUser(userRecord, { through: "UserGroups" });

    return groupRecord;
  }

  async readGroup(groupId) {
    const groupRecord = await db.Group.findByPk(groupId);
    if (!groupRecord) {
      throw new Error("Group not found!");
    }
    return groupRecord;
  }

  async updateGroup(group) {
    const groupRecord = await db.Group.update(
      {
        name: group.name,
        description: group.description,
      },
      { where: { id: group.id } }
    );
    if (!groupRecord) {
      throw new Error("Group not found!");
    }
    return groupRecord;
  }

  async deleteGroup(groupId) {
    const groupRecord = await db.Group.destroy({
      where: {
        id: groupId,
      },
    });
    if (!groupRecord) {
      throw new Error("Group not found!");
    }
    return groupRecord;
  }

  async findUsers(groupId) {
    const groupRecord = await db.Group.findByPk(groupId);
    const userRecord = await groupRecord.getUsers();
    return userRecord;
  }
}
