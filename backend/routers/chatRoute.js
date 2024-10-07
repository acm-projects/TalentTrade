const express = require('express')
const mongoose=require('mongoose')
const {createChat, findUserChats, findChats} = require('../controllers/chatController');


const router=express.Router();

router.post("/", createChat);
router.get("/:firstId", findUserChats);
router.get("/:firstId/:secondId", findChats);

module.exports = router;