/* require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/Product");
const dbURL = process.env.DBURL;



const item = [
  {title: "producto1",
    description: "prueba producto1",
    price: 19,
    pickupDate: Date,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }];
   


mongoose.connect('mongodb://localhost/wadaloop').then(() => {console.log('Connected to Mongo!')})

Product.create(item,(err,item)=>{




  if(err){
    throw err;
  }
  console.log(item)
}) */
