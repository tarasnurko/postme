const Post = require("../models/postModel");
const User = require("../models/userModel");
const { ObjectId } = require("mongoose").Types;
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const filterObj = require("../utils/filterObj");

const getAllPosts = catchAsync(async (req, res, next) => {
  let searchObj = {};

  if (req.query.search) {
    searchObj = {
      $or: [
        { title: { $regex: req.query.search, $options: "i" } },
        { description: { $regex: req.query.search, $options: "i" } },
        { tags: { $in: [req.query.search] } },
      ],
    };
  }

  const sort =
    req.query.sort === "asc"
      ? "createdAt"
      : req.query.sort === "desc"
      ? "-createdAt"
      : "";

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const posts = await Post.find(searchObj)
    .populate("user")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

const getLatestPosts = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;

  const posts = await Post.find()
    .populate("user")
    .sort({ createdAt: -1 })
    .limit(limit);

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

const getMostLikedPosts = catchAsync(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;

  const posts = await Post.aggregate()
    .addFields({ length: { $size: "$likedBy" } })
    .lookup({
      from: "users",
      localField: "user",
      foreignField: "_id",
      as: "user",
    })
    .sort({ length: -1 })
    .limit(limit);

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

const getFollowingsPosts = catchAsync(async (req, res, next) => {
  const limit = parseInt(req.query.limit) || 10;

  const posts = await User.aggregate([
    { $match: { _id: ObjectId(req.user.id) } },
    {
      $lookup: {
        from: "users",
        localField: "followings",
        foreignField: "_id",
        as: "followings",
      },
    },
    {
      $unwind: {
        path: "$followings",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "posts",
        localField: "followings.posts",
        foreignField: "_id",
        as: "followings.posts",
      },
    },
    {
      $unwind: {
        path: "$followings.posts",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $group: {
        _id: "$followings.posts._id",
        title: { $first: "$followings.posts.title" },
        description: { $first: "$followings.posts.description" },
        preview: { $first: "$followings.posts.preview" },
        content: { $first: "$followings.posts.content" },
        likedBy: { $first: "$followings.posts.likedBy" },
        tags: { $first: "$followings.posts.tags" },
        createdAt: { $first: "$followings.posts.createdAt" },
        user: { $first: "$followings._id" },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: {
        path: "$user",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $limit: limit,
    },
  ]);

  res.status(200).json({
    status: "success",
    data: posts,
  });
});

const getPost = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("user").populate("comments");

  if (!post) return next(new AppError("No post with that ID", 404));

  res.status(200).json({
    status: "success",
    data: post,
  });
});

const createPost = catchAsync(async (req, res, next) => {
  const { title, description, preview, content, tags } = req.body;

  const user = await User.findById(req.user.id);

  if (!user) return next(new AppError("No user with that ID", 404));

  const post = await Post.create({
    title,
    description,
    preview,
    content,
    tags,
    user: req.user.id,
  });

  user.posts.push(req.user.id);

  await user.save();

  res.status(201).json({
    status: "success",
    data: post,
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
    data: updatedPost,
  });
});

const deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findById(id);

  const user = await User.findById(req.user.id);

  if (!user) return next(new AppError("No user with that ID", 404));

  if (!post) {
    return next(new AppError("No post found with that ID", 404));
  }

  if (post.user != user) {
    return next(new AppError("You do not have permissions to do this", 403));
  }

  await post.remove();

  user.posts.splice(user.posts.indexOf(id), 1);
  await user.save();

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
    data: post,
  });
});

module.exports = {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  togglePostLike,
  getLatestPosts,
  getMostLikedPosts,
  getFollowingsPosts,
};
