
const Order = require("../models/order");


exports.AllOrders=async (req, res) => {
    const result = await Order.findAll({ where: { userId: req.user.userId } });
    return res.status(200).json(result);
  }