import Conversation from "../models/conversation.model.js";

import Message from "../models/message.model.js";


export const sendMessage = async (req, res) => {
    try {
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!conversation) {// if conversation does not exist which shows there is no conversaiton between these teo participants, create a new conversation
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });   
        }

        //create a new message, new message
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            //newMessage._id
            conversation.messages.push(newMessage._id);
        }
        
        //this will take longer time to save the conversation and message
        // await conversation.save();
        // await newMessage.save();

        //this will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);
        
        res.status(201).json(newMessage);




    } catch (error) {
        console.error("Error in sendMessage controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const {id: userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages");

        if (!conversation) return res.status(200).json([]);
        

        res.status(200).json(conversation.messages);

    } catch (error) {
        console.error("Error in getMessages controller", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}