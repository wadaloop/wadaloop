const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const User = require("../models/User");
const Product = require("../models/Product");

const favoritesSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Favorites = mongoose.model('Favorites', favoritesSchema);
module.exports = Favorites;
