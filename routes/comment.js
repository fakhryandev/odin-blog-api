const express = require("express");
const authenticationMiddleware = require("../middleware/authMiddleware");
const commentController = require("../controllers/CommentController");
const router = express.Router();

router.post(
  "/:id/comment/create",
  authenticationMiddleware,
  commentController.createComment
);

module.exports = router;
