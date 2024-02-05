const express = require("express");
const products = require("../models/products");


exports.productList=(req, res) => {
    products.findAll().then((rest) => {
      const arrayofResult = rest.map((current) => {
        return current.dataValues;
      });
      return res.status(200).json(arrayofResult);
    });
  }