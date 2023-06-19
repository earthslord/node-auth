const express = require("express");
const router = express.Router();
const loggedin = require("../controllers/loggedin");
const logout = require("../controllers/logout");

router.get("/", loggedin, (req, res) =>{
    if(req.user){
        res.render("index", {status:"logged in", user:req.user});
    }
    else{
        res.render("index", {status:"not logged in", user:"foo"})
    }
})

router.get("/register", (req, res) =>{
    res.sendFile("register.html", {root:"./public"});

})

router.get("/login", (req, res) =>{
    res.sendFile("login.html", {root:"./public/"});
})

router.get("/logout", logout); // no posting required

module.exports = router;