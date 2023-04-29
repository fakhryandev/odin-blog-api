const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticationMiddleware = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (authorization && authorization.startsWith("Bearer")) {
      const token = authorization.split(" ")[1];

      if (!token) {
        throw new Error("Unauthorized");
      }

      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decode.id);

      next();
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = authenticationMiddleware;
