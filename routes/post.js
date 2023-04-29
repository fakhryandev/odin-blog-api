const express = require("express");
const authenticationMiddleware = require("../middleware/authMiddleware");
const postController = require("../controllers/PostController");
const router = express.Router();

router.post("/create", authenticationMiddleware, postController.createPost);

module.exports = router;
