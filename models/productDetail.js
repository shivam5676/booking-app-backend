const  Sequelize  = require("sequelize");
const sequelize = require("../util/Database");

const productDetails=sequelize.define("productDetails",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
      overview: {
        type: Sequelize.STRING,
        
        allowNull: false,
      },
    
      hotels: {
        type: Sequelize.STRING,
    
        allowNull: false,
      },
      packageInclude: {
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
})
module.exports=productDetails