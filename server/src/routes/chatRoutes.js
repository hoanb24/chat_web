const express = require("express");
const { sendMessage, getMessage } = require("../controllers/chatController");
const { checkAuthentication } = require("../middlewares/authentication");

const router = express.Router();

router.post("/sendMessage/:Id", checkAuthentication, sendMessage);
router.post("/getMessage/:Id", checkAuthentication, getMessage);

module.exports = router;
