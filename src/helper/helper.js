const bcrypt = require("bcrypt");
const StatusCodes = require("http-status");
const { Config } = require("../db/conn");
const CustomErrorHandler = require("./CustomErrorHandler");
const { MSG } = require("./constant");

const getRandomValue = function (str = "1234567890", length = 4) {
  // const str = '1234567890'; //Random Generate Every Time From This Given Char
  // const length = 4;

  let randomValue = "";
  for (let i = 0; i < length; i++) {
    const value = Math.floor(Math.random() * str.length);
    randomValue += str.substring(value, value + 1).toUpperCase();
  }

  return randomValue;
};

const getUniqueValue = function (
  length = 16,
  options = { numericOnly: false }
) {
  let text = "";
  const possible =
    options && options.numericOnly
      ? "0123456789"
      : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;

  return new Date().getTime().toString(36) + new Date().getUTCMilliseconds();
};

const checkPassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const genPasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const Response = (message, data) => ({
  status: StatusCodes.OK,
  message,
  result: data,
});

const checkInvitationCode = async (invitationCode) => {
  if (!invitationCode)
    throw CustomErrorHandler.notFound(MSG.INVITATION_REQUIRED);

  let validInvitationCode = await Config.findOne({
    type: "invitation_code",
  });
  if (!validInvitationCode)
    throw CustomErrorHandler.serverError(MSG.INVITATION_NOT_SET);

  if (invitationCode !== validInvitationCode.value) {
    throw CustomErrorHandler.badRequest(MSG.INVITATION_INCORRECT);
  }
  return;
};
module.exports = {
  getRandomValue,
  getUniqueValue,
  checkPassword,
  genPasswordHash,
  Response,
  checkInvitationCode,
};
