const  Sequelize  = require("sequelize");
const sequelize = require("../util/Database");

const Cart=sequelize.define("cart",{
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
        allowNull: false,
      },
     quantity:{
        type: Sequelize.INTEGER,
    
        allowNull: false,
     },
    //  productId:{
    //     type: Sequelize.INTEGER,
    
    //     allowNull: false,
    //  },
    // name:{
    //     type: Sequelize.STRING,
    
    //     allowNull: false,
    // },
    // image:{
    //     type: Sequelize.STRING,
    
    //     allowNull: false,
    // }
    //  ,
      couponApplied: {
        type: Sequelize.STRING,
    
        allowNull: true,
      },
    //   userId:{
    //     type: Sequelize.INTEGER,
    
    //     allowNull: false,
    //   }
})
module.exports=Cart