const Comment = require("../models/Comment");
const Post = require("../models/Post");

exports.createComment = async (req, res) => {
  try {
    const { comment } = req.body;
    const postId = req.params.id;

    const post = await Post.findById(postId);

    if (!post) return res.status(404).json({ message: "Data not found" });

    const user = req.user;

    const newComment = new Comment({
      comment,
      user: user._id,
    });

    const createdComment = await newComment.save();

    post.comments.push(createdComment._id);
    await post.save();

    res.status(201).json({
      message: "Comment created",
    });
  } catch (error) {
    res.status(500).status({ message: error.message });
  }
};
