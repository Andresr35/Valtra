/**
 * This page holds the main configuration of the backend. All methods that are used widely will be set up here.
 *
 */

// Library set up
const express = require("express");
var path = require("path");
const passport = require("passport");
const morgan = require("morgan");
var cookieparser = require("cookie-parser");
const config = require("./config.json");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const BearerStrategy = require("passport-azure-ad").BearerStrategy;
const client = require("./utils/shopify");
//secret stuff
require("dotenv").config();

app.use(express.json());

// Configuration for Azure Connection
const options = {
  identityMetadata: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}/${config.metadata.discovery}`,
  issuer: `https://${config.metadata.authority}/${config.credentials.tenantID}/${config.metadata.version}`,
  clientID: config.credentials.clientID,
  audience: config.credentials.clientID, // audience is this application
  validateIssuer: config.settings.validateIssuer,
  passReqToCallback: config.settings.passReqToCallback,
  loggingLevel: config.settings.loggingLevel,
  scope: config.protectedRoutes.hello.scopes,
};

// Setting up middleware for routes to accept Azure tokens
const bearerStrategy = new BearerStrategy(options, (token, done) => {
  // Send user info using the second argument
  done(null, {}, token);
});

("use strict");

// Setting up the server and views
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Setting up outside libraries for security and such
app.use(
  cors({
    //     origin: ['http://192.168.0.93:3005'],
    //     methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(morgan("dev"));
app.use(passport.initialize());
passport.use(bearerStrategy);
app.use(flash());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Static files
app.use(express.static("public"));

// Setting up routes
app.all("*", passport.authenticate("oauth-bearer", { session: false }));// You can comment this to get rid of auth requirment
app.use("/api", require("./routes/api"));

//Starting the server
app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});

//-------------------------------------------------Testing
// task.job.start()
