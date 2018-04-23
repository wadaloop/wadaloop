const express = require("express");
const passport = require('passport');
const profileRoutes = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");


profileRoutes.get("/", ensureLoggedIn("/login"), (req, res, next) => {
  res.render("profile");
});

profileRoutes.post("/", (req, res, next) => {
  console.log("----------req.body---------")
  console.log(req.body);
  console.log("xx")
  console.log("----------req.session---------")
  console.log(req.session);
  console.log("xx")
  console.log("----------req.session.passport.user---------")
  console.log(req.session.passport.user);
  console.log("xx")
  const productTitle = req.body.productTitle
  const productDescription = req.body.productDescription
  const productPrice = req.body.productPrice
  const newProduct = new Product({
    title: productTitle,
    description: productDescription,
    price: productPrice,
    user: req.session.passport.user
    //photo: productPhoto,
    // ENTRAR DENTRO DEL USUARIO Y DECIR QUE SELLER: TRUE
  });

  newProduct.save((err) => {
    if (err) {
      console.log("error")
      res.render("profile", { message: "Something went wrong" });
    } else {
      res.redirect("/");
    }
  });

});


module.exports = profileRoutes;