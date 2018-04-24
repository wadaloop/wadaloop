const express = require("express");
const passport = require('passport');
const productRoutes = express.Router();
const Product = require("../models/Product");
const Favorite = require("../models/Favorite");



//-------------SHOW PRODUCT---------------------
productRoutes.get("/:id", (req, res, next) => {
  const id = req.params.id;

  Product.findById(id)
  .then( theProduct => res.render("product", {theProduct}) )
  .catch( err => {
    console.log(err);
    next(err);
  })
})

//-------------CREATE FAVORITE PRODUCT---------------------
productRoutes.get("/:id/favorite", (req, res, next) => {
  const favoriteInfo = {
    favoriteProduct: req.body.product,
    user: req.session.passport.user
  }
  const newFavorite = new Favorite(favoriteInfo);

  newFavorite.save( (err) => {
    if(err) {
      next(err);
      return;
    }
    res.redirect("/favorites");
})
})



module.exports = productRoutes;