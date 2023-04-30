const express = require("express");
const authenticationMiddleware = require("../middleware/authMiddleware");
const postController = require("../controllers/PostController");
const router = express.Router();

router.get("/published", postController.getPublishedPost);
router.get("/", postController.getPosts);
router.get("/:id", postController.getPostById);
router.post("/create", authenticationMiddleware, postController.createPost);
router.put("/:id/update", authenticationMiddleware, postController.updatePost);
router.put(
  "/:id/publish",
  authenticationMiddleware,
  postController.publishPost
);

module.exports = router;
