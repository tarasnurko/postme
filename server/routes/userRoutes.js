const express = require("express");
const passport = require("passport");

const {
  getUser,
  getMe,
  updateMe,
  deleteMe,
} = require("../controllers/userController");
const verifyJwt = require("../middleware/verifyJwt");

const router = express.Router();

// router.get(
//   "/",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     res.send("Work");
//   }
// );

// router.get("/:id", getUser);

router.use(passport.authenticate("jwt", { session: false }), verifyJwt);

router.get("/me", getMe);
router.patch("/updateMe", updateMe);
router.delete("/deleteMe", deleteMe);

module.exports = router;
