const express = require("express");
const passport = require("passport");
const profileRoutes = express.Router();
const multer = require("multer");
const User = require("../models/User");
const Product = require("../models/Product");
const Favorite = require("../models/Favorite");
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");
const uploadCloud = require("../middlewares/cloudinary.js");

//-----------------PROFILE--------------------
profileRoutes.get("/", ensureLoggedIn("/login"), (req, res, next) => {
  res.render("profile", { user: req.user });
});

profileRoutes.post(
  "/edit/:id",
  uploadCloud.single("profilePhoto"),
  (req, res, next) => {
    const updates = {
      user: req.session.passport.user,
      imgProfile: req.file.url
    };
    console.log(updates);
    User.findByIdAndUpdate(updates.user, updates.imgProfile, err => {
      if (err) {
        console.log("--------------");
        console.log(err);
        res.render("profile", { message: "Something went wrong" });
      } else {
        res.render("profile");
      }
    });
  }
);

profileRoutes.post(
  "/",
  uploadCloud.single("productPhoto"),
  (req, res, next) => {
    console.log(res)
    const productTitle = req.body.productTitle;
    const productDescription = req.body.productDescription;
    const productPrice = req.body.productPrice;
    
    const imgName = req.file.originalname;
    const imgPath = req.file.url;
    let location = {
      type: "Point",
      coordinates: [req.body.longitude, req.body.latitude]
    };

    const newProduct = new Product({
      title: productTitle,
      description: productDescription,
      price: productPrice,
      user: req.session.passport.user,
      imgName: imgName,
      imgPath: imgPath,
      APIlocation: location
    });

    newProduct.save(err => {
      if (err) {
        console.log("error");
        res.render("profile", { message: "Something went wrong" });
      } else {
        res.render("profile");
      }
    });
  }
);



profileRoutes.get((req, res, next) => {
  Product.find((error, product) => {
    if (error) { next(error); }
    else {
      res.render('product/:id', { restaurants });
    }
  })
})



module.exports = profileRoutes;