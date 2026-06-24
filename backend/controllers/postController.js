const Post = require("../models/post");


// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const {
      title,
      description,
      mainImage,
      subImages,
      status,
    } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({
        message: "Description is required",
      });
    }

    if (!mainImage || mainImage.trim() === "") {
      return res.status(400).json({
        message: "Main image is required",
      });
    }

    if (!subImages || !Array.isArray(subImages)) {
      return res.status(400).json({
        message: "Sub images must be an array",
      });
    }

    if (subImages.length !== 4) {
      return res.status(400).json({
        message: "Exactly 4 sub images are required",
      });
    }

    if (!status || !["active", "inactive"].includes(status)) {
      return res.status(400).json({
        message: "Status must be active or inactive",
      });
    }

    const post = await Post.create({
      title,
      description,
      mainImage,
      subImages,
      status,
      user: req.user.id,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET ALL POSTS
exports.getPosts = async (req, res) => {
  try {
    const { search = "", page = 1, limit = 6, tag } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (tag) {
      query.tags = tag;
    }

    const skip = (page - 1) * limit;

    const posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Post.countDocuments(query);

    res.json({
      posts,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// GET SINGLE POST (for edit form)
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// UPDATE POST (EDIT LOGIC)
exports.updatePost = async (req, res) => {
  try {
    const { title, description, mainImage, subImages, status } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    if (title !== undefined && title.trim() === "") {
      return res.status(400).json({
        message: "Title cannot be empty",
      });
    }

    if (description !== undefined && description.trim() === "") {
      return res.status(400).json({
        message: "Description cannot be empty",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        mainImage,
        subImages,
        status,
      },
      { new: true }
    );

    res.json(updatedPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// DELETE POST
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};