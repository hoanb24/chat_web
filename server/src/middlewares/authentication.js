const userModel = require("../models/userModel");
const cookie = require("cookie");
const { verifyAccessToken } = require("../helpers/jwt");

const checkAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.cookie;
    console.log("req.headers", req.headers);

    console.log("token backend", token);

    const cookies = cookie.parse(token || "");
    const accessToken = cookies.accessToken;
    const decoded = verifyAccessToken(accessToken);
    if (!token) {
      return res.status(401).json({
        message: "Your token not found",
      });
    }
    const user = await userModel.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }
    req.userData = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  checkAuthentication,
};
