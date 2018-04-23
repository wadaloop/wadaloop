const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require("../models/User");

const productSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  //photo: String
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;