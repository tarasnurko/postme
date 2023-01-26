const express = require("express");
const passport = require("passport");
const {
  addComment,
  updateComment,
  deleteComment,
  toggleCommentLike,
} = require("../controllers/commentController");

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.patch("/toggleLike/:id", toggleCommentLike);

router.post("/:id", addComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
