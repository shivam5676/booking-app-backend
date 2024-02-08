const express = require("express");

const { Authenticator } = require("../middleware/authenticator");
const { productList } = require("../controllers/productlist");
const { productDEtails } = require("../controllers/productDEtails");
const { cartItems } = require("../controllers/cart");
const { couponsList } = require("../controllers/coupon");
const { createOrder } = require("../controllers/createOrder");
const { updateOrdersdb } = require("../controllers/updateOrderPayment");
const { AllOrders } = require("../controllers/AllOrder");
const { doLogin } = require("../controllers/login");
const { Signup } = require("../controllers/signup");
const { addItemInCart } = require("../controllers/addItemInCArt");
const routes = express.Router();

routes.get("/products",productList );
routes.get("/productDetails/:id",productDEtails);
routes.post("/addItem",Authenticator ,addItemInCart);
routes.get("/fetchCart",Authenticator,cartItems );
routes.get("/couponVerify",Authenticator,couponsList);

routes.post("/createOrder",createOrder);
routes.post("/successfulOrder",updateOrdersdb);
routes.get("/fetchOrders",Authenticator,AllOrders);

routes.post("/login",doLogin );
routes.post("/signup", Signup);

module.exports = routes;
