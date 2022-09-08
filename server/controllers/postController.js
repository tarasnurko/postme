const { findByIdAndUpdate } = require("../models/postModel");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");

const getLatestPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.find().sort({ createdAt: -1 }).limit(10);

  if (!posts.length) {
    return next(new AppError("No latest posts found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: posts,
    },
  });
});

const getMostLikedPosts = catchAsync(async (req, res, next) => {
  const posts = await Post.aggregate()
    .addFields({ length: { $size: `$likedBy` } })
    .sort({ length: -1 })
    .limit(10);

  if (!posts.length) {
    return next(new AppError("No latest posts found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: posts,
    },
  });
});

const getPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("user").populate("comments");

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

const togglePostLike = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);
  const user = await User.findById(req.user.id);

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  console.log(post.likedBy);
  console.log(req.user.id);

  if (post.likedBy.includes(req.user.id)) {
    const indexPost = post.likedBy.indexOf(req.user.id);
    post.likedBy.splice(indexPost, 1);

    const indexUser = user.likedPosts.indexOf(post);
    user.likedPosts.splice(indexUser, 1);
  } else {
    post.likedBy.push(req.user.id);
    user.likedPosts.push(post);
  }

  await post.save();
  await user.save();

  res.status(200).json({
    status: "success",
    data: {
      data: post,
    },
  });
});

module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost,
  togglePostLike,
  getLatestPosts,
  getMostLikedPosts,
};
