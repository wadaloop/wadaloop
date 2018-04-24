const mongoose = require("mongoose");
const User = require("../models/User");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    user: { type: Schema.Types.ObjectId, ref: "User" },
    imgName: String,
    imgPath: String,
    APItypePoint: String,
    APIlocation: { type: { type: String }, coordinates: [Number] }
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;