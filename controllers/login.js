const express = require("express");


const users = require("../models/user");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


function tokenmaker(id, name) {
    const secretkey = process.env.TOKEN_SECRET;
    return jwt.sign({ userId: id, name: name }, secretkey);
  }

exports.doLogin=async (req, res) => {
    const data = req.body;
    try {
      const savedUser = await users.findOne({where:{
        email: data.email,
      }
        
      });
  
      if (!savedUser) {
        return res
          .status(404)
          .json({ message: "user does not exist with this email id" });
      }
      try {
        
        const comparedHashPassword = await bcrypt.compare(
          data.password,
          savedUser.password
        );
  
        if (comparedHashPassword === true) {
          return res.status(200).json({
            message: "Account successfully loggined",
            token: tokenmaker(savedUser.id, savedUser.name),
            
          });
        } else {
          return res
            .status(401)
            .json({ message: "Incorrect password", status: "failed" });
        }
      } catch (err) {
        return res.status(500).json({
          message: "Error during password verification",
          status: "failed",
        });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Internal server error", status: "failed" });
    }
  }