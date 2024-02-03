const express = require("express");
const products = require("../models/products");
const productDetails = require("../models/productDetail");
const Cart = require("../models/cart");
const { Sequelize } = require("sequelize");
const Razorpay = require("razorpay");
const Order = require("../models/order");
const dotenv = require("dotenv").config();

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
  console.log(req.params);
  productDetails
    .findOne({
      where: {
        productId: req.params.id,
      },
      include: products,
    })
    .then((result) => {
      console.log(result);
      return res.status(201).json(result);
    })
    .catch((err) => console.log(err));
});
routes.post("/addItem", (req, res) => {
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
              userId: 1,
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
            userId: 1,
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
});
routes.get("/fetchCart", (req, res) => {
  Cart.findAll({ where: { userId: 1 }, include: [products] }).then(
    (response) => {
      return res.status(200).json(response);
    }
  );
});
routes.get("/couponVerify", (req, res) => {
  console.log(req.query.coupon == "myindia20", req.query.coupon);
  if (!req.query.coupon) {
    return res
      .status(400)
      .json({ msg: "invalid coupon", status: "failed", data: "0%" });
  } else if (req.query.coupon.toLowerCase() == "myindia20") {
    return res
      .status(200)
      .json({ msg: "*20% off coupon applied", status: "success", data: "20%" });
  } else if (req.query.coupon.toLowerCase() == "beautifulindia") {
    return res
      .status(200)
      .json({ msg: "*30% off coupon applied", status: "success", data: "30%" });
  } else if (req.query.coupon.toLowerCase() == "shivam") {
    return res
      .status(200)
      .json({ msg: "*50% off coupon applied", status: "success", data: "50%" });
  } else {
    return res
      .status(400)
      .json({ msg: "invalid coupon", status: "failed", data: "null" });
  }
});

routes.post("/createOrder", async (req, res) => {
  console.log(req.body);
  const productIdArray = req.body.productIdArray;
  let coupon = req.body.coupon.toLowerCase();
  if (!coupon) {
    console.log("cou");
    coupon = "0%";
  } else if (coupon == "myindia20") {
    coupon = "20%";
  } else if (coupon == "beautifulindia") {
    coupon = "30%";
  } else if (coupon == "shivam") {
    coupon = "50%";
  } else {
    coupon = "0%";
  }
  coupon = coupon.replace("%", "");

  const result = await Cart.findAll({
    where: {
      id: { [Sequelize.Op.in]: productIdArray },
    },
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
    include: [
      {
        model: products,
        attributes: ["image", "name", "price"],
      },
    ],
  });
  // console.log(result)
  //const totalAmount = current.product.price * current.quantity;
  // payableAmountviaRazorPay = payableAmountviaRazorPay + totalAmount;
  let payableAmountviaRazorPay = result.reduce((previousAmount, current) => {
    return previousAmount + current.product.price * current.quantity;
  }, 0);
  console.log(payableAmountviaRazorPay);
  payableAmountviaRazorPay = (payableAmountviaRazorPay * (100 - coupon)) / 100;
  console.log(payableAmountviaRazorPay);

  var rzr = new Razorpay({
    key_id: "rzp_test_hQKSaZFRZsnpbi",
    key_secret: process.env.RAZORPAY_SECRET,
  });
  rzr.orders.create(
    {
      amount: +(payableAmountviaRazorPay * 100),
      currency: "INR",
    },
    async (err, order) => {
      if (err) {
        console.log("orderFields", err);
        return res.status(400).json(err);
      } else {
        const orderFields = result.map((current) => {
          const totalAmount = current.product.price * current.quantity;
          return {
            userId: current.userId,
            name: current.product.name,
            image: current.product.image,
            quantity: current.quantity,
            payable: (totalAmount * (100 - coupon)) / 100,
            orderId: order.id,
          };
        });
        // console.log(orderFields);
        // return res.status(201).json({ order: order.id, key_id: rzr.key_id });
        Order.bulkCreate(orderFields)
          .then((result) => {
            console.log(result);
            return Cart.destroy({ where: { id: productIdArray } });
          })
          .catch((err) => console.log(err));

        return res.status(201).json({ order: order.id, key_id: rzr.key_id });
      }
    }
  );
});
routes.post("/successfulOrder", async (req, res) => {
  const result = await Order.findAll({ where: { orderId: req.query.orderId } });

  //  console.log(updatedColumn)
  //  updatedColumn.bulkCreate()

  console.log(
    await Order.update(
      { paymentId: req.body.paymentId, status: "paid" },
      {
        where: { orderId: req.query.orderId },
      }
    )
  );
});
routes.get("/fetchOrders", async (req, res) => {
  const result = await Order.findAll({ where: { userId: req.query.userid } });
  return res.status(200).json(result)
});
module.exports = routes;
