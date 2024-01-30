const Sequelize=require("sequelize")
const sequelize=new Sequelize("bookingApp","root","(@Shivam",{
    dialect:"mysql",
    host:"localhost"
})
module.exports=sequelize;