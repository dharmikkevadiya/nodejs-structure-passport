const { UserRole } = require("../helper/constant");
const { model, Schema, startSession } = require("mongoose");
const { genPasswordHash, checkPassword } = require("../helper/helper");
const { Auth } = require("../db/conn");

const UserSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String },
    avatar: { type: String },
    coverPhoto: { type: String },
    bio: { type: String },
    city: { type: String },
    from: { type: String },
    relationship: { type: Number, enum: [1, 2, 3] },
    lastLoginTime: { type: Date },
    followers: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", unique: true }],
    role: {
      type: String,
      default: UserRole.USER,
      enum: Object.values(UserRole),
      required: true,
    },
  },
  { timestamps: true }
);

UserSchema.static(
  "register",
  async ({ firstName, lastName, phone, username, password, isAdmin, role }) => {
    const session = await startSession();
    session.startTransaction();
    try {
      const passwordHash = await genPasswordHash(password);
      const user = await new User({
        firstName,
        lastName,
        phone,
        username,
        role: isAdmin ? role : UserRole.USER,
      }).save({ session });

      await new Auth({ value: passwordHash, user: user._id }).save({
        session,
      });

      session.commitTransaction();
      return user;
    } catch (err) {
      session.abortTransaction();
      throw err;
    }
  }
);

let User = new model("User", UserSchema);
module.exports = User;
