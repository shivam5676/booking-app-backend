const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./Routes/product");
const sequelize = require("./util/Database");
const products = require("./models/products");
const cors = require("cors");
const productDetails = require("./models/productDetail");
const Cart = require("./models/cart");
const users = require("./models/user");
const Order = require("./models/order");
const dotenv = require("dotenv").config();
const app = express();


app.use(
  cors({
    origin: process.env.ORIGIN,
  })
);
app.use(bodyParser.json({ extended: false }));
products.hasOne(productDetails, { foreignKey: 'productId' });
productDetails.belongsTo(products, { foreignKey: 'productId' });
Cart.belongsTo(users);
users.hasMany(Cart)

Cart.belongsTo(products)
products.hasMany(Cart)


app.use(routes);
sequelize
  .sync()
  .then((res) => {
    app.listen(process.env.PORT);
    
  })
  .catch((err) => console.log(err));
