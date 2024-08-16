const mongoose = require("mongoose");

const connect = () => {
  try {
    mongoose.connect(`${process.env.MONGO_CONNECT}`).then(() => {
      console.log("Connect MongoDB successfully");
    });
  } catch (error) {
    console.log("Connect failed : " + error.message);
  }
};

module.exports = connect;
