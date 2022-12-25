const User = require("../models/user");
const { API_KEY } = require("../config");
let { MSG } = require("../helper/constant");
let { Response, checkPassword } = require("../helper/helper");
let CustomErrorHandler = require("../helper/CustomErrorHandler");

const passport = require("passport");
const { Auth } = require("../db/conn");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username }).exec();
    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    const authData = await Auth.findOne({ user });
    if (!authData) {
      return done(null, false, { message: "User has no auth data" });
    }
    if (!(await checkPassword(password, authData.value))) {
      return done(null, false, { message: "Invalid password" });
    }
    return done(null, user);
  })
);

passport.serializeUser((user, done) => done(null, user.username));
passport.deserializeUser(async (username, done) => {
  const user = await User.findOne({ username });
  done(null, user);
});

const auth = passport.authenticate("local");

const allowAuthenticated = (req, res, next) => {
  let isValidKey = req.header("apikey") === API_KEY;

  if (!req.user && !isValidKey) {
    next(CustomErrorHandler.unAuthorized());
  }
  next();
};

const authorizationCheck = (predicate) => (req, res, next) => {
  let isValidKey = req.header("apikey") === API_KEY;

  if (!req.user && !isValidKey) return next(CustomErrorHandler.unAuthorized());

  if (!predicate(req) && !isValidKey) {
    next(CustomErrorHandler.forbidden());
  }
  next();
};

const isAdmin = (req) =>
  req.user && (req.user.role === "admin" || req.user.role === "root");
const allowAdmin = authorizationCheck(isAdmin);

const isRoot = (req) => req.user && req.user.role === "root";
const allowRoot = authorizationCheck(isRoot);

const isSelf = (req) =>
  req.params.id && req.user && req.params.id === req.user._id.toString();
const allowSelf = authorizationCheck(isSelf);

const isSelfUserId = (req) =>
  req.body && req.body.userId === req.user._id.toString();

const allowAdminOrSelf = authorizationCheck(
  (req) => isAdmin(req) || isSelf(req)
);
const allowAdminOrSelfUserId = authorizationCheck(
  (req) => isAdmin(req) || isSelfUserId(req)
);

module.exports = {
  auth,
  allowAuthenticated,
  allowAdmin,
  allowRoot,
  allowSelf,
  allowAdminOrSelf,
  allowAdminOrSelfUserId,
};
