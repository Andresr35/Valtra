const express = require("express");
var path = require("path");
const passport = require("passport");
const morgan = require("morgan");
var cookieparser = require("cookie-parser");
const config = require("./config.json");
//var session = require("express-session");
var flash = require("connect-flash");
var bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const task = require("./db/update.js");
const jwt = require("jsonwebtoken");

const BearerStrategy = require('passport-azure-ad').BearerStrategy;
app.use(express.json());

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

const client = require("./utils/shopify");

const bearerStrategy = new BearerStrategy(options, (token, done) => {
  // Send user info using the second argument
  done(null, {}, token);
});

//secret stuff
require("dotenv").config();

("use strict");

//setting up the server and views
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//only allow https
app.use(function (request, response, next) {
  if (process.env.NODE_ENV != "development" && !request.secure) {
    return response.redirect("https://" + request.headers.host + request.url);
  }

  next();
});
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
app.use((req,res,next)=>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
  next();
})

//static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/images", express.static(__dirname + "public/images"));
app.use("/js", express.static(__dirname + "public/js"));

//view files
app.all('*', passport.authenticate('oauth-bearer', {session: false}));
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});

//-------------------------------------------------this is testing authenticationss


// app.get('/hello',
//     passport.authenticate('oauth-bearer', {session: false}),
//     (req, res) => {
//         console.log('Validated claims: ', req.authInfo);
//         console.log(req.headers)
//         // Service relies on the name claim.  
//         res.status(200).json({
//             'name': req.authInfo['name'],
//             'issued-by': req.authInfo['iss'],
//             'issued-for': req.authInfo['aud'],
//             'scope': req.authInfo['scp']
//         });
//     }
// );


//
// task.job.start()
