import db from "../db/models/index.js";

export default class MeetingService {
  async createMeeting(groupId, meeting) {
    const meetingRecord = await db.Meeting.create({
      name: meeting.name,
      start: meeting.start,
      end: meeting.end,
      allDay: meeting.allDay,
    });
    const groupRecord = await db.Group.findByPk(groupId);
    await groupRecord.addMeeting(meetingRecord);

    for await (const place of meeting.places) {
      db.Place.create({
        name: place.name,
        coord: place.coord,
      }).then((place) => {
        meetingRecord.addPlace(place);
      });
    }

    for await (const user of meeting.users) {
      db.User.findByPk(user).then((user) => {
        meetingRecord.addUser(user);
      });
    }

    for await (const activity of meeting.activities) {
      db.Activity.findOne({
        where: {
          category: activity,
        },
      }).then((activity) => {
        meetingRecord.addActivity(activity, { through: "MeetingActivities" });
      });
    }

    return meetingRecord;
  }

  async readMeeting(meetingId) {
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    if (!meetingRecord) {
      throw new Error("Meeting not found!");
    }
    return meetingRecord;
  }

  async updateMeeting(meeting) {
    const meetingRecord = await db.Meeting.update(
      {
        name: meeting.name,
        start: meeting.start,
        end: meeting.end,
        allDay: meeting.allDay,
      },
      { where: { id: meeting.id } }
    );

    const placeRecord = meetingRecord.getPlaces();

    for await (const place of placeRecord) {
      db.Place.destroy({
        where: {
          id: place.id,
        },
      });
    }

    for await (const place of meeting.places) {
      db.Place.create({
        name: place.name,
        coord: place.coord,
      }).then((place) => {
        meetingRecord.addPlace(place);
      });
    }

    

    if (!meetingRecord) {
      throw new Error("Meeting not found!");
    }
  }

  async deleteMeeting(meetingId) {
    const meetingRecord = await db.Meeting.destroy({
      where: {
        id: meetingId,
      },
    });
    if (!meetingRecord) {
      throw new Error("Meeting not found!");
    }
    return meetingRecord;
  }

  async findUsers(meetingId) {
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    if (!meetingRecord) {
      throw new Error("Meeting not found!");
    }
    const userRecord = await meetingRecord.getUsers();
    return userRecord;
  }
}
