const userRoute = require("../routes/userRoutes");
const chatRoute = require("../routes/chatRoutes");

function route(app) {
  app.use("/user", userRoute),
  app.use("/chat",chatRoute)
}

module.exports = route;
