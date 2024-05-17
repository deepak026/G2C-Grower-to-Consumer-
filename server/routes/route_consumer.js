const express = require("express");
const {doFindAllGrowerData} = require("../controller/consumer_controller")
const app = express.Router();

app.post("/findAllGrowerdata", doFindAllGrowerData);

module.exports = app;