const  Sequelize  = require("sequelize");
const sequelize = require("../util/Database");

const Order=sequelize.define("bookingorder",{
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
   
    name:{
        type: Sequelize.STRING,
    
        allowNull: false,
    },
    image:{
        type: Sequelize.STRING,
    
        allowNull: false,
    },
    payable:{
        type: Sequelize.INTEGER,
    
        allowNull: false,
     },
     status:{
        type: Sequelize.STRING,
    
        allowNull: false,
        defaultValue:"pending"
     },
     payable:{
        type: Sequelize.INTEGER,
    
        allowNull: false,
     },
     orderId:{
        type: Sequelize.STRING,
    
        allowNull: false,
     },
     paymentId:{
        type: Sequelize.STRING,
    
        allowNull: false,
        defaultValue:"payment not made"
        
     },userId:{
      type: Sequelize.INTEGER,

      allowNull: false,
   },
  
})
module.exports=Order