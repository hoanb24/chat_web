const userModel = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../helpers/jwt");

const userController = {
  registerUser: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;

      if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid email address" });
      }

      const emailExists = await userModel.findOne({ email: email });
      if (emailExists) {
        return res.status(400).json({ message: "Email already registered" });
      }

      const userNameExists = await userModel.findOne({ name: name });
      if (userNameExists) {
        return res.status(400).json({ message: "UserName already registered" });
      }

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = new userModel({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await newUser.save();
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.log("Error", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
  loginUser: async (req, res) => {
    const { email, password } = req.body;
    const userExist = await userModel.findOne({ email: email });
    if (userExist == null) {
      return res.status(404).json({
        message: "User doesn't exists",
      });
    }
    const validPassword = await bcrypt.compare(password, userExist.password);
    if (!validPassword) {
      return res.status(404).json({
        message: "Password is incorrect",
      });
    }
    if (userExist) {
      const accessToken = generateAccessToken(userExist);
      await res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false,
        path: "/",
      });

      console.log("accessToken", accessToken);

      return res.status(200).json({
        message: "Login successfully",
        data: {
          accessToken: accessToken,
        },
      });
    }
  },
  logout: async (req, res) => {
    try {
      res.clearCookie("accessToken");
      return res.status(200).json({
        message: "Logout successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const loggedInUserId = req.userData._id;

      const users = await userModel.find({ _id: { $ne: loggedInUserId } });
      if (!users) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      return res.status(200).json({
        data: users,
        message: "Get users successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  getDataUserLoggedIn: async (req, res) => {
    try {
      const loggedInUserId = req.userData._id;

      const users = await userModel.findOne({ _id: loggedInUserId });
      if (!users) {
        return res.status(404).json({
          message: "Data user not found",
        });
      }
      return res.status(200).json({
        data: users,
        message: "Get users successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};

module.exports = userController;
