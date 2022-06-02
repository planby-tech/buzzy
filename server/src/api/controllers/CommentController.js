import CommentService from "../../services/CommentService.js";

const comment = new CommentService();

const createComment = (req, res) => {
  const meetingId = req.params.meetingId;
  const userId = req.params.userId;
  const commentDTO = req.body;
  comment
    .createComment(meetingId, userId, commentDTO)
    .then((comment) => {
      res.json({
        message: "Comment was created successfully!!",
        comment: comment,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const readComment = (req, res) => {
  const commentId = req.params.commentId;
  comment
    .readComment(commentId)
    .then((comment) => {
      res.json({
        message: "Comment information",
        comment: comment,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updateComment = (req, res) => {
  const commentId = req.params.commentId;
  const commentDTO = req.body;
  comment
    .updateComment(commentId, commentDTO)
    .then((comment) => {
      res.json({
        message: "Comment was updated successfully!!",
        comment: comment,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deleteComment = (req, res) => {
  const commentId = req.params.commentId;
  comment
    .deleteComment(commentId)
    .then((comment) => {
      res.json({
        message: "Comment was deleted successfully!!",
        comment: comment,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export { createComment, readComment, updateComment, deleteComment };
