const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./Routes/product");
const sequelize = require("./util/Database");
const products = require("./models/products");
const productDetails = require("./models/productDetail");
const Cart = require("./models/cart");
const users = require("./models/user");
const Order = require("./models/order");
const dotenv = require("dotenv").config();
const app = express();

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: process.env.METHODS,
    credentials: true,
    optionsSuccessStatus: 204,
  })
);
app.use(bodyParser.json({ extended: false }));
app.use("/cron", (req, res, next) => {
  res.status(200).json(" cron job triggered");
  next();
});
products.hasOne(productDetails, { foreignKey: "productId" });
productDetails.belongsTo(products, { foreignKey: "productId" });
Cart.belongsTo(users);
users.hasMany(Cart);

Cart.belongsTo(products);
products.hasMany(Cart);

app.use(routes);

sequelize
  .sync()
  .then((res) => {
    app.listen(process.env.PORT);
  })
  .catch((err) => console.log(err));
