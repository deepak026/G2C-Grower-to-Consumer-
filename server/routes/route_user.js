const express = require("express");
var {saveSignUpInfo, authLoginInfo} = require("../controller/user_controller");
const app = express.Router();

app.post("/saveSignUpInfo", saveSignUpInfo);
app.post("/authLoginInfo", authLoginInfo);

module.exports = app;