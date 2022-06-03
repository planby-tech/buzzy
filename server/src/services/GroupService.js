import crypto from "crypto";
import db from "../db/models/index.js";

export default class GroupService {
  async createGroup(userId, groupDTO) {
    const groupRecord = await db.Group.create({
      name: groupDTO.name,
      description: groupDTO.description,
      userNumber: 1,
      groupCode: crypto.randomUUID().substring(0, 6).toUpperCase(),
    });
    await groupRecord.addUser(userId);

    return groupRecord;
  }

  async readGroup(groupId) {
    const groupRecord = await db.Group.findByPk(groupId);
    if (!groupRecord) {
      throw new Error("Group not found!");
    }
    return groupRecord;
  }

  async updateGroup(groupId, groupDTO) {
    const groupRecord = await db.Group.update(
      {
        name: groupDTO.name,
        description: groupDTO.description,
      },
      { where: { id: groupId } }
    );
    if (!groupRecord) {
      throw new Error("Group not found!");
    }
    return groupRecord;
  }

  async deleteGroup(groupId) {
    await db.Group.destroy({
      where: {
        id: groupId,
      },
    });
    return;
  }

  async findUsers(groupId) {
    const groupRecord = await db.Group.findByPk(groupId);
    const userRecord = await groupRecord.getUsers();
    return userRecord;
  }

  async findMeetings(groupId) {
    const groupRecord = await db.Group.findByPk(groupId);
    const meetings = await groupRecord.getMeetings();
    const meetingRecord = [];
    if (!meetings) {
      throw new Error("Meeting not found!");
    }
    for (const meeting of meetings) {
      await db.Meeting.findOne({
        where: {
          id: meeting.id,
        },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: db.User,
          as: "users",
          attributes: ["name"],
        },
      }).then((meeting) => {
        meetingRecord.push(meeting);
      });
    }
    return meetingRecord;
  }
}
