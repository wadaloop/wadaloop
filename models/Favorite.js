const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require("../models/User");
const Product = require("../models/Product");

const favoriteSchema = new Schema({
  favoriteProduct: { type: Schema.Types.ObjectId, ref: 'Product' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Favorite = mongoose.model('Favorite', favoriteSchema);
module.exports = Favorite;
