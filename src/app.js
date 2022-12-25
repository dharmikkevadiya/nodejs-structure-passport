const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
var cors = require("cors");
const logger = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const passport = require("passport");
const compression = require("compression");
const errorHandler = require("./middleware/errorHandler");
const { PORT } = require("./config");
const app = express();
global.appRoot = path.resolve(__dirname);

//connect db
const User = require("./models/user");
const { connect, createMongoStore, Config } = require("./db/conn");
connect().then(async () => {
  console.log("Connected to MongoDB");
  // User.register({
  //   username: "root101@yopmail.com",
  //   password: "12345678",
  //   firstName: "Root",
  //   lastName: "101",
  //   isAdmin: true,
  // });
  // let res = await new Config({
  //   type: "invitation_code",
  //   value: "december",
  // }).save();
});

//middlewares
app.use(logger("dev"));
app.use(helmet());
app.use(
  session({
    secret: "j2rFa9&s1",
    resave: false,
    saveUninitialized: false,
    store: createMongoStore(),
  })
);
app.use(bodyParser.json({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(compression());

//start
app.get("/", (req, res) => {
  res.send("Welcome to this Api...");
});

//routes
app.use("/", require("./routes/auth"));
app.use("/", require("./routes/user"));
app.use("/", require("./routes/posts"));

// CELEBRATE ERROR HANDLING
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`App running on: http://localhost:${PORT}`);
});
