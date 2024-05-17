const mongoose = require("mongoose");

const growerProfileSchema = new mongoose.Schema(
   {

      g_email:{type:String, unique:true,required:true} ,
      g_name: {type:String, required:true},
      g_contact: {type:String, required:true},
      g_address: {type:String, required:true},
      g_city: {type:String, required:true},
      g_state: {type:String, required:true},
      g_aadhar: {type:String, required:true},
      g_otherInfo: {type:String, required:true},
      g_profile_pic: {type:String, required:true},
      g_proof_pic: {type:String, required:true} 
   },
   {
      versionKey:false
   }
)

const growerProfile_Model = mongoose.model("growerProfile_Data", growerProfileSchema);
module.exports=growerProfile_Model;