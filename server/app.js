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
app.use("/", require("./routes/web"));
app.use("/api", require("./routes/api"));

app.listen(app.get("port"), function () {
  console.log("Server started on port " + app.get("port"));
});

//-------------------------------------------------this is testing authenticationss


app.get('/hello',
    passport.authenticate('oauth-bearer', {session: false}),
    (req, res) => {
        console.log('Validated claims: ', req.authInfo);
        console.log(req.headers)
        // Service relies on the name claim.  
        res.status(200).json({
            'name': req.authInfo['name'],
            'issued-by': req.authInfo['iss'],
            'issued-for': req.authInfo['aud'],
            'scope': req.authInfo['scp']
        });
    }
);

/**
 * just makes a token depending on user id
 *
 * @param   {route}  /auth/login  [/auth/login description]
 *
 * @return  {[token]}               api token
 */
app.get("/auth/login", (req, res) => {
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = { userId: 12 };
  const token = jwt.sign(data, jwtSecretKey, { expiresIn: "2h" });
  res.send(token);
});

app.get("/protected", ensureToken, (req, res) => {
  jwt.verify(req.token, process.env.JWT_SECRET_KEY, (err, data) => {
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({ text: "this is protexted", data: data });
    }
  });
});

app.get("/test", (req, res) => {
  console.log(req);
});

/**
 * makes sure that you have a token attatched
 *
 *
 * @return  {token?}        [return description]
 */
function ensureToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

// app.get("/user/validateToken", (req, res) => {
//   // Tokens are generally passed in the header of the request
//   // Due to security reasons.
//   let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;
//   try {
//       const token = req.header(tokenHeaderKey);
//       const verified = jwt.verify(token, jwtSecretKey);
//       if(verified){
//           return res.send("Successfully Verified");
//       }else{
//           // Access Denied
//           return res.status(401).send(error);
//       }
//   } catch (error) {
//       // Access Denied
//       return res.status(401).send(error);
//   }
// });

//
// task.job.start()
