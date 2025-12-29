const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  category: String,
  description: String,
  price: Number,
  image: String,
  features: [String]
});

module.exports = mongoose.model("Product", productSchema);
