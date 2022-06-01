import QuestionService from "../../services/QuestionService.js";

const question = new QuestionService();

const generateQuestion = (req, res) => {
  const meetingId = req.params.meetingId;
  question
    .generateQuestion(meetingId)
    .then((questions) => {
      res.json(questions);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const removeQuestion = (req, res) => {
  const meetingId = req.params.meetingId;
  const questionId = req.params.questionId;
  question
    .removeQuestion(meetingId, questionId)
    .then(() => {
      res.json({
        message: "Removing question...",
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export { generateQuestion, removeQuestion };
