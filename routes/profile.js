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
  console.log(req.body);
    const productTitle = req.body.productTitle
    const productDescription = req.body.productDescription
    const productPrice = req.body.productPrice
    //const idUser = req.body._id;
    console.log("-------------------")
  
    const newProduct = new Product({
      title: productTitle,
      description: productDescription,
      price: productPrice,
      //photo: productPhoto,
      // ENTRAR DENTRO DEL USUARIO Y DECIR QUE SELLER: TRUE
      // idUser: idUser
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

profileRoutes.get("/favorites", ensureLoggedIn("/login"), (req, res, next)=> {
   
    } );

  





module.exports = profileRoutes;