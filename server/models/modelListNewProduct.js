const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  category: { type: String, required: true },
  product: { type: String, required: true },
  price: { type: String, required: true },
  unit: { type: String, required: true },
  description: { type: String, required: true },
  product_pic: { type: String, required: true },
});

const listNewProductSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true, required: true },
    city: { type: String, required: true },
    products: [productSchema],
  },
  {
    versionKey: false,
  }
);

const listNewProduct_Model = mongoose.model(
  "ListedProducts_Data",
  listNewProductSchema
);
module.exports = listNewProduct_Model;
