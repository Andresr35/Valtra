const express = require("express");
var path = require("path");
var passport = require("passport");
var cookieparser = require("cookie-parser");
//var session = require("express-session");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const task = require('./db/update.js');
app.use(express.json());

const client = require("./utils/shopify");
//secret stuff
require("dotenv").config();

("use strict");

//setting up the server and views
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  cors({
    // origin: ['https://valtra-automation.azurewebsites.net'],
    // methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieparser());

app.use(flash());

//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/js", express.static(__dirname + "public/js"));

//view files
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});

// 
task.job.start()