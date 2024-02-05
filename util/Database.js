const Sequelize=require("sequelize")
const dotenv = require("dotenv").config();
const sequelize=new Sequelize(process.env.SQLSCHEMA,process.env.SQLUSER,process.env.SQLPASSWORD,{
    dialect:"mysql",
    host:process.env.SQLHOST
    
})
module.exports=sequelize;