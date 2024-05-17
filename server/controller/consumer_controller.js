const growerProfile_Model = require("../models/modelGrowerProfile");
const listNewProduct_Model = require("../models/modelListNewProduct");

function doFindAllGrowerData(req, resp) {
  listNewProduct_Model
    .find()
    .then((doc) => {resp.send(doc)})
    .catch((error)=>{
      resp.send(error.toString());
    });
}

module.exports = { doFindAllGrowerData };
