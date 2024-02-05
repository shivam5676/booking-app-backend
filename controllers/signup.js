const express = require("express");

const users = require("../models/user");

const bcrypt = require("bcrypt");



exports.Signup=async (req, res) => {
    const data = req.body;
    console.log("data", data);
    if (data.name.length == 0) {
      return res
        .status(401)
        .json({ status: "failed", message: "name can not be empty" });
    }
    if (data.email.length == 0 || !data.email.includes("@")) {
      return res.status(401).json({
        status: "failed",
        message: "email must contains @",
      });
    }
    if (data.password != data.confirmPassword) {
      return res.status(401).json({
        status: "failed",
        message: "password and confirm password is not same",
      });
    }
    if (data.password.length < 6) {
      return res.status(401).json({
        status: "failed",
        message: "password can not be smaller than 6 digit ",
      });
    }
    // Unique account validation by email
    try {
      const response = await users.findAll({
        where: {
          email: data.email,
        },
      });
      if (response.length === 0) {
        const saltrounds = 10;
        try {
          //we using a different try catch block only for getting error related to hasing process
          // Attempt to hash the password
          const encryptedPassword = await bcrypt.hash(data.password, saltrounds);
  
          // If hashing is successful, create the user
          const signupResponse = await users.create({
            name: data.name,
            password: encryptedPassword,
            email: data.email,
          });
  
          return res
            .status(200)
            .json({ message: "Account successfully created" });
        } catch (hashingError) {
          return res.status(500).json({
            status: "failed",
            message: "Error creating the account. Please try again later.",
          });
        }
      } else {
        return res.status(401).json({
          status: "failed",
          message:
            "An account with the same email id is present. Please try with another email id.",
        });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: "failed", message: "Internal server error" });
    }
  }