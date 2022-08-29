const express = require("express");
const passport = require("passport");

const router = express.Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send("Work");
  }
);

// router.get("/:userId");

module.exports = router;
