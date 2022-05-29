import db from "../db/models/index.js";

export default class MeetingService {
  async createMeeting(groupId, meeting) {
    const meetingRecord = db.Meeting.create({
      name: meeting.name,
      start: meeting.start,
      end: meeting.end,
      allDay: meeting.allDay,
    }).then(async (meeting) => {
      const groupRecord = await db.Group.findByPk(groupId);
      await groupRecord.addMeeting(meeting);
    });

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

  async readMeeting(groupId, meetingId) {}

  async updateMeeting(groupId, meetingId, meeting) {}

  async deleteMeeting(groupId, meetingId) {}
}
