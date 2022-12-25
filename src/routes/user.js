const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { allowAdminOrSelf, allowAuthenticated } = require("../middleware/auth");
const {
  getMe,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getAllUsers,
  getSingleUser,
} = require("../controllers/user.js");

router.use((req, res, next) => {
  const entityName = req.path.split("/").filter(Boolean)[0];

  if (entityName === "users") {
    const availableFields = [
      "firstName",
      "lastName",
      "email",
      "avatar",
      "coverPhoto",
      "bio",
      "city",
      "from",
      "relationship",
    ];
    req.filterBody = _.pick(req.body, availableFields);
  }
  next();
});

//@route    GET /me
//@desc     Get me
//@access   PRIVATE
router.get("/me", allowAuthenticated, getMe.controller);

//@route    GET /users
//@desc     Get all users
//@access   PRIVATE
router.get("/users", allowAuthenticated, getAllUsers.controller);

//@route    GET /users/id
//@desc     Get singl user
//@access   PRIVATE
router.get("/users/:id", allowAuthenticated, getSingleUser.controller);

//@route    PUT /users/:id
//@desc     Update user
//@access   PRIVATE
router.put("/users/:id", allowAdminOrSelf, updateUser.controller);

//@route    PUT /users/:id
//@desc     Delete user
//@access   PRIVATE
router.delete("/users/:id", allowAdminOrSelf, deleteUser.controller);

//@route    PUT /users/:id/follow
//@desc     Follow user
//@access   PRIVATE
router.put("/users/:id/follow", allowAuthenticated, followUser.controller);

//@route    PUT /users/:id/unfollow
//@desc     unfollow user
//@access   PRIVATE
router.put("/users/:id/unfollow", allowAuthenticated, unfollowUser.controller);

module.exports = router;
