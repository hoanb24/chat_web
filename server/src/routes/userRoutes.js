const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getAllUsers,
} = require("../controllers/userController");
const { checkAuthentication } = require("../middlewares/authentication");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", checkAuthentication, logout);
router.post("/", getAllUsers);

module.exports = router;
