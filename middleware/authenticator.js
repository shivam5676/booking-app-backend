
const express=require("express")
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
exports.Authenticator = async (req, res,next) => {
   console.log(req.headers.authorization) 
  try {
    const verified = await jwt.verify(
      req.headers.authorization,
      process.env.TOKEN_SECRET
    );
    req.user = verified;
 
    next();
    
  } catch (err) {
    return res.status(400).json("invalid user");
  }
};
