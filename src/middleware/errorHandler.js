const { DEBUG_MODE } = require("../config");
const { ValidationError } = require("joi");
const CustomErrorHandler = require("../helper/CustomErrorHandler");
const { ErrorLog } = require("../db/conn");

const errorHandler = async (err, req, res, next) => {
  let status = 500;
  let message = err.message;

  if (err instanceof CustomErrorHandler) {
    status = err.status;
  } else if (err instanceof ValidationError) {
    status = 422;
  } else {
    const user = req.user;
    const body = req.body;
    const params = req.params;
    const query = req.query;

    await new ErrorLog({
      apiPath: req.method + req.url,
      message: message,
      data: { user: user._id, body, params, query },
    }).save();
  }

  console.log("req.user", req.user && req.user._id);
  console.log("body::", req.body);
  console.log("params::", req.params);
  console.log("query::", req.query);
  console.log("Error part::", err);

  return res.json({ status, message });
};

module.exports = errorHandler;
