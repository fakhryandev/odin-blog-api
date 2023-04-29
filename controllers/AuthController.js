const User = require("../models/User");

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please fill name, email, password, confirmPassword",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password and confirm password not match",
      });
    }

    const newUser = new User({
      name: name,
      email: email,
      password: password,
    });

    await newUser.save();

    return res.status(201).json({
      message: "Success create user",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
