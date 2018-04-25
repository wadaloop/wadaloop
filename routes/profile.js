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
profileRoutes.get("/me", ensureLoggedIn("/auth/login"), (req, res, next) => {
  console.log(res.locals)
  let id = res.locals.user._id
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
//----------------SHOW SELLING PRODUCTS----------
profileRoutes.get("/:id", ensureLoggedIn("/auth/login"), (req, res, next) => {
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

//---------------CREAR PRODUCTO-----------------
profileRoutes.post("/:id", ensureLoggedIn("/auth/login"), uploadCloud.single("productPhoto"), onlyMe, (req, res, next) => {
    console.log('in')
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
    console.log(newProduct)
    newProduct.save()
    .then( product=> {
      console.log(req.body)
      console.log(req.session.passport.user)
      res.redirect("/profile/me")
    })
    .catch(err=>{
        console.log(err)
        res.redirect("/profile/me")
      })
  });

//--------------DELETE PRODUCT------------------
profileRoutes.post("/:id/delete", ensureLoggedIn("/auth/login"), (req, res, next) => {
  
  Product.findByIdAndRemove(req.params.id).then(() => {
    res.redirect("/profile/me");
  })
  .catch(err => {
    res.render("error", err);
  });
});

//--------------EDIT PRODUCT--------------------
profileRoutes.get("/:id/edit", ensureLoggedIn("/auth/login"), (req, res, next) => {
  
  Product.findById(req.params.id).then(product => {
    res.render("editProduct", {product});
  })
  .catch(err => {
    res.render("error", err);
  });
});

profileRoutes.post("/:id/edit", ensureLoggedIn("/auth/login"), uploadCloud.single("productPhoto"), (req, res, next) => {
  const {title, description, price} = req.body;
  let productEdited = {title, description, price}
  if(req.file){
    productEdited = {title, description, price, imgName:req.file.originalname, imgPath: req.file.url}; 
  }
  Product.findByIdAndUpdate(req.params.id, productEdited)
    .then(() => {
      res.redirect("/profile/me");
    })  
    .catch(err => {
      res.render("error", err);
    });

});


profileRoutes.get((req, res, next) => {
  Product.find((error, product) => {
    if (error) { next(error); }
    else {
      res.render('product/:id', { restaurants });
    }
  })
})



module.exports = profileRoutes;