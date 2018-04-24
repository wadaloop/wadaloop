const express = require("express");
const passport = require('passport');
const favoriteRoutes = express.Router();
const Product = require("../models/Product");
const Favorite = require("../models/Favorite");
const User = require("../models/User");
const ensureLoggedIn = require("../middlewares/ensureLoggedIn");

//-------------CREATE FAVORITE PRODUCT---------------------
favoriteRoutes.get("/:id", ensureLoggedIn("/login"), (req, res, next) => {
  const favoriteInfo = {
    favoriteProduct: req.body.favorite,
    user: req.session.passport.user,
    product: req.params.id

  }
  const newFavorite = new Favorite(favoriteInfo);

  newFavorite.save( (err) => {
    if(err) {
      //res.redirect("/login");
      next(err);
      return;
    }
    res.redirect("/favorite");
})
})


//-------------DELETE FAVORITE PRODUCT-------------------
favoriteRoutes.post("/:id/delete", ensureLoggedIn("/login"), (req, res, next) => {
  Favorite.findByIdAndRemove(req.params.id).then(() => {
    res.redirect("/favorite");
  })
  .catch(err => {
    res.render("error", err);
  });
});

//-------------SHOW FAVORITE PRODUCT---------------------
favoriteRoutes.get("/", ensureLoggedIn("/login"), (req, res, next)=>{
  console.log(res)
  Favorite.find({user: req.user._id}, (err, myFavorites) => {
    if (err) { return next(err); }

    res.render('favorite', { favorites: myFavorites });
  });

});



module.exports = favoriteRoutes;