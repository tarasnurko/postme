const express = require("express");
const passport = require("passport");

const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  togglePostLike,
  getLatestPosts,
  getMostLikedPosts,
  getFollowingsPosts,
} = require("../controllers/postController");

const router = express.Router();

router.get("/", getAllPosts);

router.get("/latest", getLatestPosts);
router.get("/mostLiked", getMostLikedPosts);

router.get(
  "/followings",
  passport.authenticate("jwt", { session: false }),
  getFollowingsPosts
);

router.get("/:id", getPost);

router.use(passport.authenticate("jwt", { session: false }));

router.post("/", createPost);
router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

router.patch("/toggleLike/:id", togglePostLike);

module.exports = router;
