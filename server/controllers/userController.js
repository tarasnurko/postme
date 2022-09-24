const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");
const filterObj = require("../utils/filterObj");

const findUser = catchAsync(async (req, res) => {
  let searchObj = {};

  if (req.query.search) {
    searchObj = {
      username: { $regex: req.query.search, $options: "i" },
    };
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const users = await User.find(searchObj).skip(skip).limit(limit);

  res.status(200).json({
    status: "success",
    data: users,
  });
});

const getUserData = catchAsync(async (req, res, next) => {
  const { id, data } = req.query;
  let user;

  if (!data) {
    return next(new AppError("Please specify user data", 404));
  }

  switch (data) {
    case "followings":
    case "followers":
      user = await User.findById(id).select(data).populate({
        path: data,
        model: "User",
        select: "username photo",
      });
      break;
    case "likedPosts":
      user = await User.findById(id)
        .select(data)
        .populate({
          path: data,
          populate: {
            path: "user",
            select: "username",
          },
          model: "Post",
          select: "title description preview tags createdAt",
        });
      break;
    case "posts":
      user = await User.findById(id).select(data).populate({
        path: data,
        model: "Post",
        select: "title description preview tags createdAt",
      });
      break;
  }

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: user,
  });
});

const getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: req.user,
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).select(
    "username followers createdAt posts banner photo"
  );

  res.status(200).json({
    status: "success",
    data: user,
  });
});

const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPasswrd.",
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, "username", "photo", "description");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.user.id);

  if (!deletedUser) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const toggleFollowing = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const userFollowTo = await User.findById(id);
  const currentUser = await User.findById(req.user.id);

  if (!userFollowTo) {
    return next(new AppError("No user with that ID", 404));
  }

  if (req.user.id === id) {
    return next(new AppError("You can not to follow yourself", 403));
  }

  if (currentUser.followings.includes(id)) {
    const index = currentUser.followings.indexOf(id);
    currentUser.followings.splice(index, 1);

    const followerIndex = userFollowTo.followers.indexOf(req.user.id);
    userFollowTo.followers.splice(followerIndex, 1);
  } else {
    currentUser.followings.push(id);
    userFollowTo.followers.push(req.user.id);
  }

  await currentUser.save();
  await userFollowTo.save();

  res.status(200).json({
    status: "success",
    data: null,
  });
});

module.exports = {
  getUser,
  findUser,
  getUserData,
  getMe,
  updateMe,
  deleteMe,
  toggleFollowing,
};
