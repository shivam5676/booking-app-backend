
exports.couponsList=(req, res) => {
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
  }