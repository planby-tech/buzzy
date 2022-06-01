import db from "../db/models/index.js";

const Op = db.Sequelize.Op;

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

export default class PostService {
  async createPost(groupId, meetingId, userId, post) {
    const postRecord = await db.Post.create({
      title: post.title,
    });
    const groupRecord = await db.Group.findByPk(groupId);
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    const userRecord = await db.User.findByPk(userId);
    await groupRecord.addPost(postRecord);
    await meetingRecord.addPost(postRecord);

    for await (const question of post.questions) {
      db.Question.findByPk(question.id).then((question) => {
        postRecord.addQuestion(question, { through: "PostQuestions" });
      });
    }

    for await (const answer of post.answers) {
      db.Answer.create({
        content: answer.content,
      }).then((answer) => {
        postRecord.addAnswer(answer);
        userRecord.addAnswer(answer);
      });
    }

    for await (const image of post.images) {
      db.Image.create({
        url: image.url,
      }).then((image) => {
        postRecord.addImage(image);
      });
    }

    return postRecord;
  }

  async readPost(postId) {}

  async updatePost(postId, post) {}

  async deletePost(postId) {}
}
