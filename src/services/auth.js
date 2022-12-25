const User = require("../models/user"); //Database Model
let { checkInvitationCode } = require("../helper/helper");
const { UserRole, MSG } = require("../helper/constant");
const { ActivityLog } = require("../db/conn");
const CustomErrorHandler = require("../helper/CustomErrorHandler");

class AuthService {
  async signup(body) {
    const {
      firstName,
      lastName,
      phone,
      password,
      invitationCode,
      isAdmin,
      role,
    } = body;
    const username = body.username.toLowerCase().trim();

    // check user already exist
    let isUserExist = await User.findOne({ username });
    if (isUserExist) throw CustomErrorHandler.alreadyExist(MSG.EMAIL_TAKEN);

    //check isAdmin
    if (isAdmin) await checkInvitationCode(invitationCode);

    // create user
    const newUser = await User.register({
      firstName,
      lastName,
      phone,
      username,
      password,
      isAdmin,
      role,
    });

    return newUser;
  }

  async login(user) {
    if (user.role !== UserRole.USER) {
      await new ActivityLog({
        status: "done",
        activity: "login",
        actorUser: user._id,
        // ip: remoteIP,
      }).save();
    }

    // update lastLoginTime
    let updatedUser = await User.findByIdAndUpdate(
      user._id,
      { lastLoginTime: Date.now() },
      { new: true, timestamps: false }
    );

    return updatedUser;
  }
}

module.exports = AuthService;
