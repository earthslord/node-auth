const express = require("express");
const router = express.Router();
const register = require("./register");
const login = require("./login");
const logout = require("./logout");

router.post("/register", register); //post entered data
router.post("/login", login);

module.exports = router;