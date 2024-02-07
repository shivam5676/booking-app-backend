const express = require("express");
const products = require("../models/products");

const Cart = require("../models/cart");

exports.addItemInCart = (req, res) => {
  const prodId = req.query.pid;
  console.log(prodId);

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
          const itemSearch = await Cart.findOne({
            where: {
              bookinguserId: req.user.userId,
              productId: prodId,
            },
          });
          if (itemSearch) {
            //if same iem in cart present  then update it

            const saved = await itemSearch.update({
              quantity: itemSearch.quantity + 1,
            });
            return res.status(200).json({ ...saved.dataValues, product: rest });
          }

          const saved = await Cart.create({
            quantity: 1,
            bookinguserId: req.user.userId,
            productId: prodId,
          });
          return res.status(200).json({ ...saved.dataValues, product: rest });
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
};
