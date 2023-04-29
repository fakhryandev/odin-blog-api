const Post = require("../models/Post");
const User = require("../models/User");

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const user = req.user;

    const newPost = new Post({
      title,
      content,
      author: user._id,
    });

    await newPost.save();

    res.status(201).json({
      post: newPost._id,
    });
  } catch (error) {
    res.status(500).status({ message: error.message });
  }
};
