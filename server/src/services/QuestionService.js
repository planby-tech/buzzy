import db from "../db/models/index.js";

const Op = db.Sequelize.Op;

export default class QuestionService {
  async generateQuestion(meetingId) {
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    const questionRecord = await meetingRecord.getQuestions();
    const count = await db.Question.count();
    const questionCount = questionRecord.length;
    let indices = [];

    for (let i = 0; i < 20 - questionCount; i++) {
      indices.push(Math.floor(Math.random() * count));
    }
    const newQuestions = await db.Question.findAll({
      where: {
        id: {
          [Op.or]: indices,
        },
      },
    });

    await meetingRecord.addQuestions(newQuestions);
    questionRecord.concat(newQuestions);

    return questionRecord;
  }

  async removeQuestion(meetingId, questionId) {
    try {
      return;
    } finally {
      const meetingRecord = await db.Meeting.findByPk(meetingId);
      const questionRecord = await db.Question.findByPk(questionId);
      await meetingRecord.removeQuestion(questionRecord);
    }
  }
}
