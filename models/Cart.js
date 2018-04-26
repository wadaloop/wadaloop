const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require("../models/User");
const Product = require("../models/Product");

const cartSchema = new Schema({
  cartProduct: { type: Schema.Types.ObjectId, ref: 'Cart' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  product: {type:Schema.Types.ObjectId, ref: 'Product'}

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;