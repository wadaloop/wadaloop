const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


/* GET home page */
router.get("/", (req, res, next) => {
  Product.find()
  .then(theProduct => {
    res.render("index", { user: req.user, theProduct });
  })
  .catch(err => { console.log(err) })
});



module.exports = router;
