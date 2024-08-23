const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getAllUsers,
  getDataUserLoggedIn,
} = require("../controllers/userController");
const { checkAuthentication } = require("../middlewares/authentication");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", checkAuthentication, logout);
router.get("/", checkAuthentication, getAllUsers);
router.get("/getDataUser", checkAuthentication, getDataUserLoggedIn);

module.exports = router;
