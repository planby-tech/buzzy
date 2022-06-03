import db from "../db/models/index.js";

export default class CommentService {
  async createComment(meetingId, userId, commentDTO) {
    const meetingRecord = await db.Meeting.findByPk(meetingId);
    const userRecord = await db.User.findByPk(userId);
    const commentRecord = await db.Comment.create({
      content: commentDTO.content,
    });
    await meetingRecord.addComment(commentRecord);
    await userRecord.addComment(commentRecord);
  }

  async readComment(commentId) {
    const commentRecord = await db.Comment.findByPk(commentId);
    if (!commentRecord) {
      throw new Error("Comment not found!");
    }
    return commentRecord;
  }

  async updateComment(commentId, commentDTO) {
    if (!commentDTO) {
      throw new Error("Comment was not entered!");
    }
    const commentRecord = await db.Comment.update(
      { content: commentDTO.content },
      { where: { id: commentId } }
    );
    return commentRecord;
  }

  async deleteComment(commentId) {
    await db.Comment.destroy({
      where: {
        id: commentId,
      },
    });
    return;
  }
}
