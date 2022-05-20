import crypto from "crypto";
import db from "../db/models/index.js";

export default class GroupService {
  async createGroup(userId, group) {
    const groupRecord = await db.Group.create({
      name: group.name,
      description: group.description,
      userNumber: 1,
      groupCode: crypto.randomUUID().substring(0, 6).toUpperCase(),
    });
    await db.UserGroup.create({
      userId: userId,
      groupId: groupRecord.id,
    });
    return groupRecord;
  }

  async joinGroup(userId, groupCode) {
    const groupRecord = await db.Group.findOne({
      where: {
        groupCode: groupCode,
      },
    });
    const userGroupRecord = await db.UserGroup.create({
      userId: userId,
      groupId: groupRecord.id,
    });
    groupRecord.increment("userNumber");
    return userGroupRecord;
  }

  async findUsers(groupId) {
    const userGroups = await db.UserGroup.findAll({
      where: { groupId: groupId },
    });
    const users = await Promise.all(
      userGroups.map((userGroup) => {
        return new Promise((resolve) => {
          db.User.findOne({
            where: { id: userGroup.userId },
          }).then((user) => {
            resolve(user);
          });
        });
      })
    );
    return users;
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
}
