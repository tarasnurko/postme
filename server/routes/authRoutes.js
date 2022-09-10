const express = require("express");
const passport = require("passport");
const { signup, login, logout } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

router.use(passport.authenticate("jwt", { session: false }));
router.get("/logout", logout);

module.exports = router;
