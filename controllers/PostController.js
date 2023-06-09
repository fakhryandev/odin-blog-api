const Post = require("../models/Post");

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

exports.getPublishedPost = async (req, res) => {
  try {
    const posts = await Post.find({ isPublished: true })
      .populate({
        path: "author",
        select: "name email",
      })
      .populate("comments")
      .select("title author content updatedAt date_formatted isPublished");

    res.status(200).json(posts);
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
      .populate("comments")
      .select("title author content updatedAt date_formatted isPublished");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).status({ message: error.message });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const id = req.params.id;
    const post = await Post.findById(id)
      .populate({
        path: "author",
        select: "name email",
      })
      .populate({
        path: "comments",
        select: "user comment createdAt date_formatted",
        populate: {
          path: "user",
          select: "email",
        },
      })
      .select(
        "title author content updatedAt date_formatted comments isPublished"
      );

    if (!post) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;

    const { title, content } = req.body;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Data not found" });
    }

    if (user._id.toString() !== post.author.toString()) {
      return res.status(400).json({ message: "You can't update this post" });
    }

    const updatedPost = {
      title,
      content,
    };

    await Post.findByIdAndUpdate(id, updatedPost);

    res.status(200).json({ message: "Success update post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.publishPost = async (req, res) => {
  try {
    const id = req.params.id;
    const user = req.user;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ message: "Data not found" });
    }

    if (user._id.toString() !== post.author.toString()) {
      return res.status(400).json({ message: "You can't update this post" });
    }

    post.isPublished = !post.isPublished;

    await post.save();

    res.status(200).json({ message: "Succes update post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
