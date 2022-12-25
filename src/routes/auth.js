const express = require("express");
const router = express.Router();
const { auth, allowAuthenticated } = require("../middleware/auth");

const { signup, login, logout } = require("../controllers/auth.js");

//@route    POST /signup
//@desc     User signup
//@access   PUBLIC
router.post("/signup", signup.controller);

//@route    POST /login
//@desc     User login
//@access   PUBLIC
router.post("/login", auth, login.controller);

//@route    POST /logout
//@desc     User logout
//@access   PUBLIC
router.post("/logout", allowAuthenticated, logout.controller);

module.exports = router;
