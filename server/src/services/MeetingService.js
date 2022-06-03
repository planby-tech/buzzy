import db from "../db/models/index.js";

const isEqual = (a, b) => {
  if (a.length !== b.length) return false;
  const uniqueValues = new Set([...a, ...b]);
  for (const v of uniqueValues) {
    const aCount = a.filter((e) => e === v).length;
    const bCount = b.filter((e) => e === v).length;
    if (aCount !== bCount) return false;
  }
  return true;
};

export default class MeetingService {
  async createMeeting(groupId, meetingDTO) {
    const meetingRecord = await db.Meeting.create({
      title: meetingDTO.title,
      start: meetingDTO.start,
      end: meetingDTO.end,
      allDay: meetingDTO.allDay,
    });
    const groupRecord = await db.Group.findByPk(groupId);
    await groupRecord.addMeeting(meetingRecord);

    for await (const place of meetingDTO.places) {
      db.Place.create({
        name: place.name,
        coord: place.coord,
      }).then((place) => {
        meetingRecord.addPlace(place);
      });
    }

    await meetingRecord.addUsers(meetingDTO.users);
    await meetingRecord.addActivities(meetingDTO.activities);

    return meetingRecord;
  }

  async readMeeting(meetingId) {
    const meetingRecord = await db.Meeting.findOne({
      where: {
        id: meetingId,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: db.Post,
        as: "posts",
      },
    });
    if (!meetingRecord) {
      throw new Error("Meeting not found!");
    }
    return meetingRecord;
  }

  async updateMeeting(meetingId, meetingDTO) {
    const meetingRecord = await db.Meeting.update(
      {
        title: meetingDTO.title,
        start: meetingDTO.start,
        end: meetingDTO.end,
        allDay: meetingDTO.allDay,
      },
      { where: { id: meetingId } }
    );

    if (!meetingRecord) {
      throw new Error("Meeting not found!");
    }

    const placeRecord = await meetingRecord.getPlaces();
    if (!isEqual(placeRecord, meetingDTO.places)) {
      for await (const place of placeRecord) {
        db.Place.destroy({
          where: {
            id: place.id,
          },
        });
      }

      for await (const place of meetingDTO.places) {
        db.Place.create({
          name: place.name,
          coord: place.coord,
        }).then((place) => {
          meetingRecord.addPlace(place);
        });
      }
    }

    const users = await meetingRecord.getUsers();
    const userRecord = [];
    for (let i = 0; i < users.length; i++) {
      userRecord.push(users[i].id);
    }
    if (!isEqual(userRecord, meetingDTO.users)) {
      await meetingRecord.removeUsers(userRecord);
      await meetingRecord.addUsers(meetingDTO.users);
    }

    const activities = await meetingRecord.getActivities();
    const activityRecord = [];
    for (let i = 0; i < activities.length; i++) {
      activityRecord.push(activities[i].id);
    }
    if (!isEqual(activityRecord, meetingDTO.activities)) {
      await meetingRecord.removeActivities(activityRecord);
      await meetingRecord.addActivities(meetingDTO.activities);
    }

    return meetingRecord;
  }

  async deleteMeeting(meetingId) {
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    if (!meetingRecord) {
      throw new Error("Meeting not found!");
    }
    const placeRecord = await meetingRecord.getPlaces();
    for await (const place of placeRecord) {
      db.Place.destroy({
        where: {
          id: place.id,
        },
      });
    }
    await db.Meeting.destroy({
      where: {
        id: meetingId,
      },
    });
    return;
  }

  async findPlaces(meetingId) {
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    if (!meetingRecord) {
      throw new Error("Meeting not found!");
    }
    const placeRecord = await meetingRecord.getPlaces();
    return placeRecord;
  }

  async findUsers(meetingId) {
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    if (!meetingRecord) {
      throw new Error("Meeting not found!");
    }
    const userRecord = await meetingRecord.getUsers();
    return userRecord;
  }

  async findActivities(meetingId) {
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    if (!meetingRecord) {
      throw new Error("Meeting not found!");
    }
    const activityRecord = await meetingRecord.getActivities();
    return activityRecord;
  }

  async findPosts(meetingId) {
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    if (!meetingRecord) {
      throw new Error("Meeting not found!");
    }
    const posts = await meetingRecord.getPosts();
    const postRecord = [];

    for await (const post of posts) {
      const questionRecord = [];
      const answerRecord = await post.getAnswers();
      const imageRecord = await post.getImages();

      for await (const answer of answerRecord) {
        const question = await db.Question.findByPk(answer.questionId);
        questionRecord.push(question);
      }

      postRecord.push({
        user: post.userId,
        questions: questionRecord,
        answers: answerRecord,
        images: imageRecord,
      });
    }

    return postRecord;
  }

  async findComments(meetingId) {
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    if (!meetingRecord) {
      throw new Error("Meeting not found!");
    }
    const commentRecord = await meetingRecord.getComments();
    return commentRecord;
  }
}
