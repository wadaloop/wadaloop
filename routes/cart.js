const express = require("express");
const passport = require('passport');
const cartRoutes = express.Router();
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const User = require("../models/User");
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");

//-------------CREATE CART PRODUCT---------------------
cartRoutes.get("/:id", ensureLoggedIn("/auth/login"), (req, res, next) => {
  const cartInfo = {
    cartProduct: req.body.cart,
    user: req.session.passport.user,
    product: req.params.id

  }
  const newCart = new Cart(cartInfo);

  newCart.save( (err) => {
    if(err) {
      //res.redirect("/login");
      next(err);
      return;
    }
    res.redirect("/cart");
})
})


//-------------DELETE CART PRODUCT-------------------
cartRoutes.post("/:id/delete", ensureLoggedIn("/login"), (req, res, next) => {
  Cart.findByIdAndRemove(req.params.id).then(() => {
    res.redirect("/cart");
  })
  .catch(err => {
    res.render("error", err);
  });
});

//-------------SHOW CART PRODUCT---------------------
cartRoutes.get("/", ensureLoggedIn("/login"), (req, res, next)=>{
  Cart.find({user: req.user._id})
  .populate('product')
  .then(carts =>{
    console.log(carts)
    totalPrice = carts.reduce((acc,p)=>{
      return acc+p.product.price
    },0)
    console.log(totalPrice)
    res.render('cart', { allCarts: carts, totalPrice   })
  })
  .catch(e=>console.log(e))
});



module.exports = cartRoutes;