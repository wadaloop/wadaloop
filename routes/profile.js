const express = require("express");
const passport = require("passport");
const profileRoutes = express.Router();
const multer = require("multer");
const User = require("../models/User");
const Product = require("../models/Product");
const Favorite = require("../models/Favorite");
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");
const uploadCloud = require("../middlewares/cloudinary.js");
const onlyMe = require('../middlewares/onlyMe');

//-----------------PROFILE--------------------


profileRoutes.get("/:id", ensureLoggedIn("/auth/login"), onlyMe, (req, res, next) => {
  let id = req.params.id;
  return Promise.all([
    User.findById(id),
    Product.find({user:id})
  ])
  .then(products => {
    user = products[0]
    productsTrim = products.splice(1)[0]
    res.render("profile", {productsTrim, user})
  })
  .catch(err => {
    console.log(err);
    next(err);
  })
});


profileRoutes.post("/edit/:id",uploadCloud.single("profilePhoto"),ensureLoggedIn("/auth/login"), onlyMe, (req, res, next) => {
    const updates = {
      user: req.session.passport.user,
      imgProfile: req.file.url
    }
    console.log(updates)
    User.findByIdAndUpdate( updates.user, updates.imgProfile, (err) => {
      if (err) {
        console.log("--------------")
        console.log(err)
        res.render("profile", { message: "Something went wrong" });
      } else { res.render("profile"); }
    });
  }
);
//---------------CREAR PRODUCTO---------------
profileRoutes.post("/:id", ensureLoggedIn("/auth/login"), uploadCloud.single("productPhoto"), onlyMe, (req, res, next) => {
    console.log('in')
    const productTitle = req.body.productTitle;
    const productDescription = req.body.productDescription;
    const productPrice = req.body.productPrice;

    const imgName = req.file.originalname;
    const imgPath = req.file.url;

    const newProduct = new Product({
      title: productTitle,
      description: productDescription,
      price: productPrice,
      user: req.session.passport.user,
      imgName: imgName,
      imgPath: imgPath
    });
    console.log(newProduct)
    newProduct.save()
    .then( product=> {
      console.log(req.body)
      console.log(req.session.passport.user)
      res.redirect(`/profile/${req.body.user}`,{successMessagge:'Product created!'})
    })
    .catch(err=>{
        console.log(err)
        res.render(`/profile/${req.body.id}`, {errorMessagge:'Product not created'})
      })
      



    /* newProduct.save(err => {
      if (err) {
        console.log("error");
        res.redirect("profile", { message: "Something went wrong" });
      } else {
        res.redirect(`/profile/${req.body.id}`);
      }
    }); */
  });


module.exports = profileRoutes;