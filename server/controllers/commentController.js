const Post = require("../models/postModel");
const User = require("../models/userModel");
const Comment = require("../models/commentModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const addComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    return next(new AppError("No post with that ID", 404));
  }

  const comment = await Comment.create({
    user: req.user.id,
    post: id,
    text: req.body.text,
  });

  res.status(200).json({
    status: "success",
    data: comment,
  });
});

const updateComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { text } = req.body;

  const comment = await Comment.findById(id);

  if (!comment) {
    return next(new AppError("No comment with that ID", 404));
  }

  if (comment.user != req.user.id) {
    return next(new AppError("You do not have permissions to do this", 403));
  }

  comment.text = text;

  await comment.save();

  res.status(200).json({
    status: "success",
    data: comment,
  });
});

const deleteComment = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment) {
    return next(new AppError("No comment with that ID", 404));
  }

  if (comment.user != req.user.id) {
    return next(new AppError("You do not have permissions to do this", 403));
  }

  await comment.delete();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const toggleCommentLike = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);

  if (!comment) {
    return next(new AppError("No comment with that ID", 404));
  }

  if (comment.likedBy.includes(req.user.id)) {
    const index = comment.likedBy.indexOf(req.user.id);
    comment.likedBy.splice(index, 1);
  } else {
    comment.likedBy.push(req.user.id);
  }

  await comment.save();

  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  addComment,
  updateComment,
  deleteComment,
  toggleCommentLike,
};
