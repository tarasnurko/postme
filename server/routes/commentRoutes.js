const express = require("express");
const passport = require("passport");
const {
  addComment,
  updateComment,
  deleteComment,
} = require("../controllers/commentController");

const router = express.Router();

router.use(passport.authenticate("jwt", { session: false }));

router.post("/:id", addComment);
router.patch("/:id", updateComment);
router.delete("/:id", deleteComment);

module.exports = router;
