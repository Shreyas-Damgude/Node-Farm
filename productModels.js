const mongoose = require("mongoose");

// Schema
const productSchema = new mongoose.Schema({
  id: Number,
  productName: {
    type: String,
    required: [true, "Product must have a name"],
  },
  image: {
    type: String,
    required: [true, "Product must have a image"],
  },
  from: { type: String, required: [true, "Product must have a origin"] },
  nutrients: { type: String, required: [true, "Product must have nutrients"] },
  quantity: { type: String, required: [true, "Product must have quantity"] },
  price: { type: Number, required: [true, "Product must have a price"] },
  organic: { type: Boolean, default: true },
  description: String,
});

// Model
const Product = mongoose.model("Product", productSchema);

// Export
module.exports = Product;
