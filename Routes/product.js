const express = require("express");
const products = require("../models/products");
const productDetails = require("../models/productDetail");
const routes = express.Router();
routes.get("/products", (req, res) => {
  products.findAll().then((rest) => {
    const arrayofResult = rest.map((current) => {
      return current.dataValues;
    });
    return res.status(200).json(arrayofResult);
  });
});
routes.get("/productDetails/:id", (req, res) => {
  productDetails.findOne({where:{
    productId:1
  }}).then(result=>{
    return res.status(201).json(result)
  }).catch(err=>console.log(err))
})
module.exports = routes;
