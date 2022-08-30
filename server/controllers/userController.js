const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const jwt = require("jsonwebtoken");

const getUser = catchAsync(async (req, res, next) => {
  const { userId } = req.params;

  const user = await User.findOne({ _id: userId });

  if (!user) return next(new AppError("No user with this id", 400));

  res.status(200).json({
    status: "success",
    data: {
      data: user,
    },
  });
});

const getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    data: {
      data: req.user,
    },
  });
});

const deleteMe = catchAsync(async (req, res, next) => {});

module.exports = { getUser, getMe, deleteMe };
