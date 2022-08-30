const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
    trim: true,
  },
  preview: {
    type: String,
  },
  content: {
    type: String,
    required: [true, "Please provide html content"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  likedBy: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "USer",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Comment",
    },
  ],
  tags: [
    {
      type: String,
      trim: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Post = mongoose.model("Post", postSchema);

exports.module = Post;
