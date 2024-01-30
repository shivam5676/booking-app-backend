const express = require("express");
const products = require("../models/products");
const routes = express.Router();
routes.get("/products", (req, res) => {
  products.findAll().then((rest) => {
    const arrayofResult = rest.map((current) => {
      return current.dataValues;
    });
    return res.status(200).json(arrayofResult);
  });
});
module.exports = routes;
