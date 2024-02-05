const express = require("express");
const products = require("../models/products");
const productDetails = require("../models/productDetail");




exports.productDEtails=(req, res) => {
    console.log("req.params");
    productDetails
      .findOne({
        where: {
          productId: req.params.id,
        },
        include: products,
      })
      .then((result) => {
     
        return res.status(201).json(result);
      })
      .catch((err) => console.log(err));
  }