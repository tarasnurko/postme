const { findByIdAndUpdate } = require("../models/postModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");

const getPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) return next(new AppError("No post with that ID", 404));

  res.status(200).json({
    status: "success",
    data: {
      data: post,
    },
  });
});

const createPost = catchAsync(async (req, res, next) => {
  const { title, description, preview, content, tags } = req.body;

  const post = await Post.create({
    title,
    description,
    preview,
    content,
    tags,
    user: req.user.id,
  });

  res.status(201).json({
    status: "success",
    data: {
      data: post,
    },
  });
});

const updatePost = catchAsync(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  if (post.user != req.user.id) {
    return next(new AppError("You do not have permissions to do this", 403));
  }

  const filteredBody = filterObj(
    req.body,
    "title",
    "description",
    "preview",
    "content",
    "tags"
  );

  for (prop in filteredBody) {
    post[prop] = filteredBody[prop];
  }

  const updatedPost = await post.save();

  res.status(200).json({
    status: "success",
    data: {
      data: updatedPost,
    },
  });
});

const deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  if (post.user != req.user.id) {
    return next(new AppError("You do not have permissions to do this", 403));
  }

  await post.remove();

  res.status(204).json({
    status: "success",
    data: null,
  });
});

module.exports = { getPost, createPost, updatePost, deletePost };
