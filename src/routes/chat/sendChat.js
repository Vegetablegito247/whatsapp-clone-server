const mongoose = require('mongoose');
const Chat = require('../../models/chat');
const { getSocket } = require('../../config/connection');


const sendChat = async (req, res) => {
    const { sender, receiver, message, createdAt, seen, seenAt } = req.body;

    try {
        const senderId = await mongoose.model('User').findById(sender);
        const receiverId = await mongoose.model('User').findById(receiver);

        if (!senderId || !receiverId) {
            return res.status(404).json({ message: 'Sender or receiver not found' });
        }

        const chat = new Chat({
            sender: sender,
            receiver: receiver,
            message: message,
            createdAt: createdAt,
            seen: seen,
            seenAt: seenAt,
        });

        const savedChat = await chat.save();

        const room = [sender, receiver].sort().join('_');

        const io = getSocket();

        // Emit the message to the receiver if they are connected
        if (io) {
            io.to(room).emit('chat_msg', savedChat);
        }

        res.status(201).json({
            message: 'Message sent successfully',
            data: savedChat
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = sendChat;