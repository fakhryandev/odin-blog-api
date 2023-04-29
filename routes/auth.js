const express = require("express");
const router = express.Router();

const authController = require("../controllers/AuthController");

router.post("/sign-up", authController.signUp);

module.exports = router;
