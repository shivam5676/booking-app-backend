const Sequelize = require("sequelize");
const sequelize = require("../util/Database");
const products = sequelize.define("bookingproducts", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },

  price: {
    type: Sequelize.STRING,

    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,

    allowNull: false,
  },
  packageInclude: {
    type: Sequelize.JSON,

    allowNull: true,
  },
  createdAt: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  updatedAt: {
    type: Sequelize.STRING,
    allowNull: true,
  },
});
module.exports = products;
