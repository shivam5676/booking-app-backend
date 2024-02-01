const Sequelize = require("sequelize");
const sequelize = require("../util/Database");
const users = sequelize.define("users", {
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

  password: {
    type: Sequelize.STRING,

    allowNull: false,
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
module.exports=users