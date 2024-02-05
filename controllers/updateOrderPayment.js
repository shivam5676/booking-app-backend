
const Order = require("../models/order");


exports.updateOrdersdb=async (req, res) => {
    const result = await Order.findAll({ where: { orderId: req.query.orderId } });

  
    
    await Order.update(
      { paymentId: req.body.payment_id, status: "paid" },
      {
        where: { orderId: req.query.orderId },
      }
    );
    return res.status(200).json("payment done");
  }