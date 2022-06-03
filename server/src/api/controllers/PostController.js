import PostService from "../../services/PostService.js";

const post = new PostService();

const createPost = (req, res) => {
  const meetingId = req.params.meetingId;
  const userId = req.params.userId;
  const postDTO = req.body;
  post
    .createPost(meetingId, userId, postDTO)
    .then((post) => {
      res.json({
        message: "Post was created successfully!",
        post: post,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const readPost = (req, res) => {
  const postId = req.params.postId;
  post
    .readPost(postId)
    .then((post) => {
      res.json({
        message: "Post information",
        post: post,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const updatePost = (req, res) => {
  const postId = req.params.postId;
  const postDTO = req.body;
  post
    .updatePost(postId, postDTO)
    .then((post) => {
      res.json({
        message: "Post was updated successfully!",
        post: post,
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

const deletePost = (req, res) => {
  const postId = req.params.postId;
  post
    .deletePost(postId)
    .then(() => {
      res.json({
        message: "Post was deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
};

export { createPost, readPost, updatePost, deletePost };
