const messageModel = require("../models/MessageSchema");

const createMessage = async (req, res) => {
  const { chatId, senderId, message } = req.body;

  const newMessage = new messageModel({
    chatId,
    senderId,
    message,
  });
  try {
    const response = await newMessage.save();
    res.status(200).json(response );
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await messageModel.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createMessage, getMessages };
