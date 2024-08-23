const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const connect = require("../src/config/db/db");
const route = require("./routes/index");

const app = express();
dotenv.configDotenv();

app.use(express.json());
app.use(morgan());
app.use(helmet());

app.use(
  cors({
    origin: `${process.env.CORS_ORIGIN}`,
    credentials: true,
  })
);

connect();
route(app);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server are running on port: ${process.env.PORT}`);
});
