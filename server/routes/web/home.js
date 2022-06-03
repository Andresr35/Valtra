var express = require("express");
var passport = require("passport");
const db = require("../../db");

var router = express.Router();

router.get("/",function(req,res){
    console.log("hello I am on the start page ");

    res.render("home/index");
})

router.get("/home",function(req,res){
    res.render("home/home");
})
router.get("/about",function(req,res){
    res.render("home/about");
})
router.get("/loginnnn",function(req,res){
    res.render("home/login");
})
router.get("/signup",function(req,res){
    res.render("home/signup");
})
router.post("/signup",function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;

    db.query('Select * from products where username = $1',[username],(err,res) =>{
        if (err){
            return next(err);
        }
    });
})

module.exports = router;