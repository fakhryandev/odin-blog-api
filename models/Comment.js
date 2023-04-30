const { DateTime } = require("luxon");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, converted) => {
        delete converted._id;
      },
    },
  }
);

CommentSchema.virtual("date_formatted").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString();
});

module.exports = mongoose.model("Comment", CommentSchema);
