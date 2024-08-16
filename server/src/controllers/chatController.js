const mongoose = require("mongoose");
const conversationModel = require("../models/conversation");
const messageModel = require("../models/messageModel");

const ChatController = {
  sendMessage: async (req, res) => {
    try {
      const { message, senderId } = req.body;
      const { Id: receiverId } = req.params;
      let conversation = await conversationModel.findOne({
        participants: { $all: [senderId, receiverId] },
      });
      if (!conversation) {
        conversation = new conversationModel({
          participants: [senderId, receiverId],
        });
      }

      const newMessage = new messageModel({
        senderId: senderId,
        receiverId: receiverId,
        message: message,
      });

      if (newMessage) {
        conversation.messages.push(newMessage._id);
      }
      await Promise.all([conversation.save(), newMessage.save()]);

      return res.status(201).json({
        message: "Created new message",
        data: newMessage,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
  getMessage: async (req, res) => {
    try {
      const { Id: userToChat } = req.params;
      const { senderId } = req.body;

      const conversation = await conversationModel
        .findOne({
          participants: { $all: [senderId, userToChat] },
        })
        .populate({
          path: "messages",
          model: "Message",
        });

      if (!conversation) return res.status(200).json([]);

      const messages = conversation.messages;

      res.status(200).json(messages);
    } catch (error) {
      console.log("Error is getting data", error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = ChatController;
