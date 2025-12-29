const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  image: String,
  features: [String]
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
