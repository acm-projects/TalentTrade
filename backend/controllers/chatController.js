const chatModel = require("../models/ChatSchema");

const createChat = async(req, res) => {
    const {firstId, secondId} = req.body;
    try {
        const chat = await chatModel.findOne({
            members: {$all: [firstId, secondId]}
        })
    if (chat) return res.status(200).json({chat});

    const newChat = new chatModel({
        members: [firstId, secondId]
    })

    const response = newChat.save();

    res.status(200).json({response});

    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const findUserChats = async(req, res) => {
    const UserId = req.params.id;
    try {
        const chats = await chatModel.find({
            members: {$in: [UserId]}
        });
        res.status(200).json({chats});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

const findChats = async(req, res) => {
    const { firstId, secondId } = req.body;
    try {
        const chats = await chatModel.find({
            members: {$all: [firstId, secondId]}
        });
        res.status(200).json({chats});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

module.exports = {createChat, findUserChats, findChats};