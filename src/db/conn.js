const { connect: mongooseConnect, model, Schema } = require("mongoose");
const MongoStore = require("connect-mongo");
const { MONGODB_URL } = require("../config");

//connect to db
let connection = null;
const connect = async () => {
  return connection || (connection = await mongooseConnect(MONGODB_URL));
};

const createMongoStore = () => MongoStore.create({ mongoUrl: MONGODB_URL });

// models
const Config = model("Config", {
  type: { type: String, required: true },
  value: { type: String, required: true },
});

const Auth = model("Auth", {
  user: { type: Schema.Types.ObjectId, ref: "User", index: true },
  value: { type: String, required: true },
});

const ActivityLog = model("ActivityLog", {
  createdAt: { type: Date, default: Date.now(), required: true, index: true },
  status: { type: String, index: true },
  activity: { type: String, required: true, index: true },
  actorUser: { type: Schema.Types.ObjectId, ref: "User", index: true },
  targetUser: { type: Schema.Types.ObjectId, ref: "User", index: true },
  data: { type: Object },
  ip: { type: String, index: true },
});
const ErrorLog = model("ErrorLog", {
  createdAt: { type: Date, default: Date.now(), required: true, index: true },
  apiPath: { type: String },
  message: { type: String },
  data: { type: Object },
});

module.exports = {
  createMongoStore,
  connect,
  Auth,
  Config,
  ActivityLog,
  ErrorLog,
};
