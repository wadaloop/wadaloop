const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

/* GET home page */
router.get("/", (req, res, next) => {
  Product.find()
    .then(theProduct => {
      res.render("index", { user: req.user, theProduct });
    })
    .catch(err => {
      console.log(err);
    });
});

/* GET home page filtered */
router.get("/filterByDistance/", (req, res, next) => {
  let userLoc = req.query;

  Product.find({ APIlocation: { $near: { $geometry: { type: "Point", coordinates: [userLoc.long, userLoc.lat] }}} })
    .then(theProduct => {
      res.render("index", { user: req.user, theProduct, userLoc });
    })
    .catch(err => { console.log(err); });
});

module.exports = router;
