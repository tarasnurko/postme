const express = require("express");
const passport = require("passport");

const {
  findUser,
  getUserData,
  getMe,
  updateMe,
  deleteMe,
  toggleFollowing,
  getUser,
} = require("../controllers/userController");

const router = express.Router();

router.get("/find", findUser);
router.get("/info", getUserData);

// router.use(passport.authenticate("jwt", { session: false }));

router.get("/me", passport.authenticate("jwt", { session: false }), getMe);

router.patch(
  "/updateMe",
  passport.authenticate("jwt", { session: false }),
  updateMe
);
router.delete(
  "/deleteMe",
  passport.authenticate("jwt", { session: false }),
  deleteMe
);
router.patch(
  "/toggleFollowing/:id",
  passport.authenticate("jwt", { session: false }),
  toggleFollowing
);

router.get("/:id", getUser);

module.exports = router;
