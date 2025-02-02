const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

const generateAccessToken = (user) => {
  return (token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "3d",
    }
  ));
};

const verifyAccessToken = (accessToken) => {
  try {
    const token = accessToken;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return decoded;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      const decoded = jwt.decode(token);
      return {
        exp: decoded.exp,
        userId: decoded.userId,
      };
    }
  }
};

module.exports = { generateAccessToken, verifyAccessToken };
