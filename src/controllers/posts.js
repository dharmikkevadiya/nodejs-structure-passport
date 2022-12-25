const PostsService = require("../services/posts");
const service = new PostsService();
let { MSG } = require("../helper/constant");
const StatusCodes = require("http-status");
let { Response } = require("../helper/helper");
const CustomErrorHandler = require("../helper/CustomErrorHandler");

module.exports.createPost = {
  controller: async function createPost(req, res, next) {
    try {
      const userId = req.user._id;
      const body = req.filterBody;

      let result = await service.createPost(userId, body);
      return res.json(Response(MSG.CREATE_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.getPosts = {
  controller: async function getPosts(req, res, next) {
    try {
      let result = await service.getPosts(req.query);
      return res.json(Response(MSG.FOUND_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.getPostById = {
  controller: async function getPostById(req, res, next) {
    try {
      const id = req.params.id;
      let result = await service.getPostById(id);
      return res.json(Response(MSG.FOUND_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.updatePost = {
  controller: async function updatePost(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.body.userId;
      const body = req.filterBody;

      let result = await service.updatePost(id, userId, body);
      return res.json(Response(MSG.UPDATE_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.deletePost = {
  controller: async function deletePost(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.body.userId;

      let result = await service.deletePost(id, userId);
      return res.json(Response(MSG.DELETE_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.likePost = {
  controller: async function likePost(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.user._id;

      let result = await service.likePost(id, userId);
      return res.json(Response(MSG.UPDATE_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.unlikePost = {
  controller: async function unlikePost(req, res, next) {
    try {
      const id = req.params.id;
      const userId = req.user._id;

      let result = await service.unlikePost(id, userId);
      return res.json(Response(MSG.UPDATE_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.getTimelinePosts = {
  controller: async function getTimelinePosts(req, res, next) {
    try {
      const userId = req.params.id;
      let result = await service.getTimelinePosts(userId);
      return res.json(Response(MSG.FOUND_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};
