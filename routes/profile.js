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
  res.render("profile");
});

profileRoutes.post(
  "/profilePhoto",
  uploadCloud.single("profilePhoto"),
  (req, res, next) => {
    const imgProfileName = req.file.originalname;
    const imgProfilePath = req.file.url;

    const newProfileImg = new Product({
      user: req.session.passport.user,
      imgProfileName: imgProfileName,
      imgProfilePath: imgProfilePath
    });

    newProfileImg.save(err => {
      if (err) {
        console.log("--------------")
        console.log(err)
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

module.exports = profileRoutes;
