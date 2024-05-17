const mongoose = require("mongoose");

var signup_schema = new mongoose.Schema(
   {
      useremail:{type:String, unique:true,required:true},
      password:{type:String, required: true},
      utype:String
   },
   {
      versionKey:false
   }
)

const SignupData_Model = mongoose.model("user_credentials", signup_schema);

module.exports=SignupData_Model