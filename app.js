const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
require("dotenv").config();

const app = express();
const port = 8000;

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

app.use(express.json());
app.use(cors());
app.use("/auth", authRouter);
app.use("/post", postRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
