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

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: "author",
        select: "name email",
      })
      .select("title author content updatedAt date_formatted");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).status({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
