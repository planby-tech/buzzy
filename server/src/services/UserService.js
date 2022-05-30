import db from "../db/models/index.js";

export default class UserService {
  async readUser(userId) {
    const userRecord = await db.User.findByPk(userId);
    if (!userRecord) {
      throw new Error("User not found!");
    }
    return userRecord;
  }

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

  async joinGroup(userId, groupCode) {
    const groupRecord = await db.Group.findOne({
      where: {
        groupCode: groupCode,
      },
    });
    const userRecord = await db.User.findByPk(userId);
    await groupRecord.addUser(userRecord, { through: "UserGroups" });
    groupRecord.increment("userNumber");
    return groupRecord;
  }

  async findGroups(userId) {
    const userRecord = await db.User.findByPk(userId);
    const groupRecord = userRecord.getGroups();
    return groupRecord;
  }

  async findMeetings(userId) {
    const userRecord = await db.User.findByPk(userId);
    const meetings = await userRecord.getMeetings();

    if (!meetings) {
      throw new Error("Meeting not found!");
    }
    const meetingRecord = [];
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
