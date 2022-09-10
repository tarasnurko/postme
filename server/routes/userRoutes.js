const express = require("express");
const passport = require("passport");

const {
  findUser,
  getUserData,
  getMe,
  updateMe,
  deleteMe,
  toggleFollowing,
} = require("../controllers/userController");

const router = express.Router();

router.get("/find", findUser);
router.get("/info", getUserData);

router.use(passport.authenticate("jwt", { session: false }));

router.get("/me", getMe);
router.patch("/updateMe", updateMe);
router.delete("/deleteMe", deleteMe);
router.get("/toggleFollowing/:id", toggleFollowing);

module.exports = router;
