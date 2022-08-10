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
const jwt = require('jsonwebtoken');
app.use(express.json());

const client = require("./utils/shopify");
//secret stuff
require("dotenv").config();

("use strict");

//setting up the server and views
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
//only allow https
app.use(function(request, response, next) {

  if (process.env.NODE_ENV != 'development' && !request.secure) {
     return response.redirect("https://" + request.headers.host + request.url);
  }

  next();
})
app.use(
  cors({
//     origin: ['http://192.168.0.93:3005'],
//     methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
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


//-------------------------------------------------this is testing authenticationss

/**
 * just makes a token depending on user id
 *
 * @param   {route}  /auth/login  [/auth/login description]
 *
 * @return  {[token]}               api token
 */
app.get("/auth/login", (req, res) => {

  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  let data = {userId: 12,}
  const token = jwt.sign(data, jwtSecretKey,{expiresIn:"2h"});
  res.send(token);
});

app.get("/protected",ensureToken,(req,res)=>{
  jwt.verify(req.token,process.env.JWT_SECRET_KEY,(err,data)=>{
    if(err){
      res.sendStatus(403);
    }
    else{
      res.json({text:"this is protexted",data:data})
    }
  }) 

});

/**
 * makes sure that you have a token attatched
 *
 *
 * @return  {token?}        [return description]
 */
function ensureToken(req,res,next){ 
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
  } else {
    res.sendStatus(403);
  }

}


app.get("/user/validateToken", (req, res) => {
  // Tokens are generally passed in the header of the request
  // Due to security reasons.
  let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
  let jwtSecretKey = process.env.JWT_SECRET_KEY;
  try {
      const token = req.header(tokenHeaderKey);
      const verified = jwt.verify(token, jwtSecretKey);
      if(verified){
          return res.send("Successfully Verified");
      }else{
          // Access Denied
          return res.status(401).send(error);
      }
  } catch (error) {
      // Access Denied
      return res.status(401).send(error);
  }
});

// 
// task.job.start()
