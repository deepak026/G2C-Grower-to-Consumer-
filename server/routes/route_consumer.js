const express = require("express");
const {doFindAllGrowerData} = require("../controller/consumer_controller")
const app = express.Router();

app.get("/findAllGrowerdata", doFindAllGrowerData);

module.exports = app;