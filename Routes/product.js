const express = require("express");
const products = require("../models/products");
const productDetails = require("../models/productDetail");
const Cart = require("../models/cart");
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
  console.log(req.params)
  productDetails
    .findOne({
      where: {
        productId: req.params.id,
      },
      include:products
    })
    .then((result) => {
      console.log(result)
      return res.status(201).json(result);
    })
    .catch((err) => console.log(err));
});
routes.post("/addItem", (req, res) => {
  const prodId=req.query.pid
  console.log(prodId)
  
  products
    .findOne({
      where: { id: prodId },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    })
    .then(async (rest) => {
      // console.log(rest)
      // return;
      if (rest) {
        try {
          const saved = await Cart.create({quantity:1,userId:2});
          return res.status(200).json({data:({...rest, ...saved})});
        } catch (err) {
          console.log(err);
          return;
        }
      }
      // return res.status(400).json({ msg: err, status: "failed" });
    })
    .catch((err) => {
      console.log(err);
    });
});
routes.get("/fetchCart", (req, res) => {
  Cart.findAll({where:{userId:2}}).then(response=>{
  return res.status(200).json(response)
  })
})
module.exports = routes;
