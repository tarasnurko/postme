const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
      required: true,
    },
    text: {
      type: String,
      required: [true, "Please write comment"],
      minlength: [10, "Your comment is too short"],
      maxlength: [200, "Your comment is too long"],
    },
    likedBy: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "USer",
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
