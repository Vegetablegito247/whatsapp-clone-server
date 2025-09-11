const mongoose = require('mongoose');
const Chat = require('../../models/chat');
const { getSocket } = require('../../config/connection');

const editChat = async (req, res) => {
    const { id } = req.params;
    const { message } = req.body;

    try {
        const chatData = await Chat.findById(id);

        if(!chatData) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        if(message && message.trim() !== '') {
            chatData.message = message;

            const updatedChat = await chatData.save();

            const room = [chatData.sender.toString(), chatData.receiver.toString()].sort().join('_');

            const io = getSocket();

            // Editing chat message to both users if they are connected
            if(io) {
                io.to(room).emit('edit_msg', updatedChat);
            }

            return res.status(200).json({
                message: 'Message updated successfully',
                data: updatedChat
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = editChat;