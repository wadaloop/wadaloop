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



module.exports = productRoutes;