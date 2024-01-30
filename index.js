const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./Routes/product");
const sequelize = require("./util/Database");
const products = require("./models/products");
const cors = require("cors");
const app = express();
app.use(bodyParser.json({ extended: false }));

app.use(
  cors({
    origin: "*",
  })
);
app.use(routes);
sequelize
  .sync()
  .then((res) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
