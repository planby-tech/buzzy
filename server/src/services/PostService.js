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

export default class PostService {
  async createPost(meetingId, userId, postDTO) {
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    const userRecord = await db.User.findByPk(userId);
    const postRecord = await db.Post.create({
      title: meetingRecord.title,
    });
    await meetingRecord.addPost(postRecord);
    await userRecord.addPost(postRecord);

    for await (const questionAnswer of postDTO.questionAnswers) {
      await db.Question.findByPk(questionAnswer.question).then((question) => {
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

    for await (const image of postDTO.images) {
      await db.Image.create({
        url: image,
      }).then((image) => {
        postRecord.addImage(image);
        userRecord.addImage(image);
      });
    }

    return postRecord;
  }

  async readPost(postId) {
    const post = await db.Post.findByPk(postId);
    if (!post) {
      throw new Error("Post not found!");
    }
    const answers = await post.getAnswers();
    const images = await post.getImages();

    const postRecord = { questionAnswers: [], images: images };
    for await (const answer of answers) {
      const question = await db.Question.findByPk(answer.questionId);
      postRecord.questionAnswers.push({ question: question, answer: answer });
    }

    return postRecord;
  }

  async updatePost(postId, postDTO) {
    const postRecord = await db.Post.update(
      { title: postDTO.title },
      { where: { id: postId } }
    );
    if (!postRecord) {
      throw new Error("Post not found!");
    }

    await db.Meeting.update(
      { title: postDTO.title },
      { where: { id: postRecord.meetingId } }
    );

    const userRecord = await db.User.findByPk(postRecord.userId);
    const images = await postRecord.getImages();
    const imageRecord = [];
    for (let i = 0; i < images.length; i++) {
      imageRecord.push(images[i].url);
    }
    if (!isEqual(imageRecord, postDTO.images)) {
      for await (const image of images) {
        await db.Image.destroy({
          where: {
            id: image.id,
          },
        });
      }
      for await (const image of postDTO.images) {
        db.Image.create({
          url: image,
        }).then((image) => {
          postRecord.addImage(image);
          userRecord.addImage(image);
        });
      }
    }

    const answers = await postRecord.getAnswers();
    const answerIds = [];
    const answerRecord = [];
    for (let i = 0; i < answers.length; i++) {
      answerIds.push(answers[i].id);
      answerRecord.push(answers[i].content);
    }
    const updatedAnswerRecord = [];
    for (let i = 0; i < postDTO.answers.length; i++) {
      updatedAnswerRecord.push(postDTO.answers[i]);
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

  async deletePost(postId) {
    const postRecord = await db.Post.findByPk(postId);
    const answerRecord = await postRecord.getAnswers();
    const imageRecord = await postRecord.getImages();

    for await (const answer of answerRecord) {
      await db.Answer.destroy({
        where: {
          id: answer.id,
        },
      });
    }

    for await (const image of imageRecord) {
      await db.Image.destroy({
        where: {
          id: image.id,
        },
      });
    }

    await db.Post.destroy({
      where: {
        id: postId,
      },
    });

    return;
  }
}
