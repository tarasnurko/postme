const passport = require("passport");
const passportJwt = require("passport-jwt");
const StrategyJwt = passportJwt.Strategy;
const User = require("../models/userModel");

const cookieExtractor = (req) => {
  let token = null;

  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

passport.use(
  new StrategyJwt(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: process.env.JWT_SECRET,
    },
    async function (jwtPayload, done) {
      const user = await User.findById(jwtPayload.id);

      console.log(jwtPayload.id, user);

      return done(null, user);
    }
  )
);
