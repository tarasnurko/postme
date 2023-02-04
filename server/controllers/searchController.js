const catchAsync = require("../utils/catchAsync");
const Post = require("../models/postModel");
const User = require("../models/userModel");

const search = catchAsync(async (req, res, next) => {
  const { search, type, sort, page: reqPage, limit: reqLimit } = req.query;

  const page = parseInt(reqPage) || 1;
  const limit = parseInt(reqLimit) || 10;
  const skip = (page - 1) * limit;

  let data = {};

  if (type === "user") {
    let userSort;

    if (sort === "createdAt") {
      userSort = sort;
    } else if (sort === "followers" || sort === "posts") {
      userSort = `${sort}Count`;
    } else {
      userSort = "createdAt";
    }

    const users = await User.aggregate([
      {
        $match: { username: { $regex: search, $options: "i" } },
      },
      {
        $addFields: {
          followersCount: { $size: { $ifNull: ["$followers", []] } },
          postsCount: { $size: { $ifNull: ["$posts", []] } },
        },
      },
      {
        $sort: { [userSort]: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    const count = await User.countDocuments({
      username: { $regex: search, $options: "i" },
    });

    data = {
      data: users,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  } else if (type === "post") {
    const postSort =
      sort === "likes"
        ? "likesCount"
        : sort === "comments"
        ? "commentsCount"
        : "createdAt";

    const posts = await Post.aggregate([
      {
        $match: {
          $or: [{ title: { $regex: search, $options: "i" } }, { tags: search }],
        },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "comments",
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
        $addFields: {
          likesCount: { $size: { $ifNull: ["$likedBy", []] } },
          commentsCount: { $size: { $ifNull: ["$comments", []] } },
        },
      },
      {
        $sort: { [postSort]: -1 },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    const count = await Post.countDocuments({
      $or: [{ title: { $regex: search, $options: "i" } }, { tags: search }],
    });

    data = {
      data: posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  res.status(200).json({
    status: "success",
    data,
  });
});

module.exports = { search };
