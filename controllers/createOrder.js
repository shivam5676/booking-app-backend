const express = require("express");
const products = require("../models/products");

const Cart = require("../models/cart");
const { Sequelize } = require("sequelize");
const Razorpay = require("razorpay");
const Order = require("../models/order");


exports.createOrder=async (req, res) => {
  
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
 
    let payableAmountviaRazorPay = result.reduce((previousAmount, current) => {
      return previousAmount + current.product.price * current.quantity;
    }, 0);
   
    payableAmountviaRazorPay = (payableAmountviaRazorPay * (100 - coupon)) / 100;
   
  
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
          
          Order.bulkCreate(orderFields)
            .then((result) => {
              
              return Cart.destroy({ where: { id: productIdArray } });
            })
            .catch((err) => console.log(err));
  
          return res.status(201).json({ order: order.id, key_id: rzr.key_id });
        }
      }
    );
  }