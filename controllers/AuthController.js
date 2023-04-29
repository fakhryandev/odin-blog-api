const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

exports.signUp = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      return res.status(400).json({
        message: "Please fill name, email, password, confirmPassword",
      });
    }

    const existUser = await User.findOne({ email });

    if (existUser)
      return res.status(400).json({ message: "Email already register" });

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
    res.status(500).json({ message: error.message });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.json({
        token: generateToken(user._id),
      });
    }

    res.status(400).json({
      message: "Invalid credentials",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
