const express = require("express");
const router = express.Router();

const {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const authMiddleware = require("../middleware/authMiddleWare");


// PUBLIC
router.get("/", getPosts);
router.get("/:id", getPostById);

// PROTECTED
router.post("/", authMiddleware, createPost);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);

module.exports = router;