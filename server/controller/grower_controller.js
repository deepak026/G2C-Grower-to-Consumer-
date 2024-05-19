const path = require("path");
const fs = require("fs");

const growerProfile_Model = require("../models/modelGrowerProfile");
const listNewProduct_Model = require("../models/modelListNewProduct");

function createNewDir(dirPath) {
  //  const dirPath = path.join(__dirname, "..", "uploads","profile", email);
  // Use recursive: true to ensure all parent directories are created if they don't exist
  fs.mkdir(dirPath, { recursive: true }, (err) => {
    if (err) {
      console.log("Error creating directory:", err);
    } else {
      // console.log("Directory ensured");
    }
  });
}
function doUpdateGrowerProfile(req, resp) {
  // console.log(req.files);
  resp.set("json");
  //create new directrory for saving profile and proof pic
  const profileDirPath = path.join(
    __dirname,
    "..",
    "uploads",
    "profile",
    req.body.g_email
  );
  createNewDir(profileDirPath);
  // console.log(req.files.g_profile_pic.name);
  var profileName = "noPic";
  var proofName = "noPic";
  // console.log(req.files);

  if (req.files != null) {
    profileName = "profile_" + req.body.g_name + ".png";
    var profilePath = path.join(
      __dirname,
      "..",
      "uploads",
      "profile",
      req.body.g_email,
      profileName
    );
    req.files.g_profile_pic.mv(profilePath);

    proofName = "proof_" + req.body.g_name + ".png";
    var proofPath = path.join(
      __dirname,
      "..",
      "uploads",
      "profile",
      req.body.g_email,
      proofName
    );
    req.files.g_proof_pic.mv(proofPath);
  }

  req.body.g_profile_pic = profileName;
  req.body.g_proof_pic = proofName;

  const newData = {
    ...req.body,
    g_profile_pic: profileName,
    g_proof_pic: proofName,
  };

  growerProfile_Model
    .findOneAndUpdate(
      { g_email: req.body.g_email }, //filter
      newData, //new data to update
      { new: true, upsert: true, runValidators: true }
    ) //options
    .then((doc) => {
      resp.json({ status: true, msg: "Record Updated", doc: doc });
    })
    .catch((err) => {
      resp.json({ status: false, msg: err.toString() });
    });
  //   var doc = new growerProfile_Model(req.body);

  //   doc
  //     .save()
  //     .then((doc) => {
  //       resp.json({ status: true, msg: "Record Updated", doc: doc });
  //     })
  //     .catch((error) => {
  //       resp.json({ status: false, msg: error.toString() });
  //     });
}

function doFetchGrowerProfile(req, resp) {
  resp.set("json");

  growerProfile_Model
    .find(req.body)
    .then((doc) => {
      resp.json({ status: true, msg: "Record Found", doc: doc });
    })
    .catch((error) => {
      resp.json({ status: false, msg: error.toString() });
    });
}

function doListNewProducts(req, resp) {
  // resp.set("json");
  // resp.send({msg:"hello"});
  const { email, city } = req.body;

  // console.log(req.body);
  const productDirPath = path.join(
    __dirname,
    "..",
    "uploads",
    "new_products",
    req.body.email
  );
  createNewDir(productDirPath);

  // createNewDir(__dirname, "..", "uploads","new_products", req.body.email);

  var productName = "noImg";
  if (req.files != null) {
    productName = req.body.category + "_" + req.body.product + ".png";
    var productImgPath = path.join(
      __dirname,
      "..",
      "uploads",
      "new_products",
      req.body.email,
      productName
    );
    req.files.product_pic.mv(productImgPath);
  }
  req.body.product_pic = productName;

  const newProduct = {
    category: req.body.category,
    product: req.body.product,
    price: req.body.price,
    unit: req.body.unit,
    description: req.body.description,
    product_pic: req.body.product_pic
  };
  listNewProduct_Model.findOne({email:email, city:city})
  .then((existingGrower)=>{
    if(existingGrower){
      const isNewProductListed = existingGrower.products.some(product=>{
        return (
          product.category === newProduct.category &&
          product.product === newProduct.product
        );
      });

      if(isNewProductListed){
        resp.json({status:false, msg:"Product already Listed"});
      }else{
        existingGrower.products.push(newProduct);
        existingGrower.save()
        .then(()=>{
          resp.json({status:true, msg:"Product Listed"});
        })
        .catch(()=>{
          resp.json({status:false, msg:"Product Not Listed"});
        });
      }
    }
    else{
      const newGrower = {
        email, city,
        products:[newProduct]
      };
      listNewProduct_Model.create(newGrower)
      .then(doc=>resp.json({status:true, msg:"Product Listed"}))
      .catch(error=>resp.json({status:false, msg:error.toString()}));
    }
  })
  .catch((error)=>{
    resp.json({status:false, msg:error.toString()});
  })
}

function doFetchProducts(req, resp){
  var email = req.query.email;
  // console.log(email);
  listNewProduct_Model.find({email:email})
    .then((doc) => {
      // console.log(doc);
      resp.send(doc);
    })
    .catch((error) => {
      resp.send(error);
    });
}

function doDeleteProduct(req, resp){
  resp.set("json");
  let {email, productId} = req.query;
  // console.log(email);
  // console.log(productId);
  listNewProduct_Model.findOneAndUpdate(
    {email:email},
    {$pull:{products:{_id:productId}}},
    {new:true}
  )
  .then(doc=>{
    if(!doc){
      return resp.json({status:false,msg:"No record found"});
    }else{
      return resp.json({status:true,data:doc.products});
    }
  }).catch(err=>console.log(err));
}

async function getGrowerInfo(req, resp) {
  try {
    const email = req.query.email;
    const doc = await growerProfile_Model.find({ g_email: email });

    if (doc.length > 0) {
    //   const profileName = "profile_" + doc[0].g_name + ".png";
    //   const profileImgPath = path.join(__dirname, '..', 'uploads', 'profile', email, profileName);

    //   try {
    //     const profileImageData = await fs.readFile(profileImgPath);
    //     console.log(profileImageData);
    //     const base64Image = profileImageData.toString('base64');
    //     doc[0].g_profile_pic = base64Image;
    //   } catch (err) {
    //     console.error("Error reading profile image:", err);
    //     doc[0].g_profile_pic = null;
    //   }

      resp.send(doc);
    } else {
      resp.send({ msg: "Grower not found" });
    }
  } catch (error) {
    console.error("Error fetching grower info:", error);
    resp.status(500).send({ msg: "Internal server error" });
  }
}
function doUpdateProduct(req, resp){
  resp.send("Saved")
}


module.exports = {
  doUpdateGrowerProfile,
  doFetchGrowerProfile,
  doListNewProducts,
  doFetchProducts,
  doDeleteProduct,
  getGrowerInfo,
  doUpdateProduct,
};
