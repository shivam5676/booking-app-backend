const Sequelize = require("sequelize");
const sequelize = require("../util/Database");

const productDetails = sequelize.define("productDetails", {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
    allowNull: false,
  },
  overview: {
    type: Sequelize.STRING(800),

    allowNull: false,
  },

  hotels: {
    type: Sequelize.JSON,

    allowNull: true,
  },
  images: {
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
module.exports = productDetails;
