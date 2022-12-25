const express = require("express");
const router = express.Router();
const _ = require("lodash");
const {
  allowAdminOrSelf,
  allowAuthenticated,
  allowAdminOrSelfUserId,
} = require("../middleware/auth");
const {
  createPost,
  updatePost,
  deletePost,
  getPosts,
  getPostById,
  likePost,
  unlikePost,
  getTimelinePosts,
} = require("../controllers/posts.js");

router.use((req, res, next) => {
  const entityName = req.path.split("/").filter(Boolean)[0];

  if (entityName === "posts") {
    const availableFields = ["desc", "img", "userId"];
    req.filterBody = _.pick(req.body, availableFields);
  }
  next();
});

//@route    PUT /posts
//@desc     Create post
//@access   PRIVATE
router.post("/posts/", allowAuthenticated, createPost.controller);

//@route    GET /posts
//@desc     Get posts
//@access   PRIVATE
router.get("/posts", allowAuthenticated, getPosts.controller);

//@route    GET /posts/:id
//@desc     Get single post
//@access   PRIVATE
router.get("/posts/:id", allowAuthenticated, getPostById.controller);

//@route    PUT /posts/:id
//@desc     Update post
//@access   PRIVATE
router.put("/posts/:id", allowAdminOrSelfUserId, updatePost.controller);

//@route    DELETE /posts/:id
//@desc     Delete post
//@access   PRIVATE
router.delete("/posts/:id", allowAdminOrSelfUserId, deletePost.controller);

//@route    PUT /posts/:id/like
//@desc     Like post
//@access   PRIVATE
router.put("/posts/:id/like", allowAuthenticated, likePost.controller);

//@route    PUT /posts/:id/unlike
//@desc     Unlike post
//@access   PRIVATE
router.put("/posts/:id/unlike", allowAuthenticated, unlikePost.controller);

//@route    GET /posts/timeline/id
//@desc     Get user timeline posts
//@access   PRIVATE
router.get(
  "/posts/timeline/:id",
  allowAuthenticated,
  getTimelinePosts.controller
);

module.exports = router;
