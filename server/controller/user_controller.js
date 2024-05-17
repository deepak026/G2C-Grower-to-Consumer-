const path = require("path");
const SignupData_Model = require("../models/modelSignUpData");
const jwt = require("jsonwebtoken");

function saveSignUpInfo(req, resp) {
  resp.set("json");

  var doc = new SignupData_Model(req.body);

  doc
    .save()
    .then((doc) => {
      resp.json({ status: true, msg: "Record Saved", doc: doc });
    })
    .catch((error) => {
      resp.json({ status: false, msg: error.toString() });
    });
}
async function authLoginInfo(req, resp) {
  resp.set("json");

  var email = req.body.useremail;
  var password = req.body.password;

  await SignupData_Model.find({ useremail: email }).
  then(([data]) =>{
    if(data){
      if(data.password = password){

        //creating json web token for authentication/authorization
        let skey = process.env.SEC_KEY;
        let token=jwt.sign({email}, skey, {expiresIn:"20m"});
        console.log("** token generated **");
        // console.log(token);
        // console.log(data.utype);
        resp.json({status:true, msg:"Login Successfull", utype:data.utype, jtoken:token});
      }else{
        resp.json({status:false, msg:"Incorrect email/password"});
      }
    }else{
      resp.json({status:false, msg:"Email does not exists"});
    }
  }).
  catch((error)=>console.log(error));
}

module.exports = { saveSignUpInfo, authLoginInfo };
