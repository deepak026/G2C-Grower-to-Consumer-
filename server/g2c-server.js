const express = require("express");
const mongoose = require("mongoose");
const fileuploader=require("express-fileupload");
const dotenv = require("dotenv");

const route_user = require("./routes/route_user");
const route_grower = require("./routes/route_grower");
const route_consumer = require("./routes/route_consumer");
const cors = require("cors");
const bodyParser = require('body-parser');

const SignupData_Model = require("./models/modelSignUpData");
const growerProfile_Model = require("./models/modelGrowerProfile");
const listNewProduct_Model = require("./models/modelListNewProduct");


const app = express();

app.use(cors());
app.use(fileuploader());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


dotenv.config(); //key value pair in .env file will be added in process.env object 

app.listen(2000, ()=>{
   console.log("Server running on port 2000");
})

//database connectivity
const mongoCon = mongoose
  // .connect("mongodb://localhost:27017/proj2024")
  .connect("mongodb+srv://new_user:password123*@g2c-database.4olfdju.mongodb.net/proj2024")
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Error" + err.toString());
  });
app.get("/", (req, resp)=>{
   resp.send("Home page");
})


//get all info
app.get("/getAllinfo", (req, resp) => {
  SignupData_Model.find()
    .then((doc) => {
      resp.send(doc);
    })
    .catch((error) => {
      resp.send(error);
    });
});
app.get("/getGrowerInfo", (req, resp) => {
  growerProfile_Model.find()
    .then((doc) => {
      resp.send(doc);
    })
    .catch((error) => {
      resp.send(error);
    });
});
app.get("/getProducts", (req, resp) => {
  listNewProduct_Model.find()
    .then((doc) => {
      resp.send(doc);
    })
    .catch((error) => {
      resp.send(error);
    });
});
app.use("/user", route_user);
app.use("/grower", route_grower);
app.use("/consumer", route_consumer);
