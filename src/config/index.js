const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost:27017/facebook_clone";
const APP_URL = process.env.APP_URL || "http://localhost:5000";
const API_KEY = process.env.API_KEY || "samplexyz123abcexample";
const DEBUG_MODE = process.env.DEBUG_MODE || true;
const PORT = process.env.PORT || 5000;

module.exports = {
  MONGODB_URL,
  APP_URL,
  API_KEY,
  DEBUG_MODE,
  PORT,
};
