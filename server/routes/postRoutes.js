const express = require("express");
const passport = require("passport");
const verifyJwt = require("../middleware/verifyJwt");

const {
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

// router.get('/:id')

router.use(passport.authenticate("jwt", { session: false }), verifyJwt);

router.post("/", createPost);

router.patch("/:id", updatePost);
router.delete("/:id", deletePost);

router.get("/:id", getPost);

module.exports = router;
