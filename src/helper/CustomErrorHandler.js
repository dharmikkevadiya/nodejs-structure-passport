class CustomErrorHandler extends Error {
  constructor(status, msg) {
    super();
    this.status = status;
    this.message = msg;
  }

  static alreadyExist(message) {
    return new CustomErrorHandler(409, message);
  }

  static wrongCredentials(message = "Username or password is wrong!") {
    return new CustomErrorHandler(401, message);
  }

  static unAuthorized(message = "Please Login first to continue") {
    return new CustomErrorHandler(401, message);
  }

  static notFound(message = "Not Found!") {
    return new CustomErrorHandler(404, message);
  }

  static userNotFound(message = "User Not Found!") {
    return new CustomErrorHandler(404, message);
  }

  static badRequest(message = "Not Found!") {
    return new CustomErrorHandler(400, message);
  }

  static forbidden(
    message = "You don't have permission to perform this action!"
  ) {
    return new CustomErrorHandler(403, message);
  }

  static serverError(message = "Internal server error!") {
    return new CustomErrorHandler(500, message);
  }
}
module.exports = CustomErrorHandler;
