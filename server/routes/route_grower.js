const express = require("express");

const {
  doUpdateGrowerProfile,
  doListNewProducts,
  doFetchProducts,
  doDeleteProduct,
  getGrowerInfo,
  doUpdateProduct
} = require("../controller/grower_controller");
const {doTokenValidation1} = require("../services/tokenValidator");
const app = express.Router();

app.post("/updateGrowerProfile", doUpdateGrowerProfile);
app.post("/listNewProducts", doListNewProducts);
app.get("/fetchProducts", doTokenValidation1,doFetchProducts);
app.get("/deleteProduct", doDeleteProduct);
app.get("/growerInfo", getGrowerInfo);
app.post("/updateProduct", doUpdateProduct);
app.get("/tokenValidation1", doTokenValidation1);
module.exports = app;
