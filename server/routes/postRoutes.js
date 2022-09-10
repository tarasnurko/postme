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
} = require("../controllers/postController");

const router = express.Router();

// router.get('/:id')
router.get("/", getAllPosts);

router.get("/latest", getLatestPosts);
router.get("/mostLiked", getMostLikedPosts);

router.use(passport.authenticate("jwt", { session: false }));

router.post("/", createPost);

router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

router.get("/:id", getPost);
router.get("/toggleLike/:id", togglePostLike);

module.exports = router;
