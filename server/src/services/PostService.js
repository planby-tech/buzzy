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
    const groupRecord = await db.Group.findByPk(groupId);
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    const userRecord = await db.User.findByPk(userId);
    const postRecord = await db.Post.create({
      title: meetingRecord.name,
    });
    await groupRecord.addPost(postRecord);
    await meetingRecord.addPost(postRecord);

    for await (const questionAnswer of post.questionAnswers) {
      db.Question.findByPk(questionAnswer.question).then((question) => {
        postRecord.addQuestion(question, { through: "PostQuestions" });
        db.Answer.create({
          content: questionAnswer.answer,
        }).then((answer) => {
          postRecord.addAnswer(answer);
          userRecord.addAnswer(answer);
          question.addAnswer(answer);
        });
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

  async updatePost(postId, post) {
    const postRecord = await db.Post.findByPk(postId);
    const meetingRecord = await db.Meeting.update(
      { name: post.title },
      { where: { id: postRecord.meetingId } }
    );

    if (!postRecord) {
      throw new Error("Post not found!");
    }

    const imageRecord = await meetingRecord.getImages();
    if (!isEqual(imageRecord, post.images)) {
      for await (const image of imageRecord) {
        db.Image.destroy({
          where: {
            url: image,
          },
        });
      }
      for await (const image of post.images) {
        db.Image.create({
          url: image,
        }).then((image) => {
          postRecord.addImage(image);
        });
      }
    }

    const answers = await post.getAnswers();
    const answerIds = [];
    const answerRecord = [];
    for (let i = 0; i < answers.length; i++) {
      answerIds.push(answers[i].id);
      answerRecord.push(answers[i].content);
    }
    const updatedAnswerRecord = [];
    for (let i = 0; i < post.questionAnswers.length; i++) {
      updatedAnswerRecord.push(post.questionAnswers.answer);
    }

    if (!isEqual(answerRecord, updatedAnswerRecord)) {
      let index = 0;
      for await (const answer of updatedAnswerRecord) {
        db.Answer.update(
          { content: answer },
          { where: { id: answerIds[index] } }
        ).then(() => {
          index++;
        });
      }
    }

    return postRecord;
  }

  async deletePost(postId) {}
}
