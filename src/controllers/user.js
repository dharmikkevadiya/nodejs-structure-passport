const UserService = require("../services/user");
const service = new UserService();
let { MSG } = require("../helper/constant");
const StatusCodes = require("http-status");
let { Response } = require("../helper/helper");
const CustomErrorHandler = require("../helper/CustomErrorHandler");

module.exports.getMe = {
  controller: async function getMe(req, res, next) {
    try {
      let result = await service.getMe(req.user);
      return res.json(Response(MSG.FOUND_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.getAllUsers = {
  controller: async function getAllUsers(req, res, next) {
    try {
      let result = await service.getAllUsers();
      return res.json(Response(MSG.FOUND_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.getSingleUser = {
  controller: async function getSingleUser(req, res, next) {
    try {
      let result = await service.getSingleUser(req.params.id);
      return res.json(Response(MSG.FOUND_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.updateUser = {
  controller: async function updateUser(req, res, next) {
    try {
      const id = req.params.id;
      const body = req.filterBody;

      let result = await service.updateUser(id, body);
      return res.json(Response(MSG.UPDATE_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.deleteUser = {
  controller: async function deleteUser(req, res, next) {
    try {
      const id = req.params.id;

      let result = await service.deleteUser(id);
      return res.json(Response(MSG.DELETE_SUCCESS));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.followUser = {
  controller: async function followUser(req, res, next) {
    try {
      const id = req.params.id;
      let user = req.user;

      if (user._id == id)
        throw CustomErrorHandler.badRequest("You can't follow yourself");

      let result = await service.followUser(id, user);
      return res.json(Response(MSG.FOLLOW_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};

module.exports.unfollowUser = {
  controller: async function followUser(req, res, next) {
    try {
      const id = req.params.id;
      let user = req.user;

      let result = await service.unfollowUser(id, user);
      return res.json(Response(MSG.UNFOLLOW_SUCCESS, result));
    } catch (err) {
      next(err);
    }
  },
};
