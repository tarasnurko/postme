const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
      minlength: 6,
      maxlength: 70,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please provide description"],
      maxlength: 260,
      minlength: 20,
    },
    preview: {
      type: String,
    },
    content: [
      {
        type: {
          type: String,
          required: true,
        },
        content: String,
        sub: String,
      },
    ],
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
    tags: [
      {
        type: String,
        required: [true, "Please provide tags"],
        trim: true,
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

postSchema.virtual("comments", {
  ref: "Comment",
  foreignField: "post",
  localField: "_id",
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
