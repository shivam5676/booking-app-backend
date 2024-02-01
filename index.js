const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./Routes/product");
const sequelize = require("./util/Database");
const products = require("./models/products");
const cors = require("cors");
const productDetails = require("./models/productDetail");
const Cart = require("./models/cart");
const users = require("./models/user");
const app = express();
app.use(bodyParser.json({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);

products.hasOne(productDetails, { foreignKey: 'productId' });
productDetails.belongsTo(products, { foreignKey: 'productId' });
Cart.belongsTo(users);
users.hasMany(Cart)
products.belongsToMany(Cart,{ through: "cartItems" });
Cart.belongsToMany(products,{ through: "cartItems" }); // Each cart belongs to a product

app.use(routes);
sequelize
  .sync()
  .then((res) => {
    app.listen(4000);
    
  })
  .catch((err) => console.log(err));
