const express = require("express");
const products = require("../models/products");

const Cart = require("../models/cart");

exports.cartItems=(req, res) => {
    Cart.findAll({ where: { bookinguserId: req.user.userId }, include: [products] }).then(
      (response) => {
        return res.status(200).json(response);
      }
    );
  }